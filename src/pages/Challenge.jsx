import Header from '../component/Header';
import Footer from '../component/Footer';

const Challenge = () => {
    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col font-body-md text-body-md">
            <Header />
            <main className="flex-grow flex items-center justify-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24">
                <div className="text-center">
                    <h1 className="font-headline-lg text-headline-lg text-primary mb-4">Thách thức</h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant">Nội dung đang được xây dựng.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Challenge;
