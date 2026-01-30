import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Save } from 'lucide-react';

const contactSchema = z.object({
    address: z.string().min(1, 'Required'),
    phone: z.string().min(1, 'Required'),
    email: z.string().email(),
    workingHours: z.string().min(1, 'Required'),
    mapUrl: z.string().min(1, 'Required'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const { data: contactItem } = useQuery({
        queryKey: ['contact', id],
        queryFn: async () => {
            const res = await api.get(`/contact/${id}`);
            return res.data;
        },
        enabled: isEdit,
    });

    useEffect(() => {
        if (contactItem) {
            reset(contactItem);
        }
    }, [contactItem, reset]);

    const mutation = useMutation({
        mutationFn: async (data: ContactFormValues) => {
            if (isEdit) {
                return api.patch(`/contact/${id}`, data);
            }
            return api.post('/contact', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contact'] });
            navigate('/contact');
        }
    });

    const onSubmit = (data: ContactFormValues) => {
        mutation.mutate(data);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => navigate('/contact')} className="text-white/60 hover:text-white hover:bg-white/5 -ml-2">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Contacts
                </Button>
                <div className="text-right">
                    <p className="text-white/40 text-xs uppercase tracking-wider">Status</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00B894] animate-pulse" />
                        <span className="text-[#00B894] font-medium text-sm">{isEdit ? 'Editing' : 'Creating New'}</span>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-2xl p-8">
                <div className="mb-8 border-b border-white/10 pb-6">
                    <h1 className="text-2xl font-bold text-white mb-2">{isEdit ? 'Edit Contact' : 'Create Contact'}</h1>
                    <p className="text-white/50 text-sm">Fill in the contact details below.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <Label htmlFor="address" className="text-white/80">Address *</Label>
                            <Input
                                id="address"
                                {...register('address')}
                                className="bg-white/5 border-white/10 text-white focus-visible:ring-[#00AEEF]/50 h-10 rounded-lg"
                                placeholder="e.g. Tashkent, Amir Temur 24"
                            />
                            {errors.address && <p className="text-red-400 text-xs">{errors.address.message}</p>}
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="phone" className="text-white/80">Phone *</Label>
                            <Input
                                id="phone"
                                {...register('phone')}
                                className="bg-white/5 border-white/10 text-white focus-visible:ring-[#00AEEF]/50 h-10 rounded-lg"
                                placeholder="e.g. +998 90 123 45 67"
                            />
                            {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="email" className="text-white/80">Email *</Label>
                            <Input
                                id="email"
                                {...register('email')}
                                className="bg-white/5 border-white/10 text-white focus-visible:ring-[#00AEEF]/50 h-10 rounded-lg"
                                placeholder="e.g. info@renessans.uz"
                            />
                            {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="workingHours" className="text-white/80">Working Hours *</Label>
                            <Input
                                id="workingHours"
                                {...register('workingHours')}
                                className="bg-white/5 border-white/10 text-white focus-visible:ring-[#00AEEF]/50 h-10 rounded-lg"
                                placeholder="e.g. Mon-Fri: 09:00 - 18:00"
                            />
                            {errors.workingHours && <p className="text-red-400 text-xs">{errors.workingHours.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="mapUrl" className="text-white/80">Map URL (Google Maps Embed Link) *</Label>
                        <Input
                            id="mapUrl"
                            {...register('mapUrl')}
                            className="bg-white/5 border-white/10 text-white focus-visible:ring-[#00AEEF]/50 h-10 rounded-lg"
                            placeholder="e.g. https://www.google.com/maps/embed?..."
                        />
                        {errors.mapUrl && <p className="text-red-400 text-xs">{errors.mapUrl.message}</p>}
                        <p className="text-xs text-white/40">Paste the 'src' link from Google Maps embed code.</p>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
                        <Button type="button" variant="ghost" onClick={() => navigate('/contact')} className="text-white/60 hover:text-white">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="bg-gradient-to-r from-[#00AEEF] to-[#00B894] hover:opacity-90 text-white border-0 shadow-lg shadow-[#00AEEF]/20 rounded-xl px-8"
                        >
                            {mutation.isPending ? 'Saving...' : (
                                <>
                                    <Save className="mr-2 h-4 w-4" /> Save Contact
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
