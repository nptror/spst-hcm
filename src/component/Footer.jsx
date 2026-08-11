import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-surface-container-high dark:bg-tertiary-container w-full mt-auto border-t border-outline-variant">
            <div className="flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto py-12 px-margin-desktop gap-base">
                <div className="font-headline-md text-headline-md font-bold text-on-surface mb-4 md:mb-0">Đạo Đức Học Đường</div>
                <div className="font-label-md text-label-md text-primary dark:text-inverse-primary opacity-80 mb-4 md:mb-0 text-center md:text-left">
                    © 2024 Cần Kiệm Liêm Chính. Tri thức vì cộng đồng.
                </div>
                <nav className="flex flex-wrap justify-center gap-4 font-label-md text-label-md">
                    <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary opacity-80 hover:opacity-100 transition-opacity">Về chúng tôi</Link>
                    <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary opacity-80 hover:opacity-100 transition-opacity">Nguồn tài liệu</Link>
                    <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary opacity-80 hover:opacity-100 transition-opacity">Liên hệ</Link>
                    <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary opacity-80 hover:opacity-100 transition-opacity">Chính sách bảo mật</Link>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
