'use client';
import { useDebounce } from '@uidotdev/usehooks';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, ListRestartIcon } from 'lucide-react';
import useQueryParams from '~/hooks/useQueryParams';
import { TableHead, TableHeader, TableRow } from '~/components/ui/table';
import CreatePatientModalButton from './create_patient_button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function Filters({
	page,
	total_pages,
}: {
	page: number;
	total_pages: number;
}) {
	const [params, setParams] = useQueryParams();
	const [searchTerm, setSearchTerm] = useState(() => params.search ?? '');
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	useEffect(() => setParams({ search: debouncedSearchTerm }), [debouncedSearchTerm]);

	return (
		<TableHeader>
			<TableRow>
				<TableHead colSpan={10}>
					<CreatePatientModalButton />
				</TableHead>
			</TableRow>
			<TableRow>
				<TableHead colSpan={10}>
					<div className="flex items-center gap-2">
						<Input
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.currentTarget.value)}
							type="text"
							placeholder="Busqueda..."
							className="flex-grow"
						/>

						<Button
							type="button"
							variant={'destructive'}
							onClick={() => setParams({})}
						>
							<ListRestartIcon />
						</Button>

						<div className="flex">
							<Button
								type="button"
								variant={'outline'}
								onClick={() =>
									setParams({
										page: ((Number(params.page) || 0) - 1).toString(),
									})
								}
								disabled={page <= 0}
							>
								<ChevronLeftIcon />
							</Button>
							<Button type="button" variant={'ghost'}>
								{Number(page) + 1} de {total_pages}
							</Button>
							<Button
								type="button"
								variant={'outline'}
								onClick={() =>
									setParams({
										page: ((Number(params.page) || 0) + 1).toString(),
									})
								}
								disabled={page + 1 >= total_pages}
							>
								<ChevronRightIcon />
							</Button>
						</div>
					</div>
				</TableHead>
			</TableRow>
			<TableRow>
				<TableHead />
				<TableHead>Nombres</TableHead>
				<TableHead>Apellidos</TableHead>
				<TableHead>Edad</TableHead>
				<TableHead>Teléfono</TableHead>
				<TableHead>Admisión</TableHead>
				<TableHead>
					<Select
						onValueChange={(value) =>
							setParams({ mechanical_ventilation: value })
						}
						value={params?.mechanical_ventilation ?? 'todos'}
					>
						<SelectTrigger>Ventilación</SelectTrigger>
						<SelectContent>
							<SelectItem value="todos">Todos</SelectItem>
							<SelectItem value="true">Si</SelectItem>
							<SelectItem value="false">No</SelectItem>
						</SelectContent>
					</Select>
				</TableHead>
				<TableHead>
					<Select
						onValueChange={(value) => setParams({ exitus_letalis: value })}
						value={params?.exitus_letalis ?? 'todos'}
					>
						<SelectTrigger>Exitus letalis</SelectTrigger>
						<SelectContent>
							<SelectItem value="todos">Todos</SelectItem>
							<SelectItem value="true">Si</SelectItem>
							<SelectItem value="false">No</SelectItem>
						</SelectContent>
					</Select>
				</TableHead>
				<TableHead>
					<Select
						onValueChange={(value) => setParams({ discharged: value })}
						value={params?.discharged ?? 'todos'}
					>
						<SelectTrigger>Alta</SelectTrigger>
						<SelectContent>
							<SelectItem value="todos">Todos</SelectItem>
							<SelectItem value="true">Si</SelectItem>
							<SelectItem value="false">No</SelectItem>
						</SelectContent>
					</Select>
				</TableHead>
				<TableHead>Fecha alta</TableHead>
			</TableRow>
		</TableHeader>
	);
}
