import { useEffect } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { mockHeroes } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TranslatableInput } from '@/components/TranslatableInput';
import { ImageUpload } from '@/components/ui/image-upload';
import { getImageUrl } from '@/lib/utils';
import { ChevronLeft, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const translatableSchema = z.object({
    uz: z.string().min(1, 'Sarlavha (UZ) majburiy'),
    ru: z.string().optional(),
    en: z.string().optional(),
});

const heroSchema = z.object({
    title: translatableSchema,
    image: z.custom<string | File | null>((val) => {
        if (typeof val === 'string') return val.length > 0;
        if (val instanceof File) return true;
        return false;
    }, 'Rasm majburiy (URL yoki fayl)'),
    buttonLink: z.string().url('To\'g\'ri URL kiriting').optional().or(z.literal('')),
    order: z.number().int().min(0),
    isActive: z.boolean(),
});

type HeroFormValues = z.infer<typeof heroSchema>;

export const HeroForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const { toast } = useToast();

    const methods = useForm<HeroFormValues>({
        resolver: zodResolver(heroSchema),
        defaultValues: {
            title: { uz: '', ru: '', en: '' },
            image: null,
            buttonLink: '',
            order: 0,
            isActive: true,
        }
    });

    const { register, control, handleSubmit, reset, watch, formState: { errors } } = methods;

    // Load existing hero data when editing
    useEffect(() => {
        if (isEdit) {
            const heroItem = mockHeroes.find(h => h._id === id);
            if (heroItem) {
                const formData = {
                    title: heroItem.title || { uz: '', ru: '', en: '' },
                    image: heroItem.image ? getImageUrl(heroItem.image) : null,
                    buttonLink: heroItem.buttonLink || '',
                    order: heroItem.order ?? 0,
                    isActive: heroItem.isActive ?? true,
                };
                reset(formData);
            }
        }
    }, [id, isEdit, reset]);

    const onSubmit = (data: HeroFormValues) => {
        console.log('Hero saved (demo):', data);
        toast({
            title: isEdit ? 'Yangilandi' : "Qo'shildi",
            description: `Hero slide muvaffaqiyatli ${isEdit ? 'yangilandi' : "qo'shildi"} (demo rejim).`,
        });
        navigate('/hero');
    };

    const isActive = watch('isActive');

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => navigate('/hero')} className="text-white/60 hover:text-white hover:bg-white/5 -ml-2">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Orqaga
                </Button>
                <div className="text-right">
                    <p className="text-white/40 text-xs uppercase tracking-wider">Holat</p>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isEdit ? 'bg-[#00B894]' : 'bg-[#00AEEF]'} animate-pulse`} />
                        <span className={`${isEdit ? 'text-[#00B894]' : 'text-[#00AEEF]'} font-medium text-sm`}>
                            {isEdit ? 'Tahrirlash' : "Qo'shish"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl bg-white/3 backdrop-blur-2xl border border-white/8 shadow-2xl p-8">
                <div className="mb-8 border-b border-white/10 pb-6">
                    <h1 className="text-2xl font-bold text-white mb-2">{isEdit ? 'Hero Tahrirlash' : 'Yangi Hero Yaratish'}</h1>
                    <p className="text-white/50 text-sm">Swiper uchun hero slide ma'lumotlarini kiriting.</p>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-8">
                                <TranslatableInput name="title" label="Sarlavha *" />

                                <div className="space-y-4">
                                    <Label className="text-white/80">Qo'shimcha sozlamalar</Label>

                                    <div className="space-y-2">
                                        <Label htmlFor="buttonLink" className="text-xs text-white/50">Tugma linki (ixtiyoriy)</Label>
                                        <Input
                                            id="buttonLink"
                                            {...register('buttonLink')}
                                            placeholder="https://example.com"
                                            className="bg-white/5 border-white/10 text-white focus-visible:ring-[#00AEEF]/50 h-10 rounded-lg"
                                        />
                                        {errors.buttonLink && <p className="text-red-400 text-xs">{errors.buttonLink.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="order" className="text-xs text-white/50">Tartib raqami</Label>
                                            <Input
                                                id="order"
                                                type="number"
                                                {...register('order', { valueAsNumber: true })}
                                                className="bg-white/5 border-white/10 text-white focus-visible:ring-[#00AEEF]/50 h-10 rounded-lg"
                                            />
                                            {errors.order && <p className="text-red-400 text-xs">{errors.order.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-xs text-white/50">Faol holati</Label>
                                            <div className="flex items-center gap-3 h-10">
                                                <Controller
                                                    control={control}
                                                    name="isActive"
                                                    render={({ field }) => (
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={field.value}
                                                                onChange={field.onChange}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B894]"></div>
                                                        </label>
                                                    )}
                                                />
                                                <span className={`text-sm ${isActive ? 'text-[#00B894]' : 'text-white/40'}`}>
                                                    {isActive ? 'Faol' : 'Nofaol'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <Label className="text-white/80">Hero rasm *</Label>
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
                        </div>

                        <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
                            <Button type="button" variant="ghost" onClick={() => navigate('/hero')} className="text-white/60 hover:text-white">
                                Bekor qilish
                            </Button>
                            <Button
                                type="submit"
                                className="bg-linear-to-r from-[#00AEEF] to-[#00B894] hover:opacity-90 text-white border-0 shadow-lg shadow-[#00AEEF]/20 rounded-xl px-8"
                            >
                                <Save className="mr-2 h-4 w-4" /> Saqlash
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};
