import React from 'react';
import { useNavigate } from 'react-router-dom';
import Scene from '../canvas/Scene';
import Navbar from '../components/Navbar';
import { Zap, Battery, Cpu, ChevronRight, Star, Globe, ShieldCheck, Truck } from 'lucide-react';

const FEATURES = [
    { icon: Zap, label: 'High-Torque Motor', desc: 'Instant electric engagement' },
    { icon: Battery, label: 'Li-Ion Cells', desc: 'Long-range battery system' },
    { icon: Cpu, label: 'Smart PCB', desc: 'Startup torque controller' },
    { icon: Globe, label: 'Ships Worldwide', desc: 'Fast delivery anywhere' },
];

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-[#f8fafc] overflow-x-hidden relative bg-grid">
            <Navbar />

            {/* Subtle ambient orbs */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-sky-100 rounded-full blur-[160px] opacity-60" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[130px] opacity-50" />
            </div>

            {/* Hero */}
            <main className="relative flex items-center justify-center h-screen w-full">

                {/* Background display text */}
                <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none">
                    <div className="flex flex-col items-center text-center">
                        <span
                            className="block font-black leading-none tracking-tighter"
                            style={{
                                fontSize: 'clamp(5rem, 20vw, 18rem)',
                                background: 'linear-gradient(180deg, rgba(14,165,233,0.12) 0%, rgba(99,102,241,0.05) 60%, transparent 80%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            SMART
                        </span>
                        <span
                            className="block font-black leading-none tracking-tighter"
                            style={{
                                fontSize: 'clamp(4rem, 15vw, 13rem)',
                                background: 'linear-gradient(180deg, rgba(14,165,233,0.10) 0%, transparent 80%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            ROLLER
                        </span>
                    </div>
                </div>

                {/* 3D Scene */}
                <div className="absolute inset-0 z-10">
                    <Scene />
                </div>

                {/* Left info panel */}
                <div className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4">
                    {['Retractable Wheels', 'Regen Braking', 'Smart PCB'].map((tag) => (
                        <div key={tag} className="flex items-center gap-2 group cursor-default">
                            <div className="w-5 h-[1.5px] bg-sky-400/50 group-hover:w-9 group-hover:bg-sky-500 transition-all duration-300 rounded-full" />
                            <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-400 group-hover:text-slate-700 transition-colors uppercase">{tag}</span>
                        </div>
                    ))}
                </div>

                {/* Right price panel */}
                <div className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-end gap-3">
                    <div className="text-right">
                        <div className="text-[10px] tracking-[0.3em] text-slate-400 uppercase mb-0.5">Price</div>
                        <div className="text-5xl font-black text-slate-900 leading-none">3,800</div>
                        <div className="text-sm font-bold text-sky-500 mt-0.5">DH</div>
                    </div>
                    <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map(s => (
                            <Star key={s} size={11} className="fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center gap-3">
                    <button
                        onClick={() => navigate('/order')}
                        className="group flex items-center gap-3 px-9 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm tracking-widest rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(14,165,233,0.45)] hover:shadow-[0_12px_40px_rgba(14,165,233,0.6)] hover:scale-105 uppercase"
                    >
                        Order Now
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform stroke-[2.5px]" />
                    </button>
                    <div className="flex items-center gap-5 text-slate-400 text-[10px] tracking-[0.2em] uppercase">
                        <span>Free Delivery</span>
                        <span>·</span>
                        <span>Worldwide Shipping</span>
                        <span>·</span>
                        <span>Secure Checkout</span>
                    </div>
                </div>
            </main>

            {/* Features strip */}
            <section className="relative z-20 bg-white border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-6 py-20">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 mb-5">
                            <Zap size={12} className="text-sky-500" />
                            <span className="text-sky-600 text-[10px] font-bold tracking-widest uppercase">Smart Roller Pro</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            The Future of<br />
                            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">Personal Mobility</span>
                        </h2>
                        <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                            Retractable wheels, regenerative braking, and a smart PCB torque controller — built elegantly into a sneaker.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {FEATURES.map(({ icon: Icon, label, desc }) => (
                            <div key={label} className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-sky-200 hover:bg-sky-50/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.08)] transition-all duration-300">
                                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center mb-4 group-hover:bg-sky-200 transition-colors">
                                    <Icon size={20} className="text-sky-600" />
                                </div>
                                <div className="text-sm font-bold text-slate-800 mb-1">{label}</div>
                                <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats bar */}
            <section className="relative z-20 border-t border-slate-100 bg-slate-50">
                <div className="max-w-6xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-3 gap-8 text-center">
                        {[
                            { val: '3,800', label: 'DH', sub: 'Competitive pricing' },
                            { val: '100%', label: 'Worldwide', sub: 'Global delivery' },
                            { val: '5★', label: 'Rating', sub: 'Customer reviews' },
                        ].map(({ val, label, sub }) => (
                            <div key={label}>
                                <div className="text-3xl md:text-4xl font-black text-slate-900">{val}</div>
                                <div className="text-xs font-bold text-sky-500 tracking-wider mt-1 uppercase">{label}</div>
                                <div className="text-xs text-slate-400 mt-0.5 hidden md:block">{sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust badges */}
            <section className="relative z-20 border-t border-slate-100 bg-white">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-xs">
                        {[
                            { icon: ShieldCheck, text: 'Secure Checkout' },
                            { icon: Truck, text: 'Free Worldwide Shipping' },
                            { icon: Star, text: '5-Star Rated Product' },
                            { icon: Globe, text: 'Ships from Morocco' },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2">
                                <Icon size={14} className="text-sky-400" />
                                <span className="font-medium">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-20 border-t border-slate-100 py-6 text-center text-slate-300 text-xs tracking-wider bg-white">
                © 2026 Smart Roller Pro · All rights reserved
            </footer>
        </div>
    );
}
