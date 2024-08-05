'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '~/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useToast } from '~/components/ui/use-toast';
import { useAuth } from '~/context/auth';
import { login } from '~/data/users/login';

const login_schema = z.object({
	email: z
		.string({ message: 'Requerido' })
		.email({ message: 'Ingrese un email válido' }),
	password: z
		.string({ message: 'Requerido' })
		.min(5, { message: 'Contraseña muy corta' }),
});

type FormLoginSchema = z.infer<typeof login_schema>;

export default function Page() {
	const { loginUser: loginContextUser } = useAuth();
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<FormLoginSchema>({
		resolver: zodResolver(login_schema),
	});

	async function handleLogin(values: FormLoginSchema) {
		const login_req = await login(values);

		if (!login_req.success) {
			toast({
				variant: 'destructive',
				title: 'Error de inicio de sesión!',
				description: login_req.msg,
			});
			return;
		}

		loginContextUser(login_req.user);
		router.push('/logged/patients');
	}

	return (
		<main className="min-h-screen flex items-center justify-center">
			<Card className="w-full max-w-sm sm:max-w-2xl">
				<CardHeader>
					<CardTitle className="text-2xl font-semibold text-primary text-center">
						Iniciar sesión
					</CardTitle>
					<CardDescription>Bienvenid@ a Crit Cares</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleLogin)}
							className="grid gap-2"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Correo eletrónico</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="ejemplo@gmail.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contraseña</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="contraseña"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button className="w-full" type="submit">
								Iniciar sesión
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</main>
	);
}
