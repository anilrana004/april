import { Link } from "react-router";
import { ArrowRight, Clock, Shield, Sparkles } from "lucide-react";
import { configTypes } from "../data/configuratorParts";

export function DesignYourOwnPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-[#1A1A1A] overflow-hidden min-h-[440px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1628058494685-6c2f796ac24a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400)` }}
        />
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-24 text-center w-full">
          <p className="uppercase tracking-[0.3em] text-[#C9A96E] mb-5" style={{ fontSize: "0.68rem" }}>
            The Bespoke Atelier
          </p>
          <h1
            className="text-white mb-6 mx-auto max-w-2xl"
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 400, lineHeight: 1.15 }}
          >
            Design Your Own
          </h1>
          <p className="text-white/60 max-w-lg mx-auto" style={{ fontSize: "0.95rem", lineHeight: 1.85 }}>
            Choose every part. Hear every story. Build the piece that is entirely, specifically, yours — the way it's done in a real Jaipur atelier consultation, translated to screen.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 border-b border-[#E8E4DF] bg-[#FAFAF8]">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { n: "01", label: "Choose a Product", desc: "Necklace, bracelet, or mala — each built differently." },
            { n: "02", label: "Select Each Part", desc: "Chain, centerpiece, accents, clasp. Every part has a story and a price." },
            { n: "03", label: "Personalize", desc: "Length, engraving, gift wrapping — optional finishing touches." },
            { n: "04", label: "We Build It", desc: "Hand-finished by a single karigar. Ships in 12–18 days." },
          ].map((step) => (
            <div key={step.n} className="flex flex-col gap-2">
              <p className="text-[#C9A96E]" style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 400 }}>
                {step.n}
              </p>
              <p className="text-[#1A1A1A] uppercase tracking-wider" style={{ fontSize: "0.72rem" }}>
                {step.label}
              </p>
              <p className="text-[#6B6560]" style={{ fontSize: "0.8rem", lineHeight: 1.7 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Product type cards */}
      <section className="py-20 max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.2em] text-[#C9A96E] mb-3" style={{ fontSize: "0.68rem" }}>
            Choose Your Canvas
          </p>
          <h2
            className="text-[#1A1A1A]"
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 400 }}
          >
            What Would You Like to Build?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {configTypes.map((ct) => (
            <Link
              key={ct.id}
              to={`/design-your-own/${ct.id}`}
              className="group relative overflow-hidden block bg-[#F5F0EB]"
            >
              {/* Image */}
              <div className="relative h-[380px] overflow-hidden">
                <img
                  src={ct.image}
                  alt={ct.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-[#C9A96E] uppercase tracking-widest mb-2" style={{ fontSize: "0.62rem" }}>
                    Bespoke · Starting from ${ct.startingFrom}
                  </p>
                  <h3
                    className="text-white mb-2"
                    style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 400 }}
                  >
                    {ct.label}
                  </h3>
                  <p className="text-white/65" style={{ fontSize: "0.8rem", lineHeight: 1.7 }}>
                    {ct.description}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between px-7 py-5 border-t border-[#E0DAD4]">
                <span className="uppercase tracking-widest text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors" style={{ fontSize: "0.7rem" }}>
                  Begin Building
                </span>
                <ArrowRight size={15} className="text-[#1A1A1A] group-hover:text-[#C9A96E] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-[#E8E4DF] bg-[#F5F0EB] py-14 px-4 md:px-8">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {[
            {
              icon: Sparkles,
              title: "Every Part Has a Story",
              desc: "Chain, clasp, stone — each component comes with its origin, its maker, and what makes it worth choosing.",
            },
            {
              icon: Clock,
              title: "Hand-Finished in 12–18 Days",
              desc: "Bespoke is not instant. Your piece is made after you order it, by a single karigar in our Jaipur atelier.",
            },
            {
              icon: Shield,
              title: "Price Transparency",
              desc: "Every part is individually priced. You see an itemized breakdown before you add to cart — no hidden totals.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col md:flex-row gap-4 items-center md:items-start">
              <div className="w-10 h-10 flex items-center justify-center border border-[#C9A96E] flex-shrink-0">
                <Icon size={16} className="text-[#C9A96E]" />
              </div>
              <div>
                <p className="text-[#1A1A1A] uppercase tracking-wider mb-1.5" style={{ fontSize: "0.72rem" }}>
                  {title}
                </p>
                <p className="text-[#6B6560]" style={{ fontSize: "0.8rem", lineHeight: 1.75 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Book a consult CTA */}
      <section className="py-16 text-center px-4">
        <p className="uppercase tracking-[0.2em] text-[#C9A96E] mb-4" style={{ fontSize: "0.68rem" }}>
          Prefer a Human Conversation?
        </p>
        <h2
          className="text-[#1A1A1A] mb-4"
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400 }}
        >
          Book a Video Consultation
        </h2>
        <p className="text-[#6B6560] max-w-md mx-auto mb-8" style={{ fontSize: "0.88rem", lineHeight: 1.8 }}>
          For significant pieces — gifts, milestones, commissions over $500 — our atelier team is available for a 30-minute video call. We'll walk you through every option and answer every question.
        </p>
        <button
          className="border border-[#1A1A1A] text-[#1A1A1A] px-10 py-3.5 uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors"
          style={{ fontSize: "0.7rem" }}
        >
          Schedule a Consult
        </button>
      </section>
    </div>
  );
}
