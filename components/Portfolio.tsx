'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    { id: 1, title: 'Imperador Alimentos', category: 'Frotas', image: '/images/imperador-bau-lateral-1.jpg' },
    { id: 2, title: 'Go Connect', category: 'Frotas', image: '/images/goconnect-lateral.jpg' },
    { id: 3, title: 'Imperador BBQ', category: 'Frotas', image: '/images/imperador-bbq-lateral.jpg' },
    { id: 4, title: 'Imperador Azeite', category: 'Frotas', image: '/images/imperador-bau-traseira-2.jpg' },
    { id: 5, title: 'Go Connect (Frente)', category: 'Frotas', image: '/images/goconnect-frente.jpg' },
    { id: 6, title: 'Imperador Ketchup', category: 'Frotas', image: '/images/imperador-ketchup-lateral.jpg' },
    { id: 7, title: 'Neo Tower', category: 'Fachadas', image: '/images/service-acm.jpg' },
    { id: 8, title: 'Aurum Capital', category: 'Sinalização', image: '/images/service-signage.jpg' },
    { id: 9, title: 'Imperador (Traseira)', category: 'Frotas', image: '/images/imperador-bau-traseira-1.jpg' },
    { id: 10, title: 'Imperador Logística', category: 'Frotas', image: '/images/imperador-bau-lateral-2.jpg' },
    { id: 11, title: 'Multicor Print', category: 'Impressão', image: '/images/service-print.jpg' },
    { id: 12, title: 'Gestão de Frotas', category: 'Frotas', image: '/images/service-fleet.jpg' },
    { id: 13, title: 'Fachada Catavento', category: 'Fachadas', image: '/images/facade-catavento.jpg' },
    { id: 14, title: 'HDM Hospitalar', category: 'Sinalização', image: '/images/facade-hdm.jpg' },
    { id: 15, title: 'Pista de Dança', category: 'Impressão', image: '/images/event-dance-floor.jpg' },
];

export default function Portfolio() {
    const sectionRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    useEffect(() => {
        if (!sliderRef.current || !sectionRef.current) return;

        const slider = sliderRef.current;
        const speed = 1;
        let xPercent = 0;
        let direction = -1;

        // Clone items for infinite effect
        const totalItems = slider.children.length;
        for (let i = 0; i < totalItems; i++) {
            const clone = slider.children[i].cloneNode(true);
            slider.appendChild(clone);
        }

        const animation = () => {
            if (xPercent <= -100) {
                xPercent = 0;
            } else if (xPercent > 0) {
                xPercent = -100;
            }
            gsap.set(slider, { xPercent: xPercent });
            xPercent += speed * direction;
            requestAnimationFrame(animation);
        };

        // Velocity observer to speed up on scroll
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                // Adjust speed based on scroll velocity
                const velocity = Math.abs(self.getVelocity());
                const boost = velocity / 1000;
                const finalSpeed = 0.5 + boost;

                // If scrolling down, move left. If up, move right.
                direction = self.direction === 1 ? -1 : 1;

                gsap.to(slider, {
                    timeScale: finalSpeed,
                    duration: 0.5,
                    overwrite: true
                });
            }
        });

        // Start the continuous motion
        const raf = requestAnimationFrame(animation);

        // Internal Parallax for each image
        const items = gsap.utils.toArray('.gallery-item');
        items.forEach((item: any) => {
            const img = item.querySelector('img');
            gsap.to(img, {
                x: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    start: "left right",
                    end: "right left",
                    scrub: true
                }
            });
        });

        return () => {
            cancelAnimationFrame(raf);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} id="portfolio" className="py-24 bg-background overflow-hidden relative z-10">
            <div className="container-custom mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end gap-6"
                >
                    <div>
                        <h2 className="text-sm md:text-base text-secondary uppercase tracking-[0.2em] mb-4">
                            Portfólio Infinito
                        </h2>
                        <p className="text-4xl md:text-6xl font-display text-white leading-tight">
                            Nossa arte em <br /> movimento constante.
                        </p>
                    </div>
                    <div className="text-secondary text-sm md:text-base max-w-xs font-light">
                        Arraste ou role para explorar os detalhes de cada projeto transformado.
                    </div>
                </motion.div>
            </div>

            {/* The infinite track */}
            <div className="relative flex whitespace-nowrap overflow-visible py-20 cursor-grab active:cursor-grabbing">
                <div ref={sliderRef} className="flex gap-8 px-4">
                    {projects.map((project, idx) => (
                        <div
                            key={`${project.id}-${idx}`}
                            className={`gallery-item relative shrink-0 w-[80vw] md:w-[450px] aspect-[4/5] overflow-hidden rounded-2xl group transition-all duration-700 ease-out
                                ${hoveredIdx !== null && hoveredIdx !== idx ? 'opacity-30 scale-95 blur-[2px]' : 'opacity-100 scale-100'}
                            `}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            onClick={() => setSelectedImage(project.image)}
                        >
                            <div className="absolute inset-0 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover scale-110 group-hover:scale-125 transition-transform duration-1000 ease-out will-change-transform"
                                />
                            </div>

                            {/* Info Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-custom-bezier">
                                <span className="text-xs uppercase tracking-widest text-white/50 mb-2 block">{project.category}</span>
                                <div className="flex justify-between items-end">
                                    <h3 className="text-xl font-display text-white">{project.title}</h3>
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center">
                                        <ArrowUpRight size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* Glass border on hover */}
                            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Cursor Hint (Optional / Desktop Only) */}
            <div className="container-custom flex justify-center mt-12">
                <div className="px-6 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.3em] text-secondary">
                    Exploração infinita conforme o scroll
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
                                alt="Project preview"
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
