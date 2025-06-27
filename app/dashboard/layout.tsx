interface DashboardLayoutProps {
	children: React.ReactNode;
}

const DashboardLayout = ({children}: DashboardLayoutProps) => {
	return (
		<div>
			DashboardLayout
			{children}
		</div>
	)
}
export default DashboardLayout
