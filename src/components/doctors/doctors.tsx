'use client'

import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Service } from "../services/service";
import { DoctorProps } from "../types/doctorProps";
import { FormsDoctor } from "./forms";

export function Doctors() {

    const service = new Service();
    const [doctors, setDoctors] = useState<DoctorProps[]>([])

    const [showForm, setShowForm] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<DoctorProps | null>(null);

    const [page, setPage] = useState(1)
    const itemsPerPage = 5
    const totalPages = Math.ceil(doctors.length / itemsPerPage)
    const [searchTerm, setSearchTerm] = useState('')

    const filteredDoctors = doctors.filter(
        (doctor) => doctor?.name &&
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    const pageDoctors = filteredDoctors.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const loadDoctors = async () => {
        try {
            const data = await service.getDoctors();
            setDoctors(data.doctor || [])
        } catch (error) {

        }
    }

    // abrir form para criar
    const handleCreate = () => {
        setSelectedDoctor(null);
        setShowForm(true);
    };

    // abrir form para editar
    const handleEdit = (doctor: DoctorProps) => {
        setSelectedDoctor(doctor);
        setShowForm(true);
    };

    //deletar o medico
    const handleDelete = async (id: string) => {
        const confirmed = confirm("Tem certeza que deseja excluir este médico?");
        if (!confirmed) return;

        try {
            await service.deleteDoctor(id);
            await loadDoctors();

            // Se a página atual ficar vazia, volta para a anterior
            if ((page - 1) * itemsPerPage >= doctors.length - 1) {
                setPage((p) => Math.max(1, p - 1));
            }

            alert("Médico deletado com sucesso!");
        } catch (error) {
            if (error instanceof Error) {
                alert(`Erro ao deletar médico: ${error.message}`);
            } else {
                alert("Erro desconhecido.");
            }
        }
    };

    useEffect(() => {
        loadDoctors();
    })

    return (
        <main className="w-[95%] sm:w-full h-max flex items-center justify-center overflow-hidden mt-20">
            <section className="flex flex-col w-full max-w-3xl rounded-2xl bg-gray-700 p-4">
                <h1>Lista de Médicos</h1>

                <div className="justify-between items-center flex mb-3">
                    <input type="text"
                        className="bg-gray-200 text-black mt-2 mb-2 rounded-lg px-3 
                        w-64 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Pesquisando Médico..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setPage(1)
                        }}
                    />

                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1  rounded-md cursor-pointer"
                        onClick={handleCreate}
                    >Cadastrar novo Médico</button>
                </div>

                <div>
                    {pageDoctors.map((doctor) => (
                        <div key={doctor.id}
                            className="bg-gray-800 mt-1 p-2 rounded-md grid grid-cols-[2fr_2fr_1fr_auto] items-center"
                        >
                            <span className="text-white font-semibold truncate">
                                Nome: {doctor.name}
                            </span>

                            <span className="text-white font-semibold truncate">
                                Especialização: {doctor.specialty}
                            </span>

                            <span className="text-sm">
                                Ativo:{" "}
                                <span className={doctor.active ? "text-green-400" : "text-red-400"}>
                                    {doctor.active ? "Sim" : "Não"}
                                </span>
                            </span>

                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={() => handleEdit(doctor)}
                                    className="text-blue-600 hover:bg-blue-700 p-2 rounded-sm hover:text-white cursor-pointer"
                                >
                                    <FiEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(doctor.id)}
                                    className="text-red-600 hover:bg-red-700 p-2 rounded-sm hover:text-white cursor-pointer"
                                >
                                    <FaRegTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/*Div paginação*/}
                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className={`px-3 py-1 rounded-md ${page === 1
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                            : "bg-gray-700 hover:bg-gray-500 cursor-pointer"
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
                            : "bg-gray-700 hover:bg-gray-500 cursor-pointer"
                            }`}
                    >
                        Próxima →
                    </button>
                </div>
            </section>
            {/* Modal de criação/edição */}
            {showForm && (
                <FormsDoctor
                    doctor={selectedDoctor}
                    onClose={() => setShowForm(false)}
                    onSaved={loadDoctors}
                />
            )}
        </main>
    )
}

