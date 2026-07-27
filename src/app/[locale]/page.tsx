import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import Stats from '@/components/Stats';
import Gallery from '@/components/Gallery';
import Cta from '@/components/Cta';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <WhyUs />
      <Stats />
      <Gallery />
      <Cta />
      <Contact />
      <Footer />
    </main>
  );
}
