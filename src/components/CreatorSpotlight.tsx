import { motion } from "framer-motion";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const creators = [
  { name: "Maya Chen", category: "Visual Artist", auctions: 24, followers: "45K", initial: "MC" },
  { name: "The Weeknd", category: "Music", auctions: 8, followers: "2.1M", initial: "TW" },
  { name: "Virgil Studios", category: "Fashion", auctions: 12, followers: "320K", initial: "VS" },
  { name: "RetroTech Co", category: "Collectibles", auctions: 56, followers: "89K", initial: "RT" },
];

const CreatorSpotlight = () => (
  <section className="py-16 border-t border-border">
    <div className="container">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Top Creators</h2>
          <p className="text-muted-foreground mt-1">Follow your favorites to never miss a drop</p>
        </div>
        <Button variant="ghost" className="text-primary hover:text-primary/80 font-display font-semibold">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {creators.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary text-sm">
                {c.initial}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-display font-semibold text-foreground">{c.name}</span>
                  <BadgeCheck className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{c.category}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-semibold text-foreground">{c.auctions}</p>
                <p className="text-xs text-muted-foreground">Auctions</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">{c.followers}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary text-sm font-medium transition-colors">
              Follow
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CreatorSpotlight;
