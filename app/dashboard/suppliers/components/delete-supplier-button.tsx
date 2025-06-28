'use client'
import {useTransition} from "react";
import {deleteSupplier} from "@/app/dashboard/suppliers/actions";
import {toast} from "sonner";
import {getErrorMessage} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Loader} from "@/components/shared/loader";
import {useRouter} from "next/navigation";

interface DeleteSupplierButtonProps {
	supplierId: string
	supplierName?: string;
}

export const DeleteSupplierButton = ({supplierId, supplierName}: DeleteSupplierButtonProps) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const handleDelete = (id: string) => {
		startTransition(async () => {
			try {
				await deleteSupplier(id);
				toast.success('Supplier has been deleted.');
				router.refresh()
			} catch (e) {
				toast.error(getErrorMessage(e));
			}
		});
	}
	return (
		<Button variant='destructive' onClick={() => handleDelete(supplierId)} disabled={isPending}>
			{isPending ? <Loader className='w-4 h-4'/> : `Delete Supplier ${supplierName}`}
		</Button>
	)
};