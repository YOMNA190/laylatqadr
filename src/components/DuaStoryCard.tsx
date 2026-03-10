import { useRef, useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Share2, Download, X, Sparkles, Star, Moon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface DuaStoryCardProps {
  duaText: string;
  category: string;
  bgImage?: string;
  onClose: () => void;
}

const creativeShareMessages = [
  "رسالة من الله لقلبك في جوف الليل.. 🤲✨",
  "خبأت لكِ دعوة في ليلة القدر، ادخلي واكتشفيها.. 🌙💫",
  "نوري ليلتك بذكر الله وادعي معي.. 🕯️✨",
  "في ليلة القدر، كل دعاء مستجاب.. اقرئي وادعي 🤲🌙",
  "اغتنمي فضل هذه الليلة المباركة معنا.. 🌟💚",
];

export function DuaStoryCard({ duaText, category, bgImage, onClose }: DuaStoryCardProps) {
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
            className="relative w-[350px] aspect-[9/16] rounded-[40px] overflow-hidden border-8 border-gold/40 shadow-2xl flex flex-col bg-slate-950"
          >
            {/* Background Image with Overlay */}
            {bgImage && (
              <div className="absolute inset-0 z-0">
                <img src={bgImage} alt="" className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
              </div>
            )}

            {/* Ornamental Background Elements */}
            <div className="absolute inset-0 z-1 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-gold/30 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl" />
            </div>

            {/* Twinkling Stars Background */}
            <div className="absolute inset-0 z-1 opacity-40 pointer-events-none">
              {[...Array(20)].map((_, i) => (
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
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-8">
              {/* Top Ornament */}
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-gold/60" />
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  <Moon className="w-4 h-4 text-gold/60" />
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  <Star className="w-4 h-4 text-gold/60" />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <span className="text-gold/80 text-xs font-bold tracking-widest uppercase block mb-1">Laylat Al-Qadr</span>
                <h4 className="text-white text-2xl font-amiri font-bold">ليلة القدر ٢٠٢٦</h4>
                <div className="w-24 h-0.5 bg-gold/20 mx-auto mt-2" />
              </div>

              {/* Main Content: Dua */}
              <div className="flex-1 flex flex-col justify-center items-center text-center px-2">
                <div className="relative">
                  <Sparkles className="absolute -top-8 -right-4 w-6 h-6 text-gold/40 animate-pulse" />
                  <Sparkles className="absolute -bottom-8 -left-4 w-6 h-6 text-gold/40 animate-pulse" />
                  
                  <p className="text-white text-2xl font-amiri leading-relaxed italic drop-shadow-lg">
                    "{duaText}"
                  </p>
                </div>

                <div className="mt-10 px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-gold/30 text-gold text-sm font-amiri">
                  {category}
                </div>
              </div>

              {/* Footer: QR & Link */}
              <div className="mt-auto pt-6 border-t border-gold/20 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-white/70 text-[10px] font-amiri">اغتنم الفضل عبر:</span>
                  <span className="text-gold font-bold text-sm">laylatqadr.app</span>
                </div>

                <div className="p-1.5 bg-white rounded-lg shadow-xl">
                  <QRCodeSVG 
                    value="https://laylatqadr.vercel.app/" 
                    size={45}
                    level="H"
                    includeMargin={false}
                  />
                </div>
              </div>

              {/* Bottom Quote */}
              <div className="mt-4 text-center">
                <p className="text-gold/60 text-[10px] font-amiri italic">
                  "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={downloadImage}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-black font-bold flex items-center justify-center gap-2 py-4 rounded-2xl shadow-lg shadow-gold/30 disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.02]"
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
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-2 py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <Share2 className="w-5 h-5" />
            مشاركة مع رسالة إبداعية
          </button>
        </div>
      </div>
    </div>
  );
}
