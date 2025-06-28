'use client'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {Separator} from '@/components/ui/separator'
import {SidebarInset, SidebarTrigger,} from '@/components/ui/sidebar'
import {usePathname} from "next/navigation";
import {buildPathSegments} from "@/lib/utils";

const CustomSidebarInset = ({children}: { children: React.ReactNode }) => {
	const path = usePathname()
	const segments = buildPathSegments(path)
	return (
		<SidebarInset>
			<header
				className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1"/>
					<Separator orientation="vertical" className="mr-2 h-4"/>
					<Breadcrumb>
						<BreadcrumbList>
							{
								segments.map((segment, index) => {
									return (
										<div className='flex items-center gap-2' key={segment}>
											<BreadcrumbItem key={index} className="">
												<BreadcrumbLink href={segment}>
													{segment.split('/')[segment.split('/').length - 1]}
												</BreadcrumbLink>
											</BreadcrumbItem>
											{index < segments.length - 1 &&
                                                <BreadcrumbSeparator key={'separator' + index}/>}
										</div>
									)
								})
							}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="flex h-full w-full p-2 mx-auto ">
				{children}
			</div>
		</SidebarInset>
	)
}
export default CustomSidebarInset
