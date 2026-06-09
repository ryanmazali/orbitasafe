import { useEffect } from "react";
import { CircleHelp } from "lucide-react";
import { FAQItem } from "../../components";
import { faqItems } from "./faqData";

function FAQ() {
    useEffect(() => {
        document.title = "FAQ | OrbitaSafe";
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
                <CircleHelp size={48} style={{ color: "var(--brand-primary)" }} />
            </div>
            <h1
                className="text-[2rem] font-black mb-4 tablet:text-[2.8rem]"
                style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-darkest)",
                }}
            >
                Dúvidas{" "}
                <span style={{ color: "var(--brand-primary)" }}>Frequentes</span>
            </h1>
            <p
                className="text-sm leading-relaxed tablet:text-base"
                style={{ color: "var(--text-base)" }}
            >
                Tudo que você precisa saber sobre o OrbitaSafe e como ele pode
                proteger a sua região.
            </p>
            </div>
        </section>

        <main className="w-[90%] max-w-[1300px] mx-auto py-14">
            <div className="max-w-[800px] mx-auto">

            {/* Contador */}
            <p
                className="text-xs font-medium mb-6 text-center"
                style={{ color: "var(--text-light)" }}
            >
                {faqItems.length} perguntas frequentes
            </p>

            {/* Lista de perguntas */}
            {faqItems.map((item) => (
                <FAQItem
                key={item.id}
                pergunta={item.pergunta}
                resposta={item.resposta}
                />
            ))}

            {/* CTA ao fim */}
            <div
                className="mt-10 p-6 rounded-xl border text-center"
                style={{
                background: "var(--interface-dark)",
                borderColor: "var(--interface-border)",
                }}
            >
                <p
                className="text-sm mb-4"
                style={{ color: "var(--text-base)" }}
                >
                Ainda tem dúvidas? Entre em contato com nossa equipe.
                </p>
                <a
                    href="mailto:contato@orbitasafe.com"
                    className="text-sm font-semibold no-underline transition-colors duration-200 hover:opacity-75"
                    style={{ color: "var(--brand-primary)" }}
                >
                    contato@orbitasafe.com
                </a>
            </div>

            </div>
        </main>
        </>
    );
}

export default FAQ;