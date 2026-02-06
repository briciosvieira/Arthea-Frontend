import { Service } from "@/components/services/service";
import type { UserProps } from "@/components/types/UserProps";
import { useEffect, useState } from "react";

interface FormsUserProps {
    user?: UserProps | null;
    onClose: () => void;
    onSaved: () => void;
}

export function FormsUser({ user, onClose, onSaved }: FormsUserProps) {
    const service = new Service();

    const [formData, setFormData] = useState({
        name: "",
        login: "",
        password: "",
        active: true,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                login: user.login || "",
                password: "",
                active: user.active ?? true,
            });
        }
    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (user) {
                await service.updateUser(user.id, formData);
                alert("Usuário atualizado com sucesso!");
            } else {
                const { active, ...newUser } = formData;
                await service.createUser(newUser);
                alert("Usuário criado com sucesso!");
            }
            onSaved();
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                alert(`Erro, você não tem permissão de Administrador para atualizar: ${error.message}`)
            } else {
                alert("Erro desconhecido")
            }
        }
    };


    return (
        <main className="fixed inset-0 bg-[#030303e5] bg-opacity-60 flex items-center justify-center z-50"
            onClick={onClose}>
            <section onClick={(e) => e.stopPropagation()}>
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-700 p-6 rounded-2xl w-96 text-white shadow-lg"
                >
                    <h2 className="text-lg font-semibold mb-4">
                        {user ? "Editar Usuário" : "Novo Usuário"}
                    </h2>

                    <div className="flex flex-col gap-3">
                        <label className="flex flex-col gap-1">
                            Nome
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </label>

                        <label className="flex flex-col gap-1">
                            Login
                            <input
                                type="text"
                                name="login"
                                value={formData.login}
                                onChange={handleChange}
                                className="bg-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </label>

                        <label className="flex flex-col gap-1">
                            Senha
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder={user ? "Deixe em branco para não alterar" : ""}
                                required={!user}
                            />
                        </label>

                        {/* 👇 Só mostra o campo "Ativo" quando for edição */}
                        {user && (
                            <label className="flex items-center gap-2 mt-1">
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={formData.active}
                                    onChange={handleChange}
                                    className="accent-blue-500"
                                />
                                Ativo
                            </label>
                        )}
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md cursor-pointer"
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md cursor-pointer"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}
