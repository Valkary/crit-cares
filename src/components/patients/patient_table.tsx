import type { User } from "~/context/auth"

export default function PatientTable({ user }: { user: User }) {
    return <div className="overflow-x-auto">
        <table className="table table-xs">
            <thead>
                <tr>
                    <th></th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Edad</th>
                    <th>Teléfono</th>
                    <th>Admisión</th>
                    <th>Ventilación</th>
                    <th>Exitus Letalis</th>
                    <th>Alta</th>
                    <th>Fecha alta</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                </tr>
            </tbody>
        </table>
    </div>
}