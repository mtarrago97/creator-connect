import { motion } from "framer-motion";
import { ArrowRight, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import LiveBadge from "./LiveBadge";
import backstageImg from "@/assets/exp-backstage.jpg";
import cookingImg from "@/assets/exp-cooking.jpg";
import studioImg from "@/assets/exp-studio.jpg";
import courtsideImg from "@/assets/exp-courtside.jpg";

const experiences = [
  {
    image: backstageImg,
    title: "VIP Backstage at NYC Live Show",
    creator: "The Weeknd",
    currentBid: 5100,
    bidCount: 54,
    endTime: "6h 23m",
    isLive: true,
    watchers: 234,
    category: "Music",
  },
  {
    image: cookingImg,
    title: "Private Cooking Masterclass",
    creator: "Chef Marcus",
    currentBid: 1200,
    bidCount: 18,
    endTime: "2d 4h",
    watchers: 89,
    category: "Culinary",
  },
  {
    image: studioImg,
    title: "Personal Studio Visit & Art Session",
    creator: "Maya Chen Art",
    currentBid: 3400,
    bidCount: 32,
    endTime: "1d 12h",
    isLive: true,
    watchers: 156,
    category: "Art",
  },
  {
    image: courtsideImg,
    title: "Courtside Seats + Meet & Greet",
    creator: "All-Star Foundation",
    currentBid: 8200,
    bidCount: 67,
    endTime: "3h 45m",
    isLive: true,
    watchers: 412,
    category: "Sports",
  },
];

const ExperiencesSection = () => (
  <section id="experiences" className="section-padding">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent font-medium text-sm uppercase tracking-widest mb-3"
        >
          Experiences
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl font-semibold text-foreground"
        >
          Moments money can't buy.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg mt-4 max-w-md mx-auto"
        >
          Bid on once-in-a-lifetime experiences with your favorite creators.
        </motion.p>
      </div>

      {/* Large featured + grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Featured large card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative rounded-3xl overflow-hidden cursor-pointer"
        >
          <img
            src={experiences[0].image}
            alt={experiences[0].title}
            className="w-full h-full min-h-[400px] lg:min-h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-5 left-5">
            {experiences[0].isLive && <LiveBadge />}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <span className="text-white/60 text-xs uppercase tracking-widest">{experiences[0].category}</span>
            <h3 className="text-white font-display text-2xl sm:text-3xl font-semibold mt-2 leading-tight">{experiences[0].title}</h3>
            <p className="text-white/70 text-sm mt-1">by {experiences[0].creator}</p>
            <div className="flex items-center gap-6 mt-4">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider">Current Bid</p>
                <p className="text-white font-display text-2xl font-semibold">${experiences[0].currentBid.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-1.5 text-white/60 text-sm">
                <Clock className="h-3.5 w-3.5" /> {experiences[0].endTime}
              </div>
              <div className="flex items-center gap-1.5 text-white/60 text-sm">
                <Users className="h-3.5 w-3.5" /> {experiences[0].watchers}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Smaller cards */}
        <div className="grid gap-6">
          {experiences.slice(1).map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex gap-5 rounded-2xl bg-secondary/50 p-4 cursor-pointer hover:bg-secondary transition-colors duration-300"
            >
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden flex-shrink-0">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {exp.isLive && (
                  <div className="absolute top-2 left-2">
                    <LiveBadge />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-muted-foreground text-xs uppercase tracking-widest">{exp.category}</span>
                <h3 className="font-display font-semibold text-foreground mt-1 line-clamp-2 leading-snug">{exp.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">by {exp.creator}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="font-display font-semibold text-foreground">${exp.currentBid.toLocaleString()}</span>
                  <span className="text-muted-foreground text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {exp.endTime}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" className="rounded-full h-11 px-8 font-medium border-border text-foreground hover:bg-secondary">
          View All Experiences <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  </section>
);

export default ExperiencesSection;
