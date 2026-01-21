import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustedBy from '@/components/TrustedBy';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import Results from '@/components/Results';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0e27]">
      <Navbar />
      <div className="relative">
        <Hero />
        <TrustedBy />
        <Features />
        <HowItWorks />
        <Pricing />
        <Results />
        <Testimonials />
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
