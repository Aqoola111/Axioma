'use client'
import {useForm} from "react-hook-form";
import {updateSupplierSchema, UpdateSupplierSchema} from "@/app/dashboard/suppliers/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useEffect, useTransition} from "react";
import {updateSupplier} from "@/app/dashboard/suppliers/actions";
import {getErrorMessage} from "@/lib/utils";
import {toast} from "sonner";
import {Supplier} from "@prisma/client";

interface UpdateSupplierFormProps {
	supplierId: string;
	initialValues: UpdateSupplierSchema;
	onSuccess?: (supplier: Supplier) => Supplier;
}

export const UpdateSupplierForm = ({supplierId, initialValues, onSuccess}: UpdateSupplierFormProps) => {
	const [isLoading, startTransition] = useTransition();
	
	const form = useForm<UpdateSupplierSchema>({
		resolver: zodResolver(updateSupplierSchema),
		defaultValues: initialValues,
	});
	
	// Если initialValues могут обновляться динамически, сбрасываем форму
	useEffect(() => {
		form.reset(initialValues);
	}, [initialValues, form]);
	
	const onSubmit = (data: UpdateSupplierSchema) => {
		startTransition(async () => {
			try {
				toast('Updating supplier...');
				const updated = await updateSupplier(supplierId, data);
				toast.success("Successfully updated supplier");
				onSuccess?.(updated);
			} catch (e) {
				const error = getErrorMessage(e);
				toast.error(`Failed to update supplier: ${error}`);
			}
		});
	};
	
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* Name */}
				<FormField
					control={form.control}
					name="name"
					render={({field}) => (
						<FormItem>
							<FormLabel>Supplier name</FormLabel>
							<FormControl>
								<Input placeholder="Yohi asparagus" {...field} value={field.value ?? ''}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				
				{/* Contact Name */}
				<FormField
					control={form.control}
					name="contactName"
					render={({field}) => (
						<FormItem>
							<FormLabel>Contact Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} value={field.value ?? ''}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				
				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({field}) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="supplier@example.com" type="email" {...field}
									   value={field.value ?? ''}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				
				{/* Phone */}
				<FormField
					control={form.control}
					name="phone"
					render={({field}) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input placeholder="+1 555 123 4567" type="tel" {...field} value={field.value ?? ''}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				
				{/* Rating */}
				<FormField
					control={form.control}
					name="rating"
					render={({field}) => (
						<FormItem>
							<FormLabel>Rating (1 to 5)</FormLabel>
							<FormControl>
								<Input
									placeholder="3"
									type="number"
									min={1}
									max={5}
									{...field}
									value={field.value ?? ''}
									onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
								/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				
				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? "Updating..." : "Update Supplier"}
				</Button>
			</form>
		</Form>
	);
};
