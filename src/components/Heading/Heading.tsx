import "./Heading.css";

interface HeadingProps<T extends React.ElementType> {
    component?: T;
    children: React.ReactNode;
}

export function Heading<T extends React.ElementType = "h1">({
    component,
    children,
    ...props
    }: HeadingProps<T>) {
    const Component = component || "h1";

    return (
        <Component className="heading" {...props}>
        {children}
        </Component>
    );
}