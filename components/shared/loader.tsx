import {Loader2} from "lucide-react";
import {cn} from "@/lib/utils";

interface LoaderProps {
	fullscreen?: boolean;
	className?: string;
}

export const Loader = ({fullscreen, className}: LoaderProps) => {
	return (
		<div className={cn(fullscreen ? "flex items-center justify-center w-full flex-1" : "", className)}>
			<Loader2 className='animate-spin'/>
		</div>
	)
};