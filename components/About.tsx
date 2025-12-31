'use client';

import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <section id="about" className="py-32 md:py-48 bg-surface">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-20 items-start">

                    {/* Lado Esquerdo - Título e Estatísticas minimalistas */}
                    <div>
                        <ScrollReveal>
                            <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-12 tracking-tight leading-tight">
                                Construindo identidades visuais que marcam presença.
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="grid grid-cols-2 gap-12 mt-20 border-t border-white/10 pt-12">
                                <div>
                                    <h3 className="text-5xl font-display font-light text-white mb-2">500<span className="text-accent">+</span></h3>
                                    <p className="text-secondary text-sm uppercase tracking-wider">Projetos Entregues</p>
                                </div>
                                <div>
                                    <h3 className="text-5xl font-display font-light text-white mb-2">42<span className="text-accent">+</span></h3>
                                    <p className="text-secondary text-sm uppercase tracking-wider">Anos de Experiência</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Lado Direito - Texto Descritivo */}
                    <div className="md:pt-4">
                        <ScrollReveal delay={100}>
                            <p className="text-xl text-secondary leading-relaxed mb-8 font-light">
                                A Multicor não é apenas uma empresa de comunicação visual. Somos parceiros estratégicos na materialização da sua marca no espaço físico.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <p className="text-xl text-secondary leading-relaxed mb-8 font-light">
                                Combinamos processos industriais de precisão com acabamento artesanal. Cada banner, fachada em ACM ou projeto de sinalização passa por um rigoroso controle de qualidade para garantir que a primeira impressão da sua empresa seja inesquecível.
                            </p>
                            <p className="text-xl text-secondary leading-relaxed font-light">
                                Nossa tecnologia de impressão e corte permite acabamentos que se destacam pela durabilidade e fidelidade de cor, essenciais para manter a integridade da sua marca ao longo do tempo.
                            </p>
                        </ScrollReveal>

                        {/* Link sutil com underline animation */}
                        <ScrollReveal delay={300}>
                            <div className="mt-12">
                                <a href="#contact" className="link-underline text-white text-lg pb-1 border-b border-white/20 hover:border-white transition-colors">
                                    Vamos conversar sobre seu projeto
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    );
}
