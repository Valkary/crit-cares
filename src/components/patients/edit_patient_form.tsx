import { useState } from "react";
import { PatientModel } from "~/data/patients/get_patients";

export default function EditPatient({ patient_data }: { patient_data: PatientModel }) {
    const [patient, setPatient] = useState(patient_data);
    const [editMode, setEditMode] = useState(false);

    // Function to handle edit mode toggle
    const handleEditModeToggle = () => {
        setEditMode(!editMode);
    };

    // Function to handle form submission (save changes)
    const handleSaveChanges = async () => {
        try {
            // Replace with actual update logic to save changes to the database
            //await patients.update(patient.id, patient);
            console.log('Changes saved successfully!');
            setEditMode(false); // Exit edit mode after saving changes
        } catch (error) {
            console.error('Error saving changes:', error);
            // Handle error
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    return <form onSubmit={handleSaveChanges}>
        <div className="mb-4">
            <label className="input input-bordered flex items-center gap-4">
                Nombres
                <input
                    type="text"
                    name="names"
                    value={patient.names}
                    onChange={handleChange}
                    className={`text-lg ${editMode ? 'border-b-2 border-primary' : 'text-gray-900'} py-1.5 pl-1 placeholder:text-gray-400 focus:outline-none w-full`}
                    readOnly={!editMode}
                    required
                />
            </label>
        </div>
        <div className="mb-4">
            <label className="input input-bordered flex items-center gap-4">
                Apellidos
                <input
                    type="text"
                    name="last_names"
                    value={patient.last_names}
                    onChange={handleChange}
                    className={`text-lg ${editMode ? 'border-b-2 border-primary' : 'text-gray-900'} py-1.5 pl-1 placeholder:text-gray-400 focus:outline-none w-full`}
                    readOnly={!editMode}
                    required
                />
            </label>
        </div>
        <div className="mb-4">
            <label className="input input-bordered flex items-center gap-4">
                Edad
                <input
                    type="number"
                    name="age"
                    value={patient.age}
                    onChange={handleChange}
                    className={`text-lg ${editMode ? 'border-b-2 border-primary' : 'text-gray-900'} py-1.5 pl-1 placeholder:text-gray-400 focus:outline-none w-full`}
                    readOnly={!editMode}
                    required
                />
            </label>
        </div>
        <div className="mb-4">
            <label className="input input-bordered flex items-center gap-4">
                Teléfono
                <input
                    type="text"
                    name="phone"
                    value={patient.phone}
                    onChange={handleChange}
                    className={`text-lg ${editMode ? 'border-b-2 border-primary' : 'text-gray-900'} py-1.5 pl-1 placeholder:text-gray-400 focus:outline-none w-full`}
                    readOnly={!editMode}
                    required
                />
            </label>
        </div>
        <div className="mb-4">
            <label className="input input-bordered flex items-center gap-4">
                Fecha de Admisión
                <input
                    type="text"
                    value={new Date(patient.admission_date).toLocaleDateString()}
                    className="text-lg text-gray-900"
                    readOnly
                />
            </label>
        </div>
        <div className="mb-4">
            <label className="input input-bordered flex items-center gap-4">
                Ventilación Mecánica
                <input
                    type="text"
                    value={patient.mechanical_ventilation ? 'Sí' : 'No'}
                    className="text-lg text-gray-900"
                    readOnly
                />
            </label>
        </div>
        <div className="mb-4">
            <label className="input input-bordered flex items-center gap-4">
                Exitus letalis
                <input
                    type="text"
                    value={patient.exitus_letalis ? 'Sí' : 'No'}
                    className="text-lg text-gray-900"
                    readOnly
                />
            </label>
        </div>
        <div className="mb-4">
            <label className="input input-bordered flex items-center gap-4">
                Fecha de Alta
                <input
                    type="text"
                    value={patient.discharge_date ? new Date(patient.discharge_date).toLocaleDateString() : 'No especificada'}
                    className="text-lg text-gray-900"
                    readOnly
                />
            </label>
        </div>

        {editMode ? (
            <div className="flex justify-center space-x-4">
                <button
                    type="button"
                    className="btn btn-gray py-2 px-4 rounded-md"
                    onClick={handleEditModeToggle}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="btn btn-primary py-2 px-4 rounded-md"
                >
                    Guardar Cambios
                </button>
            </div>
        ) : (
            <div className="flex justify-center">
                <button
                    type="button"
                    className="btn btn-primary py-2 px-4 rounded-md"
                    onClick={handleEditModeToggle}
                >
                    Editar Paciente
                </button>
            </div>
        )}
    </form>
}