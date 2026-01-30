import { useState } from 'react';
import { mockGallery } from '@/data/mockData';
import { getImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Search, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export const GalleryList = () => {
    const [gallery, setGallery] = useState(mockGallery);
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();

    const handleDelete = (id: string) => {
        if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
            setGallery(prev => prev.filter(item => item._id !== id));
            toast({
                title: "O'chirildi!",
                description: "Rasm muvaffaqiyatli o'chirildi (demo rejim).",
            });
        }
    };

    const filteredGallery = gallery.filter(item =>
        item.title?.uz?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Photo Gallery</h1>
                    <p className="text-white/50 text-sm mt-1">Galereya rasmlarini boshqarish.</p>
                </div>
                <Link to="/gallery/new">
                    <Button className="bg-gradient-to-r from-[#00AEEF] to-[#00B894] hover:opacity-90 text-white border-0 shadow-lg shadow-[#00AEEF]/20 rounded-xl">
                        <Plus className="mr-2 h-4 w-4" /> Rasm qo'shish
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                    placeholder="Qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pl-9 rounded-xl focus-visible:ring-[#00AEEF]/50"
                />
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGallery.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center h-48 text-white/40">
                        <ImageIcon className="h-12 w-12 opacity-20 mb-2" />
                        <p>Rasmlar topilmadi</p>
                    </div>
                ) : (
                    filteredGallery.map((item) => (
                        <div
                            key={item._id}
                            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:scale-[1.02]"
                        >
                            <div className="aspect-square">
                                <img
                                    src={getImageUrl(item.image)}
                                    alt={item.title?.uz || ''}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white font-medium truncate">{item.title?.uz}</p>
                                    <div className="flex gap-2 mt-2">
                                        <Link to={`/gallery/${item._id}`}>
                                            <Button size="sm" variant="ghost" className="h-8 text-[#00AEEF] hover:text-[#00AEEF] hover:bg-[#00AEEF]/10">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 text-red-400 hover:text-red-400 hover:bg-red-500/10"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
