import { useEffect } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TranslatableInput } from '@/components/TranslatableInput';
import { ImageUpload } from '@/components/ui/image-upload';
import { objectToFormData } from '@/lib/form-utils';
import { getImageUrl } from '@/lib/utils';
import { ChevronLeft, Save } from 'lucide-react';

const translatableSchema = z.object({
    uz: z.string().min(1, 'Required'),
    ru: z.string().optional(),
    en: z.string().optional(),
});

// Update schema to accept String (URL) OR File OR Null
const newsSchema = z.object({
    title: translatableSchema,
    subtitle: translatableSchema,
    description: translatableSchema,
    image: z.custom<string | File | null>((val) => {
        /* eslint-disable-next-line */
        if (typeof val === 'string') return val.length > 0;
        if (val instanceof File) return true;
        return false;
    }, 'Image is required (URL or File)'),
    date: z.string(),
    category: z.string().min(1, 'Category is required'),
});

type NewsFormValues = z.infer<typeof newsSchema>;

export const NewsForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const methods = useForm<NewsFormValues>({
        resolver: zodResolver(newsSchema),
        defaultValues: {
            title: { uz: '', ru: '', en: '' },
            subtitle: { uz: '', ru: '', en: '' },
            description: { uz: '', ru: '', en: '' },
            image: null,
            date: new Date().toISOString().split('T')[0],
            category: '',
        }
    });

    const { register, control, handleSubmit, reset, formState: { errors } } = methods;

    const { data: newsItem } = useQuery({
        queryKey: ['news', id],
        queryFn: async () => {
            const res = await api.get(`/news/${id}`);
            return res.data;
        },
        enabled: isEdit,
    });



    useEffect(() => {
        if (newsItem) {
            // Create a clean object with defaults for missing fields
            const formData = {
                title: newsItem.title || { uz: '', ru: '', en: '' },
                subtitle: newsItem.subtitle || { uz: '', ru: '', en: '' },
                description: newsItem.description || { uz: '', ru: '', en: '' },
                date: newsItem.date ? new Date(newsItem.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                category: newsItem.category || '',
                image: newsItem.image ? getImageUrl(newsItem.image) : null, // Use getImageUrl for consistent preview
            };

            console.log('Resetting form with:', formData);
            reset(formData);
        }
    }, [newsItem, reset]);

    const mutation = useMutation({
        mutationFn: async (data: NewsFormValues) => {
            // Transform to FormData
            const formData = new FormData();

            // Send Translatable objects as JSON strings for Backend DTO parsing
            // Use key 'title' so backend sees it. Backend needs to parse JSON if using ValidationPipe transformation
            // OR use flattening "title[uz]" if Backend supports it.
            // Given "fix FormData serialization", standard fix for Nest is flattening.
            // But Nest default is NO flattening support in Multer.
            // So we use JSON stringification and backend needs to parse.
            // Or we assume the USER has a backend mechanism (e.g. library).
            // I'll stick to flattening logic in objectToFormData which I improved, 
            // BUT I will also ensure specific fields are passed clean.

            const payload: any = { ...data };
            if (data.image instanceof File) {
                payload.imageFile = data.image;
            } else if (typeof data.image === 'string') {
                payload.imageUrl = data.image;
            }
            delete payload.image;

            // Use the improved objectToFormData
            objectToFormData(payload, formData);

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };

            if (isEdit) {
                return api.patch(`/news/${id}`, formData, config);
            }
            return api.post('/news', formData, config);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            navigate('/news');
        }
    });

    const onSubmit = (data: NewsFormValues) => {
        mutation.mutate(data);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => navigate('/news')} className="text-white/60 hover:text-white hover:bg-white/5 -ml-2">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to News
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
                    <h1 className="text-2xl font-bold text-white mb-2">{isEdit ? 'Edit Article' : 'Create Article'}</h1>
                    <p className="text-white/50 text-sm">Fill in the details below. All fields marked with * are required.</p>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-8">
                                <TranslatableInput name="title" label="Title *" />
                                <TranslatableInput name="subtitle" label="Subtitle" />
                                <div className="space-y-4">
                                    <Label className="text-white/80">Article Details</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="date" className="text-xs text-white/50">Date</Label>
                                            <Input
                                                id="date"
                                                type="date"
                                                {...register('date')}
                                                className="bg-white/5 border-white/10 text-white focus-visible:ring-[#00AEEF]/50 h-10 rounded-lg"
                                            />
                                            {errors.date && <p className="text-red-400 text-xs">{errors.date.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="category" className="text-xs text-white/50">Category</Label>
                                            <Input
                                                id="category"
                                                {...register('category')}
                                                placeholder="e.g. Technology"
                                                className="bg-white/5 border-white/10 text-white focus-visible:ring-[#00AEEF]/50 h-10 rounded-lg"
                                            />
                                            {errors.category && <p className="text-red-400 text-xs">{errors.category.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <Controller
                                        control={control}
                                        name="image"
                                        render={({ field }) => (
                                            <ImageUpload
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.image && <p className="text-red-400 text-sm">{String(errors.image.message)}</p>}
                                </div>
                                <TranslatableInput name="description" label="Full Description" isTextArea />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
                            <Button type="button" variant="ghost" onClick={() => navigate('/news')} className="text-white/60 hover:text-white">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                                className="bg-gradient-to-r from-[#00AEEF] to-[#00B894] hover:opacity-90 text-white border-0 shadow-lg shadow-[#00AEEF]/20 rounded-xl px-8"
                            >
                                {mutation.isPending ? 'Saving...' : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" /> Save Article
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
