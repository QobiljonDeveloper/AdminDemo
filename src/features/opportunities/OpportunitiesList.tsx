import { useState } from 'react';
import { mockOpportunities } from '@/data/mockData';
import { getImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Search, Briefcase, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export const OpportunitiesList = () => {
    const [opportunities, setOpportunities] = useState(mockOpportunities);
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();

    const handleDelete = (id: string) => {
        if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
            setOpportunities(prev => prev.filter(item => item._id !== id));
            toast({
                title: "O'chirildi!",
                description: "Imkoniyat muvaffaqiyatli o'chirildi (demo rejim).",
            });
        }
    };

    const filteredOpportunities = opportunities.filter(item =>
        item.title?.uz?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Opportunities</h1>
                    <p className="text-white/50 text-sm mt-1">Imkoniyatlar va dasturlarni boshqarish.</p>
                </div>
                <Link to="/opportunities/new">
                    <Button className="bg-gradient-to-r from-[#00AEEF] to-[#00B894] hover:opacity-90 text-white border-0 shadow-lg shadow-[#00AEEF]/20 rounded-xl">
                        <Plus className="mr-2 h-4 w-4" /> Imkoniyat qo'shish
                    </Button>
                </Link>
            </div>

            <div className="rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center gap-4">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <Input
                            placeholder="Qidirish..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pl-9 rounded-xl"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/10 hover:bg-transparent">
                                <TableHead className="w-[100px] text-white/40 uppercase text-xs tracking-wider">Rasm</TableHead>
                                <TableHead className="text-white/40 uppercase text-xs tracking-wider">Sarlavha (UZ)</TableHead>
                                <TableHead className="text-white/40 uppercase text-xs tracking-wider">Tavsif</TableHead>
                                <TableHead className="text-right text-white/40 uppercase text-xs tracking-wider">Amallar</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOpportunities.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-48 text-center text-white/40">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Briefcase className="h-8 w-8 opacity-20" />
                                            <p>Imkoniyatlar topilmadi</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredOpportunities.map((item) => (
                                    <TableRow key={item._id} className="border-white/5 hover:bg-[#00AEEF]/5 transition-colors group">
                                        <TableCell>
                                            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden">
                                                {item.image ? (
                                                    <img src={getImageUrl(item.image)} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                                        <Image className="h-4 w-4" />
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-white">
                                            {item.title?.uz ?? <span className="text-white/30 italic">Sarlavha yo'q</span>}
                                        </TableCell>
                                        <TableCell className="text-white/60 text-sm max-w-md truncate">
                                            {item.description?.uz?.substring(0, 80)}...
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link to={`/opportunities/${item._id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#00AEEF] hover:text-[#00AEEF] hover:bg-[#00AEEF]/10 rounded-lg">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                                                    onClick={() => handleDelete(item._id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};
