'use client';
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '~/components/ui/card';

const chartConfig = {
	admissions: {
		label: 'Admisiones',
		color: '#2563eb',
	},
	discharges: {
		label: 'Altas',
		color: '#60a5fa',
	},
} satisfies ChartConfig;

export default function PatientAnalytics({
	chart_data,
}: {
	chart_data: { month: string; admissions: number; discharges: number }[];
}) {
	function countAllAdmissions(): number {
		let count = 0;
		for (const { admissions } of chart_data) count += admissions;
		return count;
	}

	function countAllDischarges(): number {
		let count = 0;
		for (const { discharges } of chart_data) count += discharges;
		return count;
	}

	return (
		<Card>
			<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
					<CardTitle>Admisiones y Altas</CardTitle>
					<CardDescription>
						Mostrando el total de admisiones y altas médicas los últimos 12
						meses
					</CardDescription>
				</div>
				<div className="flex w-1/3 gap-10 items-center justify-end px-10">
					<div className="flex flex-col">
						<span className="text-xs text-muted-foreground">Admisiones</span>
						<span className="text-lg font-bold leading-none sm:text-3xl">
							{countAllAdmissions()}
						</span>
					</div>
					<div className="flex flex-col">
						<span className="text-xs text-muted-foreground">Altas Médicas</span>
						<span className="text-lg font-bold leading-none sm:text-3xl">
							{countAllDischarges()}
						</span>
					</div>
				</div>
			</CardHeader>
			<ChartContainer config={chartConfig} className="h-[200px] w-full">
				<BarChart data={chart_data}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="month"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar dataKey="admissions" fill="var(--color-admissions)" radius={4} />
					<Bar dataKey="discharges" fill="var(--color-discharges)" radius={4} />
				</BarChart>
			</ChartContainer>
		</Card>
	);
}
