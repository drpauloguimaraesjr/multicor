'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/admin/AuthProvider';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            router.push('/admin');
        } catch (err: any) {
            setError('Email ou senha incorretos. Tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="glass-dark p-8 rounded-3xl">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-display font-bold gradient-text mb-2">
                            Admin Login
                        </h1>
                        <p className="text-slate-400">
                            Acesse o painel administrativo
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-slate-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white"
                                placeholder="admin@multicor.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold mb-2 text-slate-300">
                                Senha
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/" className="text-sm text-slate-400 hover:text-primary-400 smooth-transition">
                            ← Voltar ao site
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
