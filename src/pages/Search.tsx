import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuctionCard from "@/components/AuctionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Auction {
  id: string;
  title: string;
  featured_image: string;
  current_bid: number;
  bid_count: number;
  watcher_count: number;
  end_time: string;
  status: string;
  creator: {
    full_name: string;
    avatar_url: string;
  };
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'ending-soon');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchAuctions();
  }, [query, selectedCategory, sortBy]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAuctions = async () => {
    setLoading(true);
    try {
      let queryBuilder = supabase
        .from('auctions')
        .select(`
          *,
          creator:profiles!creator_id(full_name, avatar_url)
        `)
        .eq('status', 'live');

      if (query) {
        queryBuilder = queryBuilder.ilike('title', `%${query}%`);
      }

      if (selectedCategory !== 'all') {
        const category = categories.find(c => c.slug === selectedCategory);
        if (category) {
          queryBuilder = queryBuilder.eq('category_id', category.id);
        }
      }

      switch (sortBy) {
        case 'ending-soon':
          queryBuilder = queryBuilder.order('end_time', { ascending: true });
          break;
        case 'newly-listed':
          queryBuilder = queryBuilder.order('created_at', { ascending: false });
          break;
        case 'price-low':
          queryBuilder = queryBuilder.order('current_bid', { ascending: true });
          break;
        case 'price-high':
          queryBuilder = queryBuilder.order('current_bid', { ascending: false });
          break;
        case 'most-bids':
          queryBuilder = queryBuilder.order('bid_count', { ascending: false });
          break;
      }

      const { data, error } = await queryBuilder;

      if (error) throw error;

      const formattedAuctions = (data || []).map(auction => ({
        ...auction,
        creator: Array.isArray(auction.creator) ? auction.creator[0] : auction.creator,
      }));

      setAuctions(formattedAuctions);
    } catch (error) {
      console.error('Error fetching auctions:', error);
      toast.error('Failed to load auctions');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (sortBy !== 'ending-soon') params.set('sort', sortBy);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSortBy('ending-soon');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mb-6">
              Discover Auctions
            </h1>

            <form onSubmit={handleSearch} className="relative mb-6">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for items, experiences, or creators..."
                className="pl-12 pr-32 h-14 text-base rounded-full"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="rounded-full"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button type="submit" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                  Search
                </Button>
              </div>
            </form>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary/50 rounded-2xl p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Category</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === 'all'
                            ? 'bg-foreground text-background'
                            : 'bg-secondary text-foreground hover:bg-secondary/80'
                        }`}
                      >
                        All
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.slug)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedCategory === category.slug
                              ? 'bg-foreground text-background'
                              : 'bg-secondary text-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Sort By</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'ending-soon', label: 'Ending Soon' },
                        { value: 'newly-listed', label: 'Newly Listed' },
                        { value: 'price-low', label: 'Price: Low to High' },
                        { value: 'price-high', label: 'Price: High to Low' },
                        { value: 'most-bids', label: 'Most Bids' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setSortBy(option.value)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            sortBy === option.value
                              ? 'bg-foreground text-background'
                              : 'bg-secondary text-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    {auctions.length} {auctions.length === 1 ? 'auction' : 'auctions'} found
                  </p>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
              </motion.div>
            )}

            {(query || selectedCategory !== 'all') && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {query && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-sm">
                    Search: "{query}"
                    <button onClick={() => setQuery('')} className="hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-sm">
                    {categories.find(c => c.slug === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('all')} className="hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading auctions...</p>
              </div>
            </div>
          ) : auctions.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No auctions found</p>
              <p className="text-sm text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button onClick={clearFilters} variant="outline" className="rounded-full">
                Clear Filters
              </Button>
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
              {auctions.map((auction) => (
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

export default Search;
