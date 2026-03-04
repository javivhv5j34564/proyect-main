import { useState, useMemo, useEffect } from 'react';
import { Search, Sparkles, X, ExternalLink, ChevronRight, Zap, Flame, Clock, ChevronDown, TrendingUp, Lightbulb, Brain, Bookmark, ChevronUp, BookOpen, ArrowRight, ArrowDown, ArrowUp, Menu, Search as SearchIcon, Sun, Moon, Palette, Video, Code, PenTool, Music, Settings, Utensils, Calendar, ShoppingBag, Star, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { tools, categories, blogPosts } from '../data';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';
import { useSEO } from '../hooks/useSEO';

const top3Ids = ['midjourney_ai', 'heygen_video', 'jasper_copy'];
const recentIds = ['runway_gen3', 'leonardo_ai', 'descript_audio'];

const aiFacts = [
  {
    id: 'fact-1',
    icon: <TrendingUp className="w-6 h-6 text-primary-500" />,
    title: "Boost Your Productivity",
    description: "Automate repetitive tasks and focus on what really matters.",
    fact: "Fact: 64% of professionals report an increase in daily efficiency when using AI."
  },
  {
    id: 'fact-2',
    icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
    title: "Unleash Your Creativity",
    description: "Overcome blank page syndrome with unlimited idea generation.",
    fact: "Fact: AI can reduce ideation process time by up to 40%."
  },
  {
    id: 'fact-3',
    icon: <Brain className="w-6 h-6 text-indigo-500" />,
    title: "Smart Decisions",
    description: "Access complex answers in a structured and simple way in seconds.",
    fact: "Fact: AI assistants improve retention and informed decision-making."
  }
];

const faqs = [
  {
    question: "What is AI Directory?",
    answer: "We are a curated platform that collects the best Artificial Intelligence tools on the market, classifying them by categories so you can find the ideal solution for your needs quickly and easily."
  },
  {
    question: "Are all the tools listed free?",
    answer: "We focus mainly on tools with free plans (Free) or with 'Freemium' models (offering limited free use). Each technical sheet specifies the license type so you don't waste time."
  },
  {
    question: "How can I suggest a new AI?",
    answer: "We love discovering new tools! You can use the 'Suggest a Tool' link in the footer or contact us directly through the contact form."
  },
  {
    question: "How often is the directory updated?",
    answer: "Our team analyzes the AI ecosystem almost daily. We add new tools and update information on existing ones weekly to ensure you always have the latest at your fingertips."
  }
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 md:py-5 flex items-center justify-between text-left group transition-all"
      >
        <span className="text-sm md:text-base font-bold text-slate-800 group-hover:text-accent-600 transition-colors pr-8">
          {question}
        </span>
        <ChevronDown className={`w-5 h-5 text-slate-400 group-hover:text-accent-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-500' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm md:text-base text-slate-500 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



const categoryIcons = {
  'All': <Sparkles className="w-4 h-4" />,
  'Chatbots & Assistants': <Brain className="w-4 h-4" />,
  'Image & Design': <Palette className="w-4 h-4" />,
  'Video & Animation': <Video className="w-4 h-4" />,
  'Programming': <Code className="w-4 h-4" />,
  'Writing & Productivity': <PenTool className="w-4 h-4" />,
  'Research & Data': <Search className="w-4 h-4" />,
  'Audio & Music': <Music className="w-4 h-4" />,
  'Automation': <Zap className="w-4 h-4" />,
  'Marketing & Sales': <TrendingUp className="w-4 h-4" />,
  'Utilities': <Settings className="w-4 h-4" />,
  'Cooking': <Utensils className="w-4 h-4" />,
  'Schedules': <Calendar className="w-4 h-4" />,
  'Fashion': <ShoppingBag className="w-4 h-4" />,
};

// Tool card extracted for reuse
const ToolCard = ({ tool, onClick, customBgClass = "bg-white", borderClass = "border-slate-200", isBookmarked, onBookmark, upvotes, hasUpvoted, onUpvote }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    onClick={() => onClick(tool)}
    className={`group ${customBgClass} rounded-2xl p-4 md:p-6 border ${borderClass} hover:border-accent-300 shadow-sm hover:shadow-xl hover:shadow-accent-500/10 transition-all cursor-pointer flex flex-col h-full relative overflow-hidden`}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-accent-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

    <button
      onClick={(e) => onBookmark(e, tool.id)}
      className="absolute top-4 right-4 md:top-5 md:right-5 z-20 p-1.5 md:p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur border border-slate-200 text-slate-400 hover:text-accent-500 transition-all opacity-100 shadow-sm"
      title="Save to favorites"
    >
      <Bookmark className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isBookmarked ? 'fill-accent-500 text-accent-500' : ''}`} />
    </button>

    <div className="flex justify-between items-start mb-3 md:mb-4 relative z-10">
      <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center bg-white border border-slate-100 overflow-hidden group-hover:scale-105 transition-transform shadow-sm text-2xl md:text-3xl">
        {tool.emoji || '🤖'}
      </div>
    </div>

    <div className="mb-2 relative z-10">
      <span className="inline-flex text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:px-2.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider mb-1 md:mb-2 border border-slate-200/50">
        {tool.sector}
      </span>
      <Link to={`/tool/${tool.id}`} onClick={(e) => e.stopPropagation()} className="block">
        <h3 className="text-lg md:text-xl font-bold group-hover:text-accent-600 transition-colors text-slate-900 leading-tight pr-8 hover:underline decoration-accent-500/50 underline-offset-4">{tool.name}</h3>
      </Link>
    </div>

    <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-4 md:mb-5 flex-grow line-clamp-3 relative z-10">
      {tool.description}
    </p>

    <div className="mt-auto pt-3 md:pt-4 border-t border-slate-200/50 flex items-center justify-between relative z-10">
      <button
        onClick={(e) => onUpvote(e, tool.id)}
        className={`flex items-center gap-1 md:gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border text-xs md:text-sm font-bold transition-all z-20 shadow-sm ${hasUpvoted ? 'bg-accent-500 border-accent-500 text-white hover:bg-accent-600' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
        title="Vote for this tool"
      >
        <ChevronUp className={`w-3 h-3 md:w-4 md:h-4 ${hasUpvoted ? 'text-white' : 'text-slate-400'}`} />
        {upvotes || 0}
      </button>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-1 md:gap-1.5 min-w-0">
          <Zap className={`w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 ${tool.isFullyFree ? 'text-green-500' : 'text-amber-500'}`} />
          <span className={`text-[10px] sm:text-xs font-semibold truncate ${tool.isFullyFree ? 'text-green-600' : 'text-amber-600'}`} style={{ maxWidth: '90px' }}>
            {tool.freeTierDetails}
          </span>
        </div>
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-accent-50 group-hover:text-accent-600 group-hover:border-accent-200 transition-colors shadow-sm flex-shrink-0">
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        </div>
      </div>
    </div>
  </motion.div>
);

export default function Home({ searchTerm, setSearchTerm }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [displayCount, setDisplayCount] = useState(15);
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setDisplayCount(15);
  }, [searchTerm, selectedCategory, selectedPricing, showFavorites]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setTimeout(() => {
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  useSEO({
    title: 'Artificial Intelligence (AI) Directory | Home',
    description: 'Explore our curated collection of hundreds of free and freemium Artificial Intelligence tools, organized by category to skyrocket your productivity.'
  });

  // Persistence State
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('ai_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [upvotes, setUpvotes] = useState(() => {
    const saved = localStorage.getItem('ai_upvotes');
    if (saved) return JSON.parse(saved);
    const initial = {};
    tools.forEach(t => { initial[t.id] = 0; });
    return initial;
  });

  const [userUpvoted, setUserUpvoted] = useState(() => {
    const saved = localStorage.getItem('ai_user_upvotes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem('ai_bookmarks', JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem('ai_upvotes', JSON.stringify(upvotes)); }, [upvotes]);
  useEffect(() => { localStorage.setItem('ai_user_upvotes', JSON.stringify(userUpvoted)); }, [userUpvoted]);

  const toggleBookmark = (e, id) => {
    e.stopPropagation();
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const handleUpvote = (e, id) => {
    e.stopPropagation();
    if (userUpvoted.includes(id)) {
      setUserUpvoted(prev => prev.filter(u => u !== id));
      setUpvotes(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 1) - 1) }));
    } else {
      setUserUpvoted(prev => [...prev, id]);
      setUpvotes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsLoadingSub(true);
    setTimeout(() => {
      setIsLoadingSub(false);
      setIsSubscribed(true);
    }, 1000);
  };

  // Filter & Sort Logic
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const searchStr = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const nName = tool.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const nDesc = tool.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const nLong = (tool.longDescription || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const nSector = tool.sector.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const matchesSearch = searchStr === '' ||
        nName.includes(searchStr) ||
        nDesc.includes(searchStr) ||
        nLong.includes(searchStr) ||
        nSector.includes(searchStr);

      const matchesCategory = selectedCategory === 'All' || tool.sector === selectedCategory;
      const matchesFavorites = showFavorites ? bookmarks.includes(tool.id) : true;

      let matchesPricing = true;
      if (selectedPricing === 'Gratis') {
        matchesPricing = tool.isFullyFree === true;
      } else if (selectedPricing === 'Freemium') {
        matchesPricing = tool.isFullyFree === false;
      }

      return matchesSearch && matchesCategory && matchesFavorites && matchesPricing;
    }).sort((a, b) => {
      // Primary: Free first
      if (a.isFullyFree && !b.isFullyFree) return -1;
      if (!a.isFullyFree && b.isFullyFree) return 1;
      // Secondary: Upvotes
      return (upvotes[b.id] || 0) - (upvotes[a.id] || 0);
    });
  }, [searchTerm, selectedCategory, selectedPricing, showFavorites, bookmarks, upvotes]);

  const showSections = searchTerm === '' && selectedCategory === 'All' && selectedPricing === 'All' && !showFavorites;

  // Sorting explicit sections by upvotes too
  // Sorting explicit sections: Top3 and Recent keep their fixed id order/upvotes, 
  // but OtherTools (the main directory) will respect the "Free First" rule.
  const top3Tools = tools.filter(t => top3Ids.includes(t.id)).sort((a, b) => (upvotes[b.id] || 0) - (upvotes[a.id] || 0));
  const recentTools = tools.filter(t => recentIds.includes(t.id)).sort((a, b) => (upvotes[b.id] || 0) - (upvotes[a.id] || 0));
  const otherTools = tools.filter(t => !top3Ids.includes(t.id) && !recentIds.includes(t.id)).sort((a, b) => {
    if (a.isFullyFree && !b.isFullyFree) return -1;
    if (!a.isFullyFree && b.isFullyFree) return 1;
    return (upvotes[b.id] || 0) - (upvotes[a.id] || 0);
  });

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedTool || selectedBlogPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedTool, selectedBlogPost]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}


      {/* Hero Section */}
      <section className="relative flex flex-col justify-center text-center w-full pt-16 pb-12 px-4 sm:pt-24 sm:pb-20 sm:px-8 min-h-[45vh] md:min-h-[55vh] overflow-hidden mb-4 md:mb-8 group">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-1000 mix-blend-multiply"
          >
            <source src="https://cdn.pixabay.com/video/2021/08/25/86270-593005898_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/95 to-slate-50 z-10"></div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-20">
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent-50/80 backdrop-blur-md border border-accent-200/50 text-accent-700 text-xs md:text-sm font-black mb-6 md:mb-8 shadow-sm tracking-wide uppercase">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span>AI Tools Directory • 100% Updated</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight md:tracking-tighter leading-[1.05]">
            Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-accent-500 to-indigo-600">AI Tool</span> <br className="hidden sm:block" /> You Need Today
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-slate-600 font-medium mb-6 md:mb-4 leading-relaxed md:leading-relaxed max-w-3xl mx-auto px-2">
            The largest curated AI directory. Filter through hundreds of <span className="text-accent-600 font-bold">free</span> tools to boost your productivity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-2 mb-4 relative z-20">
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mr-1 opacity-70">Sugerencias:</span>
            {['Logos', 'Chatbots', 'Imágenes', 'Código', 'Vídeo', 'Artículos'].map((q) => (
              <button
                key={q}
                onClick={() => setSearchTerm(q)}
                className="text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:border-accent-400 hover:text-accent-600 transition-all shadow-sm active:scale-95 text-slate-500"
              >
                {q}
              </button>
            ))}
          </div>


          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 mb-4 md:mt-8">
            <button
              onClick={() => scrollToSection('directory-section')}
              className="w-full sm:w-auto bg-gradient-to-r from-primary-500 via-accent-500 to-indigo-600 hover:from-primary-600 hover:via-accent-600 hover:to-indigo-700 text-white font-black py-4 px-8 md:py-5 md:px-10 rounded-full transition-all shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 hover:scale-105 active:scale-95 text-base md:text-lg flex items-center justify-center gap-2 border-[3px] border-white/20"
            >
              🪄 Explore AI Now <ArrowDown className="w-5 h-5 md:w-6 md:h-6 hover:animate-bounce" />
            </button>
            <button
              onClick={() => scrollToSection('blog-section')}
              className="w-full sm:w-auto bg-white/80 backdrop-blur border border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3.5 px-6 md:py-4 md:px-8 rounded-full transition-all shadow-sm hover:shadow-md hover:bg-slate-50 hover:text-accent-600 active:scale-95 text-sm md:text-base flex items-center justify-center gap-2"
            >
              Articles & Guides <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Quick Value Prop / How it Works */}
      <section className="bg-white border-y border-slate-100 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-black text-xl flex-shrink-0">1</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Explore Categories</h3>
                <p className="text-sm text-slate-500">Navigate through programming, design, video, and more.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 border-y md:border-y-0 md:border-x border-slate-100 py-6 md:py-0 md:px-8">
              <div className="w-12 h-12 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center font-black text-xl flex-shrink-0">2</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Find Free Tools</h3>
                <p className="text-sm text-slate-500">We prioritize free options so you don't spend a dime testing.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xl flex-shrink-0">3</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Boost Your Workflow</h3>
                <p className="text-sm text-slate-500">Save hours of repetitive tasks using the right AI for each case.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-2 md:py-6">

        {/* AI Facts & Advantages Section */}
        <section className="mb-12 mt-10 md:mb-16 md:mt-12">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight mb-2 md:mb-3">
              Why use Artificial Intelligence today?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">Key advantages and surprising facts that will transform how you work</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {aiFacts.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-accent-500/10 transition-all group relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-slate-100 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10">
                  {item.icon}
                </div>

                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-accent-600 transition-colors relative z-10">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed flex-grow relative z-10">
                  {item.description}
                </p>

                <div className="pt-4 md:pt-5 border-t border-slate-100 relative z-10 mt-auto">
                  <div className="flex items-start gap-2.5">
                    <div className="bg-accent-50 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-slate-700 leading-relaxed italic">
                      {item.fact}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Decorative Abstract Image 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full h-32 md:h-48 rounded-3xl overflow-hidden my-12 relative shadow-sm group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 via-accent-900/40 to-indigo-900/60 z-10 mix-blend-multiply border border-white/10 rounded-3xl transition-opacity group-hover:opacity-80"></div>
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
            alt="AI Brain technology"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <p className="text-white/90 font-medium tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">El futuro está aquí</p>
          </div>
        </motion.div>

        {/* Endless Marquee Carousel / Carrusel de IAs */}
        <section className="relative overflow-hidden mb-12 py-4">
          {/* Faders for smooth edges */}
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

          <div className="flex animate-marquee whitespace-nowrap gap-3 md:gap-4 w-max hover:[animation-play-state:paused] group">
            {[...tools, ...tools].map((tool, index) => (
              <div
                key={`${tool.id}-${index}`}
                onClick={() => setSelectedTool(tool)}
                className="flex items-center gap-2 md:gap-3 bg-white px-3 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl border border-slate-200/60 shadow-sm cursor-pointer hover:border-accent-300 hover:shadow-md transition-all flex-shrink-0"
              >
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center flex-shrink-0 text-base md:text-xl">
                  {tool.emoji || '🤖'}
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-700">{tool.name}</span>
                <span className="text-[9px] md:text-[10px] font-semibold px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wider">{tool.sector}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Text Section for AdSense (Combats Thin Content) */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200/60 mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4">What's the AI Directory and how does it help you?</h2>
            <div className="prose prose-slate md:prose-lg max-w-none text-slate-600 space-y-4">
              <p>
                At <strong>AI Directory</strong>, our goal is to collect, analyze, and classify the best Artificial Intelligence tools available today. We know that the technical ecosystem changes daily, and finding the perfect free or freemium IA for your business, studies, or creative workflow can be an exhausting task. That's why we do the heavy lifting for you.
              </p>
              <p>
                Each tool listed in our directory passes through a quality filter where we evaluate its real usefulness, whether it has a <em>valid free plan</em>, and what kind of problems it solves. From <strong>text generators (LLMs)</strong> that help you write emails in seconds, to advanced <strong>image or video generators</strong> that can create the visual prototype of your next big idea without needing to know how to code.
              </p>
              <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">How to leverage our categories</h3>
              <p>
                Use the filters below to browse our inventory. If you're a content creator, the <strong>Visual Design</strong> or <strong>Video</strong> section will be your best ally. If you're looking to optimize your business management, explore <strong>Business & Productivity</strong> to find AI-powered CRMs and automated agents. Our directory is kept up-to-date so you never fall behind in this technological revolution.
              </p>
            </div>
          </div>
        </section>

        {/* Categories / Filters */}
        <section id="directory-section" className="mt-12 md:mt-20 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
            <div className="text-left">
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">AI Tools Directory</h2>
              <p className="text-slate-500 font-medium">Found <span className="text-accent-600 font-bold">{filteredToolsCount}</span> professional tools for you</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {['All', 'Free', 'Freemium'].map(price => (
                  <button
                    key={price}
                    onClick={() => setSelectedPricing(price)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedPricing === price ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    {price === 'All' ? 'All Plans' : price}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs transition-all shadow-sm ${showFavorites ? 'bg-accent-500 border-accent-500 text-white shadow-accent-500/20' : 'bg-white border-slate-200 text-slate-600 hover:border-accent-300 hover:text-accent-600'}`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${showFavorites ? 'fill-white' : ''}`} />
                My Favorites
              </button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6 md:pb-8 -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setDisplayCount(15);
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl whitespace-nowrap font-bold text-xs transition-all border ${selectedCategory === cat ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10' : 'bg-white border-slate-200 text-slate-500 hover:border-accent-300 hover:text-accent-600 shadow-sm'}`}
              >
                {categoryIcons[cat] || <Brain className="w-3.5 h-3.5" />}
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Dynamic Grids */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">No tools found</h3>
            <p className="text-slate-500">Try adjusting your search or category.</p>
          </div>
        ) : (
          <div>
            {!showSections ? (
              <div className="flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <AnimatePresence>
                    {filteredTools.slice(0, displayCount).map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onClick={setSelectedTool}
                        isBookmarked={bookmarks.includes(tool.id)}
                        onBookmark={toggleBookmark}
                        upvotes={upvotes[tool.id]}
                        hasUpvoted={userUpvoted.includes(tool.id)}
                        onUpvote={handleUpvote}
                      />
                    ))}
                  </AnimatePresence>
                </div>
                {displayCount < filteredTools.length && (
                  <div className="flex justify-center mt-8 md:mt-10">
                    <button
                      onClick={() => setDisplayCount(prev => prev + 15)}
                      className="bg-white border border-slate-200 hover:border-accent-300 text-slate-700 font-bold py-3 px-8 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
                    >
                      <SearchIcon className="w-4 h-4 text-accent-500" />
                      Load {Math.min(15, filteredTools.length - displayCount)} more
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-12">
                {/* Top 3 Section */}
                <section>
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-4 md:mb-6">
                    <Flame className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Top 3 Most Used</h2>
                  </motion.div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {top3Tools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onClick={setSelectedTool}
                        customBgClass="bg-gradient-to-br from-amber-50 to-orange-50/50"
                        borderClass="border-amber-200/60"
                        isBookmarked={bookmarks.includes(tool.id)}
                        onBookmark={toggleBookmark}
                        upvotes={upvotes[tool.id]}
                        hasUpvoted={userUpvoted.includes(tool.id)}
                        onUpvote={handleUpvote}
                      />
                    ))}
                  </div>
                </section>

                {/* Recent AI Section */}
                <section>
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-4 md:mb-6">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-accent-500" />
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Recently Added</h2>
                  </motion.div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {recentTools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onClick={setSelectedTool}
                        customBgClass="bg-gradient-to-br from-fuchsia-50 to-purple-50/50"
                        borderClass="border-fuchsia-200/60"
                        isBookmarked={bookmarks.includes(tool.id)}
                        onBookmark={toggleBookmark}
                        upvotes={upvotes[tool.id]}
                        hasUpvoted={userUpvoted.includes(tool.id)}
                        onUpvote={handleUpvote}
                      />
                    ))}
                  </div>
                </section>

                {/* Banner Intermedio 2 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-32 md:h-48 rounded-3xl overflow-hidden my-8 relative shadow-sm group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-900/60 via-indigo-900/40 to-primary-900/60 z-10 mix-blend-multiply border border-white/10 rounded-3xl transition-opacity group-hover:opacity-80"></div>
                  <img
                    src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=1200"
                    alt="Digital Evolution"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <p className="text-white/90 font-medium tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">Digital Evolution</p>
                  </div>
                </motion.div>

                {/* All Other Tools Section */}
                <section className="pt-2 md:pt-4 mt-6 md:mt-8">
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-4 md:mb-6 border-b border-slate-200/60 pb-2 md:pb-3">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-accent-500" />
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Explore Directory</h2>
                  </motion.div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {otherTools.slice(0, displayCount).map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onClick={setSelectedTool}
                        isBookmarked={bookmarks.includes(tool.id)}
                        onBookmark={toggleBookmark}
                        upvotes={upvotes[tool.id]}
                        hasUpvoted={userUpvoted.includes(tool.id)}
                        onUpvote={handleUpvote}
                      />
                    ))}
                  </div>
                  {displayCount < otherTools.length && (
                    <div className="flex justify-center mt-8 md:mt-10">
                      <button
                        onClick={() => setDisplayCount(prev => prev + 15)}
                        className="bg-white border border-slate-200 hover:border-accent-300 text-slate-700 font-bold py-3 px-4 md:px-8 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2 w-full md:w-auto justify-center"
                      >
                        <SearchIcon className="w-4 h-4 text-accent-500" />
                        Load {Math.min(15, otherTools.length - displayCount)} more
                      </button>
                    </div>
                  )}
                </section>
              </div>
            )}
          </div>
        )}

        {/* Decorative Abstract Image 2 */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full h-40 md:h-64 rounded-3xl overflow-hidden mt-16 relative shadow-md group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 transition-opacity group-hover:opacity-80 border border-white/10 rounded-3xl"></div>
          <img
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200"
            alt="AI abstract technology"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10 z-20">
            <p className="text-white font-bold text-xl md:text-3xl drop-shadow-lg">Universe of Possibilities.</p>
            <p className="text-white/80 text-sm md:text-base mt-1">Open your mind to the tool revolution.</p>
          </div>
        </motion.div>

        {/* SEO Blog Cards Section */}
        <motion.section
          id="blog-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mt-20 mb-10 scroll-mt-24"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
            <div className="bg-accent-100 p-2 md:p-2.5 rounded-xl">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-accent-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Top Guides & Resources</h2>
              <p className="text-slate-500 text-xs md:text-sm mt-1">Discover articles and tutorials to get the most out of artificial intelligence.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-accent-500/10 hover:border-accent-200 transition-all group flex flex-col h-full cursor-pointer"
              >
                <div className="h-40 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold px-2 py-1 rounded-md z-20 uppercase tracking-wider shadow-sm">{post.category}</span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight group-hover:text-accent-600 transition-colors">{post.title}</h3>
                  <p className="text-slate-500 text-xs mb-4 flex-grow line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-[11px] font-semibold text-slate-400">{post.readTime} read</span>
                    <ArrowRight className="w-4 h-4 text-accent-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Newsletter / Suscripción (Detalle Final de Valor) */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-accent-500 rounded-full blur-[100px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-primary-500 rounded-full blur-[100px] opacity-20"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 md:mb-4">Don't fall behind in the AI era</h2>
              <p className="text-slate-300 mb-6 md:mb-8 text-base md:text-lg">
                Join over 10,000 professionals. Receive a weekly recap with 3 new artificial intelligence tools that will save you hours of work.
              </p>
              {isSubscribed ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-50 font-medium animate-in fade-in slide-in-from-bottom-2">
                  🎉 Thanks for subscribing! Check your inbox soon.
                </div>
              ) : (
                <form action="https://formsubmit.co/f.javiergg06@gmail.com" method="POST" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-20">
                  <input type="hidden" name="_next" value={window.location.href} />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="Nueva suscripción a la newsletter" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your best email..."
                    className="flex-grow px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all font-medium"
                    required
                  />
                  <button type="submit" className="px-6 py-3.5 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-accent-500/30 whitespace-nowrap active:scale-95 flex items-center justify-center">
                    Subscribe
                  </button>
                </form>
              )}
              <p className="text-xs text-slate-400 mt-4">Zero spam. You can unsubscribe anytime.</p>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section - Excellent for AdSense Weight but compact */}
        <section className="mt-16 md:mt-24 max-w-4xl mx-auto px-4 sm:px-0">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm md:text-base">Everything you need to know about our directory.</p>
          </div>
          <div className="bg-white rounded-3xl p-2 md:p-6 shadow-sm border border-slate-200/60">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} {...faq} />
            ))}
          </div>
        </section>

        {/* SEO Text Section for Home / AdSense Value - Refined for Mobile Precision */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 pt-8 md:mt-24 md:pt-12 border-t border-slate-200"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 md:mb-10 text-center md:text-left leading-tight">
              Global and Free <span className="text-accent-600">Artificial Intelligence</span> Directory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4 md:space-y-6">
                <p className="text-slate-600 text-sm md:text-lg leading-relaxed">
                  Welcome to the most comprehensive and rigorously curated directory of <strong>free and freemium Artificial Intelligence tools</strong> on the market. In an ecosystem where hundreds of new models are born daily, finding the ones that truly add value can be a titanic task.
                </p>
                <h3 className="text-lg md:text-xl font-bold text-slate-800">How to choose the best AI for you?</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Our platform is categorized by key sectors: from <strong>Writing & Coding</strong>, to niches like <strong>Fashion, Cooking, and Management</strong>. Each tool passes through a demanding human quality filter where we evaluate real utility and the generosity of its free plans.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-3.5 h-3.5 text-primary-600" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block text-sm md:text-base">Productivity & Study</strong>
                      <p className="text-slate-500 text-xs md:text-sm">Maximize your efficiency with powerful Smart Assistants and chatbots like ChatGPT, Gemini, or Perplexity.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Palette className="w-3.5 h-3.5 text-accent-600" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block text-sm md:text-base">Multimedia Generation</strong>
                      <p className="text-slate-500 text-xs md:text-sm">Access Image Generators (Flux, Leonardo) and Video Generators (Runway) for professional designs in seconds.</p>
                    </div>
                  </li>
                </ul>
                <p className="text-slate-500 text-xs md:text-sm italic border-l-2 border-accent-500 pl-4 py-1">
                  Add our directory to your favorites. We constantly analyze the latest extensions and mobile apps based on AI that are revolutionizing the digital world.
                </p>
              </div>
            </div>

          </div>
        </motion.section>

        {/* Comments & Evaluation Section */}
        <section id="comentarios" className="mt-16 md:mt-24 mb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-2">Community Evaluation</h2>
                <p className="text-slate-500">Has the directory been useful to you? Leave us your feedback.</p>
              </div>
            </div>

            {/* Reviews removed as per request - Keeping only the form */}


            {/* Leave a Comment Form */}
            <div className="bg-slate-900 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-accent-400" />
                  <h3 className="text-xl font-bold">Tell us about your experience</h3>
                </div>
                <form action="https://formsubmit.co/f.javiergg06@gmail.com" method="POST" className="space-y-4 md:space-y-6">
                  <input type="hidden" name="_next" value={window.location.origin + "/success"} />
                  <input type="hidden" name="_subject" value="New Community Review - AI Directory" />
                  <input type="hidden" name="_captcha" value="false" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
                    />
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-w-[140px]">
                      <span className="text-sm text-slate-400 font-medium whitespace-nowrap">Your rating:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setFormRating(s)}
                            onMouseEnter={() => setHoverRating(s)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="focus:outline-none transition-transform active:scale-95 px-0.5"
                          >
                            <Star
                              className={`w-6 h-6 transition-all ${s <= (hoverRating || formRating)
                                ? 'fill-amber-400 text-amber-400 scale-110'
                                : 'text-slate-600'
                                }`}
                            />
                          </button>
                        ))}
                      </div>
                      <input type="hidden" name="rating" value={formRating} />
                    </div>
                  </div>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Write your comment or suggestion here..."
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-accent-500 hover:bg-accent-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-accent-500/20 transition-all active:scale-[0.98]"
                  >
                    Submit evaluation
                  </button>
                  <p className="text-[10px] text-center text-slate-500 mt-2 italic">We value every suggestion to improve the directory daily.</p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => scrollToSection('top')}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 p-3 md:p-4 bg-accent-500 hover:bg-accent-600 text-white rounded-full shadow-2xl hover:shadow-accent-500/30 transition-all active:scale-90 flex items-center justify-center group border border-accent-400"
            title="Volver al principio"
          >
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Side Drawer Overlay & Panel */}
      <AnimatePresence>
        {selectedTool && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTool(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto border-l border-slate-200"
            >
              <div className="relative min-h-full flex flex-col">
                {/* Drawer Header */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Detalles de la herramienta</span>
                  <button
                    onClick={() => setSelectedTool(null)}
                    className="p-2 -mr-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="p-5 md:p-8 flex-grow text-slate-900">
                  <div className="flex items-start gap-4 md:gap-5 mb-6 md:mb-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-slate-50 flex items-center justify-center flex-shrink-0 text-4xl md:text-5xl">
                      {selectedTool.emoji || '🤖'}
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">{selectedTool.name}</h2>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="flex text-[10px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-slate-100 text-slate-600">
                          {selectedTool.sector}
                        </span>
                        <span className={`flex items-center gap-1 text-[10px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1 rounded-full ${selectedTool.isFullyFree ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                          <Zap className="w-3 h-3" /> {selectedTool.freeTierDetails}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <button
                          onClick={(e) => handleUpvote(e, selectedTool.id)}
                          className={`flex items-center gap-1 md:gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border text-xs md:text-sm font-bold transition-all z-20 shadow-sm ${userUpvoted.includes(selectedTool.id) ? 'bg-accent-500 border-accent-500 text-white hover:bg-accent-600' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                        >
                          <ChevronUp className={`w-3.5 h-3.5 md:w-4 md:h-4 ${userUpvoted.includes(selectedTool.id) ? 'text-white' : 'text-slate-400'}`} />
                          {upvotes[selectedTool.id] || 0} Votos
                        </button>
                        <button
                          onClick={(e) => toggleBookmark(e, selectedTool.id)}
                          className={`flex items-center gap-1 md:gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border text-xs md:text-sm font-bold transition-all shadow-sm ${bookmarks.includes(selectedTool.id) ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 md:w-4 md:h-4 ${bookmarks.includes(selectedTool.id) ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                          Favorito
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-slate prose-p:leading-relaxed max-w-none">
                    <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">¿Por qué usarla?</h3>
                    <p className="text-slate-600 text-[15px] mb-4">
                      {selectedTool.description}
                    </p>
                    <p className="text-slate-600 text-[15px]">
                      {selectedTool.longDescription}
                    </p>
                  </div>
                </div>

                {/* Drawer Footer with CTA */}
                <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4 md:p-6 z-10 space-y-2 md:space-y-3">
                  <a href={selectedTool.url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-accent-600 text-white font-bold py-3 px-4 md:py-3.5 md:px-6 rounded-xl transition-all shadow-lg hover:shadow-accent-500/25 active:scale-[0.98] text-sm md:text-base">
                    Probar {selectedTool.name} Gratis <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link to={`/herramienta/${selectedTool.id}`} className="w-full flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 hover:border-accent-300 text-slate-700 font-bold py-2.5 px-4 md:py-3 md:px-6 rounded-xl transition-all shadow-sm hover:shadow-md hover:text-accent-600 text-sm md:text-base">
                    Ver página de reseña completa
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedBlogPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlogPost(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border"
            >
              <div className="relative h-48 sm:h-64 flex-shrink-0">
                <img src={selectedBlogPost.image} alt={selectedBlogPost.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <button
                  onClick={() => setSelectedBlogPost(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="inline-block bg-accent-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md mb-2 uppercase tracking-wider">{selectedBlogPost.category}</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-md">{selectedBlogPost.title}</h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium mb-6 pb-6 border-b border-slate-100">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {selectedBlogPost.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="flex items-center gap-1.5 text-accent-600"><Sparkles className="w-4 h-4" /> Editorial</span>
                </div>

                <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-accent-600 hover:prose-a:text-accent-500">
                  <p className="lead text-xl text-slate-700 font-medium mb-6">
                    {selectedBlogPost.excerpt}
                  </p>
                  <p className="whitespace-pre-line text-slate-600 leading-relaxed">
                    {selectedBlogPost.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div >
  );
}
