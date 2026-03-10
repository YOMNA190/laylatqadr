import { useState, useEffect } from 'react';
import { Moon, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { label: 'الرئيسية', tab: 'home' },
  { label: 'رحلة العبادة', tab: 'worship' },
  { label: 'عشر أفكار', tab: 'ideas' },
  { label: 'العشر الأواخر', tab: 'timeline' },
  { label: 'ختم القرآن', tab: 'khatma' },
  { label: 'المسبحة', tab: 'tasbeeh' },
  { label: 'الأدعية', tab: 'duas' },
  { label: 'أرسل دعاءك', tab: 'community' },
  { label: 'التحفيز', tab: 'motivation' },
  { label: 'الأمنيات', tab: 'wishes' },
  { label: 'الإحصائيات', tab: 'stats' },
  { label: 'المشاركة', tab: 'share' },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tab: string) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    onTabChange('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
        `}
      >
        <div className="glass-strong mx-4 mt-4 rounded-2xl">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); scrollToTop(); }}
                className="flex items-center gap-2"
              >
                <Moon className="w-6 h-6 text-gold" />
                <span className="text-gold font-bold font-amiri">ليلة القدر</span>
              </a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleTabClick(item.tab)}
                    className={`text-xs whitespace-nowrap px-3 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === item.tab
                        ? 'bg-gold text-black font-semibold'
                        : 'text-white/70 hover:text-gold hover:bg-gold/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gold/10 text-gold"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden mx-4 mt-2 rounded-2xl overflow-hidden transition-all duration-300
            ${isMobileMenuOpen ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'}
          `}
        >
          <div className="glass-strong p-4 space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleTabClick(item.tab)}
                className={`w-full text-right py-3 px-4 rounded-lg transition-all text-sm ${
                  activeTab === item.tab
                    ? 'bg-gold text-black font-semibold'
                    : 'text-white/70 hover:text-gold hover:bg-gold/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
