import type { Alerta } from "../types";

export async function postAnalisarRegiao(idReg: number): Promise<Alerta> {
    try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/regioes/${idReg}/analisar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
