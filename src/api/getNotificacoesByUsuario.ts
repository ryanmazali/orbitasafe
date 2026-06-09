import type { Notificacao, ErroApi } from "../types";

export async function getNotificacoesByUsuario(idUsu: number): Promise<Notificacao[]> {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${idUsu}/notificacoes`);
    const data: Notificacao[] | ErroApi = await resp.json();
    if (!resp.ok) throw new Error((data as ErroApi).erro ?? "Erro ao buscar notificações");
    return data as Notificacao[];
}

export async function getNotificacoesNaoLidas(idUsu: number): Promise<Notificacao[]> {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${idUsu}/notificacoes/nao-lidas`);
    const data: Notificacao[] | ErroApi = await resp.json();
    if (!resp.ok) throw new Error((data as ErroApi).erro ?? "Erro ao buscar notificações não lidas");
    return data as Notificacao[];
}
