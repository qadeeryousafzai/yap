
import AboutYapSection from "@/components/AboutYapSection/AboutYapSection";
import AdvancedNgoHeroSlider from "../components/Hero/AdvancedNgoHeroSlider";
import ImpactValuesSection from "../components/ImpactValueSection/ImpactValueSection";
import NgoImpactMarquee from "@/components/NgoImpactMarquee/NgoImpactMarquee";
import FeaturedVideoSection from "@/components/FeaturedVideoSection/FeaturedVideoSection";
import CommunityProgressSection from "@/components/CommunityProgressSection/CommunityProgressSection";

export default function Home() {
  return (
      <>
        <AdvancedNgoHeroSlider />
        <NgoImpactMarquee />
        <ImpactValuesSection />
        <AboutYapSection />
        <FeaturedVideoSection videoId="https://www.youtube.com/watch?v=aaLeMyWBEGQ&t=7s" />
        <CommunityProgressSection />
    
     </>
  );
        
}
