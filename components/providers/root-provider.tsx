import {ClerkProvider} from "@clerk/nextjs";

interface RootProviderProps {
	children?: React.ReactNode;
}

export const RootProvider = ({children}: RootProviderProps) => {
	return (
		<ClerkProvider>
			{children}
		</ClerkProvider>
	)
};