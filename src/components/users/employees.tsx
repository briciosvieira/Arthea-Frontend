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

    const handleCreate = () => { setSelectedUser(null); setShowForm(true); };
    const handleEdit = (user: UserProps) => { setSelectedUser(user); setShowForm(true); };

    const handleDelete = (user: UserProps) => {
        showConfirm({
            title: "Excluir administrador",
            message: `Tem certeza que deseja excluir ${user.name}? Essa ação não pode ser desfeita.`,
            confirmLabel: "Excluir",
            cancelLabel: "Voltar",
            onConfirm: async () => {
                await service.deleteUsers(user.id);
                await loadUsers();
                setPage((cur) => Math.min(cur, Math.max(1, Math.ceil((filteredUsers.length - 1) / itemsPerPage))));
                showSuccess({ title: "Administrador removido", message: "O usuário foi excluído com sucesso.", confirmLabel: "Fechar" });
            },
        });
    };

    useEffect(() => { loadUsers(); }, []);
    useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

    return (
        <main className="mt-16 flex w-full justify-center px-4 pb-6">
            <section className="w-full max-w-2xl rounded-2xl border border-white/15 bg-[#16302c]/85 p-4 text-white shadow-[0_12px_48px_rgba(8,15,12,0.3)] backdrop-blur-md sm:p-5">

                {/* Cabeçalho */}
                <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-200/70">Painel administrativo</p>
                        <h1 className="mt-1 text-lg font-semibold sm:text-xl">Administradores cadastrados</h1>
                        <p className="mt-1 text-xs leading-5 text-white/60">
                            Controle os acessos administrativos da clínica.
                        </p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="rounded-full bg-[#AB8E66] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#BF9E72]"
                    >
                        Novo administrador
                    </button>
                </div>

                {/* Busca */}
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <label className="block w-full max-w-xs">
                        <span className="mb-1 block text-xs text-white/60">Buscar por nome</span>
                        <input
                            type="text"
                            placeholder="Pesquise um administrador"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                            className="w-full rounded-xl border border-white/15 bg-white/95 px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#AB8E66] focus:ring-2 focus:ring-[#AB8E66]/30"
                        />
                    </label>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
                        {filteredUsers.length} registro(s)
                    </div>
                </div>

                {/* Lista */}
                <div className="mt-3 space-y-2">
                    {loading ? (
                        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 py-8 text-center text-xs text-white/60">
                            Carregando administradores...
                        </div>
                    ) : currentPageUsers.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 py-8 text-center text-xs text-white/60">
                            Nenhum administrador encontrado.
                        </div>
                    ) : (
                        currentPageUsers.map((user) => (
                            <article
                                key={user.id}
                                className="grid gap-3 rounded-xl border border-white/10 bg-[#21413b] p-3 md:grid-cols-[1.4fr_1fr_0.7fr_auto]"
                            >
                                <div className="min-w-0">
                                    <p className="text-[9px] uppercase tracking-[0.22em] text-white/40">Administrador</p>
                                    <h2 className="mt-1 truncate text-sm font-semibold">{user.name}</h2>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[9px] uppercase tracking-[0.22em] text-white/40">Login</p>
                                    <p className="mt-1 truncate text-xs text-emerald-100/80">{user.login}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.22em] text-white/40">Status</p>
                                    <p className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${user.active ? "bg-emerald-500/15 text-emerald-200" : "bg-rose-500/15 text-rose-200"}`}>
                                        {user.active ? "Ativo" : "Inativo"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button onClick={() => handleEdit(user)} className="rounded-full border border-sky-400/30 bg-sky-500/10 p-2 text-sky-200 transition hover:bg-sky-500/20" aria-label={`Editar ${user.name}`}>
                                        <FiEdit size={13} />
                                    </button>
                                    <button onClick={() => handleDelete(user)} className="rounded-full border border-rose-400/30 bg-rose-500/10 p-2 text-rose-200 transition hover:bg-rose-500/20" aria-label={`Excluir ${user.name}`}>
                                        <FaRegTrashAlt size={13} />
                                    </button>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                {/* Paginação */}
                <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3 text-xs sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-white/60">Página {page} de {totalPages}</span>
                    <div className="flex items-center gap-2">
                        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40">Anterior</button>
                        <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40">Próxima</button>
                    </div>
                </div>
            </section>

            {showForm && <FormsUser user={selectedUser} onClose={() => setShowForm(false)} onSaved={loadUsers} />}
        </main>
    );
}
