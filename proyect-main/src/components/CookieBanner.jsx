import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('ai_cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('ai_cookie_consent', 'accepted');
        setIsVisible(false);
        // Aquí podrías cargar Google Analytics o AdSense si no los cargas por defecto
    };

    const handleDecline = () => {
        localStorage.setItem('ai_cookie_consent', 'declined');
        setIsVisible(false);
        // Aquí deshabilitarías el seguimiento de terceros
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
                >
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-full shadow-2xl border border-slate-200 p-4 md:p-3 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent-50 text-accent-600 flex items-center justify-center flex-shrink-0">
                                <Shield className="w-5 h-5" />
                            </div>
                            <p className="text-sm text-slate-600">
                                🍪 We use own and third-party analytical and advertising cookies (Google AdSense) to offer you a personalized experience. <Link to="/cookies" className="text-accent-600 hover:underline font-medium">Read Cookies Policy 📜</Link>.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto flex-shrink-0">
                            <button
                                onClick={handleDecline}
                                className="flex-1 md:flex-none px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl md:rounded-full transition-colors"
                            >
                                ❌ Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex-1 md:flex-none px-6 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl md:rounded-full shadow-md transition-colors whitespace-nowrap"
                            >
                                ✅ Accept All
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
