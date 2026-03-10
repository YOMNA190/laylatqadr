import { useRef, useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Share2, Download, X, Sparkles, Star, Moon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface DuaStoryCardProps {
  duaText: string;
  category: string;
  onClose: () => void;
}

const creativeShareMessages = [
  "رسالة من الله لقلبك في جوف الليل.. 🤲✨",
  "خبأت لكِ دعوة في ليلة القدر، ادخلي واكتشفيها.. 🌙💫",
  "نوري ليلتك بذكر الله وادعي معي.. 🕯️✨",
  "في ليلة القدر، كل دعاء مستجاب.. اقرئي وادعي 🤲🌙",
  "اغتنمي فضل هذه الليلة المباركة معنا.. 🌟💚",
];

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
        pixelRatio: 3,
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
    const randomMessage = creativeShareMessages[Math.floor(Math.random() * creativeShareMessages.length)];
    const shareData = {
      title: 'ليلة القدر 2026',
      text: `${randomMessage}\n\n"${duaText}"\n\nادخلي الموقع واكتشفي أدعية أكثر وتابعي عباداتك:`,
      url: 'https://laylatqadr.vercel.app/',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + '\n\n' + shareData.url)}`;
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

        {/* Card Preview - Luxurious Design */}
        <div className="flex justify-center">
          <div 
            ref={cardRef}
            className="relative w-[350px] aspect-[9/16] rounded-[40px] overflow-hidden border-8 border-gold/40 shadow-2xl flex flex-col bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
          >
            {/* Ornamental Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-gold/30 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-gold/10 to-transparent rounded-full blur-3xl" />
            </div>

            {/* Twinkling Stars Background */}
            <div className="absolute inset-0 opacity-40">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: Math.random() * 0.7 + 0.3,
                  }}
                />
              ))}
            </div>

            {/* Pattern Background */}
            <div 
              className="absolute inset-0 opacity-5 mix-blend-overlay"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,215,0,.1) 35px, rgba(255,215,0,.1) 70px),
                  repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255,215,0,.1) 35px, rgba(255,215,0,.1) 70px)
                `,
              }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-8">
              {/* Top Ornament */}
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-2 border-gold/40 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-gold/60" />
                  </div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  <div className="w-8 h-8 border-2 border-gold/40 rounded-full flex items-center justify-center">
                    <Moon className="w-4 h-4 text-gold/60" />
                  </div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  <div className="w-8 h-8 border-2 border-gold/40 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-gold/60" />
                  </div>
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <span className="text-gold/60 text-xs font-bold tracking-widest uppercase block mb-2">Laylat Al-Qadr</span>
                <h4 className="text-white text-2xl font-amiri font-bold">ليلة القدر ٢٠٢٦</h4>
                <p className="text-gold/40 text-xs mt-2 font-amiri">خير من ألف شهر</p>
              </div>

              {/* Main Content: Dua */}
              <div className="flex-1 flex flex-col justify-center items-center text-center px-2">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-8" />
                
                <div className="relative">
                  {/* Decorative elements */}
                  <Sparkles className="absolute -top-6 -right-2 w-5 h-5 text-gold/30 animate-pulse" />
                  <Sparkles className="absolute -bottom-6 -left-2 w-5 h-5 text-gold/30 animate-pulse" />
                  
                  <p className="text-white text-2xl font-amiri leading-relaxed italic px-2">
                    "{duaText}"
                  </p>
                </div>

                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent mt-8" />
                
                <span className="mt-6 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold/10 to-purple-500/10 border border-gold/20 text-gold text-xs font-amiri">
                  {category}
                </span>
              </div>

              {/* Footer: QR & Link */}
              <div className="mt-auto pt-8 border-t border-gold/10 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-white/50 text-[10px] font-amiri">اغتنم الفضل عبر:</span>
                  <span className="text-gold font-bold text-sm">laylatqadr.app</span>
                </div>

                <div className="p-2 bg-white rounded-lg shadow-lg">
                  <QRCodeSVG 
                    value="https://laylatqadr.vercel.app/" 
                    size={50}
                    level="H"
                    includeMargin={false}
                  />
                </div>
              </div>

              {/* Bottom Quote */}
              <div className="mt-6 text-center">
                <p className="text-gold/50 text-[10px] font-amiri italic leading-relaxed">
                  "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ"
                </p>
              </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={downloadImage}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-black font-bold flex items-center justify-center gap-2 py-4 rounded-2xl shadow-lg shadow-gold/50 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
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
            className="w-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 text-white border border-purple-500/30 flex items-center justify-center gap-2 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105"
          >
            <Share2 className="w-5 h-5" />
            مشاركة مع رسالة كريتيف
          </button>
        </div>
      </div>
    </div>
  );
}
