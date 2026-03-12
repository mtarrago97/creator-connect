import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["Explore", "Live Now", "Experiences", "Objects", "Creators"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-[1200px] mx-auto px-6 flex h-14 items-center justify-between">
        <div className="flex items-center gap-10">
          <a href="/" className="font-display text-xl font-semibold tracking-tight text-foreground">
            auctio
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="h-9 w-52 rounded-full bg-secondary pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 border-0"
            />
          </div>
          <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">
            Sign In
          </Button>
          <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full text-sm h-9 px-5 font-medium">
            Start Selling
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background overflow-hidden border-t border-border/50"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="text-lg text-foreground font-medium py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              ))}
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full mt-2 font-medium">
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
