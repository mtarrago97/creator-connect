import { motion } from "framer-motion";
import { Upload, Gavel, CreditCard, Truck } from "lucide-react";

const steps = [
  { icon: Upload, title: "List", desc: "Creators upload items or experiences in seconds", color: "text-primary" },
  { icon: Gavel, title: "Bid", desc: "Fans compete in transparent, timed auctions", color: "text-accent" },
  { icon: CreditCard, title: "Pay", desc: "Secure checkout with instant payment processing", color: "text-success" },
  { icon: Truck, title: "Ship", desc: "Full traceability from creator to fan doorstep", color: "text-foreground" },
];

const HowItWorks = () => (
  <section className="py-16 border-t border-border">
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl font-bold text-foreground">How It Works</h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">From listing to delivery, everything is seamless</p>
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
            <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <step.icon className={`h-6 w-6 ${step.color}`} />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
