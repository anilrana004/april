import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F5F0EB]">
      <div className="flex flex-col md:flex-row min-h-[85vh] md:min-h-[90vh]">
        {/* Left: editorial image */}
        <div className="relative flex-1 min-h-[55vw] md:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Woman wearing gold necklace"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
        </div>

        {/* Right: copy */}
        <div className="flex flex-col justify-center items-start px-8 md:px-16 py-16 md:py-0 bg-[#F5F0EB] md:w-[44%] md:min-w-[380px]">
          <p className="uppercase tracking-[0.22em] text-[#C9A96E] mb-4" style={{ fontSize: "0.7rem" }}>
            Summer Collection 2026
          </p>
          <h1
            className="text-[#1A1A1A] leading-tight mb-6"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            Fine Jewelry,
            <br />
            Everyday Luxury
          </h1>
          <p className="text-[#6B6560] mb-10 max-w-sm" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>
            Handcrafted from 14k gold and sterling silver. Designed to be worn
            every day, built to last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/collections/all"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-3.5 uppercase tracking-widest transition-colors hover:bg-[#333]"
              style={{ fontSize: "0.72rem" }}
            >
              Shop Now <ArrowRight size={14} />
            </Link>
            <Link
              to="/collections/all"
              className="inline-flex items-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3.5 uppercase tracking-widest transition-colors hover:bg-[#1A1A1A] hover:text-white"
              style={{ fontSize: "0.72rem" }}
            >
              Explore Gifts
            </Link>
          </div>

          <div className="flex items-center gap-8 mt-14 border-t border-[#E0DAD4] pt-8 w-full">
            {[
              { label: "14k Gold", sub: "All our pieces" },
              { label: "Lifetime", sub: "Warranty included" },
              { label: "Free Returns", sub: "Within 30 days" },
            ].map((badge) => (
              <div key={badge.label}>
                <p className="text-[#1A1A1A] uppercase tracking-wider" style={{ fontSize: "0.68rem" }}>
                  {badge.label}
                </p>
                <p className="text-[#9A9590] mt-0.5" style={{ fontSize: "0.68rem" }}>
                  {badge.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
