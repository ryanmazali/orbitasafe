import { useEffect } from "react";
import { Users } from "lucide-react";
import { IntegranteCard } from "../../components";
import { integrantes } from "./IntegrantesData";

function Integrantes() {
    useEffect(() => {
        document.title = "Equipe | OrbitaSafe";
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
                <Users size={48} style={{ color: "var(--brand-primary)" }} />
            </div>
            <h1
                className="text-[2rem] font-black mb-4 tablet:text-[2.8rem]"
                style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-darkest)",
                }}
            >
                Nossa{" "}
                <span style={{ color: "var(--brand-primary)" }}>Equipe</span>
            </h1>
            <p
                className="text-sm leading-relaxed tablet:text-base"
                style={{ color: "var(--text-base)" }}
            >
                Quatro estudantes da FIAP unidos por um objetivo: usar tecnologia
                para proteger vidas em São Paulo.
            </p>
            </div>
        </section>

        <main className="w-[90%] max-w-[1300px] mx-auto py-14">

            {/* Grid de integrantes */}
            <section className="grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-4">
            {integrantes.map((integrante) => (
                <IntegranteCard key={integrante.id} integrante={integrante} />
            ))}
            </section>

            {/* Nota sobre o projeto */}
            <section
            className="mt-12 p-6 rounded-xl border text-center"
            style={{
                background: "var(--interface-dark)",
                borderColor: "var(--interface-border)",
            }}
            >
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-base)" }}>
                Projeto desenvolvido para a{" "}
                <span style={{ color: "var(--brand-primary)", fontWeight: 600 }}>
                Global Solution 2026
                </span>{" "}
                da FIAP — tema:{" "}
                <span style={{ color: "var(--text-dark)", fontWeight: 500 }}>
                Economia Espacial
                </span>
                . Turma{" "}
                <span style={{ color: "var(--text-dark)", fontWeight: 500 }}>
                1TDSPR
                </span>
                .
            </p>
            </section>

        </main>
        </>
    );
    }

export default Integrantes;