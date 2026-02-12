import { Lock } from "lucide-react";

interface LockedContentProps {
    text: string;
    isLocked: boolean;
    className?: string;
    blur?: boolean;
}

export const LockedContent = ({ text, isLocked, className = "", blur = false }: LockedContentProps) => {
    if (!isLocked) {
        return <span className={className}>{text}</span>;
    }

    // Masking logic: First letter visible, rest asterisks, last letter visible (if long enough)
    const maskText = (str: string) => {
        if (str.length <= 2) return "*".repeat(str.length);
        const first = str[0];
        const last = str[str.length - 1];
        const middle = "*".repeat(str.length - 2);
        return `${first}${middle}${last}`;
    };

    const content = maskText(text);

    return (
        <span className={`inline-flex items-center gap-1 text-muted-foreground/80 ${className}`} title="Login to view full details">
            {blur ? <span className="blur-sm select-none">{text}</span> : content}
            <Lock className="w-3 h-3 text-accent/70" />
        </span>
    );
};
