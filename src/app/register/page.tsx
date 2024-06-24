"use client";
import { User, KeyRound, Ban, Check } from "lucide-react";
import { FormEvent, useReducer, useState } from "react";
import { UserRole } from "~/context/auth";
import { registerUser } from "~/data/users/register";

type RegisterForm = {
    email: string;
    names: string;
    last_names: string;
    password: string;
    confirm_password: string;
    phone: string,
    role: UserRole;
}

const form: RegisterForm = {
    email: "",
    names: "",
    last_names: "",
    password: "",
    phone: "",
    confirm_password: "",
    role: "admin"
};

type RegisterFormAction = Partial<RegisterForm>;

function reducer(state: RegisterForm, action: RegisterFormAction): RegisterForm {
    return {
        ...state,
        ...action,
    };
}

export default function Register() {
    const [formState, setFormState] = useReducer(reducer, form);
    const [alert, setAlert] = useState({
        show: false,
        msg: "",
        error: false,
    });

    async function submitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = await registerUser({
            email: formState.email,
            names: formState.names,
            last_names: formState.last_names,
            password: formState.password,
            phone: formState.phone,
            role: formState.role
        });

        if (!data.success) setAlert({ show: true, msg: data.msg, error: true });
        else setAlert({ show: true, msg: data.msg, error: false });

        setTimeout(() => setAlert({ ...alert, show: false }), 5000);
    }

    return (
        <main>
            {(alert.error && alert.show)  &&
                <div role="alert" className="alert alert-error shadow-lg absolute right-5 bottom-5 w-fit">
                    <Ban />
                    <div>
                        <h3 className="font-bold">Error creando usuario</h3>
                        <div className="text-xs">{alert.msg}</div>
                    </div>
                </div>}


            {(!alert.error && alert.show) &&
                <div role="alert" className="alert alert-success shadow-lg absolute right-5 bottom-5 w-fit">
                    <Check />
                    <div>
                        <h3 className="font-bold">Usuario creado con éxito</h3>
                        <div className="text-xs">{alert.msg}</div>
                    </div>
                </div>
            }

            <div className="dark min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold text-primary text-center">Registrar</h2>
                    <p className="mt-2 text-center text-gray-400">Bienvenid@ a Crit Cares</p>
                    <form
                        method="post"
                        className="mt-4 flex flex-col mb-4 gap-5"
                        onSubmit={e => submitForm(e)}
                    >
                        <label className="input input-bordered flex items-center gap-2">
                            Email
                            <input
                                type="email"
                                name="email"
                                className="grow"
                                placeholder="correo electrónico"
                                onChange={e => setFormState({ email: e.currentTarget.value })}
                                required
                            />
                            <User />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Nombres
                            <input
                                type="text"
                                name="names"
                                className="grow"
                                placeholder="correo electrónico"
                                onChange={e => setFormState({ names: e.currentTarget.value })}
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Apellidos
                            <input
                                type="text"
                                name="last_names"
                                className="grow"
                                placeholder="correo electrónico"
                                onChange={e => setFormState({ last_names: e.currentTarget.value })}
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Teléfono
                            <input
                                type="text"
                                name="phone"
                                className="grow"
                                placeholder="correo electrónico"
                                onChange={e => setFormState({ phone: e.currentTarget.value })}
                                required
                            />
                        </label>
                        <div className="flex items-center">
                            <span className="flex-grow">Rol</span>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                onChange={e => setFormState({ role: e.currentTarget.value as UserRole })}
                            >
                                <option value={"admin"}>Administrador</option>
                                <option value={"doctor"}>Doctor</option>
                                <option value={"secretary"}>Secretaria</option>
                                <option value={"readonly"}>Readonly</option>
                            </select>
                        </div>
                        <label className="input input-bordered flex items-center gap-2">
                            Contraseña
                            <input
                                type="password"
                                name="password"
                                className="grow"
                                placeholder="contraseña"
                                onChange={e => setFormState({ password: e.currentTarget.value })}
                                required
                            />
                            <KeyRound />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Confirmar
                            <input
                                type="password"
                                name="confirm-password"
                                className="grow"
                                placeholder="contraseña"
                                onChange={e => setFormState({ confirm_password: e.currentTarget.value })}
                                required
                            />
                            <KeyRound />
                        </label>
                        <button
                            type="submit"
                            className="btn btn-primary w-full py-2 px-4 rounded-md"
                        >
                            Crear usuario
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
