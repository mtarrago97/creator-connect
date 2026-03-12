import { motion } from "framer-motion";
import { Shield, Eye, Scale, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Creators",
    desc: "Every creator is identity-verified. Know exactly who you're buying from.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    desc: "All bids are public. Complete auction history and provenance tracking.",
  },
  {
    icon: Scale,
    title: "Fair Bidding",
    desc: "Anti-shill protections and bid verification ensure a level playing field.",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    desc: "Escrow-based payments. Your money is protected until you receive your item.",
  },
];

const TrustSection = () => (
  <section className="section-padding">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent font-medium text-sm uppercase tracking-widest mb-3"
        >
          Trust & Safety
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl font-semibold text-foreground"
        >
          Built on trust.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg mt-4 max-w-lg mx-auto"
        >
          We've designed every layer of Auctio with safety and integrity in mind.
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-4 p-6 rounded-2xl bg-secondary/50"
          >
            <div className="h-12 w-12 rounded-xl bg-background flex items-center justify-center flex-shrink-0 shadow-sm">
              <f.icon className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
