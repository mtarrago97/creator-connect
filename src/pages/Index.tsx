import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LiveNowSection from "@/components/LiveNowSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import ObjectsSection from "@/components/ObjectsSection";
import CreatorSpotlight from "@/components/CreatorSpotlight";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <LiveNowSection />
    <ExperiencesSection />
    <ObjectsSection />
    <CreatorSpotlight />
    <HowItWorks />
    <TrustSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
