'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
                    }`}
            >
                <div className="container-custom flex justify-between items-center">
                    <Link href="/" className="text-xl font-display font-bold text-white relative z-50">
                        Multicor <span className="text-accent text-xs font-light tracking-widest ml-1">DIGITAL</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">Home</Link>
                        <Link href="/store" className="text-sm font-medium hover:text-accent transition-colors">Loja</Link>
                        <Link href="/simulador" className="text-sm font-medium hover:text-accent transition-colors">Simulador</Link>
                        <Link href="#contact" className="px-5 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all text-sm font-medium">
                            Contato
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white relative z-50 p-2"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8"
                    >
                        <Link href="/" onClick={() => setIsOpen(false)} className="text-3xl font-display font-medium">Home</Link>
                        <Link href="/store" onClick={() => setIsOpen(false)} className="text-3xl font-display font-medium">Loja</Link>
                        <Link href="/simulador" onClick={() => setIsOpen(false)} className="text-3xl font-display font-medium">Simulador</Link>
                        <Link href="#contact" onClick={() => setIsOpen(false)} className="text-3xl font-display font-medium text-accent">Contato</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
