import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuctionCard from "./AuctionCard";
import LiveBadge from "./LiveBadge";
import sneakersImg from "@/assets/auction-sneakers.jpg";
import cameraImg from "@/assets/auction-camera.jpg";
import experienceImg from "@/assets/auction-experience.jpg";
import featuredImg from "@/assets/featured-auction.jpg";

const liveAuctions = [
  {
    image: featuredImg,
    title: "Signed '59 Stratocaster — Tour Edition",
    creator: "John Mayer",
    creatorAvatar: "",
    currentBid: 8450,
    bidCount: 42,
    endTime: new Date(Date.now() + 4 * 3600000),
    isLive: true,
    watchers: 128,
  },
  {
    image: sneakersImg,
    title: "1-of-1 Custom Air Max — Hand-Painted",
    creator: "Virgil Studios",
    creatorAvatar: "",
    currentBid: 3200,
    bidCount: 28,
    endTime: new Date(Date.now() + 2 * 3600000),
    isLive: true,
    watchers: 89,
  },
  {
    image: cameraImg,
    title: "Vintage Polaroid SX-70 — Restored & Signed",
    creator: "RetroTech Co",
    creatorAvatar: "",
    currentBid: 420,
    bidCount: 31,
    endTime: new Date(Date.now() + 1.5 * 3600000),
    isLive: true,
    watchers: 112,
  },
  {
    image: experienceImg,
    title: "VIP Backstage — NYC Show Dec 2026",
    creator: "The Weeknd",
    creatorAvatar: "",
    currentBid: 5100,
    bidCount: 54,
    endTime: new Date(Date.now() + 6 * 3600000),
    isLive: true,
    watchers: 234,
  },
];

const LiveNowSection = () => (
  <section id="live-now" className="section-padding bg-foreground text-background">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
        <div className="flex items-center gap-4">
          <LiveBadge />
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-background">Live Now</h2>
            <p className="text-background/60 mt-1">Happening right now. Don't miss out.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-background/60">
          <Flame className="h-4 w-4 text-live" />
          <span className="text-sm font-medium">{liveAuctions.length} auctions live</span>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {liveAuctions.map((auction, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <AuctionCard
              {...auction}
              creatorAvatar={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(auction.creator)}&backgroundColor=1d1d1f`}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-12">
        <Button variant="outline" className="rounded-full h-11 px-8 font-medium border-background/20 text-background hover:bg-background/10">
          View All Live <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  </section>
);

export default LiveNowSection;
