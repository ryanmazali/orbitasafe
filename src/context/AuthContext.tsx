import { createContext, useContext, useState } from "react";
import type { UsuarioResposta } from "../types";

const STORAGE_KEY = "orbitasafe_usuario";

interface AuthContextType {
    usuario: UsuarioResposta | null;
    autenticado: boolean;
    login: (usuario: UsuarioResposta) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [usuario, setUsuario] = useState<UsuarioResposta | null>(() => {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        return stored ? (JSON.parse(stored) as UsuarioResposta) : null;
    });

    function login(u: UsuarioResposta) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        setUsuario(u);
    }

    function logout() {
        sessionStorage.removeItem(STORAGE_KEY);
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{ usuario, autenticado: !!usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
    return ctx;
}
