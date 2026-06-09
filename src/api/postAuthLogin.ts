import type { LoginPayload, UsuarioResposta, ErroApi } from "../types";

export async function postAuthLogin(payload: LoginPayload): Promise<UsuarioResposta> {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    const data: UsuarioResposta | ErroApi = await resp.json();
    if (!resp.ok) throw new Error((data as ErroApi).erro ?? "Erro ao fazer login");
    return data as UsuarioResposta;
}
