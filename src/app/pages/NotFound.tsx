import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="uppercase tracking-[0.3em] text-[#C9A96E] mb-4" style={{ fontSize: "0.68rem" }}>
        404
      </p>
      <h1
        className="text-[#1A1A1A] mb-4"
        style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400 }}
      >
        Page Not Found
      </h1>
      <p className="text-[#6B6560] max-w-sm mb-10" style={{ fontSize: "0.88rem", lineHeight: 1.8 }}>
        The page you're looking for doesn't exist or may have been moved. Let's
        get you back to something beautiful.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-10 py-3.5 uppercase tracking-widest hover:bg-[#333] transition-colors"
          style={{ fontSize: "0.7rem" }}
        >
          Back to Home <ArrowRight size={13} />
        </Link>
        <Link
          to="/collections/all"
          className="inline-flex items-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] px-10 py-3.5 uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors"
          style={{ fontSize: "0.7rem" }}
        >
          Shop All
        </Link>
      </div>
    </div>
  );
}
