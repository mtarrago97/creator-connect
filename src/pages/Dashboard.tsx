import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gavel, Heart, TrendingUp, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuctionCard from '@/components/AuctionCard';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('bidding');
  const [auctions, setAuctions] = useState<any[]>([]);
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user, activeTab]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'bidding') {
        const { data: bids, error } = await supabase
          .from('bids')
          .select(`
            *,
            auction:auctions(
              *,
              creator:profiles!creator_id(full_name, avatar_url)
            )
          `)
          .eq('bidder_id', user?.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const uniqueAuctions = Array.from(
          new Map(bids?.map(bid => [bid.auction.id, bid.auction])).values()
        );

        setAuctions(uniqueAuctions.map(auction => ({
          ...auction,
          creator: Array.isArray(auction.creator) ? auction.creator[0] : auction.creator,
        })));
      } else if (activeTab === 'watching') {
        const { data, error } = await supabase
          .from('watchlist')
          .select(`
            *,
            auction:auctions(
              *,
              creator:profiles!creator_id(full_name, avatar_url)
            )
          `)
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setWatchlist((data || []).map(item => ({
          ...item.auction,
          creator: Array.isArray(item.auction.creator) ? item.auction.creator[0] : item.auction.creator,
        })));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'bidding', label: 'My Bids', icon: Gavel },
    { id: 'watching', label: 'Watchlist', icon: Heart },
  ];

  const displayAuctions = activeTab === 'bidding' ? auctions : watchlist;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mb-2">
              My Dashboard
            </h1>
            <p className="text-muted-foreground">Track your bids and favorite auctions</p>
          </div>

          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground text-background'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading...</p>
              </div>
            </div>
          ) : displayAuctions.length === 0 ? (
            <div className="text-center py-16 bg-secondary/30 rounded-3xl">
              <div className="max-w-md mx-auto">
                {activeTab === 'bidding' ? (
                  <>
                    <Gavel className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      No bids yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Start bidding on auctions to see them here
                    </p>
                  </>
                ) : (
                  <>
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      Your watchlist is empty
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Add auctions to your watchlist to keep track of them
                    </p>
                  </>
                )}
                <button
                  onClick={() => navigate('/search')}
                  className="px-6 py-3 rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold transition-colors"
                >
                  Explore Auctions
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayAuctions.map((auction) => (
                <motion.div
                  key={auction.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  onClick={() => navigate(`/auction/${auction.id}`)}
                >
                  <AuctionCard
                    image={auction.featured_image}
                    title={auction.title}
                    creator={auction.creator.full_name}
                    creatorAvatar={auction.creator.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${auction.creator.full_name}`}
                    currentBid={auction.current_bid}
                    bidCount={auction.bid_count}
                    endTime={new Date(auction.end_time)}
                    isLive={auction.status === 'live'}
                    watchers={auction.watcher_count}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
