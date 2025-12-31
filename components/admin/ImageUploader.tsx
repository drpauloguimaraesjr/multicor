'use client';

import { useState, useRef } from 'react';
import { storage, db } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ImageUploaderProps {
    onUploadComplete?: () => void;
}

export default function ImageUploader({ onUploadComplete }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: '',
        category: 'banners',
        description: '',
    });

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setMessage('Por favor, selecione apenas arquivos de imagem.');
            return;
        }

        if (!formData.title) {
            setMessage('Por favor, preencha o título antes de fazer upload.');
            return;
        }

        setUploading(true);
        setProgress(0);
        setMessage('');

        try {
            // Upload to Firebase Storage
            const timestamp = Date.now();
            const storageRef = ref(storage, `portfolio/${timestamp}_${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.error('Upload error:', error);
                    setMessage('Erro no upload. Tente novamente.');
                    setUploading(false);
                },
                async () => {
                    // Get download URL
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    // Save metadata to Firestore
                    await addDoc(collection(db, 'portfolio'), {
                        title: formData.title,
                        category: formData.category,
                        description: formData.description,
                        imageUrl: downloadURL,
                        createdAt: serverTimestamp(),
                    });

                    setMessage('Upload concluído com sucesso!');
                    setUploading(false);
                    setProgress(0);
                    setFormData({ title: '', category: 'banners', description: '' });

                    if (onUploadComplete) {
                        onUploadComplete();
                    }

                    setTimeout(() => setMessage(''), 3000);
                }
            );
        } catch (error) {
            console.error('Error:', error);
            setMessage('Erro ao fazer upload. Tente novamente.');
            setUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-semibold mb-2 text-slate-300">
                        Título *
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white"
                        placeholder="Nome do projeto"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-semibold mb-2 text-slate-300">
                        Categoria *
                    </label>
                    <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white"
                    >
                        <option value="banners">Banners</option>
                        <option value="placas">Placas</option>
                        <option value="adesivos">Adesivos</option>
                        <option value="fachadas">Fachadas</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-semibold mb-2 text-slate-300">
                    Descrição
                </label>
                <input
                    type="text"
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-500 smooth-transition text-white"
                    placeholder="Descrição do projeto (opcional)"
                />
            </div>

            {/* Drag and Drop Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-3xl p-12 text-center smooth-transition ${dragActive
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-slate-700 bg-slate-800/30'
                    }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                />

                <div className="text-6xl mb-4">📸</div>

                {uploading ? (
                    <div>
                        <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
                            <div
                                className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full smooth-transition"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-slate-300">Fazendo upload... {Math.round(progress)}%</p>
                    </div>
                ) : (
                    <>
                        <p className="text-lg text-slate-300 mb-2">
                            Arraste e solte uma imagem aqui
                        </p>
                        <p className="text-sm text-slate-500 mb-4">ou</p>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="btn-primary"
                        >
                            Selecionar Arquivo
                        </button>
                    </>
                )}
            </div>

            {message && (
                <div className={`p-4 rounded-xl text-center ${message.includes('sucesso')
                        ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                        : 'bg-red-500/20 border border-red-500/50 text-red-300'
                    }`}>
                    {message}
                </div>
            )}
        </div>
    );
}
