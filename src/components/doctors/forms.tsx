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

    const [formData, setFormData] = useState({
        name: "",
        crm: "",
        specialty: "",
        about: "",
        active: true,
    });
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (doctor) {
            setFormData({
                name: doctor.name || "",
                crm: doctor.crm || "",
                specialty: doctor.specialty || "",
                about: doctor.about || "",
                active: doctor.active ?? true,
            });
            setPhotoPreview(doctor.photoUrl || null);
            setPhotoFile(null);
            return;
        }

        setFormData({
            name: "",
            crm: "",
            specialty: "",
            about: "",
            active: true,
        });
        setPhotoPreview(null);
        setPhotoFile(null);
    }, [doctor]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;
        const checked = (event.target as HTMLInputElement).checked;

        setFormData((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const submitData = new FormData();
            submitData.append("name", formData.name.trim());
            submitData.append("crm", formData.crm.trim());
            submitData.append("specialty", formData.specialty.trim());
            submitData.append("about", formData.about.trim());
            submitData.append("active", String(formData.active));

            if (photoFile) {
                submitData.append("photo", photoFile);
            }

            if (doctor) {
                await service.updateDoctor(doctor.id, submitData);
                showSuccess({
                    title: "Cadastro atualizado",
                    message: "Os dados do médico foram atualizados com sucesso.",
                    confirmLabel: "Fechar",
                });
            } else {
                await service.createDoctor(submitData);
                showSuccess({
                    title: "Médico cadastrado",
                    message: "O novo médico foi cadastrado com sucesso.",
                    confirmLabel: "Fechar",
                });
            }

            await onSaved();
            onClose();
        } catch (error) {
            showError({
                title: doctor ? "Não foi possível atualizar o médico" : "Não foi possível cadastrar o médico",
                message: error instanceof Error ? error.message : "Ocorreu um erro inesperado ao salvar os dados.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/75 px-4 py-8 backdrop-blur-sm"
            onClick={onClose}
        >
            <section
                className="w-full max-w-3xl overflow-hidden rounded-[30px] border border-white/10 bg-[#f5efe6] shadow-[0_30px_90px_rgba(15,23,42,0.45)]"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="grid lg:grid-cols-[280px_1fr]">
                    <aside className="flex flex-col justify-between bg-[#17312d] p-6 text-white">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">Equipe médica</p>
                            <h2 className="mt-3 text-2xl font-semibold">
                                {doctor ? "Editar médico" : "Novo médico"}
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-white/70">
                                Preencha os dados principais, a especialidade e a apresentação profissional do médico.
                            </p>
                        </div>

                        <div className="mt-8">
                            <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-[26px] border border-white/10 bg-white/10">
                                {photoPreview ? (
                                    <Image
                                        src={photoPreview}
                                        alt="Pré-visualização da foto do médico"
                                        fill
                                        sizes="160px"
                                        className="object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center px-6 text-center text-sm text-white/55">
                                        A foto enviada aparecerá aqui
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="flex flex-col gap-2 sm:col-span-2">
                                <span className="text-sm font-medium text-slate-700">Foto do médico</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-[#17312d] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#21433d] focus:border-[#17312d] focus:ring-2 focus:ring-[#17312d]/20"
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-slate-700">Nome</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#17312d] focus:ring-2 focus:ring-[#17312d]/20"
                                    required
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-slate-700">CRM</span>
                                <input
                                    type="text"
                                    name="crm"
                                    value={formData.crm}
                                    onChange={handleChange}
                                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#17312d] focus:ring-2 focus:ring-[#17312d]/20"
                                    required
                                />
                            </label>

                            <label className="flex flex-col gap-2 sm:col-span-2">
                                <span className="text-sm font-medium text-slate-700">Especialidade</span>
                                <input
                                    type="text"
                                    name="specialty"
                                    value={formData.specialty}
                                    onChange={handleChange}
                                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#17312d] focus:ring-2 focus:ring-[#17312d]/20"
                                    required
                                />
                            </label>

                            <label className="flex flex-col gap-2 sm:col-span-2">
                                <span className="text-sm font-medium text-slate-700">Sobre</span>
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    rows={5}
                                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-[#17312d] focus:ring-2 focus:ring-[#17312d]/20"
                                    placeholder="Descreva experiência, diferenciais ou áreas de atendimento."
                                />
                            </label>

                            {doctor && (
                                <label className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 sm:col-span-2">
                                    <input
                                        type="checkbox"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleChange}
                                        className="h-4 w-4 accent-[#17312d]"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Manter médico ativo</span>
                                </label>
                            )}
                        </div>

                        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-full bg-[#17312d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#21433d] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Salvando..." : doctor ? "Salvar alterações" : "Cadastrar médico"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
