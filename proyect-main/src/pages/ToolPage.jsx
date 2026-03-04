import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tools } from '../data';
import { useSEO } from '../hooks/useSEO';
import { ArrowLeft, ExternalLink, Zap, Star, Share2, Twitter, Copy, Check, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';

export default function ToolPage() {
    const { id } = useParams();
    const tool = tools.find(t => t.id === id);

    // Generar JSON-LD para SEO (Schema.org SoftwareApplication)
    const schemaData = tool ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.description,
        "applicationCategory": tool.sector,
        "operatingSystem": "Web",
        "url": tool.url,
        "offers": {
            "@type": "Offer",
            "price": tool.isFullyFree ? "0" : "0",
            "priceCurrency": "USD",
            "description": tool.freeTierDetails,
            "url": tool.url
        }
    } : null;

    useSEO({
        title: tool ? `${tool.name} - Try this AI | AI Directory` : 'Tool Not Found',
        description: tool ? tool.description : 'This Artificial Intelligence tool does not exist or has been removed from the directory.',
        schema: schemaData
    });

    const [isCopied, setIsCopied] = useState(false);

    // Get related tools (same sector, exclude current, limit 3)
    const relatedTools = tool ? tools
        .filter(t => t.sector === tool.sector && t.id !== tool.id)
        .slice(0, 3) : [];

    // Rating State
    const [ratingData, setRatingData] = useState(() => {
        const saved = localStorage.getItem(`ai_rating_${id}`);
        if (saved) return JSON.parse(saved);

        // Start ratings at 0.0 with 0 votes
        return {
            average: "0.0",
            count: 0,
            userRating: 0
        };
    });
    const [hoveredStar, setHoveredStar] = useState(0);

    useEffect(() => {
        if (id) {
            localStorage.setItem(`ai_rating_${id}`, JSON.stringify(ratingData));
        }
    }, [ratingData, id]);

    const handleRate = (stars) => {
        setRatingData(prev => {
            // Si hace click en la misma estrella, quita el voto (resta 1)
            if (prev.userRating === stars) {
                const prevSum = parseFloat(prev.average) * prev.count;
                const newCount = prev.count - 1;
                const newAverage = newCount === 0 ? "0.0" : ((prevSum - stars) / newCount).toFixed(1);
                return { average: newAverage, count: newCount, userRating: 0 };
            }

            // Si vota por primera vez, o cambia su voto
            const prevTotal = parseFloat(prev.average) * prev.count;
            const newCount = prev.userRating === 0 ? prev.count + 1 : prev.count;
            const adjustedTotal = prev.userRating === 0 ? prevTotal : prevTotal - prev.userRating;
            const newAverage = ((adjustedTotal + stars) / newCount).toFixed(1);

            return {
                average: newAverage,
                count: newCount,
                userRating: stars
            };
        });
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(tool.url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const shareOnTwitter = () => {
        const text = `I just discovered ${tool.name} on AI Global Directory! It helps with: ${tool.sector}. Check it out 👇`;
        const url = window.location.href;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    if (!tool) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-3xl font-bold mb-4">Tool not found</h1>
                <p className="text-slate-600 mb-8">This page does not exist or the AI has been removed from the directory.</p>
                <Link to="/" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-accent-600 transition-colors">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] bg-slate-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap px-1">
                    <Link to="/" className="hover:text-accent-600 transition-colors flex items-center gap-1">Home</Link>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <button onClick={() => { /* Esto requeriría pasar estado o usar URL params en Home */ window.location.href = "/?category=" + tool.sector; }} className="hover:text-accent-600 transition-colors">{tool.sector}</button>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-slate-600 font-bold truncate">{tool.name}</span>
                </nav>

                <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-accent-600 transition-colors bg-white border border-slate-200 hover:border-accent-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Directory
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-slate-200"
                >
                    <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start mb-6 md:mb-10">
                        <div className="w-20 h-20 md:w-32 md:h-32 rounded-3xl border border-slate-100 shadow-sm overflow-hidden bg-slate-50 flex items-center justify-center flex-shrink-0 text-5xl md:text-7xl">
                            {tool.emoji || '🤖'}
                        </div>

                        <div className="flex-grow w-full">
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4">{tool.name}</h1>

                            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
                                <span className="flex text-xs md:text-sm font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-slate-100 text-slate-600">
                                    {tool.sector}
                                </span>
                                <span className={`flex items-center gap-1.5 text-xs md:text-sm font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full ${tool.isFullyFree ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                    <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" /> {tool.freeTierDetails}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1.5 md:gap-2 mb-4 md:mb-6">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => {
                                        const isFilled = ratingData.userRating
                                            ? star <= ratingData.userRating
                                            : star <= (hoveredStar || Math.round(ratingData.average));

                                        return (
                                            <Star
                                                key={star}
                                                className={`w-6 h-6 md:w-7 md:h-7 cursor-pointer transition-all hover:scale-110 active:scale-95 ${isFilled
                                                    ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                                                    : 'fill-slate-100 text-slate-200 hover:text-amber-200'
                                                    }`}
                                                onMouseEnter={() => setHoveredStar(star)}
                                                onMouseLeave={() => setHoveredStar(0)}
                                                onClick={() => handleRate(star)}
                                            />
                                        );
                                    })}
                                    <span className="text-slate-800 font-bold text-base md:text-lg ml-1 md:ml-2">{ratingData.average}</span>
                                </div>
                                <span className="text-slate-500 text-xs md:text-sm font-medium">
                                    {ratingData.userRating > 0
                                        ? `You voted ${ratingData.userRating} stars. (Click to remove)`
                                        : `Based on ${ratingData.count} reviews. Rate it too!`
                                    }
                                </span>
                            </div>
                        </div>

                        <div className="w-full md:w-auto mt-4 md:mt-0 pb-4 md:pb-0">
                            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-accent-600 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl transition-all shadow-lg hover:shadow-accent-500/25 active:scale-95 text-base md:text-lg">
                                Visit Website <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div className="prose prose-base md:prose-lg max-w-none mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2 md:pb-3 mb-4 md:mb-6">What is {tool.name} and why use it?</h2>
                        <p className="text-slate-700 font-medium text-lg md:text-xl leading-relaxed mb-4 md:mb-6">
                            {tool.description}
                        </p>
                        <div className="my-8">
                            <AdSensePlaceholder type="horizontal" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3 md:mb-4">Use Cases and Details</h3>
                        <div className="bg-slate-50 p-5 md:p-8 rounded-2xl border border-slate-100 text-slate-600 leading-relaxed space-y-4">
                            <p>{tool.longDescription}</p>
                            <p className="text-sm text-slate-500 italic mt-4 pt-4 border-t border-slate-200">Note: Integrating these types of tools into your daily workflow can save from 2 to 5 hours per week, depending on the level of automation you apply. We suggest you always review the terms of the free plan of {tool.name} before implementing it at a corporate level.</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-slate-100">
                        <span className="text-slate-500 font-semibold flex flex-row items-center gap-2"><Share2 className="w-5 h-5" /> Share tool:</span>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button onClick={handleCopyLink} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold transition-all hover:border-slate-300">
                                {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                {isCopied ? 'Link copied!' : 'Copy link'}
                            </button>
                            <button onClick={shareOnTwitter} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] font-bold transition-all">
                                <Twitter className="w-4 h-4 fill-current" />
                                Post on X
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Related Tools Section */}
                {relatedTools.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16"
                    >
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-accent-500" /> Alternatives to {tool.name}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedTools.map(relatedTool => (
                                <Link to={`/tool/${relatedTool.id}`} key={relatedTool.id} className="block group">
                                    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-accent-300 shadow-sm hover:shadow-xl hover:shadow-accent-500/10 transition-all h-full flex flex-col pt-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 text-2xl group-hover:scale-105 transition-transform">
                                                {relatedTool.emoji || '🤖'}
                                            </div>
                                            <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${relatedTool.isFullyFree ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                                {relatedTool.freeTierDetails}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 group-hover:text-accent-600 mb-2 leading-tight">{relatedTool.name}</h4>
                                        <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed mb-4 flex-grow">{relatedTool.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
