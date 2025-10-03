import React, { useEffect, useState, useRef } from 'react';

// Component to inject global styles and fonts
const GlobalStyles = () => {
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Inter:wght@400;600;700&display=swap');
            
            body {
                font-family: 'Inter', sans-serif;
                background-color: #fdf2f8;
                scroll-behavior: smooth;
            }
            .font-fancy {
                font-family: 'Dancing Script', cursive;
            }
            .reveal {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease-out, transform 0.8s ease-out;
            }
            .reveal.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);

        const tailwindScript = document.createElement('script');
        tailwindScript.src = "https://cdn.tailwindcss.com";
        tailwindScript.async = true;
        document.head.appendChild(tailwindScript);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return null;
};

// Hero Section Component
const HeroSection = () => (
    <section className="h-screen w-full flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-purple-200 via-pink-200 to-rose-200">
        <h1 className="font-fancy text-6xl md:text-8xl text-purple-800 font-bold reveal">Happy Birthday</h1>
        <p className="font-fancy text-5xl md:text-7xl text-rose-600 mt-4 font-bold reveal" style={{ transitionDelay: '200ms' }}>Phargavi!</p>
        <p className="mt-8 text-lg text-gray-700 max-w-lg reveal" style={{ transitionDelay: '400ms' }}>
            Wishing you a day filled with love, laughter, and all the things that make you happy. 
            May your year ahead be as amazing as you are!
        </p>
        <div className="mt-12 animate-bounce reveal" style={{ transitionDelay: '600ms' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </section>
);

// New Video Section (optimized)
const VideoSection = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && videoRef.current) {
                    videoRef.current.play();
                }
            });
        }, { threshold: 0.5 });

        if (videoRef.current) observer.observe(videoRef.current);

        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    return (
        <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-fancy text-4xl md:text-5xl text-purple-800 font-bold reveal">
                    A Special Video For You
                </h2>
                <div className="mt-12 w-full aspect-w-16 aspect-h-9 reveal">
                    <video
                        ref={videoRef}
                        src="/videos/wish.mp4"
                        muted
                        loop
                        playsInline
                        controls
                        className="w-full h-[500px] rounded-2xl shadow-2xl object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

// Favourite Hero Section with Vertical Slideshow (lazy load images)
const SuriyaSection = () => {
    const images = [
        "/images/suriya1.jpg",
        "/images/suriya2.jpg",
        "/images/suriya3.jpg"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section id="suriya-wish" className="py-16 md:py-24 px-4 bg-white">
            <div className="max-w-sm md:max-w-md lg:max-w-lg mx-auto text-center">
                <h2 className="font-fancy text-4xl md:text-5xl text-purple-800 font-bold reveal">
                    Your Favourite Hero
                </h2>
                <p className="mt-4 text-gray-600 text-lg reveal">
                    Tamil Actor Suriya!
                </p>

                <div className="mt-12 relative w-full h-[700px] md:h-[900px] mx-auto overflow-hidden rounded-2xl shadow-2xl">
                    {images.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            loading="lazy"
                            alt={`Suriya ${index + 1}`}
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1500 ${
                                index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/600x900/e2e8f0/4a5568?text=Suriya';
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Hobbies Section Component (lazy load videos)
const HobbiesSection = () => {
    const hobbies = [
        { name: 'Amazing Food', videoSrc: '/videos/food.mp4', delay: '0ms' },
        { name: 'Travelling', videoSrc: '/videos/adventure.mp4', delay: '100ms' },
        { name: 'Bungee Jumping', videoSrc: '/videos/bungee.mp4', delay: '150ms' },
        { name: 'Bharatanatyam', videoSrc: '/videos/bharatham.mp4', delay: '200ms' }
    ];

    const videoRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) video.play();
                else video.pause();
            });
        }, { threshold: 0.5 });

        videoRefs.current.forEach(v => v && observer.observe(v));

        return () => {
            videoRefs.current.forEach(v => v && observer.unobserve(v));
        };
    }, []);

    return (
        <section className="py-16 md:py-24 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="font-fancy text-4xl md:text-5xl text-purple-800 font-bold reveal">
                    Celebrating Your Favourite Things
                </h2>
                <p className="mt-4 text-gray-600 text-lg reveal">A few of the passions that make you shine!</p>
                <p className="mt-2 text-sm text-gray-500 reveal" style={{ transitionDelay: '100ms' }}>
                    These are the things I learned about you from your liked reels on Instagram!
                </p>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {hobbies.map((hobby, index) => (
                        <div key={hobby.name} className="group reveal" style={{ transitionDelay: hobby.delay }}>
                            <div className="relative overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 transform group-hover:scale-105 w-full h-[320px] md:h-[400px] lg:h-[450px]">
                                <video
                                    ref={el => videoRefs.current[index] = el}
                                    src={hobby.videoSrc}
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
                                    <h3 className="text-white text-2xl font-bold font-fancy">{hobby.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => (
    <footer className="py-12 bg-gradient-to-t from-purple-200 via-pink-200 to-rose-200 text-center">
        <p className="text-xl text-gray-700 reveal">Here's to another year of amazing adventures. Cheers to you!</p>
        <p className="font-fancy text-3xl text-rose-600 mt-4 reveal">By your friend</p>
    </footer>
);

// Main App Component
export default function App() {
    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(element => observer.observe(element));

        return () => {
            revealElements.forEach(element => observer.unobserve(element));
        };
    }, []);

    return (
        <>
            <GlobalStyles />
            <main className="w-full text-gray-800">
                <HeroSection />
                <VideoSection />
                <SuriyaSection />
                <HobbiesSection />
                <Footer />
            </main>
        </>
    );
}
