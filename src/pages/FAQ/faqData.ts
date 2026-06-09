export interface FAQItemType {
    id: number;
    pergunta: string;
    resposta: string;
}

export const faqItems: FAQItemType[] = [
    {
        id: 1,
        pergunta: "O que é o OrbitaSafe?",
        resposta:
        "O OrbitaSafe é uma plataforma de monitoramento climático inteligente desenvolvida por estudantes da FIAP. Usamos dados satelitais e inteligência artificial para prever riscos de alagamento em São Paulo e emitir alertas em tempo real.",
    },
    {
        id: 2,
        pergunta: "Como o OrbitaSafe prevê alagamentos?",
        resposta:
        "Utilizamos dois modelos de machine learning treinados com dados reais da CGE-SP. O primeiro classifica o nível de risco em Baixo, Médio ou Alto. O segundo prevê de forma binária se há risco de alagamento em uma região com base nas condições climáticas atuais.",
    },
    {
        id: 3,
        pergunta: "Quais regiões de São Paulo são monitoradas?",
        resposta:
        "O OrbitaSafe monitora as 32 subprefeituras de São Paulo. O usuário pode cadastrar qualquer uma delas ou informar um CEP específico para receber alertas personalizados.",
    },
    {
        id: 4,
        pergunta: "Preciso criar uma conta para usar?",
        resposta:
        "Sim. O cadastro é gratuito e permite que você salve as regiões que deseja monitorar e receba alertas personalizados. Sem conta, você pode acessar apenas as informações institucionais do site.",
    },
    {
        id: 5,
        pergunta: "Os alertas são em tempo real?",
        resposta:
        "Sim. Após cadastrar uma região, você pode acionar a atualização a qualquer momento. O sistema consulta as condições climáticas atuais, processa pelo modelo de IA e retorna o nível de risco atualizado com recomendações práticas.",
    },
    {
        id: 6,
        pergunta: "O que significam os níveis de risco?",
        resposta:
        "O OrbitaSafe usa três níveis: Baixo (condições estáveis, sem previsão de alagamento), Médio (atenção recomendada, possibilidade de alagamentos pontuais) e Alto (risco elevado, evite áreas de risco e siga as recomendações de segurança).",
    },
    {
        id: 7,
        pergunta: "De onde vêm os dados climáticos?",
        resposta:
        "Os dados utilizados para treinar nossos modelos foram coletados da CGE-SP (Centro de Gerenciamento de Emergências Climáticas de São Paulo), que disponibiliza informações históricas e em tempo real sobre condições climáticas na cidade.",
    },
    {
        id: 8,
        pergunta: "O OrbitaSafe funciona em celular?",
        resposta:
        "Sim! A plataforma foi desenvolvida com foco em mobile first, funcionando perfeitamente em smartphones, tablets e desktops sem necessidade de instalação.",
    },
    {
        id: 9,
        pergunta: "O projeto tem relação com tecnologia espacial?",
        resposta:
        "Sim. O OrbitaSafe integra dados coletados por satélites e aplica conceitos da Economia Espacial para resolver um problema urbano crítico, alinhado com o tema da Global Solution 2026 da FIAP.",
    },
];