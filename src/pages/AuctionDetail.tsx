import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Share2, Clock, Users, BadgeCheck, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import LiveBadge from "@/components/LiveBadge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BidDialog from "@/components/BidDialog";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Auction {
  id: string;
  title: string;
  description: string;
  featured_image: string;
  images: string[];
  current_bid: number;
  bid_count: number;
  watcher_count: number;
  end_time: string;
  status: string;
  auction_type: string;
  creator: {
    full_name: string;
    avatar_url: string;
    is_creator: boolean;
  };
  category: {
    name: string;
  };
}

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWatching, setIsWatching] = useState(false);
  const [showBidDialog, setShowBidDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAuction();
    }
  }, [id]);

  const fetchAuction = async () => {
    try {
      const { data, error } = await supabase
        .from('auctions')
        .select(`
          *,
          creator:profiles!creator_id(full_name, avatar_url, is_creator),
          category:categories(name)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setAuction({
          ...data,
          images: Array.isArray(data.images) ? data.images : [data.featured_image],
          creator: Array.isArray(data.creator) ? data.creator[0] : data.creator,
          category: Array.isArray(data.category) ? data.category[0] : data.category,
        });
      }
    } catch (error) {
      console.error('Error fetching auction:', error);
      toast.error('Failed to load auction');
    } finally {
      setLoading(false);
    }
  };

  const handleWatch = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error('Please sign in to watch auctions');
      return;
    }

    try {
      if (isWatching) {
        await supabase
          .from('watchlist')
          .delete()
          .eq('user_id', user.id)
          .eq('auction_id', id);
        setIsWatching(false);
        toast.success('Removed from watchlist');
      } else {
        await supabase
          .from('watchlist')
          .insert({ user_id: user.id, auction_id: id });
        setIsWatching(true);
        toast.success('Added to watchlist');
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
      toast.error('Failed to update watchlist');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading auction...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Auction not found</h2>
            <p className="text-muted-foreground mb-6">This auction may have been removed or doesn't exist.</p>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const allImages = auction.images.length > 0 ? auction.images : [auction.featured_image];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary mb-4">
                <img
                  src={allImages[selectedImage] || auction.featured_image}
                  alt={auction.title}
                  className="w-full h-full object-cover"
                />
                {auction.status === 'live' && (
                  <div className="absolute top-4 left-4">
                    <LiveBadge />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={handleWatch}
                    className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${isWatching ? 'fill-accent text-accent' : 'text-foreground'}`} />
                  </button>
                  <button className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center hover:bg-background transition-colors">
                    <Share2 className="h-5 w-5 text-foreground" />
                  </button>
                </div>
              </div>

              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-accent scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={auction.creator.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${auction.creator.full_name}`}
                    alt={auction.creator.full_name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-foreground">{auction.creator.full_name}</span>
                      {auction.creator.is_creator && <BadgeCheck className="h-4 w-4 text-accent" />}
                    </div>
                    <span className="text-sm text-muted-foreground">{auction.category?.name}</span>
                  </div>
                </div>

                <h1 className="font-display text-4xl font-semibold text-foreground leading-tight mb-3">
                  {auction.title}
                </h1>

                <p className="text-muted-foreground leading-relaxed">{auction.description}</p>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Current Bid</p>
                    <p className="font-display text-3xl font-bold text-foreground">
                      ${auction.current_bid.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Ends In</p>
                    <CountdownTimer endTime={new Date(auction.end_time)} compact />
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{auction.bid_count} bids</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4" />
                    <span>{auction.watcher_count} watching</span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowBidDialog(true)}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full h-12 text-base font-semibold"
                  disabled={auction.status !== 'live'}
                >
                  {auction.status === 'live' ? 'Place Bid' : 'Auction Ended'}
                </Button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 pb-4 border-b border-border/50">
                  <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">Bidding Details</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Place your bid now. If you're outbid, we'll notify you immediately.
                      The highest bidder when the timer runs out wins.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-border/50">
                  <BadgeCheck className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">Authenticity Guaranteed</p>
                    <p className="text-muted-foreground leading-relaxed">
                      All items are verified by our team. You'll receive a certificate of authenticity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">Secure Payment</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Payment is held in escrow until you confirm receipt of the item.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <BidDialog
        open={showBidDialog}
        onOpenChange={setShowBidDialog}
        auction={auction}
        onBidPlaced={fetchAuction}
      />

      <Footer />
    </div>
  );
};

export default AuctionDetail;
