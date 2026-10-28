import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolboxRibbon from "@/components/ToolboxRibbon";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Approach from "@/components/sections/Approach";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <ToolboxRibbon />
        <About />
        <Skills />
        <Projects />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
