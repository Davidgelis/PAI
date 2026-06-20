import { Hero } from "@/components/v2/hero";
import { LogoWall } from "@/components/v2/logo-wall";
import { News } from "@/components/v2/news";
import { Labs } from "@/components/v2/labs";
import { Testimonials } from "@/components/v2/testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoWall />
      <News />
      <Labs />
      <Testimonials />
    </main>
  );
}
