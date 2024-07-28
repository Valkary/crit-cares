"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

import ApacheScoreForm from "./apache_score_form";
import { type CreateFollowupNoteSchema, create_followup_note_schema } from "~/data/schemas";
import { create_followup_note } from "~/data/followup_notes/create_followup_note";
import { useToast } from "../ui/use-toast";

export default function CreateFollowupNote({ token, patient_id }: { token: string, patient_id: number }) {
    const router = useRouter();
    const { toast } = useToast()

    const form = useForm<CreateFollowupNoteSchema>({
        resolver: zodResolver(create_followup_note_schema),
        defaultValues: {
            user_token: token,
            patient_id,
            title: "",
            description: "",
            apache_score: false,
            apache_score_obj: null
        }
    });

    async function handleSubmit(values: CreateFollowupNoteSchema) {
        const req = await create_followup_note(values);

        if (req.success)
            toast({
                variant: "success",
                title: "Mierda creada en la db"
            });
        else
            toast({
                variant: "destructive",
                title: "Yeet"
            });


        router.refresh();
    }

    return (
        <div>
            <h3 className="text-xl font-semibold text-primary mb-4">Crear nota de seguimiento</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título de la nota</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Ingrese aquí el título" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción de la nota</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Ingrese aquí la descripción" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="apache_score"
                        render={({ field }) => (
                            <FormItem className="flex justify-between items-center">
                                <FormLabel>Apache Score</FormLabel>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.watch("apache_score") && <ApacheScoreForm form={form} />}
                    <Button className="w-full" type="submit">Crear nota</Button>
                </form>
            </Form>
        </div>
    );
}
