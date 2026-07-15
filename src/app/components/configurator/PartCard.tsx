import { Check, Info } from "lucide-react";
import { useState } from "react";
import { type ConfigPart } from "../../data/configuratorParts";

type Props = {
  part: ConfigPart;
  selected: boolean;
  onSelect: (part: ConfigPart) => void;
  disabled?: boolean;
};

export function PartCard({ part, selected, onSelect, disabled }: Props) {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <div
      className={`relative flex flex-col border-2 transition-all duration-200 cursor-pointer group overflow-hidden ${
        selected
          ? "border-[#1A1A1A] shadow-lg"
          : disabled
          ? "border-[#E8E4DF] opacity-50 cursor-not-allowed"
          : "border-transparent hover:border-[#C9A96E]"
      } ${part.price === 0 ? "bg-[#F9F7F5]" : "bg-white"}`}
      onClick={() => !disabled && onSelect(part)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#F5F0EB]">
        <img
          src={part.image}
          alt={part.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {selected && (
          <div className="absolute top-3 right-3 w-7 h-7 bg-[#1A1A1A] flex items-center justify-center z-10">
            <Check size={14} className="text-white" />
          </div>
        )}
        {!part.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="uppercase tracking-widest text-[#1A1A1A] bg-white/90 px-3 py-1.5" style={{ fontSize: "0.6rem" }}>
              Made to Order
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-[#9A9590] uppercase tracking-wider mb-1" style={{ fontSize: "0.6rem" }}>
          {part.material}
        </p>
        <h3 className="text-[#1A1A1A] mb-1" style={{ fontSize: "0.9rem", lineHeight: 1.3 }}>
          {part.name}
        </h3>

        {/* Story headline */}
        {part.story.headline && part.price > 0 && (
          <p className="text-[#9A9590] italic mb-3 flex-1" style={{ fontSize: "0.74rem", lineHeight: 1.5 }}>
            "{part.story.headline}"
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F0EDE9]">
          <span className="text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif", fontSize: "1rem" }}>
            {part.price === 0 ? "Free" : `+$${part.price}`}
          </span>
          {part.price > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setStoryOpen((s) => !s); }}
              className="text-[#9A9590] hover:text-[#C9A96E] transition-colors flex items-center gap-1"
              style={{ fontSize: "0.65rem" }}
            >
              <Info size={12} />
              <span className="uppercase tracking-wider">Story</span>
            </button>
          )}
        </div>
      </div>

      {/* Story panel (accordion) */}
      {storyOpen && (
        <div
          className="absolute inset-0 bg-[#1A1A1A] text-white p-5 flex flex-col justify-between z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <p className="text-[#C9A96E] uppercase tracking-widest mb-2" style={{ fontSize: "0.6rem" }}>
              The Story
            </p>
            <p className="text-white/90 leading-relaxed mb-4" style={{ fontSize: "0.78rem", lineHeight: 1.8 }}>
              {part.story.narrative}
            </p>
            <div className="flex gap-4 border-t border-white/10 pt-3">
              <div>
                <p className="text-white/40 uppercase tracking-wider" style={{ fontSize: "0.58rem" }}>Craft Time</p>
                <p className="text-white/70" style={{ fontSize: "0.72rem" }}>{part.story.craftTime}</p>
              </div>
              {part.story.origin && part.story.origin !== "—" && (
                <div>
                  <p className="text-white/40 uppercase tracking-wider" style={{ fontSize: "0.58rem" }}>Origin</p>
                  <p className="text-white/70" style={{ fontSize: "0.72rem" }}>{part.story.origin}</p>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setStoryOpen(false); onSelect(part); }}
            className="mt-4 w-full bg-[#C9A96E] text-white py-2.5 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#b8944f] transition-colors"
            style={{ fontSize: "0.65rem" }}
          >
            <Check size={12} /> Select This Part
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setStoryOpen(false); }}
            className="mt-2 w-full text-white/40 uppercase tracking-wider hover:text-white/70 transition-colors"
            style={{ fontSize: "0.62rem" }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
