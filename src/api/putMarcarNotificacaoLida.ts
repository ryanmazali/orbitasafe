import type { ErroApi } from "../types";

export async function putMarcarNotificacaoLida(idNotif: number): Promise<void> {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/notificacoes/${idNotif}/marcar-lida`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
        const data: ErroApi = await resp.json();
        throw new Error(data.erro ?? "Erro ao marcar notificação como lida");
    }
}
