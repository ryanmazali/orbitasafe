import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { getSubprefeituras } from "../../../../api/getSubprefeituras";
import { postRegiao } from "../../../../api/postRegiao";
import { getAlertasByRegiao } from "../../../../api/getAlertasByRegiao";
import { Input, Button, Badge } from "../../../../components";
import type { Subprefeitura, Alerta, NivelAlerta } from "../../../../types";

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
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [alertaGerado, setAlertaGerado] = useState<Alerta | null>(null);

    useEffect(() => {
        document.title = "Nova Região | OrbitaSafe";
    }, []);

    useEffect(() => {
        getSubprefeituras()
            .then(setSubprefeituras)
            .catch(() => setErro("Erro ao carregar subprefeituras"))
            .finally(() => setLoadingSubp(false));
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!usuario || idSubpref === "") return;
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
                        style={{
                            background: "var(--interface-base)",
                            borderColor: "var(--interface-border)",
                        }}
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
                            {new Date(alertaGerado.dtAlerta).toLocaleDateString("pt-BR")}
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

                    <div className="w-full">
                        <label
                            htmlFor="subprefeitura"
                            className="block mb-1 text-sm"
                            style={{ color: "var(--text-base)" }}
                        >
                            Subprefeitura
                        </label>
                        <select
                            id="subprefeitura"
                            value={idSubpref}
                            onChange={(e) => setIdSubpref(Number(e.target.value))}
                            required
                            disabled={loadingSubp}
                            className="w-full border rounded-full py-3 px-5 text-sm cursor-pointer focus:outline-none transition-colors duration-200 disabled:opacity-50"
                            style={{
                                background: "var(--interface-dark)",
                                borderColor: "var(--interface-border)",
                                color: idSubpref === "" ? "var(--text-light)" : "var(--text-darkest)",
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "var(--brand-primary)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = "var(--interface-border)";
                            }}
                        >
                            <option value="" disabled style={{ color: "var(--text-light)" }}>
                                {loadingSubp ? "Carregando..." : "Selecione uma subprefeitura"}
                            </option>
                            {subprefeituras
                                .sort((a, b) => a.nmSubpref.localeCompare(b.nmSubpref))
                                .map((s) => (
                                    <option
                                        key={s.idSubpref}
                                        value={s.idSubpref}
                                        style={{ background: "var(--interface-dark)", color: "var(--text-darkest)" }}
                                    >
                                        {s.nmSubpref}
                                    </option>
                                ))}
                        </select>
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
