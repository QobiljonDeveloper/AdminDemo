import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getImageUrl = (path: string | null | undefined) => {
    if (!path) return ''; // Example: return a default placeholder path if you have one

    // 1. Check if it's an external URL (http/https) OR a Base64 string
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
        return path;
    }

    // 2. Otherwise, treat it as a local server file
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    // Ensure we don't duplicate slashes
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    return `${baseUrl}${cleanPath}`;
};
