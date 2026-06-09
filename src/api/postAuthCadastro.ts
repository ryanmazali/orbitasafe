import type { CadastroPayload, UsuarioResposta, ErroApi } from "../types";

export async function postAuthCadastro(payload: CadastroPayload): Promise<UsuarioResposta> {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    const data: UsuarioResposta | ErroApi = await resp.json();
    if (!resp.ok) throw new Error((data as ErroApi).erro ?? "Erro ao cadastrar");
    return data as UsuarioResposta;
}
