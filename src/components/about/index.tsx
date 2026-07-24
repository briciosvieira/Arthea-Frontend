"use client"
import { useEffect, useState } from "react";
import { Service } from "@/app/services/service";

const service = new Service();
const API_URL  = process.env.NEXT_PUBLIC_URL;

export function About() {
    const [img1, setImg1] = useState<string | null>(null);

    useEffect(() => {
        service.getQuemSomos().then((images) => {
            const pos1 = images.find((i) => i.position === 1);
            if (pos1) setImg1(`${API_URL}${pos1.filePath}`);
        }).catch(() => {});
    }, []);

    return (
        <section id="about" className="w-full bg-[#EEEBE6]">
            <div className="grid lg:grid-cols-[1fr_1fr]">
                <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#AB8E66]">
                        Quem somos
                    </p>
                    <h2 className="mt-3 text-xl font-semibold leading-snug text-[#606958] sm:text-2xl lg:text-3xl">
                        Cuidado em saúde com atenção humana e estrutura de alto padrão.
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-7 text-[#87847D]">
                        A Arthea nasceu para oferecer cuidado em saúde com atenção humana,
                        ambiente acolhedor e estrutura que simplifica a rotina do profissional
                        e o atendimento dos pacientes.
                    </p>
                </div>

                <div className="relative h-[240px] lg:h-auto lg:min-h-[340px]">
                    {img1 ? (
                        <img
                            src={img1}
                            alt="Ambientes do Consultório Arthea"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="h-full w-full bg-[#BEB2A4]" />
                    )}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-8 lg:h-10 bg-gradient-to-b from-[#EEEBE6]/75 to-transparent" />
                </div>
            </div>
        </section>
    );
}
