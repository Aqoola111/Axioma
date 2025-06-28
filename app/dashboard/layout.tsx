import {SidebarProvider} from "@/components/ui/sidebar";
import CustomSidebar from "@/app/dashboard/_components/custom-sidebar";
import CustomSidebarInset from "@/app/dashboard/_components/custom-sidebar-inset";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<CustomSidebar/>
			<CustomSidebarInset>
				{children}
			</CustomSidebarInset>
		</SidebarProvider>
	);
}
