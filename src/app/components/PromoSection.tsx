import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export function PromoSection() {
  return (
    <section className="py-0 bg-[#F5F0EB]">
      {/* Editorial split */}
      <div className="flex flex-col md:flex-row">
        <div className="relative flex-1 min-h-[420px] md:min-h-[580px]">
          <img
            src="https://images.unsplash.com/photo-1722410180644-5955f83ec8b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
            alt="Fine jewelry collection"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center px-10 md:px-20 py-16 bg-[#1A1A1A]">
          <p className="uppercase tracking-[0.22em] text-[#C9A96E] mb-5" style={{ fontSize: "0.68rem" }}>
            The Gold Standard
          </p>
          <h2
            className="text-white leading-snug mb-6"
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400 }}
          >
            Crafted to Last
            <br />a Lifetime
          </h2>
          <p className="text-white/60 mb-8 max-w-sm" style={{ fontSize: "0.88rem", lineHeight: 1.8 }}>
            Every piece is handcrafted by skilled artisans using ethically sourced
            14k gold, sterling silver, and genuine gemstones. Quality you can
            feel, beauty that endures.
          </p>
          <Link
            to="/collections/all"
            className="inline-flex items-center gap-2 text-[#C9A96E] uppercase tracking-widest border-b border-[#C9A96E] pb-0.5 hover:text-white hover:border-white transition-colors w-fit"
            style={{ fontSize: "0.72rem" }}
          >
            Our Story <ArrowRight size={13} />
          </Link>

          <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/10">
            {[
              { num: "14k", label: "Solid Gold" },
              { num: "∞", label: "Lifetime Warranty" },
              { num: "30", label: "Day Returns" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[#C9A96E] mb-1" style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem", fontWeight: 400 }}>
                  {item.num}
                </p>
                <p className="text-white/50 uppercase tracking-wider" style={{ fontSize: "0.65rem" }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width banner */}
      <div className="relative overflow-hidden min-h-[300px] md:min-h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1561828995-aa79a2db86dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1800"
          alt="Jewelry collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <p className="uppercase tracking-[0.22em] text-[#C9A96E] mb-4" style={{ fontSize: "0.7rem" }}>
            Limited Time
          </p>
          <h2
            className="text-white mb-6"
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}
          >
            Summer Sale — Up to 30% Off
          </h2>
          <Link
            to="/collections/all"
            className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-10 py-3.5 uppercase tracking-widest hover:bg-[#C9A96E] hover:text-white transition-colors"
            style={{ fontSize: "0.72rem" }}
          >
            Shop the Sale <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
