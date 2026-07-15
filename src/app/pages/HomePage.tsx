import { useOutletContext } from "react-router";
import { Hero } from "../components/Hero";
import { ShopByCategory } from "../components/ShopByCategory";
import { ProductGrid } from "../components/ProductGrid";
import { PromoSection } from "../components/PromoSection";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/Newsletter";
import { type Product } from "../data/products";

type OutletContext = { handleAddToCart: (product: Product, qty?: number) => void };

export function HomePage() {
  const { handleAddToCart } = useOutletContext<OutletContext>();
  return (
    <>
      <Hero />
      <ShopByCategory />
      <ProductGrid onAddToCart={handleAddToCart} />
      <PromoSection />
      <Testimonials />
      <Newsletter />
    </>
  );
}
