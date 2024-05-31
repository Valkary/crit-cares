import ApacheScore from "~/components/apachescore";
import Modal from "~/components/modal";

export default function Dashboard() {
    return <main>
        <Modal.Button>
            <span>Apache Score</span>
        </Modal.Button>

        <Modal id="my-modal">
            <Modal.Content title="Apache Score">
                <ApacheScore />
                <Modal.CloseButton title="Cerrar" />
            </Modal.Content>
        </Modal>
    </main>
}