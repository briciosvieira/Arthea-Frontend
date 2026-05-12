'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Service } from "@/app/services/service";
import { DoctorProps } from "@/app/types/doctorProps";
import { FormsDoctor } from "./forms";
import { useFeedback } from "@/components/ui/feedback-provider";

export function Doctors() {
    const service = new Service();
    const { showConfirm, showError, showSuccess } = useFeedback();

    const [doctors, setDoctors] = useState<DoctorProps[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<DoctorProps | null>(null);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 5;

    const filteredDoctors = doctors.filter(
        (doctor) => doctor?.name && doctor.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    const totalPages = Math.max(1, Math.ceil(filteredDoctors.length / itemsPerPage));
    const pageDoctors = filteredDoctors.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const loadDoctors = async () => {
        try {
            setLoading(true);
            const data = await service.getDoctors();
            setDoctors(data.doctor || []);
        } catch (error) {
            showError({
                title: "Não foi possível carregar os médicos",
                message: error instanceof Error ? error.message : "Ocorreu um erro inesperado ao buscar os médicos.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedDoctor(null);
        setShowForm(true);
    };

    const handleEdit = (doctor: DoctorProps) => {
        setSelectedDoctor(doctor);
        setShowForm(true);
    };

    const handleDelete = (doctor: DoctorProps) => {
        showConfirm({
            title: "Excluir médico",
            message: `Tem certeza que deseja excluir ${doctor.name}? Essa ação não pode ser desfeita.`,
            confirmLabel: "Excluir",
            cancelLabel: "Voltar",
            onConfirm: async () => {
                await service.deleteDoctor(doctor.id);
                await loadDoctors();

                setPage((currentPage) => {
                    const remainingItems = filteredDoctors.length - 1;
                    const nextTotalPages = Math.max(1, Math.ceil(remainingItems / itemsPerPage));
                    return Math.min(currentPage, nextTotalPages);
                });

                showSuccess({
                    title: "Médico removido",
                    message: "O cadastro foi excluído com sucesso.",
                    confirmLabel: "Fechar",
                });
            },
        });
    };

    useEffect(() => {
        loadDoctors();
    }, []);

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    return (
        <main className="mt-24 flex w-full justify-center px-4 pb-10">
            <section className="w-full max-w-5xl rounded-[28px] border border-white/15 bg-[#16302c]/85 p-5 text-white shadow-[0_20px_80px_rgba(8,15,12,0.35)] backdrop-blur-md sm:p-8">
                <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/70">Painel clínico</p>
                        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Médicos cadastrados</h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                            Gerencie especialistas, acompanhe status de cadastro e mantenha a vitrine da clínica sempre atualizada.
                        </p>
                    </div>

                    <button
                        className="rounded-full bg-[#d9c7a2] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#ead9b7]"
                        onClick={handleCreate}
                    >
                        Cadastrar médico
                    </button>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <label className="block w-full max-w-md">
                        <span className="mb-2 block text-sm text-white/70">Buscar por nome</span>
                        <input
                            type="text"
                            className="w-full rounded-2xl border border-white/15 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#d9c7a2] focus:ring-2 focus:ring-[#d9c7a2]/40"
                            placeholder="Pesquise um médico"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1);
                            }}
                        />
                    </label>

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                        {filteredDoctors.length} registro(s) encontrado(s)
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    {loading ? (
                        <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center text-white/70">
                            Carregando médicos...
                        </div>
                    ) : pageDoctors.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center text-white/70">
                            Nenhum médico encontrado para o filtro informado.
                        </div>
                    ) : (
                        pageDoctors.map((doctor) => (
                            <article
                                key={doctor.id}
                                className="grid gap-4 rounded-[26px] border border-white/10 bg-[#21413b] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] md:grid-cols-[96px_1.6fr_1.1fr_auto]"
                            >
                                <div className="flex items-center justify-center">
                                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                                        {doctor.photoUrl ? (
                                            <Image
                                                src={doctor.photoUrl}
                                                alt={doctor.name}
                                                fill
                                                sizes="96px"
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center px-3 text-center text-xs text-white/60">
                                                Sem foto
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="min-w-0">
                                    <h2 className="truncate text-lg font-semibold">{doctor.name}</h2>
                                    <p className="mt-1 text-sm text-emerald-100/80">{doctor.specialty}</p>
                                    <p className="mt-3 text-sm text-white/65">CRM: {doctor.crm}</p>
                                </div>

                                <div className="flex flex-col justify-between gap-3">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.24em] text-white/45">Status</p>
                                        <p className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${doctor.active ? "bg-emerald-500/15 text-emerald-200" : "bg-rose-500/15 text-rose-200"}`}>
                                            {doctor.active ? "Ativo" : "Inativo"}
                                        </p>
                                    </div>

                                    {doctor.about && (
                                        <p className="line-clamp-3 text-sm leading-6 text-white/60">
                                            {doctor.about}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-start justify-end gap-2">
                                    <button
                                        onClick={() => handleEdit(doctor)}
                                        className="rounded-full border border-sky-400/30 bg-sky-500/10 p-3 text-sky-200 transition hover:bg-sky-500/20"
                                        aria-label={`Editar ${doctor.name}`}
                                    >
                                        <FiEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doctor)}
                                        className="rounded-full border border-rose-400/30 bg-rose-500/10 p-3 text-rose-200 transition hover:bg-rose-500/20"
                                        aria-label={`Excluir ${doctor.name}`}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-white/70">
                        Página {page} de {totalPages}
                    </span>

                    <div className="flex items-center gap-3">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((currentPage) => currentPage - 1)}
                            className="rounded-full border border-white/15 px-4 py-2 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Anterior
                        </button>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((currentPage) => currentPage + 1)}
                            className="rounded-full border border-white/15 px-4 py-2 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            </section>

            {showForm && (
                <FormsDoctor
                    doctor={selectedDoctor}
                    onClose={() => setShowForm(false)}
                    onSaved={loadDoctors}
                />
            )}
        </main>
    );
}
