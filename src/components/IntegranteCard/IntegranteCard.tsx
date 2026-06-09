import { FaGithub, FaLinkedin } from "react-icons/fa";
import { UserRound } from "lucide-react";
import type { Integrante } from "../../pages/Integrantes/IntegrantesData";

interface IntegranteCardProps {
    integrante: Integrante;
}

export const IntegranteCard = ({ integrante }: IntegranteCardProps) => {
    return (
        <div
        className="flex flex-col items-center text-center p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1"
        style={{ background: "var(--interface-dark)", borderColor: "var(--interface-border)" }}
        >
        {/* Foto ou placeholder */}
        {integrante.foto ? (
            <img
            src={integrante.foto}
            alt={`Foto de ${integrante.nome}`}
            className="w-[140px] h-[140px] rounded-full object-cover mb-5 border-2"
            style={{ borderColor: "var(--brand-primary)" }}
            />
        ) : (
            <div
            className="w-[140px] h-[140px] rounded-full flex items-center justify-center mb-5 border-2"
            style={{ background: "var(--interface-base)", borderColor: "var(--interface-border)" }}
            >
            <UserRound size={56} style={{ color: "var(--text-light)" }} />
            </div>
        )}

        {/* Nome */}
        <h2 className="text-base font-bold mb-1" style={{ color: "var(--text-darkest)" }}>
            {integrante.nome}
        </h2>

        {/* RM e Turma */}
        {integrante.rm && (
            <p className="text-xs mb-0.5" style={{ color: "var(--text-light)" }}>
            RM: {integrante.rm}
            </p>
        )}
        <p className="text-xs mb-3" style={{ color: "var(--text-light)" }}>
            Turma: {integrante.turma}
        </p>

        {/* Descrição */}
        <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--text-base)" }}>
            {integrante.descricao}
        </p>

        {/* Links sociais */}
        <div className="flex items-center gap-4 mt-auto">
            {integrante.github ? (
            <a
                href={integrante.github}
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-200 hover:scale-110"
                aria-label={`GitHub de ${integrante.nome}`}
            >
                <FaGithub size={28} style={{ color: "var(--text-dark)" }} />
            </a>
            ) : (
            <FaGithub size={28} style={{ color: "var(--text-light)", opacity: 0.3 }} />
            )}

            {integrante.linkedin ? (
            <a
                href={integrante.linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-200 hover:scale-110"
                aria-label={`LinkedIn de ${integrante.nome}`}
            >
                <FaLinkedin size={28} style={{ color: "#0a66c2" }} />
            </a>
            ) : (
            <FaLinkedin size={28} style={{ color: "var(--text-light)", opacity: 0.3 }} />
            )}
        </div>
        </div>
    );
};