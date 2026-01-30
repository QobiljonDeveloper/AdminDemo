import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: number;
    color?: 'blue' | 'green' | 'gold' | 'purple' | 'red';
}

export const StatCard = ({ icon: Icon, label, value, color = 'blue' }: StatCardProps) => {
    const [displayValue, setDisplayValue] = useState(0);

    // Count-up animation
    useEffect(() => {
        if (value === 0) {
            setDisplayValue(0);
            return;
        }

        const duration = 1000; // 1 second
        const steps = 30;
        const stepValue = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += stepValue;
            if (current >= value) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);



    const iconGlow = {
        blue: 'shadow-[0_0_20px_rgba(0,174,239,0.4)]',
        green: 'shadow-[0_0_20px_rgba(0,184,148,0.4)]',
        gold: 'shadow-[0_0_20px_rgba(212,175,55,0.4)]',
        purple: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
        red: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
    };

    return (
        <div className={`
            relative overflow-hidden rounded-2xl p-6
            bg-white/5 backdrop-blur-xl border border-white/10
            transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
            group
        `}>
            {/* Floating Icon */}
            <div className={`
                absolute -top-2 -right-2 w-20 h-20
                flex items-center justify-center
                rounded-full bg-white/5 ${iconGlow[color]}
            `}>
                <Icon className="w-8 h-8 opacity-60" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <p className="text-sm font-medium text-white/60 uppercase tracking-wider mb-2">
                    {label}
                </p>
                <p className="text-4xl font-bold text-white">
                    {displayValue.toLocaleString()}
                </p>
            </div>

            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
    );
};
