import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { PlusCircle, RefreshCw, ChevronRight, MapPin, Trash2 } from "lucide-react";
import earthSateliteBg from "../../../assets/earth-satelite.jpg";
import { useAuth } from "../../../context/AuthContext";
import { getRegioesByUsuario } from "../../../api/getRegioesByUsuario";
import { getAlertasByRegiao } from "../../../api/getAlertasByRegiao";
import { postAnalisarRegiao } from "../../../api/postAnalisarRegiao";
import { deleteRegiao } from "../../../api/deleteRegiao";
import { Badge } from "../../../components";
import type { Regiao, Alerta, NivelAlerta } from "../../../types";

type RegiaoComAlerta = Regiao & { ultimoAlerta: Alerta | null };

function nivelParaVariant(nivel: NivelAlerta | undefined): "success" | "warning" | "error" | "default" {
    if (nivel === "BAIXO") return "success";
    if (nivel === "MEDIO") return "warning";
    if (nivel === "ALTO") return "error";
    return "default";
}

function nivelLabel(nivel: NivelAlerta | undefined): string {
    if (nivel === "BAIXO") return "Risco Baixo";
    if (nivel === "MEDIO") return "Risco Médio";
    if (nivel === "ALTO") return "Risco Alto";
    return "Sem análise";
}

function Dashboard() {
    const { usuario } = useAuth();
    const navigate = useNavigate();
    const [regioes, setRegioes] = useState<RegiaoComAlerta[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const [atualizando, setAtualizando] = useState<number | null>(null);
    const [deletando, setDeletando] = useState<number | null>(null);

    useEffect(() => {
        document.title = "Dashboard | OrbitaSafe";
    }, []);

    async function carregarRegioes() {
        if (!usuario) return;
        setLoading(true);
        setErro("");
        try {
            const lista = await getRegioesByUsuario(usuario.idUsu);
            const comAlertas = await Promise.all(
                lista.map(async (reg) => {
                    try {
                        const alertas = await getAlertasByRegiao(reg.idReg);
                        const ultimo = alertas.length > 0
                            ? alertas.sort((a, b) => b.dtAlerta.localeCompare(a.dtAlerta))[0]
                            : null;
                        return { ...reg, ultimoAlerta: ultimo };
                    } catch {
                        return { ...reg, ultimoAlerta: null };
                    }
                })
            );
            setRegioes(comAlertas);
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro ao carregar regiões");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarRegioes();
    }, [usuario]);

    async function handleAtualizar(idReg: number) {
        setAtualizando(idReg);
        try {
            await postAnalisarRegiao(idReg);
            const alertas = await getAlertasByRegiao(idReg);
            const ultimo = alertas.length > 0
                ? alertas.sort((a, b) => b.dtAlerta.localeCompare(a.dtAlerta))[0]
                : null;
            setRegioes((prev) =>
                prev.map((r) => r.idReg === idReg ? { ...r, ultimoAlerta: ultimo } : r)
            );
        } catch (err) {
            alert(err instanceof Error ? err.message : "Erro ao atualizar análise");
        } finally {
            setAtualizando(null);
        }
    }

    async function handleDeletar(idReg: number) {
        if (!confirm("Remover esta região?")) return;
        setDeletando(idReg);
        try {
            await deleteRegiao(idReg);
            setRegioes((prev) => prev.filter((r) => r.idReg !== idReg));
        } catch (err) {
            alert(err instanceof Error ? err.message : "Erro ao remover região");
        } finally {
            setDeletando(null);
        }
    }

    return (
        <div
            style={{
                backgroundImage: `url(${earthSateliteBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, hsla(222, 47%, 6%, 0.93) 0%, hsla(222, 47%, 6%, 0.88) 50%, hsla(38, 92%, 50%, 0.05) 100%)",
                    zIndex: 0,
                }}
            />
        <div className="w-[90%] max-w-[1100px] mx-auto py-8" style={{ position: "relative", zIndex: 1 }}>
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
                <div>
                    <h1
                        className="text-2xl font-black mb-1"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
                    >
                        Dashboard
                    </h1>
                    <p className="text-sm" style={{ color: "var(--text-base)" }}>
                        Acompanhe o risco climático das suas regiões
                    </p>
                </div>
                <Link
                    to="/app/regioes/nova"
                    className="flex items-center gap-2 no-underline text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-90"
                    style={{ background: "var(--brand-primary)", color: "var(--interface-darkest)" }}
                >
                    <PlusCircle size={16} />
                    Nova Região
                </Link>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center py-24">
                    <div
                        className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
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
            {!loading && !erro && regioes.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                    <MapPin size={48} style={{ color: "var(--text-light)" }} />
                    <h2
                        className="text-lg font-bold"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
                    >
                        Nenhuma região cadastrada
                    </h2>
                    <p className="text-sm max-w-[320px]" style={{ color: "var(--text-base)" }}>
                        Adicione uma região para começar a monitorar o risco de alagamento em tempo real.
                    </p>
                    <Link
                        to="/app/regioes/nova"
                        className="flex items-center gap-2 no-underline text-sm font-bold px-6 py-3 rounded-full transition-all duration-200 hover:opacity-90 mt-2"
                        style={{ background: "var(--brand-primary)", color: "var(--interface-darkest)" }}
                    >
                        <PlusCircle size={16} />
                        Adicionar região
                    </Link>
                </div>
            )}

            {/* Grid de cards */}
            {!loading && !erro && regioes.length > 0 && (
                <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
                    {regioes.map((reg) => (
                        <div
                            key={reg.idReg}
                            className="p-6 rounded-2xl border flex flex-col gap-4 transition-all duration-200"
                            style={{
                                background: "var(--interface-dark)",
                                borderColor: "var(--interface-border)",
                            }}
                        >
                            {/* Topo do card */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className="text-base font-bold truncate mb-1"
                                        style={{ color: "var(--text-darkest)", fontFamily: "var(--font-display)" }}
                                    >
                                        {reg.nmReg}
                                    </h3>
                                    {reg.ultimoAlerta && (
                                        <p className="text-xs" style={{ color: "var(--text-light)" }}>
                                            {new Date(reg.ultimoAlerta.dtAlerta + "T00:00:00").toLocaleDateString("pt-BR")}
                                        </p>
                                    )}
                                </div>
                                <Badge variant={nivelParaVariant(reg.ultimoAlerta?.nivelAlerta)} size="small">
                                    {nivelLabel(reg.ultimoAlerta?.nivelAlerta)}
                                </Badge>
                            </div>

                            {/* Descrição do alerta */}
                            {reg.ultimoAlerta && (
                                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-base)" }}>
                                    {reg.ultimoAlerta.dsAlerta}
                                </p>
                            )}

                            {/* Ações */}
                            <div className="flex items-center gap-2 mt-auto flex-wrap">
                                <button
                                    onClick={() => handleAtualizar(reg.idReg)}
                                    disabled={atualizando === reg.idReg}
                                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border transition-all duration-200 cursor-pointer disabled:opacity-50"
                                    style={{
                                        color: "var(--brand-primary)",
                                        borderColor: "var(--brand-primary)",
                                        background: "var(--brand-primary-light)",
                                    }}
                                >
                                    <RefreshCw
                                        size={13}
                                        className={atualizando === reg.idReg ? "animate-spin" : ""}
                                    />
                                    {atualizando === reg.idReg ? "Atualizando..." : "Atualizar"}
                                </button>

                                <button
                                    onClick={() => navigate(`/app/regioes/${reg.idReg}`)}
                                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border transition-all duration-200 cursor-pointer"
                                    style={{
                                        color: "var(--text-darkest)",
                                        borderColor: "var(--interface-border)",
                                        background: "transparent",
                                    }}
                                >
                                    Ver detalhes <ChevronRight size={13} />
                                </button>

                                <button
                                    onClick={() => handleDeletar(reg.idReg)}
                                    disabled={deletando === reg.idReg}
                                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border transition-all duration-200 cursor-pointer disabled:opacity-50 ml-auto"
                                    style={{
                                        color: "var(--interface-error)",
                                        borderColor: "hsla(0,72%,55%,0.3)",
                                        background: "transparent",
                                    }}
                                >
                                    <Trash2 size={13} />
                                    {deletando === reg.idReg ? "..." : "Remover"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
}

export default Dashboard;
