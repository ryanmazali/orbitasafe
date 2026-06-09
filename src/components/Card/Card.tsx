interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
    return (
        <div
        className={`bg-[var(--interface-dark)] border border-[var(--interface-border)] rounded-xl p-4 ${className ?? ""}`}
        >
        {children}
        </div>
    );
};