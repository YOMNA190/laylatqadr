import { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface QuoteItem {
  text: string;
  source: string;
  highlight?: string;
}

const quotes: QuoteItem[] = [
  {
    text: 'ليلة القدر خير من ألف شهر',
    source: 'سورة القدر: 3',
    highlight: 'خير من ألف شهر',
  },
  {
    text: 'من قام ليلة القدر إيماناً واحتساباً غفر له ما تقدم من ذنبه',
    source: 'متفق عليه',
    highlight: 'غفر له ما تقدم من ذنبه',
  },
  {
    text: 'الملائكة والروح فيها بإذن ربهم من كل أمر',
    source: 'سورة القدر: 4',
    highlight: 'الملائكة والروح',
  },
  {
    text: 'سلام هي حتى مطلع الفجر',
    source: 'سورة القدر: 5',
    highlight: 'سلام هي',
  },
  {
    text: 'تحروا ليلة القدر في الوتر من العشر الأواخر من رمضان',
    source: 'متفق عليه',
    highlight: 'الوتر من العشر الأواخر',
  },
  {
    text: 'إنها ليلة تسعة وعشرين أو سبع وعشرين أو خمس وعشرين',
    source: 'متفق عليه',
    highlight: 'تسعة وعشرين',
  },
  {
    text: 'من قام رمضان إيماناً واحتساباً غفر له ما تقدم من ذنبه',
    source: 'متفق عليه',
    highlight: 'غفر له ما تقدم من ذنبه',
  },
  {
    text: 'الدعاء في ليلة القدر مستجاب',
    source: 'أحاديث صحيحة',
    highlight: 'الدعاء مستجاب',
  },
];

export function MotivationEngine() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [, setDirection] = useState<'next' | 'prev'>('next');

  const goToNext = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  const currentQuote = quotes[currentIndex];

  return (
    <section ref={ref} className="section-spiritual relative py-24 overflow-hidden" id="motivation">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight/50 to-black" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Quote className="w-6 h-6 text-gold" />
            <span className="text-gold/80 text-lg font-amiri">كلمات تُلهِم</span>
            <Quote className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gold-gradient font-amiri mb-4">
            فضل ليلة القدر
          </h2>
          <p className="text-white/60 text-lg">
            تذكر فضل هذه الليلة العظيمة لتتحمس للعبادة
          </p>
        </div>

        {/* Quote Card */}
        <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div 
            className="quote-card min-h-[300px] flex flex-col justify-center items-center text-center"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Quote Icon */}
            <div className="mb-6">
              <Quote className="w-12 h-12 text-gold/30" />
            </div>

            {/* Quote Text */}
            <div className="relative overflow-hidden mb-6">
              <p 
                key={currentIndex}
                className={`
                  text-2xl md:text-4xl font-bold text-gold-gradient font-amiri leading-relaxed
                  animate-fade-in
                `}
              >
                {currentQuote.highlight ? (
                  <>
                    {currentQuote.text.split(currentQuote.highlight)[0]}
                    <span className="text-glow">{currentQuote.highlight}</span>
                    {currentQuote.text.split(currentQuote.highlight)[1]}
                  </>
                ) : (
                  currentQuote.text
                )}
              </p>
            </div>

            {/* Source */}
            <p className="text-white/50 text-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold/50" />
              {currentQuote.source}
              <Sparkles className="w-4 h-4 text-gold/50" />
            </p>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 'next' : 'prev');
                    setCurrentIndex(index);
                  }}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${index === currentIndex 
                      ? 'w-8 bg-gold' 
                      : 'bg-gold/30 hover:bg-gold/50'
                    }
                  `}
                />
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-gold mb-2">1000</div>
            <div className="text-white/60 text-sm">شهر من العبادة</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-gold mb-2">83</div>
            <div className="text-white/60 text-sm">سنة تقريباً</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-gold mb-2">∞</div>
            <div className="text-white/60 text-sm">من الأجر والثواب</div>
          </div>
        </div>
      </div>
    </section>
  );
}
