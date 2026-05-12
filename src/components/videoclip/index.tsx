"use client";

import Link from "next/link";

export function Videoclip() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source src="/video/videoclip.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(11,25,22,0.92)_0%,rgba(20,47,41,0.62)_44%,rgba(11,25,22,0.38)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,199,162,0.22),transparent_34%)]" />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-16 pt-28 sm:px-8 lg:px-10">
                <div className="max-w-3xl">
                    <p className="text-xs uppercase tracking-[0.34em] text-[#d9c7a2] sm:text-sm">
                        Clínica Arthea
                    </p>



                    <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                        Ambiente sofisticado, operação funcional e apoio para você focar no atendimento.
                        A Arthea foi pensada para unir experiência, praticidade e imagem profissional em um só lugar.
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Link
                            className="inline-flex items-center justify-center rounded-full bg-[#d9c7a2] px-6 py-3 text-sm font-semibold text-[#17312d] transition hover:bg-[#ead9b7] sm:text-base"
                            href="https://wa.me/5571981441233"
                        >
                            Quero saber mais
                        </Link>

                        <button
                            type="button"
                            onClick={() => {
                                const element = document.getElementById("about");
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                                }
                            }}
                            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/14 sm:text-base"
                        >
                            Conhecer a estrutura
                        </button>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-[#d9c7a2]">Localização</p>
                            <p className="mt-3 text-sm leading-6 text-white/80">
                                Pituba, Salvador, em ponto estratégico para pacientes e profissionais.
                            </p>
                        </div>

                        <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-[#d9c7a2]">Estrutura</p>
                            <p className="mt-3 text-sm leading-6 text-white/80">
                                Espaços preparados para rotina clínica, procedimentos e experiência premium.
                            </p>
                        </div>

                        <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-[#d9c7a2]">Operação</p>
                            <p className="mt-3 text-sm leading-6 text-white/80">
                                Reservas práticas, apoio local e ambiente pronto para o seu atendimento.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
