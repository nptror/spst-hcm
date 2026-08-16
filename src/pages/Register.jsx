import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import logoImg from '../assets/logo.png';
import { supabase } from '../supabaseClient';

const InteractiveGrid = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        const dots = [];
        const spacing = 32;
        const repelRadius = 140;
        const ease = 0.12;
        const maxDistortion = 20;

        const mouse = { x: -1000, y: -1000 };

        const initGrid = () => {
            if (!canvas) return;
            dots.length = 0;
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;

            for (let x = spacing / 2; x < width; x += spacing) {
                for (let y = spacing / 2; y < height; y += spacing) {
                    dots.push({
                        baseX: x,
                        baseY: y,
                        x: x,
                        y: y,
                    });
                }
            }
        };

        initGrid();

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', initGrid);

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            dots.forEach((dot) => {
                const dx = dot.x - mouse.x;
                const dy = dot.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let targetX = dot.baseX;
                let targetY = dot.baseY;
                let opacity = 0.08;
                let radius = 1.5;
                let color = '#002147';

                if (dist < repelRadius) {
                    const force = (repelRadius - dist) / repelRadius;
                    const angle = Math.atan2(dy, dx);
                    targetX = dot.baseX + Math.cos(angle) * force * maxDistortion;
                    targetY = dot.baseY + Math.sin(angle) * force * maxDistortion;

                    opacity = 0.08 + force * 0.52;
                    radius = 1.5 + force * 1.5;
                    if (force > 0.25) {
                        color = '#fd8b00';
                    }
                }

                dot.x += (targetX - dot.x) * ease;
                dot.y += (targetY - dot.y) * ease;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = opacity;
                ctx.fill();
            });

            ctx.globalAlpha = 1.0;
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', initGrid);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

const Register = () => {
    const [name, setName] = useState('');
    const [focused, setFocused] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);
    const [startAnimate, setStartAnimate] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim()) {
            const studentName = name.trim();
            localStorage.setItem('student_name', studentName);
            localStorage.removeItem('game_state');
            localStorage.removeItem('game_result');
            
            // 1. Khởi tạo dữ liệu người chơi trên Supabase để hiển thị ngay trên Ranking
            try {
                const { data, error } = await supabase.from('game_sessions').insert([{
                    student_name: studentName,
                    progress: 0,
                    energy: 100,
                    money: 320000,
                    trait_can: 0,
                    trait_kiem: 0,
                    trait_liem: 0,
                    trait_chinh: 0,
                    primary_title: 'Tân binh',
                    hidden_achievements: []
                }]).select();

                if (error) {
                    console.error("Lỗi Supabase:", error);
                    alert("Lỗi khi kết nối Supabase: " + error.message);
                }

                if (data && data.length > 0) {
                    // Lưu lại ID phiên chơi để sau này hoàn thành game thì dùng lệnh update thay vì tạo mới
                    localStorage.setItem('session_id', data[0].id);
                }
            } catch (err) {
                console.error("Lỗi mạng hoặc cấu hình:", err);
                alert("Lỗi mạng hoặc sai URL/Key Supabase: " + err.message);
            }

            // 2. Kích hoạt hiệu ứng chuyển cảnh
            setIsLeaving(true);
            setTimeout(() => {
                setStartAnimate(true);
            }, 50);

            // 3. Chuyển trang
            setTimeout(() => {
                navigate('/challenge');
            }, 1050);
        }
    };

    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col font-body-md text-body-md relative overflow-hidden">
            {isLeaving && (
                <div className="fixed inset-0 z-[100] pointer-events-none select-none">
                    {/* Orange layer */}
                    <div
                        className={`curtain-layer absolute inset-0 bg-secondary-container z-10 ${startAnimate ? 'curtain-down-back' : 'curtain-up-back'
                            }`}
                    ></div>
                    {/* Navy layer */}
                    <div
                        className={`curtain-layer absolute inset-0 bg-primary-container z-20 flex items-center justify-center ${startAnimate ? 'curtain-down-main' : 'curtain-up-main'
                            }`}
                    >
                        <div className="text-on-primary font-headline-md text-xl tracking-wider animate-pulse">
                            Đang mở thử thách...
                        </div>
                    </div>
                </div>
            )}
            <Header />

            <div className="min-h-[90vh] flex-grow flex items-center justify-center overflow-hidden relative w-full py-12 md:py-16">
                {/* Decorative Background Elements */}
                <InteractiveGrid />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-container rounded-full blur-[120px] opacity-[0.08] translate-y-1/3 -translate-x-1/4"></div>

                {/* Main Container */}
                <main className="page-entrance relative z-10 w-full max-w-2xl px-6 flex flex-col items-center text-center">
                    {/* Logo / Icon */}
                    <div className="mb-8 w-24 h-24 md:w-32 md:h-32 rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-center overflow-hidden border border-surface-variant p-2">
                        <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
                    </div>

                    {/* Greeting */}
                    <h1 className="font-headline text-[32px] md:text-[48px] font-bold text-primary leading-tight tracking-tight mb-4">
                        Chào mừng bạn đến với Học viện
                    </h1>
                    <p className="font-body text-[18px] md:text-[20px] text-on-surface-variant leading-relaxed max-w-xl mx-auto mb-10">
                        Hãy cho chúng tôi biết tên bạn để bắt đầu hành trình rèn luyện <span className="font-semibold text-secondary-container">Cần - Kiệm - Liêm - Chính</span>.
                    </p>

                    {/* Input Form */}
                    <form className="w-full max-w-md mx-auto space-y-6" onSubmit={handleSubmit}>
                        <div className={`relative group ${focused ? 'focused' : ''}`}>
                            <input
                                className="w-full bg-surface-container-lowest border-b-2 border-outline-variant text-on-surface text-[18px] font-body px-4 py-4 rounded-t-sm focus:outline-none focus:border-primary-container focus:bg-surface-container-low transition-colors duration-200 placeholder-outline"
                                id="student_name"
                                name="student_name"
                                placeholder="Nhập tên của bạn"
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                            />
                        </div>
                        <button
                            className="w-full bg-secondary-container hover:bg-[#e67e00] text-on-secondary-container font-headline text-[18px] font-bold py-4 px-8 rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                            type="submit"
                        >
                            Bắt đầu hành trình
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
                        </button>
                    </form>

                    {/* Academic Quote / Virtues */}
                    <div className="mt-16 flex gap-4 text-label-md font-label text-outline uppercase tracking-widest">
                        <span>Cần</span>
                        <span className="text-outline-variant">•</span>
                        <span>Kiệm</span>
                        <span className="text-outline-variant">•</span>
                        <span>Liêm</span>
                        <span className="text-outline-variant">•</span>
                        <span>Chính</span>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default Register;
