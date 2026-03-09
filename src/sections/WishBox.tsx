import { useState, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Heart, Plus, Trash2, Edit2, Save, X, Sparkles, Calendar } from 'lucide-react';

interface Wish {
  id: string;
  text: string;
  category: 'دعاء' | 'هدف' | 'أمنية' | 'عزم';
  createdAt: string;
  completed: boolean;
}

const categories: Array<'دعاء' | 'هدف' | 'أمنية' | 'عزم'> = ['دعاء', 'هدف', 'أمنية', 'عزم'];

const categoryColors: Record<string, string> = {
  'دعاء': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'هدف': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'أمنية': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'عزم': 'bg-green-500/20 text-green-300 border-green-500/30',
};

export function WishBox() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const [wishes, setWishes] = useLocalStorage<Wish[]>('laylatul-qadr-wishes', []);
  const [newWish, setNewWish] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'دعاء' | 'هدف' | 'أمنية' | 'عزم'>('أمنية');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [filterCategory, setFilterCategory] = useState('الكل');

  const addWish = useCallback(() => {
    if (newWish.trim()) {
      const wish: Wish = {
        id: Date.now().toString(),
        text: newWish,
        category: selectedCategory,
        createdAt: new Date().toLocaleDateString('ar-EG'),
        completed: false,
      };
      setWishes((prev) => [wish, ...prev]);
      setNewWish('');
    }
  }, [newWish, selectedCategory, setWishes]);

  const deleteWish = useCallback((id: string) => {
    setWishes((prev) => prev.filter((w) => w.id !== id));
  }, [setWishes]);

  const toggleComplete = useCallback((id: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, completed: !w.completed } : w))
    );
  }, [setWishes]);

  const startEdit = useCallback((wish: Wish) => {
    setEditingId(wish.id);
    setEditText(wish.text);
  }, []);

  const saveEdit = useCallback(() => {
    if (editText.trim() && editingId) {
      setWishes((prev) =>
        prev.map((w) => (w.id === editingId ? { ...w, text: editText } : w))
      );
      setEditingId(null);
      setEditText('');
    }
  }, [editingId, editText, setWishes]);

  const filteredWishes = wishes.filter(
    (w) => filterCategory === 'الكل' || w.category === filterCategory
  );

  const completedCount = wishes.filter((w) => w.completed).length;

  return (
    <section ref={ref} className="section-spiritual relative py-24" id="wishbox">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight/30 to-black" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-gold" />
            <span className="text-gold/80 text-lg font-amiri">صندوق الأمنيات</span>
            <Heart className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gold-gradient font-amiri mb-4">
            اكتبي أمنياتك وأهدافك
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            سجلي أمنياتك وأدعيتك الليلة، وارجعي لها السنة القادمة لترى كم منها تحقق بفضل الله
          </p>
        </div>

        {/* Add Wish Form */}
        <div className={`glass-strong rounded-3xl p-8 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-gold font-semibold mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            أضيفي أمنية جديدة
          </h3>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="text-white/60 text-sm mb-2 block">نوع الأمنية:</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedCategory === cat
                      ? 'bg-gold text-black'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <textarea
              value={newWish}
              onChange={(e) => setNewWish(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  addWish();
                }
              }}
              placeholder="اكتبي أمنيتك هنا... مثلاً: 'اللهم أسألك حفظ والديّ' أو 'أتمنى أن أكون أكثر صبراً'"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-white/30 focus:border-gold/50 outline-none transition-colors resize-none"
              rows={3}
              dir="rtl"
            />
          </div>
          <button
            onClick={addWish}
            disabled={!newWish.trim()}
            className="mt-4 w-full btn-gold flex items-center justify-center gap-2 py-3 disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
            أضيفي الأمنية
          </button>
        </div>

        {/* Filter and Stats */}
        <div className={`glass-strong rounded-3xl p-6 mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterCategory('الكل')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filterCategory === 'الكل'
                    ? 'bg-gold text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                الكل
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    filterCategory === cat
                      ? 'bg-gold text-black'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="text-white/60 text-sm">
              {completedCount} من {wishes.length} مكتملة
            </div>
          </div>
        </div>

        {/* Wishes List */}
        <div className={`space-y-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filteredWishes.length > 0 ? (
            filteredWishes.map((wish) => (
              <div
                key={wish.id}
                className="glass rounded-2xl p-6 hover:border-gold/30 transition-all group"
              >
                {editingId === wish.id ? (
                  <div className="space-y-4">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-gold/50 outline-none transition-colors resize-none"
                      rows={3}
                      dir="rtl"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gold/20 text-gold hover:bg-gold/30 rounded-lg transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        حفظ
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 text-white/60 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                        إلغاء
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <input
                            type="checkbox"
                            checked={wish.completed}
                            onChange={() => toggleComplete(wish.id)}
                            className="w-5 h-5 rounded border-gold/50 cursor-pointer"
                          />
                          <span className={`px-3 py-1 rounded-full text-xs border ${categoryColors[wish.category]}`}>
                            {wish.category}
                          </span>
                          <span className="text-white/40 text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {wish.createdAt}
                          </span>
                        </div>
                        <p
                          className={`text-white/80 font-amiri text-lg leading-relaxed ${
                            wish.completed ? 'line-through text-white/40' : ''
                          }`}
                          dir="rtl"
                        >
                          {wish.text}
                        </p>
                      </div>

                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(wish)}
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                          title="تعديل"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteWish(wish.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-white/40">
              <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">لم تضيفي أي أمنيات بعد</p>
              <p className="text-sm mt-2">ابدئي بكتابة أمنياتك وأدعيتك الآن</p>
            </div>
          )}
        </div>

        {/* Motivational Message */}
        {wishes.length > 0 && (
          <div className={`mt-12 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold/10 border border-gold/30">
              <Sparkles className="w-6 h-6 text-gold animate-pulse" />
              <span className="text-gold text-lg font-semibold">
                اللهم استجب دعاءك وحقق أحلامك وأمنياتك
              </span>
              <Sparkles className="w-6 h-6 text-gold animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
