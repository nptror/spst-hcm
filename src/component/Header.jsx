import { NavLink, Link } from 'react-router-dom';

const Header = () => {
    const navLinkClass = ({ isActive }) =>
        `px-3 py-2 rounded font-body-md text-body-md transition-all ${
            isActive
                ? 'text-secondary font-bold border-b-2 border-secondary pb-1'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors'
        }`;

    return (
        <header className="bg-surface dark:bg-surface-container-highest w-full top-0 sticky border-b border-outline-variant dark:border-outline z-50">
            <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-20">
                <NavLink to="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary">Đạo Đức Học Đường</NavLink>
                <nav className="hidden md:flex gap-gutter">
                    <NavLink end to="/" className={navLinkClass}>Triết lý</NavLink>
                    <Link to="/#norms" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md hover:bg-surface-container-low transition-all px-3 py-2 rounded">4 Chuẩn mực</Link>
                    <NavLink to="/challenge" className={navLinkClass}>Thách thức</NavLink>
                    <NavLink to="/practice" className={navLinkClass}>Rèn luyện</NavLink>
                </nav>
                <Link to="/register" className="bg-primary text-on-primary px-6 py-2 rounded font-label-md text-label-md hover:opacity-90 transition-opacity">Bắt đầu</Link>
            </div>
        </header>
    );
};

export default Header;
