import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, ShieldCheck, Zap, ChevronRight, Users, Award, Globe } from 'lucide-react';

const BackButton = () => (
    <div className="mb-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap px-1">
            <Link to="/" className="hover:text-accent-600 transition-colors flex items-center gap-1">Home</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-slate-600 font-bold">About Us</span>
        </nav>
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-accent-600 transition-colors bg-white border border-slate-200 hover:border-accent-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md">
            <ArrowLeft className="w-4 h-4" />
            Back to home
        </Link>
    </div>
);

const About = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16">
            <BackButton />

            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">About AI Directory</h1>
                <p className="text-xl text-slate-600 leading-relaxed">Your bridge to the best Artificial Intelligence tools.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <Target className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-900">Our Mission</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">Democratize access to AI, helping professionals and businesses find the perfect tool for their needs.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-900">Expert Curation</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">Each tool in our directory is reviewed to ensure it provides real value and meets quality standards.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-900">Always Updated</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">The AI world moves fast. So do we. We update our database weekly.</p>
                </div>
            </div>

            <article className="prose prose-slate prose-lg max-w-none">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Why AI Directory?</h2>
                <p>
                    AI Directory was born from the need to organize the chaotic but exciting landscape of Artificial Intelligence. With hundreds of new applications launching every month, users feel overwhelmed by the number of options and the difficulty of finding tools that are truly useful and accessible.
                </p>
                <p>
                    Our platform is not just a static list; it is a <strong>dynamic discovery tool</strong> designed to save you time and help you navigate today's technological revolution with judgment and efficiency.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 not-prose">
                    <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                        <Users className="w-6 h-6 text-primary-600 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">Community First</h4>
                            <p className="text-slate-500 text-sm">We actively listen to our users' suggestions to list the tools they actually demand.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                        <Award className="w-6 h-6 text-accent-600 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">Certified Quality</h4>
                            <p className="text-slate-500 text-sm">We don't just list for the sake of listing. Each AI is tested to ensure its "Free Tier" is functional.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                        <Globe className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">Global Reach</h4>
                            <p className="text-slate-500 text-sm">We look for solutions in all languages and markets, adapting them with clear explanations.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                        <Target className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">Focus on Productivity</h4>
                            <p className="text-slate-500 text-sm">We prioritize tools that automate tedious tasks and free up creative time.</p>
                        </div>
                    </div>
                </div>

                <h2>Who are we?</h2>
                <p>
                    We are a team of technology enthusiasts and digital productivity experts. We firmly believe that Artificial Intelligence is the ultimate co-pilot for the modern human, and our goal is to be the compass that guides you to success in this synthetic era.
                </p>
            </article>

            <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Want to collaborate with us?</h2>
                <p className="text-slate-300 mb-8 max-w-lg mx-auto">If you have an AI tool or want to suggest an improvement, we'd love to hear from you.</p>
                <Link to="/contact" className="inline-block bg-white text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors">
                    Contact now
                </Link>
            </div>
        </div>
    );
};

export default About;
