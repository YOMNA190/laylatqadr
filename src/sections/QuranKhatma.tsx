import { useScrollReveal } from '../hooks/useScrollReveal';
import { BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

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

  const toggleDay = (index: number) => {
    setCompletedDays(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

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

        {/* Schedule Table */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
      </div>
    </section>
  );
}
