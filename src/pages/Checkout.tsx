import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Lock, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    zipCode: '',
  });

  useEffect(() => {
    fetchAuction();
  }, [id]);

  const fetchAuction = async () => {
    try {
      const { data, error } = await supabase
        .from('auctions')
        .select(`
          *,
          creator:profiles!creator_id(full_name, avatar_url)
        `)
        .eq('id', id)
        .eq('status', 'sold')
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setAuction({
          ...data,
          creator: Array.isArray(data.creator) ? data.creator[0] : data.creator,
        });
      } else {
        toast.error('This auction is not available for checkout');
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching auction:', error);
      toast.error('Failed to load auction');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error('Please sign in to complete payment');
      return;
    }

    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      toast.error('Please fill in all payment details');
      return;
    }

    setProcessing(true);

    try {
      const { error } = await supabase
        .from('payments')
        .insert({
          auction_id: auction.id,
          buyer_id: user.id,
          seller_id: auction.creator_id,
          amount: auction.current_bid,
          payment_method: paymentMethod,
          status: 'completed',
          transaction_id: `TXN-${Date.now()}`,
        });

      if (error) throw error;

      toast.success('Payment successful!');
      navigate(`/confirmation/${id}`);
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading checkout...</p>
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
            <h2 className="text-2xl font-semibold mb-2">Checkout unavailable</h2>
            <p className="text-muted-foreground mb-6">This auction is not ready for checkout.</p>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="font-display text-4xl font-semibold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground mb-12">Complete your purchase securely</p>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-background border border-border/50 rounded-3xl p-8">
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Payment Method</h2>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-accent transition-colors cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Credit / Debit Card</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-sm font-medium mb-2 block">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardName" className="text-sm font-medium mb-2 block">Name on Card</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="text-sm font-medium mb-2 block">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-sm font-medium mb-2 block">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          type="text"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-background border border-border/50 rounded-3xl p-8">
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Shipping Address</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address" className="text-sm font-medium mb-2 block">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-sm font-medium mb-2 block">City</Label>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          placeholder="New York"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-sm font-medium mb-2 block">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          type="text"
                          placeholder="10001"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-secondary/50 rounded-3xl p-8 sticky top-24"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">Order Summary</h2>

                <div className="flex gap-4 mb-6 pb-6 border-b border-border/50">
                  <img
                    src={auction.featured_image}
                    alt={auction.title}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate mb-1">{auction.title}</h3>
                    <p className="text-sm text-muted-foreground">by {auction.creator.full_name}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Winning Bid</span>
                    <span className="font-semibold text-foreground">${auction.current_bid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span className="font-semibold text-foreground">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold text-foreground">Free</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-display text-lg font-semibold text-foreground">Total</span>
                  <span className="font-display text-2xl font-bold text-foreground">${auction.current_bid.toLocaleString()}</span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full h-12 text-base font-semibold mb-4"
                >
                  {processing ? 'Processing...' : 'Complete Payment'}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Secure payment powered by Stripe</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
