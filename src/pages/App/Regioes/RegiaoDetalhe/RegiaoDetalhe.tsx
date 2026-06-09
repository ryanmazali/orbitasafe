import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";
import { getAlertasByRegiao } from "../../../../api/getAlertasByRegiao";
import { postAnalisarRegiao } from "../../../../api/postAnalisarRegiao";
import { Badge } from "../../../../components";
import type { Alerta, NivelAlerta } from "../../../../types";

function nivelVariant(nivel: NivelAlerta): "success" | "warning" | "error" {
    if (nivel === "BAIXO") return "success";
    if (nivel === "MEDIO") return "warning";
    return "error";
}

function RegiaoDetalhe() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const idReg = Number(id);
    const [alertas, setAlertas] = useState<Alerta[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const [atualizando, setAtualizando] = useState(false);

    useEffect(() => {
        document.title = "Detalhes da Região | OrbitaSafe";
    }, []);

    async function carregarAlertas() {
        setLoading(true);
        setErro("");
        try {
            const lista = await getAlertasByRegiao(idReg);
            setAlertas(lista.sort((a, b) => b.dtAlerta.localeCompare(a.dtAlerta)));
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro ao carregar alertas");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!isNaN(idReg)) carregarAlertas();
    }, [idReg]);

    async function handleAtualizar() {
        setAtualizando(true);
        try {
            await postAnalisarRegiao(idReg);
            await carregarAlertas();
        } catch (err) {
            alert(err instanceof Error ? err.message : "Erro ao atualizar análise");
        } finally {
            setAtualizando(false);
        }
    }

    const ultimoAlerta = alertas[0] ?? null;

    return (
        <div className="w-[90%] max-w-[800px] mx-auto py-8">
            {/* Cabeçalho */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => navigate("/app")}
                    className="p-2 rounded-full border cursor-pointer transition-all duration-200 hover:opacity-75"
                    style={{
                        background: "transparent",
                        borderColor: "var(--interface-border)",
                        color: "var(--text-base)",
                    }}
                >
                    <ArrowLeft size={18} />
                </button>
                <div className="flex-1">
                    <h1
                        className="text-xl font-black"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
                    >
                        Histórico de Alertas
                    </h1>
                    <p className="text-sm" style={{ color: "var(--text-base)" }}>
                        Região #{idReg}
                    </p>
                </div>
                <button
                    onClick={handleAtualizar}
                    disabled={atualizando || loading}
                    className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full border transition-all duration-200 cursor-pointer disabled:opacity-50"
                    style={{
                        color: "var(--brand-primary)",
                        borderColor: "var(--brand-primary)",
                        background: "var(--brand-primary-light)",
                    }}
                >
                    <RefreshCw size={15} className={atualizando ? "animate-spin" : ""} />
                    {atualizando ? "Analisando..." : "Atualizar análise"}
                </button>
            </div>

            {/* Último alerta — destaque */}
            {ultimoAlerta && !loading && (
                <div
                    className="p-6 rounded-2xl border mb-6"
                    style={{
                        background: "var(--interface-dark)",
                        borderColor: "var(--interface-border)",
                    }}
                >
                    <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                        <span
                            className="text-xs font-semibold uppercase tracking-wider"
                            style={{ color: "var(--text-light)" }}
                        >
                            Análise mais recente
                        </span>
                        <Badge variant={nivelVariant(ultimoAlerta.nivelAlerta)}>
                            {ultimoAlerta.nivelAlerta === "BAIXO" && "Risco Baixo"}
                            {ultimoAlerta.nivelAlerta === "MEDIO" && "Risco Médio"}
                            {ultimoAlerta.nivelAlerta === "ALTO" && "Risco Alto"}
                        </Badge>
                    </div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-dark)" }}>
                        {ultimoAlerta.tpEvento}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-base)" }}>
                        {ultimoAlerta.dsAlerta}
                    </p>
                    <p className="text-xs mt-3" style={{ color: "var(--text-light)" }}>
                        {new Date(ultimoAlerta.dtAlerta + "T00:00:00").toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center py-16">
                    <div
                        className="w-10 h-10 rounded-full border-2 animate-spin"
                        style={{ borderColor: "var(--brand-primary)", borderTopColor: "transparent" }}
                    />
                </div>
            )}

            {/* Erro */}
            {!loading && erro && (
                <div
                    className="p-4 rounded-xl border text-sm flex items-center gap-2"
                    style={{
                        color: "var(--interface-error)",
                        background: "hsla(0,72%,55%,0.08)",
                        borderColor: "hsla(0,72%,55%,0.2)",
                    }}
                >
                    <AlertTriangle size={16} />
                    {erro}
                </div>
            )}

            {/* Histórico completo */}
            {!loading && !erro && alertas.length > 0 && (
                <div>
                    <h2
                        className="text-sm font-semibold mb-4"
                        style={{ color: "var(--text-light)", fontFamily: "var(--font-display)" }}
                    >
                        Histórico completo ({alertas.length})
                    </h2>
                    <div className="flex flex-col gap-3">
                        {alertas.map((alerta, idx) => (
                            <div
                                key={alerta.idAlerta}
                                className="p-5 rounded-xl border flex flex-col gap-2 transition-all duration-200"
                                style={{
                                    background: idx === 0 ? "var(--interface-base)" : "var(--interface-dark)",
                                    borderColor: "var(--interface-border)",
                                    opacity: idx === 0 ? 1 : 0.85,
                                }}
                            >
                                <div className="flex items-center justify-between gap-3 flex-wrap">
                                    <span className="text-sm font-semibold" style={{ color: "var(--text-dark)" }}>
                                        {alerta.tpEvento}
                                    </span>
                                    <Badge variant={nivelVariant(alerta.nivelAlerta)} size="small">
                                        {alerta.nivelAlerta}
                                    </Badge>
                                </div>
                                <p className="text-sm leading-relaxed" style={{ color: "var(--text-base)" }}>
                                    {alerta.dsAlerta}
                                </p>
                                <p className="text-xs" style={{ color: "var(--text-light)" }}>
                                    {new Date(alerta.dtAlerta + "T00:00:00").toLocaleDateString("pt-BR")}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Estado vazio */}
            {!loading && !erro && alertas.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                    <AlertTriangle size={40} style={{ color: "var(--text-light)" }} />
                    <p className="text-sm" style={{ color: "var(--text-base)" }}>
                        Nenhum alerta encontrado para esta região.
                    </p>
                    <button
                        onClick={handleAtualizar}
                        disabled={atualizando}
                        className="text-sm font-semibold px-5 py-2.5 rounded-full border transition-all duration-200 cursor-pointer disabled:opacity-50"
                        style={{
                            color: "var(--brand-primary)",
                            borderColor: "var(--brand-primary)",
                            background: "var(--brand-primary-light)",
                        }}
                    >
                        Disparar primeira análise
                    </button>
                </div>
            )}
        </div>
    );
}

export default RegiaoDetalhe;
