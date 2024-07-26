"use client";

import CreatePatient from "~/components/patients/create_patient";
import { Button } from "~/components/ui/button";
import { useModalContext } from "~/context/modal";

export default function CreatePatientModalButton() {
    const { showModal } = useModalContext();

    function openModal() {
        showModal({
            size: "md",
            body: <CreatePatient />,
            title: "Crear nuevo paciente"
        })
    }

    return <Button onClick={openModal}>Crear paciente</Button>
}