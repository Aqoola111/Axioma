import {SuppliersPageClient} from "@/app/dashboard/suppliers/components/suppliers-page";
import {getSuppliers} from "@/app/dashboard/suppliers/actions";

const SuppliersPage = async () => {
	const suppliers = await getSuppliers()
	return <SuppliersPageClient suppliers={suppliers}/>
}
export const dynamic = 'force-dynamic'
export default SuppliersPage
