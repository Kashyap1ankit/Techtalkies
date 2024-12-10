import Navbar from "@/components/Navbar/Navbar";
import Footer from "../components/All/footer";
import Hero from "@/components/Landing/hero";
import HowItWorks from "@/components/Landing/how-it-works";
import FAQ from "@/components/Landing/faq";

export default function Landing() {
  return (
    <div className=" overflow-x-hidden text-center ">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
}
