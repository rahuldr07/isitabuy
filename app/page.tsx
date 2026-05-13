import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import VerdictSection from "./components/VerdictSection";
import ExtensionCTA from "./components/ExtensionCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 max-w-[1280px] mx-auto px-6 md:px-8">
        <HeroSection />
        <VerdictSection />
        <ExtensionCTA />
      </main>
      <Footer />
    </>
  );
}
