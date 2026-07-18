import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sophie R.",
    location: "New York, NY",
    rating: 5,
    text: "I've been wearing my April Singh necklace every single day for a year and it still looks brand new. The quality is exceptional — I get compliments constantly.",
    product: "Crescent Moon Pendant",
  },
  {
    id: 2,
    name: "Mia T.",
    location: "Los Angeles, CA",
    rating: 5,
    text: "Finally found jewelry that doesn't tarnish! The packaging was beautiful too — perfect gift for myself. Will definitely be purchasing more pieces.",
    product: "Pavé Diamond Huggie",
  },
  {
    id: 3,
    name: "Camille B.",
    location: "Chicago, IL",
    rating: 5,
    text: "The stacking ring set is absolutely gorgeous. Lightweight, delicate, and exactly as pictured. April Singh has become my go-to for all jewelry.",
    product: "Stacking Band Set",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.2em] text-[#C9A96E] mb-3" style={{ fontSize: "0.7rem" }}>
            Reviews
          </p>
          <h2
            className="text-[#1A1A1A]"
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400 }}
          >
            Loved by Thousands
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-[#C9A96E] text-[#C9A96E]" />
            ))}
            <span className="text-[#6B6560] ml-2" style={{ fontSize: "0.82rem" }}>
              4.9 from 12,000+ reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-8 border border-[#E8E4DF]">
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-[#C9A96E] text-[#C9A96E]" />
                ))}
              </div>
              <p className="text-[#3D3A36] leading-relaxed mb-6" style={{ fontSize: "0.88rem", lineHeight: 1.8 }}>
                "{t.text}"
              </p>
              <div className="border-t border-[#F0EDE9] pt-5 flex justify-between items-end">
                <div>
                  <p className="text-[#1A1A1A]" style={{ fontSize: "0.82rem" }}>
                    {t.name}
                  </p>
                  <p className="text-[#9A9590]" style={{ fontSize: "0.72rem" }}>
                    {t.location}
                  </p>
                </div>
                <p className="text-[#C9A96E] italic" style={{ fontSize: "0.72rem" }}>
                  {t.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
