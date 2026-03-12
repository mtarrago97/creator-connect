import { Search, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="font-display text-2xl font-bold tracking-tight">
            <span className="text-gradient-primary">auctio</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Explore</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Live Now</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Creators</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Categories</a>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search auctions..."
              className="h-9 w-64 rounded-lg border border-border bg-secondary pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <User className="h-5 w-5" />
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold text-sm">
            Start Selling
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-muted-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-3">
              <a href="#" className="text-sm font-medium py-2">Explore</a>
              <a href="#" className="text-sm font-medium py-2 text-muted-foreground">Live Now</a>
              <a href="#" className="text-sm font-medium py-2 text-muted-foreground">Creators</a>
              <a href="#" className="text-sm font-medium py-2 text-muted-foreground">Categories</a>
              <Button className="bg-primary text-primary-foreground mt-2 font-display font-semibold">
                Start Selling
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
