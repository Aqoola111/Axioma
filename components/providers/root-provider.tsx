import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "sonner";

interface RootProviderProps {
	children?: React.ReactNode;
}

export const RootProvider = ({children}: RootProviderProps) => {
	return (
		<ClerkProvider>
			<Toaster/>
			{children}
		</ClerkProvider>
	)
};