import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface TranslatableInputProps {
    name: string;
    label: string;
    isTextArea?: boolean;
}

export const TranslatableInput: React.FC<TranslatableInputProps> = ({ name, label, isTextArea = false }) => {
    const { register, formState: { errors } } = useFormContext<any>();

    // Check for errors in specific languages to show indicators
    const hasError = (lang: string) => !!(errors?.[name] as any)?.[lang];

    return (
        <div className="space-y-4">
            <Label className="text-sm font-medium text-white/80">{label}</Label>
            <Tabs defaultValue="uz" className="w-full">
                <TabsList className="bg-black/20 p-1 rounded-lg w-full flex justify-start h-auto border border-white/5">
                    {['uz', 'ru', 'en'].map((lang) => (
                        <TabsTrigger
                            key={lang}
                            value={lang}
                            className={cn(
                                "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                                "data-[state=active]:bg-[#00AEEF] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#00AEEF]/20",
                                "text-white/40 hover:text-white hover:bg-white/5",
                                hasError(lang) && "text-red-400"
                            )}
                        >
                            <span className="uppercase tracking-wider text-xs">{lang}</span>
                            {hasError(lang) && <AlertCircle className="ml-2 h-3 w-3 text-red-400 inline" />}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {['uz', 'ru', 'en'].map((lang) => (
                    <TabsContent key={lang} value={lang} className="mt-3">
                        {isTextArea ? (
                            <Textarea
                                placeholder={`Enter ${label} in ${lang.toUpperCase()}`}
                                {...register(`${name}.${lang}`)}
                                className={cn(
                                    "min-h-[120px] resize-y bg-white/5 border-white/10 text-white placeholder:text-white/20",
                                    "focus-visible:ring-[#00AEEF]/50 focus-visible:border-[#00AEEF]/50 rounded-xl",
                                    hasError(lang) && "border-red-500/50 focus-visible:ring-red-500/50"
                                )}
                            />
                        ) : (
                            <Input
                                placeholder={`Enter ${label} in ${lang.toUpperCase()}`}
                                {...register(`${name}.${lang}`)}
                                className={cn(
                                    "bg-white/5 border-white/10 text-white placeholder:text-white/20",
                                    "focus-visible:ring-[#00AEEF]/50 focus-visible:border-[#00AEEF]/50 h-11 rounded-xl",
                                    hasError(lang) && "border-red-500/50 focus-visible:ring-red-500/50"
                                )}
                            />
                        )}
                        {hasError(lang) && (
                            <p className="text-xs text-red-400 mt-1 pl-1">
                                {(errors?.[name] as any)?.[lang]?.message as string}
                            </p>
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};
