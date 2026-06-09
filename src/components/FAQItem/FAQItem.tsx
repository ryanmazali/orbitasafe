import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
    pergunta: string;
    resposta: string;
}

export const FAQItem = ({ pergunta, resposta }: FAQItemProps) => {
    const [aberto, setAberto] = useState(false);

    return (
        <div
        className="mb-3 rounded-xl border overflow-hidden transition-all duration-300"
        style={{
            background: "var(--interface-dark)",
            borderColor: aberto ? "var(--brand-primary)" : "var(--interface-border)",
        }}
        >
        <button
            onClick={() => setAberto(!aberto)}
            className="w-full flex justify-between items-center px-5 py-4 border-none text-left cursor-pointer transition-colors duration-200"
            style={{
            background: aberto ? "var(--brand-primary-light)" : "transparent",
            color: aberto ? "var(--brand-primary)" : "var(--text-dark)",
            }}
        >
            <span className="text-sm font-semibold pr-4 mobile:text-base">
            {pergunta}
            </span>
            {aberto
            ? <ChevronUp size={18} style={{ flexShrink: 0, color: "var(--brand-primary)" }} />
            : <ChevronDown size={18} style={{ flexShrink: 0, color: "var(--text-light)" }} />
            }
        </button>

        <div
            style={{
            maxHeight: aberto ? "300px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.35s ease",
            }}
        >
            <p
            className="px-5 py-4 text-sm leading-relaxed border-t"
            style={{
                color: "var(--text-base)",
                borderColor: "var(--interface-border)",
            }}
            >
            {resposta}
            </p>
        </div>
        </div>
    );
};