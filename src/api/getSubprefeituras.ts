import type { Subprefeitura, ErroApi } from "../types";

export async function getSubprefeituras(): Promise<Subprefeitura[]> {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/subprefeituras`);
    const data: Subprefeitura[] | ErroApi = await resp.json();
    if (!resp.ok) throw new Error((data as ErroApi).erro ?? "Erro ao buscar subprefeituras");
    return data as Subprefeitura[];
}
