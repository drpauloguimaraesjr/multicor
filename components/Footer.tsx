export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-800">
            <div className="container-custom py-12">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-3xl font-display font-bold gradient-text mb-4">
                            Multicor
                        </h3>
                        <p className="text-slate-400 mb-4">
                            Comunicação Visual de Excelência
                        </p>
                        <p className="text-slate-500 text-sm">
                            Transformando ideias em realidade visual desde 1983
                        </p>
                        <p className="text-slate-500 text-xs mt-2">
                            Multicor Letreiros e Placas LTDA<br />
                            CNPJ: 00.272.534/0001-77
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Links Rápidos</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#about" className="text-slate-400 hover:text-primary-400 smooth-transition">
                                    Sobre Nós
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="text-slate-400 hover:text-primary-400 smooth-transition">
                                    Serviços
                                </a>
                            </li>
                            <li>
                                <a href="#portfolio" className="text-slate-400 hover:text-primary-400 smooth-transition">
                                    Portfólio
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-slate-400 hover:text-primary-400 smooth-transition">
                                    Contato
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Redes Sociais</h4>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 glass-dark rounded-full flex items-center justify-center hover:bg-primary-500/20 smooth-transition"
                                aria-label="Facebook"
                            >
                                📘
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 glass-dark rounded-full flex items-center justify-center hover:bg-primary-500/20 smooth-transition"
                                aria-label="Instagram"
                            >
                                📷
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 glass-dark rounded-full flex items-center justify-center hover:bg-primary-500/20 smooth-transition"
                                aria-label="WhatsApp"
                            >
                                💬
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-800 pt-8 text-center">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Multicor. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
