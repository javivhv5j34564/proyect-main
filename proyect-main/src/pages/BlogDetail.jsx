import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Bookmark, Share2, Sparkles, ChevronRight } from 'lucide-react';
import { blogPosts } from '../data';
import { useSEO } from '../hooks/useSEO';
import { useEffect } from 'react';

export default function BlogDetail() {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === id);

    useSEO({
        title: post ? `${post.title} | AI Directory Blog` : 'Post Not Found',
        description: post ? post.excerpt : 'The requested blog post was not found.',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Post not found</h2>
                    <Link to="/" className="text-accent-600 font-bold hover:underline">Return to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-8 pb-20">
            <div className="max-w-4xl mx-auto px-4 md:px-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap px-1">
                    <Link to="/" className="hover:text-accent-600 transition-colors flex items-center gap-1">Home</Link>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-slate-600 font-bold">Blog</span>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-slate-400 truncate max-w-[200px]">{post.title}</span>
                </nav>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-accent-600 transition-all bg-white border border-slate-200 hover:border-accent-200 px-5 py-2.5 rounded-2xl shadow-sm hover:shadow-md mb-10 active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Directory
                </Link>

                <article className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
                    {/* Header Image */}
                    <div className="relative h-[300px] md:h-[450px] w-full">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500 text-white text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-accent-500/30">
                                {post.category}
                            </span>
                            <h1 className="text-2xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
                                {post.title}
                            </h1>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-6 mb-10 pb-8 border-b border-slate-100 text-sm font-bold text-slate-500">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                </div>
                                <span>{post.readTime} read</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                </div>
                                <span>March 2026</span>
                            </div>
                            <div className="ml-auto flex items-center gap-3">
                                <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-accent-600 hover:bg-accent-50 transition-all">
                                    <Bookmark className="w-5 h-5" />
                                </button>
                                <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-accent-600 hover:bg-accent-50 transition-all">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="prose prose-slate prose-lg md:prose-xl max-w-none">
                            <p className="text-xl md:text-2xl font-medium text-slate-700 leading-relaxed italic border-l-4 border-accent-400 pl-6 mb-10">
                                {post.excerpt}
                            </p>

                            <div className="text-slate-600 leading-relaxed space-y-6">
                                {post.content.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>

                            <div className="mt-16 p-8 md:p-10 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                    <Sparkles className="w-32 h-32" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black mb-4">Start using AI tools today</h3>
                                    <p className="text-slate-400 mb-8 max-w-lg leading-relaxed">
                                        Explore our curated list with more than 100 free and freemium Artificial Intelligence tools for professional use.
                                    </p>
                                    <Link
                                        to="/"
                                        className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-xl shadow-accent-500/20 active:scale-95"
                                    >
                                        Go to Directory
                                        <ArrowLeft className="w-5 h-5 rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
