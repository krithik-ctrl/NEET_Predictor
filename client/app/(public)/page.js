import Navbar from "@/components/landing/Navbar";
import HeroSection from "../../components/landing/HeroSection";
import TrustSection from "../../components/landing/TrustSection";
import StateDiscoverySection from "../../components/landing/StateDiscoverySection";
import Features from "../../components/landing/featuresSection";
import VideoTestimonials from "../../components/landing/VideoTestimonials";
import WrittenReviews from "../../components/landing/WrittenReviews";
import PricingSection from "../../components/landing/PricingSection";
import FAQSection from "../../components/landing/FAQSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
<TrustSection/>
<StateDiscoverySection/>
<Features/>
<VideoTestimonials/>
   <WrittenReviews/>
   <PricingSection/>
   <FAQSection/>
    </>
  );
}

