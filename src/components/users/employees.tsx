"use client";

import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Service } from "@/app/services/service";
import type { UserProps } from "@/app/types/UserProps";
import { FormsUser } from "@/components/users/forms";
import { useFeedback } from "@/components/ui/feedback-provider";

export function Employees() {
    const service = new Service();
    const { showConfirm, showError, showSuccess } = useFeedback();

    const [users, setUsers] = useState<UserProps[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 5;

    const filteredUsers = users.filter(
        (user) => user?.name && user.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
    const currentPageUsers = filteredUsers.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await service.getUsers();
            setUsers(data.users || []);
        } catch (error) {
            showError({
                title: "Não foi possível carregar os administradores",
                message: error instanceof Error ? error.message : "Ocorreu um erro inesperado ao buscar usuários.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedUser(null);
        setShowForm(true);
    };

    const handleEdit = (user: UserProps) => {
        setSelectedUser(user);
        setShowForm(true);
    };

    const handleDelete = (user: UserProps) => {
        showConfirm({
            title: "Excluir administrador",
            message: `Tem certeza que deseja excluir ${user.name}? Essa ação não pode ser desfeita.`,
            confirmLabel: "Excluir",
            cancelLabel: "Voltar",
            onConfirm: async () => {
                await service.deleteUsers(user.id);
                await loadUsers();

                setPage((currentPage) => {
                    const remainingItems = filteredUsers.length - 1;
                    const nextTotalPages = Math.max(1, Math.ceil(remainingItems / itemsPerPage));
                    return Math.min(currentPage, nextTotalPages);
                });

                showSuccess({
                    title: "Administrador removido",
                    message: "O usuário foi excluído com sucesso.",
                    confirmLabel: "Fechar",
                });
            },
        });
    };

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    return (
        <main className="mt-2 flex w-full justify-center px-4 pb-1">
            <section className="w-full  max-w-3xl rounded-[28px] border border-white/15 bg-[#16302c]/85 p- text-white shadow-[0_20px_80px_rgba(8,15,12,0.35)] backdrop-blur-md sm:p-8">
                <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/70">Painel administrativo</p>
                        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Administradores cadastrados</h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                            Controle os acessos administrativos da clínica, mantenha logins organizados e visualize rapidamente quem está ativo.
                        </p>
                    </div>

                    <button
                        onClick={handleCreate}
                        className="rounded-full bg-[#d9c7a2] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#ead9b7]"
                    >
                        Novo administrador
                    </button>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <label className="block w-full max-w-md">
                        <span className="mb-2 block text-sm text-white/70">Buscar por nome</span>
                        <input
                            type="text"
                            placeholder="Pesquise um administrador"
                            value={searchTerm}
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                                setPage(1);
                            }}
                            className="w-full rounded-2xl border border-white/15 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#d9c7a2] focus:ring-2 focus:ring-[#d9c7a2]/40"
                        />
                    </label>

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                        {filteredUsers.length} registro(s) encontrado(s)
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    {loading ? (
                        <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center text-white/70">
                            Carregando administradores...
                        </div>
                    ) : currentPageUsers.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center text-white/70">
                            Nenhum administrador encontrado para o filtro informado.
                        </div>
                    ) : (
                        currentPageUsers.map((user) => (
                            <article
                                key={user.id}
                                className="grid gap-4 rounded-[26px] border border-white/10 bg-[#21413b] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] md:grid-cols-[1.4fr_1fr_0.8fr_auto]"
                            >
                                <div className="min-w-0">
                                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Administrador</p>
                                    <h2 className="mt-2 truncate text-lg font-semibold">{user.name}</h2>
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Login</p>
                                    <p className="mt-2 truncate text-sm text-emerald-100/80">{user.login}</p>
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Status</p>
                                    <p className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.active ? "bg-emerald-500/15 text-emerald-200" : "bg-rose-500/15 text-rose-200"}`}>
                                        {user.active ? "Ativo" : "Inativo"}
                                    </p>
                                </div>

                                <div className="flex items-start justify-end gap-2">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="rounded-full border border-sky-400/30 bg-sky-500/10 p-3 text-sky-200 transition hover:bg-sky-500/20"
                                        aria-label={`Editar ${user.name}`}
                                    >
                                        <FiEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="rounded-full border border-rose-400/30 bg-rose-500/10 p-3 text-rose-200 transition hover:bg-rose-500/20"
                                        aria-label={`Excluir ${user.name}`}
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
                <FormsUser
                    user={selectedUser}
                    onClose={() => setShowForm(false)}
                    onSaved={loadUsers}
                />
            )}
        </main>
    );
}
