import { useState, useCallback, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { 
  Heart, 
  Moon, 
  BookOpen, 
  Repeat, 
  MessageCircleHeart, 
  Hand,
  Check,
  Sparkles
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const tasks: Task[] = [
  {
    id: 'charity',
    title: 'تصدق اليوم',
    description: 'تصدق بما تيسر، فالصدقة تطفئ الخطيئة كما تطفئ الماء النار',
    icon: Heart,
  },
  {
    id: 'tahajjud',
    title: 'صلاة الليل',
    description: 'ركعتان في جوف الليل خير من الدنيا وما فيها',
    icon: Moon,
  },
  {
    id: 'ikhlas',
    title: 'قراءة الإخلاص',
    description: 'اقرأ سورة الإخلاص ثلاث مرات، تعدل ثلث القرآن',
    icon: BookOpen,
  },
  {
    id: 'istighfar',
    title: 'الاستغفار',
    description: 'استغفر الله 100 مرة، فإنها سبب للرزق والفرج',
    icon: Repeat,
  },
  {
    id: 'salawat',
    title: 'الصلاة على النبي',
    description: 'صلِّ على النبي محمد صلى الله عليه وسلم',
    icon: MessageCircleHeart,
  },
  {
    id: 'dua',
    title: 'الدعاء الشخصي',
    description: 'ادعُ الله بما في قلبك، فهو يستجيب لعباده',
    icon: Hand,
  },
];

export function WorshipTracker() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const [completedTasks, setCompletedTasks] = useLocalStorage<string[]>('laylatul-qadr-tasks', []);
  const [lastResetDate, setLastResetDate] = useLocalStorage<string>('laylatul-qadr-last-reset', '');
  const [justCompleted, setJustCompleted] = useState<string | null>(null);

  // Daily reset logic
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US'); // Use a stable date format
    if (lastResetDate !== today) {
      setCompletedTasks([]);
      setLastResetDate(today);
    }
  }, [lastResetDate, setCompletedTasks, setLastResetDate]);

  const toggleTask = useCallback((taskId: string) => {
    setCompletedTasks((prev) => {
      if (prev.includes(taskId)) {
        return prev.filter((id) => id !== taskId);
      }
      setJustCompleted(taskId);
      setTimeout(() => setJustCompleted(null), 1000);
      return [...prev, taskId];
    });
  }, [setCompletedTasks]);

  const progress = Math.round((completedTasks.length / tasks.length) * 100);
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <section ref={ref} className="section-spiritual relative py-24" id="worship">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(/images/pattern-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-gold" />
            <span className="text-gold/80 text-lg font-amiri">رحلتك في العبادة</span>
            <Sparkles className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gold-gradient font-amiri mb-4">
            سجل عباداتك الليلة
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            أكمل هذه الأعمال الصالحة واغتنم أجر ليلة القدر
          </p>
        </div>

        {/* Progress Circle */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="relative">
            <svg width="140" height="140" className="progress-circle">
              {/* Background Circle */}
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="rgba(255, 215, 0, 0.1)"
                strokeWidth="8"
              />
              {/* Progress Circle */}
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="progress-circle-circle"
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#FFE55C" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gold">{progress}%</span>
              <span className="text-white/50 text-sm">تم الإنجاز</span>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => {
            const isCompleted = completedTasks.includes(task.id);
            const isJustCompleted = justCompleted === task.id;
            const Icon = task.icon;

            return (
              <div
                key={task.id}
                className={`card-spiritual group cursor-pointer transition-all duration-500 ${
                  isCompleted ? 'completed' : ''
                } ${isJustCompleted ? 'scale-105' : ''} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
                onClick={() => toggleTask(task.id)}
              >
                {/* Sparkle Effect on Complete */}
                {isJustCompleted && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-gold rounded-full animate-ping"
                        style={{
                          left: `${20 + (i % 3) * 30}%`,
                          top: `${20 + Math.floor(i / 3) * 30}%`,
                          animationDelay: `${i * 0.05}s`,
                          animationDuration: '0.6s',
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className={`checkbox-spiritual flex-shrink-0 mt-1 ${isCompleted ? 'checked' : ''}`}>
                    {isCompleted && <Check className="w-4 h-4 text-gold" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg transition-colors ${isCompleted ? 'bg-gold/20' : 'bg-gold/5'}`}>
                        <Icon className={`w-5 h-5 ${isCompleted ? 'text-gold' : 'text-gold/60'}`} />
                      </div>
                      <h3 className={`text-lg font-semibold transition-colors ${isCompleted ? 'text-gold' : 'text-white'}`}>
                        {task.title}
                      </h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <div className={`mt-12 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold/10 border border-gold/30">
              <Sparkles className="w-6 h-6 text-gold animate-pulse" />
              <span className="text-gold text-lg font-semibold">
                بارك الله فيك! أكملت جميع العبادات
              </span>
              <Sparkles className="w-6 h-6 text-gold animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
