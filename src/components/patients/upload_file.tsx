'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { upload_file } from '~/data/files';
import { file_schema } from '~/types';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';

type Props = {
	token: string;
	patient_id: number;
};

const upload_file_schema = z
	.object({
		user_token: z.string(),
		patient_id: z.number().int(),
		file_name: z
			.string({ message: 'Ingresa un nombre de archivo' })
			.min(3, { message: 'Mínimo 3 caracteres' }),
	})
	.merge(z.object({ file: file_schema }));
type UploadFileSchema = z.infer<typeof upload_file_schema>;

export default function UploadFile({ token, patient_id }: Props) {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<UploadFileSchema>({
		resolver: zodResolver(upload_file_schema),
		defaultValues: {
			user_token: token,
			patient_id,
		},
	});

	async function onSubmit(values: UploadFileSchema) {
		const form_data = new FormData();

		Object.keys(values).map((key) => {
			const a = values[key as keyof typeof values];
			form_data.append(key, a as string | Blob);
		});

		const res = await upload_file(form_data);

		if (res.success) {
			toast({
				variant: 'success',
				title: 'Archivo subido con éxito!',
				description: res.msg,
			});
			form.reset();
		} else {
			toast({
				variant: 'destructive',
				title: 'Error subiendo el archivo!',
				description: res.error_msg,
			});
		}

		router.refresh();
	}

	function onFileChange(e: ChangeEvent<HTMLInputElement>) {
		const files = e.currentTarget.files;

		if (!files || !files[0]) {
			form.setError('file', {
				type: 'required',
				message: 'Agregue un archivo válido',
			});
		} else {
			form.setValue('file', files[0]);
		}
	}

	return (
		<Form {...form}>
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
					render={() => (
						<FormItem>
							<FormLabel>Archivo a subir</FormLabel>
							<FormControl>
								<Input type="file" onChange={onFileChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full" size={'lg'} type="submit">
					Subir archivo
				</Button>
			</form>
		</Form>
	);
}
