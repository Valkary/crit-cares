import { z } from "zod";

export const register_schema = z.object({
    email: z.string({ message: "Requerido" }).email({ message: "Debe ser un email válido" }),
    names: z.string({ message: "Requerido" }).min(3, { message: "Nombre muy corto" }),
    last_names: z.string({ message: "Requerido" }).min(3, { message: "Apellido muy corto" }),
    password: z.string({ message: "Requerido" }).min(5, { message: "Contraseña muy corta" }),
    role: z.enum(['admin', 'doctor', 'secretary', 'readonly'], { message: "El rol no es válido" }),
    phone: z.string({ message: "Requerido" }).min(10, { message: "Mínimo 10 dígitos" }).max(14, { message: "Máximo 14 dígitos" })
});

export type RegisterSchema = z.infer<typeof register_schema>;