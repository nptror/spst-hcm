import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';

const Result = () => {
    const navigate = useNavigate();
    const studentName = localStorage.getItem('student_name') || 'Minh';

    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col font-body-md text-body-md relative selection:bg-secondary-fixed selection:text-on-secondary-fixed">
            <Header />

            {/* Main Content Canvas */}
            <main className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-12 md:py-20 relative">
                {/* Decorative Watermark */}
                <div className="absolute top-20 right-20 w-64 h-64 opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/AP1WRLsOkrIqqqVkVfTRM8l2GLoGtlizHrUrSHHAA-IGZbkXjiFVNwj8WBZmLgDfMUQgrZDD4mHsT4UXWBFRZh2QzSkYVy2zNOnP5FgKm03kezR5_caGmU6EQ42kQcIM5XgebvI9RtRuyDB6C1O21qP0Q-OUz0mEgMPd2jPQdwWQ4p0xCTdEtDc48yTPZ1YNVg7CPkbyjMqL0zFGf_dQdHzkdsFB0l4wc0EwP9Gf7vlGTVFXWxIpLvOb_VgTkPE')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
                
                <div className="space-y-12 pb-24">
                    {/* Header Section */}
                    <header className="border-b border-surface-variant pb-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <span className="inline-block px-3 py-1 bg-surface-variant text-on-surface-variant text-label-md font-label rounded uppercase mb-4 tracking-widest">KẾT QUẢ TUẦN</span>
                                <h1 className="text-display-lg font-display text-[32px] md:text-[40px] font-bold text-primary tracking-tight">Tổng Kết Hành Trình: {studentName}</h1>
                                <p className="text-body-lg text-on-surface-variant mt-4 max-w-2xl leading-relaxed">
                                    Dựa trên các quyết định của bạn trong suốt 7 ngày qua, hệ thống đã phân tích và lập chỉ số hành động đạo đức dựa trên 4 giá trị cốt lõi: Cần, Kiệm, Liêm, Chính.
                                </p>
                            </div>
                            <div className="flex-shrink-0 bg-surface-container-lowest p-6 rounded-lg border border-surface-variant lift-on-hover transition-all">
                                <div className="text-label-md text-on-surface-variant uppercase tracking-widest mb-2 text-center text-xs">Điểm Hiệu Quả Thực Tế</div>
                                <div className="text-display-lg font-bold text-secondary text-center leading-none text-[48px]">92<span className="text-headline-md text-2xl">%</span></div>
                            </div>
                        </div>
                    </header>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Radar Chart Cell */}
                        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl border border-surface-variant p-8 flex flex-col items-center justify-center lift-on-hover transition-all relative overflow-hidden">
                            <h3 className="text-headline-md text-primary font-bold mb-8 w-full text-left">Chỉ số Đạo đức</h3>
                            {/* Simple CSS Radar Representation */}
                            <div className="relative w-64 h-64 radar-chart-bg rounded-full flex items-center justify-center mb-8">
                                {/* Axis Lines */}
                                <div className="absolute w-full h-px bg-outline-variant/30"></div>
                                <div className="absolute h-full w-px bg-outline-variant/30"></div>
                                {/* Data Shape (Simplified Hexagon for visual) */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                    <polygon fill="rgba(144, 77, 0, 0.2)" points="50,15 85,50 50,90 20,50" stroke="#904d00" strokeJoin="round" strokeWidth="2"></polygon>
                                </svg>
                                {/* Labels */}
                                <div className="absolute top-2 text-label-md font-bold text-primary text-xs">CHÍNH</div>
                                <div className="absolute bottom-2 text-label-md font-bold text-primary text-xs">KIỆM</div>
                                <div className="absolute right-2 text-label-md font-bold text-primary text-xs">CẦN</div>
                                <div className="absolute left-2 text-label-md font-bold text-primary text-xs">LIÊM</div>
                                {/* Points */}
                                <div className="absolute top-[15%] w-3 h-3 bg-secondary rounded-full"></div>
                                <div className="absolute right-[15%] top-[50%] -mt-1.5 w-3 h-3 bg-secondary rounded-full"></div>
                                <div className="absolute bottom-[10%] w-3 h-3 bg-secondary rounded-full"></div>
                                <div className="absolute left-[20%] top-[50%] -mt-1.5 w-3 h-3 bg-secondary rounded-full"></div>
                            </div>
                        </div>

                        {/* Titles & Achievements Cell */}
                        <div className="lg:col-span-7 space-y-8 flex flex-col">
                            {/* Primary Title Card */}
                            <div className="bg-primary text-on-primary rounded-xl p-8 flex-grow flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10">
                                    <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                                </div>
                                <div className="relative z-10">
                                    <div className="text-label-md uppercase tracking-widest text-primary-fixed-dim mb-4 text-xs">Danh Hiệu Đạt Được</div>
                                    <h2 className="text-headline-lg font-display font-bold mb-4 text-2xl">NGƯỜI GIỮ NGUYÊN TẮC</h2>
                                    <p className="text-body-lg text-on-primary-container max-w-lg leading-relaxed">
                                        Dành cho người luôn trung thực ngay cả khi không ai giám sát, không thiên vị bạn thân và đặt sự trong sạch lên hàng đầu.
                                    </p>
                                </div>
                            </div>

                            {/* Special Achievement Card */}
                            <div className="ethos-blockquote rounded-r-xl p-8 border border-surface-variant border-l-0 relative">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                                    </div>
                                    <div>
                                        <div className="text-label-md uppercase tracking-widest text-secondary-container mb-2 font-bold text-xs">Thành Tựu Đặc Biệt</div>
                                        <h3 className="text-headline-md text-primary font-bold mb-2">Ánh Sáng Trong Bóng Tối</h3>
                                        <p className="text-body-md text-on-surface-variant">
                                            Bạn đã chọn đúng tính Liêm ở tất cả các tình huống "không ai nhìn thấy". Khả năng duy trì chuẩn mực đạo đức khi ở một mình là minh chứng cao nhất của sự liêm chính.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Breakdown Section */}
                    <section className="mt-16">
                        <h3 className="text-headline-md text-primary font-bold mb-8 border-b border-surface-variant pb-4">Hồ Sơ Quyết Định Nổi Bật</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Decision Card 1 */}
                            <div className="bg-surface-container-lowest p-6 rounded-lg border border-surface-variant hover:border-primary lift-on-hover transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-2 py-1 bg-surface-variant text-on-surface-variant text-xs font-bold uppercase rounded">Tình Huống #12</span>
                                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                                </div>
                                <h4 className="text-body-lg font-bold text-primary mb-2">Từ chối thiên vị</h4>
                                <p className="text-body-md text-on-surface-variant text-sm mb-4">Lựa chọn đánh giá công bằng bài tập nhóm của bạn thân mặc dù có nguy cơ mất lòng.</p>
                                <div className="flex items-center gap-2 text-label-md text-secondary font-bold text-xs">
                                    <span className="material-symbols-outlined text-sm">trending_up</span>
                                    +15 Điểm CHÍNH
                                </div>
                            </div>

                            {/* Decision Card 2 */}
                            <div className="bg-surface-container-lowest p-6 rounded-lg border border-surface-variant hover:border-primary lift-on-hover transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-2 py-1 bg-surface-variant text-on-surface-variant text-xs font-bold uppercase rounded">Tình Huống #05</span>
                                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                                </div>
                                <h4 className="text-body-lg font-bold text-primary mb-2">Báo cáo trung thực</h4>
                                <p className="text-body-md text-on-surface-variant text-sm mb-4">Chủ động báo cáo lỗi sai của bản thân trong dự án chung trước khi bị phát hiện.</p>
                                <div className="flex items-center gap-2 text-label-md text-secondary font-bold text-xs">
                                    <span className="material-symbols-outlined text-sm">trending_up</span>
                                    +20 Điểm LIÊM
                                </div>
                            </div>

                            {/* Decision Card 3 */}
                            <div className="bg-surface-container-lowest p-6 rounded-lg border border-surface-variant hover:border-primary lift-on-hover transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-2 py-1 bg-surface-variant text-on-surface-variant text-xs font-bold uppercase rounded">Tình Huống #18</span>
                                    <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 1" }}>remove</span>
                                </div>
                                <h4 className="text-body-lg font-bold text-primary mb-2">Lãng phí tài nguyên</h4>
                                <p className="text-body-md text-on-surface-variant text-sm mb-4">Lựa chọn sử dụng quá mức ngân sách cho phép vào những hạng mục không thiết yếu.</p>
                                <div className="flex items-center gap-2 text-label-md text-outline font-bold text-xs">
                                    <span className="material-symbols-outlined text-sm">trending_down</span>
                                    -5 Điểm KIỆM
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-12 border-t border-surface-variant justify-center sm:justify-start">
                        <button className="px-8 py-4 bg-primary text-on-primary rounded font-label text-label-md uppercase tracking-widest hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                            <span className="material-symbols-outlined text-sm">share</span>
                            Chia Sẻ Kết Quả
                        </button>
                        <button onClick={() => navigate('/ranking')} className="px-8 py-4 bg-surface text-primary border border-primary rounded font-label text-label-md uppercase tracking-widest hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 cursor-pointer">
                            <span className="material-symbols-outlined text-sm">leaderboard</span>
                            Bảng Xếp Hạng
                        </button>
                        <button onClick={() => navigate('/challenge')} className="px-8 py-4 bg-surface text-secondary border border-secondary rounded font-label text-label-md uppercase tracking-widest hover:bg-secondary-fixed/10 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                            <span className="material-symbols-outlined text-sm">replay</span>
                            Thử Thách Lại
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Result;
