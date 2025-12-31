'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        const titleChars = titleRef.current?.querySelectorAll('.char');
        if (!titleChars) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            titleChars.forEach((char) => {
                const rect = (char as HTMLElement).getBoundingClientRect();
                const charX = rect.left + rect.width / 2;
                const charY = rect.top + rect.height / 2;

                const distanceX = clientX - charX;
                const distanceY = clientY - charY;
                const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

                // Max interaction distance
                const maxDist = 300;

                if (distance < maxDist) {
                    const power = (maxDist - distance) / maxDist;

                    // Lupa / Magnify effect
                    const scale = 1 + (0.2 * power);

                    // Shadow vector (Opposite to mouse)
                    const moveX = (distanceX / distance) * -20 * power;
                    const moveY = (distanceY / distance) * -20 * power;

                    // Candle light feel: Warm golden glow + dark depth shadow
                    const shadowColor = `rgba(255, 191, 0, ${0.4 * power})`; // Warm amber glow
                    const shadowReal = `rgba(0,0,0, ${0.6 * power})`; // Real depth shadow

                    gsap.to(char, {
                        scale: scale,
                        x: distanceX * 0.1 * power, // Magnetic attraction
                        y: distanceY * 0.1 * power,
                        rotateY: distanceX * 0.05 * power, // 3D Tilt
                        rotateX: distanceY * -0.05 * power,
                        textShadow: `${moveX}px ${moveY}px 20px ${shadowReal}, 0 0 15px ${shadowColor}`,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(char, {
                        scale: 1,
                        x: 0,
                        y: 0,
                        rotateY: 0,
                        rotateX: 0,
                        textShadow: "0px 10px 30px rgba(0,0,0,0.5)",
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const brandName = "MULTICOR";

    return (
        <section ref={containerRef} className="relative h-screen bg-background overflow-hidden">
            {/* Soul of the Brand Watermark */}
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.03]"
            >
                <img
                    src="/brand/logo-symbol.svg"
                    alt="Symbol"
                    className="h-[120vh] w-auto mix-blend-overlay grayscale blur-[1px]"
                />
            </motion.div>

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 h-full flex flex-col items-center justify-center px-4"
            >
                <div className="text-center relative [perspective:1000px]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-8 flex items-center justify-center gap-3"
                    >
                        <div className="h-[1px] w-8 bg-white/30"></div>
                        <span className="text-secondary tracking-[0.4em] text-[10px] md:text-xs uppercase font-medium">Desde 1983 • Brasil</span>
                        <div className="h-[1px] w-8 bg-white/30"></div>
                    </motion.div>

                    <div className="relative inline-block">
                        <h1
                            ref={titleRef}
                            className="text-[18vw] md:text-[14vw] font-display font-bold leading-[0.7] tracking-tighter text-white select-none whitespace-nowrap [text-shadow:0_10px_30px_rgba(0,0,0,0.5)]"
                        >
                            {brandName.split("").map((char, i) => (
                                <span key={i} className="char inline-block will-change-transform [transform-style:preserve-3d]">
                                    {char}
                                </span>
                            ))}
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 0.6, x: 100 }}
                            transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
                            className="absolute -bottom-4 right-0 md:-right-20 flex items-center justify-center"
                        >
                            <span className="text-[3vw] md:text-[1.8vw] text-white font-display font-extralight uppercase tracking-[1.5em] whitespace-nowrap">
                                DIGITAL
                            </span>
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1.5 }}
                        className="mt-20 text-base md:text-lg text-secondary max-w-2xl mx-auto font-light leading-relaxed px-6"
                    >
                        Estratégia visual e comunicação de alto impacto <br className="hidden md:block" /> para marcas que definem o futuro.
                    </motion.p>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-12 flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] uppercase tracking-[0.5em] text-secondary">Role para baixo</span>
                    <div className="h-20 w-[1px] bg-gradient-to-b from-white/40 to-transparent"></div>
                </motion.div>
            </motion.div>
        </section>
    );
}
