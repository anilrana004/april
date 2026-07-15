import { useState } from "react";
import { Link } from "react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { products, type Product } from "../data/products";

const newArrivals = products;

const filters = ["All", "Necklaces", "Earrings", "Rings", "Bracelets"];

const badgeColors: Record<string, string> = {
  New: "bg-[#1A1A1A] text-white",
  Sale: "bg-[#B85042] text-white",
  Bestseller: "bg-[#C9A96E] text-white",
};

type ProductGridProps = {
  onAddToCart: (product: Product, qty?: number) => void;
};

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [added, setAdded] = useState<number | null>(null);

  const filtered =
    activeFilter === "All"
      ? newArrivals
      : newArrivals.filter((p) => p.category === activeFilter);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    onAddToCart(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
          <div>
            <p className="uppercase tracking-[0.2em] text-[#C9A96E] mb-3" style={{ fontSize: "0.7rem" }}>
              Just Landed
            </p>
            <h2
              className="text-[#1A1A1A]"
              style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400 }}
            >
              New Arrivals
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 border transition-colors uppercase tracking-wider ${
                  activeFilter === f
                    ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                    : "border-[#D5CFC9] text-[#6B6560] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                }`}
                style={{ fontSize: "0.68rem" }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="group relative">
              <Link
                to={`/product/${product.slug}`}
                className="block relative overflow-hidden aspect-[3/4] bg-[#F0EDE9] mb-4"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {product.badge && (
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 uppercase tracking-wider ${badgeColors[product.badge]}`}
                    style={{ fontSize: "0.6rem" }}
                  >
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Wishlist"
                >
                  <Heart
                    size={14}
                    className={wishlist.has(product.id) ? "fill-[#B85042] text-[#B85042]" : "text-[#1A1A1A]"}
                  />
                </button>
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={(e) => handleAdd(e, product)}
                    className="w-full bg-[#1A1A1A] text-white py-3 flex items-center justify-center gap-2 uppercase tracking-wider hover:bg-[#333] transition-colors"
                    style={{ fontSize: "0.68rem" }}
                  >
                    {added === product.id ? (
                      "Added!"
                    ) : (
                      <><ShoppingBag size={13} /> Quick Add</>
                    )}
                  </button>
                </div>
              </Link>

              <div>
                <p className="text-[#9A9590] uppercase tracking-wider mb-1" style={{ fontSize: "0.65rem" }}>
                  {product.variants[0].label}
                </p>
                <Link to={`/product/${product.slug}`}>
                  <h3
                    className="text-[#1A1A1A] mb-1.5 hover:text-[#C9A96E] transition-colors"
                    style={{ fontSize: "0.88rem" }}
                  >
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-[#1A1A1A]" style={{ fontSize: "0.88rem" }}>
                    ${product.variants[0].price}
                  </span>
                  {product.variants[0].originalPrice && (
                    <span className="text-[#B85042] line-through" style={{ fontSize: "0.8rem" }}>
                      ${product.variants[0].originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/collections/all"
            className="inline-block border border-[#1A1A1A] text-[#1A1A1A] px-10 py-3.5 uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors"
            style={{ fontSize: "0.72rem" }}
          >
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
