import { useState, useEffect } from "react";
import { X, Search, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { products } from "../data/products";

const suggestions = [
  "Gold necklace", "Pearl earrings", "Diamond ring", "Tennis bracelet",
  "Hoop earrings", "Signet ring", "Chain necklace", "Cuff bracelet",
];

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const filtered = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.includes(query.toLowerCase()))
      )
    : [];

  const trending = products.slice(0, 4);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full shadow-2xl">
        {/* Search input */}
        <div className="max-w-[900px] mx-auto px-4 md:px-8 py-6 flex items-center gap-4">
          <Search size={20} className="text-[#9A9590] flex-shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for jewelry..."
            className="flex-1 text-[#1A1A1A] placeholder-[#B0AAA4] outline-none bg-transparent"
            style={{ fontSize: "1rem" }}
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-[#9A9590] hover:text-[#1A1A1A] transition-colors">
              <X size={18} />
            </button>
          )}
          <button onClick={onClose} className="text-[#9A9590] hover:text-[#1A1A1A] transition-colors ml-2">
            <X size={22} />
          </button>
        </div>

        <div className="border-t border-[#E8E4DF]">
          <div className="max-w-[900px] mx-auto px-4 md:px-8 py-8">
            {!query ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Popular searches */}
                <div>
                  <p className="uppercase tracking-[0.18em] text-[#9A9590] mb-5" style={{ fontSize: "0.65rem" }}>
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="border border-[#E0DAD4] text-[#6B6560] px-3.5 py-1.5 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8">
                    <p className="uppercase tracking-[0.18em] text-[#9A9590] mb-4" style={{ fontSize: "0.65rem" }}>
                      Collections
                    </p>
                    <div className="space-y-2">
                      {["Necklaces", "Earrings", "Rings", "Bracelets"].map((cat) => (
                        <Link
                          key={cat}
                          to={`/collections/${cat.toLowerCase()}`}
                          onClick={onClose}
                          className="flex items-center justify-between py-2 text-[#555] hover:text-[#C9A96E] transition-colors border-b border-[#F5F0EB] group"
                          style={{ fontSize: "0.82rem" }}
                        >
                          {cat}
                          <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Trending products */}
                <div>
                  <p className="uppercase tracking-[0.18em] text-[#9A9590] mb-5" style={{ fontSize: "0.65rem" }}>
                    Trending Now
                  </p>
                  <div className="space-y-4">
                    {trending.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 cursor-pointer group"
                      >
                        <div className="w-14 h-14 overflow-hidden bg-[#F0EDE9] flex-shrink-0">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors" style={{ fontSize: "0.84rem" }}>
                            {item.name}
                          </p>
                          <p className="text-[#9A9590]" style={{ fontSize: "0.75rem" }}>
                            ${item.variants[0].price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Search results */
              <div>
                <p className="text-[#9A9590] mb-6" style={{ fontSize: "0.82rem" }}>
                  {filtered.length > 0
                    ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${query}"`
                    : `No results for "${query}"`}
                </p>
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filtered.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.slug}`}
                        onClick={onClose}
                        className="group"
                      >
                        <div className="aspect-square overflow-hidden bg-[#F0EDE9] mb-3">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <p className="text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors" style={{ fontSize: "0.82rem" }}>
                          {item.name}
                        </p>
                        <p className="text-[#9A9590]" style={{ fontSize: "0.75rem" }}>
                          ${item.variants[0].price}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-8">
                    <p className="text-[#9A9590] mb-4" style={{ fontSize: "0.82rem" }}>
                      Try searching for:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.slice(0, 5).map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="border border-[#E0DAD4] text-[#6B6560] px-3.5 py-1.5 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
