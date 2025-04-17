import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";

export const metadata = {
  title: "Candleaf Store",
  description: "A store for candles",
};
export default function Home() {
  return (
    <div className="bg-gray-50 w-full">

      <Hero />
      <Products />
      <Features />
      <Testimonials/>
    </div>
  );
}