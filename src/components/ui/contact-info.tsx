"use client";

import { useEffect, useState } from "react";
import { getSocialLinksPublic, getWhatsAppUrl } from "@/app/services/service";
import type { SocialLink } from "@/app/services/service";

function formatBrazilPhone(raw: string): string {
    const d = raw.replace(/\D/g, "");
    if (d.startsWith("55") && d.length >= 12) {
        const ddd = d.slice(2, 4);
        const num = d.slice(4);
        if (num.length === 9) return `+55 (${ddd}) ${num.slice(0, 5)}-${num.slice(5)}`;
        if (num.length === 8) return `+55 (${ddd}) ${num.slice(0, 4)}-${num.slice(4)}`;
    }
    return `+${d}`;
}

const FALLBACK_EMAIL = "contato@arthea.com.br";

interface Props {
    variant: "inline" | "card";
}

export function ContactInfo({ variant }: Props) {
    const [links, setLinks] = useState<SocialLink[]>([]);

    useEffect(() => {
        getSocialLinksPublic().then(setLinks).catch(() => {});
    }, []);

    const waLink      = links.find(l => l.type === "WHATSAPP");
    const waUrl       = getWhatsAppUrl(links, "Olá! Li a política do Consultório Arthea e gostaria de entrar em contato.");
    const waTel       = waLink ? formatBrazilPhone(waLink.value) : null;
    const emailLink   = links.find(l => l.value.includes("@"));
    const emailAddr   = emailLink?.value ?? FALLBACK_EMAIL;
    const addressLink = links.find(l => l.type === "ADDRESS");

    if (variant === "inline") {
        return (
            <>
                {waUrl && waTel && (
                    <>
                        <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold hover:underline"
                        >
                            {waTel}
                        </a>
                        {" ou pelo e-mail "}
                    </>
                )}
                <a href={`mailto:${emailAddr}`} className="font-semibold hover:underline">
                    {emailAddr}
                </a>
            </>
        );
    }

    return (
        <div className="mt-3 rounded-xl border border-[#BEB2A4] bg-white/60 p-4 text-xs space-y-1">
            <p><strong>Arthea Espaços Profissionais</strong></p>
            {addressLink?.value && (
                <p className="whitespace-pre-line">{addressLink.value}</p>
            )}
            {waUrl && waTel && (
                <p>
                    WhatsApp:{" "}
                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        {waTel}
                    </a>
                </p>
            )}
            <p>
                E-mail:{" "}
                <a href={`mailto:${emailAddr}`} className="hover:underline">
                    {emailAddr}
                </a>
            </p>
        </div>
    );
}
