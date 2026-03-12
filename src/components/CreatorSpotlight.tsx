import { motion } from "framer-motion";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const creators = [
  { name: "Maya Chen", category: "Visual Artist", auctions: 24, followers: "45K", initial: "MC", color: "bg-rose-100 text-rose-600" },
  { name: "The Weeknd", category: "Music", auctions: 8, followers: "2.1M", initial: "TW", color: "bg-violet-100 text-violet-600" },
  { name: "Virgil Studios", category: "Fashion", auctions: 12, followers: "320K", initial: "VS", color: "bg-amber-100 text-amber-600" },
  { name: "RetroTech Co", category: "Collectibles", auctions: 56, followers: "89K", initial: "RT", color: "bg-sky-100 text-sky-600" },
  { name: "Chef Marcus", category: "Culinary", auctions: 6, followers: "210K", initial: "CM", color: "bg-emerald-100 text-emerald-600" },
  { name: "AthleteLab", category: "Sports", auctions: 18, followers: "150K", initial: "AL", color: "bg-orange-100 text-orange-600" },
];

const CreatorSpotlight = () => (
  <section id="creators" className="section-padding">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent font-medium text-sm uppercase tracking-widest mb-3"
        >
          Creators
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl font-semibold text-foreground"
        >
          Follow your favorites.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg mt-4 max-w-md mx-auto"
        >
          Never miss a drop from the creators you love.
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {creators.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group rounded-2xl bg-secondary/50 hover:bg-secondary p-6 transition-colors duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className={`h-14 w-14 rounded-2xl ${c.color} flex items-center justify-center font-display font-bold text-base`}>
                {c.initial}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-semibold text-foreground">{c.name}</span>
                  <BadgeCheck className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">{c.category}</span>
              </div>
            </div>
            <div className="flex justify-between mb-5">
              <div>
                <p className="font-semibold text-foreground">{c.auctions}</p>
                <p className="text-xs text-muted-foreground">Auctions</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">{c.followers}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">4.9</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-full border-border text-foreground hover:bg-foreground hover:text-background text-sm font-medium transition-all duration-200">
              Follow
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" className="rounded-full h-11 px-8 font-medium border-border text-foreground hover:bg-secondary">
          View All Creators <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  </section>
);

export default CreatorSpotlight;
