import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronRight,
    CheckCircle,
    AlertCircle,
    Package,
    Star,
    ShieldCheck,
    CreditCard,
    MapPin,
    Truck,
    Zap,
    Globe,
    Phone,
    Mail,
    User,
} from 'lucide-react';
import NavBar from '../components/Navbar';

// ==========================================
// CONFIGURATION
// ==========================================
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSddnVTbtmhTJDgkXdLMlTOjPrE-EL-9hmtzCBB-jBuN0YLF-g/formResponse";

const FORM_FIELDS = {
    EMAIL: "entry.1871437445",
    NAME: "entry.2100829503",
    PHONE: "entry.1399618403",
    SIZE: "entry.1533926266",
    PAYMENT_METHOD: "entry.1830317645",
    AGREEMENT: "entry.1230404767",
    YEAR: "entry.1049927325",
    MAJOR: "entry.1836592500",
};

const SIZES = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
const PRODUCT_PRICE = 3800;

// ==========================================
// UI COMPONENTS
// ==========================================

const SectionHeader = ({ number, title, icon: Icon }) => (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 text-sky-500 font-bold text-sm">
            {number}
        </div>
        <h2 className="text-base font-semibold text-slate-800 tracking-wide flex items-center gap-2">
            {title}
            {Icon && <Icon size={15} className="text-slate-300" />}
        </h2>
    </div>
);

const InputField = ({ label, name, type = "text", value, onChange, placeholder, icon: Icon }) => (
    <div className="space-y-1.5 group">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1 group-focus-within:text-sky-500 transition-colors">
            {label}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-400 transition-colors pointer-events-none">
                    <Icon size={16} />
                </div>
            )}
            <input
                type={type}
                name={name}
                required
                value={value}
                onChange={onChange}
                className={`w-full py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300
                    focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:bg-white outline-none
                    transition-all duration-200 text-sm ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
                placeholder={placeholder}
            />
        </div>
    </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function OrderPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        size: '',
        paymentMethod: '',
        rating: '0',
        country: '',
        address: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => window.scrollTo(0, 0), []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.size) {
            setError("Please select your shoe size to continue.");
            return;
        }
        if (!formData.paymentMethod) {
            setError("Please select a payment method.");
            return;
        }
        const phoneRegex = /^\+?[\d\s\-]{6,20}$/;
        if (!phoneRegex.test(formData.phone)) {
            setError("Please enter a valid phone number.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        const formBody = new URLSearchParams();
        formBody.append(FORM_FIELDS.EMAIL, formData.email);
        formBody.append(FORM_FIELDS.NAME, formData.name);
        formBody.append(FORM_FIELDS.PHONE, formData.phone);
        formBody.append(FORM_FIELDS.SIZE, `EU ${formData.size}`);
        formBody.append(FORM_FIELDS.PAYMENT_METHOD, formData.paymentMethod);
        formBody.append(FORM_FIELDS.AGREEMENT, `Order for Smart Roller Pro — ${PRODUCT_PRICE} DH`);
        formBody.append(FORM_FIELDS.YEAR, formData.country || 'International');
        formBody.append(FORM_FIELDS.MAJOR, formData.address || 'N/A');

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                body: formBody,
                mode: 'no-cors',
            });
            setTimeout(() => {
                setSubmitted(true);
                window.scrollTo(0, 0);
            }, 800);
        } catch (err) {
            console.error("Submission error:", err);
            setError("Connection failed. Please try again.");
        } finally {
            if (!submitted) setIsSubmitting(false);
        }
    };

    // ---- Success Screen ----
    if (submitted) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 bg-grid">
                <div className="max-w-md w-full bg-white border border-slate-100 rounded-2xl shadow-xl p-8 relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400" />

                    <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_0_8px_rgba(14,165,233,0.08)]">
                        <CheckCircle size={38} className="text-sky-500" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-600 text-[10px] font-bold tracking-wider uppercase">Order Confirmed</span>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 mb-2">You're all set! 🚀</h2>
                    <p className="text-slate-400 text-sm mb-8">
                        Your Smart Roller Pro order is placed. We'll contact you at <span className="text-slate-700 font-medium">{formData.email}</span> shortly.
                    </p>

                    <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left border border-slate-100">
                        <div className="text-[10px] text-slate-400 uppercase font-bold mb-3 tracking-wider">Order Summary</div>
                        <div className="space-y-2">
                            {[
                                { label: 'Product', val: 'Smart Roller Pro' },
                                { label: 'Size (EU)', val: formData.size },
                                { label: 'Total', val: `${PRODUCT_PRICE.toLocaleString()} DH` },
                                { label: 'Name', val: formData.name },
                            ].map(({ label, val }) => (
                                <div key={label} className="flex justify-between text-sm">
                                    <span className="text-slate-400">{label}</span>
                                    <span className="text-slate-800 font-semibold">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-all shadow-[0_4px_20px_rgba(14,165,233,0.35)] hover:shadow-[0_4px_30px_rgba(14,165,233,0.5)] uppercase tracking-wide text-sm"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    // ---- Order Form ----
    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 pb-24 relative bg-grid">
            {/* Ambient */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100 rounded-full blur-[150px] opacity-50" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-[120px] opacity-40" />
            </div>

            <NavBar />

            <div className="max-w-7xl mx-auto px-4 pt-28 relative z-10">

                {/* Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 mb-4">
                        <Zap size={11} className="text-sky-500" />
                        <span className="text-sky-600 text-[10px] font-bold tracking-widest uppercase">Secure Checkout</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                        Order Your{' '}
                        <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">Smart Roller Pro</span>
                    </h1>
                    <p className="text-slate-400 text-sm">Fill in your details and we'll get it shipped to you anywhere in the world.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* 1. Personal Details */}
                        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
                            <SectionHeader number="1" title="Personal Details" icon={User} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <InputField label="Full Name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} icon={User} />
                                </div>
                                <InputField label="Email Address" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} icon={Mail} />
                                <InputField label="Phone Number" name="phone" type="tel" placeholder="+1 234 567 8900" value={formData.phone} onChange={handleChange} icon={Phone} />
                                <InputField label="Country" name="country" placeholder="Morocco, France, USA..." value={formData.country} onChange={handleChange} icon={Globe} />
                                <InputField label="Delivery Address" name="address" placeholder="Street, City, ZIP" value={formData.address} onChange={handleChange} icon={MapPin} />
                            </div>
                        </section>

                        {/* 2. Size Selection */}
                        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
                            <SectionHeader number="2" title="Select Your Size" icon={Package} />
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">EU Sizing</span>
                                <span className="text-[10px] text-slate-400">Unsure? Size up for comfort</span>
                            </div>
                            <div className="grid grid-cols-5 gap-2.5">
                                {SIZES.map((size) => (
                                    <label key={size} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="size"
                                            value={size}
                                            checked={formData.size === size}
                                            onChange={handleChange}
                                            className="hidden peer"
                                        />
                                        <div className="h-12 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm font-medium
                                            hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50 transition-all duration-150
                                            peer-checked:bg-sky-500 peer-checked:border-sky-500 peer-checked:text-white peer-checked:font-bold peer-checked:shadow-[0_4px_12px_rgba(14,165,233,0.3)]">
                                            {size}
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {formData.size && (
                                <div className="mt-3 text-center text-xs text-sky-500 font-semibold">
                                    ✓ EU {formData.size} selected
                                </div>
                            )}
                        </section>

                        {/* 3. Payment */}
                        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
                            <SectionHeader number="3" title="Payment Method" icon={CreditCard} />

                            <div className="space-y-3">
                                {[
                                    { value: 'Cash On Delivery', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: Truck },
                                    { value: 'Credit Card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex accepted', icon: CreditCard },
                                ].map(({ value, label, desc, icon: PayIcon }) => (
                                    <label key={value} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                                        formData.paymentMethod === value
                                            ? 'border-sky-200 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.08)]'
                                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                                    }`}>
                                        <input type="radio" name="paymentMethod" value={value} checked={formData.paymentMethod === value} onChange={handleChange} className="hidden" />
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                                            formData.paymentMethod === value ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                            <PayIcon size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <div className={`font-semibold text-sm ${formData.paymentMethod === value ? 'text-slate-800' : 'text-slate-500'}`}>{label}</div>
                                            <div className="text-[11px] text-slate-400 mt-0.5">{desc}</div>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                                            formData.paymentMethod === value ? 'border-sky-500 bg-sky-500' : 'border-slate-300'
                                        }`}>
                                            {formData.paymentMethod === value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                    </label>
                                ))}

                                {/* Card details form */}
                                {formData.paymentMethod === 'Credit Card' && (
                                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <ShieldCheck size={13} className="text-emerald-500" />
                                            <span className="text-[10px] text-emerald-600 font-semibold tracking-wider uppercase">SSL Secured · 256-bit Encryption</span>
                                        </div>
                                        {/* Card number */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Card Number</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    maxLength={19}
                                                    value={formData.cardNumber || ''}
                                                    onChange={(e) => {
                                                        const raw = e.target.value.replace(/\D/g, '');
                                                        const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
                                                        setFormData({ ...formData, cardNumber: formatted });
                                                    }}
                                                    placeholder="1234 5678 9012 3456"
                                                    className="w-full py-3 pl-4 pr-14 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-mono tracking-wider transition-all"
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                                    <div className="w-6 h-4 rounded bg-blue-600 opacity-80" />
                                                    <div className="w-6 h-4 rounded bg-red-500 opacity-70" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Expiry + CVV */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    name="cardExpiry"
                                                    maxLength={5}
                                                    value={formData.cardExpiry || ''}
                                                    onChange={(e) => {
                                                        const raw = e.target.value.replace(/\D/g, '');
                                                        const formatted = raw.length > 2 ? raw.slice(0,2) + '/' + raw.slice(2) : raw;
                                                        setFormData({ ...formData, cardExpiry: formatted });
                                                    }}
                                                    placeholder="MM/YY"
                                                    className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-mono tracking-wider transition-all"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CVV</label>
                                                <input
                                                    type="password"
                                                    name="cardCvv"
                                                    maxLength={4}
                                                    value={formData.cardCvv || ''}
                                                    onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value.replace(/\D/g,'') })}
                                                    placeholder="•••"
                                                    className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-mono tracking-wider transition-all"
                                                />
                                            </div>
                                        </div>
                                        {/* Name on card */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name on Card</label>
                                            <input
                                                type="text"
                                                name="cardName"
                                                value={formData.cardName || ''}
                                                onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                                                placeholder="JOHN DOE"
                                                className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none text-sm uppercase tracking-wider transition-all"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Hype Rating */}
                        <div className="flex items-center gap-4 px-2 opacity-60 hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rate your excitement:</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} type="button" onClick={() => setFormData({ ...formData, rating: String(star) })}>
                                        <Star size={18} className={`transition-all ${Number(formData.rating) >= star ? "fill-amber-400 text-amber-400 scale-110" : "text-slate-300 hover:text-amber-300"}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-28 space-y-4">

                            {/* Product Card */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
                                <div className="h-1 bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400" />

                                {/* Header */}
                                <div className="p-6 bg-gradient-to-br from-sky-50 to-indigo-50/30 border-b border-slate-100">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center shadow-sm">
                                            <Zap size={22} className="text-sky-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Limited Edition</div>
                                            <h3 className="font-black text-slate-900 text-lg leading-tight">Smart Roller Pro</h3>
                                            <div className="flex items-center gap-1 mt-1">
                                                {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-amber-400 text-amber-400" />)}
                                                <span className="text-[10px] text-slate-400 ml-1">5.0 (128)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-[11px] text-emerald-600 font-semibold">IN STOCK — Ships worldwide</span>
                                    </div>
                                </div>

                                {/* Specs */}
                                <div className="px-6 py-4 border-b border-slate-50">
                                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                        {[
                                            { label: 'Motor', val: 'High-Torque' },
                                            { label: 'Battery', val: 'Li-Ion' },
                                            { label: 'Braking', val: 'Regenerative' },
                                            { label: 'Control', val: 'PCB Smart' },
                                        ].map(({ label, val }) => (
                                            <div key={label} className="flex items-center gap-1.5">
                                                <div className="w-1 h-1 rounded-full bg-sky-400" />
                                                <span className="text-[10px] text-slate-400">{label}:</span>
                                                <span className="text-[10px] text-slate-700 font-semibold">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Price & CTA */}
                                <div className="p-6 space-y-4">
                                    <div className="space-y-2.5 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Unit Price</span>
                                            <span className="text-slate-800 font-semibold">{PRODUCT_PRICE.toLocaleString()} DH</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Shipping</span>
                                            <span className="text-sky-500 font-semibold">FREE</span>
                                        </div>
                                        {formData.size && (
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">Size (EU)</span>
                                                <span className="text-slate-800 font-semibold">{formData.size}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-t border-slate-100 pt-4">
                                        <div className="flex justify-between items-end">
                                            <span className="text-slate-700 font-bold">Total</span>
                                            <div className="text-right">
                                                <span className="text-3xl font-black text-slate-900">{PRODUCT_PRICE.toLocaleString()}</span>
                                                <span className="text-sm font-bold text-sky-500 ml-1">DH</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-[0_6px_25px_rgba(14,165,233,0.4)] hover:shadow-[0_8px_35px_rgba(14,165,233,0.55)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Processing...
                                            </span>
                                        ) : (
                                            <>Place Order <ChevronRight size={18} className="stroke-[3px]" /></>
                                        )}
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                                        <ShieldCheck size={12} />
                                        <span>Secure · Encrypted · Trusted</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                                <div className="text-[10px] text-slate-400 uppercase font-bold mb-3 tracking-wider">Delivery Info</div>
                                <div className="space-y-2.5">
                                    {[
                                        { icon: Globe, text: 'Ships worldwide from Morocco' },
                                        { icon: Truck, text: 'Express & standard options available' },
                                        { icon: ShieldCheck, text: 'Secure packaging guaranteed' },
                                    ].map(({ icon: Icon, text }) => (
                                        <div key={text} className="flex items-center gap-3">
                                            <Icon size={14} className="text-sky-400 flex-shrink-0" />
                                            <span className="text-[11px] text-slate-500">{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Error Toast */}
            {error && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-red-200 text-red-600 px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-xl z-50 max-w-sm w-full mx-4">
                    <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                    <button onClick={() => setError(null)} className="ml-auto text-slate-300 hover:text-slate-500">✕</button>
                </div>
            )}
        </div>
    );
}