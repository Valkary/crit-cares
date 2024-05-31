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
                        <input type="text" class="grow" placeholder="grados celsius" required />
                    </label>
                </div>
            </form>
        </div>
    )
}