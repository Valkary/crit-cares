import { User, KeyRound, Ban, Check } from "lucide-react";
import EditPatient from "~/components/patients/edit_patient";

export default function Login({}) {
    return (
        <div className="dark min-h-screen flex items-center justify-center">
            <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
                <EditPatient />
            </div>    
        </div>
    );
  }