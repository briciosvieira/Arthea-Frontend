"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Service } from "@/app/services/service";

const service = new Service();
const API_URL = process.env.NEXT_PUBLIC_URL;

const features = [
    {
        icon: "/predio.png",
        title: "Estrutura completa",
        text: "Consultório de alto padrão na Pituba. Traga apenas seu carimbo e caneta.",
    },
    {
        icon: "/calender.png",
        title: "Procedimentos",
        text: "Materiais para cirurgias, procedimentos médicos e estéticos.",
    },
    {
        icon: "/material.png",
        title: "Pagamento simples",
        text: "O paciente paga na sua maquininha. Você paga só pelas reservas e produtos usados.",
    },
    {
        icon: "/equipe.png",
        title: "Equipe de apoio",
        text: "Equipe e estrutura para você focar no que importa: sua carreira.",
    },
];

export function About() {
    const [img1, setImg1] = useState<string | null>(null);

    useEffect(() => {
        service.getQuemSomos().then((images) => {
            const pos1 = images.find((i) => i.position === 1);
            if (pos1) setImg1(`${API_URL}${pos1.filePath}`);
        }).catch(() => {});
    }, []);

    return (
        <div id="about" className="flex flex-col gap-3 py-4 lg:py-5">

            {/* Quem Somos */}
            <div className="overflow-hidden rounded-[18px] border border-[#BEB2A4] shadow-[0_6px_20px_rgba(0,0,0,0.05)] lg:grid lg:grid-cols-[1fr_1fr]">
                <div className="flex flex-col justify-center bg-[#EEEBE6] px-4 py-5 lg:px-6 lg:py-6">
                    <p className="text-[9px] uppercase tracking-[0.32em] text-[#8A8C76]">
                        Quem somos
                    </p>
                    <h2 className="mt-2 text-base font-semibold leading-snug text-[#000000] sm:text-lg lg:text-xl">
                        Cuidado em saúde com atenção humana e estrutura de alto padrão.
                    </h2>
                    <p className="mt-2.5 max-w-sm text-xs leading-5 text-[#87847D]">
                        A Arthea nasceu para oferecer cuidado em saúde com atenção humana,
                        ambiente acolhedor e tecnologia que simplifica a sua jornada.
                    </p>
                </div>

                <div className="h-[160px] overflow-hidden lg:h-auto lg:max-h-[320px]">
                    {img1 ? (
                        <img
                            src={img1}
                            alt="Ambientes da clínica Arthea"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="h-full w-full bg-[#BEB2A4]" />
                    )}
                </div>
            </div>

            {/* Cards de diferenciais */}
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((f) => (
                    <div
                        key={f.title}
                        className="flex flex-col gap-1.5 rounded-[14px] border border-[#BEB2A4] bg-[#DCDFCE] p-3 shadow-[0_3px_12px_rgba(0,0,0,0.05)] transition hover:shadow-[0_6px_18px_rgba(0,0,0,0.09)] hover:-translate-y-0.5"
                    >
                        <Image
                            src={f.icon}
                            alt={f.title}
                            width={22}
                            height={22}
                            className="object-contain"
                        />
                        <h3 className="text-xs font-semibold text-[#000000]">
                            {f.title}
                        </h3>
                        <p className="text-[11px] leading-4 text-[#87847D]">
                            {f.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
