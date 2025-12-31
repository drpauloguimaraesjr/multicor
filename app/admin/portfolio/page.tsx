'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import ImageUploader from '@/components/admin/ImageUploader';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import Image from 'next/image';

interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    createdAt: any;
}

export default function AdminPortfolio() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as PortfolioItem[];
            setItems(data);
        } catch (error) {
            console.error('Error loading items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta imagem?')) return;

        try {
            await deleteDoc(doc(db, 'portfolio', id));
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Erro ao excluir. Tente novamente.');
        }
    };

    const filteredItems = filter === 'all'
        ? items
        : items.filter(item => item.category === filter);

    return (
        <ProtectedRoute>
            <div className="min-h-screen p-4 md:p-8">
                <div className="container-custom max-w-6xl">
                    {/* Header */}
                    <div className="mb-8">
                        <a href="/admin" className="text-slate-400 hover:text-primary-400 smooth-transition mb-4 inline-block">
                            ← Voltar ao Dashboard
                        </a>
                        <h1 className="text-4xl font-display font-bold gradient-text mb-2">
                            Gerenciar Portfólio
                        </h1>
                        <p className="text-slate-400">
                            Faça upload e gerencie as imagens do portfólio
                        </p>
                    </div>

                    {/* Upload Section */}
                    <div className="glass-dark p-8 rounded-3xl mb-8">
                        <h2 className="text-2xl font-display font-bold mb-6 gradient-text">
                            Upload de Nova Imagem
                        </h2>
                        <ImageUploader onUploadComplete={loadItems} />
                    </div>

                    {/* Gallery Section */}
                    <div className="glass-dark p-8 rounded-3xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-display font-bold gradient-text">
                                Imagens ({filteredItems.length})
                            </h2>

                            {/* Filter */}
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white"
                            >
                                <option value="all">Todas</option>
                                <option value="banners">Banners</option>
                                <option value="placas">Placas</option>
                                <option value="adesivos">Adesivos</option>
                                <option value="fachadas">Fachadas</option>
                            </select>
                        </div>

                        {loading ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-slate-300">Carregando...</p>
                            </div>
                        ) : filteredItems.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📸</div>
                                <p className="text-slate-400">Nenhuma imagem encontrada</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredItems.map((item) => (
                                    <div key={item.id} className="glass rounded-2xl overflow-hidden group">
                                        <div className="aspect-video relative bg-slate-800">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                                            <p className="text-sm text-slate-400 mb-2">{item.category}</p>
                                            {item.description && (
                                                <p className="text-sm text-slate-500 mb-3">{item.description}</p>
                                            )}
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="w-full px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 smooth-transition text-sm text-red-300"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
