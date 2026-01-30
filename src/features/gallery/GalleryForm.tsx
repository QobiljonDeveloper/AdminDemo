import { useEffect } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
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

const gallerySchema = z.object({
    title: translatableSchema,
    image: z.custom<string | File | null>((val) => {
        /* eslint-disable-next-line */
        if (typeof val === 'string') return val.length > 0;
        if (val instanceof File) return true;
        return false;
    }, 'Image is required (URL or File)'),
});

type GalleryFormValues = z.infer<typeof gallerySchema>;

export const GalleryForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const methods = useForm<GalleryFormValues>({
        resolver: zodResolver(gallerySchema),
        defaultValues: {
            title: { uz: '', ru: '', en: '' },
            image: null,
        }
    });

    const { control, handleSubmit, reset, formState: { errors } } = methods;

    const { data: galleryItem } = useQuery({
        queryKey: ['gallery', id],
        queryFn: async () => {
            const res = await api.get(`/gallery/${id}`);
            return res.data;
        },
        enabled: isEdit,
    });

    useEffect(() => {
        if (galleryItem) {
            reset({
                ...galleryItem,
                image: galleryItem.image ? getImageUrl(galleryItem.image) : null,
            });
        }
    }, [galleryItem, reset]);

    const mutation = useMutation({
        mutationFn: async (data: GalleryFormValues) => {
            const payload: any = { ...data };

            if (data.image instanceof File) {
                payload.imageFile = data.image;
            } else if (typeof data.image === 'string') {
                payload.imageUrl = data.image;
            }
            delete payload.image;

            const formData = objectToFormData(payload);

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };

            if (isEdit) {
                return api.patch(`/gallery/${id}`, formData, config);
            }
            return api.post('/gallery', formData, config);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
            navigate('/gallery');
        }
    });

    const onSubmit = (data: GalleryFormValues) => {
        mutation.mutate(data);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => navigate('/gallery')} className="text-white/60 hover:text-white hover:bg-white/5 -ml-2">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Gallery
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
                    <h1 className="text-2xl font-bold text-white mb-2">{isEdit ? 'Edit Photo' : 'Add Photo'}</h1>
                    <p className="text-white/50 text-sm">Fill in the details below.</p>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8">
                            <TranslatableInput name="title" label="Title *" />
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
                        </div>

                        <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
                            <Button type="button" variant="ghost" onClick={() => navigate('/gallery')} className="text-white/60 hover:text-white">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                                className="bg-gradient-to-r from-[#00AEEF] to-[#00B894] hover:opacity-90 text-white border-0 shadow-lg shadow-[#00AEEF]/20 rounded-xl px-8"
                            >
                                {mutation.isPending ? 'Saving...' : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" /> Save Photo
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
