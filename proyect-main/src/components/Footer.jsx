import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer id="footer-contacto" className="bg-slate-900 text-slate-300 py-8 md:py-12 mt-12 md:mt-20 border-t border-slate-800 relative overflow-hidden scroll-mt-24">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold text-white mb-3 md:mb-4 tracking-tight">AI Directory</h3>
                        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                            Your trusted portal to discover the best free and freemium Artificial Intelligence tools. We analyze and catalog the most powerful software to boost your productivity.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/privacy" className="hover:text-accent-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/cookies" className="hover:text-accent-400 transition-colors">Cookies Policy</Link></li>
                            <li><Link to="/legal-notice" className="hover:text-accent-400 transition-colors">Legal Notice</Link></li>

                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Community</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/contact" className="hover:text-accent-400 transition-colors">Contact</Link></li>
                            <li><Link to="/submit-tool" className="hover:text-accent-400 transition-colors font-bold text-accent-500 hover:text-accent-400">➕ Suggest a Tool</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} AI Directory. All rights reserved.</p>
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                        <p>Made with ❤️ for the AI Community</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
