type BadgeVariant = "default" | "info" | "success" | "warning" | "error";
type BadgeSize = "default" | "small";

const variants: Record<BadgeVariant, string> = {
    default: "bg-[var(--brand-primary-light)] text-[var(--brand-primary)]",
    info: "bg-[hsla(213,94%,60%,0.15)] text-[var(--interface-info)]",
    success: "bg-[hsla(142,70%,45%,0.15)] text-[var(--interface-success)]",
    warning: "bg-[hsla(38,92%,50%,0.15)] text-[var(--interface-warning)]",
    error: "bg-[hsla(0,72%,55%,0.15)] text-[var(--interface-error)]",
};

const sizes: Record<BadgeSize, string> = {
    default: "px-3 py-1.5 text-sm",
    small: "px-2.5 py-1 text-xs",
};

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
}

export const Badge = ({ children, variant = "default", size = "default" }: BadgeProps) => {
    return (
        <mark
        role="status"
        className={`${variants[variant]} ${sizes[size]} rounded-full font-semibold leading-normal`}
        >
        {children}
        </mark>
    );
};