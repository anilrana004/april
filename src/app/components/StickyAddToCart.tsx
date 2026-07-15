import { ShoppingBag } from "lucide-react";
import { type Product, type ProductVariant } from "../data/products";

type Props = {
  product: Product;
  selectedVariant: ProductVariant | null;
  show: boolean;
  onAddToCart: () => void;
  inStock: boolean;
};

export function StickyAddToCart({ product, selectedVariant, show, onAddToCart, inStock }: Props) {
  const price = selectedVariant?.price ?? product.variants[0].price;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8E4DF] shadow-2xl transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-14 flex-shrink-0 overflow-hidden bg-[#F5F0EB] hidden sm:block">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-[#1A1A1A] truncate" style={{ fontSize: "0.88rem" }}>{product.name}</p>
            <p className="text-[#9A9590] uppercase tracking-wider" style={{ fontSize: "0.65rem" }}>
              {selectedVariant?.label ?? product.variants[0].label}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <span
            className="text-[#1A1A1A] hidden sm:block"
            style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}
          >
            ${price}
          </span>
          <button
            onClick={onAddToCart}
            disabled={!inStock}
            className={`flex items-center gap-2 px-8 py-3 uppercase tracking-widest transition-colors ${
              inStock
                ? "bg-[#1A1A1A] text-white hover:bg-[#333]"
                : "bg-[#E8E4DF] text-[#9A9590] cursor-not-allowed"
            }`}
            style={{ fontSize: "0.7rem" }}
          >
            <ShoppingBag size={14} />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
