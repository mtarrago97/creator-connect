import { motion } from "framer-motion";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const creators = [
  { name: "Maya Chen", category: "Visual Artist", auctions: 24, followers: "45K", initial: "MC", color: "bg-rose-100 text-rose-600" },
  { name: "The Weeknd", category: "Music", auctions: 8, followers: "2.1M", initial: "TW", color: "bg-blue-100 text-blue-600" },
  { name: "Virgil Studios", category: "Fashion", auctions: 12, followers: "320K", initial: "VS", color: "bg-amber-100 text-amber-600" },
  { name: "RetroTech Co", category: "Collectibles", auctions: 56, followers: "89K", initial: "RT", color: "bg-sky-100 text-sky-600" },
  { name: "Chef Marcus", category: "Culinary", auctions: 6, followers: "210K", initial: "CM", color: "bg-emerald-100 text-emerald-600" },
  { name: "AthleteLab", category: "Sports", auctions: 18, followers: "150K", initial: "AL", color: "bg-orange-100 text-orange-600" },
];

const CreatorSpotlight = () => (
  <section id="creators" className="section-padding bg-secondary/30">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-tight"
        >
          Meet the creators.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg mt-4 max-w-lg mx-auto leading-relaxed"
        >
          Connect with verified creators selling one-of-a-kind items and experiences.
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group rounded-3xl bg-background hover:shadow-lg p-8 transition-all duration-300 cursor-pointer border border-border/50 hover:border-border"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-16 w-16 rounded-2xl ${c.color} flex items-center justify-center font-display font-bold text-lg shadow-sm`}>
                {c.initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display font-semibold text-foreground text-lg truncate">{c.name}</span>
                  <BadgeCheck className="h-5 w-5 text-accent flex-shrink-0" />
                </div>
                <span className="text-sm text-muted-foreground">{c.category}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border/50">
              <div>
                <p className="font-display font-semibold text-foreground text-lg">{c.auctions}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Auctions</p>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-lg">{c.followers}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Followers</p>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-lg">4.9</p>
                <p className="text-xs text-muted-foreground mt-0.5">Rating</p>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-full border-border text-foreground hover:bg-foreground hover:text-background text-sm font-semibold transition-all duration-200 h-10">
              Follow
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" className="rounded-full h-12 px-8 font-semibold border-border text-foreground hover:bg-background">
          View All Creators <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  </section>
);

export default CreatorSpotlight;
