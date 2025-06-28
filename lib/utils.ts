import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function buildPathSegments(path: string): string[] {
	const segments = path.split("/").filter(Boolean); // удаляем пустые строки
	const result: string[] = [];
	
	for (let i = 0; i < segments.length; i++) {
		result.push("/" + segments.slice(0, i + 1).join("/"));
	}
	
	return result;
}

export function getErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		return error.message;
	}
	
	if (typeof error === "string") {
		return error;
	}
	
	return "An unexpected error occurred";
}