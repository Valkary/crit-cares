import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { upload_file } from "~/data/files";
import { User, file_schema } from "~/types";

type Props = {
    user: User,
    patient_id: number
};

export default function UploadFile({ user, patient_id }: Props) {
    const router = useRouter();
    const [fileError, setFileError] = useState({
        error: false,
        message: ""
    });

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form_data = new FormData(e.currentTarget);
        const res = await upload_file(form_data);

        for (const x of form_data) {
            console.log(x);
        }
        console.log(res);

        router.refresh();
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file_list = e.currentTarget.files ?? [];

        const parsed_file = file_schema.safeParse(file_list[0]);

        if (parsed_file.success)
            return setFileError({ error: false, message: "" });

        return setFileError({ error: true, message: parsed_file.error.issues[0]?.message ?? "" })
    }

    return <form onSubmit={(e) => onSubmit(e)}>
        <fieldset>
            <input type="hidden" name="user_token" value={user.token} />
            <input type="hidden" name="patient_id" value={patient_id} />
            <div className="join w-full">
                <label className="form-control w-full max-w-xs">
                    <label className="input input-bordered flex items-center gap-2">
                        Nombre
                        <input type="text" className="grow" name="file_name" placeholder="archivo" required />
                    </label>
                </label>
                <label className="form-control w-full max-w-xs">
                    <input
                        name="file"
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                        onChange={e => handleFileChange(e)}
                        required
                    />
                    <div className="label w-full flex justify-end">
                        {fileError.error && <span className="label-text-alt text-red-500">{fileError.message}</span>}
                    </div>
                </label>
            </div>
        </fieldset>
        <button className="btn" disabled={fileError.error}>Subir archivo</button>
    </form>
}