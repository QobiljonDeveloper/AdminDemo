import { useState } from 'react';
import { mockDashboardStats } from '@/data/mockData';
import { Newspaper, Image, Briefcase, HelpCircle, Mail, Clock, Plus, Pencil, Trash2 } from 'lucide-react';

interface ActivityItem {
    _id: string;
    action: 'CREATED' | 'UPDATED' | 'DELETED';
    module: string;
    itemTitle: string;
    createdAt: string;
}

const getActionIcon = (action: string) => {
    switch (action) {
        case 'CREATED':
            return <Plus className="w-4 h-4" />;
        case 'UPDATED':
            return <Pencil className="w-4 h-4" />;
        case 'DELETED':
            return <Trash2 className="w-4 h-4" />;
        default:
            return <Clock className="w-4 h-4" />;
    }
};

const getActionColor = (action: string) => {
    switch (action) {
        case 'CREATED':
            return 'bg-green-500/20 text-green-400 border-green-500/30';
        case 'UPDATED':
            return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'DELETED':
            return 'bg-red-500/20 text-red-400 border-red-500/30';
        default:
            return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
};

const getActionText = (action: string) => {
    switch (action) {
        case 'CREATED':
            return 'yaratildi';
        case 'UPDATED':
            return 'tahrirlandi';
        case 'DELETED':
            return "o'chirildi";
        default:
            return action;
    }
};

export const DashboardPage = () => {
    // Mock data - no API calls
    const [stats] = useState(mockDashboardStats);

    const statItems = [
        { icon: Newspaper, label: 'Total News', count: stats.news },
        { icon: Image, label: 'Gallery Photos', count: stats.gallery },
        { icon: Briefcase, label: 'Opportunities', count: stats.opportunities },
        { icon: HelpCircle, label: 'FAQ Items', count: stats.faq },
        { icon: Mail, label: 'Messages', count: stats.messages },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-white/60 mt-1">Welcome to Renessans Admin Panel (Demo)</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {statItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10 hover:scale-[1.02]"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#00AEEF]/20 text-[#00AEEF]">
                                <Icon className="h-6 w-6" />
                            </div>
                            <p className="text-3xl font-bold text-white">{item.count}</p>
                            <p className="text-sm text-slate-400">{item.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-5 h-5 text-[#00AEEF]" />
                    <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                </div>

                <div className="space-y-3">
                    {stats.recentActivity.map((activity: ActivityItem) => (
                        <div
                            key={activity._id}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                        >
                            <div className={`p-2 rounded-lg border ${getActionColor(activity.action)}`}>
                                {getActionIcon(activity.action)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium truncate">
                                    <span className="text-[#00AEEF]">{activity.module}</span>
                                    {' '}
                                    <span className={getActionColor(activity.action).split(' ')[1]}>
                                        {getActionText(activity.action)}
                                    </span>
                                </p>
                                <p className="text-white/50 text-sm truncate">"{activity.itemTitle}"</p>
                            </div>

                            <div className="text-white/40 text-sm whitespace-nowrap">
                                {new Date(activity.createdAt).toLocaleDateString('uz-UZ', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
