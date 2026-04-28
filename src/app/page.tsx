import { Cta } from "@/components/Cta";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <FeatureGrid />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
