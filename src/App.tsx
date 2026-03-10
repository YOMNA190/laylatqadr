import { useEffect, useState, lazy, Suspense } from 'react';
import { Navigation } from './components/Navigation';
import { Particles } from './components/Particles';
import { Hero } from './sections/Hero';

// Lazy load heavy components
const TenIdeasLazy = lazy(() => import('./sections/TenIdeas').then(m => ({ default: m.TenIdeas })));
const WorshipTracker = lazy(() => import('./sections/WorshipTracker').then(m => ({ default: m.WorshipTracker })));
const NightTimeline = lazy(() => import('./sections/NightTimeline').then(m => ({ default: m.NightTimeline })));
const TasbeehCounter = lazy(() => import('./sections/TasbeehCounter').then(m => ({ default: m.TasbeehCounter })));
const ReflectionSection = lazy(() => import('./sections/ReflectionSection').then(m => ({ default: m.ReflectionSection })));
const MotivationEngine = lazy(() => import('./sections/MotivationEngine').then(m => ({ default: m.MotivationEngine })));
const ShareFeature = lazy(() => import('./sections/ShareFeature').then(m => ({ default: m.ShareFeature })));
const WishBox = lazy(() => import('./sections/WishBox').then(m => ({ default: m.WishBox })));
const PersonalStats = lazy(() => import('./sections/PersonalStats').then(m => ({ default: m.PersonalStats })));
const QuranKhatma = lazy(() => import('./sections/QuranKhatma').then(m => ({ default: m.QuranKhatma })));
const Footer = lazy(() => import('./sections/Footer').then(m => ({ default: m.Footer })));
const CommunityDuas = lazy(() => import('./sections/CommunityDuas').then(m => ({ default: m.CommunityDuas })));
import { Moon, BookOpen, Zap, Heart, Share2, BarChart3, Gift, MessageSquare, Sparkles, X } from 'lucide-react';
import './App.css';

type TabType = 'home' | 'worship' | 'timeline' | 'khatma' | 'tasbeeh' | 'duas' | 'community' | 'motivation' | 'wishes' | 'stats' | 'share' | 'ideas';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ElementType;
  component: React.ComponentType<any>;
}

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
  </div>
);

const tabs: Tab[] = [
  { id: 'home', label: 'الرئيسية', icon: Moon, component: Hero },
  { id: 'worship', label: 'رحلة العبادة', icon: Heart, component: WorshipTracker },
  { id: 'ideas', label: 'عشر أفكار', icon: Sparkles, component: TenIdeasLazy },
  { id: 'timeline', label: 'العشر الأواخر', icon: Zap, component: NightTimeline },
  { id: 'khatma', label: 'ختم القرآن', icon: BookOpen, component: QuranKhatma },
  { id: 'tasbeeh', label: 'المسبحة', icon: Zap, component: TasbeehCounter },
  { id: 'duas', label: 'الأدعية', icon: BookOpen, component: ReflectionSection },
  { id: 'community', label: 'أرسل دعاءك', icon: MessageSquare, component: CommunityDuas },
  { id: 'motivation', label: 'التحفيز', icon: Heart, component: MotivationEngine },
  { id: 'wishes', label: 'الأمنيات', icon: Gift, component: WishBox },
  { id: 'stats', label: 'الإحصائيات', icon: BarChart3, component: PersonalStats },
  { id: 'share', label: 'المشاركة', icon: Share2, component: ShareFeature },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const handleBeginWorship = () => {
    setActiveTab('worship');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut for tasbeeh counter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat && activeTab === 'tasbeeh') {
        e.preventDefault();
        const tapButton = document.querySelector('.tasbeeh-button') as HTMLButtonElement;
        if (tapButton) {
          tapButton.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Hero;

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden" dir="rtl">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-black to-midnight" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
      </div>

      {/* Floating Particles */}
      <Particles />

      {/* Navigation */}
      <Navigation />

      {/* Personalized Dua Banner */}
      {isScrolled && showBanner && (
        <div className="fixed top-20 left-0 right-0 z-40 pointer-events-none">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative glass-strong rounded-2xl p-4 md:p-6 text-center pointer-events-auto animate-pulse-glow">
              <button 
                onClick={() => setShowBanner(false)}
                className="absolute top-2 left-2 p-1 rounded-full bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
                title="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-gold font-amiri text-lg md:text-xl leading-relaxed drop-shadow-lg px-6">
                يا رب يمنى تدخل الجنة وتبقي مليونيرة وتحققي كل أحلامك وتكوني أسعد إنسانة في الدنيا والآخرة
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10">
        {/* Active Tab Content */}
        <div className="min-h-screen">
          <Suspense fallback={<LoadingFallback />}>
            {activeTab === 'home' ? <Hero onBegin={handleBeginWorship} /> : <ActiveComponent />}
          </Suspense>
        </div>

        {/* Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </main>

      {/* Bottom Tab Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
        <div className="glass-strong mx-4 mb-4 rounded-3xl">
          <div className="flex items-center justify-between overflow-x-auto custom-scrollbar px-2 py-3 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 whitespace-nowrap text-xs ${
                    isActive
                      ? 'bg-gold text-black shadow-gold-sm'
                      : 'text-white/60 hover:text-gold hover:bg-gold/10'
                  }`}
                  title={tab.label}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline text-[10px]">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Spacer for bottom navigation */}
      <div className="h-24" />
    </div>
  );
}

export default App;
