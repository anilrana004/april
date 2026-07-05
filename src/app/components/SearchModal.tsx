import { useState } from "react";
import { X, Search } from "lucide-react";

const suggestions = [
  "Gold necklace", "Pearl earrings", "Diamond ring", "Tennis bracelet",
  "Hoop earrings", "Signet ring", "Chain necklace", "Cuff bracelet",
];

const trending = [
  { name: "Crescent Moon Pendant", price: 148, image: "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" },
  { name: "Oval Hoop Earrings", price: 138, image: "https://images.unsplash.com/photo-1599459183200-59c7687a0275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" },
  { name: "Dome Signet Ring", price: 195, image: "https://images.unsplash.com/photo-1625516152414-8f33eef3d660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" },
];

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

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
            onKeyDown={(e) => e.key === "Escape" && onClose()}
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

        {/* Suggestions */}
        {!query && (
          <div className="border-t border-[#E8E4DF]">
            <div className="max-w-[900px] mx-auto px-4 md:px-8 py-8">
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
                </div>

                {/* Trending products */}
                <div>
                  <p className="uppercase tracking-[0.18em] text-[#9A9590] mb-5" style={{ fontSize: "0.65rem" }}>
                    Trending Now
                  </p>
                  <div className="space-y-4">
                    {trending.map((item) => (
                      <div key={item.name} className="flex items-center gap-4 cursor-pointer group">
                        <div className="w-14 h-14 overflow-hidden bg-[#F0EDE9] flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors" style={{ fontSize: "0.84rem" }}>
                            {item.name}
                          </p>
                          <p className="text-[#9A9590]" style={{ fontSize: "0.75rem" }}>
                            ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Query results */}
        {query && (
          <div className="border-t border-[#E8E4DF]">
            <div className="max-w-[900px] mx-auto px-4 md:px-8 py-8">
              <p className="text-[#9A9590]" style={{ fontSize: "0.82rem" }}>
                Showing results for <span className="text-[#1A1A1A]">"{query}"</span>
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {suggestions
                  .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
                  .map((s) => (
                    <button
                      key={s}
                      className="border border-[#E0DAD4] text-[#6B6560] px-3.5 py-1.5 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {s}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
