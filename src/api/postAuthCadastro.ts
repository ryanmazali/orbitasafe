import type { CadastroPayload, UsuarioResposta } from "../types";

export async function postAuthCadastro(payload: CadastroPayload): Promise<UsuarioResposta> {
    try {
        const idUsu = Math.floor(10000 + Math.random() * 89999);
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/cadastro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...payload, idUsu }),
        });
        if (!resp.ok) {
            const body = await resp.json().catch(() => null);
            throw new Error(body?.erro ?? resp.statusText);
        }
        return resp.json();
    } catch (err) {
        if (err instanceof TypeError) {
            throw new Error("Servidor iniciando, aguarde alguns segundos e tente novamente.");
        }
        throw err;
    }
}
