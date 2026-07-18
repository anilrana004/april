import { useState, useMemo } from "react";
import { useParams, Link, useOutletContext } from "react-router";
import { SlidersHorizontal, ChevronDown, X, Heart, ShoppingBag } from "lucide-react";
import { products, type Product } from "../data/products";

type OutletContext = { handleAddToCart: (product: Product, qty?: number) => void };

const categoryHeaders: Record<string, { title: string; desc: string; image: string }> = {
  necklaces: {
    title: "Necklaces",
    desc: "From delicate chains to statement pendants — crafted for every moment.",
    image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400",
  },
  earrings: {
    title: "Earrings",
    desc: "Studs, hoops, and drops — find your signature ear.",
    image: "https://images.unsplash.com/photo-1585619979778-74d1811821d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400",
  },
  rings: {
    title: "Rings",
    desc: "Stack them, layer them, or wear one alone. Every ring tells a story.",
    image: "https://images.unsplash.com/photo-1605089315599-ca966e96b56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400",
  },
  bracelets: {
    title: "Bracelets",
    desc: "From chain bracelets to cuffs — arm candy for every wrist.",
    image: "https://images.unsplash.com/photo-1655255114527-d0a834d9a774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400",
  },
  all: {
    title: "All Jewelry",
    desc: "The full April Singh collection — fine jewelry for every day.",
    image: "https://images.unsplash.com/photo-1561828995-aa79a2db86dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400",
  },
};

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Selling", value: "bestselling" },
];

const materialOptions = ["14k Gold", "Sterling Silver", "14k Rose Gold"];
const priceRanges = [
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "$200 – $300", min: 200, max: 300 },
  { label: "Over $300", min: 300, max: Infinity },
];
const badgeOptions = ["New", "Bestseller", "Sale"];

const badgeColors: Record<string, string> = {
  New: "bg-[#1A1A1A] text-white",
  Sale: "bg-[#B85042] text-white",
  Bestseller: "bg-[#C9A96E] text-white",
};

export function CategoryPage() {
  const { category = "all" } = useParams<{ category: string }>();
  const { handleAddToCart } = useOutletContext<OutletContext>();

  const header = categoryHeaders[category.toLowerCase()] ?? categoryHeaders.all;

  const [sort, setSort] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [added, setAdded] = useState<number | null>(null);

  const toggleArr = <T,>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const filtered = useMemo(() => {
    let list =
      category.toLowerCase() === "all"
        ? products
        : products.filter((p) => p.category.toLowerCase() === category.toLowerCase());

    if (selectedMaterials.length > 0) {
      list = list.filter((p) =>
        p.variants.some((v) => selectedMaterials.some((m) => v.label.includes(m.split(" ").pop()!)))
      );
    }
    if (selectedPrices.length > 0) {
      const ranges = priceRanges.filter((_, i) => selectedPrices.includes(i));
      list = list.filter((p) =>
        ranges.some((r) => p.variants[0].price >= r.min && p.variants[0].price < r.max)
      );
    }
    if (selectedBadges.length > 0) {
      list = list.filter((p) => p.badge && selectedBadges.includes(p.badge));
    }

    switch (sort) {
      case "price-asc": return [...list].sort((a, b) => a.variants[0].price - b.variants[0].price);
      case "price-desc": return [...list].sort((a, b) => b.variants[0].price - a.variants[0].price);
      case "bestselling": return [...list].sort((a, b) => b.ratingCount - a.ratingCount);
      default: return list;
    }
  }, [category, sort, selectedMaterials, selectedPrices, selectedBadges]);

  const activeFilterCount = selectedMaterials.length + selectedPrices.length + selectedBadges.length;

  const handleAdd = (product: Product) => {
    handleAddToCart(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  const clearAll = () => {
    setSelectedMaterials([]);
    setSelectedPrices([]);
    setSelectedBadges([]);
  };

  return (
    <>
      {/* Category hero */}
      <div className="relative h-[240px] md:h-[320px] overflow-hidden">
        <img src={header.image} alt={header.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-white mb-3"
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400 }}
          >
            {header.title}
          </h1>
          <p className="text-white/70 max-w-md" style={{ fontSize: "0.88rem" }}>
            {header.desc}
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex items-center gap-2" style={{ fontSize: "0.72rem" }}>
        <Link to="/" className="text-[#9A9590] hover:text-[#C9A96E] uppercase tracking-wider">Home</Link>
        <span className="text-[#C5C0BB]">/</span>
        <span className="text-[#1A1A1A] uppercase tracking-wider">{header.title}</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-24">
        {/* Toolbar */}
        <div className="flex items-center justify-between py-4 border-y border-[#E8E4DF] mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFilterOpen((p) => !p)}
              className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
              style={{ fontSize: "0.72rem" }}
            >
              <SlidersHorizontal size={15} />
              <span className="uppercase tracking-widest">Filter</span>
              {activeFilterCount > 0 && (
                <span className="bg-[#C9A96E] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {activeFilterCount > 0 && (
              <button onClick={clearAll} className="flex items-center gap-1 text-[#9A9590] hover:text-[#B85042] transition-colors" style={{ fontSize: "0.7rem" }}>
                <X size={12} /> Clear all
              </button>
            )}
          </div>
          <p className="text-[#9A9590]" style={{ fontSize: "0.72rem" }}>
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="relative">
            <button
              onClick={() => setSortOpen((p) => !p)}
              className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors uppercase tracking-widest"
              style={{ fontSize: "0.72rem" }}
            >
              {sortOptions.find((s) => s.value === sort)?.label}
              <ChevronDown size={13} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-[#E8E4DF] shadow-lg z-20 min-w-[180px] py-2">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setSortOpen(false); }}
                    className={`block w-full text-left px-5 py-2.5 uppercase tracking-wider transition-colors ${
                      sort === opt.value ? "text-[#C9A96E]" : "text-[#555] hover:text-[#1A1A1A] hover:bg-[#FAFAF8]"
                    }`}
                    style={{ fontSize: "0.72rem" }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filter sidebar */}
          {filterOpen && (
            <aside className="w-56 flex-shrink-0">
              <div className="sticky top-24">
                <p className="uppercase tracking-widest text-[#1A1A1A] mb-6" style={{ fontSize: "0.68rem" }}>
                  Filters
                </p>

                {/* Material */}
                <div className="mb-6">
                  <p className="uppercase tracking-wider text-[#9A9590] mb-3" style={{ fontSize: "0.65rem" }}>Material</p>
                  {materialOptions.map((m) => (
                    <label key={m} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                      <div
                        onClick={() => setSelectedMaterials((p) => toggleArr(p, m))}
                        className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all ${
                          selectedMaterials.includes(m)
                            ? "border-[#1A1A1A] bg-[#1A1A1A]"
                            : "border-[#D5CFC9] group-hover:border-[#C9A96E]"
                        }`}
                      >
                        {selectedMaterials.includes(m) && <span className="text-white" style={{ fontSize: "0.55rem" }}>✓</span>}
                      </div>
                      <span className="text-[#555] group-hover:text-[#1A1A1A] transition-colors" style={{ fontSize: "0.78rem" }}>{m}</span>
                    </label>
                  ))}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="uppercase tracking-wider text-[#9A9590] mb-3" style={{ fontSize: "0.65rem" }}>Price</p>
                  {priceRanges.map((r, i) => (
                    <label key={r.label} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                      <div
                        onClick={() => setSelectedPrices((p) => toggleArr(p, i))}
                        className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all ${
                          selectedPrices.includes(i)
                            ? "border-[#1A1A1A] bg-[#1A1A1A]"
                            : "border-[#D5CFC9] group-hover:border-[#C9A96E]"
                        }`}
                      >
                        {selectedPrices.includes(i) && <span className="text-white" style={{ fontSize: "0.55rem" }}>✓</span>}
                      </div>
                      <span className="text-[#555] group-hover:text-[#1A1A1A] transition-colors" style={{ fontSize: "0.78rem" }}>{r.label}</span>
                    </label>
                  ))}
                </div>

                {/* Badge */}
                <div>
                  <p className="uppercase tracking-wider text-[#9A9590] mb-3" style={{ fontSize: "0.65rem" }}>Collection</p>
                  {badgeOptions.map((b) => (
                    <label key={b} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                      <div
                        onClick={() => setSelectedBadges((p) => toggleArr(p, b))}
                        className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all ${
                          selectedBadges.includes(b)
                            ? "border-[#1A1A1A] bg-[#1A1A1A]"
                            : "border-[#D5CFC9] group-hover:border-[#C9A96E]"
                        }`}
                      >
                        {selectedBadges.includes(b) && <span className="text-white" style={{ fontSize: "0.55rem" }}>✓</span>}
                      </div>
                      <span className="text-[#555] group-hover:text-[#1A1A1A] transition-colors" style={{ fontSize: "0.78rem" }}>{b}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-[#9A9590] uppercase tracking-widest mb-4" style={{ fontSize: "0.78rem" }}>
                  No products match your filters
                </p>
                <button
                  onClick={clearAll}
                  className="border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3 uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  style={{ fontSize: "0.68rem" }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-4 md:gap-6 ${filterOpen ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
                {filtered.map((product) => (
                  <div key={product.id} className="group relative">
                    <Link
                      to={`/product/${product.slug}`}
                      className="block relative overflow-hidden aspect-[3/4] bg-[#F5F0EB] mb-4"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                        onClick={(e) => {
                          e.preventDefault();
                          setWishlist((p) => { const n = new Set(p); n.has(product.id) ? n.delete(product.id) : n.add(product.id); return n; });
                        }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart size={13} className={wishlist.has(product.id) ? "fill-[#B85042] text-[#B85042]" : "text-[#1A1A1A]"} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button
                          onClick={(e) => { e.preventDefault(); handleAdd(product); }}
                          className="w-full bg-[#1A1A1A] text-white py-3 flex items-center justify-center gap-2 uppercase tracking-wider hover:bg-[#333] transition-colors"
                          style={{ fontSize: "0.65rem" }}
                        >
                          {added === product.id ? "Added!" : <><ShoppingBag size={12} /> Quick Add</>}
                        </button>
                      </div>
                    </Link>
                    <p className="text-[#9A9590] uppercase tracking-wider mb-1" style={{ fontSize: "0.62rem" }}>
                      {product.variants[0].label}
                    </p>
                    <Link to={`/product/${product.slug}`}>
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
