import Hero from '../sections/Hero';
import Features from '../sections/Features';
import About from '../sections/About';
import Marquee from '../components/Marquee';
import Products from '../sections/Products';
import WhyUs from '../sections/WhyUs';
import HelpCta from '../sections/HelpCta';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <Marquee />
      <Products />
      <WhyUs />
      <HelpCta />
      <Testimonials />
      <Contact />
    </>
  );
}
