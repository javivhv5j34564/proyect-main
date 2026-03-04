import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 text-center"
            >
                <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center relative">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 bg-green-500/20 rounded-full"
                        />
                    </div>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-black text-slate-900 mb-4"
                >
                    Message Sent!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-slate-600 mb-10"
                >
                    Thank you for your feedback. We'll get back to you soon.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl hover:bg-accent-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </Link>
                </motion.div>

                <div className="pt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Sparkles className="w-3 h-3 text-accent-500" />
                    AI Global Directory
                </div>
            </motion.div>
        </div>
    );
}
