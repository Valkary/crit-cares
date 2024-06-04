import { useSubmission, type RouteSectionProps } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { User, KeyRound, Ban } from "lucide-solid";
import { Show, createSignal } from "solid-js";

type LoginForm = {
  email: string,
  password: string,
}

async function fetchLogin(form: HTMLFormElement | null) {
  if (!form) return;
  const formData = new FormData(form);
  const query = await fetch("/api/auth/login", { method: "post", body: formData });
  return await query.json();
}

export default function Login(props: RouteSectionProps) {
  let form: HTMLFormElement | null = null;

  const loginQuery = createQuery(() => ({
    queryKey: ['loginQuery'],
    queryFn: async () => fetchLogin(form),
    enabled: false,
  }));

  function loginAction(event: SubmitEvent) {
    event.preventDefault();
    loginQuery.refetch();
  }

  return (
    <main>
      <Show when={loginQuery.isError}>
        <div role="alert" class="alert alert-error fixed bottom-0 right-0 m-5 w-fit">
          <Ban />
          <span>Usuario o contraseña incorrectos</span>
        </div>
      </Show>
      <div class="dark min-h-screen flex items-center justify-center">
        <div class="w-full max-w-md rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-white text-center">Login</h2>
          <p class="mt-2 text-center text-gray-400">Bienvenid@ a Crit Cares</p>
          <form
            ref={el => form = el}
            method="post"
            action={"/api/auth/login"}
            class="mt-4 flex flex-col mb-4 gap-5"
            onSubmit={loginAction}
          >
            <label class="input input-bordered flex items-center gap-2">
              Email
              <input
                type="email"
                name="email"
                class="grow"
                placeholder="correo electrónico"
                required
              />
              <User />
            </label>
            <label class="input input-bordered flex items-center gap-2">
              Contraseña
              <input
                type="password"
                name="password"
                class="grow"
                placeholder="contraseña"
                required
              />
              <KeyRound />
            </label>
            <button
              type="submit"
              class="btn btn-primary w-full py-2 px-4 rounded-md"
              disabled={loginQuery.isLoading}
            >
              {loginQuery.isLoading ?
                <span class="loading loading-dots loading-lg"></span> :
                <span>Iniciar sesión</span>
              }
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
