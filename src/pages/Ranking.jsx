import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { supabase } from '../supabaseClient';

const Ranking = () => {
    const studentName = localStorage.getItem('student_name') || 'Minh';
    const [students, setStudents] = useState([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [chartData, setChartData] = useState({
        nguyenTac: { count: 0, pct: 0 },
        viecChung: { count: 0, pct: 0 },
        nangSuat: { count: 0, pct: 0 },
        canBang: { count: 0, pct: 0 },
        thucDung: { count: 0, pct: 0 }
    });

    useEffect(() => {
        const fetchRankings = async () => {
            const { data, error } = await supabase
                .from('game_sessions')
                .select('*')
                .order('progress', { ascending: false })
                .order('energy', { ascending: false })
                .limit(50);
            
            if (error) {
                console.error("Lỗi khi tải bảng xếp hạng:", error);
                setStudents([]);
                setTotalMembers(0);
                return;
            }
            
            if (data) {
                setTotalMembers(data.length);
                let counts = { nguyenTac: 0, viecChung: 0, nangSuat: 0, canBang: 0, thucDung: 0 };
                const mappedData = data.map((session, index) => {
                    const title = session.primary_title || 'Tân binh';
                    const lowerTitle = title.toLowerCase();
                    if (lowerTitle.includes('nguyên tắc')) counts.nguyenTac++;
                    else if (lowerTitle.includes('việc chung')) counts.viecChung++;
                    else if (lowerTitle.includes('năng suất')) counts.nangSuat++;
                    else if (lowerTitle.includes('cân bằng')) counts.canBang++;
                    else counts.thucDung++;

                    const hidden = Array.isArray(session.hidden_achievements) ? session.hidden_achievements : [];
                    const BADGE_META = {
                        'Ánh Sáng Trong Bóng Tối': {
                            icon: 'lightbulb',
                            bgClass: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white border border-purple-400/30',
                            desc: 'Đã đưa ra tất cả quyết định liêm chính nhất trong các tình huống thử thách đạo đức.'
                        },
                        'Deadline Slayer': {
                            icon: 'swords',
                            bgClass: 'bg-gradient-to-r from-rose-500 to-red-600 text-white border border-red-400/30',
                            desc: 'Chinh phục tất cả tình huống áp lực deadline mà không đánh đổi nguyên tắc.'
                        },
                        'Không Ai Biết': {
                            icon: 'visibility_off',
                            bgClass: 'bg-gradient-to-r from-slate-700 to-slate-900 text-white border border-slate-600/30',
                            desc: 'Đã từ chối cám dỗ khi không có ai quan sát — hành động từ lương tâm, không phải dư luận.'
                        },
                        'Không Một Xu Lãng Phí': {
                            icon: 'account_balance_wallet',
                            bgClass: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border border-emerald-400/30',
                            desc: 'Quản lý tài chính thông minh, tiết kiệm và không chi tiêu lãng phí trong suốt hành trình.'
                        },
                        'Bậc Thầy Cân Bằng': {
                            icon: 'balance',
                            bgClass: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-400/30',
                            desc: 'Hoàn thành hành trình với cả Năng lượng và Tiến độ đều đạt từ 70% trở lên.'
                        },
                        'Nhà Quản Lý Tài Ba': {
                            icon: 'payments',
                            bgClass: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white border border-amber-300/30',
                            desc: 'Kết thúc 5 ngày với số dư tài chính tối thiểu là 300.000 VNĐ.'
                        },
                        'Chiến Thần Vượt Khó': {
                            icon: 'volunteer_activism',
                            bgClass: 'bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white border border-fuchsia-400/30',
                            desc: 'Hoàn thành game khi Năng lượng hoặc Tài chính chạm mức báo động (dưới 15% hoặc 50.000 VNĐ) nhưng Tiến độ vẫn đạt trên 80%.'
                        },
                        'Chiến Lược Gia Hiệu Suất': {
                            icon: 'trending_up',
                            bgClass: 'bg-gradient-to-r from-sky-400 to-indigo-500 text-white border border-sky-300/30',
                            desc: 'Đạt điểm Tiến độ tuyệt đối (100%) khi kết thúc game.'
                        },
                    };

                    const badges = hidden.map(ach => {
                        const meta = BADGE_META[ach] || {
                            icon: 'star',
                            bgClass: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border border-purple-400/30',
                            desc: 'Huy hiệu đặc biệt.'
                        };
                        return { name: ach, icon: meta.icon, bgClass: meta.bgClass, desc: meta.desc };
                    });

                    return {
                        rank: index + 1,
                        name: session.student_name,
                        title: session.primary_title || 'Tân binh',
                        consistency: `${session.progress || 0}%`,
                        badges: badges,
                        isCurrentUser: session.student_name === studentName
                    };
                });
                
                const total = data.length || 1;
                setChartData({
                    nguyenTac: { count: counts.nguyenTac, pct: Math.round((counts.nguyenTac / total) * 100) },
                    viecChung: { count: counts.viecChung, pct: Math.round((counts.viecChung / total) * 100) },
                    nangSuat: { count: counts.nangSuat, pct: Math.round((counts.nangSuat / total) * 100) },
                    canBang: { count: counts.canBang, pct: Math.round((counts.canBang / total) * 100) },
                    thucDung: { count: counts.thucDung, pct: Math.round((counts.thucDung / total) * 100) }
                });
                
                setStudents(mappedData);
            }
        };

        fetchRankings();

        // Thiết lập Realtime Subscription
        const channel = supabase
            .channel('realtime_game_sessions')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'game_sessions' },
                (payload) => {
                    console.log('Cập nhật bảng xếp hạng realtime:', payload);
                    fetchRankings();
                }
            )
            .subscribe();

        // Cleanup channel khi component unmount
        return () => {
            supabase.removeChannel(channel);
        };
    }, [studentName]);

    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col font-body-md text-body-md relative">
            <Header />

            {/* Main Content Canvas */}
            <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-16 py-8 md:py-16">
                {/* Header Section */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-surface-variant pb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container/10 text-primary font-label text-xs font-semibold rounded uppercase tracking-widest mb-4">
                            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                            Tổng số thành viên: {totalMembers} học viên
                        </div>
                        <h1 className="text-[32px] md:text-[40px] font-bold text-primary leading-tight tracking-tight mb-4">
                            BẢNG VINH DANH
                        </h1>
                        <p className="text-[18px] text-on-surface-variant leading-[28px] max-w-3xl">
                            Khám phá hồ sơ quyết định của tập thể lớp. Biểu đồ dưới đây phản ánh sự phân bổ lý tưởng các phong cách hành xử đạo đức và hiệu suất, vinh danh những cá nhân xuất sắc nhất trong từng hạng mục.
                        </p>
                    </div>
                </div>

                {/* Upper Section: Chart Section */}
                <div className="mb-12">
                    <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-8 hover:border-primary hover:shadow-soft-lift transition-all duration-300 flex flex-col md:flex-row items-center justify-around gap-8">
                        {/* Donut Chart representation */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
                            <svg className="w-full h-full transform -rotate-90 rounded-full" viewBox="0 0 32 32">
                                <circle cx="16" cy="16" fill="#f0eded" r="16"></circle>
                                {/* Người giữ nguyên tắc */}
                                <circle cx="16" cy="16" fill="transparent" r="16" stroke="#002147" strokeDasharray={`${chartData.nguyenTac.pct} 100`} strokeWidth="32"></circle>
                                {/* Người vì việc chung */}
                                <circle cx="16" cy="16" fill="transparent" r="16" stroke="#fd8b00" strokeDasharray={`${chartData.viecChung.pct} 100`} strokeDashoffset={`-${chartData.nguyenTac.pct}`} strokeWidth="32"></circle>
                                {/* Chiến lược gia năng suất */}
                                <circle cx="16" cy="16" fill="transparent" r="16" stroke="#aec7f6" strokeDasharray={`${chartData.nangSuat.pct} 100`} strokeDashoffset={`-${chartData.nguyenTac.pct + chartData.viecChung.pct}`} strokeWidth="32"></circle>
                                {/* Người cân bằng */}
                                <circle cx="16" cy="16" fill="transparent" r="16" stroke="#c4c6cf" strokeDasharray={`${chartData.canBang.pct} 100`} strokeDashoffset={`-${chartData.nguyenTac.pct + chartData.viecChung.pct + chartData.nangSuat.pct}`} strokeWidth="32"></circle>
                                {/* Người thực dụng */}
                                <circle cx="16" cy="16" fill="transparent" r="16" stroke="#465f88" strokeDasharray={`${chartData.thucDung.pct} 100`} strokeDashoffset={`-${chartData.nguyenTac.pct + chartData.viecChung.pct + chartData.nangSuat.pct + chartData.canBang.pct}`} strokeWidth="32"></circle>
                            </svg>
                            <div className="absolute inset-0 m-auto w-3/5 h-3/5 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-inner">
                                <span className="text-[24px] font-bold text-primary">{totalMembers > 0 ? '100%' : '0%'}</span>
                            </div>
                        </div>

                        {/* Chart Legend with Percentages */}
                        <div className="flex flex-col gap-4 w-full max-w-md">
                            <h3 className="text-[18px] font-semibold text-primary mb-2 text-center md:text-left">
                                Phân bổ lý tưởng của cả lớp ({totalMembers} học viên)
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded border border-surface-variant/40">
                                    <span className="w-4 h-4 rounded bg-[#002147] flex-shrink-0"></span>
                                    <div>
                                        <div className="text-xs text-on-surface-variant font-medium">Nguyên tắc</div>
                                        <div className="text-sm font-bold text-primary">{chartData.nguyenTac.pct}% ({chartData.nguyenTac.count} HV)</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded border border-surface-variant/40">
                                    <span className="w-4 h-4 rounded bg-[#fd8b00] flex-shrink-0"></span>
                                    <div>
                                        <div className="text-xs text-on-surface-variant font-medium">Vì việc chung</div>
                                        <div className="text-sm font-bold text-primary">{chartData.viecChung.pct}% ({chartData.viecChung.count} HV)</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded border border-surface-variant/40">
                                    <span className="w-4 h-4 rounded bg-[#aec7f6] flex-shrink-0"></span>
                                    <div>
                                        <div className="text-xs text-on-surface-variant font-medium">Năng suất</div>
                                        <div className="text-sm font-bold text-primary">{chartData.nangSuat.pct}% ({chartData.nangSuat.count} HV)</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded border border-surface-variant/40">
                                    <span className="w-4 h-4 rounded bg-[#c4c6cf] flex-shrink-0"></span>
                                    <div>
                                        <div className="text-xs text-on-surface-variant font-medium">Cân bằng</div>
                                        <div className="text-sm font-bold text-primary">{chartData.canBang.pct}% ({chartData.canBang.count} HV)</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded border border-surface-variant/40 sm:col-span-2">
                                    <span className="w-4 h-4 rounded bg-[#465f88] flex-shrink-0"></span>
                                    <div>
                                        <div className="text-xs text-on-surface-variant font-medium">Thực dụng</div>
                                        <div className="text-sm font-bold text-primary">{chartData.thucDung.pct}% ({chartData.thucDung.count} HV)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Section: Ranking Table */}
                <div className="bg-surface-container-lowest border border-surface-variant rounded-lg overflow-hidden hover:shadow-soft-lift transition-shadow duration-300">
                    <div className="px-6 py-4 border-b border-surface-variant bg-surface-container-low flex justify-between items-center">
                        <h2 className="text-[20px] font-semibold text-primary">Bảng Xếp Hạng Cá Nhân</h2>
                        <button className="flex items-center gap-2 text-primary hover:text-secondary-container transition-colors text-[14px] font-semibold cursor-pointer">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>filter_list</span>
                            Lọc
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container-lowest text-[14px] text-on-surface-variant border-b border-surface-variant">
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Hạng</th>
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Học Viên</th>
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Danh Hiệu Chính</th>
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Độ Nhất Quán</th>
                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Huy Hiệu Ẩn</th>
                                </tr>
                            </thead>
                            <tbody className="text-[16px]">
                                {students.map((student) => (
                                    <tr
                                        key={student.rank}
                                        className={`border-b border-surface-variant hover:bg-surface-container-low transition-colors ${student.isCurrentUser ? 'bg-secondary-fixed/10' : ''
                                            }`}
                                    >
                                        <td className="px-6 py-4">
                                            {student.rank === 1 && (
                                                <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 text-[#FFD700] flex items-center justify-center border border-[#FFD700]/50 shadow-sm">
                                                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                                                </div>
                                            )}
                                            {student.rank === 2 && (
                                                <div className="w-10 h-10 rounded-full bg-[#C0C0C0]/20 text-[#C0C0C0] flex items-center justify-center border border-[#C0C0C0]/50 shadow-sm">
                                                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                                                </div>
                                            )}
                                            {student.rank === 3 && (
                                                <div className="w-10 h-10 rounded-full bg-[#CD7F32]/20 text-[#CD7F32] flex items-center justify-center border border-[#CD7F32]/50 shadow-sm">
                                                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                                                </div>
                                            )}
                                            {student.rank > 3 && (
                                                <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold">
                                                    {student.rank}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-primary">
                                            {student.name}
                                            {student.isCurrentUser && (
                                                <span className="ml-2 px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold rounded">Bạn</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-sm text-[14px] font-semibold ${student.rank === 1 ? 'bg-primary-container/10 text-primary-container border border-primary-container/20' :
                                                    student.rank === 2 ? 'bg-secondary-container/10 text-secondary-container border border-secondary-container/20' :
                                                        student.rank === 3 ? 'bg-surface-tint/10 text-surface-tint border border-surface-tint/20' :
                                                            'bg-outline/10 text-outline border border-outline/20'
                                                }`}>
                                                {student.title}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-primary">{student.consistency}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 flex-wrap">
                                                {student.badges.map((badge, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="relative group"
                                                    >
                                                        {/* Tooltip */}
                                                        <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-lg bg-gray-900 text-white text-[11px] leading-relaxed px-3 py-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 text-center">
                                                            <span className="font-bold block mb-0.5">{badge.name}</span>
                                                            {badge.desc}
                                                            {/* Arrow */}
                                                            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                                                        </div>
                                                        {/* Badge */}
                                                        <div
                                                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-md cursor-default ${badge.bgClass}`}
                                                        >
                                                            <span
                                                                className="material-symbols-outlined text-[16px]"
                                                                style={{ fontVariationSettings: "'FILL' 1" }}
                                                            >
                                                                {badge.icon}
                                                            </span>
                                                            <span className="text-[11px] font-bold tracking-wide whitespace-nowrap uppercase">{badge.name}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                                {student.badges.length === 0 && (
                                                    <span className="text-on-surface-variant/40 text-sm italic">Chưa có</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Ranking;
