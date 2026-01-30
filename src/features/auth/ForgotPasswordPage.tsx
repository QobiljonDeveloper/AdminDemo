import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from './AuthLayout';
import { forgotPasswordSchema } from './auth.schema';
import type { ForgotPasswordValues } from './auth.schema';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const form = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" }
    });

    const onSubmit = async (values: ForgotPasswordValues) => {
        try {
            setError('');
            await api.post('/auth/forgot-password', values);
            navigate('/verify-otp', { state: { email: values.email } });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send OTP');
        }
    };

    return (
        <AuthLayout title="Reset Password" subtitle="Enter your email to receive an OTP code">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {error && <div className="text-red-500 text-sm p-3 bg-red-500/10 rounded-md border border-red-500/20">{error}</div>}

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        {...form.register('email')}
                        className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-slate-700"
                    />
                    {form.formState.errors.email && (
                        <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
                    )}
                </div>

                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send OTP
                </Button>

                <div className="text-center">
                    <Link to="/login" className="text-sm text-slate-400 hover:text-white flex items-center justify-center gap-2">
                        <ArrowLeft className="h-3 w-3" /> Back to Login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};
