"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSocialLinksPublic, getWhatsAppUrl } from "@/app/services/service";
import type { SocialLink } from "@/app/services/service";

export function Location() {
    const [links, setLinks] = useState<SocialLink[]>([]);

    useEffect(() => {
        getSocialLinksPublic().then(setLinks).catch(() => {});
    }, []);

    const waUrlMsg    = getWhatsAppUrl(links, "Olá! Visitei o site do Consultório Arthea e gostaria de saber mais sobre os espaços disponíveis para profissionais de saúde. Podem me ajudar?");
    const addressLink = links.find(l => l.type === "ADDRESS");

    return (
        <section id="localizacao" className="w-full bg-[#EEEBE6] py-8 lg:py-10">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 items-center">

                    {/* Coluna esquerda */}
                    <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#AB8E66]">
                            Nossa localização
                        </p>
                        <h2 className="mt-2 text-lg font-semibold tracking-tight text-black sm:text-xl">
                            Fácil acesso na Pituba, Salvador.
                        </h2>
                        <p className="mt-2 max-w-sm text-xs leading-6 text-[#87847D]">
                            Estamos no <strong className="font-semibold text-[#606958]">Edifício Lena Empresarial</strong>,
                            em ponto estratégico com fácil acesso para profissionais e pacientes da região.
                        </p>

                        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                            {waUrlMsg && (
                                <Link
                                    href={waUrlMsg}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full bg-[#606958] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#4f5748]"
                                >
                                    Falar com a clínica
                                </Link>
                            )}
                            <Link
                                href="https://www.google.com/maps/place/Edif%C3%ADcio+Lena+Empresarial"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-full border border-[#606958]/40 px-4 py-2 text-xs font-semibold text-[#606958] transition hover:bg-[#606958]/10"
                            >
                                Abrir no mapa
                            </Link>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <div className="rounded-[14px] border border-[#BEB2A4]/50 bg-white/55 p-3 shadow-sm">
                                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#AB8E66]">Endereço</p>
                                {addressLink?.value ? (
                                    <p className="mt-2 text-[11px] leading-5 text-[#606958] whitespace-pre-line">
                                        {addressLink.value}
                                    </p>
                                ) : (
                                    <p className="mt-2 text-[11px] leading-5 text-[#BEB2A4]">—</p>
                                )}
                            </div>
                            <div className="rounded-[14px] border border-[#BEB2A4]/50 bg-white/55 p-3 shadow-sm">
                                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#AB8E66]">Funcionamento</p>
                                <p className="mt-2 text-[11px] leading-5 text-[#606958]">
                                    Segunda a sábado<br />
                                    <strong className="font-semibold">09:00 às 18:00</strong><br />
                                    Com agendamento
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Coluna direita — mapa */}
                    <div className="h-[240px] overflow-hidden rounded-3xl border border-[#BEB2A4]/60 bg-white shadow-sm sm:h-[270px] lg:h-[290px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.255815517665!2d-38.4538761!3d-12.9855349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7161b0faf313d31%3A0xe9283c3ac29c28f8!2sEdif%C3%ADcio%20Lena%20Empresarial!5e0!3m2!1spt-BR!2sbr!4v1706820000000!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0, display: "block" }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localização do Consultório Arthea"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
