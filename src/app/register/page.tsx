"use client";
import { User, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useToastContext } from "~/context/toast";
import { register_schema } from "~/data/schemas";
import { registerUser } from "~/data/users/register";
import { Button } from "~/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";

const form_register_schema = register_schema
    .merge(z.object({ confirm_password: z.string({ message: "Requerido" }) }))
    .refine(form => form.password === form.confirm_password, { message: "Las contraseñas deben coincidir", path: ["confirm_password"] });

type FormRegisterSchema = z.infer<typeof form_register_schema>;

export default function Page() {
    const router = useRouter();
    const { toast } = useToast()

    const form = useForm<FormRegisterSchema>({
        resolver: zodResolver(form_register_schema),
        defaultValues: {
            role: 'doctor'
        }
    });

    async function submitForm(values: FormRegisterSchema) {
        const { confirm_password, ...register_data } = values;
        const data = await registerUser(register_data);
        if (!data.success) {
            toast({
                variant: "destructive",
                title: "Error creando usuario!",
                description: data.msg,
            });
        } else {
            router.push("/login");
        };
    }

    return (
        <main className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm sm:max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-primary text-center">Registrar</CardTitle>
                    <CardDescription>
                        Bienvenid@ a Crit Care
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitForm)} className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo eletrónico</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="ejemplo@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                    control={form.control}
                                    name="names"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombres</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Pedro" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="last_names"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombres</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Macias Sandoval" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Número de teléfono</FormLabel>
                                            <FormControl>
                                                <Input type="tel" placeholder="3300000000" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Rol</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a verified email to display" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="admin">Administrador</SelectItem>
                                                    <SelectItem value="doctor">Doctor</SelectItem>
                                                    <SelectItem value="secretary">Secretaria</SelectItem>
                                                    <SelectItem value="readonly">Readonly</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirma contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button className="w-full" type="submit">Crear usuario</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    );
}
