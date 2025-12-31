'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminHero() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        title: 'Multicor',
        subtitle: 'Comunicação Visual de Excelência',
        description: 'Transformamos suas ideias em realidade visual com criatividade, qualidade e profissionalismo. Especialistas em banners, placas, adesivos e fachadas em ACM.',
        ctaPrimary: 'Ver Portfólio',
        ctaSecondary: 'Entre em Contato',
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const docRef = doc(db, 'content', 'hero');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setFormData(docSnap.data() as any);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            await setDoc(doc(db, 'content', 'hero'), formData);
            setMessage('Alterações salvas com sucesso!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving data:', error);
            setMessage('Erro ao salvar. Tente novamente.');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (loading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-300">Carregando...</p>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen p-4 md:p-8">
                <div className="container-custom max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <a href="/admin" className="text-slate-400 hover:text-primary-400 smooth-transition mb-4 inline-block">
                            ← Voltar ao Dashboard
                        </a>
                        <h1 className="text-4xl font-display font-bold gradient-text mb-2">
                            Editar Hero Section
                        </h1>
                        <p className="text-slate-400">
                            Personalize o conteúdo da seção principal do site
                        </p>
                    </div>

                    {/* Form */}
                    <div className="glass-dark p-8 rounded-3xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold mb-2 text-slate-300">
                                    Título Principal
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="subtitle" className="block text-sm font-semibold mb-2 text-slate-300">
                                    Subtítulo
                                </label>
                                <input
                                    type="text"
                                    id="subtitle"
                                    name="subtitle"
                                    value={formData.subtitle}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold mb-2 text-slate-300">
                                    Descrição
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white resize-none"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="ctaPrimary" className="block text-sm font-semibold mb-2 text-slate-300">
                                        Texto do Botão Principal
                                    </label>
                                    <input
                                        type="text"
                                        id="ctaPrimary"
                                        name="ctaPrimary"
                                        value={formData.ctaPrimary}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="ctaSecondary" className="block text-sm font-semibold mb-2 text-slate-300">
                                        Texto do Botão Secundário
                                    </label>
                                    <input
                                        type="text"
                                        id="ctaSecondary"
                                        name="ctaSecondary"
                                        value={formData.ctaSecondary}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? 'Salvando...' : 'Salvar Alterações'}
                            </button>

                            {message && (
                                <div className={`p-4 rounded-xl text-center ${message.includes('sucesso')
                                        ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                                        : 'bg-red-500/20 border border-red-500/50 text-red-300'
                                    }`}>
                                    {message}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Preview */}
                    <div className="glass-dark p-8 rounded-3xl mt-8">
                        <h2 className="text-2xl font-display font-bold mb-6 gradient-text">
                            Preview
                        </h2>
                        <div className="text-center space-y-4">
                            <h1 className="text-5xl font-display font-bold gradient-text">
                                {formData.title}
                            </h1>
                            <p className="text-2xl text-slate-200">
                                {formData.subtitle}
                            </p>
                            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                                {formData.description}
                            </p>
                            <div className="flex gap-4 justify-center pt-4">
                                <button className="btn-primary">
                                    {formData.ctaPrimary}
                                </button>
                                <button className="px-8 py-4 rounded-full font-semibold text-white glass">
                                    {formData.ctaSecondary}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
