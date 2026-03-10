import { useState, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Heart, Send, Sparkles, User, MessageSquare } from 'lucide-react';

interface CommunityDua {
  id: string;
  name: string;
  text: string;
  createdAt: string;
  prayersCount: number;
}

export function CommunityDuas() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const [mySubmissions, setMySubmissions] = useLocalStorage<CommunityDua[]>('laylatul-qadr-community-submissions', []);
  const [name, setName] = useState('');
  const [duaText, setDuaText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulated community duas (since we don't have a backend)
  const [communityDuas] = useState<CommunityDua[]>([
    { id: '1', name: 'أحمد', text: 'اللهم اشفِ والدي شفاءً لا يغادر سقماً وارزقه الصحة والعافية.', createdAt: 'منذ ساعتين', prayersCount: 124 },
    { id: '2', name: 'سارة', text: 'يا رب وفقني في دراستي واجعلني من المتفوقين في الدنيا والآخرة.', createdAt: 'منذ 5 ساعات', prayersCount: 89 },
    { id: '3', name: 'مريم', text: 'اللهم ارزقني الزوج الصالح والذرية الطيبة التي تقر بها عيني.', createdAt: 'منذ يوم', prayersCount: 256 },
    { id: '4', name: 'ياسين', text: 'اللهم انصر إخواننا في فلسطين وثبت أقدامهم وارحم شهداءهم.', createdAt: 'منذ يومين', prayersCount: 512 },
  ]);

  const handleSubmit = useCallback(() => {
    if (duaText.trim()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        const newSubmission: CommunityDua = {
          id: Date.now().toString(),
          name: name.trim() || 'فاعل خير',
          text: duaText,
          createdAt: 'الآن',
          prayersCount: 0,
        };
        
        setMySubmissions((prev) => [newSubmission, ...prev]);
        setName('');
        setDuaText('');
        setIsSubmitting(false);
        setShowSuccess(true);
        
        setTimeout(() => setShowSuccess(false), 5000);
      }, 1500);
    }
  }, [duaText, name, setMySubmissions]);

  return (
    <section ref={ref} className="section-spiritual relative py-24" id="community-duas">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight/30 to-black" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-gold" />
            <span className="text-gold/80 text-lg font-amiri">دعاء بظهر الغيب</span>
            <MessageSquare className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gold-gradient font-amiri mb-4">
            أرسل دعاءك لندعو لك
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            اكتب دعاءك هنا، وسيقوم زوار الموقع بالدعاء لك بظهر الغيب، فدعوة المسلم لأخيه مستجابة بإذن الله
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Submission Form */}
          <div className={`md:col-span-2 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="glass-strong rounded-3xl p-8 sticky top-24">
              <h3 className="text-gold font-semibold mb-6 flex items-center gap-2">
                <Send className="w-5 h-5" />
                أرسل طلب دعاء
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">الاسم (اختياري):</label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="اسمك أو فاعل خير"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pr-10 pl-4 text-white focus:border-gold/50 outline-none transition-colors"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">دعاؤك:</label>
                  <textarea
                    value={duaText}
                    onChange={(e) => setDuaText(e.target.value)}
                    placeholder="اكتب ما تريد منا أن ندعو لك به..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:border-gold/50 outline-none transition-colors resize-none h-40"
                    dir="rtl"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!duaText.trim() || isSubmitting}
                  className="w-full btn-gold flex items-center justify-center gap-2 py-3 disabled:opacity-50 relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      إرسال الدعاء
                    </>
                  )}
                </button>

                {showSuccess && (
                  <div className="text-center animate-fade-in">
                    <p className="text-gold text-sm bg-gold/10 px-4 py-2 rounded-xl border border-gold/20">
                      تم إرسال دعائك بنجاح، وسندعو لك بإذن الله ✨
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Community Feed */}
          <div className={`md:col-span-3 space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="text-white/80 font-semibold flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gold" />
              دعوات الزوار
            </h3>

            {/* My Submissions */}
            {mySubmissions.map((dua) => (
              <div key={dua.id} className="glass rounded-2xl p-6 border-gold/30 bg-gold/5 animate-fade-in-smooth">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center font-bold text-xs">
                      {dua.name[0]}
                    </div>
                    <div>
                      <span className="text-gold font-bold block text-sm">{dua.name} (أنت)</span>
                      <span className="text-white/40 text-[10px]">{dua.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gold/60 text-xs">
                    <Heart className="w-3 h-3 fill-gold/20" />
                    <span>{dua.prayersCount} دعوة</span>
                  </div>
                </div>
                <p className="text-white/90 font-amiri text-lg leading-relaxed" dir="rtl">
                  {dua.text}
                </p>
              </div>
            ))}

            {/* Simulated Community Feed */}
            {communityDuas.map((dua) => (
              <div key={dua.id} className="glass rounded-2xl p-6 hover:border-gold/20 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-white/60 flex items-center justify-center font-bold text-xs group-hover:bg-gold/20 group-hover:text-gold transition-colors">
                      {dua.name[0]}
                    </div>
                    <div>
                      <span className="text-white/80 font-bold block text-sm group-hover:text-gold transition-colors">{dua.name}</span>
                      <span className="text-white/40 text-[10px]">{dua.createdAt}</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-white/40 hover:text-gold transition-colors text-xs">
                    <Heart className="w-3 h-3" />
                    <span>{dua.prayersCount} دعوة</span>
                  </button>
                </div>
                <p className="text-white/70 font-amiri text-lg leading-relaxed" dir="rtl">
                  {dua.text}
                </p>
                <div className="mt-4 flex justify-end">
                  <button className="text-[10px] text-gold/60 hover:text-gold flex items-center gap-1 px-3 py-1 rounded-full border border-gold/10 hover:bg-gold/5 transition-all">
                    <Heart className="w-3 h-3" />
                    أمنّت على هذا الدعاء
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
