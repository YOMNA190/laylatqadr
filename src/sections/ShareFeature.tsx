import React, { useState, useRef, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Share2, Download, Sparkles, Star, Check, Palette, Image as ImageIcon } from 'lucide-react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';

type Theme = 'classic' | 'midnight' | 'emerald' | 'royal';

const themes: Record<Theme, { name: string, class: string, bg: string, accent: string }> = {
  classic: {
    name: 'كلاسيكي مذهب',
    class: 'from-black via-midnight to-black border-gold/30',
    bg: '/images/pattern-bg.jpg',
    accent: 'text-gold'
  },
  midnight: {
    name: 'ليلي هادئ',
    class: 'from-slate-900 via-blue-950 to-slate-900 border-blue-400/30',
    bg: '/images/hero-bg.jpg',
    accent: 'text-blue-300'
  },
  emerald: {
    name: 'زمردي إسلامي',
    class: 'from-emerald-950 via-green-900 to-emerald-950 border-emerald-400/30',
    bg: '/images/pattern-bg.jpg',
    accent: 'text-emerald-300'
  },
  royal: {
    name: 'ملكي أرجواني',
    class: 'from-purple-950 via-indigo-950 to-purple-950 border-purple-400/30',
    bg: '/images/hero-bg.jpg',
    accent: 'text-purple-300'
  }
};

export function ShareFeature() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const [completedTasks] = useLocalStorage<string[]>('laylatul-qadr-tasks', []);
  const [reflection] = useLocalStorage<string>('laylatul-qadr-reflection', '');
  const [currentTheme, setCurrentTheme] = useState<Theme>('classic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const totalTasks = 6;
  const progress = Math.round((completedTasks.length / totalTasks) * 100);

  const taskNames: Record<string, string> = {
    charity: 'التصدق',
    tahajjud: 'صلاة الليل',
    ikhlas: 'قراءة الإخلاص',
    istighfar: 'الاستغفار',
    salawat: 'الصلاة على النبي',
    dua: 'الدعاء الشخصي',
  };

  const downloadCard = useCallback(async () => {
    if (cardRef.current === null) return;
    
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true,
        quality: 1,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `laylat-qadr-card-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('oops, something went wrong!', err);
    } finally {
      setIsGenerating(false);
    }
  }, [cardRef]);

  const theme = themes[currentTheme];

  return (
    <section ref={ref} className="section-spiritual relative py-24 overflow-hidden" id="share">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight/50 to-black" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Share2 className="w-6 h-6 text-gold" />
            <span className="text-gold/80 text-lg font-amiri">بطاقة المشاركة</span>
            <Share2 className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gold-gradient font-amiri mb-4">
            شارك الأجر مع أحبابك
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            صمم بطاقتك الخاصة بأدعية ليلة القدر وشاركها لتكون سبباً في تذكير غيرك بالخير
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Controls - Left Side */}
          <div className={`lg:col-span-4 space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="glass-strong rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-5 h-5 text-gold" />
                <h3 className="text-gold font-semibold">اختر شكل البطاقة</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {(Object.keys(themes) as Theme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setCurrentTheme(t)}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-xl border transition-all
                      ${currentTheme === t 
                        ? 'bg-gold/20 border-gold text-gold shadow-gold-sm' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}
                    `}
                  >
                    <span className="font-amiri">{themes[t].name}</span>
                    {currentTheme === t && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-strong rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Download className="w-5 h-5 text-gold" />
                <h3 className="text-gold font-semibold">إجراءات</h3>
              </div>
              <div className="space-y-4">
                <button
                  onClick={downloadCard}
                  disabled={isGenerating}
                  className="w-full btn-gold flex items-center justify-center gap-2 py-4 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      جاري المعالجة...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5" />
                      تحميل كصورة PNG
                    </>
                  )}
                </button>
                <p className="text-white/40 text-[10px] text-center">
                  * سيتم تحميل البطاقة بجودة عالية لمشاركتها على منصات التواصل
                </p>
              </div>
            </div>
          </div>

          {/* Card Preview - Right Side */}
          <div className={`lg:col-span-8 flex justify-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div 
              ref={cardRef}
              className={`
                relative w-full max-w-[450px] aspect-[4/5] rounded-[40px] p-8 overflow-hidden border-4 shadow-2xl flex flex-col
                bg-gradient-to-br ${theme.class}
              `}
            >
              {/* Background Pattern */}
              <div 
                className="absolute inset-0 opacity-10 mix-blend-overlay"
                style={{
                  backgroundImage: `url(${theme.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className={`w-4 h-4 ${theme.accent}`} />
                    <span className={`${theme.accent} text-sm font-bold tracking-widest uppercase`}>Laylat Al-Qadr</span>
                    <Star className={`w-4 h-4 ${theme.accent}`} />
                  </div>
                  <h4 className="text-white text-2xl font-amiri font-bold">ليلة القدر ٢٠٢٦</h4>
                </div>

                {/* Main Content: Dua or Reflection */}
                <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
                  <div className="w-12 h-1 bg-gold/30 rounded-full mb-6" />
                  <p className="text-white/90 font-amiri text-xl leading-relaxed italic">
                    {reflection ? (
                      reflection.length > 150 ? reflection.substring(0, 150) + '...' : reflection
                    ) : (
                      "اللهم إنك عفو تحب العفو فاعفُ عني"
                    )}
                  </p>
                  <div className="w-12 h-1 bg-gold/30 rounded-full mt-6" />
                </div>

                {/* Stats & QR */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-end justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                      <span className="text-white/60 text-xs">إنجاز الليلة: {progress}%</span>
                    </div>
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {completedTasks.slice(0, 3).map(id => (
                        <span key={id} className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full border border-white/5">
                          {taskNames[id]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-white rounded-lg shadow-lg">
                      <QRCodeSVG 
                        value="https://laylatqadr.vercel.app/" 
                        size={60}
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                    <span className="text-white/30 text-[8px] font-mono">laylatqadr.app</span>
                  </div>
                </div>

                {/* Footer Quote */}
                <div className="mt-6 text-center">
                  <p className={`${theme.accent} text-xs font-amiri opacity-80`}>
                    "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ"
                  </p>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-8 text-center animate-fade-in">
            <span className="inline-flex items-center gap-2 text-gold bg-gold/10 px-6 py-3 rounded-full border border-gold/20">
              <Sparkles className="w-5 h-5" />
              تم تحميل البطاقة بنجاح! شاركها الآن
              <Sparkles className="w-5 h-5" />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
