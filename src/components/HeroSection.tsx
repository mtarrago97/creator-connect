import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-objects.jpg";

const HeroSection = () => {
  return (
    <section className="pt-14">
      {/* Full-width hero */}
      <div className="relative overflow-hidden bg-secondary/30">
        <div className="max-w-[1200px] mx-auto px-6 py-24 sm:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-foreground">
              Own a piece of
              <br />
              your creator's universe.
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl mt-6 max-w-xl mx-auto leading-relaxed">
              The auction marketplace where creators sell exclusive objects and experiences to their biggest fans.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-12 px-8 text-base font-medium glow-primary">
                Explore Auctions
              </Button>
              <Button variant="outline" className="rounded-full h-12 px-8 text-base font-medium border-border text-foreground hover:bg-secondary">
                Start Selling
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
        className="max-w-[1200px] mx-auto px-6 -mt-8"
      >
        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-foreground/5">
          <img src={heroImg} alt="Curated collectibles" className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover" />
        </div>
      </motion.div>

      {/* Stats */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
          {[
            { value: "12K+", label: "Active Creators" },
            { value: "$4.2M", label: "Total Volume" },
            { value: "98%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl sm:text-4xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
