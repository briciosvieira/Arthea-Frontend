"use client"

import { useFeedback } from "@/components/ui/feedback-provider";
import { Service } from "@/app/services/service";
import type { HeroMedia, SliderImage, QuemSomosImage } from "@/app/services/service";
import { UserIsLogged } from "@/components/utils/userIsLogged";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const service = new Service();
const API_URL = process.env.NEXT_PUBLIC_URL;

export default function MediaPage() {
    const router = useRouter();
    const { showError } = useFeedback();

    const [hero, setHero] = useState<HeroMedia | null>(null);
    const [recepcao, setRecepcao] = useState<SliderImage[]>([]);
    const [consultorio, setConsultorio] = useState<SliderImage[]>([]);
    const [quemSomos, setQuemSomos] = useState<QuemSomosImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sessionStorage.getItem("isLoggedIn") !== "true") {
            router.push("/auth");
            return;
        }
        loadAll();
    }, []);

    async function loadAll() {
        setLoading(true);
        try {
            const [h, r, c, qs] = await Promise.all([
                service.getHero(),
                service.getSlider("RECEPCAO"),
                service.getSlider("CONSULTORIO"),
                service.getQuemSomos(),
            ]);
            setHero(h);
            setRecepcao(r);
            setConsultorio(c);
            setQuemSomos(qs);
        } catch {
            showError({ title: "Erro", message: "Não foi possível carregar os dados de mídia.", confirmLabel: "Fechar" });
        } finally {
            setLoading(false);
        }
    }

    async function handleToggleHeroType() {
        if (!hero) return;
        const newType = hero.type === "VIDEO" ? "IMAGE" : "VIDEO";
        try {
            await service.updateHeroType(newType);
            setHero({ ...hero, type: newType });
        } catch (e) {
            showError({ title: "Erro", message: e instanceof Error ? e.message : "Erro ao atualizar tipo.", confirmLabel: "Fechar" });
        }
    }

    async function handleHeroVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const fd = new FormData();
        fd.append("file", file);
        try {
            await service.uploadHeroVideo(fd);
            await loadAll();
        } catch (err) {
            showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro ao enviar vídeo.", confirmLabel: "Fechar" });
        }
        e.target.value = "";
    }

    async function handleHeroImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const fd = new FormData();
        fd.append("file", file);
        try {
            await service.uploadHeroImage(fd);
            await loadAll();
        } catch (err) {
            showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro ao enviar imagem.", confirmLabel: "Fechar" });
        }
        e.target.value = "";
    }

    async function handleSliderUpload(section: string, e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const fd = new FormData();
        fd.append("file", file);
        try {
            await service.addSliderImage(section, fd);
            await loadAll();
        } catch (err) {
            showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro ao adicionar imagem.", confirmLabel: "Fechar" });
        }
        e.target.value = "";
    }

    async function handleToggleSlider(section: string, id: string, active: boolean) {
        try {
            await service.updateSliderImage(section, id, { active: !active });
            await loadAll();
        } catch (err) {
            showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro ao atualizar.", confirmLabel: "Fechar" });
        }
    }

    async function handleDeleteSlider(section: string, id: string) {
        try {
            await service.deleteSliderImage(section, id);
            await loadAll();
        } catch (err) {
            showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro ao excluir.", confirmLabel: "Fechar" });
        }
    }

    async function handleQuemSomosUpload(position: number, e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const fd = new FormData();
        fd.append("file", file);
        try {
            await service.uploadQuemSomosImage(position, fd);
            await loadAll();
        } catch (err) {
            showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro ao enviar imagem.", confirmLabel: "Fechar" });
        }
        e.target.value = "";
    }

    async function handleDeleteQuemSomos(position: number) {
        try {
            await service.deleteQuemSomosImage(position);
            await loadAll();
        } catch (err) {
            showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro ao remover.", confirmLabel: "Fechar" });
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center bg-[#36534ea4] text-white">
                <p className="text-white/70">Carregando...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full bg-[#36534ea4] text-white px-4 py-8">
            <div className="fixed top-4 right-4">
                <UserIsLogged />
            </div>

            <div className="max-w-5xl mx-auto pt-16">
                <h1 className="text-2xl font-semibold mb-8">Gestão de Conteúdo</h1>

                {/* Hero */}
                <section className="bg-white/10 rounded-2xl p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-1">Hero — Tela Inicial</h2>
                    <p className="text-sm text-white/50 mb-5">Escolha se a tela inicial exibe vídeo ou imagem como fundo.</p>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-sm text-white/70">Exibindo atualmente:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${hero?.type === "VIDEO" ? "bg-blue-500/30 text-blue-200" : "bg-emerald-500/30 text-emerald-200"}`}>
                            {hero?.type === "VIDEO" ? "Vídeo" : "Imagem"}
                        </span>
                        <button
                            onClick={handleToggleHeroType}
                            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition"
                        >
                            Alternar para {hero?.type === "VIDEO" ? "Imagem" : "Vídeo"}
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-xl p-4">
                            <p className="text-sm font-medium mb-1">
                                Vídeo {hero?.type === "VIDEO" && <span className="text-emerald-300 text-xs">(ativo)</span>}
                            </p>
                            <p className="text-xs text-white/40 truncate mb-3">
                                {hero?.videoPath ?? "Nenhum vídeo enviado"}
                            </p>
                            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#17312d] hover:bg-[#21433d] rounded-xl text-sm transition">
                                {hero?.videoPath ? "Substituir vídeo" : "Enviar vídeo"} (MP4)
                                <input type="file" accept="video/mp4" className="hidden" onChange={handleHeroVideoUpload} />
                            </label>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4">
                            <p className="text-sm font-medium mb-2">
                                Imagem {hero?.type === "IMAGE" && <span className="text-emerald-300 text-xs">(ativa)</span>}
                            </p>
                            {hero?.imagePath ? (
                                <img
                                    src={`${API_URL}${hero.imagePath}`}
                                    alt="Hero image"
                                    className="w-full h-28 object-cover rounded-xl mb-3"
                                />
                            ) : (
                                <div className="w-full h-28 bg-white/5 rounded-xl mb-3 flex items-center justify-center">
                                    <p className="text-xs text-white/40">Sem imagem</p>
                                </div>
                            )}
                            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#17312d] hover:bg-[#21433d] rounded-xl text-sm transition">
                                {hero?.imagePath ? "Substituir imagem" : "Enviar imagem"}
                                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleHeroImageUpload} />
                            </label>
                        </div>
                    </div>
                </section>

                {/* Slider Recepção */}
                <SliderSection
                    title="Slider — Recepção"
                    images={recepcao}
                    onUpload={(e) => handleSliderUpload("RECEPCAO", e)}
                    onToggle={(id, active) => handleToggleSlider("RECEPCAO", id, active)}
                    onDelete={(id) => handleDeleteSlider("RECEPCAO", id)}
                />

                {/* Slider Consultórios */}
                <SliderSection
                    title="Slider — Consultórios"
                    images={consultorio}
                    onUpload={(e) => handleSliderUpload("CONSULTORIO", e)}
                    onToggle={(id, active) => handleToggleSlider("CONSULTORIO", id, active)}
                    onDelete={(id) => handleDeleteSlider("CONSULTORIO", id)}
                />

                {/* Quem Somos */}
                <section className="bg-white/10 rounded-2xl p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-1">Quem Somos</h2>
                    <p className="text-sm text-white/50 mb-5">Duas imagens exibidas na seção sobre a clínica.</p>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {[1, 2].map((pos) => {
                            const img = quemSomos.find((i) => i.position === pos);
                            return (
                                <div key={pos} className="bg-white/5 rounded-xl p-4">
                                    <p className="text-sm font-medium mb-3">Imagem {pos}</p>
                                    {img ? (
                                        <img
                                            src={`${API_URL}${img.filePath}`}
                                            alt={`Quem Somos ${pos}`}
                                            className="w-full h-44 object-cover rounded-xl mb-3"
                                        />
                                    ) : (
                                        <div className="w-full h-44 bg-white/5 rounded-xl mb-3 flex items-center justify-center">
                                            <p className="text-xs text-white/40">Sem imagem</p>
                                        </div>
                                    )}
                                    <div className="flex gap-2">
                                        <label className="cursor-pointer flex-1 text-center px-3 py-2 bg-[#17312d] hover:bg-[#21433d] rounded-xl text-sm transition">
                                            {img ? "Substituir" : "Enviar imagem"}
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                className="hidden"
                                                onChange={(e) => handleQuemSomosUpload(pos, e)}
                                            />
                                        </label>
                                        {img && (
                                            <button
                                                onClick={() => handleDeleteQuemSomos(pos)}
                                                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-xl text-sm transition"
                                            >
                                                Remover
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <Link
                    href="/"
                    className="inline-block mt-2 mb-10 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition"
                >
                    Voltar
                </Link>
            </div>
        </main>
    );
}

function SliderSection({
    title,
    images,
    onUpload,
    onToggle,
    onDelete,
}: {
    title: string;
    images: SliderImage[];
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onToggle: (id: string, active: boolean) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <section className="bg-white/10 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-semibold">{title}</h2>
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#17312d] hover:bg-[#21433d] rounded-xl text-sm transition">
                    + Adicionar
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onUpload} />
                </label>
            </div>
            <p className="text-sm text-white/50 mb-5">
                Imagens ocultas não aparecem no site mas ficam salvas para uso futuro.
            </p>

            {images.length === 0 ? (
                <p className="text-sm text-white/40">Nenhuma imagem cadastrada.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {images.map((img) => (
                        <div
                            key={img.id}
                            className={`relative rounded-xl overflow-hidden transition ${!img.active ? "opacity-50 grayscale" : ""}`}
                        >
                            <img
                                src={`${API_URL}${img.filePath}`}
                                alt="Slider"
                                className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 flex gap-1 p-2 bg-black/60">
                                <button
                                    onClick={() => onToggle(img.id, img.active)}
                                    className={`flex-1 text-xs py-1 rounded-lg transition ${
                                        img.active
                                            ? "bg-yellow-500/30 text-yellow-200 hover:bg-yellow-500/50"
                                            : "bg-emerald-500/30 text-emerald-200 hover:bg-emerald-500/50"
                                    }`}
                                >
                                    {img.active ? "Ocultar" : "Mostrar"}
                                </button>
                                <button
                                    onClick={() => onDelete(img.id)}
                                    className="px-2 py-1 text-xs bg-red-500/30 text-red-200 hover:bg-red-500/50 rounded-lg transition"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
