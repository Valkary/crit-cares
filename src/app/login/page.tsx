"use client";
import { User, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useContext, useState } from "react";
import { AuthContext } from "~/context/auth";
import { loginUser } from "~/data/users/login";

export default function Login({}) {
  const { loginUser: loginContextUser } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const login = await loginUser({
      email,
      password
    });

    if (!login.success)
      return console.log("Error");

    loginContextUser(login.user);
    router.push("/logged");
  }

  return (
    <main>
      <div className="dark min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-primary text-center">Login</h2>
          <p className="mt-2 text-center text-gray-400">Bienvenid@ a Crit Cares</p>
          <form
            method="post"
            className="mt-4 flex flex-col mb-4 gap-5"
            onSubmit={e => handleLogin(e)}
          >
            <label className="input input-bordered flex items-center gap-2">
              Email
              <input
                type="email"
                name="email"
                className="grow"
                placeholder="correo electrónico"
                onChange={e => setEmail(e.currentTarget.value)}
                value={email}
                required
              />
              <User />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Contraseña
              <input
                type="password"
                name="password"
                className="grow"
                placeholder="contraseña"
                onChange={e => setPassword(e.currentTarget.value)}
                value={password}
                required
              />
              <KeyRound />
            </label>
            <button
              type="submit"
              className="btn btn-primary w-full py-2 px-4 rounded-md"
              // disabled={loginQuery.isLoading}
            >
              {false ?
                <span className="loading loading-dots loading-lg"></span> :
                <span>Iniciar sesión</span>
              }
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
