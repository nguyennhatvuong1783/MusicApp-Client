import Link from "next/link";

interface ButtonProps {
    className?: string;
    text?: string;
    href?: string;
}

const Button: React.FC<ButtonProps> = ({
    className = "",
    text = "Button",
    href = "#",
}) => {
    return (
        <Link
            href={href}
            className={`truncate rounded-full bg-white px-0 align-middle text-black transition duration-100 hover:scale-103 hover:brightness-95 active:scale-100 active:opacity-80 ${className}`}
        >
            {text}
        </Link>
    );
};

export default Button;
