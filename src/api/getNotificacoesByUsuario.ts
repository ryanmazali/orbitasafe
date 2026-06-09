import type { Notificacao } from "../types";

export async function getNotificacoesByUsuario(idUsu: number): Promise<Notificacao[]> {
    try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${idUsu}/notificacoes`);
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

export async function getNotificacoesNaoLidas(idUsu: number): Promise<Notificacao[]> {
    try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${idUsu}/notificacoes/nao-lidas`);
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
