import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { TrendingUp } from "lucide-react";

interface BidDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auction: {
    id: string;
    title: string;
    current_bid: number;
    featured_image: string;
  };
  onBidPlaced: () => void;
}

const BidDialog = ({ open, onOpenChange, auction, onBidPlaced }: BidDialogProps) => {
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const minBid = auction.current_bid + 10;
  const suggestedBids = [minBid, minBid + 50, minBid + 100, minBid + 250];

  const handlePlaceBid = async () => {
    const amount = parseFloat(bidAmount);

    if (!amount || amount < minBid) {
      toast.error(`Minimum bid is $${minBid}`);
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error('Please sign in to place a bid');
        setLoading(false);
        return;
      }

      const { error: bidError } = await supabase
        .from('bids')
        .insert({
          auction_id: auction.id,
          bidder_id: user.id,
          amount: amount,
        });

      if (bidError) throw bidError;

      const { error: updateError } = await supabase
        .from('auctions')
        .update({
          current_bid: amount,
          bid_count: auction.current_bid + 1,
        })
        .eq('id', auction.id);

      if (updateError) throw updateError;

      toast.success('Bid placed successfully!');
      onBidPlaced();
      onOpenChange(false);
      setBidAmount('');
    } catch (error) {
      console.error('Error placing bid:', error);
      toast.error('Failed to place bid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Place Your Bid</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={auction.featured_image}
              alt={auction.title}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{auction.title}</h3>
              <p className="text-sm text-muted-foreground">
                Current bid: ${auction.current_bid.toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Your Bid Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">$</span>
              <Input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={minBid.toString()}
                className="pl-8 h-12 text-lg"
                min={minBid}
                step="10"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Minimum bid: ${minBid.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-3">Quick Bid</p>
            <div className="grid grid-cols-4 gap-2">
              {suggestedBids.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setBidAmount(amount.toString())}
                  className="px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-sm font-medium transition-colors"
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">How bidding works</p>
                <ul className="space-y-1 text-xs">
                  <li>• Your bid is binding and cannot be cancelled</li>
                  <li>• You'll be notified if you're outbid</li>
                  <li>• Winner pays only if auction ends successfully</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-full"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePlaceBid}
              className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-full"
              disabled={loading}
            >
              {loading ? 'Placing Bid...' : 'Place Bid'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BidDialog;
