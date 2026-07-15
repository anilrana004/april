export type Review = {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
};

export type ProductVariant = {
  material: string;
  label: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
};

export type ProductSize = {
  value: string;
  inStock: boolean;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  shortDescription: string;
  description: string;
  details: string[];
  dimensions: string[];
  care: string[];
  images: string[];
  badge?: string;
  variants: ProductVariant[];
  sizes?: ProductSize[];
  ratingAvg: number;
  ratingCount: number;
  reviews: Review[];
  relatedIds: number[];
  tags: string[];
};

const IMGS = {
  necklace1: "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  necklace1b: "https://images.unsplash.com/photo-1633555234047-192d10238f5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  necklace1c: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  necklace1d: "https://images.unsplash.com/photo-1601121141461-920cb1993441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ring1: "https://images.unsplash.com/photo-1625516152414-8f33eef3d660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ring1b: "https://images.unsplash.com/photo-1499899833954-5ecd9439d17f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ring1c: "https://images.unsplash.com/photo-1605089315599-ca966e96b56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ring1d: "https://images.unsplash.com/photo-1706196612848-0cd22cb6231e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  chain1: "https://images.unsplash.com/photo-1631050165155-421c47e306f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  chain1b: "https://images.unsplash.com/photo-1600721391689-2564bb8055de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  chain1c: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  earring1: "https://images.unsplash.com/photo-1561828995-aa79a2db86dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  earring1b: "https://images.unsplash.com/photo-1585619979778-74d1811821d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  earring1c: "https://images.unsplash.com/photo-1692521248622-98a1da77b673?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  earring1d: "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  bracelet1: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  bracelet1b: "https://images.unsplash.com/photo-1655255114527-d0a834d9a774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  bracelet1c: "https://images.unsplash.com/photo-1781793326465-78eedc921d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  lifestyle1: "https://images.unsplash.com/photo-1599459183200-59c7687a0275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  lifestyle2: "https://images.unsplash.com/photo-1702476320482-0736c4b962f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

export const products: Product[] = [
  {
    id: 1,
    slug: "crescent-moon-pendant",
    name: "Crescent Moon Pendant",
    category: "Necklaces",
    subcategory: "Pendants",
    shortDescription: "A delicate crescent moon charm on a fine box chain.",
    description:
      "The Crescent Moon Pendant is a timeless piece that captures the quiet beauty of the night sky. Crafted from solid 14k gold, the crescent silhouette hangs from a dainty 16\" adjustable chain, making it the perfect everyday companion—subtle enough to layer, striking enough to wear alone.",
    details: [
      "Pendant dimensions: 10mm × 6mm",
      "Chain length: 16\" with 2\" extender",
      "Lobster clasp closure",
      "Solid 14k gold — not plated",
      "Nickel-free and hypoallergenic",
    ],
    dimensions: [
      "Pendant: 10mm height × 6mm width",
      "Chain: 16\" adjustable to 18\"",
      "Chain width: 0.8mm",
    ],
    care: [
      "Store in the provided pouch or jewelry box",
      "Remove before swimming, showering, or exercising",
      "Clean gently with a soft cloth",
      "Avoid contact with perfumes, lotions, and chemicals",
    ],
    images: [IMGS.necklace1, IMGS.necklace1b, IMGS.necklace1c, IMGS.necklace1d],
    badge: "New",
    variants: [
      { material: "14k-gold", label: "14k Gold", price: 148, inStock: true },
      { material: "sterling", label: "Sterling Silver", price: 98, inStock: true },
      { material: "rose-gold", label: "14k Rose Gold", price: 148, inStock: false },
    ],
    ratingAvg: 4.9,
    ratingCount: 312,
    reviews: [
      { id: 1, name: "Amelia R.", location: "New York, NY", rating: 5, date: "June 12, 2026", title: "Absolutely stunning", body: "I've worn this every single day for 3 months and it still looks brand new. The gold is so rich and the craftsmanship is beautiful. Perfect dainty necklace.", verified: true },
      { id: 2, name: "Sofia L.", location: "Los Angeles, CA", rating: 5, date: "May 28, 2026", title: "Perfect layering piece", body: "Exactly as described. The chain is delicate but sturdy. I layer it with two others and get compliments constantly.", verified: true },
      { id: 3, name: "Emma T.", location: "Chicago, IL", rating: 4, date: "May 10, 2026", title: "Beautiful but small", body: "The pendant is slightly smaller than I expected but genuinely beautiful. The quality is exceptional — worth every penny.", verified: true },
      { id: 4, name: "Zoe K.", location: "Austin, TX", rating: 5, date: "April 22, 2026", title: "A staple piece", body: "This is now a permanent part of my daily jewelry rotation. Packaging was gorgeous too — great as a gift.", verified: true },
    ],
    relatedIds: [3, 6, 7, 8],
    tags: ["necklace", "pendant", "gold", "moon", "minimalist"],
  },
  {
    id: 2,
    slug: "dome-signet-ring",
    name: "Dome Signet Ring",
    category: "Rings",
    subcategory: "Signet Rings",
    shortDescription: "A bold, polished dome silhouette in solid 14k gold.",
    description:
      "The Dome Signet Ring reimagines the classic signet with a smooth, domed top — architectural and modern. Solid 14k gold construction ensures it's built for daily wear. Worn alone it's a statement; stacked with bands it becomes a masterpiece.",
    details: [
      "Dome top: 10mm × 10mm",
      "Band width: 2.5mm",
      "Solid 14k gold throughout",
      "Comfort-fit interior for all-day wear",
      "Engravable on request",
      "Nickel-free and hypoallergenic",
    ],
    dimensions: [
      "Top: 10mm × 10mm",
      "Band width: 2.5mm",
      "Available in sizes 5–10",
    ],
    care: [
      "Polish with a soft jewelry cloth to maintain shine",
      "Remove before vigorous activity",
      "Store away from other jewelry to avoid scratching",
      "Professional cleaning recommended annually",
    ],
    images: [IMGS.ring1, IMGS.ring1b, IMGS.ring1c, IMGS.ring1d],
    badge: "New",
    variants: [
      { material: "14k-gold", label: "14k Gold", price: 195, inStock: true },
      { material: "sterling", label: "Sterling Silver", price: 135, inStock: true },
      { material: "rose-gold", label: "14k Rose Gold", price: 195, inStock: true },
    ],
    sizes: [
      { value: "5", inStock: true },
      { value: "5.5", inStock: true },
      { value: "6", inStock: true },
      { value: "6.5", inStock: true },
      { value: "7", inStock: true },
      { value: "7.5", inStock: false },
      { value: "8", inStock: true },
      { value: "8.5", inStock: true },
      { value: "9", inStock: false },
      { value: "10", inStock: true },
    ],
    ratingAvg: 4.8,
    ratingCount: 187,
    reviews: [
      { id: 1, name: "Mia C.", location: "Seattle, WA", rating: 5, date: "June 18, 2026", title: "Worth every cent", body: "I was hesitant to spend this much on a ring but the quality is unreal. Heavy, beautiful, perfect fit. I haven't taken it off.", verified: true },
      { id: 2, name: "Priya M.", location: "San Francisco, CA", rating: 5, date: "June 2, 2026", title: "Gift for myself", body: "Treated myself and I have zero regrets. The dome shape is so elegant and modern at the same time.", verified: true },
      { id: 3, name: "Hannah B.", location: "Boston, MA", rating: 4, date: "May 15, 2026", title: "Beautiful ring", body: "Excellent quality. Runs a tiny bit large for me but I got it resized locally. The gold is stunning.", verified: true },
    ],
    relatedIds: [4, 5, 6, 8],
    tags: ["ring", "signet", "gold", "statement"],
  },
  {
    id: 3,
    slug: "herringbone-chain",
    name: "Herringbone Chain",
    category: "Necklaces",
    subcategory: "Chains",
    shortDescription: "A flat, fluid herringbone chain that moves like liquid.",
    description:
      "The Herringbone Chain is a modern classic — flat, flexible, and impossibly fluid. It drapes beautifully against the collarbone, catching light at every angle. Wear it alone for maximum impact or layer it for a curated stack. Crafted from sterling silver with a highly polished finish.",
    details: [
      "Width: 3mm",
      "Length: 16\" with 2\" extender",
      "Sterling silver 925",
      "High-polish finish",
      "Spring ring closure",
      "Nickel-free and hypoallergenic",
    ],
    dimensions: [
      "Chain width: 3mm",
      "Length: 16\" to 18\"",
    ],
    care: [
      "Anti-tarnish storage pouch included",
      "Clean with silver polishing cloth",
      "Lay flat when storing to prevent kinking",
      "Avoid harsh chemicals and perfumes",
    ],
    images: [IMGS.chain1, IMGS.chain1b, IMGS.chain1c, IMGS.necklace1c],
    badge: "New",
    variants: [
      { material: "sterling", label: "Sterling Silver", price: 228, inStock: true },
      { material: "14k-gold", label: "14k Gold", price: 348, inStock: true },
      { material: "rose-gold", label: "14k Rose Gold", price: 348, inStock: true },
    ],
    ratingAvg: 4.9,
    ratingCount: 241,
    reviews: [
      { id: 1, name: "Olivia S.", location: "Miami, FL", rating: 5, date: "June 20, 2026", title: "The most elegant necklace I own", body: "The way this chain moves is just gorgeous. It lies perfectly flat and catches the light so beautifully. I wear it every day.", verified: true },
      { id: 2, name: "Isabella W.", location: "Portland, OR", rating: 5, date: "June 5, 2026", title: "Exceeded expectations", body: "Photos don't do this justice. It's heavier than I expected in the best way. Truly luxurious.", verified: true },
    ],
    relatedIds: [1, 6, 7, 4],
    tags: ["necklace", "chain", "silver", "herringbone"],
  },
  {
    id: 4,
    slug: "pave-diamond-huggie",
    name: "Pavé Diamond Huggie",
    category: "Earrings",
    subcategory: "Hoops",
    shortDescription: "Pavé-set diamonds wrap around a sleek 14k gold huggie hoop.",
    description:
      "The Pavé Diamond Huggie brings a touch of sparkle to your everyday look. Tiny brilliant-cut diamonds are meticulously set around the entire circumference of the hoop, creating continuous glimmer from every angle. The 'huggie' fit sits snug against the earlobe for effortless, all-day comfort.",
    details: [
      "Inner diameter: 10mm",
      "Hoop width: 3mm",
      "Solid 14k gold setting",
      "Genuine brilliant-cut diamonds, 0.12 ctw",
      "Hinged closure — no backing required",
      "Sold as a pair",
    ],
    dimensions: [
      "Inner diameter: 10mm",
      "Hoop width: 3mm",
      "Post gauge: 0.8mm",
    ],
    care: [
      "Clean with soft brush and mild soap solution",
      "Avoid ultrasonic cleaners",
      "Store in provided box to protect stones",
      "Remove before sleeping or swimming",
    ],
    images: [IMGS.earring1, IMGS.earring1b, IMGS.earring1c, IMGS.earring1d],
    badge: "Sale",
    variants: [
      { material: "14k-gold", label: "14k Gold", price: 310, originalPrice: 390, inStock: true },
      { material: "rose-gold", label: "14k Rose Gold", price: 310, originalPrice: 390, inStock: true },
      { material: "14k-white", label: "14k White Gold", price: 310, originalPrice: 390, inStock: false },
    ],
    ratingAvg: 4.7,
    ratingCount: 429,
    reviews: [
      { id: 1, name: "Charlotte F.", location: "Nashville, TN", rating: 5, date: "June 14, 2026", title: "My favorite earrings ever", body: "I've had diamond earrings from luxury brands that cost 5× more and these are just as beautiful. The sparkle is incredible.", verified: true },
      { id: 2, name: "Grace L.", location: "Denver, CO", rating: 5, date: "May 30, 2026", title: "Perfect everyday sparkle", body: "These hug the ear perfectly. I sleep in them (I know, I know) and they're still perfect. Truly effortless.", verified: true },
      { id: 3, name: "Lily A.", location: "Phoenix, AZ", rating: 4, date: "May 12, 2026", title: "Beautiful but the clasp is stiff", body: "The earrings themselves are stunning. The hinged clasp took a few days to break in but now works perfectly.", verified: true },
    ],
    relatedIds: [5, 7, 1, 3],
    tags: ["earrings", "diamond", "huggie", "hoops", "sparkle"],
  },
  {
    id: 5,
    slug: "twisted-rope-bracelet",
    name: "Twisted Rope Bracelet",
    category: "Bracelets",
    subcategory: "Chain Bracelets",
    shortDescription: "A classic rope chain bracelet with a modern twist.",
    description:
      "The Twisted Rope Bracelet takes the timeless rope chain and elevates it with a structured two-strand twist. Solid 14k gold links interlock with precision, creating a tactile texture that catches light beautifully. Substantial enough to wear alone, refined enough to stack.",
    details: [
      "Length: 7\" with 1\" extender",
      "Width: 4mm",
      "Solid 14k gold",
      "Lobster clasp closure",
      "Nickel-free and hypoallergenic",
    ],
    dimensions: [
      "Length: 7\" adjustable to 8\"",
      "Width: 4mm",
    ],
    care: [
      "Clean with a soft jewelry cloth",
      "Remove before water activities",
      "Store flat to maintain shape",
      "Avoid contact with chemicals and perfumes",
    ],
    images: [IMGS.bracelet1, IMGS.bracelet1b, IMGS.bracelet1c, IMGS.lifestyle1],
    badge: "New",
    variants: [
      { material: "14k-gold", label: "14k Gold", price: 172, inStock: true },
      { material: "sterling", label: "Sterling Silver", price: 118, inStock: true },
      { material: "rose-gold", label: "14k Rose Gold", price: 172, inStock: true },
    ],
    ratingAvg: 4.8,
    ratingCount: 156,
    reviews: [
      { id: 1, name: "Natalie H.", location: "Atlanta, GA", rating: 5, date: "June 16, 2026", title: "Chunky but refined", body: "This bracelet has real presence without being over the top. The twist detail is so well crafted. Gets noticed everywhere.", verified: true },
      { id: 2, name: "Clara M.", location: "Minneapolis, MN", rating: 5, date: "June 1, 2026", title: "Stacks beautifully", body: "I wear this with two thinner bracelets and it looks incredible. Very sturdy feeling.", verified: true },
    ],
    relatedIds: [6, 2, 4, 8],
    tags: ["bracelet", "rope", "chain", "gold", "stacking"],
  },
  {
    id: 6,
    slug: "layered-satellite-chain",
    name: "Layered Satellite Chain",
    category: "Necklaces",
    subcategory: "Layering Necklaces",
    shortDescription: "Two delicate chains with scattered bead stations — pre-layered.",
    description:
      "Why struggle with layering when it's done for you? The Layered Satellite Chain comes pre-styled as two connected chains at different lengths, each adorned with tiny round bead stations. The result is an effortlessly curated look that moves gracefully with you throughout the day.",
    details: [
      "Two chains at 16\" and 18\" lengths",
      "Station diameter: 1.5mm",
      "Solid 14k gold",
      "Lobster clasp closure",
      "2\" extender included",
    ],
    dimensions: [
      "Short chain: 16\" (adjustable to 18\")",
      "Long chain: 18\" (adjustable to 20\")",
      "Station bead: 1.5mm",
    ],
    care: [
      "Store in the provided pouch — avoid tangling",
      "Clean with a dry soft cloth",
      "Remove before bathing or swimming",
    ],
    images: [IMGS.necklace1b, IMGS.necklace1, IMGS.chain1b, IMGS.lifestyle2],
    badge: "Bestseller",
    variants: [
      { material: "14k-gold", label: "14k Gold", price: 184, inStock: true },
      { material: "sterling", label: "Sterling Silver", price: 124, inStock: true },
      { material: "rose-gold", label: "14k Rose Gold", price: 184, inStock: true },
    ],
    ratingAvg: 4.9,
    ratingCount: 578,
    reviews: [
      { id: 1, name: "Ava P.", location: "San Diego, CA", rating: 5, date: "June 22, 2026", title: "Genius design", body: "I always struggle with layering necklaces and getting them tangled. This solves everything. It looks perfect, stays put, and the quality is outstanding.", verified: true },
      { id: 2, name: "Luna V.", location: "Houston, TX", rating: 5, date: "June 8, 2026", title: "My most-worn piece", body: "I've had this for 4 months and it's the first thing I put on every morning. It goes with everything.", verified: true },
      { id: 3, name: "Maya R.", location: "Philadelphia, PA", rating: 5, date: "May 25, 2026", title: "Gifted to my sister too", body: "I loved mine so much I bought one for my sister. She's obsessed. The packaging is beautiful for gifting.", verified: true },
    ],
    relatedIds: [1, 3, 7, 5],
    tags: ["necklace", "layered", "satellite", "chain", "bestseller"],
  },
  {
    id: 7,
    slug: "oval-hoop-earrings",
    name: "Oval Hoop Earrings",
    category: "Earrings",
    subcategory: "Hoops",
    shortDescription: "Sleek oval hoops with a modern silhouette.",
    description:
      "The Oval Hoop Earring gives the classic round hoop a sophisticated update. The elongated oval silhouette frames the face beautifully, creating an elegant look that transitions effortlessly from morning coffee to evening cocktails. Crafted in solid 14k gold with a highly polished finish.",
    details: [
      "Dimensions: 25mm height × 15mm width",
      "Tube diameter: 2mm",
      "Solid 14k gold",
      "Hinged closure",
      "Sold as a pair",
      "Fits standard and second piercings",
    ],
    dimensions: [
      "Height: 25mm",
      "Width: 15mm",
      "Tube diameter: 2mm",
    ],
    care: [
      "Polish with a soft cloth to maintain shine",
      "Store in the provided pouch",
      "Remove before sleeping to maintain shape",
      "Avoid contact with chemicals and perfumes",
    ],
    images: [IMGS.earring1b, IMGS.earring1, IMGS.earring1c, IMGS.earring1d],
    badge: "Bestseller",
    variants: [
      { material: "14k-gold", label: "14k Gold", price: 138, inStock: true },
      { material: "sterling", label: "Sterling Silver", price: 88, inStock: true },
      { material: "rose-gold", label: "14k Rose Gold", price: 138, inStock: true },
    ],
    ratingAvg: 4.9,
    ratingCount: 893,
    reviews: [
      { id: 1, name: "Stella J.", location: "New York, NY", rating: 5, date: "June 25, 2026", title: "The perfect everyday hoop", body: "I've gone through so many hoops over the years and these are definitively the best. The oval shape is so flattering.", verified: true },
      { id: 2, name: "Rose W.", location: "London, UK", rating: 5, date: "June 10, 2026", title: "Worth the price", body: "International shipping was quick and the earrings are absolutely gorgeous. Light, comfortable, and so beautiful.", verified: true },
      { id: 3, name: "Aria D.", location: "Toronto, CA", rating: 5, date: "May 28, 2026", title: "Bought 3 pairs!", body: "One in gold, one in silver, one for my mum as a birthday gift. No regrets whatsoever.", verified: true },
    ],
    relatedIds: [4, 1, 2, 5],
    tags: ["earrings", "hoops", "oval", "everyday"],
  },
  {
    id: 8,
    slug: "stacking-band-set",
    name: "Stacking Band Set",
    category: "Rings",
    subcategory: "Stacking Rings",
    shortDescription: "A set of three curated stacking bands — ready to layer.",
    description:
      "Three perfectly calibrated bands designed to stack in harmony. The set includes a plain polished band, a dainty beaded band, and a pearl-accented band. Wear all three together for a full look, or mix and match with your existing collection. Each band is crafted from solid 14k gold.",
    details: [
      "Set of 3 rings",
      "Plain band width: 1.5mm",
      "Beaded band width: 2mm",
      "Pearl band: 2mm with 2mm freshwater pearl",
      "Solid 14k gold setting",
      "Genuine freshwater pearl (pearl band)",
      "Nickel-free and hypoallergenic",
    ],
    dimensions: [
      "Plain band: 1.5mm width",
      "Beaded band: 2mm width",
      "Pearl band: 2mm width, 2mm pearl",
    ],
    care: [
      "Clean pearls with a damp soft cloth only",
      "Avoid chemical cleaners on pearl band",
      "Store separately from other jewelry",
      "Avoid submerging pearl band in water",
    ],
    images: [IMGS.ring1c, IMGS.ring1, IMGS.ring1b, IMGS.ring1d],
    badge: "New",
    variants: [
      { material: "14k-gold", label: "14k Gold", price: 245, inStock: true },
      { material: "sterling", label: "Sterling Silver", price: 168, inStock: true },
      { material: "rose-gold", label: "14k Rose Gold", price: 245, inStock: true },
    ],
    sizes: [
      { value: "5", inStock: true },
      { value: "5.5", inStock: true },
      { value: "6", inStock: true },
      { value: "6.5", inStock: true },
      { value: "7", inStock: true },
      { value: "7.5", inStock: true },
      { value: "8", inStock: false },
      { value: "8.5", inStock: true },
      { value: "9", inStock: true },
      { value: "10", inStock: false },
    ],
    ratingAvg: 4.8,
    ratingCount: 264,
    reviews: [
      { id: 1, name: "Chloe N.", location: "Chicago, IL", rating: 5, date: "June 19, 2026", title: "Perfect stack right out of the box", body: "No guesswork needed — these three bands are curated perfectly. The pearl one is especially exquisite.", verified: true },
      { id: 2, name: "Isla F.", location: "Dallas, TX", rating: 5, date: "June 3, 2026", title: "Great value for 3 rings", body: "The quality on all three is consistent and exceptional. The plain band is my favorite — so versatile.", verified: true },
    ],
    relatedIds: [2, 4, 5, 7],
    tags: ["rings", "stacking", "bands", "pearl", "set"],
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getRelatedProducts(ids: number[]): Product[] {
  return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
}
