import React, { useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';

const Practice = () => {
    const [checkedTasks, setCheckedTasks] = useState(0);
    const totalTasks = 4;

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setCheckedTasks(prev => prev + 1);
        } else {
            setCheckedTasks(prev => prev - 1);
        }
    };

    const percentage = Math.round((checkedTasks / totalTasks) * 100);

    return (
        <div className="bg-background text-on-background antialiased min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                {/* Daily Rituals Section */}
                <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
                    <div className="mb-12">
                        <h1 className="font-display-lg text-display-lg text-primary mb-4">Rửa mặt cho tâm hồn hàng ngày</h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">Một bảng điều khiển cá nhân hóa để theo dõi các hành động đạo đức thiết thực mỗi ngày, phản ánh các giá trị Cần - Kiệm - Liêm - Chính trong bối cảnh học đường hiện đại.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Checklist Area */}
                        <div className="lg:col-span-2 space-y-4">

                            {/* Task 1 */}
                            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 transition-all duration-300 ease-in-out hover:shadow-[0_10px_20px_rgba(0,33,71,0.05)] hover:border-primary hover:-translate-y-[2px] flex items-start gap-4">
                                <label className="relative flex items-center cursor-pointer mt-1">
                                    <input className="peer sr-only" type="checkbox" onChange={handleCheckboxChange} />
                                    <div className="w-6 h-6 border-2 border-outline-variant rounded flex items-center justify-center transition-colors peer-checked:bg-secondary-container peer-checked:border-secondary-container">
                                        <svg className="hidden peer-checked:block w-4 h-4 text-on-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                                        </svg>
                                    </div>
                                </label>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-headline-md text-headline-md text-primary">Học tập có kế hoạch</h3>
                                        <span className="bg-primary-container text-on-primary-container px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Cần</span>
                                    </div>
                                    <p className="font-body-md text-body-md text-on-surface-variant">Lên kế hoạch chi tiết cho các môn học hôm nay, phân bổ thời gian hợp lý và không trì hoãn.</p>
                                </div>
                            </div>

                            {/* Task 2 */}
                            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 transition-all duration-300 ease-in-out hover:shadow-[0_10px_20px_rgba(0,33,71,0.05)] hover:border-primary hover:-translate-y-[2px] flex items-start gap-4">
                                <label className="relative flex items-center cursor-pointer mt-1">
                                    <input className="peer sr-only" type="checkbox" onChange={handleCheckboxChange} />
                                    <div className="w-6 h-6 border-2 border-outline-variant rounded flex items-center justify-center transition-colors peer-checked:bg-secondary-container peer-checked:border-secondary-container">
                                        <svg className="hidden peer-checked:block w-4 h-4 text-on-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                                        </svg>
                                    </div>
                                </label>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-headline-md text-headline-md text-primary">Tiết kiệm thời gian số</h3>
                                        <span className="bg-surface-tint text-on-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Kiệm</span>
                                    </div>
                                    <p className="font-body-md text-body-md text-on-surface-variant">Giới hạn thời gian sử dụng mạng xã hội không mục đích dưới 1 giờ. Tập trung vào các tài liệu hữu ích.</p>
                                </div>
                            </div>

                            {/* Task 3 */}
                            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 transition-all duration-300 ease-in-out hover:shadow-[0_10px_20px_rgba(0,33,71,0.05)] hover:border-primary hover:-translate-y-[2px] flex items-start gap-4">
                                <label className="relative flex items-center cursor-pointer mt-1">
                                    <input className="peer sr-only" type="checkbox" onChange={handleCheckboxChange} />
                                    <div className="w-6 h-6 border-2 border-outline-variant rounded flex items-center justify-center transition-colors peer-checked:bg-secondary-container peer-checked:border-secondary-container">
                                        <svg className="hidden peer-checked:block w-4 h-4 text-on-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                                        </svg>
                                    </div>
                                </label>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-headline-md text-headline-md text-primary">Trích dẫn nguồn trung thực</h3>
                                        <span className="bg-outline text-on-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Liêm</span>
                                    </div>
                                    <p className="font-body-md text-body-md text-on-surface-variant">Đảm bảo mọi thông tin tham khảo trong bài tập nhóm hôm nay đều được ghi rõ nguồn gốc chính xác.</p>
                                </div>
                            </div>

                            {/* Task 4 */}
                            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 transition-all duration-300 ease-in-out hover:shadow-[0_10px_20px_rgba(0,33,71,0.05)] hover:border-primary hover:-translate-y-[2px] flex items-start gap-4">
                                <label className="relative flex items-center cursor-pointer mt-1">
                                    <input className="peer sr-only" type="checkbox" onChange={handleCheckboxChange} />
                                    <div className="w-6 h-6 border-2 border-outline-variant rounded flex items-center justify-center transition-colors peer-checked:bg-secondary-container peer-checked:border-secondary-container">
                                        <svg className="hidden peer-checked:block w-4 h-4 text-on-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                                        </svg>
                                    </div>
                                </label>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-headline-md text-headline-md text-primary">Công việc chung trên hết</h3>
                                        <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Chính</span>
                                    </div>
                                    <p className="font-body-md text-body-md text-on-surface-variant">Ưu tiên hoàn thành phần việc được giao trong dự án nhóm trước khi dành thời gian cho sở thích cá nhân.</p>
                                </div>
                            </div>

                        </div>
                        {/* Dashboard Panel */}
                        <div className="bg-[#F4F7FA] rounded-xl p-8 border border-outline-variant/30 flex flex-col">
                            <h3 className="font-headline-md text-headline-md text-primary mb-6 border-b border-outline-variant pb-4">Tiến độ hôm nay</h3>
                            <div className="flex-grow flex flex-col justify-center">
                                <div className="text-center mb-4">
                                    <span className="font-display-lg text-display-lg text-secondary-container block">{percentage}%</span>
                                    <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wide">Hoàn thành</span>
                                </div>
                                <div className="w-full bg-surface-variant rounded-full h-4 mb-8 overflow-hidden">
                                    <div className="bg-secondary-container h-4 rounded-full transition-all duration-500 ease-out" style={{ width: `${percentage}%` }}></div>
                                </div>
                                <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/50 relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container"></div>
                                    <p className="font-body-md text-body-md text-on-surface-variant pl-4 italic">"Kỷ luật là cầu nối giữa mục tiêu và sự hoàn thành."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Modern Figure Infographic */}
                <section className="border-t border-outline-variant/50 bg-surface-container-low">
                    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
                        <div className="text-center mb-16">
                            <h2 className="font-display-lg text-display-lg text-primary mb-4">The Modern Figure</h2>
                            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Phác họa hình mẫu sinh viên lý tưởng trong kỷ nguyên số, kết hợp giữa nền tảng đạo đức vững chắc và năng lực thích ứng hiện đại.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Card 1 */}
                            <div className="bg-surface-container-lowest p-8 rounded-xl border border-surface-variant transition-all duration-300 ease-in-out hover:shadow-[0_10px_20px_rgba(0,33,71,0.05)] hover:border-primary hover:-translate-y-[2px] flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center mb-6 text-primary-container">
                                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
                                </div>
                                <h4 className="font-headline-md text-headline-md text-primary mb-3">Lao động chăm chỉ</h4>
                                <p className="font-body-md text-body-md text-on-surface-variant">Không ngại khó khăn, kiên trì theo đuổi kiến thức và kỹ năng mới mỗi ngày (Cần).</p>
                            </div>
                            {/* Card 2 */}
                            <div className="bg-surface-container-lowest p-8 rounded-xl border border-surface-variant transition-all duration-300 ease-in-out hover:shadow-[0_10px_20px_rgba(0,33,71,0.05)] hover:border-primary hover:-translate-y-[2px] flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-surface-tint/10 flex items-center justify-center mb-6 text-surface-tint">
                                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
                                </div>
                                <h4 className="font-headline-md text-headline-md text-primary mb-3">Có kỹ thuật</h4>
                                <p className="font-body-md text-body-md text-on-surface-variant">Sử dụng công cụ số một cách thông minh, tối ưu hóa quá trình học tập (Kiệm).</p>
                            </div>
                            {/* Card 3 */}
                            <div className="bg-surface-container-lowest p-8 rounded-xl border border-surface-variant transition-all duration-300 ease-in-out hover:shadow-[0_10px_20px_rgba(0,33,71,0.05)] hover:border-primary hover:-translate-y-[2px] flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-outline/10 flex items-center justify-center mb-6 text-outline">
                                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                                </div>
                                <h4 className="font-headline-md text-headline-md text-primary mb-3">Sáng tạo</h4>
                                <p className="font-body-md text-body-md text-on-surface-variant">Tư duy độc lập, tìm kiếm giải pháp mới dựa trên nền tảng tri thức minh bạch (Liêm).</p>
                            </div>
                            {/* Card 4 */}
                            <div className="bg-surface-container-lowest p-8 rounded-xl border border-surface-variant transition-all duration-300 ease-in-out hover:shadow-[0_10px_20px_rgba(0,33,71,0.05)] hover:border-primary hover:-translate-y-[2px] flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-secondary-container/10 flex items-center justify-center mb-6 text-secondary-container">
                                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                                </div>
                                <h4 className="font-headline-md text-headline-md text-primary mb-3">Năng suất cao</h4>
                                <p className="font-body-md text-body-md text-on-surface-variant">Tạo ra giá trị thực tiễn, đóng góp tích cực cho cộng đồng học thuật (Chính).</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Practice;
