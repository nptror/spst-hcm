import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full mt-auto bg-surface-container border-t border-outline-variant">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-14">
                {/* Top Row */}
                <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
                    {/* Brand */}
                    <div className="flex flex-col gap-4 max-w-xs">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
                                <span className="material-symbols-outlined text-on-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                            </div>
                            <span className="font-headline-md font-bold text-primary">
                                Đạo Đức <span className="text-secondary">Học Đường</span>
                            </span>
                        </div>
                        <p className="text-sm text-on-surface-variant leading-relaxed">
                            Dự án giáo dục đạo đức theo tư tưởng Hồ Chí Minh — <em>Cần, Kiệm, Liêm, Chính</em>. Học qua hành động, không phải lý thuyết sáo rỗng.
                        </p>
                        <p className="text-xs text-outline italic">
                            "Bạn sẽ làm gì khi không ai nhìn thấy?"
                        </p>
                    </div>

                    {/* Nav Columns */}
                    <div className="flex flex-wrap gap-10">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Khám phá</h3>
                            <Link to="/" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Triết lý dự án</Link>
                            <Link to="/#norms" className="text-sm text-on-surface-variant hover:text-primary transition-colors">4 Chuẩn mực</Link>
                            <Link to="/register" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Bắt đầu thử thách</Link>
                            <Link to="/ranking" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Bảng Vinh Danh</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Về dự án</h3>
                            <Link to="/" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Giới thiệu</Link>
                            <Link to="/" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Nguồn tài liệu</Link>
                            <Link to="/" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Liên hệ</Link>
                            <Link to="/" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Chính sách bảo mật</Link>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-outline-variant mb-6" />

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-outline text-center md:text-left">
                        © 2025 Đạo Đức Học Đường — Cần · Kiệm · Liêm · Chính. Tri thức vì cộng đồng.
                    </p>
                    <div className="flex items-center gap-1 text-xs text-outline">
                        <span className="material-symbols-outlined text-[14px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        Xây dựng với tâm huyết bởi sinh viên FPTU HCM
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
