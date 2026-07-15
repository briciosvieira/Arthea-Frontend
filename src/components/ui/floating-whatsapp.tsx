"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSocialLinksPublic, getWhatsAppUrl } from "@/app/services/service";
import whatsLogo from "../../../public/whartsLogo.png";

export function FloatingWhatsApp() {
    const [waUrl, setWaUrl] = useState("https://wa.me/5571981441233");

    useEffect(() => {
        getSocialLinksPublic().then(links => setWaUrl(getWhatsAppUrl(links)));
    }, []);

    return (
        <Link
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-4 z-50"
            aria-label="Falar no WhatsApp"
        >
            <div className="relative">
                <span className="absolute inset-0 rounded-full bg-green-400/25 animate-ping" />
                <Image
                    width={52}
                    alt="WhatsApp"
                    src={whatsLogo}
                    className="relative animate-glow-whats"
                />
            </div>
        </Link>
    );
}
