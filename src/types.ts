import { z } from 'zod'

export type UserRole = 'admin' | 'doctor' | 'secretary' | 'readonly'

export type User = {
	email: string
	names: string
	last_names: string
	role: UserRole
	phone: string
	token: string
}

export type CreationSuccess = {
	success: true
	msg: string
}

export type CreationError = {
	success: false
	error_msg: string
}

export type CreationResult = CreationSuccess | CreationError

export type FetchSuccess<T> = {
	success: true
	data: T[]
}

export type FetchResult<T> = FetchSuccess<T> | CreationError

export const MAX_FILE_SIZE = 5_000_000

export const ACCEPTED_FILE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'application/pdf',
]

export const file_schema = z
	.instanceof(File, { message: 'Agrega un archivo válido.' })
	.refine((file) => {
		return file.size > 0 || file.name !== undefined
	}, 'Agrega un archivo válido.')
	.refine(
		(file) => ACCEPTED_FILE_TYPES.includes(file?.type),
		`Solo archivos de tipo: ${ACCEPTED_FILE_TYPES.map((type) => `.${type.split('/')[1]}`).join(', ')}`,
	)
	.refine(
		(file) => file.size <= MAX_FILE_SIZE,
		`Archivo excede ${MAX_FILE_SIZE / 1_000_000}MB.`,
	)
