const steps = [
    {
        number: "01",
        title: "Escolha seu plano",
        text: "Selecione o modelo que melhor se encaixa na sua agenda: por hora, diária ou mensal. Sem fidelidade.",
    },
    {
        number: "02",
        title: "Reserve seus horários",
        text: "Entre em contato pelo WhatsApp e bloqueie os dias e horários que você precisa. Simples e rápido.",
    },
    {
        number: "03",
        title: "Chegue e atenda",
        text: "O espaço já estará pronto para você. Basta chegar, receber seus pacientes e focar no que importa.",
    },
];

export function ComoFunciona() {
    return (
        <section className="w-full bg-[#EEEBE6] py-16 lg:py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#AB8E66]">
                        Processo
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#606958] sm:text-3xl">
                        Como funciona?
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#87847D]">
                        Em três passos simples você já pode começar a atender seus pacientes no Consultório Arthea.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-3">
                    {steps.map((step, i) => (
                        <div key={step.number} className="relative">
                            {/* Linha conectora */}
                            {i < steps.length - 1 && (
                                <div className="absolute left-[calc(100%+12px)] top-5 hidden h-px w-6 bg-[#BEB2A4] sm:block" />
                            )}
                            <div className="rounded-2xl border border-[#BEB2A4]/50 bg-white/70 p-6">
                                <span className="text-3xl font-bold text-[#606958]/20">{step.number}</span>
                                <h3 className="mt-3 text-sm font-semibold text-black">{step.title}</h3>
                                <p className="mt-2 text-xs leading-6 text-[#87847D]">{step.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
