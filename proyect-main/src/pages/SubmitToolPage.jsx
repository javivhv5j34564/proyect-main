import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export function SubmitToolPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        // Prevent default if you want custom visual handling first
        // Or let FormSubmit do its redirect. We will use a standard action form but 
        // with an iframe trick or standard redirect for simplicity.
        // For best UX without complex backend, we just let FormSubmit handle it and set _next.
    };

    return (
        <div className="min-h-[80vh] bg-slate-50 py-10 md:py-16 px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 md:mb-4">➕ Add an Artificial Intelligence</h1>
                    <p className="text-base md:text-lg text-slate-600">
                        Do you know or have you developed an AI tool that should be in our directory 🚀?
                        Send it to us and we will review it for inclusion 📩.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200"
                >
                    <form action="https://formsubmit.co/f.javiergg06@gmail.com" method="POST" className="space-y-4 md:space-y-6">
                        <input type="hidden" name="_next" value={window.location.origin + "/success"} />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_subject" value="New AI Tool Suggestion for Directory" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">🤖 Tool Name *</label>
                                <input required type="text" name="tool_name" placeholder="Ex: Midjourney" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">🌐 Website URL *</label>
                                <input required type="url" name="tool_url" placeholder="https://..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">📂 Main Category *</label>
                            <select required name="tool_category" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all font-medium">
                                <option value="" disabled selected>Select a category</option>
                                <option value="Writing & Productivity">Writing & Productivity</option>
                                <option value="Image & Design">Image & Design</option>
                                <option value="Video & Animation">Video & Animation</option>
                                <option value="Programming">Programming</option>
                                <option value="Audio & Music">Audio & Music</option>
                                <option value="Schedules">Organization & Schedules</option>
                                <option value="Chatbots">Chatbots & Assistants</option>
                                <option value="Others">Other category</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">💰 Tool Pricing *</label>
                            <select required name="tool_pricing" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all font-medium">
                                <option value="" disabled selected>Does it have a free plan?</option>
                                <option value="100% Free">100% Free / Open Source</option>
                                <option value="Freemium">Freemium (Has free features)</option>
                                <option value="Paid">Paid Only (Limited free trial)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">📝 Brief Description *</label>
                            <textarea required name="tool_description" rows="3" placeholder="What problem does it solve and why is it great?" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all resize-none font-medium"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">📧 Your Email (optional)</label>
                            <input type="email" name="submitter_email" placeholder="In case we need to contact you" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all" />
                        </div>

                        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-accent-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all shadow-lg hover:shadow-accent-500/25 active:scale-[0.98] text-base md:text-lg mt-4">
                            Send Suggestion 🚀 <Send className="w-5 h-5" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
