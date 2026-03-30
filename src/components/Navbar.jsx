import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Zap, ShoppingBag } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
                ? 'bg-white/90 backdrop-blur-2xl border-b border-slate-200 shadow-sm py-3'
                : 'bg-transparent border-b border-transparent py-5'
        }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* Logo / Brand */}
                <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => navigate('/')}
                >
                    <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center shadow-[0_0_12px_rgba(14,165,233,0.4)] group-hover:shadow-[0_0_20px_rgba(14,165,233,0.6)] transition-all">
                        <Zap size={16} className="text-white" />
                    </div>
                    <span className="font-black text-slate-900 tracking-tight text-lg">Smart Roller Pro</span>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                    {!isHome && (
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors group"
                        >
                            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                            <span className="text-xs font-medium tracking-wider hidden md:inline">Back</span>
                        </button>
                    )}
                    {isHome && (
                        <button
                            onClick={() => navigate('/order')}
                            className="flex items-center gap-2 px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.35)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
                        >
                            <ShoppingBag size={14} />
                            Order Now
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
