import type { CriarRegiaoPayload, Regiao } from "../types";

type PostRegiaoInput = Omit<CriarRegiaoPayload, "idReg">;

export async function postRegiao(payload: PostRegiaoInput): Promise<Regiao> {
    try {
        const idReg = Math.floor(100000 + Math.random() * 900000);
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/regioes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...payload, idReg }),
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
