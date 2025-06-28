import {z} from "zod";

export const createSupplierSchema = z.object({
	name: z.string().min(1, "Name is required"),
	contactName: z.string(),
	email: z.string().email(),
	phone: z.string().min(9, "Phone number must be at least 9 characters long"),
	rating: z.number().int().min(1).max(5).optional().nullable(),
})

export const updateSupplierSchema = createSupplierSchema.partial();

export type UpdateSupplierSchema = z.infer<typeof updateSupplierSchema>;
export type CreateSupplierSchema = z.infer<typeof createSupplierSchema>;