import Link from "next/link";

export function Location() {
    return (
        <section className="w-full bg-white py-16">
            <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 lg:grid-cols-[1.05fr_1fr] lg:px-6">
                <div className="rounded-[32px] border border-[#d9cfbf] bg-[#f5efe6] p-6 shadow-[0_20px_48px_rgba(24,39,34,0.08)] sm:p-8">
                    <p className="text-xs uppercase tracking-[0.32em] text-[#606958]">
                        Nossa localização
                    </p>

                    <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#17312d] sm:text-4xl">
                        Estrutura bem posicionada para receber profissionais e pacientes com conforto.
                    </h2>

                    <p className="mt-6 text-base leading-8 text-[#44524e]">
                        Estamos no <strong>Edifício Lena Empresarial</strong>, em uma região estratégica da Pituba,
                        com acesso prático e ambiente preparado para uma experiência mais organizada e acolhedora.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[24px] border border-[#d9cfbf] bg-white p-5">
                            <p className="text-[11px] uppercase tracking-[0.26em] text-[#606958]">Endereço</p>
                            <p className="mt-3 text-sm leading-7 text-[#44524e]">
                                Av. Prof. Magalhães Neto, 1752
                                <br />
                                Pituba, Salvador - BA
                                <br />
                                Loja 03, Edifício Lena Empresarial
                            </p>
                        </div>

                        <div className="rounded-[24px] border border-[#d9cfbf] bg-white p-5">
                            <p className="text-[11px] uppercase tracking-[0.26em] text-[#606958]">Funcionamento</p>
                            <p className="mt-3 text-sm leading-7 text-[#44524e]">
                                Segunda a sábado
                                <br />
                                <strong className="text-[#17312d]">09:00 às 18:00</strong>
                                <br />
                                Atendimento com agendamento
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="https://wa.me/5571981441233"
                            className="inline-flex items-center justify-center rounded-full bg-[#17312d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#21433d]"
                        >
                            Falar com a clínica
                        </Link>

                        <Link
                            href="https://www.google.com/maps/place/Edif%C3%ADcio+Lena+Empresarial"
                            className="inline-flex items-center justify-center rounded-full border border-[#cdbda2] px-6 py-3 text-sm font-semibold text-[#17312d] transition hover:bg-[#efe4d2]"
                        >
                            Abrir no mapa
                        </Link>
                    </div>
                </div>

                <div className="overflow-hidden rounded-[32px] border border-[#d9cfbf] bg-[#f5efe6] p-3 shadow-[0_20px_48px_rgba(24,39,34,0.08)]">
                    <div className="h-[320px] overflow-hidden rounded-[26px] sm:h-[420px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.255815517665!2d-38.4538761!3d-12.9855349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7161b0faf313d31%3A0xe9283c3ac29c28f8!2sEdif%C3%ADcio%20Lena%20Empresarial!5e0!3m2!1spt-BR!2sbr!4v1706820000000!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa da localização da Clínica Arthea"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
