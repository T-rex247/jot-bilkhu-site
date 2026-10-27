import Nav from "@/components/Nav";
import HeroScrub from "@/components/HeroScrub";
import Day from "@/components/Day";
import Story from "@/components/Story";
import Work from "@/components/Work";
import Services from "@/components/Services";
import How from "@/components/How";
import About from "@/components/About";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import SmoothScroll from "@/components/SmoothScroll";

export default function Page() {
  return (
    <main>
      <SmoothScroll />
      <Nav />
      <HeroScrub />
      <Day />
      <Story />
      <Work />
      <Services />
      <How />
      <About />
      <Closing />
      <Footer />
      <MobileBar />
    </main>
  );
}
