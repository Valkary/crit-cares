import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { upload_file } from "~/data/files";
import { User } from "~/types";

type Props = {
    user: User,
    patient_id: number
};

export default function UploadFile({ user, patient_id }: Props) {
    const router = useRouter();
    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form_data = new FormData(e.currentTarget);
        const res = await upload_file(form_data);

        console.log(res);

        router.refresh();
    }

    return <form onSubmit={(e) => onSubmit(e)}>
        <fieldset>
            <input type="hidden" name="user_token" value={user.token} />
            <input type="hidden" name="patient_id" value={patient_id} />
            <input
                name="file"
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
            />
        </fieldset>
        <button className="btn">Upload file</button>
    </form>
}