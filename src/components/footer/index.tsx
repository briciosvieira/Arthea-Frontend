"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube, FaTwitter } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { getSocialLinksPublic, getWhatsAppUrl } from "@/app/services/service";
import type { SocialLink, SocialLinkType } from "@/app/services/service";
import LogoImg from "../../../public/logoSF.png";

const FALLBACK_WA = "5571981441233";
const address = "Av. Prof. Magalhães Neto, 1752 — Loja 03\nEd. Lena Empresarial, Pituba\nSalvador — BA";

const ICON_MAP: Partial<Record<SocialLinkType, React.ElementType>> = {
    INSTAGRAM: FaInstagram,
    LINKEDIN:  FaLinkedin,
    FACEBOOK:  FaFacebook,
    WHATSAPP:  FaWhatsapp,
    YOUTUBE:   FaYoutube,
    TWITTER:   FaTwitter,
    TIKTOK:    FaTiktok,
};

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

type NavLink = { label: string; href: string; external?: boolean };

const colEspaco: NavLink[] = [
    { label: "Sobre",       href: "/#about" },
    { label: "Localização", href: "/#localizacao" },
    { label: "Galeria",     href: "/#galeria" },
];

function NavCol({ title, links }: { title: string; links: NavLink[] }) {
    return (
        <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FCE7B8]">
                {title}
            </p>
            <ul className="space-y-2.5">
                {links.map((l) => (
                    <li key={l.label}>
                        <Link
                            href={l.href}
                            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="text-sm text-[#EEEBE6]/65 transition-colors duration-150 hover:text-[#EEEBE6]"
                        >
                            {l.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function Footer() {
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

    useEffect(() => {
        getSocialLinksPublic().then(setSocialLinks).catch(() => {});
    }, []);

    const waUrl  = getWhatsAppUrl(socialLinks, FALLBACK_WA);
    const waLink = socialLinks.find(l => l.type === "WHATSAPP");
    const waTel  = waLink ? formatBrazilPhone(waLink.value) : "+55 (71) 98144-1233";

    // e-mails registrados como social link (qualquer tipo com @ no valor)
    const emailLinks = socialLinks.filter(l => l.value.includes("@"));

    // ícones de redes sociais em ordem alfabética por tipo
    const iconLinks = socialLinks
        .filter(l => l.type in ICON_MAP)
        .sort((a, b) => a.type.localeCompare(b.type));

    const colInstitucional: NavLink[] = [
        { label: "Dúvidas frequentes",      href: waUrl,          external: true },
        { label: "Política de privacidade", href: "/privacidade" },
        { label: "Termos de uso",           href: "/termos" },
    ];

    const colProfissional: NavLink[] = [
        { label: "Alugar consultório",  href: waUrl, external: true },
        { label: "Planos e horários",   href: waUrl, external: true },
        { label: "Diferenciais",        href: "/#about" },
        { label: "Falar no WhatsApp",   href: waUrl, external: true },
    ];

    return (
        <footer className="w-full bg-[#606958]">
            <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">

                    {/* ── Coluna brand ── */}
                    <div>
                        <Link href="/" aria-label="Página inicial Arthea">
                            <Image
                                src={LogoImg}
                                alt="Arthea — Espaços para Profissionais de Saúde"
                                width={130}
                                quality={90}
                                className="rounded-lg brightness-0 invert opacity-90"
                            />
                        </Link>

                        <p className="mt-4 max-w-[260px] text-xs leading-6 text-[#EEEBE6]/65">
                            Espaços profissionais para atendimentos, consultas e procedimentos em
                            ambiente confortável, bem localizado e totalmente estruturado.
                        </p>

                        <div className="mt-5 space-y-2 text-xs text-[#EEEBE6]/65">
                            <p className="leading-5 whitespace-pre-line">{address}</p>

                            {/* WhatsApp formatado */}
                            {waLink && (
                                <p>
                                    <a
                                        href={waUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-[#EEEBE6]"
                                    >
                                        {waTel}
                                    </a>
                                </p>
                            )}

                            {/* E-mails cadastrados como social link */}
                            {emailLinks.map(link => (
                                <p key={link.id}>
                                    <a
                                        href={`mailto:${link.value}`}
                                        className="transition-colors hover:text-[#EEEBE6]"
                                    >
                                        {link.label ?? link.value}
                                    </a>
                                </p>
                            ))}
                        </div>

                        {/* Ícones sociais dinâmicos em ordem alfabética */}
                        {iconLinks.length > 0 && (
                            <div className="mt-6 flex items-center gap-2.5">
                                {iconLinks.map(({ id, type, value, label }) => {
                                    const Icon = ICON_MAP[type]!;
                                    const href = type === "WHATSAPP"
                                        ? `https://wa.me/${value}`
                                        : value;
                                    return (
                                        <a
                                            key={id}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label ?? type}
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EEEBE6]/15 bg-[#EEEBE6]/8 text-[#EEEBE6]/60 transition hover:bg-[#EEEBE6]/18 hover:text-[#EEEBE6]"
                                        >
                                            <Icon size={14} />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* ── Colunas de navegação ── */}
                    <NavCol title="Espaço"             links={colEspaco} />
                    <NavCol title="Para Profissionais" links={colProfissional} />
                    <NavCol title="Institucional"      links={colInstitucional} />
                </div>
            </div>

            {/* ── Copyright ── */}
            <div className="border-t border-[#EEEBE6]/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
                    <p className="text-xs text-[#EEEBE6]/45">
                        © 2026 Arthea — Todos os direitos reservados
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#EEEBE6]/45">
                        <Link href="/privacidade" className="transition-colors hover:text-[#EEEBE6]/75">
                            Política de privacidade
                        </Link>
                        <span className="text-[#EEEBE6]/20">•</span>
                        <Link href="/termos" className="transition-colors hover:text-[#EEEBE6]/75">
                            Termos de uso
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
