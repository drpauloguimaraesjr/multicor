'use client';

import { useAuth } from '@/components/admin/AuthProvider';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/admin/login');
    };

    const menuItems = [
        { title: 'Hero Section', href: '/admin/hero', icon: '🎯', description: 'Editar título e texto principal' },
        { title: 'Serviços', href: '/admin/services', icon: '⚙️', description: 'Gerenciar serviços oferecidos' },
        { title: 'Portfólio', href: '/admin/portfolio', icon: '📸', description: 'Upload e gerenciar imagens' },
        { title: 'Sobre', href: '/admin/about', icon: '📝', description: 'Editar informações da empresa' },
        { title: 'Contato', href: '/admin/contact', icon: '📧', description: 'Informações de contato' },
    ];

    return (
        <ProtectedRoute>
            <div className="min-h-screen p-4 md:p-8">
                <div className="container-custom max-w-6xl">
                    {/* Header */}
                    <div className="glass-dark p-6 rounded-3xl mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                                    Painel Administrativo
                                </h1>
                                <p className="text-slate-400">
                                    Bem-vindo, {user?.email}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <a
                                    href="/"
                                    target="_blank"
                                    className="px-6 py-3 glass rounded-xl hover:bg-white/10 smooth-transition text-sm"
                                >
                                    Ver Site
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-xl hover:bg-red-500/30 smooth-transition text-sm"
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Menu Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="glass-dark p-8 rounded-3xl card-hover group block"
                            >
                                <div className="text-5xl mb-4 transform group-hover:scale-110 smooth-transition">
                                    {item.icon}
                                </div>
                                <h2 className="text-2xl font-display font-bold mb-2 gradient-text">
                                    {item.title}
                                </h2>
                                <p className="text-slate-400 text-sm">
                                    {item.description}
                                </p>
                            </a>
                        ))}
                    </div>

                    {/* Quick Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <div className="glass-dark p-6 rounded-2xl">
                            <h3 className="text-sm text-slate-400 mb-2">Total de Imagens</h3>
                            <p className="text-3xl font-bold gradient-text">0</p>
                        </div>
                        <div className="glass-dark p-6 rounded-2xl">
                            <h3 className="text-sm text-slate-400 mb-2">Última Atualização</h3>
                            <p className="text-lg text-slate-300">Hoje</p>
                        </div>
                        <div className="glass-dark p-6 rounded-2xl">
                            <h3 className="text-sm text-slate-400 mb-2">Status</h3>
                            <p className="text-lg text-green-400">✓ Online</p>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
