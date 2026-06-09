import { useEffect } from "react";
import {
    Satellite,
    BrainCircuit,
    ShieldCheck,
    Target,
    Orbit,
    Leaf,
} from "lucide-react";

const problema = [
    {
        id: 1,
        stat: "+300",
        label: "pontos de alagamento recorrentes em SP",
    },
    {
        id: 2,
        stat: "R$ 2bi",
        label: "em prejuízos anuais causados por enchentes",
    },
    {
        id: 3,
        stat: "12mi",
        label: "de pessoas afetadas por eventos climáticos extremos",
    },
];

const solucao = [
    {
        id: 1,
        icon: <Satellite size={24} />,
        title: "Dados do Espaço",
        description:
        "Utilizamos dados climáticos e históricos coletados por satélites e estações da CGE-SP para alimentar nossos modelos.",
    },
    {
        id: 2,
        icon: <BrainCircuit size={24} />,
        title: "IA Preditiva",
        description:
        "Dois modelos de machine learning treinados com dados reais de São Paulo preveem o nível de risco de alagamento por região.",
    },
    {
        id: 3,
        icon: <ShieldCheck size={24} />,
        title: "Alertas Personalizados",
        description:
        "O usuário cadastra suas regiões de interesse e recebe alertas em tempo real com recomendações práticas.",
    },
];

const ods = [
    {
        id: 1,
        numero: "ODS 11",
        titulo: "Cidades e Comunidades Sustentáveis",
        descricao:
        "Contribuímos para tornar São Paulo mais resiliente a desastres climáticos, reduzindo impactos em comunidades vulneráveis.",
        cor: "hsla(38, 92%, 50%, 1)",
    },
    {
        id: 2,
        numero: "ODS 13",
        titulo: "Ação Climática",
        descricao:
        "Usamos tecnologia para mitigar os efeitos de eventos climáticos extremos, promovendo respostas mais rápidas e eficazes.",
        cor: "hsla(142, 70%, 45%, 1)",
    },
    {
        id: 3,
        numero: "ODS 9",
        titulo: "Indústria, Inovação e Infraestrutura",
        descricao:
        "Aplicamos inteligência artificial e dados satelitais — tecnologias de ponta — para resolver um problema urbano crítico.",
        cor: "hsla(213, 94%, 60%, 1)",
    },
];

function Sobre() {
    useEffect(() => {
        document.title = "Sobre | OrbitaSafe";
    }, []);

    return (
        <>
        {/* Hero */}
        <section
            className="h-[320px] flex items-center justify-center text-center relative overflow-hidden mobile:h-[260px]"
            style={{
            background:
                "linear-gradient(135deg, var(--interface-darkest) 0%, hsla(213, 94%, 8%, 1) 100%)",
            }}
        >
            <div
            className="absolute inset-0 opacity-10"
            style={{
                backgroundImage:
                "linear-gradient(var(--interface-border) 1px, transparent 1px), linear-gradient(90deg, var(--interface-border) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
            }}
            />
            <div className="relative z-10 max-w-[700px] px-5 mx-auto">
            <div className="flex justify-center mb-4">
                <Orbit size={48} style={{ color: "var(--brand-primary)" }} />
            </div>
            <h1
                className="text-[2rem] font-black mb-4 tablet:text-[2.8rem]"
                style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-darkest)",
                }}
            >
                Sobre o{" "}
                <span style={{ color: "var(--brand-primary)" }}>OrbitaSafe</span>
            </h1>
            <p
                className="text-sm leading-relaxed tablet:text-base"
                style={{ color: "var(--text-base)" }}
            >
                Uma solução acadêmica desenvolvida na FIAP que une tecnologia
                espacial e inteligência artificial para proteger vidas em São Paulo.
            </p>
            </div>
        </section>

        <main className="w-[90%] max-w-[1300px] mx-auto">

            {/* O problema */}
            <section className="py-14">
            <div className="text-center mb-10">
                <h2
                className="text-[1.6rem] font-bold mb-3 tablet:text-[2rem]"
                style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-darkest)",
                }}
                >
                O problema que resolvemos
                </h2>
                <p
                className="text-sm leading-relaxed max-w-[580px] mx-auto"
                style={{ color: "var(--text-base)" }}
                >
                São Paulo enfrenta anualmente crises severas de alagamento. A falta
                de informação preventiva deixa milhões de pessoas sem tempo de se
                proteger.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 tablet:grid-cols-3">
                {problema.map((item) => (
                <div
                    key={item.id}
                    className="p-8 rounded-xl border text-center"
                    style={{
                    background: "var(--interface-dark)",
                    borderColor: "var(--interface-border)",
                    }}
                >
                    <p
                    className="text-[2.5rem] font-black mb-2"
                    style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--brand-primary)",
                    }}
                    >
                    {item.stat}
                    </p>
                    <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-base)" }}
                    >
                    {item.label}
                    </p>
                </div>
                ))}
            </div>
            </section>

            {/* Divisor */}
            <div
            className="border-t"
            style={{ borderColor: "var(--interface-border)" }}
            />

            {/* A solução */}
            <section className="py-14">
            <div className="text-center mb-10">
                <h2
                className="text-[1.6rem] font-bold mb-3 tablet:text-[2rem]"
                style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-darkest)",
                }}
                >
                Nossa solução
                </h2>
                <p
                className="text-sm leading-relaxed max-w-[580px] mx-auto"
                style={{ color: "var(--text-base)" }}
                >
                O OrbitaSafe combina dados reais da CGE-SP, modelos de machine
                learning e uma interface intuitiva para entregar alertas
                preventivos precisos.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 tablet:grid-cols-3">
                {solucao.map((item) => (
                <div
                    key={item.id}
                    className="p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1"
                    style={{
                    background: "var(--interface-dark)",
                    borderColor: "var(--interface-border)",
                    }}
                >
                    <span
                    className="block mb-4 p-3 rounded-lg w-fit"
                    style={{
                        background: "var(--brand-primary-light)",
                        color: "var(--brand-primary)",
                    }}
                    >
                    {item.icon}
                    </span>
                    <h3
                    className="text-base font-bold mb-2"
                    style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--text-darkest)",
                    }}
                    >
                    {item.title}
                    </h3>
                    <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-base)" }}
                    >
                    {item.description}
                    </p>
                </div>
                ))}
            </div>
            </section>

            {/* Divisor */}
            <div
            className="border-t"
            style={{ borderColor: "var(--interface-border)" }}
            />

            {/* Missão */}
            <section className="py-14">
            <div
                className="rounded-xl border p-8 flex flex-col gap-6 tablet:flex-row tablet:items-center tablet:gap-10"
                style={{
                background: "var(--interface-dark)",
                borderColor: "var(--interface-border)",
                }}
            >
                <div className="flex-shrink-0 flex justify-center">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--brand-primary-light)" }}
                >
                    <Target size={32} style={{ color: "var(--brand-primary)" }} />
                </div>
                </div>
                <div>
                <h2
                    className="text-[1.4rem] font-bold mb-3"
                    style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-darkest)",
                    }}
                >
                    Nossa missão
                </h2>
                <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-base)" }}
                >
                    Democratizar o acesso à informação climática preventiva em São
                    Paulo, usando tecnologia espacial e inteligência artificial para
                    proteger pessoas — especialmente as mais vulneráveis — dos
                    impactos de alagamentos e eventos climáticos extremos.
                </p>
                </div>
            </div>
            </section>

            {/* Divisor */}
            <div
            className="border-t"
            style={{ borderColor: "var(--interface-border)" }}
            />

            {/* ODS */}
            <section className="py-14">
            <div className="text-center mb-10">
                <div className="flex justify-center mb-4">
                <Leaf size={32} style={{ color: "var(--interface-success)" }} />
                </div>
                <h2
                className="text-[1.6rem] font-bold mb-3 tablet:text-[2rem]"
                style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-darkest)",
                }}
                >
                Objetivos de Desenvolvimento Sustentável
                </h2>
                <p
                className="text-sm leading-relaxed max-w-[580px] mx-auto"
                style={{ color: "var(--text-base)" }}
                >
                O OrbitaSafe está alinhado com a Agenda 2030 da ONU, contribuindo
                diretamente para três ODS.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 tablet:grid-cols-3">
                {ods.map((item) => (
                <div
                    key={item.id}
                    className="p-6 rounded-xl border"
                    style={{
                    background: "var(--interface-dark)",
                    borderColor: "var(--interface-border)",
                    }}
                >
                    <p
                    className="text-xs font-bold mb-1 uppercase tracking-widest"
                    style={{ color: item.cor }}
                    >
                    {item.numero}
                    </p>
                    <h3
                    className="text-base font-bold mb-2"
                    style={{ color: "var(--text-darkest)" }}
                    >
                    {item.titulo}
                    </h3>
                    <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-base)" }}
                    >
                    {item.descricao}
                    </p>
                </div>
                ))}
            </div>
            </section>

        </main>
        </>
    );
}

export default Sobre;