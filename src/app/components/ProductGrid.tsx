import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  material: string;
  image: string;
  hoverImage?: string;
  badge?: string;
  category: string;
};

const newArrivals: Product[] = [
  {
    id: 1,
    name: "Crescent Moon Pendant",
    price: 148,
    material: "14k Gold",
    image: "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxmaW5lJTIwamV3ZWxyeSUyMGdvbGQlMjBuZWNrbGFjZSUyMG1pbmltYWx8ZW58MXx8fHwxNzgzMjc4MzkzfDA&ixlib=rb-4.1.0&q=80&w=600",
    badge: "New",
    category: "Necklaces",
  },
  {
    id: 2,
    name: "Dome Signet Ring",
    price: 195,
    material: "14k Gold",
    image: "https://images.unsplash.com/photo-1625516152414-8f33eef3d660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxqZXdlbHJ5JTIwZWFycmluZ3MlMjByaW5ncyUyMGx1eHVyeSUyMG1pbmltYWx8ZW58MXx8fHwxNzgzMjc4Mzk0fDA&ixlib=rb-4.1.0&q=80&w=600",
    badge: "New",
    category: "Rings",
  },
  {
    id: 3,
    name: "Herringbone Chain",
    price: 228,
    material: "Sterling Silver",
    image: "https://images.unsplash.com/photo-1631050165155-421c47e306f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxmaW5lJTIwamV3ZWxyeSUyMGdvbGQlMjBuZWNrbGFjZSUyMG1pbmltYWx8ZW58MXx8fHwxNzgzMjc4MzkzfDA&ixlib=rb-4.1.0&q=80&w=600",
    badge: "New",
    category: "Necklaces",
  },
  {
    id: 4,
    name: "Pavé Diamond Huggie",
    price: 310,
    originalPrice: 390,
    material: "14k Gold · Diamond",
    image: "https://images.unsplash.com/photo-1561828995-aa79a2db86dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwZWFycmluZ3MlMjByaW5ncyUyMGx1eHVyeSUyMG1pbmltYWx8ZW58MXx8fHwxNzgzMjc4Mzk0fDA&ixlib=rb-4.1.0&q=80&w=600",
    badge: "Sale",
    category: "Earrings",
  },
  {
    id: 5,
    name: "Twisted Rope Bracelet",
    price: 172,
    material: "14k Gold",
    image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxqZXdlbHJ5JTIwZWFycmluZ3MlMjByaW5ncyUyMGx1eHVyeSUyMG1pbmltYWx8ZW58MXx8fHwxNzgzMjc4Mzk0fDA&ixlib=rb-4.1.0&q=80&w=600",
    badge: "New",
    category: "Bracelets",
  },
  {
    id: 6,
    name: "Layered Satellite Chain",
    price: 184,
    material: "14k Gold",
    image: "https://images.unsplash.com/photo-1633555234047-192d10238f5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxmaW5lJTIwamV3ZWxyeSUyMGdvbGQlMjBuZWNrbGFjZSUyMG1pbmltYWx8ZW58MXx8fHwxNzgzMjc4MzkzfDA&ixlib=rb-4.1.0&q=80&w=600",
    badge: "Bestseller",
    category: "Necklaces",
  },
  {
    id: 7,
    name: "Oval Hoop Earrings",
    price: 138,
    material: "14k Gold",
    image: "https://images.unsplash.com/photo-1599459183200-59c7687a0275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxmaW5lJTIwamV3ZWxyeSUyMGdvbGQlMjBuZWNrbGFjZSUyMG1pbmltYWx8ZW58MXx8fHwxNzgzMjc4MzkzfDA&ixlib=rb-4.1.0&q=80&w=600",
    badge: "Bestseller",
    category: "Earrings",
  },
  {
    id: 8,
    name: "Stacking Band Set",
    price: 245,
    material: "14k Gold · Pearl",
    image: "https://images.unsplash.com/photo-1600721391689-2564bb8055de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmaW5lJTIwamV3ZWxyeSUyMGdvbGQlMjBuZWNrbGFjZSUyMG1pbmltYWx8ZW58MXx8fHwxNzgzMjc4MzkzfDA&ixlib=rb-4.1.0&q=80&w=600",
    badge: "New",
    category: "Rings",
  },
];

const filters = ["All", "Necklaces", "Earrings", "Rings", "Bracelets"];

const badgeColors: Record<string, string> = {
  New: "bg-[#1A1A1A] text-white",
  Sale: "bg-[#B85042] text-white",
  Bestseller: "bg-[#C9A96E] text-white",
};

type ProductGridProps = {
  onAddToCart: (product: Product) => void;
};

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [added, setAdded] = useState<number | null>(null);

  const filtered = activeFilter === "All" ? newArrivals : newArrivals.filter((p) => p.category === activeFilter);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAdd = (product: Product) => {
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

          {/* Filters */}
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
              {/* Image container */}
              <div className="relative overflow-hidden aspect-[3/4] bg-[#F0EDE9] mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badge */}
                {product.badge && (
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 uppercase tracking-wider ${badgeColors[product.badge]}`}
                    style={{ fontSize: "0.6rem" }}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="w-8 h-8 bg-white flex items-center justify-center shadow-sm hover:bg-[#F5F0EB] transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={14}
                      className={wishlist.has(product.id) ? "fill-[#B85042] text-[#B85042]" : "text-[#1A1A1A]"}
                    />
                  </button>
                </div>

                {/* Quick add */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => handleAdd(product)}
                    className="w-full bg-[#1A1A1A] text-white py-3 flex items-center justify-center gap-2 uppercase tracking-wider hover:bg-[#333] transition-colors"
                    style={{ fontSize: "0.68rem" }}
                  >
                    {added === product.id ? (
                      "Added!"
                    ) : (
                      <>
                        <ShoppingBag size={13} /> Quick Add
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Info */}
              <div>
                <p className="text-[#9A9590] uppercase tracking-wider mb-1" style={{ fontSize: "0.65rem" }}>
                  {product.material}
                </p>
                <h3 className="text-[#1A1A1A] mb-1.5 group-hover:text-[#C9A96E] transition-colors" style={{ fontSize: "0.88rem" }}>
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[#1A1A1A]" style={{ fontSize: "0.88rem" }}>
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[#B85042] line-through" style={{ fontSize: "0.8rem" }}>
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-14">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-block border border-[#1A1A1A] text-[#1A1A1A] px-10 py-3.5 uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors"
            style={{ fontSize: "0.72rem" }}
          >
            View All New Arrivals
          </a>
        </div>
      </div>
    </section>
  );
}
