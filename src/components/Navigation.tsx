import { useState, useEffect } from 'react';
import { Moon, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'رحلة العبادة', href: '#worship' },
  { label: 'العشر الأواخر', href: '#timeline' },
  { label: 'ختم القرآن', href: '#khatma' },
  { label: 'المسبحة', href: '#tasbeeh' },
  { label: 'الأدعية', href: '#duas' },
  { label: 'أرسل دعاءك', href: '#community-duas' },
  { label: 'التحفيز', href: '#motivation' },
  { label: 'الأمنيات', href: '#wishes' },
  { label: 'الإحصائيات', href: '#stats' },
  { label: 'المشاركة', href: '#share' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
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
              <div className="hidden lg:flex items-center gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollToTop(); }}
                    className="text-white/70 hover:text-gold transition-colors text-xs whitespace-nowrap px-3 py-1 rounded-lg hover:bg-gold/10"
                  >
                    {item.label}
                  </a>
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
            ${isMobileMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}
          `}
        >
          <div className="glass-strong p-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToTop(); }}
                className="block py-2 px-4 rounded-lg text-white/70 hover:text-gold hover:bg-gold/10 transition-colors text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
