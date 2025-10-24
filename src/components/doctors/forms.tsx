import { Service } from "@/components/services/service";
import type { DoctorProps } from "@/components/types/doctorProps";
import { useEffect, useState } from "react";

interface FormsDoctorProps {
    doctor?: DoctorProps | null;
    onClose: () => void;
    onSaved: () => void;
}

export function FormsDoctor({ doctor, onClose, onSaved }: FormsDoctorProps) {
    const service = new Service();

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

            if (doctor.photoUrl) {
                setPhotoPreview(doctor.photoUrl);
            }
        }
    }, [doctor]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
    }));
};

const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setPhotoFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('crm', formData.crm);
        submitData.append('specialty', formData.specialty);
        submitData.append('about', formData.about);
        submitData.append('active', String(formData.active));

        if (photoFile) {
            submitData.append('photo', photoFile);
        }

        if (doctor) {
            await service.updateDoctor(doctor.id, submitData);
            alert("Médico atualizado com sucesso!");
        } else {
            await service.createDoctor(submitData);
            alert("Médico criado com sucesso!");
        }

        onSaved();
        onClose();
    } catch (error) {
        if (error instanceof Error) {
            alert(`Erro: ${error.message}`);
        } else {
            alert("Erro desconhecido");
        }
    } finally {
        setLoading(false);
    }
};

return (
    <main
        className="fixed inset-0 bg-[#030303e1] bg-opacity-60 flex items-center justify-center z-50"
        onClick={onClose}
    >
        <section onClick={(e) => e.stopPropagation()}>
            <div className="bg-gray-700 p-6 rounded-2xl w-96 max-h-[90vh] overflow-y-auto text-white shadow-lg">
                <h2 className="text-lg font-semibold mb-4">
                    {doctor ? "Editar Médico" : "Novo Médico"}
                </h2>

                {photoPreview && (
                    <div className="flex justify-center mb-4">
                        <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-32 h-32 rounded-lg object-cover"
                        />
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-1">
                        Foto do Médico
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="bg-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </label>

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
                        CRM
                        <input
                            type="text"
                            name="crm"
                            value={formData.crm}
                            onChange={handleChange}
                            className="bg-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        Especialidade
                        <input
                            type="text"
                            name="specialty"
                            value={formData.specialty}
                            onChange={handleChange}
                            className="bg-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        Sobre
                        <textarea
                            name="about"
                            value={formData.about}
                            onChange={handleChange}
                            className="bg-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={3}
                        />
                    </label>

                    {doctor && (
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
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md cursor-pointer"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </section>
    </main>
);
}