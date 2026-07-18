import { Link } from "react-router";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const footerLinks = [
  {
    heading: "Shop",
    links: [
      { label: "New Arrivals", to: "/collections/all" },
      { label: "Bestsellers", to: "/collections/all" },
      { label: "Necklaces", to: "/collections/necklaces" },
      { label: "Earrings", to: "/collections/earrings" },
      { label: "Rings", to: "/collections/rings" },
      { label: "Bracelets", to: "/collections/bracelets" },
      { label: "Gift Cards", to: "/collections/all" },
      { label: "Sale", to: "/collections/all" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our Story", to: "/collections/all" },
      { label: "Sustainability", to: "/collections/all" },
      { label: "Craftsmanship", to: "/collections/all" },
      { label: "Careers", to: "/collections/all" },
      { label: "Press", to: "/collections/all" },
      { label: "Blog", to: "/collections/all" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "FAQ", to: "/collections/all" },
      { label: "Shipping & Returns", to: "/collections/all" },
      { label: "Order Tracking", to: "/collections/all" },
      { label: "Ring Size Guide", to: "/collections/all" },
      { label: "Care Instructions", to: "/collections/all" },
      { label: "Contact Us", to: "/collections/all" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="block mb-6 tracking-[0.3em] uppercase text-white hover:text-[#C9A96E] transition-colors" style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem" }}>
              April Singh
            </Link>
            <p className="text-white/50 leading-relaxed mb-8 max-w-xs" style={{ fontSize: "0.82rem", lineHeight: 1.8 }}>
              Fine jewelry crafted for everyday wear. 14k gold and sterling silver
              pieces designed to be worn, loved, and passed down.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={label}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="text-white uppercase tracking-widest mb-6" style={{ fontSize: "0.68rem" }}>
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-white/50 hover:text-[#C9A96E] transition-colors"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30" style={{ fontSize: "0.72rem" }}>
            © 2026 April Singh Jewelry. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((link) => (
              <a key={link} href="#" onClick={(e) => e.preventDefault()} className="text-white/30 hover:text-white/60 transition-colors" style={{ fontSize: "0.72rem" }}>
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {["VISA", "MC", "AMEX", "PAYPAL"].map((pay) => (
              <span key={pay} className="border border-white/15 text-white/30 px-2 py-1 rounded-sm" style={{ fontSize: "0.58rem", letterSpacing: "0.08em" }}>
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
