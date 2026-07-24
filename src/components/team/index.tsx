"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { getDoctorsPublic } from "@/app/services/service";
import type { DoctorProps } from "@/app/types/doctorProps";

const DEFAULT_MS = 10_000;   // 10s autoplay normal
const MANUAL_MS  = 30_000;   // 30s após interação manual
const RESET_MS   = 120_000;  // 2 min sem interação → volta a 10s

function chunk<T>(arr: T[], n: number): T[][] {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
    return out;
}

function Initials({ name }: { name: string }) {
    const parts = name.trim().split(" ");
    const ini = parts.length >= 2 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : parts[0][0];
    return (
        <div className="flex h-full w-full items-center justify-center bg-[#606958]/15 text-xl font-semibold text-[#606958]">
            {ini.toUpperCase()}
        </div>
    );
}

export function Equipe() {
    const [doctors, setDoctors]  = useState<DoctorProps[]>([]);
    const [perPage, setPerPage]  = useState(8);

    const swiperRef      = useRef<SwiperType | null>(null);
    const timerRef       = useRef<ReturnType<typeof setTimeout> | null>(null);
    const resetRef       = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isManualRef    = useRef(false);
    const scheduleRef    = useRef<(() => void) | null>(null);

    useEffect(() => {
        getDoctorsPublic()
            .then(d => setDoctors(d.filter(doc => doc.active)))
            .catch(() => {});
    }, []);

    useEffect(() => {
        const check = () => setPerPage(window.innerWidth < 768 ? 2 : 8);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const slides = chunk(doctors, perPage);

    // Autoplay gerenciado manualmente para suportar lógica de timer dinâmico
    useEffect(() => {
        if (slides.length <= 1) return;

        let timer: ReturnType<typeof setTimeout>;

        const tick = () => {
            const s = swiperRef.current;
            if (s) s.isEnd ? s.slideTo(0, 400) : s.slideNext(400);
            schedule();
        };

        const schedule = () => {
            clearTimeout(timer);
            timer = setTimeout(tick, isManualRef.current ? MANUAL_MS : DEFAULT_MS);
        };

        scheduleRef.current = schedule;
        schedule();

        return () => {
            clearTimeout(timer);
            if (resetRef.current) clearTimeout(resetRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slides.length]);

    const handleManualTouch = () => {
        isManualRef.current = true;
        scheduleRef.current?.();
        if (resetRef.current) clearTimeout(resetRef.current);
        resetRef.current = setTimeout(() => {
            isManualRef.current = false;
            scheduleRef.current?.();
        }, RESET_MS);
    };

    if (doctors.length < 2) return null;

    return (
        <section className="w-full bg-[#EEEBE6] py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#AB8E66]">
                        Profissionais
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#606958] sm:text-3xl">
                        Nossa equipe médica
                    </h2>
                    <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#87847D]">
                        Conheça os profissionais que já confiam no Consultório Arthea para atender seus pacientes.
                    </p>
                </div>

                <div className="mt-12 equipe-slider">
                    <Swiper
                        key={perPage}
                        onSwiper={s => { swiperRef.current = s; }}
                        onTouchStart={handleManualTouch}
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        speed={420}
                        grabCursor
                    >
                        {slides.map((group, gi) => (
                            <SwiperSlide key={gi}>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                                    {group.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="overflow-hidden rounded-2xl border border-[#BEB2A4]/50 bg-white/70"
                                        >
                                            <div className="relative h-90 w-full overflow-hidden bg-[#DCDFCE]">
                                                {doc.photoUrl ? (
                                                    <Image
                                                        src={doc.photoUrl}
                                                        alt={doc.name}
                                                        fill
                                                        className="object-cover object-top"
                                                        sizes="(max-width: 640px) 50vw, 25vw"
                                                    />
                                                ) : (
                                                    <Initials name={doc.name} />
                                                )}
                                            </div>
                                            <div className="p-3">
                                                <p className="text-xs font-semibold leading-tight text-black">{doc.name}</p>
                                                <p className="mt-0.5 text-[11px] text-[#606958]">{doc.specialty}</p>
                                                <p className="mt-0.5 text-[10px] text-[#87847D]">CRM {doc.crm}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx global>{`
                .equipe-slider .swiper-pagination-bullet {
                    background: rgba(96, 105, 88, 0.25);
                    opacity: 1;
                    width: 6px;
                    height: 6px;
                    transition: transform 0.2s, background 0.2s;
                }
                .equipe-slider .swiper-pagination-bullet-active {
                    background: #606958;
                    transform: scale(1.35);
                }
                .equipe-slider .swiper-wrapper {
                    padding-bottom: 36px;
                }
            `}</style>
        </section>
    );
}
