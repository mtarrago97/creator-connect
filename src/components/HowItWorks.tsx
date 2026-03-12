import { motion } from "framer-motion";
import { Upload, Gavel, CreditCard, Truck } from "lucide-react";

const steps = [
  { icon: Upload, title: "List", desc: "Creators upload items or experiences in seconds. Set your terms, start price, and duration.", num: "01" },
  { icon: Gavel, title: "Bid", desc: "Fans compete in transparent, timed auctions. Watch bids update live and feel the excitement.", num: "02" },
  { icon: CreditCard, title: "Pay", desc: "Secure checkout with instant payment processing. Multiple payment methods supported.", num: "03" },
  { icon: Truck, title: "Receive", desc: "Full traceability from creator to fan doorstep. Track every step of the journey.", num: "04" },
];

const HowItWorks = () => (
  <section className="section-padding bg-secondary/30">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent font-medium text-sm uppercase tracking-widest mb-3"
        >
          How It Works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl font-semibold text-foreground"
        >
          Simple. Seamless. Secure.
        </motion.h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-5xl font-display font-bold text-border mb-6">{step.num}</div>
            <div className="h-14 w-14 rounded-2xl bg-background flex items-center justify-center mx-auto mb-5 shadow-sm">
              <step.icon className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="font-display font-semibold text-foreground text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
