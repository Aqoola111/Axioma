'use client'
import {useForm} from "react-hook-form";
import {createSupplierSchema, CreateSupplierSchema} from "@/app/dashboard/suppliers/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useTransition} from "react";
import {createSupplier} from "@/app/dashboard/suppliers/actions";
import {getErrorMessage} from "@/lib/utils";
import {toast} from "sonner";

export const CreateSupplierForm = ({onSuccess}: { onSuccess: () => void }) => {
	const [isLoading, startTransition] = useTransition();
	
	const form = useForm<CreateSupplierSchema>({
		resolver: zodResolver(createSupplierSchema),
		defaultValues: {
			name: '',
			contactName: "",
			email: "",
			phone: "",
			rating: null, // Default rating can be set to a neutral value
		}
	})
	
	const onSubmit = (data: CreateSupplierSchema) => {
		startTransition(async () => {
			try {
				toast('Creating supplier...')
				await createSupplier(data)
				toast.success("Successfully created supplier")
				onSuccess()
			} catch (e) {
				const error = getErrorMessage(e)
				toast.error(`Failed to create supplier: ${error}`)
			}
		})
	}
	
	
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* Name */}
				<div className='flex  gap-2 items-center'>
					<FormField
						control={form.control}
						name="name"
						render={({field}) => (
							<FormItem className='w-full'>
								<FormLabel>Supplier name</FormLabel>
								<FormControl>
									<Input className='w-full' placeholder="Yohi asparagus" {...field}/>
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
							<FormItem className='w-full'>
								<FormLabel>Contact Name</FormLabel>
								<FormControl>
									<Input placeholder="John Doe" {...field} value={field.value ?? ''}/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
				</div>
				
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
									{...field} value={field.value ?? ''}
									onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
								/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<Button type={'submit'} className='w-full' disabled={isLoading}>
					{isLoading ? "Creating..." : "Create Supplier"}
				</Button>
			</form>
		</Form>
	)
}
