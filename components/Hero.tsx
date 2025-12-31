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

                    // Candle light feel: Warm glow + dark shadow
                    const shadowColor = `rgba(245, 158, 11, ${0.3 * power})`; // Warm orange glow
                    const shadowReal = `rgba(0,0,0, ${0.5 * power})`; // Real depth shadow

                    gsap.to(char, {
                        scale: scale,
                        x: distanceX * 0.1 * power, // Magnetic attraction
                        y: distanceY * 0.1 * power,
                        textShadow: `${moveX}px ${moveY}px 15px ${shadowReal}, 0 0 10px ${shadowColor}`,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(char, {
                        scale: 1,
                        x: 0,
                        y: 0,
                        textShadow: "0px 0px 0px rgba(0,0,0,0)",
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
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-6 flex items-baseline justify-center gap-1"
                    >
                        <span className="text-secondary tracking-[0.3em] text-sm uppercase">Desde 1983</span>
                        <div className="h-[1px] w-12 bg-white/20"></div>
                        <span className="text-secondary tracking-[0.3em] text-sm uppercase">Brasil</span>
                    </motion.div>

                    <h1
                        ref={titleRef}
                        className="text-[18vw] md:text-[14vw] font-display font-light leading-[0.8] tracking-tighter text-white select-none whitespace-nowrap"
                    >
                        {brandName.split("").map((char, i) => (
                            <span key={i} className="char inline-block will-change-transform">
                                {char}
                            </span>
                        ))}
                        <span className="text-[4vw] md:text-[3vw] text-secondary font-display font-thin ml-4 align-top opacity-50">
                            DIGITAL
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="mt-12 text-lg md:text-xl text-secondary max-w-xl mx-auto font-light leading-relaxed"
                    >
                        Estratégia visual e comunicação de alto impacto para marcas que definem o futuro.
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
