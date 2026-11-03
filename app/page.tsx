import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Day from "@/components/Day";
import Story from "@/components/Story";
import Work from "@/components/Work";
import Services from "@/components/Services";
import How from "@/components/How";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import SmoothScroll from "@/components/SmoothScroll";

export default function Page() {
  return (
    <main>
      <SmoothScroll />
      <Nav />
      <Hero />
      <Day />
      <Story />
      <Work />
      <Services />
      <How />
      <About />
      <Faq />
      <Closing />
      <Footer />
      <MobileBar />
    </main>
  );
}
