import { Heart, Users } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import LiveBadge from "./LiveBadge";
import { motion } from "framer-motion";

interface AuctionCardProps {
  image: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  currentBid: number;
  bidCount: number;
  endTime: Date;
  isLive?: boolean;
  watchers?: number;
}

const AuctionCard = ({
  image, title, creator, creatorAvatar, currentBid, bidCount, endTime, isLive, watchers
}: AuctionCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group rounded-2xl bg-background overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative aspect-square overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        <div className="absolute top-3 left-3 flex gap-2">
          {isLive && <LiveBadge />}
        </div>
        <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/70 backdrop-blur-md flex items-center justify-center hover:bg-background transition-colors">
          <Heart className="h-4 w-4 text-foreground" />
        </button>
        {watchers && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-background/70 backdrop-blur-md rounded-full px-2.5 py-1 text-xs text-foreground font-medium">
            <Users className="h-3 w-3" /> {watchers}
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <img src={creatorAvatar} alt={creator} className="h-6 w-6 rounded-full object-cover" />
          <span className="text-xs text-muted-foreground font-medium">{creator}</span>
        </div>
        <h3 className="font-display font-semibold text-sm text-foreground leading-snug line-clamp-2">{title}</h3>
        <div className="flex items-end justify-between pt-2 border-t border-border/50">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Current Bid</p>
            <p className="font-display font-bold text-lg text-foreground">${currentBid.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">{bidCount} bids</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Ends in</p>
            <CountdownTimer endTime={endTime} compact />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuctionCard;
