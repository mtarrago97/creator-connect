import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="section-padding">
    <div className="max-w-[1200px] mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-foreground text-background p-12 sm:p-20 text-center"
      >
        <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight">
          Ready to start?
        </h2>
        <p className="text-background/60 text-lg mt-4 max-w-md mx-auto">
          Join thousands of creators and fans already on the platform.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Button className="bg-background text-foreground hover:bg-background/90 rounded-full h-12 px-8 text-base font-medium">
            Explore Auctions
          </Button>
          <Button variant="outline" className="rounded-full h-12 px-8 text-base font-medium border-background/20 text-background hover:bg-background/10">
            Start Selling <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
