import { NavLink } from "react-router";

export const Footer = () => {
    return (
        <footer className="bg-[var(--interface-dark)] border-t border-[var(--interface-border)] flex-shrink-0 px-5 py-6">
        <div className="max-w-[1300px] mx-auto flex flex-col items-center gap-4 tablet:flex-row tablet:justify-between">
            <p className="text-sm text-[var(--text-light)] text-center tablet:text-left">
            © 2026{" "}
            <span className="text-[var(--brand-primary)] font-semibold">
                Orbit Analytics
            </span>{" "}
            — Todos os direitos reservados
            </p>
            <nav className="flex gap-5">
            {[
                { to: "/", label: "Início" },
                { to: "/sobre", label: "Sobre" },
                { to: "/integrantes", label: "Equipe" },
                { to: "/faq", label: "FAQ" },
            ].map((item) => (
                <NavLink
                key={item.to}
                to={item.to}
                className="text-sm text-[var(--text-light)] no-underline transition-colors duration-200 hover:text-[var(--brand-primary)]"
                >
                {item.label}
                </NavLink>
            ))}
            </nav>
        </div>
        </footer>
    );
};