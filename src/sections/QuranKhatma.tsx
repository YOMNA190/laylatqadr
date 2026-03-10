import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BookOpen, Sparkles, CheckCircle2, Share2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { allDuas, categoryImages } from '../lib/duaData';
import { DuaStoryCard } from '../components/DuaStoryCard';

interface KhatmaDay {
  day: string;
  content: string;
}

const khatmaSchedule: KhatmaDay[] = [
  { day: 'اليوم الأول', content: 'من سورة الفاتحة إلى سورة آل عمران' },
  { day: 'اليوم الثاني', content: 'من سورة النساء إلى سورة المائدة' },
  { day: 'اليوم الثالث', content: 'من سورة الأنعام إلى سورة التوبة' },
  { day: 'اليوم الرابع', content: 'من سورة يونس إلى سورة الإسراء' },
  { day: 'اليوم الخامس', content: 'من سورة الكهف إلى سورة النور' },
  { day: 'اليوم السادس', content: 'من سورة الفرقان إلى سورة فاطر' },
  { day: 'اليوم السابع', content: 'من سورة يس إلى سورة الحديد' },
  { day: 'اليوم الثامن', content: 'من سورة المجادلة إلى سورة الناس' },
];

export function QuranKhatma() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const [completedDays, setCompletedDays] = useLocalStorage<number[]>('quran-khatma-completed', []);
  const [activeStoryDua, setActiveStoryDua] = useState<{ text: string; category: string; bgImage?: string } | null>(null);

  const toggleDay = (index: number) => {
    setCompletedDays(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const khatmaDuas = allDuas.filter(dua => dua.category === "أدعية الختم");

  return (
    <section ref={ref} className="section-spiritual relative py-24" id="khatma">
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-gold" />
            <span className="text-gold/80 text-lg font-amiri">ختم القرآن في العشر الأواخر</span>
            <BookOpen className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gold-gradient font-amiri mb-4">
            جدول ختم القرآن الكريم
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            تابع تقدمك في ختم كتاب الله خلال هذه الليالي المباركة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Schedule Table - Left Side */}
          <div className={`lg:col-span-7 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="glass-strong rounded-3xl overflow-hidden border border-gold/20 shadow-gold-sm">
              <table className="w-full text-right font-amiri text-xl">
                <thead>
                  <tr className="bg-gold/10 text-gold border-b border-gold/20">
                    <th className="py-6 px-8 font-bold">اليوم</th>
                    <th className="py-6 px-8 font-bold">المقدار</th>
                    <th className="py-6 px-8 font-bold text-center">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                  {khatmaSchedule.map((item, index) => {
                    const isCompleted = completedDays.includes(index);
                    return (
                      <tr 
                        key={index} 
                        className={`transition-colors cursor-pointer hover:bg-gold/5 ${isCompleted ? 'bg-gold/10' : ''}`}
                        onClick={() => toggleDay(index)}
                      >
                        <td className="py-6 px-8 text-gold font-bold">{item.day}</td>
                        <td className={`py-6 px-8 text-white/90 ${isCompleted ? 'line-through opacity-50' : ''}`}>
                          {item.content}
                        </td>
                        <td className="py-6 px-8 text-center">
                          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${isCompleted ? 'bg-gold border-gold text-black' : 'border-gold/30 text-gold/30'}`}>
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gold/60 italic text-lg">
                "أنشرها فلا تدري كم سيصلك من الأجر عندما يختم أحدهم القرآن بسببك!"
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 border border-gold/20 text-gold">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span>أنجزت {completedDays.length} من {khatmaSchedule.length} أيام</span>
              </div>
            </div>
          </div>

          {/* Khatma Duas - Right Side */}
          <div className={`lg:col-span-5 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="glass-strong rounded-3xl p-6 h-full flex flex-col border border-gold/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-gold font-semibold">أدعية ختم القرآن</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2 max-h-[600px]">
                {khatmaDuas.map((dua) => (
                  <div
                    key={dua.id}
                    className="relative overflow-hidden rounded-2xl border border-white/10 hover:border-gold/50 transition-all duration-500 group bg-white/5 p-5"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-white font-amiri text-lg leading-relaxed flex-1" dir="rtl">
                        {dua.text}
                      </p>
                      <button 
                        onClick={() => setActiveStoryDua({ 
                          text: dua.text, 
                          category: dua.category,
                          bgImage: categoryImages[dua.category]
                        })}
                        className="p-2 rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-black transition-all"
                        title="مشاركة كصورة"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Share Modal */}
      {activeStoryDua && (
        <DuaStoryCard
          duaText={activeStoryDua.text}
          category={activeStoryDua.category}
          bgImage={activeStoryDua.bgImage}
          onClose={() => setActiveStoryDua(null)}
        />
      )}
    </section>
  );
}
