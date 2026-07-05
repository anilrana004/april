import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const footerLinks = [
  {
    heading: "Shop",
    links: ["New Arrivals", "Bestsellers", "Necklaces", "Earrings", "Rings", "Bracelets", "Gift Cards", "Sale"],
  },
  {
    heading: "About",
    links: ["Our Story", "Sustainability", "Craftsmanship", "Careers", "Press", "Blog"],
  },
  {
    heading: "Help",
    links: ["FAQ", "Shipping & Returns", "Order Tracking", "Ring Size Guide", "Care Instructions", "Contact Us"],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <span
              className="block mb-6 tracking-[0.3em] uppercase"
              style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem" }}
            >
              Aurea
            </span>
            <p className="text-white/50 leading-relaxed mb-8 max-w-xs" style={{ fontSize: "0.82rem", lineHeight: 1.8 }}>
              Fine jewelry crafted for everyday wear. 14k gold and sterling silver
              pieces designed to be worn, loved, and passed down.
            </p>
            {/* Social links */}
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

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-white uppercase tracking-widest mb-6"
                style={{ fontSize: "0.68rem" }}
              >
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-white/50 hover:text-[#C9A96E] transition-colors"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30" style={{ fontSize: "0.72rem" }}>
            © 2026 Aurea Jewelry. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-white/30 hover:text-white/60 transition-colors"
                style={{ fontSize: "0.72rem" }}
              >
                {link}
              </a>
            ))}
          </div>
          {/* Payment icons */}
          <div className="flex items-center gap-3">
            {["VISA", "MC", "AMEX", "PAYPAL"].map((pay) => (
              <span
                key={pay}
                className="border border-white/15 text-white/30 px-2 py-1 rounded-sm"
                style={{ fontSize: "0.58rem", letterSpacing: "0.08em" }}
              >
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
