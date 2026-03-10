import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BookOpen, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface Idea {
  id: number;
  title: string;
  content: string;
  benefit: string;
}

const tenIdeas: Idea[] = [
  {
    id: 1,
    title: "صلاة القيام بألف آية",
    content: "صلِ كل ليلة ركعتين قيام الليل، في كل ركعة مئة آية؛ فإن وافقت صلاتك ليلةَ القدر كُتبت لك من القانتين. ومن قرأ بألف آية كتب من المقنطرين أجرًا يعادل قيامًا يوميًا لمدة ثمانٍ وأربعين سنة.",
    benefit: "أجر قيام 48 سنة"
  },
  {
    id: 2,
    title: "تكرار سورة الإخلاص",
    content: "اقرأ كل ليلة سورة الإخلاص ثلاث مرات؛ فإن وافقت قراءتك ليلةَ القدر كنت كمن قرأ القرآن يوميًا لمدة ثمانٍ وأربعين سنة.",
    benefit: "أجر قراءة القرآن 48 سنة"
  },
  {
    id: 3,
    title: "خواتيم سورة البقرة وآية الكرسي",
    content: "قراءة خواتيم سورة البقرة: فإن وافقت قراءتك ليلةَ القدر كُتب لك قيام ثلاثين ألف ليلة، لقوله ﷺ: «من قرأ الآيتين من أواخر سورة البقرة في ليلة كفتاه». رواه مسلم. ولا تنسَ قراءة آية الكرسي أيضًا.",
    benefit: "أجر قيام 30,000 ليلة"
  },
  {
    id: 4,
    title: "الصدقة كل ليلة",
    content: "تصدّق كل ليلة؛ فإن وافق ذلك ليلةَ القدر كنت كمن تصدّقت أربعًا وثمانين سنة.",
    benefit: "أجر صدقة 84 سنة"
  },
  {
    id: 5,
    title: "التوحيد مئة مرة",
    content: "قل: لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيءٍ قدير مائةَ مرة؛ فإن وافق ذلك ليلةَ القدر كنت كمن أعتقت ثلاثمائة ألف رقبة، والرقبة الواحدة عتقٌ من النار. لقول النبي ﷺ: «أيُّما امرئٍ مسلمٍ أعتق امرأً مسلمًا استنقذَ اللهُ بكلِّ عضوٍ منه عضوًا منه من النار».",
    benefit: "عتق 300,000 رقبة"
  },
  {
    id: 6,
    title: "الذكر والدعاء الشامل",
    content: "قل: لا إله إلا الله وحده لا شريك له، سبحان الله، والحمد لله، ولا حول ولا قوة إلا بالله. ثم قل: اللهم اغفر لي، وارحمني، واهدني، وعافني، وارزقني. فإن وافق ذلك ليلةَ القدر فقد ملأت يدك من الخير مدة ثلاثين ألف يوم.",
    benefit: "خير 30,000 يوم"
  },
  {
    id: 7,
    title: "الاستغفار للمؤمنين والمؤمنات",
    content: "قل: اللهم اغفر لي ولوالديَّ، وللمؤمنين والمؤمنات، والمسلمين والمسلمات، الأحياءِ منهم والأموات. فإن وافق ذلك ليلةَ القدر كُتبت لك مليارات الحسنات لمدة أربعٍ وثمانين سنة. وقد قال رسول الله ﷺ: «من استغفر للمؤمنين والمؤمنات كتب الله له بكل مؤمنٍ ومؤمنةٍ حسنة». رواه الطبراني.",
    benefit: "مليارات الحسنات"
  },
  {
    id: 8,
    title: "التسبيح مئة مرة",
    content: "قل: \"سبحان الله\" مائة مرة، فإن وافق ذلك ليلةَ القدر كتب الله لك ثلاثين مليون حسنة، أو حُطَّ عنك ثلاثون مليون خطيئة.",
    benefit: "30 مليون حسنة أو خطيئة"
  },
  {
    id: 9,
    title: "التسبيح بالعظمة والحمد",
    content: "قل: \"سبحان الله العظيم وبحمده\" مائة مرة، فإن وافق ذلك ليلةَ القدر كتب الله لك ثلاثين مليون نخلة في الجنة.",
    benefit: "30 مليون نخلة في الجنة"
  },
  {
    id: 10,
    title: "الصلاة على النبي ﷺ",
    content: "قل اللهم صلِّ على محمدٍ وآلِ محمدٍ 100 مرة، فإن وافقت ليلة القدر يُكتب لك ثلاثون مليون رحمة من ملك الملوك.",
    benefit: "30 مليون رحمة من الله"
  }
];

export function TenIdeas() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <section ref={ref} className="section-spiritual relative py-24" id="ten-ideas">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/images/pattern-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight/30 to-black" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-gold" />
            <span className="text-gold/80 text-lg font-amiri">عشر أفكار لا تغفل عنها</span>
            <BookOpen className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gold-gradient font-amiri mb-4">
            أفكار العشر الأواخر من رمضان
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-amiri">
            طبّقها مهما كان السبب، فقد تكون هذه الليلة ليلة القدر
          </p>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tenIdeas.map((idea, index) => (
            <div
              key={idea.id}
              className={`transition-all duration-1000 delay-${index * 100} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div
                className="glass-strong rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-gold-lg"
                onClick={() => setExpandedId(expandedId === idea.id ? null : idea.id)}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-gold/20 via-gold/15 to-gold/20 p-6 border-b border-gold/20">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-gold font-bold text-sm">{idea.id}</span>
                        </div>
                        <h3 className="text-gold font-bold text-lg md:text-xl font-amiri">
                          {idea.title}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mt-2">
                        <Sparkles className="w-3 h-3 text-gold" />
                        <span className="text-gold/80 text-xs md:text-sm font-amiri">
                          {idea.benefit}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 rounded-full bg-gold/10 text-gold hover:bg-gold/20 transition-all flex-shrink-0">
                      {expandedId === idea.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Content */}
                {expandedId === idea.id && (
                  <div className="p-6 animate-fade-in">
                    <p className="text-white/80 font-amiri text-lg leading-relaxed">
                      {idea.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Footer */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="glass-strong rounded-3xl p-8 border-2 border-gold/40">
            <p className="text-gold font-amiri text-xl md:text-2xl leading-relaxed mb-4">
              "لا تعرف أي ليلة ستكون ليلة القدر، فطبّق هذه الأفكار كل ليلة من العشر الأواخر"
            </p>
            <p className="text-white/60 font-amiri text-lg">
              فإن وافقت ليلة القدر، كتب الله لك أجرًا عظيمًا لا يُحصى
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
