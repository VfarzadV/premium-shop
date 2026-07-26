"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, Phone, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';

export default function LoginPage() {
    const [step, setStep] = useState<1 | 2>(1);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [timer, setTimer] = useState(120);
    const router = useRouter();
    const loginUser = useUserStore((state) => state.login);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (step === 2 && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const phoneRegex = /^09[0-9]{9}$/;

        if (phoneRegex.test(phone)) {
            setStep(2);
            setTimer(120);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        if (value && index < 4 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleFinalLogin = () => {
        loginUser(phone);
        router.push('/profile');
    };

    return (
        <main className="min-h-screen w-full bg-bg-sec flex items-center justify-center relative overflow-hidden p-4">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary rounded-full blur-3xl"></div>
            <Link href="/" className="absolute top-6 right-6 lg:top-10 lg:right-10 flex items-center gap-2 text-text-sec hover:text-primary transition-colors bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl border border-stroke shadow-sm z-10">
                <ArrowRight className="w-4 h-4" />
                <span className="text-sm font-bold">بازگشت به سایت</span>
            </Link>
            <div className="bg-bg-main w-full max-w-md rounded-4xl p-8 md:p-10 shadow-2xl border border-stroke/50 relative z-10">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                        {step === 1 ? (
                            <User className="w-8 h-8 text-primary" />
                        ) : (
                            <ShieldCheck className="w-8 h-8 text-primary" />
                        )}
                    </div>
                </div>
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-black text-text-main mb-2">ثبت نام | ورود</h1>
                            <p className="text-sm text-text-sec">برای ورود یا ثبت نام، شماره تماس خود را وارد کنید.</p>
                        </div>
                        <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-sec text-right">شماره موبایل</label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        dir="ltr"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="0912 345 6789"
                                        className="w-full bg-bg-sec border border-stroke rounded-xl py-3.5 pl-12 pr-4 text-left font-medium text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                        autoFocus
                                    />
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-sec" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={!/^09[0-9]{9}$/.test(phone)}
                                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 mt-2"
                            >
                                تایید و دریافت کد
                            </button>
                        </form>
                    </div>
                )}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-black text-text-main mb-2">کد تایید</h1>
                            <p className="text-sm text-text-sec flex items-center justify-center gap-2">
                                کد به شماره <span className="font-bold text-text-main dir-ltr">{phone}</span> ارسال شد.
                                <button onClick={() => setStep(1)} className="text-primary hover:underline">ویرایش</button>
                            </p>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="flex justify-between gap-2 md:gap-3" dir="ltr">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="w-12 h-14 md:w-14 md:h-16 text-center text-xl font-black bg-bg-sec border border-stroke rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text-main"
                                    />
                                ))}
                            </div>
                            <div className="flex items-center justify-center text-sm">
                                {timer > 0 ? (
                                    <span className="text-text-sec">
                                        ارسال مجدد کد تا <span className="font-bold text-primary">{formatTime(timer)}</span>
                                    </span>
                                ) : (
                                    <button onClick={() => setTimer(120)} className="font-bold text-primary flex items-center gap-1 hover:opacity-80 transition-opacity">
                                        <ArrowLeft className="w-4 h-4" />
                                        ارسال مجدد کد
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={handleFinalLogin}
                                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 text-center mt-2"
                            >
                                تایید و ورود
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}