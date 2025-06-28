import {Supplier} from "@prisma/client";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Edit, LucideMail, PhoneIcon, Truck} from "lucide-react";
import {DeleteSupplierButton} from "@/app/dashboard/suppliers/components/delete-supplier-button";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {UpdateSupplierForm} from "@/app/dashboard/suppliers/forms/update-supplier-form";
import ResponsiveModal from "@/components/shared/responsive-modal";
import {useRouter} from "next/navigation";
import {SupplierRating} from "@/app/dashboard/suppliers/components/supplier-rating";

interface SupplierCardProps {
	supplier: Supplier
}

export const SupplierCard = ({supplier}: SupplierCardProps) => {
	const [updateModalOpen, setUpdateModalOpen] = useState(false);
	const [localSupplier, setLocalSupplier] = useState<Supplier>(supplier);
	const router = useRouter();
	return (
		<Card className='md:w-[420px] w-full'>
			<CardHeader>
				<CardTitle>
					<div className='flex justify-between px-2 items-center'>
						<div className='flex gap-2 items-center'>
							<Truck/>
							{localSupplier.name}
						</div>
						<SupplierRating onUpdateSupplierRating={(updated) => {
							setLocalSupplier(updated);
							return updated;
						}} actualRating={localSupplier.rating} supplierId={localSupplier.id}/>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex gap-2 items-center'>
					<PhoneIcon size={16}/>
					<h1>
						{localSupplier.phone}
					</h1>
				</div>
				<div className='flex gap-2 items-center'>
					<LucideMail size={16}/>
					<h1>
						{localSupplier.email}
					</h1>
				</div>
				<ResponsiveModal isOpen={updateModalOpen} onOpenChange={setUpdateModalOpen} title={'Update Supplier'}>
					<UpdateSupplierForm supplierId={localSupplier.id} initialValues={localSupplier}
										onSuccess={(updated) => {
											setLocalSupplier(updated)
											setUpdateModalOpen(false);
											return updated;
										}}/>
				</ResponsiveModal>
			</CardContent>
			<CardFooter>
				<div className='flex justify-between w-full'>
					<DeleteSupplierButton supplierId={localSupplier.id} supplierName={localSupplier.name}/>
					<Button onClick={() => setUpdateModalOpen(true)}>
						<Edit/>
						Edit Supplier
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
};