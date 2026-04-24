import CTA from "./components/home/Cta";
import Features from "./components/home/Features";
import Footer from "./components/home/Footer";
import Header from "./components/home/Header";
import Hero from "./components/home/Hero";
import HowItWorks from "./components/home/HowItWorks";
import Stats from "./components/home/Stats";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <CTA />
      <Footer />
    </main>
  )
}