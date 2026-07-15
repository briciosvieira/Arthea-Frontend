import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactInfo } from "@/components/ui/contact-info";

export const metadata: Metadata = {
    title: "Política de Privacidade",
    description: "Saiba como a Clínica Arthea coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
    alternates: { canonical: "https://clinicaarthea.com.br/privacidade" },
};

export default function PrivacidadePage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-[#EEEBE6] pt-24 pb-16">
                <div className="mx-auto max-w-3xl px-4 sm:px-6">

                    <p className="text-[10px] uppercase tracking-[0.34em] text-[#8A8C76]">Legal</p>
                    <h1 className="mt-2 text-2xl font-semibold text-[#000000] sm:text-3xl">
                        Política de Privacidade
                    </h1>
                    <p className="mt-2 text-xs text-[#87847D]">
                        Última atualização: 29 de junho de 2026
                    </p>

                    <div className="mt-8 space-y-8 text-sm leading-7 text-[#606958]">

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">1. Sobre esta Política</h2>
                            <p className="mt-2">
                                A <strong>Arthea Espaços Profissionais</strong> ("Arthea", "nós" ou "nosso"), localizada na
                                Av. Prof. Magalhães Neto, 1752 — Loja 03, Edifício Lena Empresarial, Pituba, Salvador — BA,
                                é responsável pelo tratamento dos dados pessoais coletados através deste site e dos nossos
                                canais de comunicação.
                            </p>
                            <p className="mt-2">
                                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos
                                suas informações, em conformidade com a Lei Geral de Proteção de Dados Pessoais
                                (Lei n.º 13.709/2018 — LGPD).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">2. Dados que Coletamos</h2>
                            <p className="mt-2">
                                Podemos coletar os seguintes dados pessoais quando você entra em contato conosco,
                                solicita informações ou utiliza nossos serviços:
                            </p>
                            <ul className="mt-3 list-disc pl-5 space-y-1">
                                <li>Nome completo</li>
                                <li>Número de telefone e/ou WhatsApp</li>
                                <li>Endereço de e-mail</li>
                                <li>Especialidade profissional (para profissionais interessados em alugar espaço)</li>
                                <li>Dados de navegação (cookies, endereço IP, páginas visitadas) coletados automaticamente</li>
                            </ul>
                            <p className="mt-2">
                                Não coletamos dados sensíveis de pacientes ou prontuários médicos. Nosso site é
                                voltado exclusivamente para a locação de espaços profissionais.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">3. Finalidade do Tratamento</h2>
                            <p className="mt-2">Utilizamos seus dados para:</p>
                            <ul className="mt-3 list-disc pl-5 space-y-1">
                                <li>Responder solicitações de informação e contato</li>
                                <li>Enviar propostas e informações sobre disponibilidade dos espaços</li>
                                <li>Formalizar e gerenciar contratos de locação</li>
                                <li>Enviar comunicações relevantes sobre nossos serviços (com seu consentimento)</li>
                                <li>Cumprir obrigações legais e regulatórias</li>
                                <li>Melhorar a experiência de navegação no site</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">4. Base Legal</h2>
                            <p className="mt-2">
                                O tratamento de dados é realizado com base em:
                            </p>
                            <ul className="mt-3 list-disc pl-5 space-y-1">
                                <li><strong>Consentimento</strong> — quando você nos fornece seus dados voluntariamente para receber informações</li>
                                <li><strong>Execução de contrato</strong> — para formalizar e gerir locações</li>
                                <li><strong>Legítimo interesse</strong> — para melhorar nossos serviços e comunicação</li>
                                <li><strong>Cumprimento de obrigação legal</strong> — quando exigido por lei</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">5. Compartilhamento de Dados</h2>
                            <p className="mt-2">
                                Não vendemos nem cedemos seus dados a terceiros com finalidade comercial. Podemos
                                compartilhar informações apenas:
                            </p>
                            <ul className="mt-3 list-disc pl-5 space-y-1">
                                <li>Com prestadores de serviços que nos auxiliam na operação (plataformas de agendamento, ferramentas de comunicação), sob obrigação de confidencialidade</li>
                                <li>Quando exigido por autoridade pública ou determinação judicial</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">6. Armazenamento e Segurança</h2>
                            <p className="mt-2">
                                Seus dados são armazenados em ambiente seguro pelo tempo necessário para cumprir as
                                finalidades descritas ou por prazo exigido por lei. Adotamos medidas técnicas e
                                organizacionais para proteger suas informações contra acesso não autorizado, perda ou
                                divulgação indevida.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">7. Seus Direitos (LGPD)</h2>
                            <p className="mt-2">
                                Você tem direito a, a qualquer momento, solicitar:
                            </p>
                            <ul className="mt-3 list-disc pl-5 space-y-1">
                                <li>Confirmação da existência de tratamento dos seus dados</li>
                                <li>Acesso aos dados que temos sobre você</li>
                                <li>Correção de dados incompletos ou incorretos</li>
                                <li>Eliminação dos dados desnecessários</li>
                                <li>Portabilidade dos dados</li>
                                <li>Revogação do consentimento a qualquer momento</li>
                            </ul>
                            <p className="mt-2">
                                Para exercer seus direitos, entre em contato pelo WhatsApp{" "}
                                <ContactInfo variant="inline" />.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">8. Cookies</h2>
                            <p className="mt-2">
                                Utilizamos cookies estritamente necessários para o funcionamento do site e, com seu
                                consentimento, cookies de análise para compreender como o site é utilizado.
                                Você pode configurar seu navegador para recusar cookies, porém algumas funcionalidades
                                podem ficar indisponíveis.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">9. Alterações nesta Política</h2>
                            <p className="mt-2">
                                Esta Política pode ser atualizada periodicamente. A data de última atualização é sempre
                                indicada no topo do documento. Recomendamos que você a consulte regularmente.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-base font-semibold text-[#000000]">10. Contato</h2>
                            <p className="mt-2">
                                Em caso de dúvidas sobre esta Política ou sobre o tratamento dos seus dados:
                            </p>
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
