import {StarIcon} from "lucide-react";
import {cn, getErrorMessage} from "@/lib/utils";
import {useState, useTransition} from "react";
import {updateSupplierRating} from "@/app/dashboard/suppliers/actions";
import {toast} from "sonner";
import {Supplier} from "@prisma/client";

interface SupplierRatingProps {
	actualRating: number | null;
	possibleRating?: number
	supplierId: string
	onUpdateSupplierRating?: (supplier: Supplier) => Supplier;
}

export const SupplierRating = ({
								   actualRating,
								   supplierId,
								   onUpdateSupplierRating,
								   possibleRating = 5
							   }: SupplierRatingProps) => {
	const ratingArray = Array(possibleRating).fill(' ')
	const [hoverIndex, setHoverIndex] = useState<number>(0);
	const [isPending, startTransition] = useTransition()
	
	const handleRatingUpdate = async () => {
		startTransition(async () => {
			try {
				toast('Updating supplier rating...')
				const updated = await updateSupplierRating(supplierId, hoverIndex)
				onUpdateSupplierRating?.(updated)
			} catch (e) {
				toast.error(getErrorMessage(e))
			}
		})
	}
	return (
		<div
			className="flex gap-2"
			onMouseLeave={() => setHoverIndex(0)}
		>
			{ratingArray.map((_, index) => {
				const isActive = hoverIndex > 0 ? index < hoverIndex : actualRating !== null && index < actualRating;
				
				return (
					<StarIcon
						key={index}
						onClick={handleRatingUpdate}
						size={18}
						className={cn(
							isActive ? "text-yellow-500" : "text-gray-400",
							"cursor-pointer"
						)}
						onMouseEnter={() => setHoverIndex(index + 1)}
					/>
				);
			})}
		</div>
	);
};