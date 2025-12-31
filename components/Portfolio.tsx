'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

// Dados Placeholder (usando as imagens geradas)
const projects = [
    { id: 1, title: 'Imperador Alimentos', category: 'Frotas', image: '/images/imperador-bau-lateral-1.jpg', year: '2024' },
    { id: 2, title: 'Go Connect', category: 'Frotas', image: '/images/goconnect-lateral.jpg', year: '2024' },
    { id: 3, title: 'Imperador BBQ', category: 'Frotas', image: '/images/imperador-bbq-lateral.jpg', year: '2024' },
    { id: 4, title: 'Imperador Azeite', category: 'Frotas', image: '/images/imperador-bau-traseira-2.jpg', year: '2024' },
    { id: 5, title: 'Go Connect (Frente)', category: 'Frotas', image: '/images/goconnect-frente.jpg', year: '2024' },
    { id: 6, title: 'Imperador Ketchup', category: 'Frotas', image: '/images/imperador-ketchup-lateral.jpg', year: '2024' },
    { id: 7, title: 'Imperador (Traseira)', category: 'Frotas', image: '/images/imperador-bau-traseira-1.jpg', year: '2024' },
    { id: 8, title: 'Aurum Capital', category: 'Sinalização', image: '/images/service-signage.jpg', year: '2024' }, // Mantendo um placeholder para variedade
    { id: 9, title: 'Neo Tower', category: 'Fachadas', image: '/images/service-acm.jpg', year: '2024' }, // Mantendo um placeholder para variedade
];

const categories = ['Todos', 'Fachadas', 'Sinalização', 'Frotas', 'Impressão'];

export default function Portfolio() {
    const [filter, setFilter] = useState('Todos');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const filteredProjects = filter === 'Todos'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section id="portfolio" className="py-32 bg-background relative z-10">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div>
                        <h2 className="text-sm md:text-base text-secondary uppercase tracking-[0.2em] mb-4">
                            Projetos Selecionados
                        </h2>
                        <p className="text-4xl md:text-5xl font-display text-white max-w-2xl leading-tight">
                            Onde precisão técnica encontra <br /> excelência estética.
                        </p>
                    </div>

                    <div className="flex gap-4 md:gap-8 mt-8 md:mt-0 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`text-sm tracking-wider uppercase whitespace-nowrap transition-colors duration-300 ${filter === cat ? 'text-white border-b border-white' : 'text-secondary hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry-style Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className={`group relative overflow-hidden cursor-pointer ${
                                    // Layout assimétrico simples
                                    index === 1 || index === 4 ? 'md:mt-20' : ''
                                    }`}
                                onClick={() => setSelectedImage(project.image)}
                            >
                                <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                        className="w-full h-full relative"
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                        />
                                    </motion.div>

                                    {/* Overlay Reveal Content */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-custom-bezier">
                                            <span className="text-xs uppercase tracking-widest text-white/70 mb-2 block">{project.category}</span>
                                            <div className="flex justify-between items-end">
                                                <h3 className="text-2xl font-display text-white">{project.title}</h3>
                                                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                    <ArrowUpRight size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Lightbox Minimalista */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-8 right-8 text-white hover:rotate-90 transition-transform duration-300">
                            <X size={32} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-full h-full max-w-7xl max-h-[90vh]"
                        >
                            <Image
                                src={selectedImage}
                                alt="Project visualization"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
