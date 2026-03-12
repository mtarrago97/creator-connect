import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuctionCard from "./AuctionCard";
import sneakersImg from "@/assets/auction-sneakers.jpg";
import artImg from "@/assets/auction-art.jpg";
import cameraImg from "@/assets/auction-camera.jpg";
import vaseImg from "@/assets/auction-vase.jpg";
import { useState } from "react";

const tabs = ["All", "Fashion", "Art", "Collectibles", "Music"];

const objects = [
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
    category: "Fashion",
  },
  {
    image: artImg,
    title: "Original Canvas — 'Digital Dreams' 48×36",
    creator: "Maya Chen Art",
    creatorAvatar: "",
    currentBid: 1850,
    bidCount: 15,
    endTime: new Date(Date.now() + 8 * 3600000),
    watchers: 45,
    category: "Art",
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
    category: "Collectibles",
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
    category: "Art",
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
    category: "Fashion",
  },
  {
    image: cameraImg,
    title: "Limited Hasselblad 500C — Film Legend",
    creator: "CameraVault",
    creatorAvatar: "",
    currentBid: 2100,
    bidCount: 22,
    endTime: new Date(Date.now() + 5 * 3600000),
    isLive: true,
    watchers: 78,
    category: "Collectibles",
  },
];

const ObjectsSection = () => {
  const [activeTab, setActiveTab] = useState("All");
  const filtered = activeTab === "All" ? objects : objects.filter((o) => o.category === activeTab);

  return (
    <section id="objects" className="section-padding bg-secondary/30">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-medium text-sm uppercase tracking-widest mb-3"
          >
            Objects
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-semibold text-foreground"
          >
            Tangible. Authentic. Yours.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg mt-4 max-w-md mx-auto"
          >
            Own one-of-a-kind objects straight from the people who made them.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                tab === activeTab
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((obj, i) => (
            <motion.div
              key={`${obj.title}-${i}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <AuctionCard
                {...obj}
                creatorAvatar={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(obj.creator)}&backgroundColor=1d1d1f`}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button variant="outline" className="rounded-full h-11 px-8 font-medium border-border text-foreground hover:bg-background">
            View All Objects <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ObjectsSection;
