import { useRef, useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Share2, Download, X, Sparkles, Star, Moon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface DuaStoryCardProps {
  duaText: string;
  category: string;
  onClose: () => void;
}

export function DuaStoryCard({ duaText, category, onClose }: DuaStoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadImage = useCallback(async () => {
    if (cardRef.current === null) return;
    
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true,
        quality: 1,
        pixelRatio: 3, // Higher quality for stories
      });
      const link = document.createElement('a');
      link.download = `dua-story-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const shareViaWeb = useCallback(async () => {
    const shareData = {
      title: 'ليلة القدر 2026',
      text: `قال رسول الله ﷺ: "مَنْ قَامَ لَيْلَةَ الْقَدْرِ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ".\n\nاكتشف أدعية ليلة القدر وتابع عباداتك عبر موقع ليلة القدر:\n${duaText}\n\n`,
      url: 'https://laylatqadr.vercel.app/',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to WhatsApp
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + shareData.url)}`;
      window.open(whatsappUrl, '_blank');
    }
  }, [duaText]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg flex flex-col gap-6">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Card Preview */}
        <div className="flex justify-center">
          <div 
            ref={cardRef}
            className="relative w-[350px] aspect-[9/16] rounded-[32px] overflow-hidden border-4 border-gold/30 shadow-2xl flex flex-col bg-slate-950"
          >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
            <div 
              className="absolute inset-0 opacity-10 mix-blend-overlay"
              style={{
                backgroundImage: 'url(/images/pattern-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-8">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-gold" />
                  <span className="text-gold text-xs font-bold tracking-widest uppercase">Laylat Al-Qadr</span>
                  <Star className="w-4 h-4 text-gold" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Moon className="w-5 h-5 text-gold" />
                  <h4 className="text-white text-xl font-amiri font-bold">ليلة القدر ٢٠٢٦</h4>
                </div>
              </div>

              {/* Main Content: Dua */}
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <div className="w-12 h-1 bg-gold/30 rounded-full mb-8" />
                <div className="relative">
                  <Sparkles className="absolute -top-8 -right-4 w-6 h-6 text-gold/40 animate-pulse" />
                  <p className="text-white text-2xl font-amiri leading-relaxed italic px-2">
                    "{duaText}"
                  </p>
                  <Sparkles className="absolute -bottom-8 -left-4 w-6 h-6 text-gold/40 animate-pulse" />
                </div>
                <div className="w-12 h-1 bg-gold/30 rounded-full mt-8" />
                <span className="mt-6 px-4 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs">
                  {category}
                </span>
              </div>

              {/* Footer: QR & Link */}
              <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-white/60 text-[10px]">اغتنم ليلة القدر عبر:</span>
                  <span className="text-gold font-bold text-sm">laylatqadr.app</span>
                </div>

                <div className="p-1.5 bg-white rounded-lg shadow-lg">
                  <QRCodeSVG 
                    value="https://laylatqadr.vercel.app/" 
                    size={45}
                    level="H"
                    includeMargin={false}
                  />
                </div>
              </div>

              {/* Decorative Quote */}
              <div className="mt-6 text-center">
                <p className="text-gold/60 text-[10px] font-amiri italic">
                  "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ"
                </p>
              </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={downloadImage}
            disabled={isGenerating}
            className="w-full btn-gold flex items-center justify-center gap-2 py-4 rounded-2xl shadow-gold-sm disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            تحميل كصورة للستوري
          </button>
          
          <button
            onClick={shareViaWeb}
            className="w-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-2 py-4 rounded-2xl transition-colors"
          >
            <Share2 className="w-5 h-5" />
            مشاركة الرابط مع نص ديني
          </button>
        </div>
      </div>
    </div>
  );
}
