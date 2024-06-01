import ApacheScore from "~/components/apachescore";
import createModal from "~/components/modal";

async function testApi() {
    try {
        const data = await fetch("http://localhost:3000/api/test");
        const json = await data.json();
        console.log(json);
    } catch (err) {
        console.error(err);
    }
}

export default function Dashboard() {
    testApi();

    const modal_0 = createModal("my-modal-0");

    return <main>
        <modal_0.OpenButton>
            <span>Apache Score</span>
        </modal_0.OpenButton>

        <modal_0.Modal>
            <modal_0.Content title="Apache Score">
                <ApacheScore />
                <div class="flex w-full justify-end gap-4">
                    <button class="btn btn-success">Terminar</button>
                    <button class="btn" onclick={modal_0.closeModal}>Cerrar</button>
                </div>
            </modal_0.Content>
        </modal_0.Modal>
    </main>
}