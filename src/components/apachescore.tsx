export default function ApacheScore() {
    return (
        <div class="dark flex items-center justify-center p-6">
            <form class="mt-4">
                <div class="flex flex-col mb-4 gap-5">
                    <label class="input input-bordered flex items-center gap-2">
                        Edad
                        <input type="text" class="grow" placeholder="años" required />
                    </label>
                    <label class="input input-bordered flex items-center gap-2">
                        Temperatura
                        <input type="text" class="grow" placeholder="°C" required />
                    </label>
                    <label class="input input-bordered flex items-center gap-2">
                        Presion arterial
                        <input type="text" class="grow" placeholder="mm Hg" required />
                    </label>
                    <label class="input input-bordered flex items-center gap-2">
                        pH
                        <input type="text" class="grow" placeholder="potencial de hidrógeno" required />
                    </label>
                    <label class="input input-bordered flex items-center gap-2">
                        Ritmo cardiaco
                        <input type="text" class="grow" placeholder="pulsasiones por minuto" required />
                    </label>
                    <label class="input input-bordered flex items-center gap-2">
                        Ritmo respiratorio
                        <input type="text" class="grow" placeholder="respiraciones por minuto" required />
                    </label>
                    <label class="input input-bordered flex items-center gap-2">
                        Sodio
                        <input type="text" class="grow" placeholder="mEq / L" required />
                    </label>
                    <label class="input input-bordered flex items-center gap-2">
                        Potasio
                        <input type="text" class="grow" placeholder="mEq / L" required />
                    </label>
                    <label class="input input-bordered flex items-center gap-2">
                        Creatinina
                        <input type="text" class="grow" placeholder="mg / dL" required />
                    </label>
                </div>
            </form>
        </div>
    )
}