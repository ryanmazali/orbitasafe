import type { Alerta, ErroApi } from "../types";

export async function getAlertasByRegiao(idReg: number): Promise<Alerta[]> {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/regioes/${idReg}/alertas`);
    const data: Alerta[] | ErroApi = await resp.json();
    if (!resp.ok) throw new Error((data as ErroApi).erro ?? "Erro ao buscar alertas");
    return data as Alerta[];
}
