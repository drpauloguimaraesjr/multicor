'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission (replace with actual implementation)
        setTimeout(() => {
            setSubmitMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            setIsSubmitting(false);
            setFormData({ name: '', email: '', phone: '', message: '' });

            setTimeout(() => setSubmitMessage(''), 5000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="section-padding">
            <div className="container-custom">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            Entre em <span className="gradient-text">Contato</span>
                        </h2>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                            Vamos transformar suas ideias em realidade. Fale conosco!
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <ScrollReveal delay={200}>
                        <div className="glass-dark p-8 rounded-3xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-slate-300">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white"
                                        placeholder="Seu nome"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-slate-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white"
                                        placeholder="seu@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-slate-300">
                                        Telefone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white"
                                        placeholder="(00) 00000-0000"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-slate-300">
                                        Mensagem
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white resize-none"
                                        placeholder="Conte-nos sobre seu projeto..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                                </button>

                                {submitMessage && (
                                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center">
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </ScrollReveal>

                    {/* Contact Info */}
                    <ScrollReveal delay={400}>
                        <div className="space-y-8">
                            <div className="glass-dark p-8 rounded-3xl">
                                <div className="flex items-start gap-4">
                                    <div className="text-4xl">📍</div>
                                    <div>
                                        <h3 className="text-xl font-display font-bold mb-2 gradient-text">
                                            Localização
                                        </h3>
                                        <p className="text-slate-300">
                                            Rua S 4, 887<br />
                                            St. Bela Vista, Goiânia - GO<br />
                                            CEP 74823-450
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-dark p-8 rounded-3xl">
                                <div className="flex items-start gap-4">
                                    <div className="text-4xl">📞</div>
                                    <div>
                                        <h3 className="text-xl font-display font-bold mb-2 gradient-text">
                                            Telefone
                                        </h3>
                                        <p className="text-slate-300">
                                            [Telefone da empresa]
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-dark p-8 rounded-3xl">
                                <div className="flex items-start gap-4">
                                    <div className="text-4xl">✉️</div>
                                    <div>
                                        <h3 className="text-xl font-display font-bold mb-2 gradient-text">
                                            Email
                                        </h3>
                                        <div className="space-y-1 text-slate-400">
                                            multicor@email.com
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-dark p-8 rounded-3xl">
                                <div className="flex items-start gap-4">
                                    <div className="text-4xl">⏰</div>
                                    <div>
                                        <h3 className="text-xl font-display font-bold mb-2 gradient-text">
                                            Horário de Atendimento
                                        </h3>
                                        <p className="text-slate-300">
                                            Segunda a Sexta: 8h às 18h<br />
                                            Sábado: 8h às 12h
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
