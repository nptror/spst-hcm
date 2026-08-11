import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import heroImage from "../assets/hero.jpg";

// Biến bộ nhớ chỉ reset khi trình duyệt F5 / Refresh / Tải lại trang
let isInitialBrowserLoad = true;

const LandingPage = () => {
    // ----------------------------------------------------
    // SPLASH SCREEN LOGIC: Chỉ bật khi tải lại trang / vào trang lần đầu
    // Không bật khi chuyển trang nội bộ (Client-side routing)
    // ----------------------------------------------------
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

        // Khóa cuộn trang khi splash đang chạy
        document.body.style.overflow = 'hidden';

        // Mô phỏng tiến trình tải dữ liệu mượt mà (Smooth 1.2s progress animation)
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                // Tăng từ từ 2-5% mỗi 25ms để chuyển động mịn màng rõ rệt
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

    // Khi progress đạt 100%, kích hoạt hiệu ứng rèm kéo
    useEffect(() => {
        if (progress === 100 && showSplash) {
            const timer1 = setTimeout(() => {
                setIsContentHidden(true); // Mờ & thu nhẹ nội dung chữ trên splash
            }, 300);

            const timer2 = setTimeout(() => {
                setIsCurtainUp(true); // Trượt rèm lên trên (Curtain Slide Up)
            }, 600);

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

    // Hàm bỏ qua Splash screen ngay lập tức
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
            {/* SPLASH SCREEN OVERLAY (Màn hình rèm kéo 2 lớp)      */}
            {/* ================================================== */}
            {showSplash && (
                <div id="splash-screen" className="fixed inset-0 z-[100] pointer-events-auto select-none">
                    {/* Lớp rèm phụ màu cam/nâu đệm phía sau */}
                    <div
                        className={`curtain-layer absolute inset-0 bg-secondary-container z-0 ${isCurtainUp ? 'curtain-up-back' : ''
                            }`}
                    ></div>

                    {/* Lớp rèm chính màu Navy chứa nội dung Splash */}
                    <div
                        className={`curtain-layer absolute inset-0 bg-primary-container z-10 flex flex-col items-center justify-center text-center px-4 shadow-2xl ${isCurtainUp ? 'curtain-up-main' : ''
                            }`}
                    >
                        {/* Nút bỏ qua nhanh ở góc trên */}
                        <button
                            onClick={handleSkipSplash}
                            className="absolute top-6 right-6 text-xs text-on-primary-container hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full transition-all border border-white/10 flex items-center gap-1 cursor-pointer"
                        >
                            <span>Bỏ qua</span>
                            <span className="material-symbols-outlined text-[14px]">fast_forward</span>
                        </button>

                        <div
                            className={`space-y-6 max-w-lg transition-all duration-500 transform ${isContentHidden ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                                }`}
                        >
                            {/* Subtitle Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-variant/10 border border-white/10">
                                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                                <span className="font-label-md text-xs text-secondary-fixed uppercase tracking-widest">Nền tảng học thuật</span>
                            </div>

                            {/* Tiêu đề Text Reveal từ Mask */}
                            <div className="overflow-hidden py-1">
                                <h1 className="font-headline-lg text-[34px] sm:text-[44px] md:text-display-lg font-bold text-on-primary tracking-tight animate-[textRise_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                                    Đạo Đức Học Đường
                                </h1>
                            </div>

                            {/* Ultra Progress Bar phát sáng & Shimmer */}
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

            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative w-full min-h-[82vh] flex items-center justify-center overflow-hidden border-b border-outline-variant">
                    {/* Background Image với Overlay */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/80 to-surface/40 z-10"></div>
                        <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
                            style={{
                                backgroundImage: `url(${heroImage})`,
                            }}
                        ></div>
                    </div>

                    <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center py-12">
                        <div className="lg:col-span-8 space-y-8 bg-white/85 backdrop-blur-[12px] border border-white/30 p-8 md:p-12 rounded-2xl shadow-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary-container/10 border border-secondary/20">
                                <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
                                <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">Triết lý cốt lõi</span>
                            </div>

                            <h1 className="font-display-lg text-display-lg md:text-[56px] md:leading-[64px] text-primary tracking-tight">
                                Đạo đức là gốc,
                                <br />
                                <span className="text-secondary-container">Hành động là thước đo</span>
                            </h1>

                            <div className="border-l-4 border-l-secondary-container bg-[#FFF9F2] p-6 rounded-r-lg shadow-sm max-w-3xl">
                                <p className="font-blockquote text-blockquote text-on-surface-variant leading-relaxed italic">
                                    "Trong kỷ nguyên số, khi sự cám dỗ và tính cá nhân hóa lên ngôi, liệu các chuẩn mực này có thể được diễn giải và vận dụng như thế nào để trở thành 'bộ lọc' giá trị cho sinh viên?"
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <a
                                    href="#norms"
                                    className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3.5 rounded shadow-md hover:bg-primary-container hover:shadow-lg transition-all active:scale-95 duration-100 flex items-center gap-2"
                                >
                                    Khám phá triết lý
                                    <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                                </a>
                                <Link
                                    to="/practice"
                                    className="bg-transparent text-primary font-label-md text-label-md px-8 py-3.5 rounded border-2 border-primary hover:bg-surface-container-low transition-all active:scale-95 duration-100 flex items-center gap-2"
                                >
                                    <span class="material-symbols-outlined text-[18px]">checklist</span>
                                    Thực hành ngay
                                </Link>
                                <Link
                                    to="/challenge"
                                    className="bg-secondary-container/10 text-secondary border border-secondary-container/30 font-label-md text-label-md px-6 py-3.5 rounded hover:bg-secondary-container/20 transition-all flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">psychology</span>
                                    Tình huống thực tế
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Deep Dive: 4 Chuẩn mực (Bento Grid) */}
                <section id="norms" className="py-24 bg-surface max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop scroll-mt-20">
                    <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
                        <div className="inline-block px-3 py-1 rounded-full bg-primary-container/10 text-primary font-label-md text-xs uppercase tracking-widest">
                            Hệ giá trị cốt lõi
                        </div>
                        <h2 className="font-headline-lg text-headline-lg md:text-[36px] text-primary">Tứ Đức Trong Kỷ Nguyên Số</h2>
                        <p className="font-body-lg text-body-lg text-on-surface-variant">
                            Hệ giá trị Cần - Kiệm - Liêm - Chính được tái định nghĩa qua lăng kính của môi trường học thuật hiện đại và thế giới số.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter auto-rows-[minmax(280px,auto)]">
                        {/* Cần (Wide Card) */}
                        <div className="lg:col-span-8 bg-surface-container-lowest border border-surface-variant rounded-xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,33,71,0.08)] hover:border-primary flex flex-col justify-between group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-container/5 rounded-bl-[120px] -z-10 transition-transform group-hover:scale-110 duration-500"></div>
                            <div>
                                <div className="w-12 h-12 rounded bg-primary-container text-on-primary flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-[26px] animate-[float_4s_ease-in-out_infinite]">school</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">
                                    Cần (Sự Chăm Chỉ Trí Óc)
                                </h3>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                    Trong môi trường học thuật số, Cần không chỉ là cặm cụi đọc sách, mà là nỗ lực chủ động nghiên cứu, không ngừng cập nhật tri thức mới, và kiên trì trước những bài toán khó. Nó là thái độ nghiêm túc với con đường học vấn, chống lại sự lười biếng và tư duy "đi đường tắt" (như lạm dụng AI làm bài hộ mà không suy nghĩ độc lập).
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-surface-variant flex items-center justify-between">
                                <span className="font-label-md text-label-md text-primary-container uppercase tracking-wider font-semibold">
                                    Lao động trí óc độc lập
                                </span>
                                <Link to="/practice" className="flex items-center gap-1 text-xs text-primary font-medium group-hover:text-secondary-container transition-colors">
                                    <span>Rèn luyện Cần</span>
                                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                            </div>
                        </div>

                        {/* Kiệm (Tall Card) */}
                        <div className="lg:col-span-4 bg-surface-container-lowest border border-surface-variant rounded-xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,33,71,0.08)] hover:border-primary flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded bg-surface-variant text-primary flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-[26px] animate-[hourglass_4s_ease-in-out_infinite]">hourglass_empty</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">
                                    Kiệm (Tiết Kiệm Sự Chú Ý)
                                </h3>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                    Với sinh viên hiện đại, Kiệm quan trọng nhất là tiết kiệm thời gian và sự tập trung. Trong thế giới ngập tràn mạng xã hội, biết "tiết kiệm" sự chú ý cho những việc có ích, quản lý quỹ thời gian học tập hiệu quả là biểu hiện cốt lõi của Kiệm.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-surface-variant">
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2.5 py-1 bg-surface-container rounded text-[12px] font-medium text-on-surface-variant border border-outline-variant/30">
                                        Quản lý Thời gian
                                    </span>
                                    <span className="px-2.5 py-1 bg-surface-container rounded text-[12px] font-medium text-on-surface-variant border border-outline-variant/30">
                                        Tiết kiệm Sự chú ý
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Liêm (Square Card) */}
                        <div className="lg:col-span-6 bg-surface-container-lowest border border-surface-variant rounded-xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,33,71,0.08)] hover:border-primary flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded bg-surface-variant text-primary flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-[26px] animate-[wiggle_3s_ease-in-out_infinite]">balance</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">
                                    Liêm (Liêm Chính Học Thuật)
                                </h3>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                    Nền tảng của liêm chính học thuật (Academic Integrity). Liêm là sự trung thực trong thi cử, không đạo văn, tôn trọng bản quyền tri thức của người khác. Đòi hỏi sinh viên phải giữ được sự trong sạch trước áp lực điểm số và từ chối gian lận dưới mọi hình thức.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-surface-variant flex justify-between items-center">
                                <span className="text-xs text-outline font-mono">Tôn trọng tri thức</span>
                                <Link to="/challenge" className="text-xs text-primary font-medium hover:text-secondary flex items-center gap-1">
                                    Thách thức tình huống <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                </Link>
                            </div>
                        </div>

                        {/* Chính (Square Card) */}
                        <div className="lg:col-span-6 bg-surface-container-lowest border border-surface-variant rounded-xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,33,71,0.08)] hover:border-primary flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded bg-primary-container text-on-primary flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-[26px] animate-[spin_12s_linear_infinite]">explore</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">
                                    Chính (Sự Ngay Thẳng & Trách Nhiệm)
                                </h3>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                    Chính là hành động bảo vệ lẽ phải, sống có trách nhiệm với tập thể và cộng đồng. Người sinh viên "Chính" dám lên tiếng trước những cái sai, tuân thủ kỷ luật nhà trường, và dùng tri thức chuyên môn của mình để tạo giá trị tích cực cho xã hội.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-surface-variant flex justify-between items-center">
                                <span className="text-xs text-outline font-mono">Dũng khí học thuật</span>
                                <Link to="/practice" className="text-xs text-primary font-medium hover:text-secondary flex items-center gap-1">
                                    Bật bộ lọc giá trị <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Tình huống Kỷ Nguyên Số (Interactive Preview) */}
                <section className="py-20 bg-surface-container-low border-y border-outline-variant/40">
                    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                            <div>
                                <span className="text-secondary font-semibold uppercase text-xs tracking-wider">Thực tiễn sinh viên</span>
                                <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Góc Nhìn & Tình Huống Đạo Đức Số</h2>
                            </div>
                            <Link
                                to="/challenge"
                                className="inline-flex items-center gap-2 text-primary font-label-md hover:text-secondary transition-colors"
                            >
                                <span>Xem tất cả tình huống</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1 */}
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

                            {/* Card 2 */}
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

                            {/* Card 3 */}
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
                    </div>
                </section>

                {/* Banner CTA */}
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

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;
