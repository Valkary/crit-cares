"use client";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { file_schema } from "~/types";
import { upload_file } from "~/data/files";

type Props = {
    token: string,
    patient_id: number
};

const upload_file_schema = z.object({
    user_token: z.string(),
    patient_id: z.number().int(),
    file_name: z.string({ message: "Ingresa un nombre de archivo" }).min(3, { message: "Mínimo 3 caracteres" }),
})
    .merge(z.object({ file: file_schema }));

type UploadFileSchema = z.infer<typeof upload_file_schema>

export default function UploadFile({ token, patient_id }: Props) {
    const router = useRouter();
    const form = useForm<UploadFileSchema>({
        resolver: zodResolver(upload_file_schema),
        defaultValues: {
            user_token: token,
            patient_id
        }
    })

    async function onSubmit(values: UploadFileSchema) {
        console.log(values);
        const form_data = new FormData();

        Object.keys(values).map(key => form_data.append(key, values[key]));

        const res = await upload_file(form_data);
        router.refresh();
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <FormField
                control={form.control}
                name="file_name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Correo eletrónico</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Nombre a guardar" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="file"
                render={({ field }) => {
                    console.log(field)
                    return (
                        <FormItem>
                            <FormLabel>Archivo a subir</FormLabel>
                            <FormControl>
                                <Input type="file" onChange={(e) => form.setValue("file", e.currentTarget.files[0])} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }}
            />
            <Button className="w-full" size={"lg"} type="submit">Subir archivo</Button>
        </form>
    </Form>
}