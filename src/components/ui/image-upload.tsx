import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image as ImageIcon, Upload, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
    value: string | File | null;
    onChange: (value: string | File | null) => void;
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [mode, setMode] = useState<'upload' | 'url'>('upload');
    const [isDragging, setIsDragging] = useState(false);

    // Initialize state based on value type
    useEffect(() => {
        if (!value) {
            setPreview(null);
            return;
        }

        if (typeof value === 'string') {
            setPreview(value);
            setMode('url');
        } else if (value instanceof File) {
            const objectUrl = URL.createObjectURL(value);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const clear = () => {
        onChange(null);
        setPreview(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onChange(file);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-white/80">Image</Label>
                {value && (
                    <Button type="button" variant="ghost" size="sm" onClick={clear} className="h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                        <X className="w-4 h-4 mr-2" />
                        Remove
                    </Button>
                )}
            </div>

            <Tabs value={mode} onValueChange={(v) => setMode(v as 'upload' | 'url')} className="w-full">
                <TabsList className="bg-black/20 p-1 rounded-lg w-full grid grid-cols-2 border border-white/5">
                    <TabsTrigger
                        value="upload"
                        className="data-[state=active]:bg-[#00AEEF] data-[state=active]:text-white text-white/40 hover:text-white"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload File
                    </TabsTrigger>
                    <TabsTrigger
                        value="url"
                        className="data-[state=active]:bg-[#00AEEF] data-[state=active]:text-white text-white/40 hover:text-white"
                    >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Image URL
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="pt-4">
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="dropzone-file"
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300",
                                isDragging
                                    ? "border-[#00AEEF] bg-[#00AEEF]/10"
                                    : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                <div className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors",
                                    isDragging ? "bg-[#00AEEF]/20 text-[#00AEEF]" : "bg-white/10 text-white/50"
                                )}>
                                    <Upload className="w-6 h-6" />
                                </div>
                                <p className="text-sm text-white/70 font-medium">Click to upload or drag and drop</p>
                                <p className="text-xs text-white/40 mt-1">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                    </div>
                </TabsContent>

                <TabsContent value="url" className="pt-4">
                    <div className="space-y-2">
                        <Input
                            placeholder="https://example.com/image.jpg"
                            value={typeof value === 'string' ? value : ''}
                            onChange={handleUrlChange}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#00AEEF]/50 focus-visible:border-[#00AEEF]/50 h-11 rounded-xl"
                        />
                        <p className="text-xs text-white/40">Enter a direct link to an image.</p>
                    </div>
                </TabsContent>
            </Tabs>

            {preview && (
                <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black/20 mt-4 group">
                    <div className="aspect-video w-full">
                        <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                    </div>
                    {/* Overlay with checkmark */}
                    <div className="absolute top-2 right-2 bg-emerald-500/90 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <Check className="w-4 h-4" />
                    </div>
                </div>
            )}
        </div>
    );
};
