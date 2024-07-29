'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '~/context/auth';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@radix-ui/react-popover';
import { CalendarIcon, CheckIcon, LoaderCircle, XIcon } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { Checkbox } from '../ui/checkbox';
import {
	type RegisterPatientSchema,
	register_patient_schema,
} from '~/data/schemas';
import { useMutation } from '@tanstack/react-query';
import { registerPatient } from '~/data/patients/register';
import { useToast } from '../ui/use-toast';
import { useModalContext } from '~/context/modal';

export default function CreatePatient() {
	const { user } = useAuth();
	const router = useRouter();
	const { toast } = useToast();
	const { hideModal } = useModalContext();

	const form = useForm<RegisterPatientSchema>({
		resolver: zodResolver(register_patient_schema),
		defaultValues: {
			user_token: user?.token,
			discharged: false,
			exitus_letalis: false,
			mechanical_ventilation: false,
		},
	});

	async function handleSubmit(values: RegisterPatientSchema) {
		const create_patient_req = await registerPatient(values);

		if (!create_patient_req.success) {
			toast({
				variant: 'destructive',
				title: 'Error creando paciente',
				description: create_patient_req.error_msg,
			});
			throw new Error('error');
		}

		toast({
			variant: 'success',
			title: 'Paciente creado correctamente',
			description: create_patient_req.msg,
		});

		hideModal();
		router.refresh();
		return;
	}

	const { mutate, status } = useMutation({
		mutationFn: handleSubmit,
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data) => mutate(data))}
				className="grid gap-2 grid-cols-2"
			>
				<FormField
					control={form.control}
					name="names"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombres</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="ingrese los nombres del paciente"
									{...field}
								/>
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
							<FormLabel>Apellidos</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="ingrese los apellidos del paciente"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="age"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Edad</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="ingrese la edad del paciente"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Teléfono</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="ingrese el número de teléfono del paciente"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="admission_date"
					render={({ field }) => (
						<FormItem className="flex flex-col col-span-2">
							<FormLabel>Fecha de admisión</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground',
											)}
										>
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>admisión</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto p-0 bg-white rounded-lg border"
									align="start"
								>
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date: Date) =>
											date > new Date() || date < new Date('1900-01-01')
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-col gap-2">
					<FormField
						control={form.control}
						name="mechanical_ventilation"
						render={({ field }) => (
							<FormItem className="flex items-center justify-between">
								<FormLabel className="flex-grow">
									Ventilación mecánica
								</FormLabel>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="exitus_letalis"
						render={({ field }) => (
							<FormItem className="flex items-center justify-between">
								<FormLabel className="flex-grow">Exitus letalis</FormLabel>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="discharged"
						render={({ field }) => (
							<FormItem className="flex items-center justify-between">
								<FormLabel className="flex-grow">Alta médica</FormLabel>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					className="w-full col-start-1 col-span-2"
					disabled={status === 'pending'}
					type="submit"
				>
					{status === 'pending' ? (
						<>
							<LoaderCircle className="animate-spin" />
							Creando paciente
						</>
					) : status === 'error' ? (
						<>
							<XIcon className="text-destructive" />
							<span>Error creando paciente</span>
						</>
					) : status === 'success' ? (
						<>
							<CheckIcon className="text-green-400" />
							<span>Paciente creado</span>
						</>
					) : (
						<span>Crear paciente</span>
					)}
				</Button>
			</form>
		</Form>
	);
}
