import type { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1e] to-black px-4">
            <div className="w-full max-w-[400px] space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Antigravity
                    </h1>
                    {(title || subtitle) && (
                        <div className="space-y-1">
                            {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
                            {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
                        </div>
                    )}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};
