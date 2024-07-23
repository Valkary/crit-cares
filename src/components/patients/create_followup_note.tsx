"use client";
import { type FormEvent, type ReactNode, useReducer, useRef, useState } from "react"
import { Ban, Check } from 'lucide-react';
import { create_followup_note, CreateFollowupNoteSchema } from "~/data/followup_notes/create_followup_note";
import { useRouter } from "next/navigation";
import ApacheScore from "./apache_score_form";

type CreatePatientForm = {
    patient_id: number,
    creator_token: string,
    description: string,
    apache_score: boolean,
    title: string,
}

export type ApacheScoreForm = {
    age: number,
    temperature: number,
    blood_pressure: number,
    ph: number,
    heart_rate: number,
    respiratory_rate: number,
    sodium: number,
    potassium: number,
    creatinine: number,
};

type CreateStates = "idle" | "loading" | "error" | "success";

const apache_score_form: ApacheScoreForm = {
    age: 0,
    temperature: 0,
    blood_pressure: 0,
    ph: 0,
    heart_rate: 0,
    respiratory_rate: 0,
    sodium: 0,
    potassium: 0,
    creatinine: 0,
};

function apache_reducer(state: ApacheScoreForm, action: Partial<ApacheScoreForm>): ApacheScoreForm {
    return {
        ...state,
        ...action,
    };
}

const create_followup_note_form: CreatePatientForm = {
    patient_id: 0,
    creator_token: "",
    description: "",
    title: "",
    apache_score: false
}

function followup_reducer(state: CreatePatientForm, action: Partial<CreatePatientForm>): CreatePatientForm {
    return {
        ...state,
        ...action,
    };
}

const button_states: Record<CreateStates, ReactNode> = {
    idle: <button
        type="submit"
        className="btn btn-primary w-full py-2 px-4 rounded-md"
    >
        <span>Crear nota</span>
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
        <span>Error creando nota</span>
    </button>,
    success: <button
        type="submit"
        className="btn btn-success w-full py-2 px-4 rounded-md"
        disabled
    >
        <Check />
        <span>Nota creada</span>
    </button>
}

export default function CreateFollowupNote({ token, patient_id }: { token: string, patient_id: number }) {
    const modalRef = useRef<HTMLDialogElement>(null);
    const router = useRouter()
    const [formState, setFormState] = useReducer(followup_reducer, {
        ...create_followup_note_form,
        creator_token: token,
    });
    const [apacheFormState, setApacheFormState] = useReducer(apache_reducer, { ...apache_score_form });

    const [createState, setCreateState] = useState<CreateStates>("idle");

    async function submitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setCreateState("loading");
        
        const create_followup_note_req = await create_followup_note({
            user_token: token,
            patient_id: patient_id,
            description: formState.description,
            title: formState.title,
            apache_score: formState.apache_score,
            apache_score_obj: formState.apache_score ? apacheFormState : null
        } as CreateFollowupNoteSchema);

        if (create_followup_note_req.success) {
            setCreateState("idle");
            setFormState({ ...create_followup_note_form });
            router.refresh();
            modalRef.current?.close();
        } else {
            setCreateState("error");
        }
    }

    return <div>
        <h3 className="text-xl font-semibold text-primary mb-4">Crear nota de seguimiento</h3>
        <form
            method="post"
            className="mt-4 flex flex-col mb-4 gap-5"
            onSubmit={e => submitForm(e)}
        >
            <label className="input input-bordered flex items-center gap-2">
                Título
                <input
                    type="text"
                    className="grow"
                    placeholder="título de la nota"
                    value={formState.title}
                    onChange={e => setFormState({ title: e.currentTarget.value })}
                    required
                />
            </label>
            <textarea
                className="textarea textarea-bordered"
                placeholder="Descripción"
                value={formState.description}
                onChange={e => setFormState({ description: e.currentTarget.value })}
                required
            />

            <label className="label cursor-pointer">
                <span className="label-text">Apache score</span>
                <input
                    type="checkbox"
                    className="toggle"
                    checked={formState.apache_score}
                    onChange={() => setFormState({ apache_score: !formState.apache_score })}
                />
            </label>

            {
                formState.apache_score &&
                <ApacheScore
                    formState={apacheFormState}
                    setFormState={setApacheFormState}
                />
            }

            {button_states[createState]}
        </form>
    </div>
}