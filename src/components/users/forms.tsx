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

    const [formData, setFormData] = useState({
        name: "",
        login: "",
        password: "",
        active: true,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                login: user.login || "",
                password: "",
                active: user.active ?? true,
            });
            return;
        }

        setFormData({
            name: "",
            login: "",
            password: "",
            active: true,
        });
    }, [user]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            if (user) {
                await service.updateUser(user.id, {
                    ...formData,
                    name: formData.name.trim(),
                    login: formData.login.trim(),
                });

                showSuccess({
                    title: "Administrador atualizado",
                    message: "Os dados do administrador foram atualizados com sucesso.",
                    confirmLabel: "Fechar",
                });
            } else {
                const { active, ...newUser } = formData;

                await service.createUser({
                    ...newUser,
                    name: newUser.name.trim(),
                    login: newUser.login.trim(),
                });

                showSuccess({
                    title: "Administrador cadastrado",
                    message: "O novo administrador foi cadastrado com sucesso.",
                    confirmLabel: "Fechar",
                });
            }

            await onSaved();
            onClose();
        } catch (error) {
            showError({
                title: user ? "Não foi possível atualizar o administrador" : "Não foi possível cadastrar o administrador",
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
                className="w-full max-w-2xl overflow-hidden rounded-[30px] border border-white/10 bg-[#f5efe6] shadow-[0_30px_90px_rgba(15,23,42,0.45)]"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="grid md:grid-cols-[240px_1fr]">
                    <aside className="flex flex-col justify-between bg-[#17312d] p-6 text-white">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">Acesso administrativo</p>
                            <h2 className="mt-3 text-2xl font-semibold">
                                {user ? "Editar administrador" : "Novo administrador"}
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-white/70">
                                Gerencie credenciais de acesso ao painel interno com mais organização e clareza.
                            </p>
                        </div>

                        <div className="mt-8 rounded-[24px] border border-white/10 bg-white/10 p-5">
                            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Perfil</p>
                            <p className="mt-3 text-lg font-semibold">{user ? user.name : "Novo acesso"}</p>
                            <p className="mt-2 text-sm text-white/65">
                                {user ? "Atualize nome, login, status e senha quando necessário." : "Crie um novo usuário com login e senha para acesso administrativo."}
                            </p>
                        </div>
                    </aside>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                        <div className="grid gap-5">
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
                                <span className="text-sm font-medium text-slate-700">Login</span>
                                <input
                                    type="text"
                                    name="login"
                                    value={formData.login}
                                    onChange={handleChange}
                                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#17312d] focus:ring-2 focus:ring-[#17312d]/20"
                                    required
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-slate-700">Senha</span>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#17312d] focus:ring-2 focus:ring-[#17312d]/20"
                                    placeholder={user ? "Deixe em branco para manter a senha atual" : "Defina uma senha"}
                                    required={!user}
                                />
                            </label>

                            {user && (
                                <label className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                                    <input
                                        type="checkbox"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleChange}
                                        className="h-4 w-4 accent-[#17312d]"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Manter administrador ativo</span>
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
                                {loading ? "Salvando..." : user ? "Salvar alterações" : "Cadastrar administrador"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
