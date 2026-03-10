import { useEffect, useCallback } from 'react';
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
import './App.css';

function App() {
  // Keyboard shortcut for tasbeeh counter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space bar to increment tasbeeh when on that section
      if (e.code === 'Space' && !e.repeat) {
        const tasbeehSection = document.getElementById('tasbeeh');
        if (tasbeehSection) {
          const rect = tasbeehSection.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            e.preventDefault();
            const tapButton = tasbeehSection.querySelector('.tasbeeh-button') as HTMLButtonElement;
            if (tapButton) {
              tapButton.click();
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToWorship = useCallback(() => {
    const element = document.getElementById('worship');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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
        {/* Hero Section */}
        <div id="hero">
          <Hero onBegin={scrollToWorship} />
        </div>

        {/* Worship Journey Tracker */}
        <WorshipTracker />

        {/* Night Timeline */}
        <NightTimeline />

        {/* Quran Khatma Section */}
        <QuranKhatma />

        {/* Tasbeeh Counter */}
        <TasbeehCounter />

        {/* Reflection Section */}
        <ReflectionSection />

        {/* Motivation Engine */}
        <MotivationEngine />

        {/* Wish Box */}
        <WishBox />

        {/* Personal Stats */}
        <PersonalStats />

        {/* Share Feature */}
        <ShareFeature />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
