import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactInfo } from "@/components/ui/contact-info";

export const metadata: Metadata = {
    title: "Termos de Uso",
    description: "Conheça as condições de uso e locação dos espaços profissionais da Clínica Arthea em Pituba, Salvador.",
    alternates: { canonical: "https://clinicaarthea.com.br/termos" },
};

export default function TermosPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-[#EEEBE6] pt-24 pb-16">
                <div className="mx-auto max-w-3xl px-4 sm:px-6">

                    <p className="text-[10px] uppercase tracking-[0.34em] text-[#8A8C76]">Legal</p>
                    <h1 className="mt-2 text-2xl font-semibold text-[#000000] sm:text-3xl">
                        Termos de Uso
                    </h1>
                    <p className="mt-2 text-xs text-[#87847D]">
                        Última atualização: 29 de junho de 2026
                    </p>

                    <div className="mt-8 space-y-8 text-sm leading-7 text-[#606958]">

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">1. Aceitação dos Termos</h2>
                            <p className="mt-2">
                                Ao utilizar o site da <strong>Arthea Espaços Profissionais</strong> ("Arthea"),
                                entrar em contato conosco ou realizar uma locação de espaço, você declara que leu,
                                compreendeu e concorda com estes Termos de Uso. Caso não concorde com alguma disposição,
                                solicitamos que não utilize nossos serviços.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">2. Sobre o Espaço Arthea</h2>
                            <p className="mt-2">
                                A Arthea disponibiliza espaços profissionais para locação temporária por hora, turno
                                ou período, destinados exclusivamente a profissionais legalmente habilitados nas áreas
                                de saúde, estética, bem-estar, terapia e demais atividades de atendimento particular.
                            </p>
                            <p className="mt-2">
                                Nossos espaços estão localizados na Av. Prof. Magalhães Neto, 1752 — Loja 03,
                                Edifício Lena Empresarial, Pituba, Salvador — BA, e são disponibilizados totalmente
                                equipados e prontos para uso.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">3. Elegibilidade</h2>
                            <p className="mt-2">Os espaços da Arthea são destinados a:</p>
                            <ul className="mt-3 list-disc pl-5 space-y-1">
                                <li>Médicos e demais profissionais de saúde com registro ativo no respectivo conselho</li>
                                <li>Profissionais de estética, fisioterapia e terapias integradas</li>
                                <li>Psicólogos, nutricionistas, fonoaudiólogos e demais especialistas da saúde</li>
                                <li>Demais profissionais de atendimento particular, sujeitos a avaliação prévia</li>
                            </ul>
                            <p className="mt-2">
                                A Arthea reserva o direito de recusar reservas que não estejam alinhadas com
                                a proposta do espaço ou que infrinjam normas legais e sanitárias.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">4. Condições de Locação</h2>
                            <ul className="mt-2 list-disc pl-5 space-y-1">
                                <li>As reservas devem ser realizadas com antecedência mínima a ser informada no momento da negociação</li>
                                <li>O locatário é responsável pelo uso adequado do espaço, mobiliário e equipamentos disponibilizados</li>
                                <li>É proibido sublocar ou ceder o espaço a terceiros sem autorização expressa da Arthea</li>
                                <li>O uso do espaço deve respeitar o horário contratado, sem ultrapassá-lo sem nova autorização</li>
                                <li>O locatário deve deixar o espaço nas mesmas condições em que o recebeu</li>
                                <li>Danos causados ao espaço ou aos equipamentos serão de responsabilidade do locatário</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">5. Responsabilidades do Locatário</h2>
                            <p className="mt-2">O profissional locatário é inteiramente responsável por:</p>
                            <ul className="mt-3 list-disc pl-5 space-y-1">
                                <li>Manter seu registro profissional ativo e em dia com o respectivo conselho</li>
                                <li>Cumprir as normas éticas e legais da sua profissão durante os atendimentos</li>
                                <li>Garantir sigilo e privacidade dos seus pacientes/clientes dentro do espaço</li>
                                <li>Adquirir e utilizar os materiais e insumos necessários para seus procedimentos</li>
                                <li>Dispor adequadamente de resíduos biológicos ou perfurocortantes, quando aplicável</li>
                                <li>Contratar seguro profissional de responsabilidade civil, quando exigido pela categoria</li>
                            </ul>
                            <p className="mt-2">
                                A Arthea não se responsabiliza por quaisquer danos ou incidentes decorrentes dos
                                atendimentos realizados pelos profissionais locatários.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">6. Cancelamentos e Reagendamentos</h2>
                            <p className="mt-2">
                                As condições de cancelamento e reagendamento serão informadas no momento da negociação
                                e confirmadas por escrito. Em geral:
                            </p>
                            <ul className="mt-3 list-disc pl-5 space-y-1">
                                <li>Cancelamentos com antecedência superior a 24 horas: sujeitos a política de reembolso acordada</li>
                                <li>Cancelamentos com menos de 24 horas de antecedência: podem incorrer em cobrança parcial ou total</li>
                                <li>Ausências sem aviso: consideram-se como uso do espaço para fins de cobrança</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">7. Uso do Site</h2>
                            <p className="mt-2">
                                Este site é disponibilizado apenas para fins informativos e de contato. É proibido:
                            </p>
                            <ul className="mt-3 list-disc pl-5 space-y-1">
                                <li>Utilizar o site para fins ilícitos ou que violem direitos de terceiros</li>
                                <li>Tentar acessar áreas restritas sem autorização</li>
                                <li>Reproduzir conteúdo, imagens ou marcas da Arthea sem autorização prévia por escrito</li>
                                <li>Realizar ações que possam comprometer a segurança ou o funcionamento do site</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">8. Propriedade Intelectual</h2>
                            <p className="mt-2">
                                Todos os conteúdos deste site — incluindo textos, imagens, logotipos, identidade visual
                                e layout — são propriedade da Arthea ou utilizados sob licença, sendo protegidos pela
                                legislação de propriedade intelectual. Qualquer reprodução não autorizada é proibida.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">9. Limitação de Responsabilidade</h2>
                            <p className="mt-2">
                                A Arthea não se responsabiliza por danos indiretos, consequentes ou incidentais
                                decorrentes do uso ou da impossibilidade de uso dos espaços ou do site, incluindo
                                perda de receita, perda de dados ou danos à reputação profissional.
                            </p>
                            <p className="mt-2">
                                O site pode conter links para sites externos. A Arthea não é responsável pelo
                                conteúdo, práticas de privacidade ou serviços oferecidos por esses sites.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">10. Legislação Aplicável e Foro</h2>
                            <p className="mt-2">
                                Estes Termos são regidos pela legislação brasileira. Eventuais disputas serão submetidas
                                ao foro da comarca de Salvador — BA, com renúncia a qualquer outro, por mais
                                privilegiado que seja.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">11. Alterações</h2>
                            <p className="mt-2">
                                A Arthea pode atualizar estes Termos a qualquer momento. As alterações entram em vigor
                                a partir da publicação da nova versão neste site. Recomendamos a consulta periódica.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">12. Contato</h2>
                            <p className="mt-2">Para dúvidas sobre estes Termos:</p>
                            <ContactInfo variant="card" />
                        </section>

                    </div>

                    <div className="mt-10">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#BEB2A4] bg-white/60 px-4 py-2 text-xs font-medium text-[#606958] transition hover:bg-[#DCDFCE]"
                        >
                            ← Voltar ao site
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
