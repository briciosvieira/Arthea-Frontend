"use client";

import { useEffect, useState } from "react";
import { getSocialLinksPublic, getWhatsAppUrl } from "@/app/services/service";

const MSG = "Olá! Gostaria de agendar uma visita ao Consultório Arthea para conhecer o espaço.";

export function Cta() {
    const [waUrl, setWaUrl] = useState<string | null>(null);

    useEffect(() => {
        getSocialLinksPublic().then(links => setWaUrl(getWhatsAppUrl(links, MSG)));
    }, []);

    return (
        <section className="w-full bg-[#606958] py-16 lg:py-20">
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#FCE7B8]">
                    Próximo passo
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    Pronto para ter seu próprio espaço de atendimento?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/70">
                    Agende uma visita e conheça pessoalmente o Consultório Arthea.
                    Sem compromisso — venha ver o espaço e tirar todas as suas dúvidas.
                </p>

                {waUrl && (
                    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#606958] transition hover:bg-[#EEEBE6]"
                        >
                            Agendar uma visita
                        </a>
                        <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Falar pelo WhatsApp
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
