import type { CriarRegiaoPayload, Regiao, ErroApi } from "../types";

export async function postRegiao(payload: CriarRegiaoPayload): Promise<Regiao> {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/regioes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    const data: Regiao | ErroApi = await resp.json();
    if (!resp.ok) throw new Error((data as ErroApi).erro ?? "Erro ao criar região");
    return data as Regiao;
}
