"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Service, getSocialLinksPublic, getWhatsAppUrl } from "@/app/services/service";
import type { HeroMedia } from "@/app/services/service";

const service = new Service();

export function Videoclip() {
    const [hero, setHero] = useState<HeroMedia | null>(null);
    const WA_MSG = "Olá! Visitei o site do Consultório Arthea e gostaria de saber mais sobre os espaços para profissionais de saúde. Podem me ajudar?";
    const [waUrl, setWaUrl] = useState<string | null>(null);

    useEffect(() => {
        service.getHero().then(setHero).catch(() => {});
        getSocialLinksPublic().then(links => setWaUrl(getWhatsAppUrl(links, WA_MSG))).catch(() => {});
    }, []);

    const apiUrl   = process.env.NEXT_PUBLIC_URL;
    const showImage = hero?.type === "IMAGE" && !!hero.imagePath;
    const videoSrc  = hero?.videoPath ? `${apiUrl}${hero.videoPath}` : null;
    const imageSrc  = hero?.imagePath ? `${apiUrl}${hero.imagePath}` : null;

    const scrollToAbout = () =>
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });

    const cards = [
        { label: "Localização", text: "Endereço estratégico, com fácil acesso e comodidade para você profissional e seus pacientes." },
        { label: "Estrutura",   text: "Consultórios completos, modernos, confortáveis e preparados para suas consultas e procedimentos." },
        { label: "Operação",    text: "Reservas simplificadas, suporte operacional e gestão prática para a sua rotina clínica." },
    ];

    return (
        <>
            {/* ── Seção do vídeo ── */}
            <section className="relative h-[260px] md:min-h-[540px] lg:min-h-[610px] w-full overflow-hidden">
                {showImage && imageSrc ? (
                    <img
                        src={imageSrc}
                        alt="Background da clínica"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : videoSrc ? (
                    <video
                        key={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-cover"
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                ) : null}

                <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(0,0,0,0.80)_0%,rgba(0,0,0,0.48)_50%,rgba(0,0,0,0.18)_100%)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-16 md:h-32 bg-gradient-to-t from-white md:from-[#EEEBE6] to-transparent" />

                {/* Conteúdo sobreposto — tablet e desktop (md+) */}
                <div className="hidden md:flex relative z-10 mx-auto min-h-[540px] lg:min-h-[610px] max-w-7xl items-center px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-10">
                    <div className="max-w-xl">
                        <p className="text-[10px] uppercase tracking-[0.34em] text-[#FCE7B8]">
                            Consultório Arthea
                        </p>
                        <h1 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                            Seu consultório.<br />
                            <span className="text-[#FCE7B8]">Seu espaço.</span>
                        </h1>
                        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                            {waUrl && (
                                <Link
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full bg-[#AB8E66] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#BF9E72]"
                                >
                                    Quero saber mais
                                </Link>
                            )}
                            <button
                                type="button"
                                onClick={scrollToAbout}
                                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/8 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
                            >
                                Conhecer a estrutura
                            </button>
                        </div>
                        <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
                            {cards.map((card) => (
                                <div key={card.label} className="rounded-[14px] border border-white/10 bg-white/10 p-3">
                                    <p className="text-[9px] uppercase tracking-[0.28em] text-[#FCE7B8]">{card.label}</p>
                                    <p className="mt-1 text-xs leading-5 text-white/70">{card.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Conteúdo abaixo do vídeo — apenas mobile ── */}
            <div className="md:hidden bg-white px-4 pt-6 pb-0">
                <p className="text-sm uppercase tracking-[0.28em] font-semibold text-[#8A8C76]">
                    Consultório Arthea
                </p>
                <h1 className="mt-3 text-2xl font-semibold leading-tight text-[#000000]">
                    Seu consultório.<br />
                    <span className="text-[#606958]">Seu espaço.</span>
                </h1>

                <div className="mt-5 flex flex-col gap-2.5">
                    {waUrl && (
                        <Link
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full bg-[#606958] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4f5748]"
                        >
                            Quero saber mais
                        </Link>
                    )}
                    <button
                        type="button"
                        onClick={scrollToAbout}
                        className="inline-flex items-center justify-center rounded-full border border-[#606958]/40 bg-[#606958]/10 px-5 py-2.5 text-sm font-semibold text-[#606958] transition hover:bg-[#606958]/20"
                    >
                        Conhecer a estrutura
                    </button>
                </div>

                <div className="mt-5 grid gap-2.5 grid-cols-1">
                    {cards.map((card) => (
                        <div key={card.label} className="rounded-[14px] border border-[#606958]/20 bg-[#606958]/10 p-3">
                            <p className="text-[9px] uppercase tracking-[0.28em] text-[#606958]">{card.label}</p>
                            <p className="mt-1 text-xs leading-5 text-[#606958]/70">{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Faixa de transição mobile: branco → bege do About */}
            <div className="md:hidden h-8 bg-gradient-to-b from-white to-[#EEEBE6]" />
        </>
    );
}
