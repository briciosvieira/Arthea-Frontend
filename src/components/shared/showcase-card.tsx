import Image, { StaticImageData } from "next/image";

interface ShowcaseCardProps {
    src: string | StaticImageData;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    imageClassName?: string;
    priority?: boolean;
}

export function ShowcaseCard({
    src,
    alt,
    width = 420,
    height = 560,
    className = "",
    imageClassName = "",
    priority = false,
}: ShowcaseCardProps) {
    return (
        <div
            className={`overflow-hidden rounded-[28px] border border-[#d9cfbf] bg-[#f4eee4] p-3 shadow-[0_18px_40px_rgba(24,39,34,0.12)] ${className}`.trim()}
        >
            <div className="overflow-hidden rounded-[22px] bg-[#e8dece]">
                <Image
                    src={src}
                    width={width}
                    height={height}
                    quality={100}
                    alt={alt}
                    priority={priority}
                    className={`h-full w-full object-cover transition duration-500 hover:scale-[1.02] ${imageClassName}`.trim()}
                />
            </div>
        </div>
    );
}
