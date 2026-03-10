import { Moon, Heart, Sparkles } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-midnight/30" />

      {/* Decorative Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/40 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <Moon className="w-8 h-8 text-gold" />
            <span className="text-2xl font-bold text-gold-gradient font-amiri">
              ليلة القدر
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center text-white/60 text-lg font-amiri mb-8">
          خير من ألف شهر
        </p>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/30" />
          <Sparkles className="w-4 h-4 text-gold/50" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/30" />
        </div>

        {/* Links */}
        <div className="flex justify-center gap-8 mb-8">
          <a 
            href="#worship" 
            className="text-white/50 hover:text-gold transition-colors text-sm"
          >
            رحلة العبادة
          </a>
          <a 
            href="#timeline" 
            className="text-white/50 hover:text-gold transition-colors text-sm"
          >
            العشر الأواخر
          </a>
          <a 
            href="#tasbeeh" 
            className="text-white/50 hover:text-gold transition-colors text-sm"
          >
            المسبحة
          </a>
          <a 
            href="#reflection" 
            className="text-white/50 hover:text-gold transition-colors text-sm"
          >
            الخواطر
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white/40 text-sm flex items-center justify-center gap-1">
            صنع بـ <Heart className="w-4 h-4 text-red-400 fill-red-400" /> لله تعالى
          </p>
          <p className="text-white/30 text-xs mt-2">
            {currentYear} ليلة القدر - جميع الحقوق محفوظة
          </p>
        </div>

        {/* Special Dua for Yumna */}
        <div className="mt-8 text-center">
          <p className="text-gold text-lg font-amiri font-bold animate-pulse">
            اللهم الخير والثراء الفاحش ليُمنى 💚✨
          </p>
          <p className="text-gold/60 text-xs font-amiri mt-2">
            اللهم تقبل منا صالح الأعمال
          </p>
        </div>
      </div>
    </footer>
  );
}
