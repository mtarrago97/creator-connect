import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import LiveBadge from "./LiveBadge";
import { motion } from "framer-motion";
import featuredImg from "@/assets/featured-auction.jpg";

const HeroSection = () => {
  const endTime = new Date(Date.now() + 4 * 3600000 + 23 * 60000);

  return (
    <section className="relative pt-24 pb-16 bg-hero-gradient overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <LiveBadge />
              <span className="text-sm text-muted-foreground">Featured Auction</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Own a Piece of
              <br />
              <span className="text-gradient-primary">Your Creator's</span>
              <br />
              Universe
            </h1>

            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              The auction marketplace where creators sell exclusive objects & experiences to their biggest fans.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold h-12 px-6 text-base glow-primary">
                <Flame className="h-4 w-4 mr-2" />
                Explore Auctions
              </Button>
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary font-display font-semibold h-12 px-6 text-base">
                Start Selling
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="font-display text-2xl font-bold text-foreground">12K+</p>
                <p className="text-xs text-muted-foreground">Active Creators</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="font-display text-2xl font-bold text-foreground">$4.2M</p>
                <p className="text-xs text-muted-foreground">Total Volume</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="font-display text-2xl font-bold text-foreground">98%</p>
                <p className="text-xs text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
              <img src={featuredImg} alt="Featured auction" className="w-full aspect-[3/4] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">JM</div>
                  <span className="text-sm font-medium text-foreground">John Mayer</span>
                  <span className="text-xs text-primary font-medium">✓ Verified</span>
                </div>
                <h2 className="font-display text-xl font-bold text-foreground">Signed '59 Stratocaster — Tour Edition</h2>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Bid</p>
                    <p className="font-display text-3xl font-bold text-gradient-primary">$8,450</p>
                    <p className="text-xs text-muted-foreground">42 bids • 128 watchers</p>
                  </div>
                  <CountdownTimer endTime={endTime} />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold h-12 text-base glow-primary">
                  Place Bid
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
