import {
  useSubmission,
  type RouteSectionProps
} from "@solidjs/router";
import { User, KeyRound } from "lucide-solid";

export default function Login(props: RouteSectionProps) {
  return (
    <main>
      <div class="dark min-h-screen flex items-center justify-center">
        <div class="w-full max-w-md rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-white text-center">Login</h2>
          <p class="mt-2 text-center text-gray-400">Bienvenid@ a Crit Cares</p>
          <form class="mt-4">
            <div class="flex flex-col mb-4 gap-5">
              <label class="input input-bordered flex items-center gap-2">
                Usuario
                <input type="text" class="grow" placeholder="Nombre de usuario" required />
                <User />
              </label>
              <label class="input input-bordered flex items-center gap-2">
                Contraseña
                <input type="text" class="grow" placeholder="Contraseña" required />
                <KeyRound />
              </label>
            </div>
            <button type="submit" class="btn btn-primary w-full py-2 px-4 rounded-md">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
