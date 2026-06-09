import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, ChevronDown } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { getSubprefeituras } from "../../../../api/getSubprefeituras";
import { postRegiao } from "../../../../api/postRegiao";
import { getAlertasByRegiao } from "../../../../api/getAlertasByRegiao";
import { Input, Button, Badge } from "../../../../components";
import type { Subprefeitura, Alerta, NivelAlerta } from "../../../../types";

function formatarNome(nome: string): string {
    return nome
        .toLowerCase()
        .split(" ")
        .map((palavra) =>
            ["de", "da", "do", "das", "dos", "e"].includes(palavra)
                ? palavra
                : palavra.charAt(0).toUpperCase() + palavra.slice(1)
        )
        .join(" ")
        .replace(/-([a-z])/g, (_, letra) => "-" + letra.toUpperCase());
}

function nivelVariant(nivel: NivelAlerta): "success" | "warning" | "error" {
    if (nivel === "BAIXO") return "success";
    if (nivel === "MEDIO") return "warning";
    return "error";
}

function NovaRegiao() {
    const { usuario } = useAuth();
    const navigate = useNavigate();
    const [subprefeituras, setSubprefeituras] = useState<Subprefeitura[]>([]);
    const [loadingSubp, setLoadingSubp] = useState(true);
    const [nome, setNome] = useState("");
    const [idSubpref, setIdSubpref] = useState<number | "">("");
    const [dropdownAberto, setDropdownAberto] = useState(false);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [alertaGerado, setAlertaGerado] = useState<Alerta | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.title = "Nova Região | OrbitaSafe";
    }, []);

    useEffect(() => {
        getSubprefeituras()
            .then(setSubprefeituras)
            .catch(() => setErro("Erro ao carregar subprefeituras"))
            .finally(() => setLoadingSubp(false));
    }, []);

    useEffect(() => {
        function handleClickFora(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownAberto(false);
                setBusca("");
            }
        }
        document.addEventListener("mousedown", handleClickFora);
        return () => document.removeEventListener("mousedown", handleClickFora);
    }, []);

    const subprefSelecionada = subprefeituras.find((s) => s.idSubpref === idSubpref);

    const subprefFiltradas = subprefeituras
        .sort((a, b) => formatarNome(a.nmSubpref).localeCompare(formatarNome(b.nmSubpref)))
        .filter((s) =>
            formatarNome(s.nmSubpref).toLowerCase().includes(busca.toLowerCase())
        );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!usuario) return;
        if (idSubpref === "") {
            setErro("Selecione uma subprefeitura antes de continuar.");
            return;
        }
        setErro("");
        setLoading(true);
        try {
            const regiao = await postRegiao({
                nmReg: nome,
                fkUsuarioIdUsu: usuario.idUsu,
                fkSubprefeituraIdSubpref: Number(idSubpref),
                dtCadastro: new Date().toISOString().split("T")[0],
            });
            const alertas = await getAlertasByRegiao(regiao.idReg);
            const ultimo = alertas.length > 0
                ? alertas.sort((a, b) => b.dtAlerta.localeCompare(a.dtAlerta))[0]
                : null;
            setAlertaGerado(ultimo);
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro ao criar região");
        } finally {
            setLoading(false);
        }
    }

    if (alertaGerado) {
        return (
            <div className="w-[90%] max-w-[600px] mx-auto py-8">
                <div
                    className="p-8 rounded-2xl border flex flex-col gap-6 items-center text-center"
                    style={{ background: "var(--interface-dark)", borderColor: "var(--interface-border)" }}
                >
                    <CheckCircle size={52} style={{ color: "var(--interface-success)" }} />
                    <div>
                        <h2
                            className="text-xl font-black mb-2"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
                        >
                            Região cadastrada!
                        </h2>
                        <p className="text-sm" style={{ color: "var(--text-base)" }}>
                            A análise automática foi concluída. Veja o resultado abaixo.
                        </p>
                    </div>

                    <div
                        className="w-full p-5 rounded-xl border"
                        style={{ background: "var(--interface-base)", borderColor: "var(--interface-border)" }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold" style={{ color: "var(--text-dark)" }}>
                                {alertaGerado.tpEvento}
                            </span>
                            <Badge variant={nivelVariant(alertaGerado.nivelAlerta)} size="small">
                                {alertaGerado.nivelAlerta}
                            </Badge>
                        </div>
                        <p className="text-sm leading-relaxed text-left" style={{ color: "var(--text-base)" }}>
                            {alertaGerado.dsAlerta}
                        </p>
                        <p className="text-xs mt-3 text-left" style={{ color: "var(--text-light)" }}>
                            {new Date(alertaGerado.dtAlerta + "T00:00:00").toLocaleDateString("pt-BR")}
                        </p>
                    </div>

                    <Button variant="primary" fullWidth onClick={() => navigate("/app")}>
                        Ir para o Dashboard
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[90%] max-w-[600px] mx-auto py-8">
            {/* Cabeçalho */}
            <div className="flex items-center gap-3 mb-8">
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
                <div>
                    <h1
                        className="text-xl font-black"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
                    >
                        Nova Região
                    </h1>
                    <p className="text-sm" style={{ color: "var(--text-base)" }}>
                        Cadastre uma região para monitoramento
                    </p>
                </div>
            </div>

            {/* Formulário */}
            <div
                className="p-8 rounded-2xl border"
                style={{ background: "var(--interface-dark)", borderColor: "var(--interface-border)" }}
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <Input
                        id="nome"
                        name="nome"
                        type="text"
                        label="Nome da região"
                        placeholder="Ex: Casa, Trabalho, Escola..."
                        fullWidth
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />

                    {/* Dropdown customizado de subprefeituras */}
                    <div className="w-full">
                        <label
                            className="block mb-1 text-sm"
                            style={{ color: "var(--text-base)" }}
                        >
                            Subprefeitura
                        </label>
                        <div ref={dropdownRef} className="relative">
                            {/* Trigger */}
                            <button
                                type="button"
                                onClick={() => {
                                    if (!loadingSubp) {
                                        setDropdownAberto(!dropdownAberto);
                                        setBusca("");
                                    }
                                }}
                                disabled={loadingSubp}
                                className="w-full flex items-center justify-between border rounded-full py-3 px-5 text-sm text-left transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                style={{
                                    background: "var(--interface-dark)",
                                    borderColor: dropdownAberto ? "var(--brand-primary)" : "var(--interface-border)",
                                    color: subprefSelecionada ? "var(--text-darkest)" : "var(--text-light)",
                                }}
                            >
                                <span className="truncate">
                                    {loadingSubp
                                        ? "Carregando..."
                                        : subprefSelecionada
                                            ? formatarNome(subprefSelecionada.nmSubpref)
                                            : "Selecione uma subprefeitura"}
                                </span>
                                <ChevronDown
                                    size={16}
                                    style={{
                                        color: "var(--text-light)",
                                        flexShrink: 0,
                                        marginLeft: "8px",
                                        transform: dropdownAberto ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.2s ease",
                                    }}
                                />
                            </button>

                            {/* Painel */}
                            {dropdownAberto && (
                                <div
                                    className="absolute top-full left-0 right-0 mt-1 rounded-xl border z-50 overflow-hidden"
                                    style={{
                                        background: "var(--interface-dark)",
                                        borderColor: "var(--brand-primary)",
                                        boxShadow: "0 8px 32px var(--interface-shadow)",
                                    }}
                                >
                                    {/* Input de busca */}
                                    <div
                                        className="p-2 border-b"
                                        style={{ borderColor: "var(--interface-border)" }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Buscar subprefeitura..."
                                            value={busca}
                                            onChange={(e) => setBusca(e.target.value)}
                                            autoFocus
                                            className="w-full py-2 px-3 rounded-lg text-sm focus:outline-none"
                                            style={{
                                                background: "var(--interface-base)",
                                                color: "var(--text-darkest)",
                                                border: "1px solid var(--interface-border)",
                                                caretColor: "var(--brand-primary)",
                                            }}
                                        />
                                    </div>

                                    {/* Lista de opções */}
                                    <ul className="overflow-y-auto py-1" style={{ maxHeight: "220px" }}>
                                        {subprefFiltradas.length === 0 ? (
                                            <li
                                                className="px-4 py-3 text-sm"
                                                style={{ color: "var(--text-light)" }}
                                            >
                                                Nenhuma subprefeitura encontrada
                                            </li>
                                        ) : (
                                            subprefFiltradas.map((s) => {
                                                const selecionada = s.idSubpref === idSubpref;
                                                return (
                                                    <li
                                                        key={s.idSubpref}
                                                        onClick={() => {
                                                            setIdSubpref(s.idSubpref);
                                                            setDropdownAberto(false);
                                                            setBusca("");
                                                        }}
                                                        className="px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150"
                                                        style={{
                                                            background: selecionada ? "var(--brand-primary-light)" : "transparent",
                                                            color: selecionada ? "var(--brand-primary)" : "var(--text-dark)",
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (!selecionada) {
                                                                (e.currentTarget as HTMLLIElement).style.background = "var(--interface-base)";
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (!selecionada) {
                                                                (e.currentTarget as HTMLLIElement).style.background = "transparent";
                                                            }
                                                        }}
                                                    >
                                                        {formatarNome(s.nmSubpref)}
                                                    </li>
                                                );
                                            })
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {erro && (
                        <p
                            className="text-sm px-4 py-3 rounded-lg border"
                            style={{
                                color: "var(--interface-error)",
                                background: "hsla(0,72%,55%,0.08)",
                                borderColor: "hsla(0,72%,55%,0.2)",
                            }}
                        >
                            {erro}
                        </p>
                    )}

                    <Button variant="primary" fullWidth type="submit" disabled={loading || loadingSubp}>
                        {loading ? "Cadastrando e analisando..." : "Cadastrar região"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default NovaRegiao;
