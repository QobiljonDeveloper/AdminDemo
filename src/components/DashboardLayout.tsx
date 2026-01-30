import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '@/features/auth/authStore';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

export const DashboardLayout = () => {
    const { user } = useAuthStore();
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex h-screen bg-[#071A2E] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#071A2E] via-[#091524] to-[#050c14] text-white overflow-hidden font-sans">
            {/* Glass Sidebar */}
            <Sidebar className="hidden md:flex flex-shrink-0" />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Glass Header */}
                <header className="h-14 bg-white/5 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-white/50">Dashboard</span>
                        <span className="text-white/30">/</span>
                        <span className="text-sm font-semibold text-white">Overview</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="rounded-full text-white/60 hover:text-white hover:bg-white/10"
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        <div className="flex items-center space-x-3 pl-4 border-l border-white/10">
                            <div className="h-8 w-8 rounded-full bg-linear-to-br from-[#00AEEF] to-[#00B894] flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-[#00AEEF]/30">
                                {user?.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                            </div>
                            <div className="hidden md:flex flex-col items-end mr-3">
                                <span className="text-sm font-semibold text-white">
                                    {user?.firstName} {user?.lastName}
                                </span>
                                <span className="text-xs text-[#00AEEF] font-medium capitalize">
                                    {user?.role}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Scroll Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
