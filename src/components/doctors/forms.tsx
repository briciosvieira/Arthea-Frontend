import Image from "next/image";
import { useEffect, useState } from "react";
import { Service } from "@/app/services/service";
import type { DoctorProps } from "@/app/types/doctorProps";
import { useFeedback } from "@/components/ui/feedback-provider";

interface FormsDoctorProps {
    doctor?: DoctorProps | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export function FormsDoctor({ doctor, onClose, onSaved }: FormsDoctorProps) {
    const service = new Service();
    const { showError, showSuccess } = useFeedback();

    const [formData, setFormData] = useState({ name: "", crm: "", specialty: "", about: "", active: true });
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (doctor) {
            setFormData({ name: doctor.name || "", crm: doctor.crm || "", specialty: doctor.specialty || "", about: doctor.about || "", active: doctor.active ?? true });
            setPhotoPreview(doctor.photoUrl || null);
            setPhotoFile(null);
        } else {
            setFormData({ name: "", crm: "", specialty: "", about: "", active: true });
            setPhotoPreview(null);
            setPhotoFile(null);
        }
    }, [doctor]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((cur) => ({ ...cur, [name]: type === "checkbox" ? checked : value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const fd = new FormData();
            fd.append("name", formData.name.trim());
            fd.append("crm", formData.crm.trim());
            fd.append("specialty", formData.specialty.trim());
            fd.append("about", formData.about.trim());
            fd.append("active", String(formData.active));
            if (photoFile) fd.append("photo", photoFile);

            if (doctor) {
                await service.updateDoctor(doctor.id, fd);
                showSuccess({ title: "Cadastro atualizado", message: "Dados do médico atualizados com sucesso.", confirmLabel: "Fechar" });
            } else {
                await service.createDoctor(fd);
                showSuccess({ title: "Médico cadastrado", message: "Novo médico cadastrado com sucesso.", confirmLabel: "Fechar" });
            }
            await onSaved();
            onClose();
        } catch (error) {
            showError({
                title: doctor ? "Não foi possível atualizar" : "Não foi possível cadastrar",
                message: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm" onClick={onClose}>
            <section
                className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#EEEBE6] shadow-[0_20px_60px_rgba(15,23,42,0.4)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="grid lg:grid-cols-[160px_1fr]">
                    {/* Sidebar */}
                    <aside className="flex flex-col justify-between bg-[#606958] p-4 text-white">
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.3em] text-white/60">Equipe médica</p>
                            <h2 className="mt-2 text-base font-semibold">{doctor ? "Editar médico" : "Novo médico"}</h2>
                            <p className="mt-2 text-xs leading-5 text-white/65">
                                Preencha os dados, especialidade e apresentação do profissional.
                            </p>
                        </div>
                        <div className="mt-4">
                            <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-xl border border-white/10 bg-white/10">
                                {photoPreview ? (
                                    <Image src={photoPreview} alt="Pré-visualização" fill sizes="96px" className="object-cover" unoptimized />
                                ) : (
                                    <div className="flex h-full items-center justify-center px-3 text-center text-[10px] text-white/50">
                                        Foto aparece aqui
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="p-4 sm:p-5">
                        <div className="grid gap-3 sm:grid-cols-2">
                            <label className="flex flex-col gap-1.5 sm:col-span-2">
                                <span className="text-xs font-medium text-slate-700">Foto do médico</span>
                                <input type="file" accept="image/*" onChange={handlePhotoChange}
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 outline-none file:mr-3 file:rounded-full file:border-0 file:bg-[#606958] file:px-3 file:py-1 file:text-xs file:font-medium file:text-white hover:file:bg-[#4f5748]" />
                            </label>

                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-medium text-slate-700">Nome</span>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#606958] focus:ring-2 focus:ring-[#606958]/20" />
                            </label>

                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-medium text-slate-700">CRM</span>
                                <input type="text" name="crm" value={formData.crm} onChange={handleChange} required
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#606958] focus:ring-2 focus:ring-[#606958]/20" />
                            </label>

                            <label className="flex flex-col gap-1.5 sm:col-span-2">
                                <span className="text-xs font-medium text-slate-700">Especialidade</span>
                                <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} required
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#606958] focus:ring-2 focus:ring-[#606958]/20" />
                            </label>

                            <label className="flex flex-col gap-1.5 sm:col-span-2">
                                <span className="text-xs font-medium text-slate-700">Sobre</span>
                                <textarea name="about" value={formData.about} onChange={handleChange} rows={3}
                                    placeholder="Experiência, diferenciais ou áreas de atendimento."
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-900 outline-none focus:border-[#606958] focus:ring-2 focus:ring-[#606958]/20" />
                            </label>

                            {doctor && (
                                <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 sm:col-span-2">
                                    <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="h-3.5 w-3.5 accent-[#606958]" />
                                    <span className="text-xs font-medium text-slate-700">Manter médico ativo</span>
                                </label>
                            )}
                        </div>

                        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <button type="button" onClick={onClose}
                                className="rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100">
                                Cancelar
                            </button>
                            <button type="submit" disabled={loading}
                                className="rounded-full bg-[#606958] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#4f5748] disabled:cursor-not-allowed disabled:opacity-60">
                                {loading ? "Salvando..." : doctor ? "Salvar alterações" : "Cadastrar médico"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
