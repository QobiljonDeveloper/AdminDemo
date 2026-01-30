import { Link, useLocation } from 'react-router-dom';
import { Newspaper, Image, Briefcase, HelpCircle, Phone, LayoutDashboard, LogOut, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useAuthStore } from '@/features/auth/authStore';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const location = useLocation();
    const { logout, user } = useAuthStore();

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
        { label: 'News', icon: Newspaper, href: '/news' },
        { label: 'Gallery', icon: Image, href: '/gallery' },
        { label: 'Opportunities', icon: Briefcase, href: '/opportunities' },
        { label: 'FAQ', icon: HelpCircle, href: '/faq' },
        { label: 'Contact', icon: Phone, href: '/contact' },
    ];

    if (user?.role?.toLowerCase() === 'superadmin') {
        navItems.push({ label: 'Yangi Admin', icon: UserPlus, href: '/admins/create' });
    }


    return (
        <aside className={cn(
            "w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col h-full",
            className
        )}>
            {/* Logo */}
            <div className="h-14 flex items-center px-6 border-b border-white/10">
                <Link to="/" className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#00AEEF] to-[#00B894] flex items-center justify-center shadow-lg shadow-[#00AEEF]/30">
                        <span className="text-white font-bold text-sm">R</span>
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">Renessans</span>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = item.href === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                                isActive
                                    ? "bg-[#00AEEF]/10 text-[#00AEEF]"
                                    : "text-white/60 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 w-1 h-6 bg-[#D4AF37] rounded-r-full shadow-lg shadow-[#D4AF37]/40" />
                            )}
                            <item.icon className={cn(
                                "mr-3 h-4 w-4 transition-colors",
                                isActive ? "text-[#00AEEF]" : "text-white/40 group-hover:text-white/70"
                            )} />
                            {item.label}
                        </Link>
                    )
                })}
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
                <div className="px-2 mb-2">
                    <p className="text-white font-medium text-sm truncate">
                        {user?.firstName && user?.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user?.email}
                    </p>
                    {user?.firstName && user?.lastName && (
                        <p className="text-white/40 text-xs truncate">{user.email}</p>
                    )}
                </div>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors rounded-xl"
                    size="sm"
                    onClick={() => logout()}
                >
                    <LogOut className="mr-3 h-4 w-4" />
                    Chiqish
                </Button>
            </div>
        </aside>
    );
};
