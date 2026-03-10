import React, { useState, useCallback, useMemo } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PenLine, Sparkles, Save, Trash2, Search, BookOpen, Share2 } from 'lucide-react';
import { allDuas, duaCategories, categoryComments, categoryImages } from '../lib/duaData';
import { DuaStoryCard } from '../components/DuaStoryCard';

const defaultBg = "/images/hero-bg.jpg";

export function ReflectionSection() {
  const [activeStoryDua, setActiveStoryDua] = useState<{ text: string; category: string; bgImage?: string } | null>(null);
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const [reflection, setReflection] = useLocalStorage<string>('laylatul-qadr-reflection', '');
  const [isFocused, setIsFocused] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const handleSave = useCallback(() => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  }, []);

  const handleClear = useCallback(() => {
    if (window.confirm('هل أنت متأكد من مسح جميع ما كتبت؟')) {
      setReflection('');
    }
  }, [setReflection]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReflection(e.target.value);
  }, [setReflection]);

  const filteredDuas = useMemo(() => {
    return allDuas.filter(dua => {
      const matchesSearch = dua.text.includes(searchQuery) || (dua.source && dua.source.includes(searchQuery));
      const matchesCategory = selectedCategory === 'الكل' || dua.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const addDuaToReflection = (duaText: string) => {
    setReflection((prev) => prev + (prev ? '\n\n' : '') + duaText);
  };

  return (
    <section ref={ref} className="section-spiritual relative py-24" id="reflection">
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
            <span className="text-gold/80 text-lg font-amiri">موسوعة الأدعية والذكر</span>
            <BookOpen className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gold-gradient font-amiri mb-4">
            بماذا ستناجي ربك الليلة؟
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            اكتب دعواتك الخاصة، أو اختر من موسوعة الأدعية الشاملة لتملأ ليلتك بالذكر والخشوع
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Reflection Area */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className={`
              glass-strong rounded-3xl p-1 transition-all duration-500 h-full
              ${isFocused ? 'shadow-gold-lg' : ''}
            `}>
              <div className="bg-black/40 rounded-[22px] p-6 md:p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <PenLine className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-gold font-semibold">مفكرة دعواتك</h3>
                    <p className="text-white/40 text-sm">اكتب ما في قلبك من أمنيات</p>
                  </div>
                </div>

                <div className="relative flex-1">
                  <textarea
                    value={reflection}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="يا الله، أسألك...&#10;&#10;اكتب دعواتك هنا، فإن الله يستجيب لعباده في جوف الليل..."
                    className="input-spiritual min-h-[400px] h-full resize-none text-lg leading-relaxed font-amiri"
                    dir="rtl"
                  />
                  <div className="absolute bottom-4 left-4 text-white/30 text-sm">
                    {reflection.length} حرف
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-gold/10">
                  <button
                    onClick={handleClear}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    مسح
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 rounded-full bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    حفظ
                  </button>
                </div>

                {showSaved && (
                  <div className="mt-4 text-center animate-fade-in">
                    <span className="inline-flex items-center gap-2 text-gold text-sm bg-gold/10 px-4 py-2 rounded-full">
                      <Sparkles className="w-4 h-4" />
                      تم الحفظ بنجاح
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Dua Encyclopedia with Tabs */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="glass-strong rounded-3xl p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-gold font-semibold">موسوعة الأدعية</h3>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="ابحث عن دعاء..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pr-10 pl-4 text-white focus:border-gold/50 outline-none transition-colors"
                  dir="rtl"
                />
              </div>

              {/* Categories Tabs */}
              <div className="relative mb-6 group">
                <div className="flex overflow-x-auto custom-scrollbar gap-2 pb-2 mask-fade-edges">
                  <button
                    onClick={() => setSelectedCategory('الكل')}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${selectedCategory === 'الكل' ? 'bg-gold text-black font-bold shadow-gold-sm' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                  >
                    الكل
                  </button>
                  {duaCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${selectedCategory === cat ? 'bg-gold text-black font-bold shadow-gold-sm' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedCategory !== 'الكل' && categoryComments[selectedCategory] && (
                <div className="mb-4 text-gold/80 text-sm font-amiri italic animate-fade-in flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  {categoryComments[selectedCategory]}
                </div>
              )}

              {/* Dua List with Image Backgrounds */}
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2 max-h-[500px]">
                {filteredDuas.length > 0 ? (
                  filteredDuas.map((dua) => (
                    <div
                      key={dua.id}
                      className="relative overflow-hidden rounded-2xl border border-white/10 hover:border-gold/50 transition-all duration-500 cursor-pointer group"
                      onClick={() => addDuaToReflection(dua.text)}
                    >
                      {/* Image Background */}
                      <div 
                        className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${categoryImages[dua.category] || defaultBg})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 z-10 bg-black/70 group-hover:bg-black/60 transition-colors duration-500" />
                      
                      <div className="relative z-20 p-5">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <p className="text-white font-amiri text-xl group-hover:text-gold transition-colors leading-relaxed flex-1 drop-shadow-lg" dir="rtl">
                            {dua.text}
                          </p>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveStoryDua({ 
                                text: dua.text, 
                                category: dua.category,
                                bgImage: categoryImages[dua.category]
                              });
                            }}
                            className="p-2 rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-black transition-all"
                            title="مشاركة كصورة"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gold/60 text-xs font-amiri px-2 py-0.5 rounded-full bg-gold/5 border border-gold/10">
                            {dua.category}
                          </span>
                          {dua.source && (
                            <span className="text-white/40 text-[10px] italic">
                              المصدر: {dua.source}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-white/40">
                    <p>لا توجد أدعية تطابق بحثك</p>
                  </div>
                )}
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
