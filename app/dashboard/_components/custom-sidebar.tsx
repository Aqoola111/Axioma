'use client'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail
} from "@/components/ui/sidebar";
import CustomUserButton from "@/components/shared/custom-user-button";
import {sidebarItems} from "@/constants/sidebar-items";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {ChevronRight} from "lucide-react";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const CustomSidebar = () => {
	const path = usePathname()
	return (
		<Sidebar>
			<SidebarHeader>
				Header
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{sidebarItems.map((item) => (
							item.items && item.items.length > 0 ? (
								<Collapsible
									key={item.label}
									asChild
									defaultOpen={true}
									className="group/collapsible"
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton tooltip={item.label}>
												{item.icon && <item.icon/>}
												<span>{item.label}</span>
												<ChevronRight
													className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items.map((subItem) => (
													<SidebarMenuSubItem key={subItem.href}>
														<SidebarMenuSubButton
															className={cn(subItem.href === path ? 'bg-accent font-semibold' : 'hover:bg-accent hover:font-semibold')}
															asChild>
															<a href={subItem.href}>
																<span>{subItem.label}</span>
															</a>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							) : (
								<SidebarMenuItem key={item.label}>
									<SidebarMenuButton asChild tooltip={item.label}>
										<a href={item.href}>
											{item.icon && <item.icon/>}
											<span>{item.label}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							)
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<CustomUserButton/>
			</SidebarFooter>
			<SidebarRail/>
		</Sidebar>
	);
};

export default CustomSidebar;
