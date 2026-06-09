import { useEffect } from "react";
import { Link } from "react-router";
import {
    Satellite,
    ShieldAlert,
    BrainCircuit,
    Bell,
    MapPin,
    ChevronRight,
    CloudRain,
    TriangleAlert,
    Users,
} from "lucide-react";

const features = [
    {
        id: 1,
        icon: <Satellite size={32} />,
        title: "Dados Satelitais",
        description:
        "Integramos dados de satélites e sensores climáticos para monitorar em tempo real as condições de cada região de São Paulo.",
    },
    {
        id: 2,
        icon: <BrainCircuit size={32} />,
        title: "Inteligência Artificial",
        description:
        "Nosso modelo de IA analisa padrões históricos e condições atuais para prever riscos de alagamento com alta precisão.",
    },
    {
        id: 3,
        icon: <Bell size={32} />,
        title: "Alertas em Tempo Real",
        description:
        "Receba notificações instantâneas quando o nível de risco da sua região mudar, com recomendações personalizadas.",
    },
    {
        id: 4,
        icon: <MapPin size={32} />,
        title: "Monitoramento por Região",
        description:
        "Cadastre as regiões que você quer monitorar — seja pela subprefeitura ou pelo CEP — e acompanhe cada uma de perto.",
    },
];

const stats = [
    { id: 1, icon: <CloudRain size={28} />, value: "32", label: "Subprefeituras monitoradas" },
    { id: 2, icon: <TriangleAlert size={28} />, value: "96%", label: "Precisão do modelo de IA" },
    { id: 3, icon: <Users size={28} />, value: "24/7", label: "Monitoramento contínuo" },
    { id: 4, icon: <ShieldAlert size={28} />, value: "3", label: "Níveis de alerta" },
];

function Home() {
    useEffect(() => {
        document.title = "OrbitaSafe | Monitoramento Climático Inteligente";
    }, []);

    return (
        <>
        {/* Hero */}
        <section
            className="min-h-[90vh] flex items-center justify-center text-center relative overflow-hidden"
            style={{
            background: "linear-gradient(135deg, var(--interface-darkest) 0%, hsla(222, 47%, 10%, 1) 50%, hsla(213, 94%, 8%, 1) 100%)",
            }}
        >
            {/* Grade decorativa */}
            <div
            className="absolute inset-0 opacity-10"
            style={{
                backgroundImage:
                "linear-gradient(var(--interface-border) 1px, transparent 1px), linear-gradient(90deg, var(--interface-border) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
            }}
            />

            {/* Círculo decorativo */}
            <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-5"
            style={{
                width: "600px",
                height: "600px",
                border: "1px solid var(--brand-primary)",
                boxShadow: "0 0 80px var(--brand-primary)",
            }}
            />
            <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-5"
            style={{
                width: "900px",
                height: "900px",
                border: "1px solid var(--interface-info)",
            }}
            />

            <div className="relative z-10 max-w-[800px] px-5 mx-auto">
            {/* Badge */}
            <span
                className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border"
                style={{
                background: "var(--brand-primary-light)",
                color: "var(--brand-primary)",
                borderColor: "var(--brand-primary)",
                }}
            >
                Tecnologia espacial a serviço da sua cidade
            </span>

            <h1
                className="text-[2.2rem] font-black leading-tight mb-6 tablet:text-[3rem] desktop:text-[3.8rem]"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
            >
                Proteja sua região dos{" "}
                <span style={{ color: "var(--brand-primary)" }}>
                riscos climáticos
                </span>{" "}
                de São Paulo
            </h1>

            <p className="text-base leading-relaxed mb-8 tablet:text-lg" style={{ color: "var(--text-base)" }}>
                O OrbitaSafe usa inteligência artificial e dados satelitais para monitorar
                alagamentos e emitir alertas em tempo real para cada região da cidade.
            </p>

            <div className="flex flex-col gap-3 items-center tablet:flex-row tablet:justify-center">
                <Link
                to="/cadastro"
                className="
                    no-underline font-bold text-sm px-8 py-4 rounded-full
                    flex items-center gap-2 transition-all duration-300
                    hover:opacity-90 hover:-translate-y-0.5
                "
                style={{
                    background: "var(--brand-primary)",
                    color: "var(--interface-darkest)",
                }}
                >
                Começar agora <ChevronRight size={18} />
                </Link>
                <Link
                to="/sobre"
                className="
                    no-underline font-semibold text-sm px-8 py-4 rounded-full
                    flex items-center gap-2 transition-all duration-300
                    hover:opacity-90
                "
                style={{
                    border: "1px solid var(--interface-border)",
                    color: "var(--text-dark)",
                }}
                >
                Saiba mais
                </Link>
            </div>
            </div>
        </section>

        {/* Stats */}
        <section
            className="py-12 border-y border-[var(--interface-border)]"
            style={{ background: "var(--interface-dark)" }}
        >
            <div className="w-[90%] max-w-[1300px] mx-auto grid grid-cols-2 gap-6 desktop:grid-cols-4">
            {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col items-center text-center gap-2">
                <span style={{ color: "var(--brand-primary)" }}>{stat.icon}</span>
                <span
                    className="text-[2rem] font-black"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
                >
                    {stat.value}
                </span>
                <span className="text-xs font-medium" style={{ color: "var(--text-light)" }}>
                    {stat.label}
                </span>
                </div>
            ))}
            </div>
        </section>

        {/* Features */}
        <section className="py-16 w-[90%] max-w-[1300px] mx-auto">
            <div className="text-center mb-12">
            <h2
                className="text-[1.8rem] font-bold mb-3 tablet:text-[2.2rem]"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
            >
                Como funciona
            </h2>
            <p className="text-sm leading-relaxed max-w-[500px] mx-auto" style={{ color: "var(--text-base)" }}>
                Da órbita até a sua tela — tecnologia de ponta traduzida em alertas simples e precisos.
            </p>
            </div>

            <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-4">
            {features.map((feature) => (
                <div
                key={feature.id}
                className="p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1"
                style={{
                    background: "var(--interface-dark)",
                    borderColor: "var(--interface-border)",
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--brand-primary)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px var(--interface-glow, hsla(38,92%,50%,0.1))";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--interface-border)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
                >
                <span
                    className="block mb-4 p-3 rounded-lg w-fit"
                    style={{
                    background: "var(--brand-primary-light)",
                    color: "var(--brand-primary)",
                    }}
                >
                    {feature.icon}
                </span>
                <h3
                    className="text-base font-bold mb-2"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
                >
                    {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-base)" }}>
                    {feature.description}
                </p>
                </div>
            ))}
            </div>
        </section>

        {/* CTA final */}
        <section
            className="py-16 text-center"
            style={{
            background: "linear-gradient(135deg, var(--interface-dark) 0%, hsla(213, 94%, 8%, 0.5) 100%)",
            borderTop: "1px solid var(--interface-border)",
            }}
        >
            <div className="w-[90%] max-w-[600px] mx-auto">
            <h2
                className="text-[1.8rem] font-bold mb-4 tablet:text-[2.2rem]"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-darkest)" }}
            >
                Comece a monitorar sua região agora
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-base)" }}>
                Cadastre-se gratuitamente e receba alertas personalizados para as regiões que mais importam para você.
            </p>
            <Link
                to="/cadastro"
                className="
                no-underline font-bold text-sm px-10 py-4 rounded-full
                inline-flex items-center gap-2
                transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5
                "
                style={{
                background: "var(--brand-primary)",
                color: "var(--interface-darkest)",
                }}
            >
                Criar conta gratuita <ChevronRight size={18} />
            </Link>
            </div>
        </section>
        </>
    );
}

export default Home;