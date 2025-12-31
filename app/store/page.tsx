'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore, Product } from '@/lib/store';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

const products: Product[] = [
    {
        id: 'vinil-brilho',
        name: 'Vinil Adesivo Brilho',
        category: 'vinil',
        price: 45.00,
        unit: 'metro',
        description: 'Vinil de alta qualidade para plotagem e envelopamento. Durabilidade de 5 anos.',
        image: '/images/service-fleet.jpg' // Placeholder
    },
    {
        id: 'vinil-fosco',
        name: 'Vinil Adesivo Fosco',
        category: 'vinil',
        price: 48.00,
        unit: 'metro',
        description: 'Acabamento matte sofisticado, ideal para decoração e sinalização interna.',
        image: '/images/service-acm.jpg' // Placeholder
    },
    {
        id: 'banner-1x1',
        name: 'Banner 100x100cm',
        category: 'banner',
        price: 80.00,
        unit: 'unidade',
        description: 'Lona 440g com acabamento em bastão e corda. Impressão digital de alta resolução.',
        image: '/images/service-print.jpg' // Placeholder
    },
    {
        id: 'adesivo-recorte',
        name: 'Adesivo Recorte Eletrônico',
        category: 'adesivo',
        price: 120.00,
        unit: 'metro',
        description: 'Adesivos recortados no formato da sua marca. Ideal para vitrines e carros.',
        image: '/images/service-signage.jpg' // Placeholder
    },
];

export default function StorePage() {
    const { addToCart, cart } = useStore();
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const handleQuantityId = (id: string, delta: number) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + delta)
        }));
    };

    return (
        <main className="min-h-screen pt-32 pb-20 bg-background text-white">
            <div className="container-custom">
                <header className="mb-16 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Loja Multicor</h1>
                        <p className="text-secondary text-lg max-w-xl">
                            Materiais profissionais para comunicação visual. Compre por metro ou unidades prontas.
                        </p>
                    </div>

                    <div className="bg-surface border border-white/10 px-6 py-3 rounded-full flex items-center gap-3">
                        <ShoppingCart className="w-5 h-5 text-accent" />
                        <span className="font-medium">{cart.length} itens</span>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="group bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-xs uppercase tracking-wider text-accent mb-1 block">{product.category}</span>
                                        <h3 className="text-xl font-medium">{product.name}</h3>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xl font-bold block">R$ {product.price.toFixed(2)}</span>
                                        <span className="text-xs text-secondary">/ {product.unit}</span>
                                    </div>
                                </div>

                                <p className="text-secondary text-sm mb-6 line-clamp-2">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between gap-4 mt-auto">
                                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-1">
                                        <button
                                            onClick={() => handleQuantityId(product.id, -1)}
                                            className="w-8 h-8 flex items-center justify-center hover:text-white text-secondary transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-8 text-center font-medium">{quantities[product.id] || 1}</span>
                                        <button
                                            onClick={() => handleQuantityId(product.id, 1)}
                                            className="w-8 h-8 flex items-center justify-center hover:text-white text-secondary transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => addToCart(product, quantities[product.id] || 1)}
                                        className="flex-1 bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
