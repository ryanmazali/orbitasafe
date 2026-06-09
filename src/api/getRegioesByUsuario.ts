import type { Regiao, ErroApi } from "../types";

export async function getRegioesByUsuario(idUsu: number): Promise<Regiao[]> {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${idUsu}/regioes`);
    const data: Regiao[] | ErroApi = await resp.json();
    if (!resp.ok) throw new Error((data as ErroApi).erro ?? "Erro ao buscar regiões");
    return data as Regiao[];
}
