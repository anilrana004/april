import { useState } from "react";
import { Search, ShoppingBag, User, Heart, X, Menu, ChevronDown } from "lucide-react";

const navCategories = [
  {
    label: "Necklaces",
    sub: ["Pendants", "Chains", "Chokers", "Layering Necklaces", "Statement"],
  },
  {
    label: "Earrings",
    sub: ["Studs", "Hoops", "Drop & Dangle", "Ear Cuffs", "Climbers"],
  },
  {
    label: "Rings",
    sub: ["Stacking Rings", "Statement Rings", "Signet Rings", "Gemstone", "Plain Bands"],
  },
  {
    label: "Bracelets",
    sub: ["Chain Bracelets", "Cuffs", "Tennis Bracelets", "Beaded", "Charm"],
  },
  { label: "New Arrivals", sub: [] },
  { label: "Bestsellers", sub: [] },
  { label: "Sale", sub: [] },
];

type NavbarProps = {
  cartCount: number;
  onCartOpen: () => void;
  onSearchOpen: () => void;
};

export function Navbar({ cartCount, onCartOpen, onSearchOpen }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#1A1A1A] text-white text-center py-2.5 px-4" style={{ fontSize: "0.7rem", letterSpacing: "0.12em" }}>
        <span className="uppercase tracking-widest">Free shipping on orders over $150 · Complimentary gift wrapping</span>
      </div>

      <header className="bg-white border-b border-[#E8E4DF] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 -ml-2 text-[#1A1A1A]"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <a href="#" className="flex items-center select-none">
              <span
                className="text-[#1A1A1A] tracking-[0.3em] uppercase"
                style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", letterSpacing: "0.3em" }}
              >
                Aurea
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navCategories.map((cat) => (
                <div
                  key={cat.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(cat.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href="#"
                    className={`flex items-center gap-0.5 py-1 text-[0.78rem] uppercase tracking-widest transition-colors ${
                      cat.label === "Sale"
                        ? "text-[#B85042] hover:text-[#8a3632]"
                        : "text-[#1A1A1A] hover:text-[#C9A96E]"
                    }`}
                    onClick={(e) => e.preventDefault()}
                  >
                    {cat.label}
                    {cat.sub.length > 0 && <ChevronDown size={12} className="mt-0.5 opacity-60" />}
                  </a>

                  {cat.sub.length > 0 && activeDropdown === cat.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                      <div className="bg-white border border-[#E8E4DF] shadow-lg rounded-sm min-w-[160px] py-3">
                        {cat.sub.map((sub) => (
                          <a
                            key={sub}
                            href="#"
                            className="block px-5 py-2 text-[0.75rem] uppercase tracking-wider text-[#555] hover:text-[#C9A96E] hover:bg-[#FAFAF8] transition-colors"
                            onClick={(e) => e.preventDefault()}
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={onSearchOpen}
                className="p-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button className="p-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors hidden md:block" aria-label="Wishlist">
                <Heart size={20} />
              </button>
              <button className="p-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors hidden md:block" aria-label="Account">
                <User size={20} />
              </button>
              <button
                onClick={onCartOpen}
                className="p-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#C9A96E] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative w-80 max-w-full bg-white h-full flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DF]">
              <span className="text-[#1A1A1A] tracking-[0.3em] uppercase" style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem" }}>
                Aurea
              </span>
              <button onClick={() => setMobileOpen(false)} className="text-[#1A1A1A]">
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 px-4 py-4">
              {navCategories.map((cat) => (
                <div key={cat.label} className="border-b border-[#F0EDE9]">
                  {cat.sub.length > 0 ? (
                    <>
                      <button
                        className="flex w-full items-center justify-between py-3.5 text-[0.8rem] uppercase tracking-widest text-[#1A1A1A]"
                        onClick={() => setMobileExpanded(mobileExpanded === cat.label ? null : cat.label)}
                      >
                        {cat.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${mobileExpanded === cat.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileExpanded === cat.label && (
                        <div className="pb-2 pl-4">
                          {cat.sub.map((sub) => (
                            <a
                              key={sub}
                              href="#"
                              className="block py-2 text-[0.75rem] uppercase tracking-wider text-[#777] hover:text-[#C9A96E]"
                              onClick={(e) => e.preventDefault()}
                            >
                              {sub}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href="#"
                      className={`block py-3.5 text-[0.8rem] uppercase tracking-widest ${
                        cat.label === "Sale" ? "text-[#B85042]" : "text-[#1A1A1A]"
                      }`}
                      onClick={(e) => e.preventDefault()}
                    >
                      {cat.label}
                    </a>
                  )}
                </div>
              ))}
            </nav>
            <div className="px-5 py-5 border-t border-[#E8E4DF] flex gap-5">
              <button className="flex items-center gap-2 text-[0.75rem] uppercase tracking-wider text-[#555]">
                <User size={16} /> Account
              </button>
              <button className="flex items-center gap-2 text-[0.75rem] uppercase tracking-wider text-[#555]">
                <Heart size={16} /> Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
