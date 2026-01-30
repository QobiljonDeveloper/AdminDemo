import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema } from './auth.schema';
import type { LoginValues } from './auth.schema';
import { Loader2, AlertCircle, Eye, EyeOff, Info } from 'lucide-react';

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const loginForm = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onLoginSubmit = async (values: LoginValues) => {
        setIsLoading(true);
        setError('');

        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));

        const result = login(values.email, values.password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error || "Login failed");
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#071A2E] to-[#0b2239] px-4">
            <div className="w-full max-w-[400px] space-y-6">
                {/* Branding */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00AEEF] to-[#00B894] mb-4 shadow-[0_0_40px_rgba(0,174,239,0.3)]">
                        <span className="text-2xl font-bold text-white">R</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Renessans Admin
                    </h1>
                    <p className="text-white/50 text-sm">
                        Boshqaruv paneliga kirish
                    </p>
                </div>

                {/* Demo Credentials Info */}
                <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                    <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="text-sm">
                        <p className="text-blue-300 font-medium mb-1">Demo Credentials</p>
                        <p className="text-blue-400/70">Email: <span className="text-blue-300">admin@gmail.com</span></p>
                        <p className="text-blue-400/70">Password: <span className="text-blue-300">admin123</span></p>
                    </div>
                </div>

                {/* Glass Card */}
                <div className="bg-white/8 backdrop-blur-2xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                    <div className="space-y-6">
                        {/* Error Alert */}
                        {error && (
                            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-400 text-sm">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white/70 text-sm">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@gmail.com"
                                    {...loginForm.register('email')}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#00AEEF]/50 focus-visible:border-[#00AEEF]/50 h-12 rounded-xl"
                                />
                                {loginForm.formState.errors.email && (
                                    <p className="text-red-400 text-xs">{loginForm.formState.errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-white/70 text-sm">Parol</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        {...loginForm.register('password')}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#00AEEF]/50 focus-visible:border-[#00AEEF]/50 h-12 rounded-xl pr-10"
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
                                {loginForm.formState.errors.password && (
                                    <p className="text-red-400 text-xs">{loginForm.formState.errors.password.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-[#00AEEF] to-[#00B894] hover:opacity-90 text-white font-semibold rounded-xl shadow-lg shadow-[#00AEEF]/20 transition-all duration-300 hover:shadow-[#00AEEF]/40"
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Kirish
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-white/30 text-xs">
                    © 2026 Renessans Uzbekistan. Demo Version.
                </p>
            </div>
        </div>
    );
};
