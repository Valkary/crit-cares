import { FormEvent, ReactNode, useReducer, useRef, useState } from "react"
import { UserPlus, Ban, Check, NotepadText } from 'lucide-react';
import { registerPatient } from "~/data/patients/register";
import { User } from "~/context/auth";
import { create_followup_note } from "~/data/followup_notes/create_followup_note";

type CreatePatientForm = {
    patient_id: number,
    creator_token: string,
    description: string,
    apache_score_id: number | null
}

type CreateStates = "idle" | "loading" | "error" | "success";

const create_followup_note_form: CreatePatientForm = {
    patient_id: 0,
    creator_token: "",
    description: "",
    apache_score_id: null
}

const button_states: Record<CreateStates, ReactNode> = {
    idle: <button
        type="submit"
        className="btn btn-primary w-full py-2 px-4 rounded-md"
    >
        <span>Crear paciente</span>
    </button>,
    loading: <button
        type="submit"
        className="btn btn-primary w-full py-2 px-4 rounded-md"
        disabled
    >
        <span className="loading loading-dots loading-lg"></span>
    </button>,
    error: <button
        type="submit"
        className="btn btn-error w-full py-2 px-4 rounded-md"
    >
        <Ban />
        <span>Error creando paciente</span>
    </button>,
    success: <button
        type="submit"
        className="btn btn-success w-full py-2 px-4 rounded-md"
        disabled
    >
        <Check />
        <span>Paciente creado</span>
    </button>

}

function reducer(state: CreatePatientForm, action: Partial<CreatePatientForm>): CreatePatientForm {
    return {
        ...state,
        ...action,
    };
}

export default function CreateFollowupNote({ user, patient_id }: { user: User, patient_id: number }) {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [formState, setFormState] = useReducer(reducer, {
        ...create_followup_note_form,
        creator_token: user.token,
    });
    const [createState, setCreateState] = useState<CreateStates>("idle");

    async function submitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setCreateState("loading");

        const create_followup_note_req = await create_followup_note({
            user_token: user.token,
            patient_id: patient_id,
            description: formState.description
        });

        if (create_followup_note_req.success) return setCreateState("success");
        else return setCreateState("error");
    }

    function handleModalOpen() {
        modalRef.current?.showModal()
    }

    return <>
        <button className="btn" onClick={handleModalOpen}>
            <NotepadText />
            Crear nota
        </button>
        <dialog ref={modalRef} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Crear paciente</h3>
                <form
                    method="post"
                    className="mt-4 flex flex-col mb-4 gap-5"
                    onSubmit={e => submitForm(e)}
                >
                    <textarea
                        className="textarea textarea-bordered"
                        placeholder="Descripción"
                        value={formState.description}
                        onChange={e => setFormState({ description: e.currentTarget.value })}
                    />
                    {button_states[createState]}
                </form>
            </div>
        </dialog>
    </>
}