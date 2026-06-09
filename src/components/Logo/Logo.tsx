import { NavLink } from "react-router";
import { ShieldCheck } from "lucide-react";

export const Logo = () => {
    return (
        <NavLink to="/" className="flex items-center gap-2 no-underline">
        <ShieldCheck size={32} className="text-[var(--brand-primary)]" />
        <span
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
        >
            Orbita<span className="text-[var(--brand-primary)]">Safe</span>
        </span>
        </NavLink>
    );
};