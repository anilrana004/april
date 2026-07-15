import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useOutletContext, Link } from "react-router";
import {
  Heart, Star, ChevronDown, ChevronRight, Minus, Plus,
  ShoppingBag, Shield, RotateCcw, Truck, Gift, Check,
  ZoomIn, ChevronLeft
} from "lucide-react";
import { getProductBySlug, getRelatedProducts, type Product, type ProductVariant } from "../data/products";
import { RelatedProducts } from "../components/RelatedProducts";
import { ReviewsSection } from "../components/ReviewsSection";
import { StickyAddToCart } from "../components/StickyAddToCart";

type OutletContext = { handleAddToCart: (product: Product, qty?: number) => void };

const materialColors: Record<string, string> = {
  "14k-gold": "#C9A96E",
  "sterling": "#A8A8A8",
  "rose-gold": "#E8A090",
  "14k-white": "#D8D8D8",
};

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { handleAddToCart } = useOutletContext<OutletContext>();

  const product = getProductBySlug(slug ?? "");

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [zooming, setZooming] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const addBtnRef = useRef<HTMLButtonElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setSelectedSize(null);
      setActiveImage(0);
    }
  }, [product]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (addBtnRef.current) observer.observe(addBtnRef.current);
    return () => observer.disconnect();
  }, [addBtnRef.current]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-[#1A1A1A] uppercase tracking-widest" style={{ fontSize: "0.8rem" }}>
          Product not found
        </p>
        <button
          onClick={() => navigate("/")}
          className="border border-[#1A1A1A] px-8 py-3 uppercase tracking-widest text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
          style={{ fontSize: "0.7rem" }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const price = selectedVariant?.price ?? product.variants[0].price;
  const originalPrice = selectedVariant?.originalPrice ?? product.variants[0].originalPrice;
  const inStock = selectedVariant?.inStock ?? true;
  const related = getRelatedProducts(product.relatedIds);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCartClick = () => {
    if (product.sizes && !selectedSize) {
      setSizeError(true);
      document.getElementById("size-selector")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSizeError(false);
    handleAddToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const accordionSections = [
    { id: "description", label: "Description", content: product.description },
    {
      id: "details", label: "Details & Materials",
      content: (
        <ul className="space-y-2">
          {product.details.map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[#C9A96E] mt-2 flex-shrink-0" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "dimensions", label: "Dimensions",
      content: (
        <ul className="space-y-2">
          {product.dimensions.map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[#C9A96E] mt-2 flex-shrink-0" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "care", label: "Care Instructions",
      content: (
        <ul className="space-y-2">
          {product.care.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[#C9A96E] mt-2 flex-shrink-0" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "shipping", label: "Shipping & Returns",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Truck size={16} className="text-[#C9A96E] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[#1A1A1A] mb-1" style={{ fontSize: "0.82rem" }}>Free Standard Shipping</p>
              <p className="text-[#6B6560]">On orders over $150. Delivery in 3–5 business days.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RotateCcw size={16} className="text-[#C9A96E] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[#1A1A1A] mb-1" style={{ fontSize: "0.82rem" }}>30-Day Free Returns</p>
              <p className="text-[#6B6560]">Not in love? Return within 30 days for a full refund.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Gift size={16} className="text-[#C9A96E] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[#1A1A1A] mb-1" style={{ fontSize: "0.82rem" }}>Complimentary Gift Wrapping</p>
              <p className="text-[#6B6560]">Every order arrives in our signature box with ribbon.</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-4 md:py-6" style={{ fontSize: "0.72rem" }}>
          <Link to="/" className="text-[#9A9590] hover:text-[#C9A96E] transition-colors uppercase tracking-wider">
            Home
          </Link>
          <ChevronRight size={12} className="text-[#C5C0BB]" />
          <Link
            to={`/collections/${product.category.toLowerCase()}`}
            className="text-[#9A9590] hover:text-[#C9A96E] transition-colors uppercase tracking-wider"
          >
            {product.category}
          </Link>
          <ChevronRight size={12} className="text-[#C5C0BB]" />
          <span className="text-[#1A1A1A] uppercase tracking-wider">{product.name}</span>
        </nav>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pb-20">
          {/* ── LEFT: Image Gallery ── */}
          <div className="flex gap-4">
            {/* Thumbnail strip */}
            <div className="hidden md:flex flex-col gap-3 w-[72px] flex-shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square overflow-hidden border-2 transition-all ${
                    activeImage === i ? "border-[#1A1A1A]" : "border-transparent hover:border-[#C9A96E]"
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1">
              <div
                ref={imgRef}
                className="relative aspect-[3/4] overflow-hidden bg-[#F5F0EB] cursor-zoom-in group"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setZooming(true)}
                onMouseLeave={() => setZooming(false)}
              >
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={
                    zooming
                      ? { transform: "scale(1.6)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                      : {}
                  }
                />
                {product.badge && (
                  <span
                    className={`absolute top-4 left-4 px-3 py-1.5 uppercase tracking-wider text-white z-10 ${
                      product.badge === "Sale"
                        ? "bg-[#B85042]"
                        : product.badge === "Bestseller"
                        ? "bg-[#C9A96E]"
                        : "bg-[#1A1A1A]"
                    }`}
                    style={{ fontSize: "0.6rem" }}
                  >
                    {product.badge}
                  </span>
                )}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/80 backdrop-blur-sm p-2">
                    <ZoomIn size={16} className="text-[#6B6560]" />
                  </div>
                </div>
                {/* Prev/Next arrows (mobile) */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm w-8 h-8 flex items-center justify-center md:hidden"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => setActiveImage((prev) => (prev + 1) % product.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm w-8 h-8 flex items-center justify-center md:hidden"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
              </div>

              {/* Mobile thumbnail dots */}
              <div className="flex gap-2 justify-center mt-3 md:hidden">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      activeImage === i ? "bg-[#1A1A1A] w-4" : "bg-[#C5C0BB]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Rating */}
            <a href="#reviews" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < Math.floor(product.ratingAvg) ? "fill-[#C9A96E] text-[#C9A96E]" : "text-[#D5CFC9]"}
                  />
                ))}
              </div>
              <span className="text-[#6B6560] group-hover:text-[#C9A96E] transition-colors" style={{ fontSize: "0.75rem" }}>
                {product.ratingAvg} ({product.ratingCount} reviews)
              </span>
            </a>

            {/* Name */}
            <h1
              className="text-[#1A1A1A] mb-2"
              style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, lineHeight: 1.2 }}
            >
              {product.name}
            </h1>
            <p className="text-[#6B6560] mb-6" style={{ fontSize: "0.88rem", lineHeight: 1.7 }}>
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-[#E8E4DF]">
              <span
                className="text-[#1A1A1A]"
                style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 400 }}
              >
                ${price}
              </span>
              {originalPrice && (
                <>
                  <span className="text-[#B85042] line-through" style={{ fontSize: "1.1rem" }}>
                    ${originalPrice}
                  </span>
                  <span
                    className="bg-[#B85042] text-white px-2.5 py-1 uppercase tracking-wider"
                    style={{ fontSize: "0.62rem" }}
                  >
                    Save ${originalPrice - price}
                  </span>
                </>
              )}
            </div>

            {/* Material selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="uppercase tracking-widest text-[#1A1A1A]" style={{ fontSize: "0.68rem" }}>
                  Material
                </p>
                <p className="text-[#6B6560]" style={{ fontSize: "0.75rem" }}>
                  {selectedVariant?.label}
                </p>
              </div>
              <div className="flex gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.material}
                    onClick={() => setSelectedVariant(v)}
                    disabled={!v.inStock}
                    title={v.label}
                    className={`relative w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedVariant?.material === v.material
                        ? "border-[#1A1A1A] scale-110"
                        : v.inStock
                        ? "border-transparent hover:border-[#C9A96E]"
                        : "border-transparent opacity-40 cursor-not-allowed"
                    }`}
                    style={{ background: materialColors[v.material] ?? "#ccc" }}
                  >
                    {selectedVariant?.material === v.material && (
                      <Check size={12} className="text-white drop-shadow" />
                    )}
                    {!v.inStock && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-full h-0.5 bg-white/60 rotate-45 absolute" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            {product.sizes && (
              <div id="size-selector" className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className={`uppercase tracking-widest ${sizeError ? "text-[#B85042]" : "text-[#1A1A1A]"}`} style={{ fontSize: "0.68rem" }}>
                    {sizeError ? "Please select a size" : "Ring Size"}
                  </p>
                  <button
                    className="text-[#9A9590] hover:text-[#C9A96E] transition-colors underline underline-offset-2"
                    style={{ fontSize: "0.72rem" }}
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => { setSelectedSize(s.value); setSizeError(false); }}
                      disabled={!s.inStock}
                      className={`w-12 h-10 border transition-all text-center ${
                        selectedSize === s.value
                          ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                          : s.inStock
                          ? "border-[#D5CFC9] text-[#1A1A1A] hover:border-[#1A1A1A]"
                          : "border-[#E8E4DF] text-[#C5C0BB] cursor-not-allowed line-through"
                      }`}
                      style={{ fontSize: "0.78rem" }}
                    >
                      {s.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="uppercase tracking-widest text-[#1A1A1A] mb-3" style={{ fontSize: "0.68rem" }}>
                Quantity
              </p>
              <div className="flex items-center border border-[#D5CFC9] w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#6B6560] hover:text-[#1A1A1A] hover:bg-[#F5F0EB] transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-[#1A1A1A]" style={{ fontSize: "0.88rem" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#6B6560] hover:text-[#1A1A1A] hover:bg-[#F5F0EB] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-3 mb-6">
              <button
                ref={addBtnRef}
                onClick={handleAddToCartClick}
                disabled={!inStock}
                className={`flex-1 py-4 uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  !inStock
                    ? "bg-[#E8E4DF] text-[#9A9590] cursor-not-allowed"
                    : addedToCart
                    ? "bg-[#2E7D32] text-white"
                    : "bg-[#1A1A1A] text-white hover:bg-[#333]"
                }`}
                style={{ fontSize: "0.72rem" }}
              >
                {!inStock ? (
                  "Out of Stock"
                ) : addedToCart ? (
                  <><Check size={15} /> Added to Cart</>
                ) : (
                  <><ShoppingBag size={15} /> Add to Cart — ${(price * quantity).toFixed(0)}</>
                )}
              </button>
              <button
                onClick={() => setWishlist((w) => !w)}
                className={`w-14 h-14 border flex items-center justify-center flex-shrink-0 transition-all ${
                  wishlist
                    ? "border-[#B85042] bg-[#FDF5F4]"
                    : "border-[#D5CFC9] hover:border-[#B85042]"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={18}
                  className={wishlist ? "fill-[#B85042] text-[#B85042]" : "text-[#6B6560]"}
                />
              </button>
            </div>

            {/* Trust row */}
            <div className="flex flex-col gap-3 py-6 border-y border-[#E8E4DF] mb-6">
              {[
                { icon: Truck, text: "Free shipping on orders over $150" },
                { icon: RotateCcw, text: "Free returns within 30 days" },
                { icon: Shield, text: "Lifetime warranty included" },
                { icon: Gift, text: "Complimentary gift wrapping" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={15} className="text-[#C9A96E] flex-shrink-0" />
                  <span className="text-[#6B6560]" style={{ fontSize: "0.78rem" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="divide-y divide-[#E8E4DF]">
              {accordionSections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === section.id ? null : section.id)}
                    className="flex w-full items-center justify-between py-4 group"
                  >
                    <span
                      className="uppercase tracking-widest text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {section.label}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#6B6560] transition-transform duration-300 ${
                        openAccordion === section.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openAccordion === section.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pb-5 text-[#6B6560] leading-relaxed" style={{ fontSize: "0.82rem", lineHeight: 1.8 }}>
                      {typeof section.content === "string" ? section.content : section.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Complete the Look / Related */}
      <div className="border-t border-[#E8E4DF] bg-[#FAFAF8]">
        <RelatedProducts products={related} onAddToCart={handleAddToCart} />
      </div>

      {/* Reviews */}
      <div id="reviews" className="border-t border-[#E8E4DF]">
        <ReviewsSection product={product} />
      </div>

      {/* Sticky bar */}
      <StickyAddToCart
        product={product}
        selectedVariant={selectedVariant}
        show={showSticky}
        onAddToCart={handleAddToCartClick}
        inStock={inStock}
      />
    </>
  );
}
