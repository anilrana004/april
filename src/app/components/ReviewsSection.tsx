import { useState } from "react";
import { Star, ThumbsUp, Check } from "lucide-react";
import { type Product } from "../data/products";

type Props = { product: Product };

const ratingLabels = ["Terrible", "Poor", "Average", "Good", "Excellent"];

export function ReviewsSection({ product }: Props) {
  const [filter, setFilter] = useState<number | null>(null);

  const reviews = filter ? product.reviews.filter((r) => r.rating === filter) : product.reviews;

  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: product.reviews.filter((r) => r.rating === star).length,
    pct: Math.round((product.reviews.filter((r) => r.rating === star).length / product.reviews.length) * 100) || 0,
  }));

  return (
    <section className="py-20 max-w-[1400px] mx-auto px-4 md:px-8">
      <div className="mb-12">
        <p className="uppercase tracking-[0.2em] text-[#C9A96E] mb-3" style={{ fontSize: "0.68rem" }}>
          Reviews
        </p>
        <h2
          className="text-[#1A1A1A]"
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 400 }}
        >
          What Our Customers Say
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="text-center lg:text-left mb-8">
            <p
              className="text-[#1A1A1A] mb-1"
              style={{ fontFamily: "Georgia, serif", fontSize: "4rem", fontWeight: 400, lineHeight: 1 }}
            >
              {product.ratingAvg}
            </p>
            <div className="flex justify-center lg:justify-start gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(product.ratingAvg) ? "fill-[#C9A96E] text-[#C9A96E]" : "text-[#D5CFC9]"} />
              ))}
            </div>
            <p className="text-[#9A9590]" style={{ fontSize: "0.78rem" }}>
              Based on {product.ratingCount} reviews
            </p>
          </div>

          {/* Rating bars */}
          <div className="space-y-3 mb-8">
            {counts.map(({ star, count, pct }) => (
              <button
                key={star}
                onClick={() => setFilter(filter === star ? null : star)}
                className={`flex items-center gap-3 w-full group ${filter === star ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
              >
                <span className="text-[#6B6560] w-2 text-right" style={{ fontSize: "0.75rem" }}>{star}</span>
                <Star size={11} className="fill-[#C9A96E] text-[#C9A96E] flex-shrink-0" />
                <div className="flex-1 h-1.5 bg-[#E8E4DF] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${filter === star ? "bg-[#C9A96E]" : "bg-[#C9A96E]/60 group-hover:bg-[#C9A96E]"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[#9A9590] w-6 text-right" style={{ fontSize: "0.72rem" }}>{count}</span>
              </button>
            ))}
          </div>

          {filter && (
            <button
              onClick={() => setFilter(null)}
              className="text-[#C9A96E] uppercase tracking-wider hover:underline"
              style={{ fontSize: "0.7rem" }}
            >
              Clear filter
            </button>
          )}

          <button
            className="mt-6 w-full border border-[#1A1A1A] text-[#1A1A1A] py-3 uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors"
            style={{ fontSize: "0.68rem" }}
          >
            Write a Review
          </button>
        </div>

        {/* Reviews list */}
        <div className="lg:col-span-2">
          {reviews.length === 0 ? (
            <p className="text-[#9A9590]" style={{ fontSize: "0.82rem" }}>No reviews for this rating yet.</p>
          ) : (
            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-[#E8E4DF] pb-8 last:border-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={13} className={i < review.rating ? "fill-[#C9A96E] text-[#C9A96E]" : "text-[#D5CFC9]"} />
                        ))}
                      </div>
                      <p className="text-[#1A1A1A]" style={{ fontSize: "0.9rem" }}>
                        {review.title}
                      </p>
                    </div>
                    <p className="text-[#9A9590]" style={{ fontSize: "0.72rem" }}>{review.date}</p>
                  </div>
                  <p className="text-[#555] leading-relaxed mb-4" style={{ fontSize: "0.84rem", lineHeight: 1.8 }}>
                    {review.body}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-[#6B6560]" style={{ fontSize: "0.75rem" }}>
                        {review.name} · {review.location}
                      </p>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-[#2E7D32]" style={{ fontSize: "0.68rem" }}>
                          <Check size={11} /> Verified
                        </span>
                      )}
                    </div>
                    <button className="flex items-center gap-1.5 text-[#9A9590] hover:text-[#C9A96E] transition-colors" style={{ fontSize: "0.7rem" }}>
                      <ThumbsUp size={12} /> Helpful
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
