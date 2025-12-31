'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const services = [
    {
        id: '01',
        title: 'Fachadas em ACM',
        description: 'Revestimento de alto padrão para transformar a arquitetura do seu negócio.',
        image: '/images/service-acm.jpg' // Placeholder path
    },
    {
        id: '02',
        title: 'Sinalização Corporativa',
        description: 'Placas e direcionais que integram funcionalidade e a identidade da sua marca.',
        image: '/images/service-signage.jpg'
    },
    {
        id: '03',
        title: 'Impressão em Grandes Formatos',
        description: 'Banners e lonas com resolução fotográfica para máximo impacto visual.',
        image: '/images/service-print.jpg'
    },
    {
        id: '04',
        title: 'Adesivação de Frotas',
        description: 'Transforme seus veículos em mídia móvel com aplicação de vinil premium.',
        image: '/images/service-fleet.jpg'
    }
];

export default function Services() {
    const [hoveredService, setHoveredService] = useState<number | null>(null);

    return (
        <section id="services" className="py-32 bg-background border-t border-white/5 relative items-center flex flex-col justify-center min-h-[80vh]">
            <div className="container-custom">
                <ScrollReveal>
                    <h2 className="text-sm md:text-base text-secondary uppercase tracking-[0.2em] mb-16">
                        Nossa Expertise
                    </h2>
                </ScrollReveal>

                <div className="flex flex-col">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative border-t border-white/10 last:border-b py-12 md:py-16 cursor-pointer transition-colors duration-500 hover:bg-white/5"
                            onMouseEnter={() => setHoveredService(index)}
                            onMouseLeave={() => setHoveredService(null)}
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 z-10 relative">
                                <div className="flex items-baseline gap-8 md:gap-16">
                                    <span className="text-secondary/50 font-display text-lg md:text-xl">
                                        {service.id}
                                    </span>
                                    <h3 className="text-3xl md:text-5xl font-display font-medium text-white group-hover:translate-x-4 transition-transform duration-500 ease-custom-bezier">
                                        {service.title}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-8 md:w-1/3 justify-between md:justify-end">
                                    <p className="text-secondary text-sm md:text-base max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                                        {service.description}
                                    </p>
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
