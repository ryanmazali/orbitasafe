export async function putMarcarNotificacaoLida(idNotif: number): Promise<void> {
    try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/notificacoes/${idNotif}/marcar-lida`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        });
        if (!resp.ok) {
            const body = await resp.json().catch(() => null);
            throw new Error(body?.erro ?? resp.statusText);
        }
    } catch (err) {
        if (err instanceof TypeError) {
            throw new Error("Servidor iniciando, aguarde alguns segundos e tente novamente.");
        }
        throw err;
    }
}
