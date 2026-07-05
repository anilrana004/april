const categories = [
  {
    label: "Necklaces",
    image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxmaW5lJTIwamV3ZWxyeSUyMGdvbGQlMjBuZWNrbGFjZSUyMG1pbmltYWx8ZW58MXx8fHwxNzgzMjc4MzkzfDA&ixlib=rb-4.1.0&q=80&w=600",
    count: "142 styles",
  },
  {
    label: "Earrings",
    image: "https://images.unsplash.com/photo-1585619979778-74d1811821d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxqZXdlbHJ5JTIwZWFycmluZ3MlMjByaW5ncyUyMGx1eHVyeSUyMG1pbmltYWx8ZW58MXx8fHwxNzgzMjc4Mzk0fDA&ixlib=rb-4.1.0&q=80&w=600",
    count: "98 styles",
  },
  {
    label: "Rings",
    image: "https://images.unsplash.com/photo-1605089315599-ca966e96b56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxqZXdlbHJ5JTIwZWFycmluZ3MlMjByaW5ncyUyMGx1eHVyeSUyMG1pbmltYWx8ZW58MXx8fHwxNzgzMjc4Mzk0fDA&ixlib=rb-4.1.0&q=80&w=600",
    count: "76 styles",
  },
  {
    label: "Bracelets",
    image: "https://images.unsplash.com/photo-1655255114527-d0a834d9a774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxqZXdlbHJ5JTIwZWFycmluZ3MlMjByaW5ncyUyMGx1eHVyeSUyMG1pbmltYWx8ZW58MXx8fHwxNzgzMjc4Mzk0fDA&ixlib=rb-4.1.0&q=80&w=600",
    count: "54 styles",
  },
];

export function ShopByCategory() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.2em] text-[#C9A96E] mb-3" style={{ fontSize: "0.7rem" }}>
          Explore
        </p>
        <h2
          className="text-[#1A1A1A]"
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400 }}
        >
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <a
            key={cat.label}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group relative overflow-hidden aspect-[3/4] block"
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p
                className="text-white uppercase tracking-widest mb-1"
                style={{ fontSize: "0.78rem", letterSpacing: "0.18em" }}
              >
                {cat.label}
              </p>
              <p className="text-white/60" style={{ fontSize: "0.68rem", letterSpacing: "0.1em" }}>
                {cat.count}
              </p>
            </div>

            {/* hover border */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 transition-all duration-300" />
          </a>
        ))}
      </div>
    </section>
  );
}
