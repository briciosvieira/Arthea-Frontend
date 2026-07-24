"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const items = [
    {
        q: "Quais são os planos disponíveis?",
        a: "Oferecemos aluguel por hora, diária e mensal, adaptados à demanda de cada profissional. Entre em contato para conhecer os valores e condições.",
    },
    {
        q: "O que está incluído no aluguel?",
        a: "Wi-Fi, ar-condicionado, mobiliário completo, limpeza entre atendimentos e uso das áreas comuns como recepção e sala de espera.",
    },
    {
        q: "Preciso assinar um contrato longo?",
        a: "Não. Nossos planos são flexíveis e sem fidelidade obrigatória. Você usa quando e quanto precisar, sem burocracia.",
    },
    {
        q: "Como faço para reservar?",
        a: "Basta entrar em contato pelo WhatsApp. Nosso atendimento é rápido e o processo de reserva é totalmente simples.",
    },
    {
        q: "Posso levar meu próprio equipamento?",
        a: "Sim! O espaço é seu durante o período reservado. Adapte o consultório conforme as necessidades da sua especialidade.",
    },
    {
        q: "Há estacionamento disponível?",
        a: "Há estacionamentos disponíveis nas proximidades do Edifício Lena Empresarial, na Pituba.",
    },
];

export function Faq() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="w-full bg-white py-16 lg:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#AB8E66]">
                        Dúvidas
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#606958] sm:text-3xl">
                        Perguntas frequentes
                    </h2>
                    <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#87847D]">
                        Respondemos as dúvidas mais comuns de quem quer alugar um consultório na Arthea.
                    </p>
                </div>

                <div className="mt-10 divide-y divide-[#BEB2A4]/40">
                    {items.map((item, i) => (
                        <div key={i}>
                            <button
                                type="button"
                                onClick={() => setOpen(open === i ? null : i)}
                                className="flex w-full items-center justify-between py-5 text-left"
                            >
                                <span className="text-sm font-semibold text-black">{item.q}</span>
                                <FaChevronDown
                                    size={12}
                                    className={`ml-4 shrink-0 text-[#606958] transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                                />
                            </button>
                            {open === i && (
                                <p className="pb-5 text-sm leading-7 text-[#87847D]">{item.a}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
