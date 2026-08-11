import Header from '../component/Header';
import Footer from '../component/Footer';

const LandingPage = () => {
    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col font-body-md text-body-md">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-outline-variant">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/70 to-surface/40 z-10"></div>
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBi82NpyM2nZLFTgoYFMX6I3B4ThjJXc-0F14LPyQOutK8Qr4bm9_5d9EeGzzGd8n9unS7MptZ_2x0JtLBG0kJ8ix20Cl1rocQsFVEv41rlQkoRaJOp3npQG23UqV2_Gj8XO81NXJ2rA-Uwj-KUCiOIxFpgkjtGeFhizafdcGOsqlJA02EDZZ7DKTQANoG2oFeWy2D46l99iwKC5b0t3WVFQd9mf5-5iznr3fmNAfypZ9LSQuOJ4oPR')",
                            }}
                        ></div>
                    </div>
                    <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
                        <div className="lg:col-span-8 space-y-8 bg-white/85 backdrop-blur-[12px] border border-white/30 p-8 md:p-12 rounded-xl shadow-lg">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary-container/10 border border-secondary/20">
                                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                                <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">Triết lý cốt lõi</span>
                            </div>
                            <h1 className="font-display-lg text-display-lg md:text-[56px] md:leading-[64px] text-primary tracking-tight">
                                Đạo đức là gốc,
                                <br />
                                <span className="text-secondary-container">Hành động là thước đo</span>
                            </h1>
                            <div className="border-l-4 border-l-secondary-container bg-[#FFF9F2] p-6 rounded-r-lg shadow-sm max-w-3xl">
                                <p className="font-blockquote text-blockquote text-on-surface-variant leading-relaxed">
                                    "Trong kỷ nguyên số, khi sự cám dỗ và tính cá nhân hóa lên ngôi, liệu các chuẩn mực này có thể được diễn giải và vận dụng như thế nào để trở thành 'bộ lọc' giá trị cho sinh viên?"
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3.5 rounded shadow-md hover:bg-primary-container hover:shadow-lg transition-all active:scale-95 duration-100 flex items-center gap-2">
                                    Khám phá triết lý
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </button>
                                <button className="bg-transparent text-primary font-label-md text-label-md px-8 py-3.5 rounded border-2 border-primary hover:bg-surface-container-low transition-all active:scale-95 duration-100">
                                    Thực hành ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Deep Dive: 4 Chuẩn mực (Bento Grid) */}
                <section id="norms" className="py-24 bg-surface max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop scroll-mt-20">
                    <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
                        <h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-primary">Tứ Đức Trong Kỷ Nguyên Số</h2>
                        <p className="font-body-lg text-body-lg text-on-surface-variant">Hệ giá trị cốt lõi Cần - Kiệm - Liêm - Chính được tái định nghĩa qua lăng kính của môi trường học thuật hiện đại.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter auto-rows-[minmax(280px,auto)]">
                        {/* Cần (Wide Card) */}
                        <div className="lg:col-span-8 bg-surface-container-lowest border border-surface-variant rounded-xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,33,71,0.05)] hover:border-primary flex flex-col justify-between group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                            <div>
                                <div className="w-12 h-12 rounded bg-primary-container text-on-primary flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-[24px]">school</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">Cần (Sự Chăm Chỉ)</h3>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                    Trong môi trường học thuật, Cần không chỉ là cặm cụi đọc sách, mà là nỗ lực chủ động nghiên cứu, không ngừng cập nhật tri thức mới, và kiên trì trước những bài toán khó. Nó là thái độ nghiêm túc với con đường học vấn, chống lại sự lười biếng và tư duy "đi đường tắt" (ví dụ: lạm dụng AI để làm bài hộ).
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-surface-variant flex items-center justify-between">
                                <span className="font-label-md text-label-md text-primary-container uppercase">Lao động trí óc</span>
                                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">arrow_outward</span>
                            </div>
                        </div>

                        {/* Kiệm (Tall Card) */}
                        <div className="lg:col-span-4 bg-surface-container-lowest border border-surface-variant rounded-xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,33,71,0.05)] hover:border-primary flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded bg-surface-variant text-primary flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-[24px]">hourglass_empty</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">Kiệm (Sự Tiết Kiệm)</h3>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                    Với sinh viên hiện đại, Kiệm quan trọng nhất là tiết kiệm thời gian và sự tập trung. Trong thế giới ngập tràn thông tin và mạng xã hội, biết "tiết kiệm" sự chú ý cho những việc có ích, quản lý quỹ thời gian học tập hiệu quả, và chi tiêu hợp lý tiền bạc của gia đình là biểu hiện của Kiệm.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-surface-variant">
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-surface-container rounded text-[12px] font-medium text-on-surface-variant border border-outline-variant/30">Thời gian</span>
                                    <span className="px-2 py-1 bg-surface-container rounded text-[12px] font-medium text-on-surface-variant border border-outline-variant/30">Sự chú ý</span>
                                </div>
                            </div>
                        </div>

                        {/* Liêm (Square Card) */}
                        <div className="lg:col-span-6 bg-surface-container-lowest border border-surface-variant rounded-xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,33,71,0.05)] hover:border-primary flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded bg-surface-variant text-primary flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-[24px]">balance</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">Liêm (Sự Trong Sạch)</h3>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                    Đây là nền tảng của liêm chính học thuật (Academic Integrity). Liêm là sự trung thực trong thi cử, không đạo văn, tôn trọng bản quyền tri thức của người khác. Nó đòi hỏi sinh viên phải giữ được "cái đầu lạnh" trước áp lực điểm số, từ chối sự gian lận dưới mọi hình thức.
                                </p>
                            </div>
                        </div>

                        {/* Chính (Square Card) */}
                        <div className="lg:col-span-6 bg-surface-container-lowest border border-surface-variant rounded-xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,33,71,0.05)] hover:border-primary flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded bg-primary-container text-on-primary flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-[24px]">explore</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">Chính (Sự Ngay Thẳng)</h3>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                    Chính là hành động bảo vệ lẽ phải, sống có trách nhiệm với tập thể (lớp học, câu lạc bộ). Người sinh viên "Chính" dám lên tiếng trước những cái sai, tuân thủ kỷ luật nhà trường, và hướng các kỹ năng chuyên môn của mình vào mục đích phục vụ cộng đồng, xã hội một cách tích cực.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
