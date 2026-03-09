import { useState, useEffect } from 'react';
import { Sparkles, Moon } from 'lucide-react';

interface HeroProps {
  onBegin: () => void;
}

export function Hero({ onBegin }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Generate random stars
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Animated Stars Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-gold animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              boxShadow: star.size > 2 ? '0 0 10px rgba(255, 215, 0, 0.8)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Mosque Silhouette */}
      <div 
        className={`absolute bottom-0 left-0 right-0 z-[2] transition-all duration-2000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: '1s' }}
      >
        <img 
          src="/images/mosque-silhouette.png" 
          alt="Mosque"
          className="w-full max-w-4xl mx-auto opacity-60"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Moon Icon */}
        <div 
          className={`flex justify-center mb-8 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <div className="relative">
            <Moon className="w-16 h-16 text-gold animate-breathe" />
            <div className="absolute inset-0 blur-xl bg-gold/30 rounded-full" />
          </div>
        </div>

        {/* Arabic Text */}
        <p 
          className={`text-gold/80 text-xl md:text-2xl font-amiri mb-4 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '0.3s' }}
        >
          ليلة القدر خير من ألف شهر
        </p>

        {/* Main Heading */}
        <h1 
          className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gold-gradient font-amiri mb-6 leading-tight transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.5s' }}
        >
          ماذا لو كانت هذه الليلة
          <br />
          <span className="text-glow">ليلة القدر؟</span>
        </h1>

        {/* Subheading */}
        <p 
          className={`text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.7s' }}
        >
          اغتنم العشر الأواخر من رمضان بالعبادة والدعاء
          <br />
          فقد تكون هذه الليلة خير من ألف شهر
        </p>

        {/* CTA Button */}
        <div 
          className={`transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.9s' }}
        >
          <button
            onClick={onBegin}
            className="group relative btn-gold text-lg font-semibold flex items-center gap-3 mx-auto"
          >
            <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
            ابدأ ليلة العبادة
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Decorative Elements */}
        <div 
          className={`mt-16 flex justify-center gap-2 transition-all duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1.2s' }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gold/40"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[3]" />
    </section>
  );
}
