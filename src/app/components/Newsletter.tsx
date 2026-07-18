import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-[#F5F0EB] py-20 px-4">
      <div className="max-w-xl mx-auto text-center">
        <p className="uppercase tracking-[0.22em] text-[#C9A96E] mb-4" style={{ fontSize: "0.68rem" }}>
          Join the Community
        </p>
        <h2
          className="text-[#1A1A1A] mb-4"
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 400 }}
        >
          Be the First to Know
        </h2>
        <p className="text-[#6B6560] mb-10 max-w-sm mx-auto" style={{ fontSize: "0.88rem", lineHeight: 1.75 }}>
          Sign up for early access to new collections, exclusive offers, and styling
          inspiration delivered to your inbox.
        </p>

        {submitted ? (
          <div className="py-4">
            <p className="text-[#1A1A1A] uppercase tracking-wider" style={{ fontSize: "0.8rem" }}>
              Thank you for subscribing!
            </p>
            <p className="text-[#9A9590] mt-2" style={{ fontSize: "0.78rem" }}>
              Welcome to the April Singh community.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 border border-[#D5CFC9] bg-white px-5 py-3.5 text-[#1A1A1A] placeholder-[#B0AAA4] outline-none focus:border-[#C9A96E] transition-colors"
              style={{ fontSize: "0.82rem" }}
            />
            <button
              type="submit"
              className="bg-[#1A1A1A] text-white px-7 py-3.5 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#333] transition-colors whitespace-nowrap"
              style={{ fontSize: "0.68rem" }}
            >
              Subscribe <ArrowRight size={13} />
            </button>
          </form>
        )}

        <p className="text-[#B0AAA4] mt-5" style={{ fontSize: "0.68rem" }}>
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
