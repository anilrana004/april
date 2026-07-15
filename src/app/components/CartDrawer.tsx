import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { type Product } from "../data/products";

export type CartItem = Product & { quantity: number };

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
};

export function CartDrawer({ open, onClose, items, onUpdateQty, onRemove }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.variants[0].price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 150;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-[90]" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[100] flex flex-col shadow-2xl transition-transform duration-400 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E4DF]">
          <h2 className="uppercase tracking-widest text-[#1A1A1A]" style={{ fontSize: "0.78rem" }}>
            Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})
          </h2>
          <button onClick={onClose} className="text-[#1A1A1A] hover:text-[#C9A96E] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Shipping progress */}
        {remaining > 0 ? (
          <div className="px-6 py-4 bg-[#F5F0EB] border-b border-[#E8E4DF]">
            <p className="text-[#6B6560] mb-2.5" style={{ fontSize: "0.72rem" }}>
              Add <span className="text-[#1A1A1A] font-medium">${remaining}</span> more for free shipping
            </p>
            <div className="h-0.5 bg-[#E0DAD4] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C9A96E] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="px-6 py-3 bg-[#E8F5E9] border-b border-[#C8E6C9]">
            <p className="text-[#2E7D32]" style={{ fontSize: "0.72rem" }}>
              You qualify for free shipping!
            </p>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag size={40} className="text-[#D5CFC9]" />
              <p className="text-[#9A9590] uppercase tracking-wider" style={{ fontSize: "0.75rem" }}>
                Your cart is empty
              </p>
              <button
                onClick={onClose}
                className="mt-2 border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3 uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors"
                style={{ fontSize: "0.68rem" }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-[#F0EDE9]">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="text-[#9A9590] uppercase tracking-wider" style={{ fontSize: "0.62rem" }}>
                          {item.variants[0].label}
                        </p>
                        <h3 className="text-[#1A1A1A] mt-0.5" style={{ fontSize: "0.84rem" }}>
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-[#B0AAA4] hover:text-[#B85042] transition-colors ml-2 flex-shrink-0"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E0DAD4]">
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#6B6560] hover:text-[#1A1A1A] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-[#1A1A1A]" style={{ fontSize: "0.8rem" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#6B6560] hover:text-[#1A1A1A] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-[#1A1A1A]" style={{ fontSize: "0.88rem" }}>
                        ${(item.variants[0].price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E8E4DF] px-6 py-6">
            <div className="flex justify-between items-center mb-1.5">
              <span className="uppercase tracking-wider text-[#6B6560]" style={{ fontSize: "0.72rem" }}>Subtotal</span>
              <span className="text-[#1A1A1A]" style={{ fontSize: "0.88rem" }}>${subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="uppercase tracking-wider text-[#6B6560]" style={{ fontSize: "0.72rem" }}>Shipping</span>
              <span className="text-[#6B6560]" style={{ fontSize: "0.82rem" }}>
                {subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : "Calculated at checkout"}
              </span>
            </div>
            <button
              className="w-full bg-[#1A1A1A] text-white py-4 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#333] transition-colors"
              style={{ fontSize: "0.72rem" }}
            >
              Checkout — ${subtotal.toFixed(0)} <ArrowRight size={13} />
            </button>
            <button
              onClick={onClose}
              className="w-full mt-3 text-[#9A9590] uppercase tracking-wider text-center hover:text-[#1A1A1A] transition-colors"
              style={{ fontSize: "0.68rem" }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
