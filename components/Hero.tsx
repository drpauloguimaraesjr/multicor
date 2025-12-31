'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    // Efeito de Mouse Light/Shadow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set(clientX / innerWidth - 0.5);
            mouseY.set(clientY / innerHeight - 0.5);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Scroll Animations (Pinning effect simulation)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const y2 = useTransform(scrollYProgress, [0.3, 1], ["100%", "0%"]);
    const opacity2 = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

    return (
        <div ref={containerRef} className="relative h-[200vh]">
            <div className="sticky top-0 h-screen flex flex-col justify-center px-4 md:px-12 bg-background overflow-hidden">

                {/* Content 1: Initial State */}
                <motion.div
                    style={{ y: y1, opacity: opacity1 }}
                    className="absolute inset-0 flex flex-col justify-center items-center z-10"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-secondary tracking-[0.3em] uppercase text-sm mb-6"
                    >
                        Since 1983
                    </motion.span>

                    <h1 ref={textRef} className="text-[12vw] leading-none font-display font-bold text-white tracking-tighter text-center relative z-20 mix-blend-difference group cursor-default">
                        {/* Split Text Animation Effect */}
                        {"MULTICOR".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 1,
                                    delay: 0.1 + i * 0.05,
                                    ease: [0.215, 0.61, 0.355, 1]
                                }}
                                className="inline-block hover:scale-110 hover:text-gray-200 transition-transform duration-300 origin-center"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-12 animate-bounce"
                    >
                        <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
                    </motion.div>
                </motion.div>

                {/* Content 2: Swapped Content on Scroll */}
                <motion.div
                    style={{ y: y2, opacity: opacity2 }}
                    className="absolute inset-0 flex flex-col justify-center items-center z-20 pointer-events-none"
                >
                    <h2 className="text-5xl md:text-7xl font-display font-medium text-white text-center leading-tight max-w-5xl">
                        Transformando espaços com <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">identidade visual</span>.
                    </h2>

                    <div className="mt-12 pointer-events-auto">
                        <a href="#contact" className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden inline-flex items-center gap-2 hover:bg-gray-200 transition-colors">
                            <span className="relative z-10 font-medium">Iniciar Projeto</span>
                            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </motion.div>

                {/* Dynamic Shadow / Light Effect Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />

            </div>
        </div>
    );
}
