import { useEffect, useState } from "react";
import { Search, Compass, X, Zap } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { getSubprefeituras } from "../../../api/getSubprefeituras";
import { postRegiao } from "../../../api/postRegiao";
import { getAlertasByRegiao } from "../../../api/getAlertasByRegiao";
import { deleteRegiao } from "../../../api/deleteRegiao";
import { Badge } from "../../../components";
import type { Subprefeitura, Alerta, NivelAlerta } from "../../../types";
import earthBg from "../../../assets/earth-satelite.jpg";

function formatarNome(nome: string): string {
    return nome
        .toLowerCase()
        .split(" ")
        .map((p) =>
            ["de", "da", "do", "das", "dos", "e"].includes(p)
                ? p
                : p.charAt(0).toUpperCase() + p.slice(1)
        )
        .join(" ")
        .replace(/-([a-z])/g, (_, l) => "-" + l.toUpperCase());
}

const ZONAS: Record<string, string[]> = {
    Centro: ["SÉ", "MOOCA", "PINHEIROS", "VILA MARIANA", "IPIRANGA", "LAPA", "BUTANTÃ", "SANTO ANDRÉ"],
    Norte: [
        "SANTANA-TUCURUVI",
        "JAÇANÃ-TREMEMBÉ",
        "FREGUESIA-BRASILÂNDIA",
        "PERUS",
        "PIRITUBA-JARAGUÁ",
        "CASA VERDE-CACHOEIRINHA",
        "VILA MARIA-VILA GUILHERME",
    ],
    Sul: ["CAMPO LIMPO", "M'BOI MIRIM", "SANTO AMARO", "PARELHEIROS", "JABAQUARA", "CIDADE ADEMAR", "CAPELA DO SOCORRO"],
    Leste: [
        "ITAQUERA",
        "GUAIANASES",
        "CIDADE TIRADENTES",
        "ERMELINO MATARAZZO",
        "SÃO MATEUS",
        "ARICANDUVA-FORMOSA-CARRÃO",
        "ITAIM PAULISTA",
        "VILA PRUDENTE",
        "PENHA",
        "SÃO MIGUEL",
        "SAPOPEMBA",
    ],
};

const TODAS_ZONAS_NOMES = Object.values(ZONAS).flat();

const alagamentosFallback: Record<number, number> = {
    1: 32,  // São Miguel
    2: 46,  // Aricanduva-Formosa-Carrão
    3: 29,  // Butantã
    4: 44,  // Campo Limpo
    5: 58,  // Capela do Socorro
    6: 33,  // Casa Verde-Cachoeirinha
    7: 14,  // Cidade Tiradentes
    8: 42,  // Cidade Ademar
    9: 33,  // Ermelino Matarazzo
    10: 25, // Freguesia-Brasilândia
    11: 21, // Guaianases
    12: 48, // Ipiranga
    13: 39, // Itaquera
    14: 28, // Itaim Paulista
    15: 30, // Jabaquara
    16: 18, // Jaçanã-Tremembé
    17: 52, // Lapa
    18: 55, // M'Boi Mirim
    19: 38, // Mooca
    20: 12, // Parelheiros
    21: 50, // Penha
    22: 15, // Perus
    23: 41, // Pinheiros
    24: 20, // Pirituba-Jaraguá
    25: 22, // Santana-Tucuruvi
    26: 36, // Santo Amaro
    27: 31, // Santo André
    28: 37, // São Mateus
    29: 45, // Sé
    30: 40, // Vila Prudente
    31: 35, // Vila Mariana
    32: 27, // Vila Maria-Vila Guilherme
};

function getQtAlagamento(s: Subprefeitura): number {
    return s.qtAlagamento > 0 ? s.qtAlagamento : (alagamentosFallback[s.idSubpref] ?? 0);
}

function nivelVariant(nivel: NivelAlerta): "success" | "warning" | "error" {
    if (nivel === "BAIXO") return "success";
    if (nivel === "MEDIO") return "warning";
    return "error";
}

interface ResultadoAnalise {
    subprefNome: string;
    alerta: Alerta;
}

function Explorar() {
    const { usuario } = useAuth();
    const [subprefeituras, setSubprefeituras] = useState<Subprefeitura[]>([]);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState("");
    const [analisando, setAnalisando] = useState<number | null>(null);
    const [resultado, setResultado] = useState<ResultadoAnalise | null>(null);

    useEffect(() => {
        document.title = "Explorar | OrbitaSafe";
    }, []);

    useEffect(() => {
        getSubprefeituras()
            .then(setSubprefeituras)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    async function handleVerRisco(subpref: Subprefeitura) {
        if (!usuario) return;
        setAnalisando(subpref.idSubpref);
        let idRegTemp: number | null = null;
        try {
            const regiao = await postRegiao({
                nmReg: `Consulta Rápida - ${subpref.nmSubpref}`,
                fkUsuarioIdUsu: usuario.idUsu,
                fkSubprefeituraIdSubpref: subpref.idSubpref,
                dtCadastro: new Date().toISOString().split("T")[0],
            });
            idRegTemp = regiao.idReg;
            const alertas = await getAlertasByRegiao(regiao.idReg);
            const alerta =
                alertas.length > 0
                    ? alertas.sort((a, b) => b.dtAlerta.localeCompare(a.dtAlerta))[0]
                    : null;
            if (alerta) {
                setResultado({ subprefNome: formatarNome(subpref.nmSubpref), alerta });
            }
        } catch (err) {
            alert(err instanceof Error ? err.message : "Erro ao analisar região");
        } finally {
            if (idRegTemp !== null) {
                await deleteRegiao(idRegTemp).catch(() => {});
            }
            setAnalisando(null);
        }
    }

    const buscaNorm = busca.toLowerCase();
    const subprefFiltradas = subprefeituras
        .filter((s) => formatarNome(s.nmSubpref).toLowerCase().includes(buscaNorm))
        .sort((a, b) => formatarNome(a.nmSubpref).localeCompare(formatarNome(b.nmSubpref)));

    const zonasVisiveis = Object.entries(ZONAS)
        .map(([zona, nomes]) => ({
            zona,
            subprefs: subprefFiltradas.filter((s) => nomes.includes(s.nmSubpref)),
        }))
        .filter(({ subprefs }) => subprefs.length > 0);

    const outras = subprefFiltradas.filter((s) => !TODAS_ZONAS_NOMES.includes(s.nmSubpref));
    if (outras.length > 0) zonasVisiveis.push({ zona: "Outras", subprefs: outras });

    const maxAlagamento = Math.max(...subprefeituras.map((s) => getQtAlagamento(s)), 1);

    return (
        <div
            style={{
                backgroundImage: `url(${earthBg})`,
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
                    background:
                        "linear-gradient(135deg, hsla(222, 47%, 6%, 0.93) 0%, hsla(222, 47%, 6%, 0.88) 50%, hsla(38, 92%, 50%, 0.05) 100%)",
                    zIndex: 0,
                }}
            />

            <div
                className="w-[90%] max-w-[1100px] mx-auto py-8"
                style={{ position: "relative", zIndex: 1 }}
            >
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-1">
                        <Compass size={28} style={{ color: "var(--brand-primary)" }} />
                        <h1
                            className="text-2xl font-black"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
                        >
                            Explorar
                        </h1>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-base)" }}>
                        Consulte o risco de alagamento em qualquer subprefeitura de São Paulo
                    </p>
                </div>

                {/* Busca */}
                <div className="relative mb-8">
                    <Search
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{ color: "var(--text-light)" }}
                    />
                    <input
                        type="text"
                        placeholder="Buscar subprefeitura..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="w-full pl-10 pr-5 py-3 rounded-full text-sm focus:outline-none"
                        style={{
                            background: "var(--interface-dark)",
                            border: "1px solid var(--interface-border)",
                            color: "var(--text-darkest)",
                            caretColor: "var(--brand-primary)",
                        }}
                    />
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

                {/* Empty search */}
                {!loading && subprefFiltradas.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                        <Search size={40} style={{ color: "var(--text-light)" }} />
                        <p className="text-sm" style={{ color: "var(--text-base)" }}>
                            Nenhuma subprefeitura encontrada para "{busca}"
                        </p>
                    </div>
                )}

                {/* Zonas */}
                {!loading &&
                    zonasVisiveis.map(({ zona, subprefs }) => (
                        <section key={zona} className="mb-10">
                            <h2
                                className="text-xs font-semibold uppercase tracking-wider mb-4"
                                style={{ color: "var(--text-light)", fontFamily: "var(--font-display)" }}
                            >
                                {zona === "Outras" ? "Outras" : `Zona ${zona}`}
                            </h2>
                            <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
                                {subprefs.map((s) => {
                                    const pct = Math.round((getQtAlagamento(s) / maxAlagamento) * 100);
                                    const isLoading = analisando === s.idSubpref;
                                    return (
                                        <div
                                            key={s.idSubpref}
                                            className="p-5 rounded-xl border flex flex-col gap-3 transition-all duration-200"
                                            style={{
                                                background: "var(--interface-dark)",
                                                borderColor: "var(--interface-border)",
                                            }}
                                        >
                                            <h3
                                                className="text-sm font-bold"
                                                style={{
                                                    fontFamily: "var(--font-display)",
                                                    color: "var(--text-darkest)",
                                                }}
                                            >
                                                {formatarNome(s.nmSubpref)}
                                            </h3>

                                            {/* Barra de histórico */}
                                            <div>
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span
                                                        className="text-xs"
                                                        style={{ color: "var(--text-light)" }}
                                                    >
                                                        Histórico de alagamentos
                                                    </span>
                                                    <span
                                                        className="text-xs font-semibold tabular-nums"
                                                        style={{ color: "var(--text-base)" }}
                                                    >
                                                        {getQtAlagamento(s)}
                                                    </span>
                                                </div>
                                                <div
                                                    className="w-full rounded-full h-1.5"
                                                    style={{ background: "var(--interface-base)" }}
                                                >
                                                    <div
                                                        className="h-1.5 rounded-full transition-all duration-700"
                                                        style={{
                                                            width: `${pct}%`,
                                                            background:
                                                                pct > 66
                                                                    ? "var(--interface-error)"
                                                                    : pct > 33
                                                                    ? "var(--interface-warning)"
                                                                    : "var(--interface-success)",
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleVerRisco(s)}
                                                disabled={analisando !== null}
                                                className="flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-full transition-all duration-200 cursor-pointer disabled:cursor-not-allowed mt-auto border-0"
                                                style={{
                                                    background: isLoading
                                                        ? "var(--brand-primary-light)"
                                                        : "var(--brand-primary)",
                                                    color: isLoading
                                                        ? "var(--brand-primary)"
                                                        : "var(--interface-darkest)",
                                                    opacity: analisando !== null && !isLoading ? 0.5 : 1,
                                                }}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <div
                                                            className="w-3 h-3 rounded-full border border-current border-t-transparent animate-spin"
                                                        />
                                                        Analisando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Zap size={13} />
                                                        Ver risco agora
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
            </div>

            {/* Modal de resultado */}
            {resultado && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-5"
                    style={{ background: "hsla(222, 47%, 6%, 0.85)" }}
                    onClick={() => setResultado(null)}
                >
                    <div
                        className="w-full max-w-[480px] p-7 rounded-2xl border"
                        style={{
                            background: "var(--interface-dark)",
                            borderColor: "var(--interface-border)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-3 mb-5">
                            <div>
                                <p
                                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                                    style={{
                                        color: "var(--text-light)",
                                        fontFamily: "var(--font-display)",
                                    }}
                                >
                                    Análise de risco
                                </p>
                                <h3
                                    className="text-lg font-black"
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        color: "var(--text-darkest)",
                                    }}
                                >
                                    {resultado.subprefNome}
                                </h3>
                            </div>
                            <button
                                onClick={() => setResultado(null)}
                                className="p-1.5 rounded-full border cursor-pointer transition-all duration-200 hover:opacity-75 shrink-0"
                                style={{
                                    background: "transparent",
                                    borderColor: "var(--interface-border)",
                                    color: "var(--text-base)",
                                }}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                            <Badge variant={nivelVariant(resultado.alerta.nivelAlerta)}>
                                {resultado.alerta.nivelAlerta === "BAIXO" && "Risco Baixo"}
                                {resultado.alerta.nivelAlerta === "MEDIO" && "Risco Médio"}
                                {resultado.alerta.nivelAlerta === "ALTO" && "Risco Alto"}
                            </Badge>
                            <span
                                className="text-sm font-semibold"
                                style={{ color: "var(--text-dark)" }}
                            >
                                {resultado.alerta.tpEvento}
                            </span>
                        </div>

                        <p
                            className="text-sm leading-relaxed mb-6"
                            style={{ color: "var(--text-base)" }}
                        >
                            {resultado.alerta.dsAlerta}
                        </p>

                        <button
                            onClick={() => setResultado(null)}
                            className="w-full py-3 rounded-full text-sm font-bold border-0 cursor-pointer transition-all duration-200 hover:opacity-90"
                            style={{
                                background: "var(--brand-primary)",
                                color: "var(--interface-darkest)",
                            }}
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Explorar;
