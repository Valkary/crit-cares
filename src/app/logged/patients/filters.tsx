'use client';
import { useDebounce } from '@uidotdev/usehooks';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import {
	CalendarIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ListRestartIcon,
} from 'lucide-react';
import useQueryParams from '~/hooks/useQueryParams';
import { TableHead, TableHeader, TableRow } from '~/components/ui/table';
import CreatePatientModalButton from './create_patient_button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from '@/components/ui/select';
import type { PatientSearchParams } from './page';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@radix-ui/react-popover';
import { Calendar } from '@/components/ui/calendar';
import { addDays, fromUnixTime, getUnixTime } from 'date-fns';
import type { DateRange } from 'react-day-picker';

export default function Filters({
	page,
	total_pages,
}: {
	page: number;
	total_pages: number;
}) {
	const [params, setParams, setNamedParam, deleteNamedParam] =
		useQueryParams<PatientSearchParams>();
	const [searchTerm, setSearchTerm] = useState(() => params.search ?? '');
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	const [admissionDate, setAdmissionDate] = useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 7),
	});

	const [dischargeDate, setDischargeDate] = useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 7),
	});

	function updateDateValue(
		type: 'admission' | 'discharge',
		dates: DateRange | undefined,
	) {
		if (type === 'admission') {
			setAdmissionDate(dates);
			dates?.from
				? setNamedParam('admission_from', getUnixTime(dates.from))
				: deleteNamedParam('admission_from');

			dates?.to
				? setNamedParam('admission_to', getUnixTime(dates.to))
				: deleteNamedParam('admission_to');
		} else {
			setDischargeDate(dates);
			dates?.from
				? setNamedParam('discharged_from', getUnixTime(dates.from))
				: deleteNamedParam('discharged_from');

			dates?.to
				? setNamedParam('discharged_to', getUnixTime(dates.to))
				: deleteNamedParam('discharged_to');
		}

		return;
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(
		() => setParams({ search: debouncedSearchTerm }),
		[debouncedSearchTerm],
	);

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
						<span>Busqueda: </span>
						<Input
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.currentTarget.value)}
							type="text"
							placeholder="nombres, apellidos, teléfonos..."
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
										page: (Number(params.page) || 0) - 1,
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
										page: (Number(params.page) || 0) + 1,
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
				<TableHead>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id="date"
								variant={'outline'}
								className="justify-start text-left font-normal"
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								<span>Admisión</span>
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className="w-auto p-0 bg-background border border-border rounded-md shadow-lg mt-1"
							align="start"
						>
							<Calendar
								initialFocus
								mode="range"
								defaultMonth={admissionDate?.from}
								selected={admissionDate}
								onSelect={(dates) => updateDateValue('admission', dates)}
								numberOfMonths={2}
							/>
						</PopoverContent>
					</Popover>
				</TableHead>
				<TableHead>
					<Select
						onValueChange={(value) =>
							setParams({
								mechanical_ventilation:
									value as PatientSearchParams['mechanical_ventilation'],
							})
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
						onValueChange={(value) =>
							setParams({
								exitus_letalis: value as PatientSearchParams['exitus_letalis'],
							})
						}
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
						onValueChange={(value) =>
							setParams({
								discharged: value as PatientSearchParams['discharged'],
							})
						}
						value={params?.discharged ?? 'todos'}
					>
						<SelectTrigger>Dado de alta</SelectTrigger>
						<SelectContent>
							<SelectItem value="todos">Todos</SelectItem>
							<SelectItem value="true">Si</SelectItem>
							<SelectItem value="false">No</SelectItem>
						</SelectContent>
					</Select>
				</TableHead>
				<TableHead>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id="date"
								variant={'outline'}
								className="justify-start text-left font-normal"
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								<span>Alta</span>
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className="w-auto p-0 bg-background border border-border rounded-md shadow-lg mt-1"
							align="start"
						>
							<Calendar
								initialFocus
								mode="range"
								defaultMonth={dischargeDate?.from}
								selected={dischargeDate}
								onSelect={(dates) => updateDateValue('discharge', dates)}
								numberOfMonths={2}
							/>
						</PopoverContent>
					</Popover>
				</TableHead>
			</TableRow>
		</TableHeader>
	);
}
