import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "../Logo/Logo";

const navLinks = [
    { to: "/", label: "Início" },
    { to: "/sobre", label: "Sobre" },
    { to: "/integrantes", label: "Equipe" },
    { to: "/faq", label: "FAQ" },
];

export const Navbar = () => {
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <header className="w-full bg-[var(--interface-dark)] border-b border-[var(--interface-border)] relative z-50">
        <div className="flex items-center justify-between px-5 py-4 max-w-[1300px] mx-auto">

            <Logo />

            {/* Links — desktop */}
            <nav className="hidden desktop:flex items-center gap-8">
            {navLinks.map((item) => (
                <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                    relative text-sm font-medium no-underline transition-colors duration-300
                    ${isActive ? "text-[var(--brand-primary)]" : "text-[var(--text-base)] hover:text-[var(--text-darkest)]"}
                    after:content-[''] after:absolute after:bottom-[-3px] after:left-0
                    after:h-[2px] after:bg-[var(--brand-primary)]
                    after:transition-[width] after:duration-300
                    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
                `}
                >
                {item.label}
                </NavLink>
            ))}
            </nav>

            {/* Botões CTA — desktop */}
            <div className="hidden desktop:flex items-center gap-3">
            <Link
                to="/login"
                className="text-sm font-semibold no-underline px-5 py-2 rounded-full border border-[var(--brand-primary)] text-[var(--brand-primary)] bg-transparent transition-all duration-300 hover:bg-[var(--brand-primary-light)]"
            >
                Entrar
            </Link>
            <Link
                to="/cadastro"
                className="text-sm font-bold no-underline px-5 py-2 rounded-full bg-[var(--brand-primary)] text-[var(--interface-darkest)] transition-all duration-300 hover:opacity-90"
            >
                Cadastre-se
            </Link>
            </div>

            {/* Botão hambúrguer — mobile/tablet */}
            <button
            className="desktop:hidden bg-transparent border-none text-[var(--text-darkest)] cursor-pointer z-[1001] p-1"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={menuAberto ? "Fechar Menu" : "Abrir Menu"}
            aria-expanded={menuAberto}
            >
            {menuAberto ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>

        {/* Overlay com fade */}
        <div
            onClick={() => setMenuAberto(false)}
            style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
            opacity: menuAberto ? 1 : 0,
            pointerEvents: menuAberto ? "auto" : "none",
            transition: "opacity 0.4s ease",
            }}
        />

        {/* Menu lateral — slide com style inline para garantir a transição */}
        <nav
            style={{
            position: "fixed",
            top: 0,
            right: 0,
            height: "100%",
            width: "280px",
            zIndex: 1000,
            background: "var(--interface-dark)",
            borderLeft: "1px solid var(--interface-border)",
            boxShadow: "-4px 0 30px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            transform: menuAberto ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className="desktop:hidden"
        >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--interface-border)]">
            <Logo />
            <button
                className="bg-transparent border-none text-[var(--text-darkest)] cursor-pointer"
                onClick={() => setMenuAberto(false)}
                aria-label="Fechar Menu"
            >
                <X size={24} />
            </button>
            </div>

            {/* Links */}
            <ul className="flex flex-col gap-1 pt-4 px-4 pb-4 list-none flex-1">
            {navLinks.map((item, index) => (
                <li
                key={item.to}
                style={{
                    transition: `opacity 0.3s ease, transform 0.3s ease`,
                    transitionDelay: menuAberto ? `${index * 60 + 100}ms` : "0ms",
                    opacity: menuAberto ? 1 : 0,
                    transform: menuAberto ? "translateX(0)" : "translateX(20px)",
                }}
                >
                <NavLink
                    to={item.to}
                    onClick={() => setMenuAberto(false)}
                    className={({ isActive }) => `
                    block px-4 py-3 rounded-lg no-underline text-sm font-medium
                    transition-colors duration-200
                    ${isActive
                        ? "bg-[var(--brand-primary-light)] text-[var(--brand-primary)]"
                        : "text-[var(--text-dark)] hover:bg-[var(--interface-base)] hover:text-[var(--text-darkest)]"
                    }
                    `}
                >
                    {item.label}
                </NavLink>
                </li>
            ))}
            </ul>

            {/* Botões rodapé */}
            <div
            className="px-4 pb-8 pt-2 border-t border-[var(--interface-border)] flex flex-col gap-3"
            style={{
                transition: "opacity 0.3s ease, transform 0.3s ease",
                transitionDelay: menuAberto ? "340ms" : "0ms",
                opacity: menuAberto ? 1 : 0,
                transform: menuAberto ? "translateY(0)" : "translateY(10px)",
            }}
            >
            <Link
                to="/login"
                onClick={() => setMenuAberto(false)}
                className="block w-full text-center no-underline border border-[var(--brand-primary)] text-[var(--brand-primary)] px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-[var(--brand-primary-light)]"
            >
                Entrar
            </Link>
            <Link
                to="/cadastro"
                onClick={() => setMenuAberto(false)}
                className="block w-full text-center no-underline bg-[var(--brand-primary)] text-[var(--interface-darkest)] px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:opacity-90"
            >
                Cadastre-se
            </Link>
            </div>
        </nav>
        </header>
    );
};