import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Faq from '../components/Faq';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#0b3c8a] selection:bg-[#0b3c8a] selection:text-white">
      <Hero />
      <Services />
      <Projects />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}