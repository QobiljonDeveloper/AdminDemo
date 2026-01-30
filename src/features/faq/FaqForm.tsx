import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { TranslatableInput } from '@/components/TranslatableInput';
import { ChevronLeft, Save } from 'lucide-react';

const translatableSchema = z.object({
    uz: z.string().min(1, 'Required'),
    ru: z.string().optional(),
    en: z.string().optional(),
});

const faqSchema = z.object({
    question: translatableSchema,
    answer: translatableSchema,
});

type FaqFormValues = z.infer<typeof faqSchema>;

export const FaqForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const methods = useForm<FaqFormValues>({
        resolver: zodResolver(faqSchema),
        defaultValues: {
            question: { uz: '', ru: '', en: '' },
            answer: { uz: '', ru: '', en: '' },
        }
    });

    const { handleSubmit, reset } = methods;

    const { data: faqItem } = useQuery({
        queryKey: ['faq', id],
        queryFn: async () => {
            const res = await api.get(`/faq/${id}`);
            return res.data;
        },
        enabled: isEdit,
    });

    useEffect(() => {
        if (faqItem) {
            reset(faqItem);
        }
    }, [faqItem, reset]);

    const mutation = useMutation({
        mutationFn: async (data: FaqFormValues) => {
            if (isEdit) {
                return api.patch(`/faq/${id}`, data);
            }
            return api.post('/faq', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['faq'] });
            navigate('/faq');
        }
    });

    const onSubmit = (data: FaqFormValues) => {
        mutation.mutate(data);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => navigate('/faq')} className="text-white/60 hover:text-white hover:bg-white/5 -ml-2">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to FAQ
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
                    <h1 className="text-2xl font-bold text-white mb-2">{isEdit ? 'Edit FAQ' : 'Create FAQ'}</h1>
                    <p className="text-white/50 text-sm">Fill in the question and answer below.</p>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8">
                            <TranslatableInput name="question" label="Question *" />
                            <TranslatableInput name="answer" label="Answer *" isTextArea />
                        </div>

                        <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
                            <Button type="button" variant="ghost" onClick={() => navigate('/faq')} className="text-white/60 hover:text-white">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                                className="bg-gradient-to-r from-[#00AEEF] to-[#00B894] hover:opacity-90 text-white border-0 shadow-lg shadow-[#00AEEF]/20 rounded-xl px-8"
                            >
                                {mutation.isPending ? 'Saving...' : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" /> Save FAQ
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};
