import type { Alerta, ErroApi } from "../types";

export async function postAnalisarRegiao(idReg: number): Promise<Alerta> {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/regioes/${idReg}/analisar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    const data: Alerta | ErroApi = await resp.json();
    if (!resp.ok) throw new Error((data as ErroApi).erro ?? "Erro ao analisar região");
    return data as Alerta;
}
