import { Link } from "react-router";
import { ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import { type Product } from "../data/products";

type Props = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export function RelatedProducts({ products, onAddToCart }: Props) {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  const toggle = (id: number) =>
    setWishlist((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <section className="py-20 max-w-[1400px] mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.2em] text-[#C9A96E] mb-3" style={{ fontSize: "0.68rem" }}>
          Complete the Look
        </p>
        <h2
          className="text-[#1A1A1A]"
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 400 }}
        >
          You May Also Like
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <Link to={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[3/4] bg-[#F5F0EB] mb-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {product.badge && (
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 text-white uppercase tracking-wider ${
                    product.badge === "Sale" ? "bg-[#B85042]" : product.badge === "Bestseller" ? "bg-[#C9A96E]" : "bg-[#1A1A1A]"
                  }`}
                  style={{ fontSize: "0.58rem" }}
                >
                  {product.badge}
                </span>
              )}
              <button
                onClick={(e) => { e.preventDefault(); toggle(product.id); }}
                className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart size={13} className={wishlist.has(product.id) ? "fill-[#B85042] text-[#B85042]" : "text-[#1A1A1A]"} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button
                  onClick={(e) => { e.preventDefault(); onAddToCart(product); }}
                  className="w-full bg-[#1A1A1A] text-white py-3 flex items-center justify-center gap-2 uppercase tracking-wider hover:bg-[#333] transition-colors"
                  style={{ fontSize: "0.65rem" }}
                >
                  <ShoppingBag size={12} /> Quick Add
                </button>
              </div>
            </Link>
            <div>
              <p className="text-[#9A9590] uppercase tracking-wider mb-1" style={{ fontSize: "0.62rem" }}>
                {product.variants[0].label}
              </p>
              <Link to={`/product/${product.slug}`} className="block">
                <h3 className="text-[#1A1A1A] hover:text-[#C9A96E] transition-colors mb-1" style={{ fontSize: "0.85rem" }}>
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: "0.85rem" }} className="text-[#1A1A1A]">${product.variants[0].price}</span>
                {product.variants[0].originalPrice && (
                  <span className="text-[#B85042] line-through" style={{ fontSize: "0.78rem" }}>
                    ${product.variants[0].originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
