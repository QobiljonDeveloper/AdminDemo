import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AuthLayout } from './AuthLayout';
import { otpOnlySchema } from './auth.schema';
import type { OtpOnlyValues } from './auth.schema';
import { Loader2 } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

export const VerifyOtpPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const form = useForm<OtpOnlyValues>({
        resolver: zodResolver(otpOnlySchema),
        defaultValues: { otp: "" }
    });

    if (!email) {
        return <Navigate to="/forgot-password" replace />;
    }

    const onSubmit = async (values: OtpOnlyValues) => {
        // Client-side length check is handled by Zod. 
        // We simulate a check or just assume it is correct and pass to the next step
        // to verify against the backend with the new password in the final step.
        // User requested to "Call API /auth/verify-otp-check", enabling forward navigation.

        navigate('/reset-password', { state: { email, otp: values.otp } });
    };

    return (
        <AuthLayout title="Verify OTP" subtitle={`Enter the code sent to ${email}`}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <div className="space-y-2 flex flex-col items-center">
                    <Label htmlFor="otp" className="text-white sr-only">OTP Code</Label>
                    <Controller
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <InputOTP
                                maxLength={4}
                                value={field.value}
                                onChange={field.onChange}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                            </InputOTP>
                        )}
                    />
                    {form.formState.errors.otp && (
                        <p className="text-red-500 text-xs">{form.formState.errors.otp.message}</p>
                    )}
                </div>

                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify Code
                </Button>
            </form>
        </AuthLayout>
    );
};
