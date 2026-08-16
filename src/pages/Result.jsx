import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';

const DEFAULT_GAME_STATE = {
    resources: { progress: 0, energy: 100, money: 320000 },
    traits: { can: 0, kiem: 0, liem: 0, chinh: 0 },
};

const loadResult = () => {
    try {
        const result = JSON.parse(localStorage.getItem('game_result'));
        if (result) return result;
    } catch (err) {
        console.error('Không đọc được game_result từ localStorage:', err);
    }
    try {
        const state = JSON.parse(localStorage.getItem('game_state'));
        if (state) return state;
    } catch (err) {
        console.error('Không đọc được game_state từ localStorage:', err);
    }
    return DEFAULT_GAME_STATE;
};

const TITLE_DESCRIPTIONS = {
    'NGƯỜI GIỮ NGUYÊN TẮC':
        'Dành cho người luôn trung thực ngay cả khi không ai giám sát, không thiên vị bạn thân và đặt sự trong sạch lên hàng đầu.',
    'NGƯỜI RÈN LUYỆN':
        'Dành cho người đang từng bước rèn luyện các chuẩn mực Cần - Kiệm - Liêm - Chính trong đời sống thường nhật.',
    'NGƯỜI HỌC VIỆC':
        'Hành trình rèn luyện vừa mới bắt đầu — mỗi quyết định hôm nay là một bài học quý giá cho tương lai.',
};

const getRadarPoints = (traits) => {
    const value = (key) => (traits?.[key] ?? 0) / 100;
    const chinh = 50 - 35 * value('chinh');
    const can = 50 + 35 * value('can');
    const kiem = 50 + 35 * value('kiem');
    const liem = 50 - 35 * value('liem');
    return `${50},${chinh} ${can},${50} ${50},${kiem} ${liem},${50}`;
};

const Result = () => {
    const navigate = useNavigate();
    const studentName = localStorage.getItem('student_name') || 'Minh';
    const result = loadResult();

    const resources = result.resources ?? DEFAULT_GAME_STATE.resources;
    const traits = result.traits ?? DEFAULT_GAME_STATE.traits;
    const progress = resources.progress ?? 0;
    const energy = resources.energy ?? 0;
    const money = resources.money ?? 0;
    const primaryTitle = result.primaryTitle || 'NGƯỜI HỌC VIỆC';
    const hiddenAchievements = result.hiddenAchievements || [];
    const decisions = result.decisions || [];

    const survivalStats = [
        { label: 'Tiến độ', value: `${progress}%`, icon: 'flag', bar: progress, fillClass: 'status-bar-fill-progress' },
        { label: 'Năng lượng', value: `${energy}%`, icon: 'bolt', bar: energy, fillClass: 'status-bar-fill-energy' },
        { label: 'Tài chính', value: `${money.toLocaleString('vi-VN')} VNĐ`, icon: 'account_balance_wallet', bar: null },
    ];

    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col font-body-md text-body-md relative selection:bg-secondary-fixed selection:text-on-secondary-fixed">
            <Header />

            {/* Main Content Canvas */}
            <main className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-12 md:py-20 relative">
                <div className="space-y-12 pb-24">
                    {/* Header Section */}
                    <header className="border-b border-surface-variant pb-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <span className="inline-block px-3 py-1 bg-surface-variant text-on-surface-variant text-label-md font-label rounded uppercase mb-4 tracking-widest">KẾT QUẢ TUẦN</span>
                                <h1 className="text-display-lg font-display text-[32px] md:text-[40px] font-bold text-primary tracking-tight">Tổng Kết Hành Trình: {studentName}</h1>
                                <p className="text-body-lg text-on-surface-variant mt-4 max-w-2xl leading-relaxed">
                                    Dựa trên các quyết định của bạn trong suốt 5 ngày qua, hệ thống đã phân tích và lập chỉ số hành động đạo đức dựa trên 4 giá trị cốt lõi: Cần, Kiệm, Liêm, Chính.
                                </p>
                            </div>
                        </div>
                    </header>

                    {/* Survival Stats */}
                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {survivalStats.map((stat) => (
                            <div key={stat.label} className="bg-surface-container-lowest rounded-xl border border-surface-variant p-6 flex flex-col gap-3 lift-on-hover transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                                        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                                    </div>
                                    <span className="text-label-md text-on-surface-variant uppercase tracking-widest text-xs">{stat.label}</span>
                                </div>
                                <div className="text-display-lg font-bold text-primary leading-none text-[32px]">{stat.value}</div>
                                {stat.bar !== null && (
                                    <div className="status-bar-bg mt-1">
                                        <div className={`${stat.fillClass} transition-all duration-500 ease-out`} style={{ width: `${Math.max(0, Math.min(100, stat.bar))}%` }}></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Radar Chart Cell */}
                        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl border border-surface-variant p-8 flex flex-col items-center justify-center lift-on-hover transition-all relative overflow-hidden">
                            <h3 className="text-headline-md text-primary font-bold mb-8 w-full text-left">Chỉ số Đạo đức</h3>
                            <div className="relative w-64 h-64 radar-chart-bg rounded-full flex items-center justify-center mb-8">
                                <div className="absolute w-full h-px bg-outline-variant/30"></div>
                                <div className="absolute h-full w-px bg-outline-variant/30"></div>
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                    <polygon
                                        fill="rgba(144, 77, 0, 0.2)"
                                        points={getRadarPoints(traits)}
                                        stroke="#904d00"
                                        strokeJoin="round"
                                        strokeWidth="2"
                                    ></polygon>
                                </svg>
                                <div className="absolute top-2 text-label-md font-bold text-primary text-xs text-center">
                                    CHÍNH
                                    <span className="block font-normal text-secondary text-sm">{traits.chinh ?? 0}</span>
                                </div>
                                <div className="absolute bottom-2 text-label-md font-bold text-primary text-xs text-center">
                                    KIỆM
                                    <span className="block font-normal text-secondary text-sm">{traits.kiem ?? 0}</span>
                                </div>
                                <div className="absolute right-2 text-label-md font-bold text-primary text-xs text-center">
                                    CẦN
                                    <span className="block font-normal text-secondary text-sm">{traits.can ?? 0}</span>
                                </div>
                                <div className="absolute left-2 text-label-md font-bold text-primary text-xs text-center">
                                    LIÊM
                                    <span className="block font-normal text-secondary text-sm">{traits.liem ?? 0}</span>
                                </div>
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
                                    <h2 className="text-headline-lg font-display font-bold mb-4 text-2xl">{primaryTitle}</h2>
                                    <p className="text-body-lg text-on-primary-container max-w-lg leading-relaxed">
                                        {TITLE_DESCRIPTIONS[primaryTitle] || 'Danh hiệu dành cho hành trình rèn luyện đạo đức của bạn.'}
                                    </p>
                                </div>
                            </div>

                            {/* Hidden Achievements */}
                            {hiddenAchievements.length > 0 ? (
                                hiddenAchievements.map((title, index) => (
                                    <div key={index} className="ethos-blockquote rounded-r-xl p-8 border border-surface-variant border-l-0 relative">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0">
                                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                                            </div>
                                            <div>
                                                <div className="text-label-md uppercase tracking-widest text-secondary-container mb-2 font-bold text-xs">Thành Tựu Đặc Biệt</div>
                                                <h3 className="text-headline-md text-primary font-bold mb-2">{title}</h3>
                                                <p className="text-body-md text-on-surface-variant">
                                                    Bạn đã duy trì chuẩn mực đạo đức ngay cả trong những tình huống "không ai nhìn thấy" — minh chứng cao nhất của sự liêm chính.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-r-xl p-8 border border-surface-variant border-l-0 relative bg-surface-container-lowest">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-on-surface-variant">emoji_events</span>
                                        </div>
                                        <div>
                                            <div className="text-label-md uppercase tracking-widest text-on-surface-variant mb-2 font-bold text-xs">Thành Tựu Đặc Biệt</div>
                                            <h3 className="text-headline-md text-on-surface font-bold mb-2">Chưa mở khóa</h3>
                                            <p className="text-body-md text-on-surface-variant">
                                                Hoàn thành trọn vẹn nhóm tình huống Liêm để mở khóa thành tựu ẩn.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Detailed Breakdown Section */}
                    <section className="mt-16">
                        <h3 className="text-headline-md text-primary font-bold mb-8 border-b border-surface-variant pb-4">Hồ Sơ Quyết Định Nổi Bật</h3>
                        {decisions.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {decisions.map((decision) => {
                                    const chosen = decision.selected_option_title;
                                    return (
                                        <div key={decision.scenario_id} className="bg-surface-container-lowest p-6 rounded-lg border border-surface-variant hover:border-primary lift-on-hover transition-all flex flex-col">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${decision.is_best ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant'}`}>
                                                    {decision.tag_label}
                                                </span>
                                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                    {decision.is_best ? 'done_all' : 'schedule'}
                                                </span>
                                            </div>
                                            <span className="text-xs font-semibold text-on-surface-variant mb-1">Tình huống #{decision.scenario_id}</span>
                                            <h4 className="text-body-lg font-bold text-primary mb-2">{decision.title}</h4>
                                            {chosen ? (
                                                <p className="text-body-md text-on-surface-variant text-sm mb-4">
                                                    <span className="font-bold text-secondary">{decision.selected_option_letter}.</span> {chosen}
                                                </p>
                                            ) : (
                                                <p className="text-body-md text-on-surface-variant text-sm mb-4 italic">Chưa trả lời tình huống này.</p>
                                            )}
                                            <div className="mt-auto flex items-center gap-2 text-label-md text-secondary font-bold text-xs">
                                                <span className="material-symbols-outlined text-sm">{decision.is_best ? 'trending_up' : 'info'}</span>
                                                {decision.is_best ? 'Lựa chọn tối ưu' : (decision.feedback_title || 'Cần xem lại')}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-body-lg text-on-surface-variant">Chưa có dữ liệu quyết định. Hãy hoàn thành một hành trình thử thách trước.</p>
                        )}
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
                        <button onClick={() => {
                            localStorage.removeItem('game_state');
                            localStorage.removeItem('game_result');
                            navigate('/challenge');
                        }} className="px-8 py-4 bg-surface text-secondary border border-secondary rounded font-label text-label-md uppercase tracking-widest hover:bg-secondary-fixed/10 transition-colors flex items-center justify-center gap-2 cursor-pointer">
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
