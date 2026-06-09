type ButtonVariant = "default" | "primary" | "secondary";

const variants: Record<ButtonVariant, string> = {
    default: "bg-transparent text-[var(--text-base)] hover:opacity-75",
    primary: "bg-[var(--brand-primary)] text-[var(--interface-darkest)] font-bold hover:opacity-90 disabled:opacity-50",
    secondary: "bg-[var(--brand-primary-light)] text-[var(--brand-primary)] font-semibold border border-[var(--brand-primary)] hover:opacity-75",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    fullWidth?: boolean;
    onClick?: () => void;
}

export const Button = ({
    children,
    variant = "default",
    fullWidth = false,
    onClick,
    ...props
    }: ButtonProps) => {
    return (
        <button
        onClick={onClick}
        className={`
            text-base rounded-full border-0 cursor-pointer
            py-2.5 px-5 transition-all duration-200
            disabled:cursor-not-allowed disabled:pointer-events-none
            ${variants[variant]}
            ${fullWidth ? "w-full" : ""}
        `}
        {...props}
        >
        {children}
        </button>
    );
};