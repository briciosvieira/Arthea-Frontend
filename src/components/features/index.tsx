import { FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaStar } from "react-icons/fa";
import { FaBuilding, FaHandHoldingHeart } from "react-icons/fa6";

const items = [
    {
        icon: FaMapMarkerAlt,
        title: "Localização estratégica",
        text: "Na Pituba, um dos bairros mais nobres de Salvador, com fácil acesso de qualquer ponto da cidade.",
    },
    {
        icon: FaBuilding,
        title: "Infraestrutura completa",
        text: "Consultórios equipados, Wi-Fi, ar-condicionado e todo o suporte que você precisa para atender bem.",
    },
    {
        icon: FaCalendarAlt,
        title: "Flexibilidade total",
        text: "Planos por hora, diária ou mensal. Monte sua agenda conforme sua necessidade, sem amarras.",
    },
    {
        icon: FaCheckCircle,
        title: "Sem burocracia",
        text: "Processo simples e rápido. Reserve, apareça e atenda. Sem contratos longos nem taxas escondidas.",
    },
    {
        icon: FaHandHoldingHeart,
        title: "Operação simplificada",
        text: "Recepção, limpeza e manutenção incluídos. Você foca no paciente, a gente cuida do resto.",
    },
    {
        icon: FaStar,
        title: "Ambiente profissional",
        text: "Espaço que transmite confiança e credibilidade para os seus pacientes desde o primeiro contato.",
    },
];

export function Diferenciais() {
    return (
        <section className="w-full bg-white py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#AB8E66]">
                        Por que escolher a Arthea
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#606958] sm:text-3xl">
                        Tudo o que você precisa para atender.
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#87847D]">
                        Um espaço pensado para profissionais de saúde que querem atender com qualidade
                        sem se preocupar com a estrutura.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map(({ icon: Icon, title, text }) => (
                        <div
                            key={title}
                            className="rounded-2xl border border-[#BEB2A4]/40 bg-[#EEEBE6]/40 p-6 transition hover:border-[#BEB2A4]/70 hover:bg-[#EEEBE6]/70"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#606958]/10">
                                <Icon size={18} className="text-[#606958]" />
                            </div>
                            <h3 className="mt-4 text-sm font-semibold text-black">{title}</h3>
                            <p className="mt-2 text-xs leading-6 text-[#87847D]">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
