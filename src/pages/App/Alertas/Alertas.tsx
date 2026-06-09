import { useEffect, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { getNotificacoesByUsuario } from "../../../api/getNotificacoesByUsuario";
import { putMarcarNotificacaoLida } from "../../../api/putMarcarNotificacaoLida";
import { Badge } from "../../../components";
import type { Notificacao } from "../../../types";

function Alertas() {
    const { usuario } = useAuth();
    const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const [marcando, setMarcando] = useState<number | null>(null);

    useEffect(() => {
        document.title = "Alertas | OrbitaSafe";
    }, []);

    useEffect(() => {
        if (!usuario) return;
        setLoading(true);
        getNotificacoesByUsuario(usuario.idUsu)
            .then(setNotificacoes)
            .catch((err) => setErro(err instanceof Error ? err.message : "Erro ao carregar notificações"))
            .finally(() => setLoading(false));
    }, [usuario]);

    async function handleMarcarLida(notif: Notificacao) {
        if (notif.estadoNotif === "LIDA") return;
        setMarcando(notif.idNotif);
        try {
            await putMarcarNotificacaoLida(notif.idNotif);
            setNotificacoes((prev) =>
                prev.map((n) => n.idNotif === notif.idNotif ? { ...n, estadoNotif: "LIDA" } : n)
            );
        } catch (err) {
            alert(err instanceof Error ? err.message : "Erro ao marcar notificação");
        } finally {
            setMarcando(null);
        }
    }

    const naoLidas = notificacoes.filter((n) => n.estadoNotif === "NAO_LIDA");
    const lidas = notificacoes.filter((n) => n.estadoNotif === "LIDA");

    return (
        <div className="w-[90%] max-w-[800px] mx-auto py-8">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
                <div>
                    <h1
                        className="text-2xl font-black mb-1"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
                    >
                        Alertas
                    </h1>
                    <p className="text-sm" style={{ color: "var(--text-base)" }}>
                        Suas notificações de risco climático
                    </p>
                </div>
                {naoLidas.length > 0 && (
                    <Badge variant="error" size="small">
                        {naoLidas.length} não {naoLidas.length === 1 ? "lida" : "lidas"}
                    </Badge>
                )}
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center py-24">
                    <div
                        className="w-10 h-10 rounded-full border-2 animate-spin"
                        style={{ borderColor: "var(--brand-primary)", borderTopColor: "transparent" }}
                    />
                </div>
            )}

            {/* Erro */}
            {!loading && erro && (
                <div
                    className="p-4 rounded-xl border text-sm"
                    style={{
                        color: "var(--interface-error)",
                        background: "hsla(0,72%,55%,0.08)",
                        borderColor: "hsla(0,72%,55%,0.2)",
                    }}
                >
                    {erro}
                </div>
            )}

            {/* Estado vazio */}
            {!loading && !erro && notificacoes.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                    <Bell size={48} style={{ color: "var(--text-light)" }} />
                    <h2
                        className="text-lg font-bold"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
                    >
                        Nenhuma notificação
                    </h2>
                    <p className="text-sm max-w-[320px]" style={{ color: "var(--text-base)" }}>
                        Você receberá alertas aqui quando houver risco MÉDIO ou ALTO em suas regiões.
                    </p>
                </div>
            )}

            {/* Não lidas */}
            {!loading && !erro && naoLidas.length > 0 && (
                <section className="mb-8">
                    <h2
                        className="text-xs font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "var(--text-light)", fontFamily: "var(--font-display)" }}
                    >
                        Não lidas
                    </h2>
                    <div className="flex flex-col gap-3">
                        {naoLidas.map((notif) => (
                            <button
                                key={notif.idNotif}
                                onClick={() => handleMarcarLida(notif)}
                                disabled={marcando === notif.idNotif}
                                className="w-full text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer disabled:opacity-60"
                                style={{
                                    background: "var(--interface-dark)",
                                    borderColor: "var(--brand-primary)",
                                    borderWidth: "1px",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.background = "var(--interface-base)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.background = "var(--interface-dark)";
                                }}
                            >
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <div
                                        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                                        style={{ background: "var(--brand-primary)" }}
                                    />
                                    <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--text-darkest)" }}>
                                        {notif.dsNotif}
                                    </p>
                                    <span
                                        className="text-xs font-semibold shrink-0 flex items-center gap-1"
                                        style={{ color: "var(--text-light)" }}
                                    >
                                        {marcando === notif.idNotif ? (
                                            "Marcando..."
                                        ) : (
                                            <>
                                                <CheckCheck size={13} />
                                                Marcar lida
                                            </>
                                        )}
                                    </span>
                                </div>
                                <p className="text-xs ml-5" style={{ color: "var(--text-light)" }}>
                                    {new Date(notif.dtNotif + "T00:00:00").toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Lidas */}
            {!loading && !erro && lidas.length > 0 && (
                <section>
                    <h2
                        className="text-xs font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "var(--text-light)", fontFamily: "var(--font-display)" }}
                    >
                        Lidas
                    </h2>
                    <div className="flex flex-col gap-3">
                        {lidas.map((notif) => (
                            <div
                                key={notif.idNotif}
                                className="p-5 rounded-xl border"
                                style={{
                                    background: "var(--interface-dark)",
                                    borderColor: "var(--interface-border)",
                                    opacity: 0.65,
                                }}
                            >
                                <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--text-base)" }}>
                                    {notif.dsNotif}
                                </p>
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-xs" style={{ color: "var(--text-light)" }}>
                                        {new Date(notif.dtNotif + "T00:00:00").toLocaleDateString("pt-BR", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                    <Badge variant="default" size="small">Lida</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default Alertas;
