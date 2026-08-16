import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import heroImage from "../assets/hero.jpg";

let isInitialBrowserLoad = true;

const LandingPage = () => {
    const [showSplash, setShowSplash] = useState(() => {
        if (isInitialBrowserLoad) {
            isInitialBrowserLoad = false;
            return true;
        }
        return false;
    });
    const [progress, setProgress] = useState(0);
    const [isContentHidden, setIsContentHidden] = useState(false);
    const [isCurtainUp, setIsCurtainUp] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        if (!showSplash) return;
        document.body.style.overflow = 'hidden';
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                const increment = Math.floor(Math.random() * 4) + 2;
                const next = prev + increment;
                return next >= 100 ? 100 : next;
            });
        }, 25);
        return () => {
            clearInterval(progressInterval);
            document.body.style.overflow = '';
        };
    }, [showSplash]);

    useEffect(() => {
        if (progress === 100 && showSplash) {
            const timer1 = setTimeout(() => setIsContentHidden(true), 300);
            const timer2 = setTimeout(() => setIsCurtainUp(true), 600);
            const timer3 = setTimeout(() => {
                setShowSplash(false);
                document.body.style.overflow = '';
            }, 1500);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
    }, [progress, showSplash]);

    const handleSkipSplash = () => {
        setProgress(100);
        setIsContentHidden(true);
        setIsCurtainUp(true);
        setTimeout(() => {
            setShowSplash(false);
            document.body.style.overflow = '';
        }, 600);
    };

    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col font-body-md text-body-md relative">

            {/* ================================================== */}
            {/* SPLASH SCREEN                                       */}
            {/* ================================================== */}
            {showSplash && (
                <div id="splash-screen" className="fixed inset-0 z-[100] pointer-events-auto select-none">
                    <div className={`curtain-layer absolute inset-0 bg-secondary-container z-0 ${isCurtainUp ? 'curtain-up-back' : ''}`}></div>
                    <div className={`curtain-layer absolute inset-0 bg-primary-container z-10 flex flex-col items-center justify-center text-center px-4 shadow-2xl ${isCurtainUp ? 'curtain-up-main' : ''}`}>
                        <button
                            onClick={handleSkipSplash}
                            className="absolute top-6 right-6 text-xs text-on-primary-container hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full transition-all border border-white/10 flex items-center gap-1 cursor-pointer"
                        >
                            <span>Bỏ qua</span>
                            <span className="material-symbols-outlined text-[14px]">fast_forward</span>
                        </button>

                        <div className={`space-y-6 max-w-lg transition-all duration-500 transform ${isContentHidden ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-variant/10 border border-white/10">
                                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                                <span className="font-label-md text-xs text-secondary-fixed uppercase tracking-widest">Nền tảng học thuật</span>
                            </div>
                            <div className="overflow-hidden py-1">
                                <h1 className="font-headline-lg text-[34px] sm:text-[44px] md:text-display-lg font-bold text-on-primary tracking-tight animate-[textRise_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                                    Đạo Đức Học Đường
                                </h1>
                            </div>
                            <div className="relative w-64 md:w-80 h-3 bg-black/40 backdrop-blur-md rounded-full mx-auto p-0.5 border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden">
                                <div className="h-full w-full bg-white/5 rounded-full overflow-hidden relative">
                                    <div
                                        className="h-full progress-shimmer rounded-full transition-all ease-out duration-150 relative shadow-[0_0_12px_#fd8b00]"
                                        style={{ width: `${progress}%` }}
                                    >
                                        {progress > 2 && progress < 100 && (
                                            <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white rounded-full glow-head"></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-on-primary-container font-mono tracking-wider opacity-90 flex items-center justify-center gap-2">
                                <span>Đang khởi tạo bộ lọc giá trị...</span>
                                <span className="font-bold text-secondary-container">{progress}%</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <Header />

            <main className="flex-grow">

                {/* ============================== */}
                {/* HERO SECTION                   */}
                {/* ============================== */}
                <section className="relative w-full min-h-[82vh] flex items-center justify-center overflow-hidden border-b border-outline-variant">
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/80 to-surface/40 z-10"></div>
                        <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
                            style={{ backgroundImage: `url(${heroImage})` }}
                        ></div>
                    </div>

                    <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center py-12">
                        <div className="lg:col-span-8 space-y-8 bg-white/85 backdrop-blur-[12px] border border-white/30 p-8 md:p-12 rounded-2xl shadow-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary-container/10 border border-secondary/20">
                                <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
                                <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">Tư tưởng Hồ Chí Minh</span>
                            </div>

                            <h1 className="font-display-lg text-display-lg md:text-[56px] md:leading-[64px] text-primary tracking-tight">
                                Cần – Kiệm – Liêm – Chính
                                <br />
                                <span className="text-secondary-container">Trong Đời Sống Sinh Viên</span>
                            </h1>

                            <div className="border-l-4 border-l-secondary-container bg-[#FFF9F2] p-6 rounded-r-lg shadow-sm max-w-3xl">
                                <p className="font-blockquote text-blockquote text-on-surface-variant leading-relaxed italic">
                                    "Trong kỷ nguyên số, khi sự cám dỗ và tính cá nhân hóa lên ngôi, liệu các chuẩn mực Cần – Kiệm – Liêm – Chính có thể được diễn giải và vận dụng như thế nào để trở thành 'bộ lọc' giá trị cho sinh viên?"
                                </p>
                            </div>

                            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                                Bốn phẩm chất nền tảng mà Hồ Chí Minh khẳng định <b>"ai cũng phải thực hiện"</b> — không chỉ là đạo lý xưa cũ, mà là kim chỉ nam cho sinh viên hiện đại.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <a
                                    href="#norms"
                                    className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3.5 rounded shadow-md hover:bg-primary-container hover:shadow-lg transition-all active:scale-95 duration-100 flex items-center gap-2"
                                >
                                    Khám phá Tứ Đức
                                    <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                                </a>
                                <Link
                                    to="/practice"
                                    className="bg-transparent text-primary font-label-md text-label-md px-8 py-3.5 rounded border-2 border-primary hover:bg-surface-container-low transition-all active:scale-95 duration-100 flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">checklist</span>
                                    Thực hành ngay
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-secondary-container/10 text-secondary border border-secondary-container/30 font-label-md text-label-md px-6 py-3.5 rounded hover:bg-secondary-container/20 transition-all flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">psychology</span>
                                    Tình huống thực tế
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================== */}
                {/* 4 CHUẨN MỰC — BENTO GRID      */}
                {/* ============================== */}
                <section id="norms" className="py-24 bg-surface max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop scroll-mt-20">
                    <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
                        <div className="inline-block px-3 py-1 rounded-full bg-primary-container/10 text-primary font-label-md text-xs uppercase tracking-widest">
                            Hệ giá trị cốt lõi
                        </div>
                        <h2 className="font-headline-lg text-headline-lg md:text-[36px] text-primary">Tứ Đức Trong Đời Sống Sinh Viên</h2>
                        <p className="font-body-lg text-body-lg text-on-surface-variant">
                            Hồ Chí Minh khẳng định: <b>"Cần, Kiệm, Liêm, Chính có quan hệ chặt chẽ với nhau và ai cũng phải thực hiện."</b>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter auto-rows-[minmax(280px,auto)]">

                        {/* CẦN — Wide Card */}
                        <div className="lg:col-span-8 bg-surface-container-lowest border border-surface-variant rounded-xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,33,71,0.08)] hover:border-primary flex flex-col justify-between group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-container/5 rounded-bl-[120px] -z-10 transition-transform group-hover:scale-110 duration-500"></div>
                            <div>
                                <div className="w-12 h-12 rounded bg-primary-container text-on-primary flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-[26px] animate-[float_4s_ease-in-out_infinite]">construction</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">
                                    CẦN — Siêng Năng, Chăm Chỉ, Dẻo Dai
                                </h3>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-3">
                                    <b>Định nghĩa:</b> Cần tức là siêng năng, chăm chỉ, cố gắng dẻo dai. Muốn chữ Cần đạt nhiều kết quả thì phải có kế hoạch cho mọi công việc.
                                </p>
                                <ul className="space-y-2 text-on-surface-variant text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>
                                        <span>Lao động cần cù, siêng năng, có sáng tạo và năng suất cao</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>
                                        <span>Tinh thần tự lực cánh sinh, không lười biếng</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>
                                        <span>Không ngừng cập nhật tri thức mới, kiên trì trước bài toán khó</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>
                                        <span>Hoàn thành phần việc nhóm đúng hạn, không để người khác gánh</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-6 pt-4 border-t border-surface-variant flex items-center justify-between">
                                <span className="font-label-md text-label-md text-primary-container uppercase tracking-wider font-semibold">
                                    Nỗ lực đúng chỗ, bền bỉ có kế hoạch
                                </span>
                                <Link to="/practice" className="flex items-center gap-1 text-xs text-primary font-medium group-hover:text-secondary-container transition-colors">
                                    <span>Rèn luyện</span>
                                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                            </div>
                        </div>

                        {/* KIỆM — Tall Card */}
                        <div className="lg:col-span-4 bg-surface-container-lowest border border-surface-variant rounded-xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,33,71,0.08)] hover:border-primary flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded bg-surface-variant text-primary flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-[26px] animate-[hourglass_4s_ease-in-out_infinite]">savings</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">
                                    KIỆM — Tiết Kiệm, Không Xa Xỉ
                                </h3>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-3">
                                    <b>Định nghĩa:</b> Kiệm là tiết kiệm, không xa xỉ, không hoang phí, không bừa bãi.
                                </p>
                                <ul className="space-y-2 text-on-surface-variant text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">check_circle</span>
                                        <span>Tiết kiệm sức lao động, thời giờ, tiền của</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">check_circle</span>
                                        <span>Không phô trương hình thức, không sử dụng nguồn lực hoang phí</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">check_circle</span>
                                        <span>Quản lý tài chính: phân biệt "cần" và "muốn"</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">check_circle</span>
                                        <span>Tiết kiệm sự tập trung — không bị cuốn vào mạng xã hội khi học</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-6 pt-4 border-t border-surface-variant">
                                <div className="flex flex-wrap gap-2">
                                    <span className="ethics-tag kiem">Quản lý Thời gian</span>
                                    <span className="ethics-tag kiem">Quản lý Tài chính</span>
                                    <span className="ethics-tag kiem">Tiết kiệm Sự chú ý</span>
                                </div>
                            </div>
                        </div>

                        {/* LIÊM — Square Card */}
                        <div className="lg:col-span-6 bg-surface-container-lowest border border-surface-variant rounded-xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,33,71,0.08)] hover:border-primary flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded bg-surface-variant text-primary flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-[26px] animate-[wiggle_3s_ease-in-out_infinite]">balance</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">
                                    LIÊM — Trong Sạch, Không Tham Lam
                                </h3>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-3">
                                    <b>Định nghĩa:</b> Liêm là trong sạch, không tham lam. Không chỉ là không tham tiền mà còn là không tham địa vị, tiền tài, sung sướng hay sự tâng bốc.
                                </p>
                                <div className="bg-primary-container/5 border border-primary/10 rounded-lg p-4 mt-2">
                                    <p className="text-sm text-primary italic font-medium leading-relaxed">
                                        "Chỉ có một thứ ham là ham học, ham làm, ham tiến bộ."
                                    </p>
                                    <p className="text-xs text-on-surface-variant mt-2">— Hồ Chí Minh, Toàn tập, t.6, tr.126</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-surface-variant flex justify-between items-center">
                                <span className="text-xs text-outline font-mono">Ham học, ham làm, ham tiến bộ</span>
                                <Link to="/register" className="text-xs text-primary font-medium hover:text-secondary flex items-center gap-1">
                                    Thách thức tình huống <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                </Link>
                            </div>
                        </div>

                        {/* CHÍNH — Square Card */}
                        <div className="lg:col-span-6 bg-surface-container-lowest border border-surface-variant rounded-xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,33,71,0.08)] hover:border-primary flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded bg-primary-container text-on-primary flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-[26px] animate-[spin_12s_linear_infinite]">explore</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">
                                    CHÍNH — Thẳng Thắn, Đứng Đắn, Không Tà
                                </h3>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-3">
                                    <b>Định nghĩa:</b> Chính nghĩa là không tà, là thẳng thắn, đứng đắn. Giữ mình đúng đắn, đối xử chân thành và đặt lợi ích chung lên trên lợi ích riêng.
                                </p>
                                <div className="grid grid-cols-3 gap-2 mt-3">
                                    <div className="text-center p-2.5 bg-surface-container rounded-lg">
                                        <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                                        <p className="text-[11px] text-on-surface-variant mt-1 font-medium">Đối với mình<br/>Khiêm tốn</p>
                                    </div>
                                    <div className="text-center p-2.5 bg-surface-container rounded-lg">
                                        <span className="material-symbols-outlined text-primary text-[20px]">groups</span>
                                        <p className="text-[11px] text-on-surface-variant mt-1 font-medium">Đối với người<br/>Chân thành</p>
                                    </div>
                                    <div className="text-center p-2.5 bg-surface-container rounded-lg">
                                        <span className="material-symbols-outlined text-primary text-[20px]">task_alt</span>
                                        <p className="text-[11px] text-on-surface-variant mt-1 font-medium">Đối với việc<br/>Việc chung lên trên</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-surface-variant flex justify-between items-center">
                                <span className="text-xs text-outline font-mono">Dám nhận lỗi, đặt việc chung lên trên</span>
                                <Link to="/practice" className="text-xs text-primary font-medium hover:text-secondary flex items-center gap-1">
                                    Bật bộ lọc giá trị <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================== */}
                {/* MỐI QUAN HỆ TỔNG THỂ          */}
                {/* ============================== */}
                <section className="py-20 bg-surface-container-low border-y border-outline-variant/40">
                    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                        <div className="text-center mb-12 max-w-3xl mx-auto space-y-4">
                            <div className="inline-block px-3 py-1 rounded-full bg-secondary-container/10 text-secondary font-label-md text-xs uppercase tracking-widest">
                                Hệ thống liên kết
                            </div>
                            <h2 className="font-headline-lg text-headline-lg text-primary">Mối Quan Hệ Tổng Thể</h2>
                            <p className="font-body-lg text-body-lg text-on-surface-variant">
                                Bốn phẩm chất bổ trợ chặt chẽ cho nhau, tạo thành hệ thống giá trị thống nhất.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {/* Relationship cards */}
                            <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant hover:border-primary/30 transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-8 h-8 rounded bg-primary-container text-on-primary flex items-center justify-center text-sm font-bold">C</span>
                                        <span className="material-symbols-outlined text-outline text-[18px]">arrow_forward</span>
                                        <span className="w-8 h-8 rounded bg-surface-variant text-primary flex items-center justify-center text-sm font-bold">K</span>
                                    </div>
                                </div>
                                <h4 className="font-headline-md text-[17px] text-primary mb-2">Cần → Kiệm</h4>
                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    "Cần" giúp con người <b>tạo ra giá trị</b> bằng sự chăm chỉ và nỗ lực. "Kiệm" giúp con người <b>trân trọng, giữ gìn và sử dụng hiệu quả</b> những giá trị đã tạo ra.
                                </p>
                            </div>

                            <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant hover:border-primary/30 transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-8 h-8 rounded bg-surface-variant text-primary flex items-center justify-center text-sm font-bold">K</span>
                                        <span className="material-symbols-outlined text-outline text-[18px]">arrow_forward</span>
                                        <span className="w-8 h-8 rounded bg-surface-variant text-primary flex items-center justify-center text-sm font-bold">L</span>
                                    </div>
                                </div>
                                <h4 className="font-headline-md text-[17px] text-primary mb-2">Kiệm → Liêm</h4>
                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    "Chữ LIÊM phải đi đôi với chữ KIỆM. Cũng như chữ KIỆM phải đi với chữ CẦN. Có KIỆM mới LIÊM được." — Biết tiết chế mới giữ được sự trong sạch.
                                </p>
                            </div>
                        </div>

                        {/* Summary table */}
                        <div className="bg-surface-container-lowest rounded-xl border border-surface-variant overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-primary-container/5 border-b border-outline-variant/40">
                                            <th className="px-6 py-4 font-headline-md text-[15px] text-primary w-1/4">Chuẩn mực</th>
                                            <th className="px-6 py-4 font-headline-md text-[15px] text-primary w-1/4">Cốt lõi</th>
                                            <th className="px-6 py-4 font-headline-md text-[15px] text-primary w-1/4">Vận dụng nổi bật</th>
                                            <th className="px-6 py-4 font-headline-md text-[15px] text-primary w-1/4">Vai trò</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        <tr className="border-b border-outline-variant/30 hover:bg-surface-container-low/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="ethics-tag can">Cần</span>
                                            </td>
                                            <td className="px-6 py-4 text-on-surface-variant">Siêng năng, chăm chỉ, có kế hoạch</td>
                                            <td className="px-6 py-4 text-on-surface-variant">Nỗ lực đúng chỗ, không lười biếng</td>
                                            <td className="px-6 py-4 text-on-surface-variant font-medium">Giúp làm việc chăm chỉ</td>
                                        </tr>
                                        <tr className="border-b border-outline-variant/30 hover:bg-surface-container-low/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="ethics-tag kiem">Kiệm</span>
                                            </td>
                                            <td className="px-6 py-4 text-on-surface-variant">Tiết kiệm, không xa xỉ, không hoang phí</td>
                                            <td className="px-6 py-4 text-on-surface-variant">Quản lý thời gian & tài chính hiệu quả</td>
                                            <td className="px-6 py-4 text-on-surface-variant font-medium">Giúp sử dụng hợp lý</td>
                                        </tr>
                                        <tr className="border-b border-outline-variant/30 hover:bg-surface-container-low/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="ethics-tag liem">Liêm</span>
                                            </td>
                                            <td className="px-6 py-4 text-on-surface-variant">Trong sạch, không tham lam</td>
                                            <td className="px-6 py-4 text-on-surface-variant">Ham học, ham làm, không chạy theo lợi ích sai</td>
                                            <td className="px-6 py-4 text-on-surface-variant font-medium">Giúp giữ sự trong sạch</td>
                                        </tr>
                                        <tr className="hover:bg-surface-container-low/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="ethics-tag chinh">Chính</span>
                                            </td>
                                            <td className="px-6 py-4 text-on-surface-variant">Thẳng thắn, đứng đắn, không tà</td>
                                            <td className="px-6 py-4 text-on-surface-variant">Dám nhận lỗi, đặt việc chung lên trên việc riêng</td>
                                            <td className="px-6 py-4 text-on-surface-variant font-medium">Định hướng sống và hành động đúng đắn</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================== */}
                {/* VÍ DỤ LỊCH SỬ & THỰC TIỄN    */}
                {/* ============================== */}
                <section id="examples" className="py-24 bg-surface max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop scroll-mt-20">
                    <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
                        <div className="inline-block px-3 py-1 rounded-full bg-primary-container/10 text-primary font-label-md text-xs uppercase tracking-widest">
                            Vận dụng thực tiễn
                        </div>
                        <h2 className="font-headline-lg text-headline-lg md:text-[36px] text-primary">Từ Tư Tưởng Đến Hành Động</h2>
                        <p className="font-body-lg text-body-lg text-on-surface-variant">
                            Những minh chứng lịch sử và tình huống thực tế cho thấy Tứ Đức luôn timeless trong mọi thời đại.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* CẦN — Example */}
                        <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant hover:border-primary/30 transition-all group">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="ethics-tag can">Cần</span>
                                <span className="text-xs text-outline">Ví dụ lịch sử</span>
                            </div>
                            <h4 className="font-headline-md text-[17px] text-primary mb-2">Hồ Chí Minh — Hành trình tìm đường cứu nước (1911)</h4>
                            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                                Nguyễn Tất Thành ra đi với hai bàn tay trắng. Người vừa lao động kiếm sống (phụ bếp, quét tuyết, chụp ảnh…), vừa tự học nhiều ngoại ngữ, nghiên cứu thực tiễn xã hội nhiều quốc gia. Dù hoàn cảnh thiếu thốn, Người vẫn kiên trì theo đuổi mục tiêu giải phóng dân tộc trong suốt nhiều thập kỷ.
                            </p>
                            <div className="bg-primary-container/5 border-l-3 border-l-primary p-4 rounded-r-lg">
                                <p className="text-sm text-primary font-medium italic">
                                    "Cần" thể hiện ở sự bền bỉ, chịu khó học tập và không ngừng nỗ lực để đạt mục tiêu dù khó khăn.
                                </p>
                            </div>
                        </div>

                        {/* KIỆM — Example */}
                        <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant hover:border-secondary/30 transition-all group">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="ethics-tag kiem">Kiệm</span>
                                <span className="text-xs text-outline">Ví dụ lịch sử</span>
                            </div>
                            <h4 className="font-headline-md text-[17px] text-primary mb-2">Hũ gạo kháng chiến (1945–1954)</h4>
                            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                                Phong trào vận động người dân tiết kiệm một vốc gạo mỗi bữa để đóng góp cho bộ đội và đồng bào khó khăn. Từ những hạt gạo nhỏ, hàng triệu người tạo ra nguồn lực to lớn nuôi sống kháng chiến.
                            </p>
                            <div className="bg-secondary-container/5 border-l-3 border-l-secondary p-4 rounded-r-lg">
                                <p className="text-sm text-secondary font-medium italic">
                                    "Kiệm" ở cấp độ tập thể: biết tiết chế nhu cầu cá nhân để tạo ra giá trị chung. Tiết kiệm không phải bủn xỉn mà là dùng đúng mức, đúng nơi.
                                </p>
                            </div>
                        </div>

                        {/* LIÊM — Example */}
                        <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant hover:border-secondary/30 transition-all group">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="ethics-tag liem">Liêm</span>
                                <span className="text-xs text-outline">Ví dụ lịch sử</span>
                            </div>
                            <h4 className="font-headline-md text-[17px] text-primary mb-2">Hồ Chí Minh — Từ chối đặc quyền</h4>
                            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                                Trong kháng chiến, Người từ chối nhận lương cao, không dùng đặc quyền chức vụ cho lợi ích cá nhân. Người nêu gương: người cán bộ phải trong sạch, công tâm, không tham địa vị lẫn vật chất.
                            </p>
                            <div className="bg-surface-container border-l-3 border-l-on-surface-variant p-4 rounded-r-lg">
                                <p className="text-sm text-on-surface-variant font-medium italic">
                                    Liêm thể hiện ở việc từ chối những gì không thuộc về mình, dù không ai nhìn thấy. Hành động xuất phát từ lương tâm, không phải từ sợ bị phát hiện.
                                </p>
                            </div>
                        </div>

                        {/* CHÍNH — Example */}
                        <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant hover:border-primary/30 transition-all group">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="ethics-tag chinh">Chính</span>
                                <span className="text-xs text-outline">Ví dụ lịch sử</span>
                            </div>
                            <h4 className="font-headline-md text-[17px] text-primary mb-2">Hồ Chí Minh — Phê bình và tự phê bình</h4>
                            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                                Người luôn nêu cao tinh thần tự phê bình trong Đảng, không bao che cho cán bộ sai phạm kể cả cán bộ thân cận. Người nhấn mạnh: "Đối với mình phải khiêm tốn, không tự kiêu tự đại; đối với người phải chân thành, khiêm tốn."
                            </p>
                            <div className="bg-primary-container/5 border-l-3 border-l-primary p-4 rounded-r-lg">
                                <p className="text-sm text-primary font-medium italic">
                                    Chính không phải là luôn nói thẳng — mà là sống đúng trong cả suy nghĩ, lời nói và hành động; có trách nhiệm với những gì mình làm.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================== */}
                {/* VẬN DỤNG CHO SINH VIÊN HÔM NAY */}
                {/* ============================== */}
                <section className="py-20 bg-surface-container-low border-y border-outline-variant/40">
                    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                            <div>
                                <span className="text-secondary font-semibold uppercase text-xs tracking-wider">Thực tiễn sinh viên</span>
                                <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Vận Dụng Cho Sinh Viên Hôm Nay</h2>
                            </div>
                            <Link
                                to="/practice"
                                className="inline-flex items-center gap-2 text-primary font-label-md hover:text-secondary transition-colors"
                            >
                                <span>Thực hành ngay</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Cần for students */}
                            <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant hover:border-primary/40 transition-all shadow-sm">
                                <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined">school</span>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="ethics-tag can">Cần</span>
                                </div>
                                <ul className="space-y-2 text-sm text-on-surface-variant">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>Học tập có kế hoạch: lịch học, lịch ôn thi rõ ràng; không học dồn</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>Chủ động nghiên cứu, không lạm dụng AI làm bài thay</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>Lập kế hoạch học tập, rèn thói quen đặt mục tiêu</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Kiệm for students */}
                            <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant hover:border-secondary/40 transition-all shadow-sm">
                                <div className="w-10 h-10 rounded-lg bg-secondary-container/10 text-secondary flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined">savings</span>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="ethics-tag kiem">Kiệm</span>
                                </div>
                                <ul className="space-y-2 text-sm text-on-surface-variant">
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-0.5">•</span>
                                        <span>Lập ngân sách chi tiêu hàng tháng; phân biệt "cần" và "muốn"</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-0.5">•</span>
                                        <span>Tiết kiệm thời gian: ưu tiên việc quan trọng trước</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-0.5">•</span>
                                        <span>Tắt điện khi không dùng, hạn chế lãng phí thức ăn</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Liêm for students */}
                            <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant hover:border-secondary/40 transition-all shadow-sm">
                                <div className="w-10 h-10 rounded-lg bg-secondary-container/10 text-secondary flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined">verified</span>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="ethics-tag liem">Liêm</span>
                                </div>
                                <ul className="space-y-2 text-sm text-on-surface-variant">
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-0.5">•</span>
                                        <span>Không gian lận thi cử, không đạo văn, không chạy điểm</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-0.5">•</span>
                                        <span>Không nhận công khi chưa đóng góp thực tế</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-0.5">•</span>
                                        <span>Trước mỗi lợi ích, tự hỏi: "Điều này có phù hợp với sự trong sạch của mình không?"</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Chính for students */}
                            <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant hover:border-primary/40 transition-all shadow-sm">
                                <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined">gpp_good</span>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="ethics-tag chinh">Chính</span>
                                </div>
                                <ul className="space-y-2 text-sm text-on-surface-variant">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>Học tập trung thực: không gian lận dù thi tự luận hay trắc nghiệm</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>Dám nhận lỗi khi sai, không đổ lỗi cho người khác</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>Giữ thái độ chân thành, khiêm tốn; đặt việc chung lên trên việc riêng</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================== */}
                {/* TÌNH HUỐNG KỶ NGUYÊN SỐ       */}
                {/* ============================== */}
                <section className="py-20 bg-surface max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                        <div>
                            <span className="text-secondary font-semibold uppercase text-xs tracking-wider">Thách thức hiện đại</span>
                            <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Tình Huống Đạo Đức Số</h2>
                        </div>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 text-primary font-label-md hover:text-secondary transition-colors"
                        >
                            <span>Xem tất cả tình huống</span>
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant hover:border-primary/40 transition-all shadow-sm">
                            <div className="w-10 h-10 rounded-lg bg-secondary-container/10 text-secondary flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined">smart_toy</span>
                            </div>
                            <h4 className="font-headline-md text-[18px] text-primary mb-2">Sử dụng AI trong nghiên cứu</h4>
                            <p className="text-body-md text-on-surface-variant text-sm leading-relaxed mb-4">
                                Ranh giới giữa việc dùng AI để mở rộng ý tưởng và việc chép nguyên văn sản phẩm của AI để nộp bài là gì?
                            </p>
                            <div className="pt-3 border-t border-surface-variant/60 flex items-center justify-between text-xs text-outline">
                                <span>Chuẩn mực: <b>Cần & Liêm</b></span>
                                <span className="text-secondary font-medium">Chi tiết &rarr;</span>
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant hover:border-primary/40 transition-all shadow-sm">
                            <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined">history_edu</span>
                            </div>
                            <h4 className="font-headline-md text-[18px] text-primary mb-2">Bản quyền & Đạo văn số</h4>
                            <p className="text-body-md text-on-surface-variant text-sm leading-relaxed mb-4">
                                Trích dẫn đúng quy chuẩn không chỉ là tuân thủ quy định, mà là sự tôn trọng chất xám và mồ hôi của người nghiên cứu trước.
                            </p>
                            <div className="pt-3 border-t border-surface-variant/60 flex items-center justify-between text-xs text-outline">
                                <span>Chuẩn mực: <b>Liêm</b></span>
                                <span className="text-secondary font-medium">Chi tiết &rarr;</span>
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant hover:border-primary/40 transition-all shadow-sm">
                            <div className="w-10 h-10 rounded-lg bg-secondary-container/10 text-secondary flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined">forum</span>
                            </div>
                            <h4 className="font-headline-md text-[18px] text-primary mb-2">Văn hóa ứng xử không gian mạng</h4>
                            <p className="text-body-md text-on-surface-variant text-sm leading-relaxed mb-4">
                                Giữ gìn lời nói chuẩn mực, sự trung thực và lòng thấu hiểu khi thảo luận hoặc chia sẻ thông tin trực tuyến.
                            </p>
                            <div className="pt-3 border-t border-surface-variant/60 flex items-center justify-between text-xs text-outline">
                                <span>Chuẩn mực: <b>Chính & Kiệm</b></span>
                                <span className="text-secondary font-medium">Chi tiết &rarr;</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================== */}
                {/* CTA BANNER                     */}
                {/* ============================== */}
                <section className="py-16 bg-primary-container text-on-primary">
                    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center space-y-6">
                        <h2 className="font-headline-lg text-headline-lg md:text-[36px] text-on-primary">
                            Sẵn sàng rèn luyện cùng Đạo Đức Học Đường?
                        </h2>
                        <p className="font-body-lg text-on-primary-container max-w-2xl mx-auto">
                            Bắt đầu hành trình tự đánh giá và duy trì thói quen đạo đức mỗi ngày với bảng điều khiển cá nhân hóa.
                        </p>
                        <div className="pt-4 flex justify-center gap-4">
                            <Link
                                to="/practice"
                                className="bg-secondary-container text-on-secondary-container font-label-md px-8 py-3.5 rounded font-bold hover:brightness-110 transition-all shadow-lg active:scale-95"
                            >
                                Bắt đầu nhật ký rèn luyện
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
