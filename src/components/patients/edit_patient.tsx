"use client";
import { useState } from "react"

export default function EditPatient({ }) {
    interface Patient {
        id: number;
        names: string;
        last_names: string;
        age: number;
        phone: string;
        admission_date: Date;
        mechanical_ventilation: boolean;
        exitus_letalis: boolean;
        doctor_id: number;
        discharge_date: Date | null; // Allow null for discharge_date if it's nullable
        creation_date: Date;
    }

    const initialPatient: Patient = {
        id: 1,
        names: "John",
        last_names: "Doe",
        age: 35,
        phone: "+1234567890",
        admission_date: new Date(),
        mechanical_ventilation: false,
        exitus_letalis: false,
        doctor_id: 1,
        discharge_date: null, // Initialize discharge_date as null or a valid Date object
        creation_date: new Date(),
    };

    // State for patient data
    const [patient, setPatient] = useState(initialPatient);

    // State for edit mode
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

    const handleToggleChange = (name: keyof typeof initialPatient) => {
        setPatient({ ...patient, [name]: !patient[name] });
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const dateValue = value ? new Date(value) : null; // Parse string to Date object
        setPatient({ ...patient, [name]: dateValue });
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6 m-2 sm:m-8">
            <h2 className="text-2xl font-semibold text-primary text-center mb-4">Perfil de Paciente</h2>
            <form onSubmit={handleSaveChanges}>
                <div className="mb-4">
                    <label className="flex items-center gap-4 w-full">
                        <span className="w-1/3 sm:w-1/4">Nombres</span>
                        <input
                            type="text"
                            name="names"
                            value={patient.names}
                            onChange={handleChange}
                            className={`text-lg ${editMode ? 'border-b-2 border-primary' : 'text-gray-900'} py-1.5 pl-1 placeholder:text-gray-400 focus:outline-none w-2/3 sm:w-3/4`}
                            readOnly={!editMode}
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center gap-4 w-full">
                        <span className="w-1/3 sm:w-1/4">Apellidos</span>
                        <input
                            type="text"
                            name="last_names"
                            value={patient.last_names}
                            onChange={handleChange}
                            className={`text-lg ${editMode ? 'border-b-2 border-primary' : 'text-gray-900'} py-1.5 pl-1 placeholder:text-gray-400 focus:outline-none w-2/3 sm:w-3/4`}
                            readOnly={!editMode}
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center gap-4 w-full">
                        <span className="w-1/3 sm:w-1/4">Edad</span>
                        <input
                            type="number"
                            name="age"
                            value={patient.age}
                            onChange={handleChange}
                            className={`text-lg ${editMode ? 'border-b-2 border-primary' : 'text-gray-900'} py-1.5 pl-1 placeholder:text-gray-400 focus:outline-none w-2/3 sm:w-3/4`}
                            readOnly={!editMode}
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center gap-4 w-full">
                        <span className="w-1/3 sm:w-1/4">Teléfono</span>
                        <input
                            type="text"
                            name="phone"
                            value={patient.phone}
                            onChange={handleChange}
                            className={`text-lg ${editMode ? 'border-b-2 border-primary' : 'text-gray-900'} py-1.5 pl-1 placeholder:text-gray-400 focus:outline-none w-2/3 sm:w-3/4`}
                            readOnly={!editMode}
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center gap-4 w-full">
                        <span className="w-1/3 sm:w-1/4">Fecha de Admisión</span>
                        <input
                            type="date"
                            name="admission_date"
                            value={patient.admission_date.toISOString().slice(0, 10)} // Format Date to ISO string for input value
                            onChange={handleDateChange}
                            className={`text-lg ${editMode ? 'border-b-2 border-primary' : 'text-gray-900'} py-1.5 pl-1 placeholder:text-gray-400 focus:outline-none w-2/3 sm:w-3/4`}
                            readOnly={!editMode}
                            required
                        />

                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center gap-4 w-full">
                        <span className="w-1/3 sm:w-1/4">Ventilación Mecánica</span>
                        {editMode ? (
                            <div className="flex w-2/3 sm:w-3/4">
                                <div
                                    onClick={() => handleToggleChange('mechanical_ventilation')}
                                    className={`w-1/2 py-2 text-center cursor-pointer ${patient.mechanical_ventilation ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} rounded-l-md`}
                                >
                                    Sí
                                </div>
                                <div
                                    onClick={() => handleToggleChange('mechanical_ventilation')}
                                    className={`w-1/2 py-2 text-center cursor-pointer ${!patient.mechanical_ventilation ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} rounded-r-md`}
                                >
                                    No
                                </div>
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={patient.mechanical_ventilation ? 'Sí' : 'No'}
                                className="text-lg text-gray-900 w-2/3 sm:w-3/4"
                                readOnly
                            />
                        )}
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center gap-4 w-full">
                        <span className="w-1/3 sm:w-1/4">Fallecimiento</span>
                        {editMode ? (
                            <div className="flex w-2/3 sm:w-3/4">
                                <div
                                    onClick={() => handleToggleChange('exitus_letalis')}
                                    className={`w-1/2 py-2 text-center cursor-pointer ${patient.exitus_letalis ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} rounded-l-md`}
                                >
                                    Sí
                                </div>
                                <div
                                    onClick={() => handleToggleChange('exitus_letalis')}
                                    className={`w-1/2 py-2 text-center cursor-pointer ${!patient.exitus_letalis ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} rounded-r-md`}
                                >
                                    No
                                </div>
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={patient.exitus_letalis ? 'Sí' : 'No'}
                                className="text-lg text-gray-900 w-2/3 sm:w-3/4"
                                readOnly
                            />
                        )}
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center gap-4 w-full">
                        <span className="w-1/3 sm:w-1/4">Médico Tratante</span>
                        <input
                            type="text"
                            name="doctor_id"
                            value={patient.doctor_id}
                            onChange={handleChange}
                            className={`text-lg ${editMode ? 'border-b-2 border-primary' : 'text-gray-900'} py-1.5 pl-1 placeholder:text-gray-400 focus:outline-none w-2/3 sm:w-3/4`}
                            readOnly={!editMode}
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center gap-4 w-full">
                        <span className="w-1/3 sm:w-1/4">Fecha de Alta</span>
                        <input
                            type="date"
                            name="discharge_date"
                            value={patient.discharge_date?.toISOString().slice(0, 10) || ''}
                            onChange={handleDateChange}
                            className={`text-lg ${editMode ? 'border-b-2 border-primary' : 'text-gray-900'} py-1.5 pl-1 placeholder:text-gray-400 focus:outline-none w-2/3 sm:w-3/4`}
                            readOnly={!editMode}
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center gap-4 w-full">
                        <span className="w-1/3 sm:w-1/4">Fecha de Creación</span>
                        <input
                            type="date"
                            name="creation_date"
                            value={patient.creation_date.toISOString().slice(0, 10)}
                            onChange={handleDateChange}
                            className={`text-lg ${editMode ? 'border-b-2 border-primary' : 'text-gray-900'} py-1.5 pl-1 placeholder:text-gray-400 focus:outline-none w-2/3 sm:w-3/4`}
                            readOnly={!editMode}
                            required
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
                            className="btn btn-primary py-2 px-4 rounded-md text-white"
                        >
                            Guardar
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="btn btn-primary py-2 px-4 rounded-md text-white"
                            onClick={handleEditModeToggle}
                        >
                            Editar
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}