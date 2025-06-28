import {useIsMobile} from "@/hooks/use-mobile";
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";

interface ResponsiveModalProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	title: string
	description?: string
	children: React.ReactNode
}

const ResponsiveModal = ({children, isOpen, onOpenChange, title}: ResponsiveModalProps) => {
	const isMobile = useIsMobile()
	
	if (isMobile) {
		return (
			<Drawer open={isOpen} onOpenChange={onOpenChange}>
				<DrawerContent className='px-10 py-5'>
					<DrawerHeader>
						<DrawerTitle>
							{title}
						</DrawerTitle>
					</DrawerHeader>
					{
						children
					}
				</DrawerContent>
			</Drawer>
		)
	}
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{title}
					</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	)
	
	
}
export default ResponsiveModal
