import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { postAuthCadastro } from "../../../api/postAuthCadastro";
import { postAuthLogin } from "../../../api/postAuthLogin";
import { Input, Button } from "../../../components";
import earthBg from "../../../assets/earth.jpg";

function Cadastro() {
    const { login, autenticado } = useAuth();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "Cadastro | OrbitaSafe";
    }, []);

    useEffect(() => {
        if (autenticado) navigate("/app", { replace: true });
    }, [autenticado, navigate]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErro("");
        setLoading(true);
        try {
            await postAuthCadastro({ nmUsu: nome, emailUsu: email, senhaUsu: senha });
            const usuario = await postAuthLogin({ emailUsu: email, senhaUsu: senha });
            login(usuario);
            navigate("/app", { replace: true });
        } catch (err) {
            if (err instanceof TypeError) {
                setErro("Servidor iniciando, aguarde alguns segundos e tente novamente.");
            } else if (err instanceof Error) {
                setErro(err.message);
            } else {
                setErro("Ocorreu um erro inesperado. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="flex items-center justify-center px-5 py-10"
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
                    background: "linear-gradient(135deg, hsla(222, 47%, 6%, 0.92) 0%, hsla(222, 47%, 6%, 0.85) 50%, hsla(38, 92%, 50%, 0.08) 100%)",
                    zIndex: 0,
                }}
            />
            <div className="w-full max-w-[440px]" style={{ position: "relative", zIndex: 1 }}>
                {/* Logo */}
                <div className="flex flex-col items-center gap-3 mb-8">
                    <ShieldCheck size={48} className="text-[var(--brand-primary)]" />
                    <h1
                        className="text-2xl font-black"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
                    >
                        Orbita<span style={{ color: "var(--brand-primary)" }}>Safe</span>
                    </h1>
                    <p className="text-sm text-center" style={{ color: "var(--text-base)" }}>
                        Crie sua conta e comece a monitorar suas regiões
                    </p>
                </div>

                {/* Card do formulário */}
                <div
                    className="p-8 rounded-2xl border"
                    style={{
                        background: "var(--interface-dark)",
                        borderColor: "var(--interface-border)",
                    }}
                >
                    <h2
                        className="text-lg font-bold mb-6"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
                    >
                        Criar conta
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            id="nome"
                            name="nome"
                            type="text"
                            label="Nome completo"
                            placeholder="Seu nome"
                            fullWidth
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            autoComplete="name"
                        />

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            label="E-mail"
                            placeholder="seu@email.com"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />

                        <Input
                            id="senha"
                            name="senha"
                            type="password"
                            label="Senha"
                            placeholder="Mínimo 6 caracteres"
                            fullWidth
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            minLength={6}
                            autoComplete="new-password"
                        />

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

                        <Button variant="primary" fullWidth type="submit" disabled={loading}>
                            {loading ? "Criando conta..." : "Criar conta"}
                        </Button>
                    </form>

                    <p className="text-sm text-center mt-6" style={{ color: "var(--text-base)" }}>
                        Já tem conta?{" "}
                        <Link
                            to="/login"
                            className="font-semibold no-underline hover:underline"
                            style={{ color: "var(--brand-primary)" }}
                        >
                            Entrar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
