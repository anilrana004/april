export type SlotType =
  | "base_chain"
  | "centerpiece"
  | "accents"
  | "clasp"
  | "bead"
  | "guru_bead"
  | "tassel"
  | "spacer";

export type ConfigPart = {
  id: string;
  name: string;
  slotType: SlotType;
  material: string;
  price: number;
  image: string;
  story: {
    headline: string;
    narrative: string;
    craftTime: string;
    origin: string;
  };
  inStock: boolean;
  leadTimeDays: number;
  incompatibleWith?: string[];
};

export type ConfigSlot = {
  id: SlotType;
  label: string;
  stepLabel: string;
  prompt: string;
  required: boolean;
  multiSelect: boolean;
  autoAdvance: boolean;
  parts: ConfigPart[];
};

export type ConfigType = {
  id: "necklace" | "bracelet" | "mala";
  label: string;
  subtitle: string;
  description: string;
  image: string;
  craftImage: string;
  startingFrom: number;
  slots: ConfigSlot[];
};

// ─── NECKLACE PARTS ────────────────────────────────────────────────────────────

const necklaceChains: ConfigPart[] = [
  {
    id: "chain-zenana",
    name: "The Zenana Chain",
    slotType: "base_chain",
    material: "18k Gold Vermeil",
    price: 120,
    image: "https://images.unsplash.com/photo-1625792508272-bc6ad2788b14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Spun from the geometry of old palace screens.",
      narrative:
        "The Zenana takes its form from the fine jali lattice-work of Rajasthani zenana screens — those carved stone grilles through which palace women once watched the world. Each link is box-set and soldered by hand, then plated in 18k gold vermeil over a sterling silver core. Held between fingers, it has a cool, almost architectural weight. In the light it reads gold; in shadow it reads amber.",
      craftTime: "4 days",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 10,
  },
  {
    id: "chain-haveli",
    name: "The Haveli Chain",
    slotType: "base_chain",
    material: "Oxidized Sterling Silver",
    price: 95,
    image: "https://images.unsplash.com/photo-1631050165155-421c47e306f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Silver aged deliberately, not accidentally.",
      narrative:
        "The Haveli Chain is oxidized in a controlled liver-of-sulfur bath by a single karigar in our Jaipur atelier — a process that turns sterling silver from bright to the deep, smoky tone of old havelis in the walled city. Each link is flat-rolled and hand-finished so the high points catch light while the recesses stay dark. It reads differently in every room. The patina deepens with wear, the way great things do.",
      craftTime: "3 days",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 10,
  },
  {
    id: "chain-cord",
    name: "The Silk Cord",
    slotType: "base_chain",
    material: "Hand-dyed Natural Silk",
    price: 45,
    image: "https://images.unsplash.com/photo-1662434923031-b9bf1b6c10e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Soft enough for skin. Strong enough for stone.",
      narrative:
        "Woven from natural silk and hand-dyed in a single muted terracotta tone, this cord base is the traditional foundation of the mala tradition — adapted here for necklace work. It is braided over a nylon core for strength, then knotted at every third centimetre so that, if it ever breaks, not a single bead is lost. The texture against the collarbone is unmistakably handmade.",
      craftTime: "2 days",
      origin: "Varanasi, Uttar Pradesh",
    },
    inStock: true,
    leadTimeDays: 7,
  },
];

const necklaceCenterpieces: ConfigPart[] = [
  {
    id: "cp-garnet",
    name: "The Jaipur Garnet Drop",
    slotType: "centerpiece",
    material: "Raw-Cut Pyrope Garnet",
    price: 85,
    image: "https://images.unsplash.com/photo-1521133573892-e44906baee46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Born from Rajasthan's ancient volcanic rock.",
      narrative:
        "Pyrope garnet has been mined in the Rajasthan hills for over three hundred years — the deep blood-red stone traded by Mughal merchants on routes that ran through Jaipur's pink walls. Each drop is left raw-cut: faceted just enough to catch light, not so much as to erase the stone's geological character. Wire-wrapped in fine 18k gold vermeil by a single karigar, it takes just under two days to set one.",
      craftTime: "2 days",
      origin: "Tonk, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 8,
    incompatibleWith: ["chain-cord"],
  },
  {
    id: "cp-moonstone",
    name: "The Moonstone Cabochon",
    slotType: "centerpiece",
    material: "Blue-Flash Moonstone",
    price: 110,
    image: "https://images.unsplash.com/photo-1533737338828-ebebc30718b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Every stone holds a different moon inside it.",
      narrative:
        "Blue-flash moonstone owes its adularescence — that milky, shifting glow — to interference between microscopic feldspar layers inside the stone. No two stones flash identically, which means no two pieces are the same. Sourced from mines in Karnataka, each cabochon is bezel-set in sterling silver, then polished by hand until the silver lip is just thin enough to let the stone's glow breathe fully.",
      craftTime: "3 days",
      origin: "Mysuru, Karnataka",
    },
    inStock: true,
    leadTimeDays: 12,
  },
  {
    id: "cp-crystal",
    name: "The Polki Crystal Pendant",
    slotType: "centerpiece",
    material: "Uncut Polki Crystal",
    price: 95,
    image: "https://images.unsplash.com/photo-1534592302589-d4f8f14c6f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Polki: the diamond that stayed honest.",
      narrative:
        "Polki is the oldest cutting tradition in Indian jewellery — the stone left nearly as it comes from the earth, with only the most minimal faceting to make it wearable. This pendant uses a single polki crystal encased in a raw burnished silver rub-over setting: nothing hidden, nothing added. The style traces directly to the Mughal court jewellers of the 17th century, who prized the uncut stone's ability to hold candlelight.",
      craftTime: "4 days",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 10,
  },
  {
    id: "cp-emerald",
    name: "The Emerald Wire Wrap",
    slotType: "centerpiece",
    material: "Raw Colombian Emerald",
    price: 165,
    image: "https://images.unsplash.com/photo-1433979933652-5e766d98ebb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Wire-wrapped the way it was done in the bazaars.",
      narrative:
        "Wire-wrapping — securing a stone in fine metal wire without any soldering — is one of the oldest jewellery techniques in the Subcontinent, still practiced today in the old bazaars of Jaipur's Johari Bazaar district. This raw Colombian emerald is wrapped in 22 gauge 18k gold wire over three full days: each coil placed by hand, each wrap tightened by eye. No setting compound. No glue. Just tension, patience, and the stone.",
      craftTime: "3 days",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 14,
  },
];

const necklaceAccents: ConfigPart[] = [
  {
    id: "accent-none",
    name: "No Accents",
    slotType: "accents",
    material: "—",
    price: 0,
    image: "https://images.unsplash.com/photo-1625792508272-bc6ad2788b14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    story: {
      headline: "Let the centerpiece speak alone.",
      narrative: "Sometimes restraint is the design choice. With no accent stones, the centerpiece commands full attention and the chain reads as a pure line.",
      craftTime: "—",
      origin: "—",
    },
    inStock: true,
    leadTimeDays: 0,
  },
  {
    id: "accent-pearl",
    name: "Seed Pearl Stations",
    slotType: "accents",
    material: "Freshwater Seed Pearls",
    price: 38,
    image: "https://images.unsplash.com/photo-1646280621486-743749c769b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    story: {
      headline: "Small spheres of light along the chain.",
      narrative:
        "Tiny freshwater seed pearls — 2mm each — are knotted between chain links at even intervals using silk thread. Sourced from pearl farms in Hyderabad, each one is hand-sorted for roundness and lustre before stringing. Six pearls per 16-inch chain. The effect in natural light is subtle punctuation: the chain appears to breathe.",
      craftTime: "1.5 days",
      origin: "Hyderabad, Telangana",
    },
    inStock: true,
    leadTimeDays: 6,
  },
  {
    id: "accent-ruby",
    name: "Raw Ruby Chips",
    slotType: "accents",
    material: "Natural Ruby Chips",
    price: 58,
    image: "https://images.unsplash.com/photo-1521133573892-e44906baee46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    story: {
      headline: "The colour of old temple prasad offerings.",
      narrative:
        "Natural ruby chips — the rough, irregular shards left after cutting faceted stones — are threaded at three points along the chain. Each chip is unique in shape. The stones come from Mogok Valley via Jaipur's gem market, the same stone the Maharajas traded for centuries. The red is not the chromium-bright red of polished rubies — it's deeper, earthier, the colour you'd find in old temple offering bowls.",
      craftTime: "2 days",
      origin: "Jaipur (Mogok origin)",
    },
    inStock: true,
    leadTimeDays: 8,
    incompatibleWith: ["chain-cord"],
  },
  {
    id: "accent-gold-beads",
    name: "Gold Granule Stations",
    slotType: "accents",
    material: "18k Gold Vermeil Granules",
    price: 42,
    image: "https://images.unsplash.com/photo-1702476320482-0736c4b962f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    story: {
      headline: "The oldest metalworking trick in the world.",
      narrative:
        "Granulation — fusing tiny spheres of gold to a surface without solder — is a technique that dates to the Bronze Age Etruscans and was independently developed across South and Central Asia. These 2mm 18k gold granule stations are placed at six intervals along the chain. Each is fused using a gold-copper alloy paste and a controlled heat process that does not melt the parent metal. Old knowledge, applied precisely.",
      craftTime: "2 days",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 8,
    incompatibleWith: ["chain-cord"],
  },
];

const necklaceClasps: ConfigPart[] = [
  {
    id: "clasp-kadi-gold",
    name: "The Kadi Clasp",
    slotType: "clasp",
    material: "18k Gold Vermeil",
    price: 80,
    image: "https://images.unsplash.com/photo-1659708701940-e60893ef03d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Fastened like an heirloom.",
      narrative:
        "Cast in 18k gold vermeil and hand-polished to a soft matte finish, the Kadi clasp takes its form from the anklet fastenings once worn across old Udaipur — small, sturdy, quietly ornamental. Each clasp is filed and set by a single karigar in our Jaipur atelier, a process that takes just under three days from wax to finish. Fasten it once, and you will hear the same soft click that closed anklets a hundred years ago.",
      craftTime: "3 days",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 5,
  },
  {
    id: "clasp-spring-silver",
    name: "Spring Ring Clasp",
    slotType: "clasp",
    material: "Oxidized Sterling Silver",
    price: 45,
    image: "https://images.unsplash.com/photo-1624588057318-5f1b2eb81012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Invisible until you need it.",
      narrative:
        "The spring ring is the workingman's clasp — a small, reliable, nearly self-effacing mechanism that keeps the piece on without drawing attention to itself. This one is hand-oxidized to match the Haveli chain's dark finish, with a fine wire trigger that compresses smoothly and returns with a satisfying snap. Diameter 8mm — large enough to manage with one hand.",
      craftTime: "1 day",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 4,
  },
  {
    id: "clasp-toggle-gold",
    name: "Toggle Bar Clasp",
    slotType: "clasp",
    material: "18k Gold Vermeil",
    price: 65,
    image: "https://images.unsplash.com/photo-1728647771865-636b715674f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Wear it at the front. It earns the attention.",
      narrative:
        "A toggle clasp fastens with a simple bar-through-ring mechanism, which means it sits exactly where the necklace ends — often at the nape, sometimes worn deliberately at the front as a design element. The bar is 20mm, the ring 14mm, both hand-cast in 18k gold vermeil. The connection between bar and ring has a slight play, which gives the clasp a gentle movement when worn.",
      craftTime: "2 days",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 5,
  },
];

// ─── BRACELET PARTS ─────────────────────────────────────────────────────────

const braceletBases: ConfigPart[] = [
  {
    id: "br-base-gold",
    name: "Fine Gold Box Chain",
    slotType: "base_chain",
    material: "18k Gold Vermeil",
    price: 85,
    image: "https://images.unsplash.com/photo-1625792508272-bc6ad2788b14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Seven inches of solid intention.",
      narrative:
        "A fine 1mm 18k gold vermeil box chain sized to 17cm with a 2cm extender. Hand-soldered at every link, polished after assembly — the sequence matters because soldering first and polishing after removes the rough flux residue that would otherwise dull the metal over time. Worn alone it is delicate. Stacked it anchors.",
      craftTime: "3 days",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 7,
  },
  {
    id: "br-base-silver",
    name: "Oxidized Flat Link",
    slotType: "base_chain",
    material: "Oxidized Sterling Silver",
    price: 70,
    image: "https://images.unsplash.com/photo-1655255114527-d0a834d9a774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Heavy for its size. That's intentional.",
      narrative:
        "Flat oval links, each 6mm × 4mm, oxidized dark and polished only on the high edges. The weight — unusual for a bracelet this slender — comes from the gauge of the silver: 1.2mm wire, not the 0.8mm used in most fashion chains. Roll it between your fingers and you'll feel the difference.",
      craftTime: "3 days",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 7,
  },
  {
    id: "br-base-cord",
    name: "Waxed Linen Cord",
    slotType: "base_chain",
    material: "Natural Waxed Linen",
    price: 28,
    image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "The material of mala-makers for centuries.",
      narrative:
        "Waxed linen has been used in South Asian bead-stringing for centuries — the wax provides water resistance, the natural fibre provides strength. This cord is a soft ecru, undyed, left in its raw state so the material reads as material. It wears in over time: softening, taking the shape of the wrist.",
      craftTime: "1 day",
      origin: "Varanasi, Uttar Pradesh",
    },
    inStock: true,
    leadTimeDays: 5,
  },
];

const braceletCharms: ConfigPart[] = [
  {
    id: "br-charm-garnet",
    name: "Garnet Drop Charm",
    slotType: "centerpiece",
    material: "Raw Pyrope Garnet",
    price: 65,
    image: "https://images.unsplash.com/photo-1521133573892-e44906baee46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "A small fire at the wrist.",
      narrative:
        "A single raw-cut pyrope garnet — deep blood-red, roughly 8mm at its widest — wire-wrapped in 18k gold vermeil and hung from the centre link of the bracelet chain. Movement brings the charm to the top of the wrist, to the inside, to the back — unpredictable, which is precisely the point.",
      craftTime: "1.5 days",
      origin: "Tonk, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 6,
  },
  {
    id: "br-charm-pearl",
    name: "Single Pearl Charm",
    slotType: "centerpiece",
    material: "Baroque Freshwater Pearl",
    price: 72,
    image: "https://images.unsplash.com/photo-1600721391689-2564bb8055de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Baroque means irregular. That's what makes it rare.",
      narrative:
        "A single baroque freshwater pearl: not round, not perfectly white, not uniform. Baroque pearls are the ones that grew without the perfectly spherical nucleus inserted in modern pearl farming — their irregular shapes are caused by natural movement inside the mollusc. Each one is unique. This one is wire-wrapped in sterling silver and hangs from the bracelet's centre ring.",
      craftTime: "1.5 days",
      origin: "Hyderabad, Telangana",
    },
    inStock: true,
    leadTimeDays: 6,
  },
  {
    id: "br-charm-disc",
    name: "Gold Disc Charm",
    slotType: "centerpiece",
    material: "18k Gold Vermeil",
    price: 55,
    image: "https://images.unsplash.com/photo-1702476320482-0736c4b962f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "A disc so thin it barely casts a shadow.",
      narrative:
        "Hand-hammered 18k gold vermeil, 12mm diameter, 0.6mm thin. The hammering creates a gentle undulation across the surface that makes the flat disc catch light differently at every angle. On request, an engraving of up to 12 characters can be added to the back face — a date, initials, a word in any script.",
      craftTime: "2 days",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 6,
  },
];

const braceletClasps: ConfigPart[] = [
  {
    id: "br-clasp-lobster",
    name: "Lobster Clasp",
    slotType: "clasp",
    material: "18k Gold Vermeil",
    price: 32,
    image: "https://images.unsplash.com/photo-1659708701940-e60893ef03d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "One hand. Three seconds. Secure.",
      narrative: "A gold vermeil lobster clasp: the workhorse of fine bracelet design. 10mm, cast, spring-loaded, and one-hand operable — a practical requirement for a wrist piece. Sized generously so the mechanism is easy to use even with one hand occupied.",
      craftTime: "1 day",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 3,
  },
  {
    id: "br-clasp-toggle",
    name: "Toggle Clasp",
    slotType: "clasp",
    material: "Oxidized Sterling Silver",
    price: 45,
    image: "https://images.unsplash.com/photo-1624588057318-5f1b2eb81012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "The clasp that becomes part of the design.",
      narrative: "A toggle bar clasp in oxidized silver that matches the Flat Link base. The bar is 18mm, slightly textured by hand-hammering. Unlike lobster clasps, toggle clasps are visible — they sit on the wrist like a small architectural detail, an honest acknowledgment that the piece has to fasten somewhere.",
      craftTime: "1.5 days",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 4,
  },
];

// ─── MALA PARTS ──────────────────────────────────────────────────────────────

const malaBeads: ConfigPart[] = [
  {
    id: "mala-rudraksha",
    name: "Rudraksha Beads",
    slotType: "bead",
    material: "Rudraksha Seed (5 Mukhi)",
    price: 95,
    image: "https://images.unsplash.com/photo-1646280621486-743749c769b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "The bead of Shiva, worn for three millennia.",
      narrative:
        "Rudraksha seeds — the dried berries of the Elaeocarpus ganitrus tree — have been used as meditation beads across the Subcontinent for at least three thousand years. These are 5-mukhi (five-faced) rudraksha: the most common and most universally worn variety, associated with clarity and grounding. Each bead is 8mm, hand-sorted for even sizing, and strung on a triple-ply silk thread with traditional knots between every bead so that if the thread breaks, not a single bead is lost.",
      craftTime: "5 days",
      origin: "Rishikesh, Uttarakhand",
    },
    inStock: true,
    leadTimeDays: 12,
  },
  {
    id: "mala-amethyst",
    name: "Amethyst Beads",
    slotType: "bead",
    material: "Natural Amethyst, 8mm",
    price: 120,
    image: "https://images.unsplash.com/photo-1521133573892-e44906baee46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "108 beads, each a slightly different shade of violet.",
      narrative:
        "Natural amethyst shows extraordinary colour variation even within a single mine's output: pale lavender beside deep grape, smoky purple beside near-clear. A finished mala therefore tells the whole story of colour in one piece. These are 8mm round beads from mines in Rajasthan, hand-sorted for consistent sizing but deliberately not matched for colour — the variation is the design. Strung on triple-ply silk with individual knots.",
      craftTime: "5 days",
      origin: "Rajasthan",
    },
    inStock: true,
    leadTimeDays: 14,
  },
  {
    id: "mala-rose-quartz",
    name: "Rose Quartz Beads",
    slotType: "bead",
    material: "Natural Rose Quartz, 8mm",
    price: 110,
    image: "https://images.unsplash.com/photo-1533737338828-ebebc30718b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Pale pink that shifts with the angle of light.",
      narrative:
        "Rose quartz owes its colour to microscopic inclusions of a fibrous silicate mineral — remove them and the quartz would be colourless. These 8mm round beads are translucent rather than opaque; held to light, each one glows from within. Sourced from mines in Rajasthan, the pale pink stone has been associated with gentleness in South Asian craft traditions going back centuries. Strung on triple-ply silk with traditional between-bead knots.",
      craftTime: "5 days",
      origin: "Rajasthan",
    },
    inStock: true,
    leadTimeDays: 12,
  },
];

const malaGuruBeads: ConfigPart[] = [
  {
    id: "mala-guru-gold",
    name: "Gold Guru Bead",
    slotType: "guru_bead",
    material: "18k Gold Vermeil",
    price: 85,
    image: "https://images.unsplash.com/photo-1702476320482-0736c4b962f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "The bead that marks the beginning.",
      narrative:
        "The guru bead is the one bead the thumb skips over — the count restarts here. Hand-cast in 18k gold vermeil, this guru bead is slightly larger than the strand beads (12mm vs 8mm), with a double-drilled vertical hole that allows the tassel to thread through it cleanly. Engraved on request with a single OM symbol on the side face.",
      craftTime: "2 days",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 6,
  },
  {
    id: "mala-guru-silver",
    name: "Silver Guru Bead",
    slotType: "guru_bead",
    material: "Oxidized Sterling Silver",
    price: 65,
    image: "https://images.unsplash.com/photo-1624588057318-5f1b2eb81012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Dark, heavy, grounding.",
      narrative:
        "Hand-cast in sterling silver, then oxidized to a deep charcoal finish and polished only on the high points of the surface texture. The 12mm bead is noticeably heavier than the strand beads above it — which is deliberate. The guru bead's weight creates a small but perceptible pause when the strand reaches it in counting practice.",
      craftTime: "2 days",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 6,
  },
];

const malaTassels: ConfigPart[] = [
  {
    id: "mala-tassel-silk-gold",
    name: "Gold Silk Tassel",
    slotType: "tassel",
    material: "Raw Silk — Saffron Gold",
    price: 45,
    image: "https://images.unsplash.com/photo-1781793326465-78eedc921d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "The colour of turmeric and old temple flags.",
      narrative:
        "Spun from raw (not reeled) silk — a coarser, more textured fibre than the smooth silk of fashion fabrics — this tassel is dyed a specific saffron-gold using natural dye derived from turmeric and a mordant of alum. The colour is warm rather than bright: close to old brass, close to the hue of dried marigold offerings. Each tassel is finished with a small gold vermeil cap.",
      craftTime: "1.5 days",
      origin: "Varanasi, Uttar Pradesh",
    },
    inStock: true,
    leadTimeDays: 5,
  },
  {
    id: "mala-tassel-cotton-natural",
    name: "Natural Cotton Tassel",
    slotType: "tassel",
    material: "Unbleached Cotton",
    price: 28,
    image: "https://images.unsplash.com/photo-1628058494685-6c2f796ac24a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    story: {
      headline: "Undyed because the natural colour is already perfect.",
      narrative:
        "Unbleached cotton in its natural ecru — neither white nor cream but the specific warm off-white of the cotton bolls before any processing. The thread is left undyed deliberately: the colour is the colour of the material itself. A simple raw cotton cap at the top. This tassel is for the mala that should look as if it came from a Himalayan market rather than a jewellery atelier.",
      craftTime: "1 day",
      origin: "Varanasi, Uttar Pradesh",
    },
    inStock: true,
    leadTimeDays: 4,
  },
];

const malaSpacers: ConfigPart[] = [
  {
    id: "mala-spacers-none",
    name: "No Spacers",
    slotType: "spacer",
    material: "—",
    price: 0,
    image: "https://images.unsplash.com/photo-1646280621486-743749c769b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    story: {
      headline: "Bead-to-bead, uninterrupted.",
      narrative: "A traditional mala strung bead-to-bead with no spacers — the knot between each bead is the only element between them. Clean, focused, traditional.",
      craftTime: "—",
      origin: "—",
    },
    inStock: true,
    leadTimeDays: 0,
  },
  {
    id: "mala-spacers-gold",
    name: "Gold Daisy Spacers",
    slotType: "spacer",
    material: "18k Gold Vermeil",
    price: 42,
    image: "https://images.unsplash.com/photo-1702476320482-0736c4b962f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    story: {
      headline: "Six petals, repeated 108 times.",
      narrative:
        "A small daisy-form 18k gold vermeil spacer bead — 4mm, six-petalled — placed between every ninth main bead. The traditional grouping of nine in mala stringing has roots in Vedic numerology; the spacer marks each group visually. In gold against the main bead, the spacers read as small punctuation: regular, rhythmic, barely there but noticed when gone.",
      craftTime: "1 day",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 5,
  },
  {
    id: "mala-spacers-silver",
    name: "Silver Rondelle Spacers",
    slotType: "spacer",
    material: "Sterling Silver",
    price: 32,
    image: "https://images.unsplash.com/photo-1631050165155-421c47e306f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    story: {
      headline: "The pause between intentions.",
      narrative:
        "Sterling silver rondelle beads — flat, disc-like, 4mm diameter — placed at the quarter-bead marks of the mala (every 27th bead). Silver rondelles are the traditional spacer form in Buddhist mala traditions. They sit flat against the main beads, creating a quiet visual break at the quarter and half marks of a full 108-bead count.",
      craftTime: "1 day",
      origin: "Jaipur, Rajasthan",
    },
    inStock: true,
    leadTimeDays: 4,
  },
];

// ─── FULL CONFIG TYPES ────────────────────────────────────────────────────────

export const configTypes: ConfigType[] = [
  {
    id: "necklace",
    label: "Maala — Necklace",
    subtitle: "Build your necklace",
    description:
      "Begin with a chain, choose your centerpiece, add accents, and select a clasp. Every part is individually sourced, individually storied.",
    image: "https://images.unsplash.com/photo-1633555234047-192d10238f5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    craftImage: "https://images.unsplash.com/photo-1628058494685-6c2f796ac24a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    startingFrom: 340,
    slots: [
      {
        id: "base_chain",
        label: "Base Chain",
        stepLabel: "Choose Your Chain",
        prompt: "Every piece begins with a foundation. Choose yours.",
        required: true,
        multiSelect: false,
        autoAdvance: true,
        parts: necklaceChains,
      },
      {
        id: "centerpiece",
        label: "Centerpiece",
        stepLabel: "Choose Your Centerpiece",
        prompt: "The emotional core of your piece. Take your time here.",
        required: true,
        multiSelect: false,
        autoAdvance: true,
        parts: necklaceCenterpieces,
      },
      {
        id: "accents",
        label: "Accent Stones",
        stepLabel: "Add Accents",
        prompt: "Optional — one or more stones along the chain. Select none to keep it clean.",
        required: false,
        multiSelect: false,
        autoAdvance: true,
        parts: necklaceAccents,
      },
      {
        id: "clasp",
        label: "Clasp",
        stepLabel: "Choose Your Clasp",
        prompt: "The closing detail. Functional, and quietly visible.",
        required: true,
        multiSelect: false,
        autoAdvance: true,
        parts: necklaceClasps,
      },
    ],
  },
  {
    id: "bracelet",
    label: "Bracelet",
    subtitle: "Build your bracelet",
    description:
      "A base, a charm, a clasp. Three decisions that make something entirely yours.",
    image: "https://images.unsplash.com/photo-1655255114527-d0a834d9a774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    craftImage: "https://images.unsplash.com/photo-1624588057318-5f1b2eb81012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    startingFrom: 183,
    slots: [
      {
        id: "base_chain",
        label: "Base",
        stepLabel: "Choose Your Base",
        prompt: "The foundation of your bracelet. What will it rest on?",
        required: true,
        multiSelect: false,
        autoAdvance: true,
        parts: braceletBases,
      },
      {
        id: "centerpiece",
        label: "Charm",
        stepLabel: "Choose Your Charm",
        prompt: "The centrepiece — the thing that moves.",
        required: true,
        multiSelect: false,
        autoAdvance: true,
        parts: braceletCharms,
      },
      {
        id: "clasp",
        label: "Clasp",
        stepLabel: "Choose Your Clasp",
        prompt: "Practical and considered.",
        required: true,
        multiSelect: false,
        autoAdvance: true,
        parts: braceletClasps,
      },
    ],
  },
  {
    id: "mala",
    label: "Mala",
    subtitle: "Build your mala",
    description:
      "108 beads, a guru bead, a tassel, optional spacers. A meditation tool made entirely to your intention.",
    image: "https://images.unsplash.com/photo-1646280621486-743749c769b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    craftImage: "https://images.unsplash.com/photo-1599071338288-49173359e0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    startingFrom: 250,
    slots: [
      {
        id: "bead",
        label: "Beads",
        stepLabel: "Choose Your Beads",
        prompt: "108 beads. The stone you choose becomes the tone of every practice.",
        required: true,
        multiSelect: false,
        autoAdvance: true,
        parts: malaBeads,
      },
      {
        id: "guru_bead",
        label: "Guru Bead",
        stepLabel: "Choose Your Guru Bead",
        prompt: "The single bead the thumb skips over. It marks the beginning.",
        required: true,
        multiSelect: false,
        autoAdvance: true,
        parts: malaGuruBeads,
      },
      {
        id: "tassel",
        label: "Tassel",
        stepLabel: "Choose Your Tassel",
        prompt: "The tassel that hangs from the guru bead.",
        required: true,
        multiSelect: false,
        autoAdvance: true,
        parts: malaTassels,
      },
      {
        id: "spacer",
        label: "Spacers",
        stepLabel: "Choose Spacers",
        prompt: "Optional spacer beads that mark the counting intervals.",
        required: false,
        multiSelect: false,
        autoAdvance: true,
        parts: malaSpacers,
      },
    ],
  },
];

export function getConfigType(id: string): ConfigType | undefined {
  return configTypes.find((c) => c.id === id);
}

export function computePrice(selected: Record<string, ConfigPart | null>): number {
  return Object.values(selected).reduce((sum, part) => sum + (part?.price ?? 0), 0);
}

export function buildNarrative(selected: Record<string, ConfigPart | null>, configType: ConfigType): string {
  const parts = configType.slots
    .map((slot) => selected[slot.id])
    .filter(Boolean) as ConfigPart[];

  if (parts.length === 0) return "";

  const sentences = parts.map((part, i) => {
    const slotLabels: Record<string, string> = {
      base_chain: i === 0 ? "begins with" : "rests on",
      bead: "is strung with",
      centerpiece: "carries",
      accents: part.price === 0 ? null as any : "is accented with",
      clasp: "and closes with",
      guru_bead: "anchored by",
      tassel: "finished with",
      spacer: part.price === 0 ? null as any : "punctuated by",
    };
    const verb = slotLabels[part.slotType];
    if (!verb) return null;
    return `${verb} ${part.name.toLowerCase()} — ${part.story.narrative.split(".")[0].toLowerCase()}`;
  }).filter(Boolean);

  const typeLabel = configType.id === "necklace" ? "Your necklace" : configType.id === "bracelet" ? "Your bracelet" : "Your mala";

  return `${typeLabel} ${sentences.join(", ")}. Hand-finished in our atelier, it will be ready in approximately ${Math.max(...parts.map((p) => p.leadTimeDays))} days.`;
}
