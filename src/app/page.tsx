import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { News } from "@/components/site/news";
import { Labs } from "@/components/site/labs";
import { Testimonials } from "@/components/site/testimonials";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <News />
        <Labs />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
