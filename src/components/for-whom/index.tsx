"use client";

import { useEffect, useState } from "react";
import { getSpecialtiesPublic } from "@/app/services/service";
import type { Specialty } from "@/app/services/service";

const BATCH_SIZE = 8;
const ROTATE_MS  = 30_000;

export function ParaQuem() {
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [batchIdx, setBatchIdx]       = useState(0);
    const [visible, setVisible]         = useState(true);

    useEffect(() => {
        getSpecialtiesPublic()
            .then(all => setSpecialties(all.slice(0, 20)))
            .catch(() => {});
    }, []);

    const totalBatches = Math.max(1, Math.ceil(specialties.length / BATCH_SIZE));

    useEffect(() => {
        if (totalBatches <= 1) return;
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setBatchIdx(i => (i + 1) % totalBatches);
                setVisible(true);
            }, 350);
        }, ROTATE_MS);
        return () => clearInterval(interval);
    }, [totalBatches]);

    const batch = specialties.slice(batchIdx * BATCH_SIZE, (batchIdx + 1) * BATCH_SIZE);

    return (
        <section className="w-full bg-white py-16 lg:py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">

                    {/* Texto */}
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#AB8E66]">
                            Ideal para
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#606958] sm:text-3xl">
                            Para quem é o Consultório Arthea?
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-[#87847D]">
                            Atendemos profissionais de saúde que buscam um espaço completo e profissional
                            para receber seus pacientes, sem as dores de cabeça de manter uma clínica própria.
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[#87847D]">
                            Se você precisa de um consultório pronto para uso, com estrutura, localização
                            e flexibilidade, esse espaço é para você.
                        </p>
                    </div>

                    {/* Especialidades rotativas */}
                    <div
                        className="flex flex-wrap gap-2.5 transition-opacity duration-300"
                        style={{ opacity: visible ? 1 : 0 }}
                    >
                        {batch.length > 0 ? (
                            batch.map(s => (
                                <span
                                    key={s.id}
                                    className="rounded-full border border-[#606958]/25 bg-[#606958]/8 px-4 py-2 text-xs font-medium text-[#606958]"
                                >
                                    {s.name}
                                </span>
                            ))
                        ) : (
                            /* Placeholders enquanto carrega */
                            Array.from({ length: 6 }).map((_, i) => (
                                <span
                                    key={i}
                                    className="h-8 w-28 animate-pulse rounded-full bg-[#DCDFCE]"
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
