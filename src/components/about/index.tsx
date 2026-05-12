import Image from "next/image";
import { ShowcaseCard } from "@/components/shared/showcase-card";

export function About() {
    return (
        <main id="about" className="flex flex-col items-center justify-center scroll-smooth">
            <section className="mt-10 w-full max-w-6xl rounded-[32px] bg-white px-4 py-10 md:px-8">
                <div className="grid items-center gap-8 md:grid-cols-[380px_1fr]">
                    <ShowcaseCard
                        src="/conjuntofotos.png"
                        alt="Ambientes da clínica Arthea"
                        width={400}
                        height={520}
                        className="mx-auto w-full max-w-[400px]"
                        imageClassName="md:h-[520px]"
                        priority
                    />

                    <div className="w-full px-1 md:px-4">
                        <div className="max-w-[600px]">
                            <h3 className="text-center text-xl font-medium text-black sm:text-2xl md:text-left">
                                Quem Somos
                            </h3>

                            <p className="mt-6 text-justify text-[18px] leading-relaxed text-black sm:text-[20px]">
                                A Arthea nasceu para oferecer cuidado em saúde com atenção humana,
                                ambiente acolhedor e tecnologia que simplifica a sua jornada...
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full max-w-6xl bg-white py-16 mt-25">
                <div className="grid gap-10 md:grid-cols-[1fr_360px] md:items-start">
                    
                    <div className="flex flex-col justify-center gap-8 px-6 md:min-h-[620px]">

                        <div className="flex items-start gap-5">
                            <Image
                                src="/predio.png"
                                alt="Estrutura completa"
                                width={64}
                                height={64}
                                className="object-contain"
                            />
                            <p className="text-[20px] leading-relaxed text-black">
                                Localizada na Pituba, temos uma estrutura completa de consultório de alto padrão.
                                Traga apenas seu carimbo e caneta.
                            </p>
                        </div>

                        <div className="flex items-start gap-5">
                            <Image
                                src="/calender.png"
                                alt="Procedimentos"
                                width={64}
                                height={64}
                                className="object-contain"
                            />
                            <p className="text-[20px] leading-relaxed text-black">
                                Materiais para pequenas cirurgias, procedimentos médicos e estéticos.
                            </p>
                        </div>

                        <div className="flex items-start gap-5">
                            <Image
                                src="/material.png"
                                alt="Pagamento e reservas"
                                width={64}
                                height={64}
                                className="object-contain"
                            />
                            <p className="text-[20px] leading-relaxed text-black">
                                O paciente paga diretamente na sua maquininha. Você só paga pelas reservas e produtos usados, no mês seguinte.
                            </p>
                        </div>

                        <div className="flex items-start gap-5">
                            <Image
                                src="/equipe.png"
                                alt="Equipe de apoio"
                                width={64}
                                height={64}
                                className="object-contain"
                            />
                            <p className="text-[20px] leading-relaxed text-black">
                                Oferecemos a equipe e a estrutura para você focar na sua carreira.
                            </p>
                        </div>
                    </div>

                    <div className="px-6 ">
                        <ShowcaseCard
                            src="/conjuntofotos.png"
                            alt="Estrutura e equipe da clínica"
                            width={350}
                            height={420}
                            className="mx-auto w-full max-w-[350px]"
                            imageClassName="md:h-[620px]"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
