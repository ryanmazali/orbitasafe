interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    name: string;
    fullWidth?: boolean;
    placeholder?: string;
    type: string;
    noLabel?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
    id, label, name, fullWidth = false,
    type, placeholder, noLabel = false, onChange, ...props
    }: InputProps) => {
    return (
        <div className={fullWidth ? "w-full" : ""}>
        <label
            htmlFor={id}
            className={noLabel ? "sr-only" : "block mb-1 text-sm text-[var(--text-base)]"}
        >
            {label}
        </label>
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className="
            w-full border border-[var(--interface-border)] rounded-full
            py-3 px-5 bg-[var(--interface-dark)]
            placeholder:text-[var(--text-light)] text-[var(--text-darkest)]
            focus:outline-none focus:border-[var(--brand-primary)]
            disabled:opacity-50 disabled:pointer-events-none
            transition-colors duration-200
            "
            {...props}
        />
        </div>
    );
};

interface ErrorLabelProps {
    children: React.ReactNode;
    id: string;
}

export const ErrorLabel = ({ id, children }: ErrorLabelProps) => {
    return (
        <label
        className="text-[var(--interface-error)] text-sm m-2 block"
        htmlFor={`${id}-error`}
        >
        {children}
        </label>
    );
};