import { User, KeyRound, Ban } from "lucide-react";

export default function Login({}) {
  return (
    <main>
      <div className="dark min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-primary text-center">Login</h2>
          <p className="mt-2 text-center text-gray-400">Bienvenid@ a Crit Cares</p>
          <form
            method="post"
            className="mt-4 flex flex-col mb-4 gap-5"
          >
            <label className="input input-bordered flex items-center gap-2">
              Email
              <input
                type="email"
                name="email"
                className="grow"
                placeholder="correo electrónico"
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
