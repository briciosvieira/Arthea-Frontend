export function Location() {
    return (
        <main className="w-full flex items-center justify-center bg-white">
            <section className="w-7xl">
                <div
                    className="flex flex-col md:flex-row items-center md:items-start gap-8
               w-full mx-auto p-8"
                >
                    <div className="flex-1 md:text-left text-[#3b3b3b] text-left">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                            Nossa Localização
                        </h2>
                        <p className="leading-relaxed mb-6">
                            Estamos localizados no <strong>Edifício Lena Empresarial</strong>.
                            Av. Prof Magalhes Neto, 1752 – Pituba,
                            Salvador – BA, 41820-000. Loja 03.
                        </p>

                        <h3 className="text-xl font-medium mb-2">Horário de funcionamento</h3>
                        <p className="leading-relaxed">
                            Segunda a Sábado: <strong>09:00 – 18:00</strong> Agende seu horário!
                        </p>
                    </div>

                    <div className="flex-1 w-full h-52 md:h-76 rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.255815517665!2d-38.4538761!3d-12.9855349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7161b0faf313d31%3A0xe9283c3ac29c28f8!2sEdif%C3%ADcio%20Lena%20Empresarial!5e0!3m2!1spt-BR!2sbr!4v1706820000000!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>
        </main>

    )
}