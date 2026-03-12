import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AuctionGrid from "@/components/AuctionGrid";
import CreatorSpotlight from "@/components/CreatorSpotlight";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <AuctionGrid />
    <CreatorSpotlight />
    <HowItWorks />
    <Footer />
  </div>
);

export default Index;
