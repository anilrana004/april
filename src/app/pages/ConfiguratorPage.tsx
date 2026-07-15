import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { configTypes } from "../data/configuratorParts";
import { ConfiguratorShell } from "../components/configurator/ConfiguratorShell";

export function ConfiguratorPage() {
  const { type } = useParams<{ type: string }>();

  const configType = configTypes.find((c) => c.id === type);

  if (!configType) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center text-center px-6">
        <p
          className="text-[#1A1A1A] mb-4"
          style={{ fontFamily: "Georgia, serif", fontSize: "2rem", fontWeight: 400 }}
        >
          Unknown Configurator Type
        </p>
        <p className="text-[#6B6560] mb-8" style={{ fontSize: "0.9rem" }}>
          The configurator type "{type}" does not exist.
        </p>
        <Link
          to="/design-your-own"
          className="flex items-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3.5 uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors"
          style={{ fontSize: "0.7rem" }}
        >
          <ArrowLeft size={13} /> Back to The Atelier
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Slim header for the configurator context */}
      <div className="bg-[#F5F0EB] border-b border-[#E8E4DF] py-3 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link
            to="/design-your-own"
            className="flex items-center gap-2 text-[#6B6560] hover:text-[#1A1A1A] transition-colors uppercase tracking-widest"
            style={{ fontSize: "0.65rem" }}
          >
            <ArrowLeft size={12} /> All Configurators
          </Link>

          <div className="text-center">
            <p className="uppercase tracking-[0.2em] text-[#1A1A1A]" style={{ fontSize: "0.65rem" }}>
              {configType.label}
            </p>
            <p className="text-[#9A9590]" style={{ fontSize: "0.62rem" }}>
              {configType.subtitle}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[#9A9590]" style={{ fontSize: "0.65rem" }}>
              Starting from{" "}
              <span className="text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif" }}>
                ${configType.startingFrom}
              </span>
            </p>
          </div>
        </div>
      </div>

      <ConfiguratorShell configType={configType} />
    </div>
  );
}
