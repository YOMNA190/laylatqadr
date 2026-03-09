import { useScrollReveal } from '../hooks/useScrollReveal';
import { Moon, Star } from 'lucide-react';

interface Night {
  day: number;
  date: string;
  isOdd: boolean;
  isSpecial: boolean;
}

const nights: Night[] = [
  { day: 21, date: '21 رمضان', isOdd: true, isSpecial: true },
  { day: 22, date: '22 رمضان', isOdd: false, isSpecial: false },
  { day: 23, date: '23 رمضان', isOdd: true, isSpecial: true },
  { day: 24, date: '24 رمضان', isOdd: false, isSpecial: false },
  { day: 25, date: '25 رمضان', isOdd: true, isSpecial: true },
  { day: 26, date: '26 رمضان', isOdd: false, isSpecial: false },
  { day: 27, date: '27 رمضان', isOdd: true, isSpecial: true },
  { day: 28, date: '28 رمضان', isOdd: false, isSpecial: false },
  { day: 29, date: '29 رمضان', isOdd: true, isSpecial: true },
  { day: 30, date: '30 رمضان', isOdd: false, isSpecial: false },
];

export function NightTimeline() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  // Get today's date (simulated for demo - in real app would use actual date)
  const today = 27; // Simulating 27th night

  return (
    <section ref={ref} className="section-spiritual relative py-24 overflow-hidden" id="timeline">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight/50 to-black" />

      {/* Decorative Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Moon className="w-6 h-6 text-gold" />
            <span className="text-gold/80 text-lg font-amiri">العشر الأواخر</span>
            <Moon className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gold-gradient font-amiri mb-4">
            ليالي العشر الأواخر من رمضان
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            اغتنم ليالي الوتر (الفردية): 21، 23، 25، 27، 29
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-gold/70 text-sm">
            <Star className="w-4 h-4" />
            <span>الليالي المضيئة هي الليالي الوترية الأكثر احتمالاً لكونها ليلة القدر</span>
          </div>
        </div>

        {/* Timeline */}
        <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent transform -translate-y-1/2 hidden md:block" />

          {/* Nights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {nights.map((night, index) => {
              const isToday = night.day === today;
              
              return (
                <div
                  key={night.day}
                  className={`relative transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${400 + index * 50}ms` }}
                >
                  <div
                    className={`
                      timeline-node flex-col gap-1 mx-auto
                      ${night.isOdd ? 'odd-night' : ''}
                      ${isToday ? 'active scale-110' : ''}
                      ${night.isOdd && !isToday ? 'border-gold/60' : ''}
                    `}
                  >
                    {/* Day Number */}
                    <span className={`text-lg font-bold ${isToday ? 'text-gold' : night.isOdd ? 'text-gold/80' : 'text-white/60'}`}>
                      {night.day}
                    </span>
                    
                    {/* Arabic Date */}
                    <span className={`text-xs ${isToday ? 'text-gold/80' : 'text-white/40'}`}>
                      {night.date.split(' ')[0]}
                    </span>

                    {/* Special Indicator */}
                    {night.isOdd && (
                      <div className="absolute -top-1 -right-1">
                        <Star className="w-3 h-3 text-gold fill-gold animate-pulse" />
                      </div>
                    )}

                    {/* Today Indicator */}
                    {isToday && (
                      <>
                        <div className="absolute inset-0 rounded-full border-2 border-gold animate-ping opacity-30" />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <span className="text-gold text-xs font-semibold bg-gold/10 px-2 py-1 rounded-full">
                            الليلة
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Night Label */}
                  <p className={`text-center mt-3 text-sm ${night.isOdd ? 'text-gold/70' : 'text-white/40'}`}>
                    {night.date}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Card 1 */}
          <div className="glass rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <Moon className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-gold font-semibold text-lg mb-2">ليلة القدر</h3>
            <p className="text-white/60 text-sm">
              خير من ألف شهر، من قامها إيماناً واحتساباً غفر له ما تقدم من ذنبه
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-gold font-semibold text-lg mb-2">ليالي الوتر</h3>
            <p className="text-white/60 text-sm">
              التاسعة والسابعة والخامسة من العشر الأواخر هي الأرجح لكونها ليلة القدر
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <Moon className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-gold font-semibold text-lg mb-2">الاعتكاف</h3>
            <p className="text-white/60 text-sm">
              اعتكاف المساجد في العشر الأواخر من أعظم الأعمال المستحبة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
