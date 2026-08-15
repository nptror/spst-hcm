import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';

const Ranking = () => {
    const studentName = localStorage.getItem('student_name') || 'Minh';

    // Simulated students data
    const students = [
        { rank: 1, name: studentName, title: 'Người giữ nguyên tắc', consistency: '10/10', badges: ['visibility_off', 'shield'], isCurrentUser: true },
        { rank: 2, name: 'Nam', title: 'Chiến lược gia năng suất', consistency: '9.5/10', badges: ['swords'] },
        { rank: 3, name: 'An', title: 'Người vì việc chung', consistency: '9/10', badges: ['visibility_off'] },
        { rank: 4, name: 'Linh', title: 'Người cân bằng', consistency: '8.5/10', badges: ['shield'] },
    ];

    const totalMembers = 24; // Total members in class

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
                                {/* 30% Người giữ nguyên tắc */}
                                <circle cx="16" cy="16" fill="transparent" r="16" stroke="#002147" strokeDasharray="30 100" strokeWidth="32"></circle>
                                {/* 25% Người vì việc chung */}
                                <circle cx="16" cy="16" fill="transparent" r="16" stroke="#fd8b00" strokeDasharray="25 100" strokeDashoffset="-30" strokeWidth="32"></circle>
                                {/* 20% Chiến lược gia năng suất */}
                                <circle cx="16" cy="16" fill="transparent" r="16" stroke="#aec7f6" strokeDasharray="20 100" strokeDashoffset="-55" strokeWidth="32"></circle>
                                {/* 15% Người cân bằng */}
                                <circle cx="16" cy="16" fill="transparent" r="16" stroke="#c4c6cf" strokeDasharray="15 100" strokeDashoffset="-75" strokeWidth="32"></circle>
                                {/* 10% Người thực dụng */}
                                <circle cx="16" cy="16" fill="transparent" r="16" stroke="#465f88" strokeDasharray="10 100" strokeDashoffset="-90" strokeWidth="32"></circle>
                            </svg>
                            <div className="absolute inset-0 m-auto w-3/5 h-3/5 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-inner">
                                <span className="text-[24px] font-bold text-primary">100%</span>
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
                                        <div className="text-sm font-bold text-primary">30% (7 HV)</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded border border-surface-variant/40">
                                    <span className="w-4 h-4 rounded bg-[#fd8b00] flex-shrink-0"></span>
                                    <div>
                                        <div className="text-xs text-on-surface-variant font-medium">Vì việc chung</div>
                                        <div className="text-sm font-bold text-primary">25% (6 HV)</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded border border-surface-variant/40">
                                    <span className="w-4 h-4 rounded bg-[#aec7f6] flex-shrink-0"></span>
                                    <div>
                                        <div className="text-xs text-on-surface-variant font-medium">Năng suất</div>
                                        <div className="text-sm font-bold text-primary">20% (5 HV)</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded border border-surface-variant/40">
                                    <span className="w-4 h-4 rounded bg-[#c4c6cf] flex-shrink-0"></span>
                                    <div>
                                        <div className="text-xs text-on-surface-variant font-medium">Cân bằng</div>
                                        <div className="text-sm font-bold text-primary">15% (4 HV)</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded border border-surface-variant/40 sm:col-span-2">
                                    <span className="w-4 h-4 rounded bg-[#465f88] flex-shrink-0"></span>
                                    <div>
                                        <div className="text-xs text-on-surface-variant font-medium">Thực dụng</div>
                                        <div className="text-sm font-bold text-primary">10% (2 HV)</div>
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
                                            <div className="flex gap-2">
                                                {student.badges.map((badge, idx) => (
                                                    <span
                                                        key={idx}
                                                        className={`material-symbols-outlined ${badge === 'visibility_off' ? 'text-secondary-container' :
                                                                badge === 'shield' ? 'text-primary-fixed-dim' : 'text-error'
                                                            }`}
                                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                                        title={badge}
                                                    >
                                                        {badge}
                                                    </span>
                                                ))}
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
