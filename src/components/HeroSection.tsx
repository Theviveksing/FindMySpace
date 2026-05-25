import React, { useEffect, useRef } from 'react';
import { Building2, Shield, Search, Star, GraduationCap } from 'lucide-react';
import type { UserRole, Language } from '../App';
import { translations } from '../translations';

interface HeroSectionProps {
  userRole: UserRole;
  language: Language;
}

const featureTranslations = {
  en: [
    { title: "Premium Locations", desc: "Near top universities" },
    { title: "Verified Spaces", desc: "Thoroughly vetted" },
    { title: "Student-First", desc: "Modern living" }
  ],
  hi: [
    { title: "प्रीमियम स्थान", desc: "शीर्ष विश्वविद्यालयों के पास" },
    { title: "सत्यापित स्थान", desc: "पूरी तरह से जांचे गए" },
    { title: "छात्र-प्रथम", desc: "आधुनिक जीवन" }
  ]
};

const HeroSection = ({ userRole, language }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const scene3DRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.5;
        heroRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scene3DRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = scene3DRef.current!.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        
        scene3DRef.current!.style.transform = `
          perspective(1000px)
          rotateY(${x * 10}deg)
          rotateX(${-y * 10}deg)
          translateZ(50px)
        `;
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const features = [
    { icon: Building2, ...featureTranslations[language][0] },
    { icon: Shield, ...featureTranslations[language][1] },
    { icon: Star, ...featureTranslations[language][2] }
  ];

  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div ref={heroRef} className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] 
            bg-cover bg-center opacity-80"
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
          {/* Left Column - Hero Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl space-x-2 animate-fade-in border border-white/20">
              <GraduationCap className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">
                {language === 'en' ? 'Student Housing Simplified' : 'सरल छात्र आवास'}
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight animate-fade-in">
              {language === 'en' ? (
                <>Find Your <span className="block text-blue-400 mt-2">Perfect Space</span></>
              ) : (
                <>अपनी आदर्श <span className="block text-blue-400 mt-2">जगह खोजें</span></>
              )}
            </h1>

            <p className="text-xl text-white/90 animate-fade-in-delay-1 max-w-2xl">
              {language === 'en' 
                ? 'Experience the future of student accommodation. Discover spaces that inspire, connect, and elevate your academic journey.'
                : 'छात्र आवास के भविष्य का अनुभव करें। ऐसी जगहें खोजें जो आपकी शैक्षणिक यात्रा को प्रेरित और उन्नत करें।'}
            </p>
            
            {/* Search Bar */}
            <div className="relative animate-fade-in-delay-1">
              <div className="absolute inset-0 bg-blue-600/20 rounded-2xl blur-xl"></div>
              <div className="relative flex items-center bg-white/95 rounded-2xl shadow-2xl">
                <Search className="h-6 w-6 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-transparent border-none text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0 px-4 py-4 text-lg"
                />
                <button className="m-1 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 text-lg font-medium hover:shadow-lg hover:shadow-blue-600/20">
                  {t.search}
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-delay-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="p-3 bg-blue-600/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                      <p className="text-white/80 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 3D Scene */}
          <div className="hidden lg:block relative">
            <div 
              ref={scene3DRef}
              className="relative w-full aspect-square bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 transition-transform duration-200 ease-out"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl"></div>
              <div className="relative h-full rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern student accommodation"
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      {language === 'en' ? 'Modern Living Spaces' : 'आधुनिक रहने की जगहें'}
                    </h3>
                    <p className="text-white/80">
                      {language === 'en' 
                        ? 'Designed for the modern student lifestyle'
                        : 'आधुनिक छात्र जीवन शैली के लिए डिज़ाइन किया गया'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;