import Navbar from "@/components/Navbar/Navbar";
import Footer from "../components/All/footer";
import Hero from "@/components/Landing/hero";
import TrustedBy from "@/components/Landing/how-it-works";
import FAQ from "@/components/Landing/faq";
import RecentBlogsView from "@/components/Landing/recent-blog";

export default function Landing() {
  return (
    <div className=" overflow-x-hidden text-center flex flex-col  w-11/12 mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      <TrustedBy />
      <RecentBlogsView />
      <FAQ />
      <Footer />
    </div>
  );
}
