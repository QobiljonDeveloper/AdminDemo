import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';
import { api } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Loader2, UserPlus, User, Eye, EyeOff } from 'lucide-react';

export const CreateAdminPage = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user?.role?.toLowerCase() !== 'superadmin') {
            toast({
                variant: "destructive",
                title: "Access Denied",
                description: "Sizda bu sahifaga kirish huquqi yo'q.",
            });
            navigate('/');
        }
    }, [user, navigate, toast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast({
                variant: "destructive",
                title: "Xatolik",
                description: "Parollar mos kelmadi.",
            });
            return;
        }

        setIsLoading(true);
        try {
            await api.post('/auth/create-admin', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });

            toast({
                title: "Muvaffaqiyatli",
                description: "Admin muvaffaqiyatli yaratildi.",
            });

            setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Xatolik",
                description: error.response?.data?.message || "Admin yaratishda xatolik yuz berdi.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md relative">
                {/* Background Glow Effects */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-green-500/30 rounded-full blur-3xl animate-pulse delay-700" />

                {/* Liquid Glass Card */}
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 overflow-hidden">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-linear-to-br from-blue-500/20 to-green-500/20 mb-4 border border-white/5 shadow-inner">
                            <UserPlus className="w-8 h-8 text-[#00AEEF]" />
                        </div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-green-400">
                            Yangi Admin Yaratish
                        </h1>
                        <p className="text-white/60 text-sm mt-2">
                            Yangi admin ma'lumotlarini kiriting
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Inputs */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#00AEEF] transition-colors" />
                                    <Input
                                        type="text"
                                        name="firstName"
                                        placeholder="Ism"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00AEEF]/50 focus:bg-white/10 focus:ring-0 transition-all rounded-xl h-12"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#00AEEF] transition-colors" />
                                    <Input
                                        type="text"
                                        name="lastName"
                                        placeholder="Familiya"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00AEEF]/50 focus:bg-white/10 focus:ring-0 transition-all rounded-xl h-12"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#00AEEF] transition-colors" />
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email manzil"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00AEEF]/50 focus:bg-white/10 focus:ring-0 transition-all rounded-xl h-12"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#00AEEF] transition-colors" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Parol"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00AEEF]/50 focus:bg-white/10 focus:ring-0 transition-all rounded-xl h-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="space-y-2">
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#00AEEF] transition-colors" />
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Parolni tasdiqlash"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00AEEF]/50 focus:bg-white/10 focus:ring-0 transition-all rounded-xl h-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-linear-to-r from-[#00AEEF] to-[#00B894] hover:opacity-90 transition-opacity text-white font-medium rounded-xl shadow-lg shadow-blue-500/20"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Yaratilmoqda...
                                </>
                            ) : (
                                "Yaratish"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
