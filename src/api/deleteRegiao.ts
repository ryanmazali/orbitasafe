import type { ErroApi } from "../types";

export async function deleteRegiao(idReg: number): Promise<void> {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/regioes/${idReg}`, {
        method: "DELETE",
    });
    if (!resp.ok) {
        const data: ErroApi = await resp.json();
        throw new Error(data.erro ?? "Erro ao deletar região");
    }
}
