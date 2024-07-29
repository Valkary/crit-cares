import type { UseFormReturn } from 'react-hook-form'
import type { CreateFollowupNoteSchema } from '~/data/schemas'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

type Props = {
	form: UseFormReturn<CreateFollowupNoteSchema>
}

export default function ApacheScore({ form }: Props) {
	return (
		<div className="grid grid-cols-2 gap-2">
			<FormField
				control={form.control}
				name="apache_score_obj.age"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Edad</FormLabel>
						<FormControl>
							<Input type="number" placeholder="años" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="apache_score_obj.temperature"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Temperatura</FormLabel>
						<FormControl>
							<Input type="number" placeholder="°C" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="apache_score_obj.blood_pressure"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Presión arterial</FormLabel>
						<FormControl>
							<Input type="number" placeholder="mm Hg" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="apache_score_obj.ph"
				render={({ field }) => (
					<FormItem>
						<FormLabel>pH</FormLabel>
						<FormControl>
							<Input
								type="number"
								placeholder="potencial de hidrógeno"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="apache_score_obj.heart_rate"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Ritmo cardíaco</FormLabel>
						<FormControl>
							<Input
								type="number"
								placeholder="pulsaciones por minuto"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="apache_score_obj.respiratory_rate"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Ritmo respiratorio</FormLabel>
						<FormControl>
							<Input
								type="number"
								placeholder="respiraciones por minuto"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="apache_score_obj.sodium"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Sodio</FormLabel>
						<FormControl>
							<Input type="number" placeholder="mEq / L" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="apache_score_obj.potassium"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Potasio</FormLabel>
						<FormControl>
							<Input type="number" placeholder="mEq / L" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="apache_score_obj.creatinine"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Creatinina</FormLabel>
						<FormControl>
							<Input type="number" placeholder="mg / dL" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}
