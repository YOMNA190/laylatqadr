import { useEffect, useCallback, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Particles } from './components/Particles';
import { Hero } from './sections/Hero';
import { WorshipTracker } from './sections/WorshipTracker';
import { NightTimeline } from './sections/NightTimeline';
import { TasbeehCounter } from './sections/TasbeehCounter';
import { ReflectionSection } from './sections/ReflectionSection';
import { MotivationEngine } from './sections/MotivationEngine';
import { ShareFeature } from './sections/ShareFeature';
import { WishBox } from './sections/WishBox';
import { PersonalStats } from './sections/PersonalStats';
import { QuranKhatma } from './sections/QuranKhatma';
import { Footer } from './sections/Footer';
import { Moon, BookOpen, Zap, Heart, Share2, BarChart3, Gift } from 'lucide-react';
import './App.css';

type TabType = 'home' | 'worship' | 'timeline' | 'khatma' | 'tasbeeh' | 'duas' | 'motivation' | 'wishes' | 'stats' | 'share';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ElementType;
  component: React.ComponentType;
}

const tabs: Tab[] = [
  { id: 'home', label: 'الرئيسية', icon: Moon, component: Hero },
  { id: 'worship', label: 'رحلة العبادة', icon: Heart, component: WorshipTracker },
  { id: 'timeline', label: 'العشر الأواخر', icon: Zap, component: NightTimeline },
  { id: 'khatma', label: 'ختم القرآن', icon: BookOpen, component: QuranKhatma },
  { id: 'tasbeeh', label: 'المسبحة', icon: Zap, component: TasbeehCounter },
  { id: 'duas', label: 'الأدعية', icon: BookOpen, component: ReflectionSection },
  { id: 'motivation', label: 'التحفيز', icon: Heart, component: MotivationEngine },
  { id: 'wishes', label: 'الأمنيات', icon: Gift, component: WishBox },
  { id: 'stats', label: 'الإحصائيات', icon: BarChart3, component: PersonalStats },
  { id: 'share', label: 'المشاركة', icon: Share2, component: ShareFeature },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isScrolled, setIsScrolled] = useState(false);

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

      {/* Main Content */}
      <main className="relative z-10">
        {/* Active Tab Content */}
        <div className="min-h-screen">
          <ActiveComponent />
        </div>

        {/* Footer */}
        <Footer />
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
