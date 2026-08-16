import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinkClass = ({ isActive }) =>
        `relative px-3 py-2 font-body-md text-body-md transition-all duration-200 ${
            isActive
                ? 'text-secondary font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-secondary after:rounded-full'
                : 'text-on-surface-variant hover:text-primary'
        }`;

    return (
        <header className="w-full top-0 sticky z-50 backdrop-blur-md bg-surface/90 border-b border-outline-variant/60 shadow-sm">
            <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-16 md:h-20">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                        <span className="material-symbols-outlined text-on-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                    </div>
                    <span className="font-headline-md text-headline-md font-bold text-primary leading-tight">
                        Đạo Đức <span className="text-secondary">Học Đường</span>
                    </span>
                </NavLink>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    <NavLink end to="/" className={navLinkClass}>Triết lý</NavLink>
                    <Link to="/#norms" className="relative px-3 py-2 font-body-md text-body-md transition-all duration-200 text-on-surface-variant hover:text-primary">4 Chuẩn mực</Link>
                    <NavLink to="/register" className={navLinkClass}>Thách thức</NavLink>
                    <NavLink to="/ranking" className={navLinkClass}>Bảng xếp hạng</NavLink>
                </nav>

                {/* CTA + Hamburger */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/register"
                        className="hidden md:inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2 rounded-md font-label-md text-label-md hover:opacity-90 hover:shadow-md transition-all duration-200"
                    >
                        <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                        Bắt đầu
                    </Link>
                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 rounded-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-[24px]">
                            {mobileOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-outline-variant bg-surface/95 backdrop-blur-md px-margin-mobile py-4 flex flex-col gap-1">
                    <NavLink end to="/" className={navLinkClass} onClick={() => setMobileOpen(false)}>Triết lý</NavLink>
                    <Link to="/#norms" className="px-3 py-2 font-body-md text-on-surface-variant hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>4 Chuẩn mực</Link>
                    <NavLink to="/register" className={navLinkClass} onClick={() => setMobileOpen(false)}>Thách thức</NavLink>
                    <NavLink to="/ranking" className={navLinkClass} onClick={() => setMobileOpen(false)}>Bảng xếp hạng</NavLink>
                    <Link to="/register" className="mt-2 w-full text-center bg-primary text-on-primary px-5 py-2.5 rounded-md font-label-md text-label-md hover:opacity-90 transition-opacity" onClick={() => setMobileOpen(false)}>
                        Bắt đầu thử thách
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
