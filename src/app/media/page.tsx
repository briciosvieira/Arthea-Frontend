"use client"

import { useFeedback } from "@/components/ui/feedback-provider";
import { Service } from "@/app/services/service";
import type { HeroMedia, SliderImage, QuemSomosImage, Specialty, SocialLink, SocialLinkType } from "@/app/services/service";
import { UserIsLogged } from "@/components/utils/userIsLogged";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const service = new Service();
const API_URL = process.env.NEXT_PUBLIC_URL;

const SOCIAL_TYPES: { value: SocialLinkType; label: string; hint?: string }[] = [
    { value: "WHATSAPP",  label: "WhatsApp",    hint: "Número sem + nem espaços, ex: 5571981441233" },
    { value: "INSTAGRAM", label: "Instagram",   hint: "URL completa: https://instagram.com/..." },
    { value: "FACEBOOK",  label: "Facebook",    hint: "URL completa: https://facebook.com/..." },
    { value: "LINKEDIN",  label: "LinkedIn",    hint: "URL completa: https://linkedin.com/..." },
    { value: "YOUTUBE",   label: "YouTube",     hint: "URL completa: https://youtube.com/..." },
    { value: "TIKTOK",    label: "TikTok",      hint: "URL completa: https://tiktok.com/..." },
    { value: "TWITTER",   label: "Twitter / X", hint: "URL completa: https://twitter.com/..." },
    { value: "ADDRESS",   label: "Endereço",    hint: "Texto do endereço" },
    { value: "OTHER",     label: "Outro",       hint: "URL ou texto livre" },
];

export default function MediaPage() {
    const router = useRouter();
    const { showError } = useFeedback();

    const [hero, setHero] = useState<HeroMedia | null>(null);
    const [recepcao, setRecepcao] = useState<SliderImage[]>([]);
    const [consultorio, setConsultorio] = useState<SliderImage[]>([]);
    const [quemSomos, setQuemSomos] = useState<QuemSomosImage[]>([]);
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sessionStorage.getItem("isLoggedIn") !== "true") {
            router.push("/auth");
            return;
        }
        loadAll();
    }, []);

    async function loadAll(silent = false) {
        if (!silent) setLoading(true);
        try {
            const [h, r, c, qs, sp, sl] = await Promise.all([
                service.getHero(),
                service.getSlider("RECEPCAO"),
                service.getSlider("CONSULTORIO"),
                service.getQuemSomos(),
                service.getSpecialties(),
                service.getSocialLinks(),
            ]);
            setHero(h);
            setRecepcao(r);
            setConsultorio(c);
            setQuemSomos(qs);
            setSpecialties(sp);
            setSocialLinks(sl);
        } catch {
            if (!silent) showError({ title: "Erro", message: "Não foi possível carregar os dados.", confirmLabel: "Fechar" });
        } finally {
            if (!silent) setLoading(false);
        }
    }

    // ── Hero handlers ────────────────────────────────────────────────────────

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
        try { await service.uploadHeroVideo(fd); await loadAll(true); }
        catch (err) { showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro.", confirmLabel: "Fechar" }); }
        e.target.value = "";
    }

    async function handleHeroImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const fd = new FormData();
        fd.append("file", file);
        try { await service.uploadHeroImage(fd); await loadAll(true); }
        catch (err) { showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro.", confirmLabel: "Fechar" }); }
        e.target.value = "";
    }

    // ── Slider handlers ──────────────────────────────────────────────────────

    async function handleSliderUpload(section: string, e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const fd = new FormData();
        fd.append("file", file);
        try { await service.addSliderImage(section, fd); await loadAll(true); }
        catch (err) { showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro.", confirmLabel: "Fechar" }); }
        e.target.value = "";
    }

    async function handleToggleSlider(section: string, id: string, active: boolean) {
        try { await service.updateSliderImage(section, id, { active: !active }); await loadAll(true); }
        catch (err) { showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro.", confirmLabel: "Fechar" }); }
    }

    async function handleDeleteSlider(section: string, id: string) {
        try { await service.deleteSliderImage(section, id); await loadAll(true); }
        catch (err) { showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro.", confirmLabel: "Fechar" }); }
    }

    // ── Quem Somos handlers ──────────────────────────────────────────────────

    async function handleQuemSomosUpload(position: number, e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const fd = new FormData();
        fd.append("file", file);
        try { await service.uploadQuemSomosImage(position, fd); await loadAll(true); }
        catch (err) { showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro.", confirmLabel: "Fechar" }); }
        e.target.value = "";
    }

    async function handleDeleteQuemSomos(position: number) {
        try { await service.deleteQuemSomosImage(position); await loadAll(true); }
        catch (err) { showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro.", confirmLabel: "Fechar" }); }
    }

    // ── Specialties handlers — atualiza estado local, sem reload ─────────────

    async function handleAddSpecialty(name: string, description: string) {
        try {
            const created = await service.createSpecialty({ name, description });
            setSpecialties(prev => [...prev, created]);
        }
        catch (err) { showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro.", confirmLabel: "Fechar" }); }
    }

    async function handleDeleteSpecialty(id: string) {
        try {
            await service.deleteSpecialty(id);
            setSpecialties(prev => prev.filter(s => s.id !== id));
        }
        catch (err) { showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro.", confirmLabel: "Fechar" }); }
    }

    // ── Social Links handlers — atualiza estado local, sem reload ────────────

    async function handleAddSocialLink(data: { type: string; value: string; label?: string }) {
        try {
            const created = await service.createSocialLink(data);
            setSocialLinks(prev => [...prev, created]);
        }
        catch (err) { showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro.", confirmLabel: "Fechar" }); }
    }

    async function handleUpdateSocialLink(id: string, data: { type?: string; value?: string; label?: string }) {
        try {
            const updated = await service.updateSocialLink(id, data);
            setSocialLinks(prev => prev.map(l => l.id === id ? updated : l));
        }
        catch (err) { showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro.", confirmLabel: "Fechar" }); }
    }

    async function handleDeleteSocialLink(id: string) {
        try {
            await service.deleteSocialLink(id);
            setSocialLinks(prev => prev.filter(l => l.id !== id));
        }
        catch (err) { showError({ title: "Erro", message: err instanceof Error ? err.message : "Erro.", confirmLabel: "Fechar" }); }
    }

    // ── Loading ──────────────────────────────────────────────────────────────

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
                        <button onClick={handleToggleHeroType} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition">
                            Alternar para {hero?.type === "VIDEO" ? "Imagem" : "Vídeo"}
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-xl p-4">
                            <p className="text-sm font-medium mb-1">
                                Vídeo {hero?.type === "VIDEO" && <span className="text-emerald-300 text-xs">(ativo)</span>}
                            </p>
                            <p className="text-xs text-white/40 truncate mb-3">{hero?.videoPath ?? "Nenhum vídeo enviado"}</p>
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
                                <img src={`${API_URL}${hero.imagePath}`} alt="Hero" className="w-full h-28 object-cover rounded-xl mb-3" />
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

                {/* Sliders */}
                <SliderSection
                    title="Slider — Recepção"
                    images={recepcao}
                    onUpload={(e) => handleSliderUpload("RECEPCAO", e)}
                    onToggle={(id, active) => handleToggleSlider("RECEPCAO", id, active)}
                    onDelete={(id) => handleDeleteSlider("RECEPCAO", id)}
                />
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
                                        <img src={`${API_URL}${img.filePath}`} alt={`Quem Somos ${pos}`} className="w-full h-44 object-cover rounded-xl mb-3" />
                                    ) : (
                                        <div className="w-full h-44 bg-white/5 rounded-xl mb-3 flex items-center justify-center">
                                            <p className="text-xs text-white/40">Sem imagem</p>
                                        </div>
                                    )}
                                    <div className="flex gap-2">
                                        <label className="cursor-pointer flex-1 text-center px-3 py-2 bg-[#17312d] hover:bg-[#21433d] rounded-xl text-sm transition">
                                            {img ? "Substituir" : "Enviar imagem"}
                                            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => handleQuemSomosUpload(pos, e)} />
                                        </label>
                                        {img && (
                                            <button onClick={() => handleDeleteQuemSomos(pos)} className="px-3 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-xl text-sm transition">
                                                Remover
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Especialidades */}
                <SpecialtiesSection
                    items={specialties}
                    onAdd={handleAddSpecialty}
                    onDelete={handleDeleteSpecialty}
                />

                {/* Redes Sociais */}
                <SocialLinksSection
                    items={socialLinks}
                    onAdd={handleAddSocialLink}
                    onUpdate={handleUpdateSocialLink}
                    onDelete={handleDeleteSocialLink}
                />

                <Link href="/" className="inline-block mt-2 mb-10 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition">
                    Voltar
                </Link>
            </div>
        </main>
    );
}

// ── SliderSection ────────────────────────────────────────────────────────────

function SliderSection({ title, images, onUpload, onToggle, onDelete }: {
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
            <p className="text-sm text-white/50 mb-5">Imagens ocultas não aparecem no site mas ficam salvas para uso futuro.</p>
            {images.length === 0 ? (
                <p className="text-sm text-white/40">Nenhuma imagem cadastrada.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {images.map((img) => (
                        <div key={img.id} className={`relative rounded-xl overflow-hidden transition ${!img.active ? "opacity-50 grayscale" : ""}`}>
                            <img src={`${process.env.NEXT_PUBLIC_URL}${img.filePath}`} alt="Slider" className="w-full h-32 object-cover" />
                            <div className="absolute inset-x-0 bottom-0 flex gap-1 p-2 bg-black/60">
                                <button
                                    onClick={() => onToggle(img.id, img.active)}
                                    className={`flex-1 text-xs py-1 rounded-lg transition ${img.active ? "bg-yellow-500/30 text-yellow-200 hover:bg-yellow-500/50" : "bg-emerald-500/30 text-emerald-200 hover:bg-emerald-500/50"}`}
                                >
                                    {img.active ? "Ocultar" : "Mostrar"}
                                </button>
                                <button onClick={() => onDelete(img.id)} className="px-2 py-1 text-xs bg-red-500/30 text-red-200 hover:bg-red-500/50 rounded-lg transition">✕</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

// ── SpecialtiesSection ───────────────────────────────────────────────────────

function SpecialtiesSection({ items, onAdd, onDelete }: {
    items: Specialty[];
    onAdd: (name: string, description: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim()) return;
        setSaving(true);
        try { await onAdd(name.trim(), desc.trim()); setName(""); setDesc(""); }
        finally { setSaving(false); }
    }

    return (
        <section className="bg-white/10 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-1">Especialidades</h2>
            <p className="text-sm text-white/50 mb-5">Cadastre as especialidades médicas disponíveis na clínica.</p>

            <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl p-4 mb-5">
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nome da especialidade *"
                        required
                        className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-white/30"
                    />
                    <div className="relative">
                        <input
                            value={desc}
                            onChange={e => setDesc(e.target.value.slice(0, 80))}
                            placeholder="Descrição (máx. 80 caracteres)"
                            className="w-full rounded-xl bg-white/10 px-3 py-2 pr-12 text-sm text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-white/30"
                        />
                        <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${desc.length >= 80 ? "text-red-400" : "text-white/30"}`}>
                            {desc.length}/80
                        </span>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={saving || !name.trim()}
                    className="px-5 py-2 bg-[#17312d] hover:bg-[#21433d] rounded-xl text-sm transition disabled:opacity-50"
                >
                    {saving ? "Salvando..." : "+ Adicionar"}
                </button>
            </form>

            {items.length === 0 ? (
                <p className="text-sm text-white/40">Nenhuma especialidade cadastrada.</p>
            ) : (
                <div className="space-y-2">
                    {items.map(item => (
                        <div key={item.id} className="flex items-start justify-between gap-3 bg-white/5 rounded-xl px-4 py-3">
                            <div>
                                <p className="text-sm font-medium">{item.name}</p>
                                {item.description && <p className="mt-0.5 text-xs text-white/50">{item.description}</p>}
                            </div>
                            <button
                                onClick={() => onDelete(item.id)}
                                className="shrink-0 px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg transition"
                            >
                                Excluir
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

// ── SocialLinksSection ───────────────────────────────────────────────────────

function SocialLinksSection({ items, onAdd, onUpdate, onDelete }: {
    items: SocialLink[];
    onAdd: (data: { type: string; value: string; label?: string }) => Promise<void>;
    onUpdate: (id: string, data: { type?: string; value?: string; label?: string }) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}) {
    const [type, setType]   = useState<SocialLinkType>("WHATSAPP");
    const [value, setValue] = useState("");
    const [label, setLabel] = useState("");
    const [saving, setSaving] = useState(false);

    const [editId, setEditId]       = useState<string | null>(null);
    const [editType, setEditType]   = useState<SocialLinkType>("WHATSAPP");
    const [editValue, setEditValue] = useState("");
    const [editLabel, setEditLabel] = useState("");
    const [editSaving, setEditSaving] = useState(false);

    const currentHint = SOCIAL_TYPES.find(t => t.value === type)?.hint ?? "";
    const editHint    = SOCIAL_TYPES.find(t => t.value === editType)?.hint ?? "";

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!value.trim()) return;
        setSaving(true);
        try { await onAdd({ type, value: value.trim(), label: label.trim() || undefined }); setValue(""); setLabel(""); }
        finally { setSaving(false); }
    }

    function startEdit(item: SocialLink) {
        setEditId(item.id);
        setEditType(item.type);
        setEditValue(item.value);
        setEditLabel(item.label ?? "");
    }

    async function handleSaveEdit() {
        if (!editId) return;
        setEditSaving(true);
        try {
            await onUpdate(editId, { type: editType, value: editValue.trim(), label: editLabel.trim() || undefined });
            setEditId(null);
        } finally { setEditSaving(false); }
    }

    const typeLabel = (t: SocialLinkType) => SOCIAL_TYPES.find(x => x.value === t)?.label ?? t;

    return (
        <section className="bg-white/10 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-1">Redes Sociais e Contatos</h2>
            <p className="text-sm text-white/50 mb-5">
                Gerencie os links exibidos no rodapé do site. O número de WhatsApp cadastrado será usado em todos os botões de contato.
            </p>

            {/* Formulário de adição */}
            <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl p-4 mb-5 space-y-3">
                <div className="grid sm:grid-cols-3 gap-3">
                    <select
                        value={type}
                        onChange={e => setType(e.target.value as SocialLinkType)}
                        className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-white/30 cursor-pointer"
                    >
                        {SOCIAL_TYPES.map(t => (
                            <option key={t.value} value={t.value} className="bg-[#1a2e28] text-white">{t.label}</option>
                        ))}
                    </select>
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={currentHint || "Valor *"}
                        required
                        className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-white/30"
                    />
                    <input
                        value={label}
                        onChange={e => setLabel(e.target.value)}
                        placeholder="Rótulo (ex: WhatsApp Comercial)"
                        className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-white/30"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={saving || !value.trim()}
                        className="px-5 py-2 bg-[#17312d] hover:bg-[#21433d] rounded-xl text-sm transition disabled:opacity-50"
                    >
                        {saving ? "Salvando..." : "+ Adicionar"}
                    </button>
                    {currentHint && <p className="text-xs text-white/35">{currentHint}</p>}
                </div>
            </form>

            {/* Lista */}
            {items.length === 0 ? (
                <p className="text-sm text-white/40">Nenhum link cadastrado.</p>
            ) : (
                <div className="space-y-2">
                    {items.map(item => (
                        <div key={item.id}>
                            {editId === item.id ? (
                                /* ── Modo edição inline ── */
                                <div className="bg-white/8 rounded-xl px-4 py-3 space-y-3">
                                    <div className="grid sm:grid-cols-3 gap-3">
                                        <select
                                            value={editType}
                                            onChange={e => setEditType(e.target.value as SocialLinkType)}
                                            className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-white/30 cursor-pointer"
                                        >
                                            {SOCIAL_TYPES.map(t => (
                                                <option key={t.value} value={t.value} className="bg-[#1a2e28] text-white">{t.label}</option>
                                            ))}
                                        </select>
                                        <input
                                            value={editValue}
                                            onChange={e => setEditValue(e.target.value)}
                                            placeholder={editHint || "Valor"}
                                            className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-white/30"
                                        />
                                        <input
                                            value={editLabel}
                                            onChange={e => setEditLabel(e.target.value)}
                                            placeholder="Rótulo (opcional)"
                                            className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-white/30"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSaveEdit}
                                            disabled={editSaving}
                                            className="px-4 py-1.5 bg-emerald-600/40 hover:bg-emerald-600/60 text-emerald-200 rounded-lg text-sm transition disabled:opacity-50"
                                        >
                                            {editSaving ? "Salvando..." : "Salvar"}
                                        </button>
                                        <button
                                            onClick={() => setEditId(null)}
                                            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* ── Modo exibição ── */
                                <div className="flex items-center justify-between gap-3 bg-white/5 rounded-xl px-4 py-3">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
                                                {typeLabel(item.type)}
                                            </span>
                                            {item.label && <span className="text-sm font-medium">{item.label}</span>}
                                        </div>
                                        <p className="mt-0.5 text-xs text-white/50 truncate">{item.value}</p>
                                    </div>
                                    <div className="flex shrink-0 gap-2">
                                        <button
                                            onClick={() => startEdit(item)}
                                            className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => onDelete(item.id)}
                                            className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg transition"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
