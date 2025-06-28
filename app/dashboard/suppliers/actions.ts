'use server'
import prisma from "@/lib/prisma";
import {
	createSupplierSchema,
	CreateSupplierSchema,
	updateSupplierSchema,
	UpdateSupplierSchema
} from "@/app/dashboard/suppliers/schemas";

export const getSuppliers = async () => {
	const suppliers = await prisma.supplier.findMany({
		orderBy: {
			name: 'asc',
		},
	})
	return suppliers
}

export const createSupplier = async (data: CreateSupplierSchema) => {
	const validatedData = createSupplierSchema.safeParse(data)
	
	if (!validatedData.success) {
		throw new Error("Invalid data provided: " + JSON.stringify(validatedData.error.format()));
	}
	
	const supplier = await prisma.supplier.create({
		data: validatedData.data,
	});
	
	return supplier;
}

export const deleteSupplier = async (id: string) => {
	const supplier = await prisma.supplier.delete({
		where: {
			id: id,
		},
	});
	
	return supplier;
}


export const updateSupplier = async (id: string, data: UpdateSupplierSchema) => {
	const parsed = updateSupplierSchema.safeParse(data);
	if (!parsed.success) {
		throw new Error('Invalid update data');
	}
	
	const updated = await prisma.supplier.update({
		where: {id},
		data: parsed.data,
	});
	
	return updated
};

export const updateSupplierRating = async (id: string, rating: number) => {
	const updated = await prisma.supplier.update({
		where: {id},
		data: {
			rating: rating,
		},
	});
	
	return updated;
}