import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import VerdictSection from "./components/VerdictSection";
// import ExtensionCTA from "./components/ExtensionCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[1280px] overflow-x-hidden px-4 pt-32 pb-10 sm:px-6 md:px-8 md:pb-12">
        <HeroSection />
        <VerdictSection />
        {/* <ExtensionCTA /> */}
      </main>
      <Footer />
    </>
  );
}
