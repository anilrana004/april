import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Gift, Mail, Video } from "lucide-react";
import {
  type ConfigType, type ConfigPart, type ConfigSlot,
  computePrice, buildNarrative,
} from "../../data/configuratorParts";
import { PartCard } from "./PartCard";
import { YourPiecePanel } from "./YourPiecePanel";
import { type Product } from "../../data/products";

type OutletContext = { handleAddToCart: (product: Product, qty?: number) => void };

type Personalization = {
  engraving: string;
  length: string;
  giftWrap: boolean;
};

type Props = { configType: ConfigType };

const ENGRAVE_PRICE = 35;
const GIFT_WRAP_PRICE = 15;
const LENGTH_OPTIONS = ["14\" (choker)", "16\" (standard)", "18\" (collarbone)", "20\" (chest)", "22\" (long)"];

export function ConfiguratorShell({ configType }: Props) {
  const { handleAddToCart } = useOutletContext<OutletContext>();

  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState<Record<string, ConfigPart | null>>(() =>
    Object.fromEntries(configType.slots.map((s) => [s.id, null]))
  );
  const [personalization, setPersonalization] = useState<Personalization>({
    engraving: "",
    length: "16\" (standard)",
    giftWrap: false,
  });
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [saveEmail, setSaveEmail] = useState("");
  const [savedEmail, setSavedEmail] = useState(false);

  const totalDataSteps = configType.slots.length;
  const PERSONALIZE_STEP = totalDataSteps;
  const REVIEW_STEP = totalDataSteps + 1;
  const totalSteps = totalDataSteps + 2;

  const currentSlot: ConfigSlot | null = currentStep < totalDataSteps ? configType.slots[currentStep] : null;
  const selectedForSlot = currentSlot ? selected[currentSlot.id] : null;

  const canAdvance = currentStep < totalDataSteps
    ? (!currentSlot?.required || selected[currentSlot!.id] !== null)
    : true;

  const allRequiredFilled = configType.slots
    .filter((s) => s.required)
    .every((s) => selected[s.id] !== null);

  const totalPrice = computePrice(selected)
    + (personalization.engraving ? ENGRAVE_PRICE : 0)
    + (personalization.giftWrap ? GIFT_WRAP_PRICE : 0);

  const narrative = buildNarrative(selected, configType);

  // Reset when configType changes
  useEffect(() => {
    setCurrentStep(0);
    setSelected(Object.fromEntries(configType.slots.map((s) => [s.id, null])));
    setPersonalization({ engraving: "", length: "16\" (standard)", giftWrap: false });
  }, [configType.id]);

  const handleSelectPart = (slot: ConfigSlot, part: ConfigPart) => {
    setSelected((prev) => ({ ...prev, [slot.id]: part }));
    if (slot.autoAdvance && currentStep < totalDataSteps - 1) {
      setTimeout(() => setCurrentStep((s) => s + 1), 280);
    }
  };

  const handleAddToCartClick = () => {
    // Construct a pseudo-product from the configuration
    const parts = configType.slots.map((s) => selected[s.id]).filter(Boolean) as ConfigPart[];
    const names = parts.map((p) => p.name).join(" · ");
    const pseudoProduct: Product = {
      id: Date.now(),
      slug: `bespoke-${configType.id}-${Date.now()}`,
      name: `Bespoke ${configType.label} — ${names}`,
      category: configType.id === "necklace" ? "Necklaces" : configType.id === "bracelet" ? "Bracelets" : "Necklaces",
      subcategory: "Bespoke",
      shortDescription: narrative,
      description: narrative,
      details: parts.map((p) => `${p.name}: ${p.story.narrative.split(".")[0]}`),
      dimensions: [],
      care: ["Store in provided pouch", "Remove before water activities"],
      images: parts.map((p) => p.image).filter(Boolean),
      variants: [{ material: "bespoke", label: "Bespoke", price: totalPrice, inStock: true }],
      ratingAvg: 5,
      ratingCount: 0,
      reviews: [],
      relatedIds: [],
      tags: ["bespoke", configType.id],
    };
    handleAddToCart(pseudoProduct, 1);
    setAddedToCart(true);
  };

  const handleSave = () => {
    if (saveEmail.includes("@")) setSavedEmail(true);
  };

  const progressPct = Math.round((currentStep / (totalSteps - 1)) * 100);

  const stepLabels = [
    ...configType.slots.map((s) => s.label),
    "Personalize",
    "Review",
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* ── Progress bar ── */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-[#E8E4DF]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 flex items-center gap-6">
          {/* Step breadcrumb */}
          <div className="hidden md:flex items-center gap-2 flex-1 overflow-hidden">
            {stepLabels.map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <button
                  onClick={() => i < currentStep && setCurrentStep(i)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    i === currentStep
                      ? "text-[#1A1A1A]"
                      : i < currentStep
                      ? "text-[#C9A96E] hover:text-[#C9A96E] cursor-pointer"
                      : "text-[#C5C0BB] cursor-default"
                  }`}
                  style={{ fontSize: "0.65rem" }}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                      i < currentStep
                        ? "bg-[#C9A96E] text-white"
                        : i === currentStep
                        ? "bg-[#1A1A1A] text-white"
                        : "bg-[#E8E4DF] text-[#9A9590]"
                    }`}
                    style={{ fontSize: "0.5rem" }}
                  >
                    {i < currentStep ? <Check size={8} /> : i + 1}
                  </span>
                  <span className="uppercase tracking-wider whitespace-nowrap">{label}</span>
                </button>
                {i < stepLabels.length - 1 && (
                  <ChevronRight size={10} className="text-[#D5CFC9] flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile: thin progress line */}
          <div className="flex-1 md:hidden">
            <div className="flex items-center justify-between mb-1.5">
              <span className="uppercase tracking-widest text-[#1A1A1A]" style={{ fontSize: "0.65rem" }}>
                Step {currentStep + 1} of {totalSteps}
              </span>
              <span className="text-[#9A9590]" style={{ fontSize: "0.65rem" }}>
                {stepLabels[currentStep]}
              </span>
            </div>
            <div className="h-0.5 bg-[#E8E4DF] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C9A96E] rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Config type badge */}
          <span className="uppercase tracking-widest text-[#9A9590] flex-shrink-0 hidden md:block" style={{ fontSize: "0.62rem" }}>
            {configType.label}
          </span>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 flex gap-10">

        {/* ── Step content ── */}
        <div className="flex-1 min-w-0 pb-32 lg:pb-0">

          {/* ── Part selection steps (0 … totalDataSteps-1) ── */}
          {currentStep < totalDataSteps && currentSlot && (
            <div>
              <div className="mb-10">
                <p className="uppercase tracking-[0.2em] text-[#C9A96E] mb-3" style={{ fontSize: "0.65rem" }}>
                  Step {currentStep + 1} · {currentSlot.label}
                </p>
                <h2
                  className="text-[#1A1A1A] mb-3"
                  style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400 }}
                >
                  {currentSlot.stepLabel}
                </h2>
                <p className="text-[#6B6560] max-w-xl" style={{ fontSize: "0.88rem", lineHeight: 1.75 }}>
                  {currentSlot.prompt}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {currentSlot.parts.map((part) => (
                  <PartCard
                    key={part.id}
                    part={part}
                    selected={selectedForSlot?.id === part.id}
                    onSelect={(p) => handleSelectPart(currentSlot, p)}
                  />
                ))}
              </div>

              {/* Step nav */}
              <div className="flex items-center gap-4 mt-10">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="flex items-center gap-2 border border-[#D5CFC9] text-[#6B6560] px-6 py-3 uppercase tracking-widest hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                    style={{ fontSize: "0.68rem" }}
                  >
                    <ArrowLeft size={13} /> Back
                  </button>
                )}
                <button
                  onClick={() => setCurrentStep((s) => s + 1)}
                  disabled={!canAdvance}
                  className={`flex items-center gap-2 px-8 py-3 uppercase tracking-widest transition-colors ${
                    canAdvance
                      ? "bg-[#1A1A1A] text-white hover:bg-[#333]"
                      : "bg-[#E8E4DF] text-[#9A9590] cursor-not-allowed"
                  }`}
                  style={{ fontSize: "0.68rem" }}
                >
                  {currentSlot.required && !selectedForSlot ? "Select a part to continue" : "Continue"} <ArrowRight size={13} />
                </button>
              </div>
            </div>
          )}

          {/* ── Personalize step ── */}
          {currentStep === PERSONALIZE_STEP && (
            <div>
              <div className="mb-10">
                <p className="uppercase tracking-[0.2em] text-[#C9A96E] mb-3" style={{ fontSize: "0.65rem" }}>
                  Step {PERSONALIZE_STEP + 1} · Optional
                </p>
                <h2
                  className="text-[#1A1A1A] mb-3"
                  style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400 }}
                >
                  Personalize
                </h2>
                <p className="text-[#6B6560]" style={{ fontSize: "0.88rem", lineHeight: 1.75 }}>
                  Optional finishing touches. Skip this step if none apply.
                </p>
              </div>

              <div className="max-w-lg space-y-8">
                {/* Length (necklaces only) */}
                {configType.id === "necklace" && (
                  <div>
                    <label className="block uppercase tracking-widest text-[#1A1A1A] mb-3" style={{ fontSize: "0.68rem" }}>
                      Length
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {LENGTH_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setPersonalization((p) => ({ ...p, length: opt }))}
                          className={`px-4 py-2.5 border transition-all text-left ${
                            personalization.length === opt
                              ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                              : "border-[#D5CFC9] text-[#555] hover:border-[#1A1A1A]"
                          }`}
                          style={{ fontSize: "0.75rem" }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Engraving */}
                <div>
                  <label className="block uppercase tracking-widest text-[#1A1A1A] mb-1" style={{ fontSize: "0.68rem" }}>
                    Engraving
                    <span className="text-[#C9A96E] ml-2 normal-case tracking-normal" style={{ fontSize: "0.72rem" }}>
                      +${ENGRAVE_PRICE}
                    </span>
                  </label>
                  <p className="text-[#9A9590] mb-3" style={{ fontSize: "0.75rem" }}>
                    Up to 16 characters — initials, a date, a word in any script (Latin, Devanagari, Arabic). Leave blank to skip.
                  </p>
                  <input
                    type="text"
                    maxLength={16}
                    value={personalization.engraving}
                    onChange={(e) => setPersonalization((p) => ({ ...p, engraving: e.target.value }))}
                    placeholder="e.g.  24.07.2026  or  सत्यम्"
                    className="w-full border border-[#D5CFC9] bg-white px-4 py-3 text-[#1A1A1A] placeholder-[#C5C0BB] outline-none focus:border-[#C9A96E] transition-colors"
                    style={{ fontSize: "0.88rem" }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[#9A9590]" style={{ fontSize: "0.68rem" }}>
                      {personalization.engraving.length}/16 characters
                    </span>
                    {personalization.engraving && (
                      <span className="text-[#C9A96E]" style={{ fontSize: "0.68rem" }}>
                        +${ENGRAVE_PRICE} added
                      </span>
                    )}
                  </div>
                </div>

                {/* Gift wrap */}
                <div
                  className={`flex items-start gap-4 border p-5 cursor-pointer transition-all ${
                    personalization.giftWrap ? "border-[#1A1A1A] bg-[#FAFAF8]" : "border-[#D5CFC9] hover:border-[#C9A96E]"
                  }`}
                  onClick={() => setPersonalization((p) => ({ ...p, giftWrap: !p.giftWrap }))}
                >
                  <div
                    className={`w-5 h-5 flex-shrink-0 border-2 flex items-center justify-center mt-0.5 ${
                      personalization.giftWrap ? "border-[#1A1A1A] bg-[#1A1A1A]" : "border-[#D5CFC9]"
                    }`}
                  >
                    {personalization.giftWrap && <Check size={11} className="text-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <Gift size={15} className="text-[#C9A96E]" />
                      <p className="text-[#1A1A1A] uppercase tracking-wider" style={{ fontSize: "0.7rem" }}>
                        Complimentary Gift Wrapping
                        <span className="text-[#C9A96E] ml-2 normal-case tracking-normal" style={{ fontSize: "0.72rem" }}>
                          +${GIFT_WRAP_PRICE}
                        </span>
                      </p>
                    </div>
                    <p className="text-[#6B6560] mt-1.5" style={{ fontSize: "0.78rem", lineHeight: 1.6 }}>
                      Signature box with dupioni silk ribbon. A handwritten card message can be added at checkout.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-10">
                <button
                  onClick={() => setCurrentStep(PERSONALIZE_STEP - 1)}
                  className="flex items-center gap-2 border border-[#D5CFC9] text-[#6B6560] px-6 py-3 uppercase tracking-widest hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                  style={{ fontSize: "0.68rem" }}
                >
                  <ArrowLeft size={13} /> Back
                </button>
                <button
                  onClick={() => setCurrentStep(REVIEW_STEP)}
                  className="flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-3 uppercase tracking-widest hover:bg-[#333] transition-colors"
                  style={{ fontSize: "0.68rem" }}
                >
                  Review Your Design <ArrowRight size={13} />
                </button>
              </div>
            </div>
          )}

          {/* ── Review step ── */}
          {currentStep === REVIEW_STEP && (
            <div>
              <div className="mb-10">
                <p className="uppercase tracking-[0.2em] text-[#C9A96E] mb-3" style={{ fontSize: "0.65rem" }}>
                  Final Step
                </p>
                <h2
                  className="text-[#1A1A1A] mb-3"
                  style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400 }}
                >
                  Your Piece
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                {/* Composed preview */}
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {configType.slots
                      .map((s) => selected[s.id])
                      .filter((p) => p && p.price > 0)
                      .map((part, i) => (
                        <div key={i} className="relative aspect-square overflow-hidden bg-[#F5F0EB]">
                          <img
                            src={part!.image}
                            alt={part!.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2.5 py-1.5">
                            <p className="text-white" style={{ fontSize: "0.6rem" }}>{part!.name}</p>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Narrative */}
                  <div className="bg-[#F5F0EB] p-6">
                    <p className="uppercase tracking-widest text-[#C9A96E] mb-3" style={{ fontSize: "0.6rem" }}>
                      Your Story
                    </p>
                    <p className="text-[#3D3A36] italic leading-relaxed" style={{ fontSize: "0.88rem", lineHeight: 1.85, fontFamily: "Georgia, serif" }}>
                      "{narrative}"
                    </p>
                  </div>
                </div>

                {/* Itemized summary + CTAs */}
                <div>
                  <div className="border border-[#E8E4DF] bg-white">
                    <div className="px-6 py-5 border-b border-[#E8E4DF]">
                      <p className="uppercase tracking-widest text-[#1A1A1A] mb-1" style={{ fontSize: "0.65rem" }}>
                        Order Summary
                      </p>
                      <p className="text-[#9A9590]" style={{ fontSize: "0.72rem" }}>
                        {configType.label} · Bespoke
                      </p>
                    </div>

                    <div className="px-6 py-5 space-y-3">
                      {configType.slots.map((slot) => {
                        const part = selected[slot.id];
                        if (!part) return null;
                        return (
                          <div key={slot.id} className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 flex-shrink-0 overflow-hidden bg-[#F5F0EB]">
                                <img src={part.image} alt={part.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[#9A9590] uppercase tracking-wider" style={{ fontSize: "0.58rem" }}>
                                  {slot.label}
                                </p>
                                <p className="text-[#1A1A1A] truncate" style={{ fontSize: "0.8rem" }}>
                                  {part.name}
                                </p>
                              </div>
                            </div>
                            <span className="text-[#1A1A1A] flex-shrink-0" style={{ fontSize: "0.8rem" }}>
                              {part.price === 0 ? "—" : `$${part.price}`}
                            </span>
                          </div>
                        );
                      })}

                      {personalization.engraving && (
                        <div className="flex justify-between">
                          <span className="text-[#6B6560]" style={{ fontSize: "0.78rem" }}>
                            Engraving: "{personalization.engraving}"
                          </span>
                          <span style={{ fontSize: "0.78rem" }}>${ENGRAVE_PRICE}</span>
                        </div>
                      )}
                      {personalization.giftWrap && (
                        <div className="flex justify-between">
                          <span className="text-[#6B6560]" style={{ fontSize: "0.78rem" }}>Gift wrapping</span>
                          <span style={{ fontSize: "0.78rem" }}>${GIFT_WRAP_PRICE}</span>
                        </div>
                      )}
                      {configType.id === "necklace" && (
                        <div className="flex justify-between border-t border-[#F0EDE9] pt-3">
                          <span className="text-[#6B6560]" style={{ fontSize: "0.78rem" }}>Length</span>
                          <span style={{ fontSize: "0.78rem" }}>{personalization.length}</span>
                        </div>
                      )}
                    </div>

                    <div className="px-6 py-4 bg-[#FAFAF8] border-t border-[#E8E4DF] flex items-center justify-between">
                      <span className="uppercase tracking-widest text-[#6B6560]" style={{ fontSize: "0.65rem" }}>Total</span>
                      <span style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem" }}>${totalPrice}</span>
                    </div>
                  </div>

                  {/* Production note */}
                  <div className="mt-5 flex items-start gap-3 bg-[#F5F0EB] px-5 py-4">
                    <div className="w-1 h-1 rounded-full bg-[#C9A96E] mt-2 flex-shrink-0" />
                    <p className="text-[#6B6560]" style={{ fontSize: "0.78rem", lineHeight: 1.7 }}>
                      Your piece will be hand-finished over approximately{" "}
                      <strong className="text-[#1A1A1A]">12–18 days</strong> before it ships. You'll receive email updates at each stage: Cast → Set → Polished → Shipped.
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="mt-6 space-y-3">
                    {addedToCart ? (
                      <div className="w-full bg-[#2E7D32] text-white py-4 uppercase tracking-widest flex items-center justify-center gap-2" style={{ fontSize: "0.7rem" }}>
                        <Check size={14} /> Added to Cart
                      </div>
                    ) : (
                      <button
                        onClick={handleAddToCartClick}
                        disabled={!allRequiredFilled}
                        className={`w-full py-4 uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${
                          allRequiredFilled
                            ? "bg-[#1A1A1A] text-white hover:bg-[#333]"
                            : "bg-[#E8E4DF] text-[#9A9590] cursor-not-allowed"
                        }`}
                        style={{ fontSize: "0.7rem" }}
                      >
                        Add to Cart — ${totalPrice}
                      </button>
                    )}

                    {/* Save */}
                    {!savedEmail ? (
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={saveEmail}
                          onChange={(e) => setSaveEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="flex-1 border border-[#D5CFC9] px-4 py-3 text-[#1A1A1A] placeholder-[#C5C0BB] outline-none focus:border-[#C9A96E] transition-colors bg-white"
                          style={{ fontSize: "0.8rem" }}
                        />
                        <button
                          onClick={handleSave}
                          className="flex-shrink-0 border border-[#1A1A1A] text-[#1A1A1A] px-5 py-3 uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors flex items-center gap-1.5"
                          style={{ fontSize: "0.65rem" }}
                        >
                          <Mail size={12} /> Save Design
                        </button>
                      </div>
                    ) : (
                      <div className="border border-[#C9A96E] text-[#C9A96E] px-4 py-3 text-center" style={{ fontSize: "0.72rem" }}>
                        Design saved — we'll email it to {saveEmail}
                      </div>
                    )}

                    <button
                      className="w-full border border-[#D5CFC9] text-[#6B6560] py-3.5 uppercase tracking-widest hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors flex items-center justify-center gap-2"
                      style={{ fontSize: "0.65rem" }}
                    >
                      <Video size={13} /> Book a Video Consultation
                    </button>
                  </div>

                  <button
                    onClick={() => setCurrentStep(PERSONALIZE_STEP)}
                    className="mt-4 flex items-center gap-1.5 text-[#9A9590] hover:text-[#C9A96E] transition-colors"
                    style={{ fontSize: "0.7rem" }}
                  >
                    <ArrowLeft size={12} /> Edit personalization
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Your Piece Panel (desktop sidebar) ── */}
        <YourPiecePanel
          configType={configType}
          selected={selected}
          totalSteps={totalDataSteps}
          currentStep={currentStep}
          mobileOpen={mobilePanelOpen}
          onToggleMobile={() => setMobilePanelOpen((p) => !p)}
          onAddToCart={handleAddToCartClick}
          onSave={() => setSavedEmail(true)}
          canCheckout={allRequiredFilled}
        />
      </div>
    </div>
  );
}
