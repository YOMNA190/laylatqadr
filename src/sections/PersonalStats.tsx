import { useMemo } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Heart, Sparkles, Target, Award } from 'lucide-react';

export function PersonalStats() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const [completedTasks] = useLocalStorage<string[]>('laylatul-qadr-tasks', []);
  const [counts] = useLocalStorage<Record<string, number>>('laylatul-qadr-tasbeeh', {
    subhanallah: 0,
    alhamdulillah: 0,
    allahuakbar: 0,
  });
  const [reflection] = useLocalStorage<string>('laylatul-qadr-reflection', '');
  const [wishes] = useLocalStorage<any[]>('laylatul-qadr-wishes', []);

  const stats = useMemo(() => {
    const totalTasbeeh = Object.values(counts).reduce((a, b) => a + b, 0);
    const totalTasks = completedTasks.length;
    const totalWishes = wishes.length;
    const reflectionLength = reflection.length;

    return {
      totalTasbeeh,
      totalTasks,
      totalWishes,
      reflectionLength,
      tasbeehData: [
        { name: 'سبحان الله', value: counts.subhanallah || 0 },
        { name: 'الحمد لله', value: counts.alhamdulillah || 0 },
        { name: 'الله أكبر', value: counts.allahuakbar || 0 },
      ],
    };
  }, [counts, completedTasks, reflection, wishes]);

  const COLORS = ['#FFD700', '#FFE55C', '#B8860B'];

  const taskNames: Record<string, string> = {
    charity: 'التصدق',
    tahajjud: 'صلاة الليل',
    ikhlas: 'قراءة الإخلاص',
    istighfar: 'الاستغفار',
    salawat: 'الصلاة على النبي',
    dua: 'الدعاء الشخصي',
  };

  return (
    <section ref={ref} className="section-spiritual relative py-24" id="stats">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight/30 to-black" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-gold" />
            <span className="text-gold/80 text-lg font-amiri">إحصائياتك الشخصية</span>
            <TrendingUp className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gold-gradient font-amiri mb-4">
            تابع إنجازاتك الليلة
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            شاهد ملخص عباداتك وإنجازاتك في ليلة القدر
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Tasbeeh */}
          <div className={`glass-strong rounded-3xl p-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gold font-semibold text-sm">إجمالي التسبيح</h3>
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <p className="text-4xl font-bold text-gold-gradient mb-2">{stats.totalTasbeeh}</p>
            <p className="text-white/40 text-xs">مرة تسبيح</p>
          </div>

          {/* Completed Tasks */}
          <div className={`glass-strong rounded-3xl p-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gold font-semibold text-sm">العبادات المنجزة</h3>
              <Target className="w-5 h-5 text-gold" />
            </div>
            <p className="text-4xl font-bold text-gold-gradient mb-2">{stats.totalTasks}/6</p>
            <p className="text-white/40 text-xs">{Math.round((stats.totalTasks / 6) * 100)}% مكتمل</p>
          </div>

          {/* Reflection Length */}
          <div className={`glass-strong rounded-3xl p-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gold font-semibold text-sm">أحرف الدعاء</h3>
              <Heart className="w-5 h-5 text-gold" />
            </div>
            <p className="text-4xl font-bold text-gold-gradient mb-2">{stats.reflectionLength}</p>
            <p className="text-white/40 text-xs">حرف مكتوب</p>
          </div>

          {/* Wishes */}
          <div className={`glass-strong rounded-3xl p-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gold font-semibold text-sm">الأمنيات</h3>
              <Award className="w-5 h-5 text-gold" />
            </div>
            <p className="text-4xl font-bold text-gold-gradient mb-2">{stats.totalWishes}</p>
            <p className="text-white/40 text-xs">أمنية مسجلة</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Tasbeeh Distribution */}
          <div className={`glass-strong rounded-3xl p-8 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="text-gold font-semibold mb-6 text-center">توزيع التسبيح</h3>
            {stats.totalTasbeeh > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.tasbeehData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.tasbeehData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 215, 0, 0.3)' }}
                    labelStyle={{ color: '#FFD700' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-white/40">
                <p>لم تسبح بعد</p>
              </div>
            )}
            <div className="mt-6 space-y-2">
              {stats.tasbeehData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-white/60">{item.name}</span>
                  <span className="text-gold font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Tasks */}
          <div className={`glass-strong rounded-3xl p-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="text-gold font-semibold mb-6 text-center">العبادات المنجزة</h3>
            <div className="space-y-3">
              {completedTasks.length > 0 ? (
                completedTasks.map((taskId) => (
                  <div key={taskId} className="flex items-center gap-3 p-3 bg-gold/5 rounded-lg border border-gold/10">
                    <div className="w-3 h-3 rounded-full bg-gold animate-pulse" />
                    <span className="text-white/80 text-sm">{taskNames[taskId] || taskId}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-white/40">
                  <p>لم تكمل أي عبادات بعد</p>
                </div>
              )}
            </div>
            <div className="mt-6 pt-6 border-t border-gold/10">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">نسبة الإنجاز</span>
                <span className="text-gold font-semibold">{Math.round((stats.totalTasks / 6) * 100)}%</span>
              </div>
              <div className="mt-2 h-2 bg-gold/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-500"
                  style={{ width: `${(stats.totalTasks / 6) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        {stats.totalTasbeeh + stats.totalTasks + stats.reflectionLength > 0 && (
          <div className={`mt-12 text-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold/10 border border-gold/30">
              <Sparkles className="w-6 h-6 text-gold animate-pulse" />
              <span className="text-gold text-lg font-semibold">
                ما أجمل إنجازاتك! استمري في الطاعة والدعاء
              </span>
              <Sparkles className="w-6 h-6 text-gold animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
