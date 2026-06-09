import { House, Info, Users, CircleHelp, UserRound } from "lucide-react";

export const navItems = [
    {
        id: 1,
        icon: <House />,
        label: "Início",
        link: "/",
    },
    {
        id: 2,
        icon: <Info />,
        label: "Sobre",
        link: "/sobre",
    },
    {
        id: 3,
        icon: <Users />,
        label: "Equipe",
        link: "/integrantes",
    },
    {
        id: 4,
        icon: <CircleHelp />,
        label: "FAQ",
        link: "/faq",
    },
    {
        id: 5,
        icon: <UserRound />,
        label: "Entrar",
        link: "/login",
    },
];