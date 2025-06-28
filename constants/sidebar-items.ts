import {
	Banknote,
	BarChart3,
	Book,
	ClipboardList,
	Copy,
	CreditCard,
	Folder,
	LayoutDashboard,
	List,
	LucideIcon,
	Package,
	PackageSearch,
	PlusCircle,
	Settings,
	ShoppingCart,
	Store,
	Truck,
	Users,
	Warehouse
} from 'lucide-react';
import {Role} from "@prisma/client";

interface SidebarNavItem {
	label: string;
	href?: string;
	icon: LucideIcon;
	items?: SidebarNavItem[];
	roles: Role[];
}

export const sidebarItems: SidebarNavItem[] = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
		roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER", "CHEF", "ACCOUNTANT"],
	},
	{
		label: "Orders",
		icon: ShoppingCart,
		roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER", "CHEF"],
		items: [
			{
				label: "All Orders",
				href: "/dashboard/orders",
				icon: List,
				roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER", "CHEF"],
			},
			{
				label: "Create New",
				href: "/dashboard/orders/new",
				icon: PlusCircle,
				roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER", "CHEF"],
			},
			{
				label: "Order Templates",
				href: "/dashboard/orders/templates",
				icon: Copy,
				roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER"],
			},
		],
	},
	{
		label: "Suppliers",
		href: "/dashboard/suppliers",
		icon: Truck,
		roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER"],
	},
	{
		label: "Inventory",
		icon: Warehouse,
		roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER", "CHEF"],
		items: [
			{
				label: "Stock Levels",
				href: "/dashboard/inventory/stock",
				icon: Package,
				roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER", "CHEF"],
			},
			{
				label: "Audits",
				href: "/dashboard/inventory/audits",
				icon: ClipboardList,
				roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER"],
			},
		],
	},
	{
		label: "Catalog",
		icon: Book,
		roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER"],
		items: [
			{
				label: "Products & Equipment",
				href: "/dashboard/products",
				icon: PackageSearch,
				roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER"],
			},
			{
				label: "Categories",
				href: "/dashboard/products/categories",
				icon: Folder,
				roles: ["OWNER", "CHAIN_MANAGER"],
			},
		],
	},
	{
		label: "Menu",
		href: "/dashboard/menu",
		icon: Book,
		roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER", "CHEF"],
	},
	{
		label: "Analytics",
		href: "/dashboard/analytics",
		icon: BarChart3,
		roles: ["OWNER", "CHAIN_MANAGER", "ACCOUNTANT"],
	},
	{
		label: "Finance",
		href: "/dashboard/finance",
		icon: Banknote,
		roles: ["OWNER", "ACCOUNTANT"],
	},
	{
		label: "Shifts",
		href: "/dashboard/shifts",
		icon: ClipboardList,
		roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER"],
	},
	{
		label: "Staff",
		icon: Users,
		roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER"],
		items: [
			{
				label: "Employee List",
				href: "/dashboard/staff",
				icon: Users,
				roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER"],
			},
			{
				label: "Roles & Permissions",
				href: "/dashboard/staff/roles",
				icon: ClipboardList,
				roles: ["OWNER", "CHAIN_MANAGER"],
			},
		],
	},
	{
		label: "Feedback",
		href: "/dashboard/feedback",
		icon: ClipboardList,
		roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER"],
	},
	{
		label: "Training",
		href: "/dashboard/training",
		icon: Book,
		roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER", "CHEF"],
	},
	{
		label: "Quality Control",
		href: "/dashboard/quality",
		icon: ClipboardList,
		roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER"],
	},
	{
		label: "Logistics",
		href: "/dashboard/logistics",
		icon: Truck,
		roles: ["OWNER", "CHAIN_MANAGER", "RESTAURANT_MANAGER"],
	},
	{
		label: "Settings",
		icon: Settings,
		roles: ["OWNER", "CHAIN_MANAGER"],
		items: [
			{
				label: "My Restaurants",
				href: "/dashboard/settings/restaurants",
				icon: Store,
				roles: ["OWNER", "CHAIN_MANAGER"],
			},
			{
				label: "Users",
				href: "/dashboard/settings/users",
				icon: Users,
				roles: ["OWNER", "CHAIN_MANAGER"],
			},
			{
				label: "Billing",
				href: "/dashboard/settings/billing",
				icon: CreditCard,
				roles: ["OWNER"],
			},
		],
	},
];
