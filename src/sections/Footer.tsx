import { Moon, Heart, Sparkles, HeartHandshake } from 'lucide-react';

interface FooterProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const footerLinks = [
  { label: 'رحلة العبادة', tab: 'worship' },
  { label: 'العشر الأواخر', tab: 'timeline' },
  { label: 'ختم القرآن', tab: 'khatma' },
  { label: 'المسبحة', tab: 'tasbeeh' },
  { label: 'الأدعية', tab: 'duas' },
  { label: 'أرسل دعاءك', tab: 'community' },
];

export function Footer({ activeTab = 'home', onTabChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {footerLinks.map((link) => (
            <button
              key={link.tab}
              onClick={() => handleTabClick(link.tab)}
              className={`text-sm transition-all duration-300 px-3 py-1 rounded-lg ${
                activeTab === link.tab
                  ? 'text-gold bg-gold/10'
                  : 'text-white/50 hover:text-gold hover:bg-gold/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Dua for Yumna */}
        <div className="mb-8">
          <div className="glass-strong rounded-2xl p-6 text-center border border-gold/20">
            <div className="flex items-center justify-center gap-2 mb-3">
              <HeartHandshake className="w-5 h-5 text-gold" />
              <span className="text-gold/80 font-amiri text-sm">دعاء خاص</span>
              <HeartHandshake className="w-5 h-5 text-gold" />
            </div>
            <p className="text-gold font-amiri text-lg leading-relaxed">
              يا رب يمنى تدخل الجنة وتبقي مليونيرة وتحققي كل أحلامك وتكوني أسعد إنسانة في الدنيا والآخرة
            </p>
          </div>
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


      </div>
    </footer>
  );
}
