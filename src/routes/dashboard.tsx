import ApacheScore from "~/components/apachescore";
import createModal from "~/components/modal";

export default function Dashboard() {
    const modal_0 = createModal("my-modal-0");
    const modal_1 = createModal("my-modal-1");

    return <main>
        <modal_0.OpenButton>
            <span>Apache Score</span>
        </modal_0.OpenButton>

        <modal_0.Modal>
            <modal_0.Content title="Apache Score">
                <ApacheScore />
                <modal_0.CloseButton title="Cerrar" />
            </modal_0.Content>
        </modal_0.Modal>

        <modal_1.OpenButton>
            <span>Test modal 1</span>
        </modal_1.OpenButton>

        <modal_1.Modal>
            <modal_1.Content title="Test">
                Test
                <modal_0.CloseButton title="Cerrar" />
            </modal_1.Content>
        </modal_1.Modal>
    </main>
}