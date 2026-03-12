import AuctionCard from "./AuctionCard";
import { motion } from "framer-motion";
import sneakersImg from "@/assets/auction-sneakers.jpg";
import artImg from "@/assets/auction-art.jpg";
import cameraImg from "@/assets/auction-camera.jpg";
import vaseImg from "@/assets/auction-vase.jpg";
import experienceImg from "@/assets/auction-experience.jpg";

const auctions = [
  {
    image: sneakersImg,
    title: "1-of-1 Custom Air Max — Hand-Painted by Virgil",
    creator: "Virgil Studios",
    creatorAvatar: "",
    currentBid: 3200,
    bidCount: 28,
    endTime: new Date(Date.now() + 2 * 3600000),
    isLive: true,
    watchers: 89,
  },
  {
    image: artImg,
    title: "Original Canvas — 'Digital Dreams' 48x36",
    creator: "Maya Chen Art",
    creatorAvatar: "",
    currentBid: 1850,
    bidCount: 15,
    endTime: new Date(Date.now() + 8 * 3600000),
    watchers: 45,
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
    image: vaseImg,
    title: "Handcrafted Ceramic Vase — 'Earth Series' #7",
    creator: "Studio Kintsugi",
    creatorAvatar: "",
    currentBid: 680,
    bidCount: 9,
    endTime: new Date(Date.now() + 24 * 3600000),
    watchers: 23,
  },
  {
    image: experienceImg,
    title: "VIP Backstage Experience — NYC Show Dec 2026",
    creator: "The Weeknd",
    creatorAvatar: "",
    currentBid: 5100,
    bidCount: 54,
    endTime: new Date(Date.now() + 6 * 3600000),
    isLive: true,
    watchers: 234,
  },
  {
    image: sneakersImg,
    title: "Prototype Running Shoe — Never Released",
    creator: "AthleteLab",
    creatorAvatar: "",
    currentBid: 1450,
    bidCount: 19,
    endTime: new Date(Date.now() + 12 * 3600000),
    watchers: 67,
  },
];

const AuctionGrid = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">Trending Auctions</h2>
            <p className="text-muted-foreground mt-1">Don't miss out on what's hot right now</p>
          </div>
          <div className="hidden sm:flex gap-2">
            {["All", "Live", "Ending Soon", "New"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab === "All"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {tab}
              </button>
            ))}
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
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {auctions.map((auction, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <AuctionCard
                {...auction}
                creatorAvatar={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(auction.creator)}&backgroundColor=ff6b35`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AuctionGrid;
