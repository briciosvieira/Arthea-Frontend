"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Service } from "@/app/services/service";
import type { HeroMedia } from "@/app/services/service";

const service = new Service();

export function Videoclip() {
    const [hero, setHero] = useState<HeroMedia | null>(null);

    useEffect(() => {
        service.getHero().then(setHero).catch(() => {});
    }, []);

    const apiUrl = process.env.NEXT_PUBLIC_URL;
    const showImage = hero?.type === "IMAGE" && hero.imagePath;
    const videoSrc = hero?.videoPath ? `${apiUrl}${hero.videoPath}` : "/video/videoclip.mp4";
    const imageSrc = hero?.imagePath ? `${apiUrl}${hero.imagePath}` : null;

    return (
        <section className="relative min-h-[540px] lg:min-h-[610px] w-full overflow-hidden">
            {showImage && imageSrc ? (
                <img
                    src={imageSrc}
                    alt="Background da clínica"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ) : (
                <video
                    key={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
            )}

            <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(0,0,0,0.80)_0%,rgba(0,0,0,0.48)_50%,rgba(0,0,0,0.18)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-t from-white to-transparent" />

            <div className="relative z-10 mx-auto flex min-h-[540px] lg:min-h-[610px] max-w-7xl items-center px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-10">
                <div className="max-w-xl">
                    <p className="text-[10px] uppercase tracking-[0.34em] text-[#FCE7B8]">
                        Clínica Arthea
                    </p>

                    <h1 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                        Sua clínica.<br />
                        <span className="text-[#FCE7B8]">Seu espaço.</span>
                    </h1>

                    <p className="mt-3.5 max-w-md text-sm leading-7 text-white/75">
                        Ambiente sofisticado, operação funcional e apoio para você focar no atendimento.
                    </p>

                    <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                        <Link
                            className="inline-flex items-center justify-center rounded-full bg-[#AB8E66] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#BF9E72]"
                            href="https://wa.me/5571981441233"
                        >
                            Quero saber mais
                        </Link>
                        <button
                            type="button"
                            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/8 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
                        >
                            Conhecer a estrutura
                        </button>
                    </div>

                    <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
                        {[
                            { label: "Localização", text: "Pituba, Salvador — ponto estratégico para profissionais e pacientes." },
                            { label: "Estrutura", text: "Espaços para rotina clínica, procedimentos e experiência premium." },
                            { label: "Operação", text: "Reservas práticas, apoio local e ambiente pronto para atendimento." },
                        ].map((card) => (
                            <div key={card.label} className="rounded-[14px] border border-white/10 bg-white/8 p-3 backdrop-blur-sm">
                                <p className="text-[9px] uppercase tracking-[0.28em] text-[#FCE7B8]">{card.label}</p>
                                <p className="mt-1 text-xs leading-5 text-white/70">{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
