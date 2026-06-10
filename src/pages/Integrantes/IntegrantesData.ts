import fotoGuilherme from "../../assets/foto-guilherme.jpg";
import fotoDiego from "../../assets/foto-diego.jpg";
import fotoRyan from "../../assets/foto-ryan.jpeg";
import fotoRenan from "../../assets/foto-renan.jpeg"

export interface Integrante {
    id: string;
    nome: string;
    rm: string;
    turma: string;
    foto: string;
    github: string;
    linkedin: string;
    descricao: string;
}

export const integrantes: Integrante[] = [
    {
        id: "guilherme",
        nome: "Guilherme Dabul",
        rm: "559901",
        turma: "1TDSPR",
        foto: fotoGuilherme,
        github: "https://github.com/guidabuul",
        linkedin: "https://www.linkedin.com/in/guilhermedabul/",
        descricao: "Desenvolvedor frontend responsável pela interface e experiência do usuário do OrbitaSafe.",
    },
    {
        id: "diego",
        nome: "Diego Paulino",
        rm: "566841",
        turma: "1TDSPR",
        foto: fotoDiego,
        github: "https://github.com/DiegoCPaulino",
        linkedin: "https://www.linkedin.com/in/diego-paulino-9bb31b36a/",
        descricao: "Desenvolvedor backend responsável pela API Java e banco de dados Oracle do projeto.",
    },
    {
        id: "renan",
        nome: "Renan Lima",
        rm: "568321",
        turma: "1TDSPR",
        foto: fotoRenan,
        github: "https://github.com/renanlima-hub",
        linkedin: "https://www.linkedin.com/in/renanlimasantos/",
        descricao: "Desenvolvedor responsável pelos modelos de inteligência artificial e análise de dados climáticos.",
    },
    {
        id: "ryan",
        nome: "Ryan Mazali",
        rm: "567168",
        turma: "1TDSPR",
        foto: fotoRyan,
        github: "https://github.com/ryanmazali",
        linkedin: "https://linkedin.com/in/ryanmazali/",
        descricao: "Desenvolvedor responsável pela integração dos dados satelitais e modelos preditivos de alagamento.",
    },
];