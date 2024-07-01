import { Dispatch } from "react";
import { ApacheScoreForm } from "./create_followup_note";

type Props = {
    formState: ApacheScoreForm,
    setFormState: Dispatch<Partial<ApacheScoreForm>>
}

export default function ApacheScore({ formState, setFormState }: Props) {
    return (
        <form className="mt-4">
            <div className="flex flex-col mb-4 gap-5">
                <label className="input input-bordered flex items-center gap-2">
                    Edad
                    <input
                        type="number"
                        className="grow"
                        placeholder="años"
                        required
                        value={formState.age}
                        onChange={e => setFormState({ age: parseInt(e.currentTarget.value, 10) })}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    Temperatura
                    <input
                        type="number"
                        className="grow"
                        placeholder="°C"
                        required
                        value={formState.temperature}
                        onChange={e => setFormState({ temperature: parseInt(e.currentTarget.value, 10) })}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    Presion arterial
                    <input
                        type="number"
                        className="grow"
                        placeholder="mm Hg"
                        required
                        value={formState.blood_pressure}
                        onChange={e => setFormState({ blood_pressure: parseInt(e.currentTarget.value, 10) })}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    pH
                    <input
                        type="number"
                        className="grow"
                        placeholder="potencial de hidrógeno"
                        required
                        value={formState.ph}
                        onChange={e => setFormState({ ph: parseInt(e.currentTarget.value, 10) })}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    Ritmo cardiaco
                    <input
                        type="number"
                        className="grow"
                        placeholder="pulsasiones por minuto"
                        required
                        value={formState.heart_rate}
                        onChange={e => setFormState({ heart_rate: parseInt(e.currentTarget.value, 10) })}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    Ritmo respiratorio
                    <input
                        type="number"
                        className="grow"
                        placeholder="respiraciones por minuto"
                        required
                        value={formState.respiratory_rate}
                        onChange={e => setFormState({ respiratory_rate: parseInt(e.currentTarget.value, 10) })}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    Sodio
                    <input
                        type="number"
                        className="grow"
                        placeholder="mEq / L"
                        required
                        value={formState.sodium}
                        onChange={e => setFormState({ sodium: parseInt(e.currentTarget.value, 10) })}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    Potasio
                    <input
                        type="number"
                        className="grow"
                        placeholder="mEq / L"
                        required
                        value={formState.potassium}
                        onChange={e => setFormState({ potassium: parseInt(e.currentTarget.value, 10) })}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    Creatinina
                    <input
                        type="number"
                        className="grow"
                        placeholder="mg / dL"
                        required
                        value={formState.creatinine}
                        onChange={e => setFormState({ creatinine: parseInt(e.currentTarget.value, 10) })}
                    />
                </label>
            </div>
        </form>
    )
}