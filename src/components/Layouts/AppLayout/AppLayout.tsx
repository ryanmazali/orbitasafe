import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { LayoutDashboard, MapPin, Bell, LogOut, PlusCircle } from "lucide-react";
import { Logo } from "../../Logo/Logo";
import { useAuth } from "../../../context/AuthContext";
import { getNotificacoesNaoLidas } from "../../../api/getNotificacoesByUsuario";

const sideLinks = [
    { to: "/app", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/app/regioes/nova", label: "Nova Região", icon: <PlusCircle size={20} /> },
    { to: "/app/alertas", label: "Alertas", icon: <Bell size={20} /> },
];

export const AppLayout = () => {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();
    const [badgeCount, setBadgeCount] = useState(0);

    useEffect(() => {
        if (!usuario) return;
        getNotificacoesNaoLidas(usuario.idUsu)
            .then((lista) => setBadgeCount(lista.length))
            .catch(() => setBadgeCount(0));
    }, [usuario]);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div
            className="min-h-screen flex flex-col desktop:flex-row"
            style={{ background: "var(--interface-darkest)" }}
        >
            {/* Sidebar — desktop */}
            <aside
                className="hidden desktop:flex flex-col w-64 shrink-0 border-r"
                style={{
                    background: "var(--interface-dark)",
                    borderColor: "var(--interface-border)",
                    minHeight: "100vh",
                }}
            >
                <div className="px-6 py-5 border-b" style={{ borderColor: "var(--interface-border)" }}>
                    <Logo />
                </div>

                {usuario && (
                    <div className="px-6 py-4 border-b" style={{ borderColor: "var(--interface-border)" }}>
                        <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text-light)" }}>
                            Olá,
                        </p>
                        <p className="text-sm font-semibold truncate" style={{ color: "var(--text-darkest)" }}>
                            {usuario.nmUsu}
                        </p>
                    </div>
                )}

                <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
                    {sideLinks.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === "/app"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium no-underline transition-all duration-200 ${
                                    isActive
                                        ? "text-[var(--brand-primary)] bg-[var(--brand-primary-light)]"
                                        : "text-[var(--text-base)] hover:bg-[var(--interface-base)] hover:text-[var(--text-darkest)]"
                                }`
                            }
                        >
                            {item.label === "Alertas" ? (
                                <span className="relative">
                                    {item.icon}
                                    {badgeCount > 0 && (
                                        <span
                                            className="absolute -top-1.5 -right-1.5 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                                            style={{
                                                background: "var(--interface-error)",
                                                color: "#fff",
                                            }}
                                        >
                                            {badgeCount > 9 ? "9+" : badgeCount}
                                        </span>
                                    )}
                                </span>
                            ) : (
                                item.icon
                            )}
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="px-3 py-4 border-t" style={{ borderColor: "var(--interface-border)" }}>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium w-full transition-all duration-200 cursor-pointer border-0"
                        style={{ color: "var(--interface-error)", background: "transparent" }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "hsla(0,72%,55%,0.1)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        }}
                    >
                        <LogOut size={20} />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Conteúdo principal */}
            <main className="flex-1 pb-20 desktop:pb-0 overflow-x-hidden">
                <Outlet />
            </main>

            {/* Bottom nav — mobile/tablet */}
            <nav
                className="desktop:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t"
                style={{
                    background: "var(--interface-dark)",
                    borderColor: "var(--interface-border)",
                    height: "64px",
                }}
            >
                <NavLink
                    to="/app"
                    end
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 px-4 py-2 no-underline text-xs font-medium transition-colors duration-200 ${
                            isActive ? "text-[var(--brand-primary)]" : "text-[var(--text-base)]"
                        }`
                    }
                >
                    <LayoutDashboard size={22} />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/app/regioes/nova"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 px-4 py-2 no-underline text-xs font-medium transition-colors duration-200 ${
                            isActive ? "text-[var(--brand-primary)]" : "text-[var(--text-base)]"
                        }`
                    }
                >
                    <PlusCircle size={22} />
                    Nova
                </NavLink>

                <NavLink
                    to="/app/alertas"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 px-4 py-2 no-underline text-xs font-medium transition-colors duration-200 relative ${
                            isActive ? "text-[var(--brand-primary)]" : "text-[var(--text-base)]"
                        }`
                    }
                >
                    <span className="relative">
                        <Bell size={22} />
                        {badgeCount > 0 && (
                            <span
                                className="absolute -top-1.5 -right-1.5 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                                style={{ background: "var(--interface-error)", color: "#fff" }}
                            >
                                {badgeCount > 9 ? "9+" : badgeCount}
                            </span>
                        )}
                    </span>
                    Alertas
                </NavLink>

                <button
                    onClick={handleLogout}
                    className="flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium border-0 cursor-pointer transition-colors duration-200"
                    style={{ background: "transparent", color: "var(--interface-error)" }}
                >
                    <LogOut size={22} />
                    Sair
                </button>
            </nav>
        </div>
    );
};
