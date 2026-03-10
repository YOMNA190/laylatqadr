import { useCallback } from 'react';
import { Share2, MessageCircle, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  title?: string;
  text?: string;
  url?: string;
  showLabel?: boolean;
  className?: string;
}

const creativeMessages = [
  "في ليلة القدر، كل دعاء مستجاب.. اكتشفي أدعية جميلة وتابعي عباداتك معنا 🌙✨",
  "رسالة من الله لقلبك في جوف الليل.. ادخلي واقرئي الأدعية المختارة 🤲💫",
  "خبأت لكِ موقعاً روحانياً جميلاً لليلة القدر.. ادخلي واستمتعي بالأدعية والتسبيح 🕯️🌟",
  "نوري ليلتك بذكر الله وادعي معي في هذا الموقع الرائع.. 🌙💚",
  "اغتنمي فضل ليلة القدر معنا بأدعية جميلة وتسبيح وتتبع للعبادات 🌟🤲",
];

export function ShareButtons({
  title = 'ليلة القدر 2026',
  text = creativeMessages[Math.floor(Math.random() * creativeMessages.length)],
  url = 'https://laylatqadr.vercel.app/',
  showLabel = true,
  className = '',
}: ShareButtonsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const shareLinks = [
    {
      name: 'واتساب',
      icon: MessageCircle,
      color: 'hover:text-green-400',
      bgColor: 'hover:bg-green-400/10',
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${url}`)}`;
        window.open(whatsappUrl, '_blank', 'width=600,height=400');
      },
    },
    {
      name: 'تويتر',
      icon: Twitter,
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-400/10',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
      },
    },
    {
      name: 'فيسبوك',
      icon: Facebook,
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-600/10',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank', 'width=600,height=400');
      },
    },
    {
      name: 'لينكدإن',
      icon: Linkedin,
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-500/10',
      action: () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedinUrl, '_blank', 'width=600,height=400');
      },
    },
  ];

  const handleCopyLink = useCallback(async (index: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [url]);

  const handleNativeShare = useCallback(async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  }, [title, text, url]);

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {/* Native Share Button (if available) */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold hover:bg-gold/20 transition-colors text-sm"
          title="مشاركة"
        >
          <Share2 className="w-4 h-4" />
          {showLabel && 'مشاركة'}
        </button>
      )}

      {/* Social Share Buttons */}
      {shareLinks.map((link) => {
        const Icon = link.icon;
        return (
          <button
            key={link.name}
            onClick={() => link.action()}
            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/60 transition-colors text-sm ${link.bgColor} ${link.color}`}
            title={link.name}
          >
            <Icon className="w-4 h-4" />
            {showLabel && link.name}
          </button>
        );
      })}

      {/* Copy Link Button */}
      <button
        onClick={() => handleCopyLink(shareLinks.length)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors text-sm"
        title="نسخ الرابط"
      >
        {copiedIndex === shareLinks.length ? (
          <>
            <Check className="w-4 h-4 text-green-400" />
            {showLabel && 'تم النسخ'}
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            {showLabel && 'نسخ الرابط'}
          </>
        )}
      </button>
    </div>
  );
}
