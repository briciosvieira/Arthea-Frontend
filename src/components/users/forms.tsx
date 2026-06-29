import { useEffect, useState } from "react";
import { Service } from "@/app/services/service";
import type { UserProps } from "@/app/types/UserProps";
import { useFeedback } from "@/components/ui/feedback-provider";

interface FormsUserProps {
    user?: UserProps | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export function FormsUser({ user, onClose, onSaved }: FormsUserProps) {
    const service = new Service();
    const { showError, showSuccess } = useFeedback();

    const [formData, setFormData] = useState({ name: "", login: "", password: "", active: true });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(user
            ? { name: user.name || "", login: user.login || "", password: "", active: user.active ?? true }
            : { name: "", login: "", password: "", active: true }
        );
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((cur) => ({ ...cur, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (user) {
                await service.updateUser(user.id, { ...formData, name: formData.name.trim(), login: formData.login.trim() });
                showSuccess({ title: "Administrador atualizado", message: "Dados atualizados com sucesso.", confirmLabel: "Fechar" });
            } else {
                const { active, ...newUser } = formData;
                await service.createUser({ ...newUser, name: newUser.name.trim(), login: newUser.login.trim() });
                showSuccess({ title: "Administrador cadastrado", message: "Novo administrador criado com sucesso.", confirmLabel: "Fechar" });
            }
            await onSaved();
            onClose();
        } catch (error) {
            showError({
                title: user ? "Não foi possível atualizar" : "Não foi possível cadastrar",
                message: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm" onClick={onClose}>
            <section
                className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#EEEBE6] shadow-[0_20px_60px_rgba(15,23,42,0.4)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="grid md:grid-cols-[180px_1fr]">
                    {/* Sidebar */}
                    <aside className="flex flex-col justify-between bg-[#606958] p-4 text-white">
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.3em] text-white/60">Acesso administrativo</p>
                            <h2 className="mt-2 text-base font-semibold">{user ? "Editar administrador" : "Novo administrador"}</h2>
                            <p className="mt-2 text-xs leading-5 text-white/65">
                                Gerencie credenciais de acesso ao painel interno.
                            </p>
                        </div>
                        <div className="mt-5 rounded-xl border border-white/10 bg-white/10 p-3">
                            <p className="text-[9px] uppercase tracking-[0.22em] text-white/40">Perfil</p>
                            <p className="mt-2 text-sm font-semibold">{user ? user.name : "Novo acesso"}</p>
                            <p className="mt-1 text-xs text-white/60">
                                {user ? "Atualize os dados quando necessário." : "Crie login e senha para acesso."}
                            </p>
                        </div>
                    </aside>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="p-4 sm:p-5">
                        <div className="grid gap-3">
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-medium text-slate-700">Nome</span>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#606958] focus:ring-2 focus:ring-[#606958]/20" />
                            </label>
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-medium text-slate-700">Login</span>
                                <input type="text" name="login" value={formData.login} onChange={handleChange} required
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#606958] focus:ring-2 focus:ring-[#606958]/20" />
                            </label>
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-medium text-slate-700">Senha</span>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required={!user}
                                    placeholder={user ? "Deixe em branco para manter" : "Defina uma senha"}
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#606958] focus:ring-2 focus:ring-[#606958]/20" />
                            </label>
                            {user && (
                                <label className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2">
                                    <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="h-3.5 w-3.5 accent-[#606958]" />
                                    <span className="text-xs font-medium text-slate-700">Manter administrador ativo</span>
                                </label>
                            )}
                        </div>

                        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <button type="button" onClick={onClose}
                                className="rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100">
                                Cancelar
                            </button>
                            <button type="submit" disabled={loading}
                                className="rounded-full bg-[#606958] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#4f5748] disabled:cursor-not-allowed disabled:opacity-60">
                                {loading ? "Salvando..." : user ? "Salvar alterações" : "Cadastrar"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
