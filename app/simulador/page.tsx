'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Truck, Car, Bus, Send } from 'lucide-react';
import Image from 'next/image';

const vehicleTypes = [
    { id: 'car', name: 'Carro de Passeio', icon: Car },
    { id: 'van', name: 'Van / Fiorino', icon: Bus },
    { id: 'truck', name: 'Caminhão Baú', icon: Truck },
];

export default function SimulatorPage() {
    const [selectedVehicle, setSelectedVehicle] = useState('car');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const message = `Olá! Gostaria de um orçamento para adesivar meu veiculo (%2A${selectedVehicle}%2A).%0A%0A*Nome:* ${formData.name}%0A*Descrição:* ${formData.description}`;
        window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
    };

    return (
        <main className="min-h-screen pt-32 pb-20 bg-background text-white">
            <div className="container-custom grid md:grid-cols-2 gap-16 items-start">

                {/* Left: Vehicle Selection */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Personalize sua Frota</h1>
                    <p className="text-secondary text-lg mb-12">
                        Escolha o tipo de veículo e nos conte sua ideia. Nossa equipe de design cuidará do resto.
                    </p>

                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {vehicleTypes.map((vehicle) => {
                            const Icon = vehicle.icon;
                            return (
                                <button
                                    key={vehicle.id}
                                    onClick={() => setSelectedVehicle(vehicle.id)}
                                    className={`flex items-center gap-4 p-6 rounded-xl border transition-all ${selectedVehicle === vehicle.id
                                            ? 'bg-white text-black border-white'
                                            : 'bg-surface border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    <Icon size={32} />
                                    <span className="text-xl font-medium">{vehicle.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Visual Preview (Placeholder for 3D model or image in future) */}
                    <div className="aspect-video bg-surface rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                        <p className="text-secondary text-sm">Visualização do veículo selecionado</p>
                        {/* Aqui entrará a imagem do veículo base para o cliente ver */}
                    </div>
                </div>

                {/* Right: Lead Form */}
                <div className="bg-surface border border-white/10 p-8 rounded-2xl sticky top-32">
                    <h2 className="text-2xl font-medium mb-6">Solicitar Orçamento</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm text-secondary mb-2">Seu Nome / Empresa</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-background border border-white/20 rounded-lg p-3 focus:border-white transition-colors"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-secondary mb-2">WhatsApp</label>
                            <input
                                type="tel"
                                required
                                className="w-full bg-background border border-white/20 rounded-lg p-3 focus:border-white transition-colors"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-secondary mb-2">Como você imagina o design?</label>
                            <textarea
                                rows={4}
                                className="w-full bg-background border border-white/20 rounded-lg p-3 focus:border-white transition-colors"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Ex: Quero logo na porta e faixas laterais..."
                            />
                        </div>

                        <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                            <Send size={18} />
                            Enviar via WhatsApp
                        </button>

                        <p className="text-xs text-center text-secondary mt-4">
                            Nossa equipe responderá com uma prévia e orçamento.
                        </p>
                    </form>
                </div>

            </div>
        </main>
    );
}
