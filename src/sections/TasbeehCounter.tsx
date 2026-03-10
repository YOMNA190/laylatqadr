import { useState, useCallback, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { adhkarBenefits } from '../lib/duaData';
import { RotateCcw, Hand, Sparkles } from 'lucide-react';

interface Dhikr {
  id: string;
  text: string;
  meaning: string;
  target: number;
}

const adhkar: Dhikr[] = [
  { id: 'subhanallah', text: 'سبحان الله', meaning: 'المجد لله', target: 33 },
  { id: 'alhamdulillah', text: 'الحمد لله', meaning: 'الحمد لله', target: 33 },
  { id: 'allahuakbar', text: 'الله أكبر', meaning: 'الله أعظم', target: 34 },
  { id: 'istighfar', text: 'أستغفر الله', meaning: 'أطلب المغفرة من الله', target: 100 },
];

export function TasbeehCounter() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const [counts, setCounts] = useLocalStorage<Record<string, number>>('laylatul-qadr-tasbeeh', {
    subhanallah: 0,
    alhamdulillah: 0,
    allahuakbar: 0,
  });
  const [activeDhikr, setActiveDhikr] = useState('subhanallah');
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentCount = counts[activeDhikr] || 0;
  const currentDhikr = adhkar.find((d) => d.id === activeDhikr) || adhkar[0];
  const currentDhikrBenefit = adhkarBenefits[activeDhikr];

  const increment = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add ripple
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    // Animate counter
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    // Increment count
    setCounts((prev) => ({
      ...prev,
      [activeDhikr]: (prev[activeDhikr] || 0) + 1,
    }));
  }, [activeDhikr, setCounts]);

  const reset = useCallback(() => {
    setCounts((prev) => ({
      ...prev,
      [activeDhikr]: 0,
    }));
  }, [activeDhikr, setCounts]);

  const resetAll = useCallback(() => {
    setCounts({
      subhanallah: 0,
      alhamdulillah: 0,
      allahuakbar: 0,
    });
  }, [setCounts]);

  // Auto-reset when reaching target
  useEffect(() => {
    if (currentCount >= currentDhikr.target) {
      const nextIndex = adhkar.findIndex((d) => d.id === activeDhikr) + 1;
      if (nextIndex < adhkar.length) {
        setTimeout(() => {
          setActiveDhikr(adhkar[nextIndex].id);
        }, 500);
      }
    }
  }, [currentCount, currentDhikr.target, activeDhikr]);

  const progress = Math.min((currentCount / currentDhikr.target) * 100, 100);

  return (
    <section ref={ref} className="section-spiritual relative py-24" id="tasbeeh">
      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/images/tasbeeh-glow.jpg)',
          backgroundSize: '600px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Hand className="w-6 h-6 text-gold" />
            <span className="text-gold/80 text-lg font-amiri">المسبحة الرقمية</span>
            <Hand className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gold-gradient font-amiri mb-4">
            سبح واهتف باسم ربك
          </h2>
          <p className="text-white/60 text-lg">
            اضغط على الزر أو اضغط على المسافة للتسبيح
          </p>
        </div>

        {/* Dhikr Selector */}
        <div className={`flex justify-center gap-2 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {adhkar.map((dhikr) => (
            <button
              key={dhikr.id}
              onClick={() => setActiveDhikr(dhikr.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeDhikr === dhikr.id 
                  ? 'bg-gold text-black shadow-gold' 
                  : 'bg-gold/10 text-gold/70 hover:bg-gold/20'
                }
              `}
            >
              {dhikr.text}
            </button>
          ))}
        </div>

        {/* Counter Display */}
        <div className={`relative mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="glass-strong rounded-3xl p-8 text-center">
            {/* Dhikr Text */}
            <p className="text-gold/60 text-sm mb-2">{currentDhikr.meaning}</p>
            {currentDhikrBenefit && (
              <div className="mt-4 p-4 bg-gold/10 rounded-xl text-gold/80 text-sm font-amiri leading-relaxed">
                <p className="font-bold mb-2">فضل {currentDhikr.text}:</p>
                <p>\"{currentDhikrBenefit.hadith}\" <span className="italic text-gold/60">({currentDhikrBenefit.source})</span></p>
              </div>
            )}
            <h3 className="text-4xl md:text-5xl font-bold text-gold font-amiri mb-6">
              {currentDhikr.text}
            </h3>

            {/* Counter */}
            <div className="relative inline-block">
              <span 
                className={`
                  text-7xl md:text-8xl font-bold text-gold-gradient transition-transform duration-150
                  ${isAnimating ? 'scale-125' : 'scale-100'}
                `}
              >
                {currentCount}
              </span>
              <span className="absolute -top-2 -right-8 text-gold/40 text-xl">
                /{currentDhikr.target}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 h-2 bg-gold/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Completion Message */}
            {currentCount >= currentDhikr.target && (
              <div className="mt-4 flex items-center justify-center gap-2 text-gold animate-fade-in">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">أكملت! انتقل للذكر التالي</span>
                <Sparkles className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>

        {/* Tap Button */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={increment}
            className="tasbeeh-button group relative overflow-hidden"
          >
            {/* Ripples */}
            {ripples.map((ripple) => (
              <div
                key={ripple.id}
                className="ripple"
                style={{ left: ripple.x - 50, top: ripple.y - 50, width: 100, height: 100 }}
              />
            ))}

            {/* Button Content */}
            <div className="relative z-10 flex flex-col items-center">
              <Hand className="w-10 h-10 text-gold mb-2 group-active:scale-90 transition-transform" />
              <span className="text-gold font-semibold">اضغط للتسبيح</span>
            </div>

            {/* Glow Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-pulse-glow" />
          </button>
        </div>

        {/* Controls */}
        <div className={`flex justify-center gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold/70 hover:bg-gold/20 hover:text-gold transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            إعادة الذكر الحالي
          </button>
          <button
            onClick={resetAll}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold/70 hover:bg-gold/20 hover:text-gold transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            إعادة الكل
          </button>
        </div>

        {/* Keyboard Hint */}
        <p className={`text-center mt-6 text-white/30 text-sm transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          اضغط على مفتاح المسافة للتسبيح بسرعة
        </p>
      </div>
    </section>
  );
}
