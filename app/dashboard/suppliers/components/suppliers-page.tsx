'use client'
import {Supplier} from "@prisma/client";
import {useState} from "react";
import {Loader} from "@/components/shared/loader";
import {PlusIcon, Truck} from "lucide-react";
import {Button} from "@/components/ui/button";
import ResponsiveModal from "@/components/shared/responsive-modal";
import {CreateSupplierForm} from "@/app/dashboard/suppliers/forms/create-supplier-form";
import {SupplierCard} from "@/app/dashboard/suppliers/components/supplier-card";
import {useRouter} from "next/navigation";

interface SuppliersPageProps {
	suppliers: Supplier[] | null
}

export const SuppliersPageClient = ({suppliers}: SuppliersPageProps) => {
	const [modalOpen, setModalOpen] = useState(false)
	const [refreshKey, setRefreshKey] = useState(0);
	const router = useRouter()
	
	if (suppliers === null) {
		return <Loader fullscreen/>
	}
	
	if (suppliers.length === 0) {
		return (
			<div className='flex items-center justify-center w-full'>
				<div className='flex flex-col gap-10 border py-10 px-5 bg-accent rounded-xl shadow-xl '>
					<div
						className='flex border-destructive rounded-xl items-center gap-2'>
						<Truck size={32} className='text-destructive'/>
						<h1 className='font-bold text-destructive text-4xl'>
							No suppliers found
						</h1>
					</div>
					<Button variant='outline' onClick={() => setModalOpen(true)} size='lg'>
						Create Supplier
						<PlusIcon/>
					</Button>
				</div>
				<ResponsiveModal isOpen={modalOpen} onOpenChange={setModalOpen} title={'Create Supplier'}>
					<CreateSupplierForm onSuccess={() => {
						router.refresh(); // триггер обновления
						setModalOpen(false); // закрыть модалку
					}}/>
				</ResponsiveModal>
			</div>
		)
	}
	
	return (
		
		<div className='flex flex-col gap-5 h-full w-full px-2'>
			<div className='flex items-center justify-between lg:px-10'>
				<h1 className='text-2xl font-bold'>Suppliers</h1>
				<Button variant='ghost' onClick={() => setModalOpen(true)} size='lg'>
					Create Supplier
					<PlusIcon/>
				</Button>
			</div>
			<div className="flex flex-wrap gap-4 w-full  xl:justify-start justify-center">
				{suppliers.map((supplier) => (
					<SupplierCard key={supplier.id} supplier={supplier}/>
				))}
			</div>
			<ResponsiveModal isOpen={modalOpen} onOpenChange={setModalOpen} title={'Create Supplier'}>
				<CreateSupplierForm onSuccess={() => {
					router.refresh(); // триггер обновления
					setModalOpen(false); // закрыть модалку
				}}/>
			</ResponsiveModal>
		</div>
	
	)
	
	
};