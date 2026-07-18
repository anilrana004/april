import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Search, ShoppingBag, User, Heart, X, Menu, ChevronDown } from "lucide-react";

const navCategories = [
  {
    label: "Necklaces",
    slug: "necklaces",
    sub: [
      { label: "Pendants", slug: "necklaces" },
      { label: "Chains", slug: "necklaces" },
      { label: "Chokers", slug: "necklaces" },
      { label: "Layering Necklaces", slug: "necklaces" },
      { label: "Statement", slug: "necklaces" },
    ],
    featured: {
      image: "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      label: "The Gold Edit",
      sub: "New arrivals in 14k gold",
    },
  },
  {
    label: "Earrings",
    slug: "earrings",
    sub: [
      { label: "Studs", slug: "earrings" },
      { label: "Hoops", slug: "earrings" },
      { label: "Drop & Dangle", slug: "earrings" },
      { label: "Ear Cuffs", slug: "earrings" },
      { label: "Huggies", slug: "earrings" },
    ],
    featured: {
      image: "https://images.unsplash.com/photo-1561828995-aa79a2db86dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      label: "Diamond Collection",
      sub: "Pavé & brilliant-cut diamonds",
    },
  },
  {
    label: "Rings",
    slug: "rings",
    sub: [
      { label: "Stacking Rings", slug: "rings" },
      { label: "Statement Rings", slug: "rings" },
      { label: "Signet Rings", slug: "rings" },
      { label: "Gemstone", slug: "rings" },
      { label: "Plain Bands", slug: "rings" },
    ],
    featured: {
      image: "https://images.unsplash.com/photo-1625516152414-8f33eef3d660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      label: "Stack Your Story",
      sub: "Rings designed to layer",
    },
  },
  {
    label: "Bracelets",
    slug: "bracelets",
    sub: [
      { label: "Chain Bracelets", slug: "bracelets" },
      { label: "Cuffs", slug: "bracelets" },
      { label: "Tennis Bracelets", slug: "bracelets" },
      { label: "Beaded", slug: "bracelets" },
      { label: "Charm", slug: "bracelets" },
    ],
    featured: {
      image: "https://images.unsplash.com/photo-1655255114527-d0a834d9a774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      label: "Arm Candy",
      sub: "Stack-ready bracelets",
    },
  },
  { label: "New Arrivals", slug: "all", sub: [], featured: null },
  { label: "Bestsellers", slug: "all", sub: [], featured: null },
  { label: "Sale", slug: "all", sub: [], featured: null },
];

const atelierLink = { label: "Design Your Own", path: "/design-your-own" };

type NavbarProps = {
  cartCount: number;
  onCartOpen: () => void;
  onSearchOpen: () => void;
};

export function Navbar({ cartCount, onCartOpen, onSearchOpen }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = (label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    leaveTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      {/* Announcement bar */}
      <div
        className="bg-[#1A1A1A] text-white text-center py-2.5 px-4"
        style={{ fontSize: "0.68rem", letterSpacing: "0.12em" }}
      >
        <span className="uppercase tracking-widest">
          Free shipping on orders over $150 &nbsp;·&nbsp; Complimentary gift wrapping &nbsp;·&nbsp; 30-day free returns
        </span>
      </div>

      <header
        className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-sm" : "border-b border-[#E8E4DF]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 -ml-2 text-[#1A1A1A]"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center select-none shrink-0">
              <span
                className="text-[#1A1A1A] tracking-[0.3em] uppercase"
                style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem" }}
              >
                April Singh
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
              <Link
                to={atelierLink.path}
                className="py-1 uppercase tracking-widest text-[#C9A96E] hover:text-[#b8944f] transition-colors border-b border-[#C9A96E] pb-0.5"
                style={{ fontSize: "0.72rem" }}
              >
                {atelierLink.label}
              </Link>
              {navCategories.map((cat) => (
                <div
                  key={cat.label}
                  className="relative"
                  onMouseEnter={() => cat.sub.length > 0 && openDropdown(cat.label)}
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    to={`/collections/${cat.slug}`}
                    className={`flex items-center gap-0.5 py-1 uppercase tracking-widest transition-colors ${
                      cat.label === "Sale"
                        ? "text-[#B85042] hover:text-[#8a3632]"
                        : "text-[#1A1A1A] hover:text-[#C9A96E]"
                    }`}
                    style={{ fontSize: "0.72rem" }}
                  >
                    {cat.label}
                    {cat.sub.length > 0 && (
                      <ChevronDown
                        size={11}
                        className={`mt-0.5 opacity-60 transition-transform ${activeDropdown === cat.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>

                  {/* Mega dropdown */}
                  {cat.sub.length > 0 && activeDropdown === cat.label && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
                      onMouseEnter={() => openDropdown(cat.label)}
                      onMouseLeave={closeDropdown}
                    >
                      <div className="bg-white border border-[#E8E4DF] shadow-xl flex overflow-hidden" style={{ minWidth: "480px" }}>
                        {/* Sub links */}
                        <div className="py-6 px-8 flex flex-col justify-center gap-1 flex-1">
                          <p className="uppercase tracking-[0.18em] text-[#C9A96E] mb-3" style={{ fontSize: "0.6rem" }}>
                            {cat.label}
                          </p>
                          {cat.sub.map((sub) => (
                            <Link
                              key={sub.label}
                              to={`/collections/${sub.slug}`}
                              className="block py-1.5 text-[#555] hover:text-[#C9A96E] transition-colors uppercase tracking-wider"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {sub.label}
                            </Link>
                          ))}
                          <Link
                            to={`/collections/${cat.slug}`}
                            className="mt-4 text-[#1A1A1A] uppercase tracking-widest hover:text-[#C9A96E] transition-colors border-b border-[#1A1A1A] pb-0.5 w-fit hover:border-[#C9A96E]"
                            style={{ fontSize: "0.65rem" }}
                          >
                            Shop All {cat.label}
                          </Link>
                        </div>
                        {/* Featured image */}
                        {cat.featured && (
                          <div className="relative w-[180px] flex-shrink-0">
                            <img
                              src={cat.featured.image}
                              alt={cat.featured.label}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <p className="text-white uppercase tracking-wider" style={{ fontSize: "0.65rem" }}>
                                {cat.featured.label}
                              </p>
                              <p className="text-white/60 mt-0.5" style={{ fontSize: "0.6rem" }}>
                                {cat.featured.sub}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={onSearchOpen}
                className="p-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link to="#" className="p-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors hidden md:flex" aria-label="Wishlist">
                <Heart size={20} />
              </Link>
              <Link to="#" className="p-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors hidden md:flex" aria-label="Account">
                <User size={20} />
              </Link>
              <button
                onClick={onCartOpen}
                className="p-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#C9A96E] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
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
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-80 max-w-full bg-white h-full flex flex-col overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DF]">
              <Link to="/" className="text-[#1A1A1A] tracking-[0.3em] uppercase" style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem" }}>
                April Singh
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-[#1A1A1A]">
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 px-4 py-4">
              <div className="border-b border-[#F0EDE9]">
                <Link
                  to={atelierLink.path}
                  className="flex items-center justify-between py-3.5 uppercase tracking-widest text-[#C9A96E]"
                  style={{ fontSize: "0.78rem" }}
                >
                  {atelierLink.label}
                  <span className="text-[#C9A96E]" style={{ fontSize: "0.58rem" }}>BESPOKE</span>
                </Link>
              </div>
              {navCategories.map((cat) => (
                <div key={cat.label} className="border-b border-[#F0EDE9]">
                  {cat.sub.length > 0 ? (
                    <>
                      <button
                        className="flex w-full items-center justify-between py-3.5 uppercase tracking-widest text-[#1A1A1A]"
                        style={{ fontSize: "0.78rem" }}
                        onClick={() => setMobileExpanded(mobileExpanded === cat.label ? null : cat.label)}
                      >
                        {cat.label}
                        <ChevronDown size={14} className={`transition-transform ${mobileExpanded === cat.label ? "rotate-180" : ""}`} />
                      </button>
                      {mobileExpanded === cat.label && (
                        <div className="pb-3 pl-4 space-y-1">
                          {cat.sub.map((sub) => (
                            <Link
                              key={sub.label}
                              to={`/collections/${sub.slug}`}
                              className="block py-2 uppercase tracking-wider text-[#777] hover:text-[#C9A96E] transition-colors"
                              style={{ fontSize: "0.72rem" }}
                            >
                              {sub.label}
                            </Link>
                          ))}
                          <Link
                            to={`/collections/${cat.slug}`}
                            className="block py-2 uppercase tracking-wider text-[#C9A96E] hover:underline"
                            style={{ fontSize: "0.72rem" }}
                          >
                            Shop All {cat.label}
                          </Link>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={`/collections/${cat.slug}`}
                      className={`block py-3.5 uppercase tracking-widest ${cat.label === "Sale" ? "text-[#B85042]" : "text-[#1A1A1A]"}`}
                      style={{ fontSize: "0.78rem" }}
                    >
                      {cat.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="px-5 py-5 border-t border-[#E8E4DF] flex gap-6">
              <button className="flex items-center gap-2 uppercase tracking-wider text-[#555]" style={{ fontSize: "0.72rem" }}>
                <User size={15} /> Account
              </button>
              <button className="flex items-center gap-2 uppercase tracking-wider text-[#555]" style={{ fontSize: "0.72rem" }}>
                <Heart size={15} /> Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
