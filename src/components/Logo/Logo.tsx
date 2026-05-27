import { NavLink } from "react-router";
import { ShieldCheck } from "lucide-react";
import "./Logo.css";

export const Logo = () => {
    return (
        <NavLink to="/" className="logo">
        <ShieldCheck className="logo-icon" />
        <span>Orbita<span className="logo-safe">Safe</span></span>
        </NavLink>
    );
};