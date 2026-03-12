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
      className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative aspect-square overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 flex gap-2">
          {isLive && <LiveBadge />}
        </div>
        <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center hover:bg-background/80 transition-colors">
          <Heart className="h-4 w-4 text-foreground" />
        </button>
        {watchers && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-background/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-foreground">
            <Users className="h-3 w-3" /> {watchers}
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <img src={creatorAvatar} alt={creator} className="h-6 w-6 rounded-full object-cover" />
          <span className="text-xs text-muted-foreground font-medium">{creator}</span>
        </div>
        <h3 className="font-display font-semibold text-sm text-foreground leading-tight line-clamp-2">{title}</h3>
        <div className="flex items-end justify-between pt-1">
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
