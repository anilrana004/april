import { X, ShoppingBag, ChevronUp } from "lucide-react";
import { type ConfigPart, type ConfigType, computePrice } from "../../data/configuratorParts";

type Props = {
  configType: ConfigType;
  selected: Record<string, ConfigPart | null>;
  totalSteps: number;
  currentStep: number;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onAddToCart: () => void;
  onSave: () => void;
  canCheckout: boolean;
};

export function YourPiecePanel({
  configType,
  selected,
  totalSteps,
  currentStep,
  mobileOpen,
  onToggleMobile,
  onAddToCart,
  onSave,
  canCheckout,
}: Props) {
  const total = computePrice(selected);
  const selectedParts = Object.values(selected).filter(Boolean) as ConfigPart[];
  const isReviewStep = currentStep >= totalSteps;

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex flex-col w-72 flex-shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto">
        <div className="border border-[#E8E4DF] bg-white">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#E8E4DF]">
            <p className="uppercase tracking-widest text-[#1A1A1A]" style={{ fontSize: "0.65rem" }}>
              Your Design
            </p>
            <p className="text-[#9A9590] mt-0.5" style={{ fontSize: "0.72rem" }}>
              {selectedParts.length} of {totalSteps} {selectedParts.length === 1 ? "part" : "parts"} selected
            </p>
          </div>

          {/* Preview images */}
          {selectedParts.length > 0 && (
            <div className="px-5 py-4 border-b border-[#E8E4DF]">
              <div className="flex gap-2 flex-wrap">
                {selectedParts.filter(p => p.price > 0).map((part) => (
                  <div key={part.id} className="w-12 h-12 overflow-hidden bg-[#F5F0EB] border border-[#E8E4DF]">
                    <img src={part.image} alt={part.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Parts list */}
          <div className="px-5 py-4 flex-1">
            {configType.slots.map((slot) => {
              const part = selected[slot.id];
              return (
                <div key={slot.id} className="flex items-start justify-between py-2.5 border-b border-[#F5F0EB] last:border-0">
                  <div className="min-w-0 flex-1">
                    <p className="text-[#9A9590] uppercase tracking-wider" style={{ fontSize: "0.58rem" }}>
                      {slot.label}
                    </p>
                    {part ? (
                      <p className="text-[#1A1A1A] truncate mt-0.5" style={{ fontSize: "0.76rem" }}>
                        {part.name}
                      </p>
                    ) : (
                      <p className="text-[#C5C0BB] italic mt-0.5" style={{ fontSize: "0.72rem" }}>
                        Not yet chosen
                      </p>
                    )}
                  </div>
                  {part && (
                    <span className="text-[#1A1A1A] ml-3 flex-shrink-0" style={{ fontSize: "0.76rem" }}>
                      {part.price === 0 ? "—" : `$${part.price}`}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="px-5 py-4 border-t border-[#E8E4DF] bg-[#FAFAF8]">
            <div className="flex items-center justify-between mb-4">
              <span className="uppercase tracking-widest text-[#6B6560]" style={{ fontSize: "0.65rem" }}>
                Running Total
              </span>
              <span className="text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>
                ${total}
              </span>
            </div>

            {canCheckout ? (
              <>
                <button
                  onClick={onAddToCart}
                  className="w-full bg-[#1A1A1A] text-white py-3.5 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#333] transition-colors mb-2"
                  style={{ fontSize: "0.65rem" }}
                >
                  <ShoppingBag size={13} /> Add to Cart
                </button>
                <button
                  onClick={onSave}
                  className="w-full border border-[#D5CFC9] text-[#6B6560] py-2.5 uppercase tracking-widest hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                  style={{ fontSize: "0.62rem" }}
                >
                  Save & Email Me This Design
                </button>
              </>
            ) : (
              <p className="text-[#9A9590] text-center" style={{ fontSize: "0.72rem" }}>
                Complete all steps to add to cart
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* ── Mobile bottom sheet trigger ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        {/* Collapsed bar */}
        {!mobileOpen && (
          <button
            onClick={onToggleMobile}
            className="w-full bg-white border-t border-[#E8E4DF] px-5 py-4 flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-3">
              {selectedParts.filter(p => p.price > 0).slice(0, 3).map((part) => (
                <div key={part.id} className="w-8 h-8 overflow-hidden bg-[#F5F0EB] border border-[#E8E4DF]">
                  <img src={part.image} alt={part.name} className="w-full h-full object-cover" />
                </div>
              ))}
              <div>
                <p className="text-[#1A1A1A] uppercase tracking-wider" style={{ fontSize: "0.65rem" }}>
                  Your Design
                </p>
                <p className="text-[#9A9590]" style={{ fontSize: "0.7rem" }}>
                  ${total} · {selectedParts.length} parts
                </p>
              </div>
            </div>
            <ChevronUp size={18} className="text-[#6B6560]" />
          </button>
        )}

        {/* Expanded bottom sheet */}
        {mobileOpen && (
          <>
            <div className="fixed inset-0 bg-black/30 z-30" onClick={onToggleMobile} />
            <div className="relative z-40 bg-white border-t border-[#E8E4DF] max-h-[70vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DF]">
                <p className="uppercase tracking-widest text-[#1A1A1A]" style={{ fontSize: "0.65rem" }}>
                  Your Design
                </p>
                <button onClick={onToggleMobile}>
                  <X size={18} className="text-[#6B6560]" />
                </button>
              </div>

              <div className="px-5 py-4">
                {configType.slots.map((slot) => {
                  const part = selected[slot.id];
                  return (
                    <div key={slot.id} className="flex items-center gap-3 py-3 border-b border-[#F5F0EB] last:border-0">
                      {part ? (
                        <div className="w-10 h-10 flex-shrink-0 overflow-hidden bg-[#F5F0EB]">
                          <img src={part.image} alt={part.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 flex-shrink-0 bg-[#F5F0EB] border-2 border-dashed border-[#D5CFC9]" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[#9A9590] uppercase tracking-wider" style={{ fontSize: "0.58rem" }}>
                          {slot.label}
                        </p>
                        <p className="text-[#1A1A1A] truncate" style={{ fontSize: "0.78rem" }}>
                          {part ? part.name : "Not yet chosen"}
                        </p>
                      </div>
                      {part && (
                        <span className="text-[#1A1A1A] flex-shrink-0" style={{ fontSize: "0.78rem" }}>
                          {part.price === 0 ? "—" : `$${part.price}`}
                        </span>
                      )}
                    </div>
                  );
                })}

                <div className="flex items-center justify-between py-4 border-t border-[#E8E4DF] mt-2">
                  <span className="uppercase tracking-wider text-[#6B6560]" style={{ fontSize: "0.65rem" }}>Total</span>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem" }}>${total}</span>
                </div>

                {canCheckout && (
                  <button
                    onClick={onAddToCart}
                    className="w-full bg-[#1A1A1A] text-white py-4 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#333] transition-colors mb-3"
                    style={{ fontSize: "0.68rem" }}
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                )}
                <button
                  onClick={onSave}
                  className="w-full border border-[#D5CFC9] text-[#6B6560] py-3 uppercase tracking-widest hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                  style={{ fontSize: "0.62rem" }}
                >
                  Save & Email This Design
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
