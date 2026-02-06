"use client";


import { Service } from "@/components/services/service";
import type { UserProps } from "@/components/types/UserProps";
import { FormsUser } from "@/components/users/forms";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";


export function Employees() {
    const service = new Service();
    const [users, setUsers] = useState<UserProps[]>([]);
 

    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);

    const [page, setPage] = useState(1)
    const itemsPerPage = 5
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const [searchTerm, setSearchTerm] = useState("");


    const loadUsers = async () => {
        try {
            const data = await service.getUsers();
            setUsers(data.users || []);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Tem certeza que deseja excluir este usuário?");
        if (!confirmed) return

        try {
            await service.deleteUsers(id);
            await loadUsers()

            if ((page - 1) * itemsPerPage >= users.length - 1) {
                setPage((p) => Math.max(1, p - 1));
            }
        } catch (error) {
            if(error instanceof Error ){
                alert(`Error, você nao tem permissão de Administrador para deletar: ${error.message}`)
            } else {
                throw new Error("Erro desconhecido.")
            }
         }
    }

    const filteredUsers = users.filter(
        (user) =>
            user?.name &&
            user.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    const currentPageUsers = filteredUsers.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );


    // abrir form para criar
    const handleCreate = () => {
        setSelectedUser(null);
        setShowForm(true);
    };

    // abrir form para editar
    const handleEdit = (user: UserProps) => {
        setSelectedUser(user);
        setShowForm(true);
    };


    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <main className=" w-[95%] sm:w-full h-max flex items-center justify-center overflow-hidden mt-20">
            <section className=" flex flex-col w-full bg-[#3c57526e] max-w-3xl rounded-2xl h-max p-4">
                <h1 className="text-2xl mb-3">Lista de Usuários Administradores</h1>

                <div className="flex justify-between items-center">

                    <input
                        type="text"
                        placeholder="Pesquisar usuário..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                        className="bg-gray-200 text-black mt-2 mb-2 rounded-lg px-3 w-64 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        onClick={handleCreate}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1  rounded-md cursor-pointer"
                    >
                        Novo Usuário
                    </button>
                </div>
                <div>
                    {currentPageUsers.map((user) => (
                        <div
                            key={user.id}
                            className="bg-[#3c5752c0] mt-1 p-2 rounded-md grid grid-cols-[2fr_2fr_1fr_auto] items-center"
                        >
                            <span className="text-white font-semibold truncate">
                                Nome: {user.name}
                            </span>

                            <span className="text-gray-400 text-sm truncate">
                                Login: {user.login}
                            </span>

                            <span className="text-sm">
                                Ativo:{" "}
                                <span className={user.active ? "text-green-400" : "text-red-400"}>
                                    {user.active ? "Sim" : "Não"}
                                </span>
                            </span>


                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="text-blue-600 hover:bg-blue-700 p-2 rounded-sm hover:text-white cursor-pointer"
                                >
                                    <FiEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="text-red-600 hover:bg-red-700 p-2 rounded-sm hover:text-white cursor-pointer"
                                >
                                    <FaRegTrashAlt />
                                </button>
                            </div>
                        </div>

                    ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className={`px-3 py-1 rounded-md ${page === 1
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                            : "bg-gray-500 hover:bg-gray-500 cursor-pointer"
                            }`}
                    >
                        ← Anterior
                    </button>

                    <span>
                        Página {page} de {totalPages || 1}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className={`px-3 py-1 rounded-md ${page === totalPages
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                            : "bg-gray-500 hover:bg-gray-500 cursor-pointer"
                            }`}
                    >
                        Próxima →
                    </button>
                </div>
            </section>

            {/* Modal de criação/edição */}
            {showForm && (
                <FormsUser
                    user={selectedUser}
                    onClose={() => setShowForm(false)}
                    onSaved={loadUsers}
                />
            )}
        </main>
    )
}