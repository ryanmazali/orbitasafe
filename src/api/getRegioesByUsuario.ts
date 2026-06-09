import type { Regiao } from "../types";

export async function getRegioesByUsuario(idUsu: number): Promise<Regiao[]> {
    try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${idUsu}/regioes`);
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
