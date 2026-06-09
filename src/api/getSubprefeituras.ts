import type { Subprefeitura } from "../types";

export async function getSubprefeituras(): Promise<Subprefeitura[]> {
    try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/subprefeituras`);
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
