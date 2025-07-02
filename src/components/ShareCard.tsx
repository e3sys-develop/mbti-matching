import React, { useRef } from 'react';
import { Download, Twitter, Instagram, Share2 } from 'lucide-react';
import { Button } from './Button';
import { mbtiTypes } from '../data/mbtiTypes';
import { trackShare } from '../utils/storage';
import { shareToTwitter, generateShareText, createShareUrl } from '../utils/mbti';

interface ShareCardProps {
  mbtiType?: string;
  compatibilityScore?: number;
  userType?: string;
  partnerType?: string;
  mode: 'test' | 'compatibility';
}

export const ShareCard: React.FC<ShareCardProps> = ({
  mbtiType,
  compatibilityScore,
  userType,
  partnerType,
  mode
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2
      });
      
      const link = document.createElement('a');
      link.download = `mbti-${mode}-result.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      trackShare(mode);
    } catch (error) {
      console.error('画像の生成に失敗しました:', error);
    }
  };

  const handleTwitterShare = () => {
    const shareText = generateShareText(mbtiType || userType || '', compatibilityScore);
    const shareUrl = createShareUrl(mbtiType || userType || '');
    shareToTwitter(shareText, shareUrl);
    trackShare(mode);
  };

  const handleWebShare = async () => {
    const shareText = generateShareText(mbtiType || userType || '', compatibilityScore);
    const shareUrl = createShareUrl(mbtiType || userType || '');

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MBTI相性診断',
          text: shareText,
          url: shareUrl
        });
        trackShare(mode);
      } catch (error) {
        console.error('シェアに失敗しました:', error);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('リンクをコピーしました！');
      trackShare(mode);
    }
  };

  return (
    <div className="space-y-6">
      {/* Share Card */}
      <div 
        ref={cardRef}
        className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-8 rounded-2xl text-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white" />
          <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-white" />
        </div>

        <div className="relative z-10 text-center space-y-4">
          {mode === 'test' && mbtiType && (
            <>
              <div className="text-3xl font-bold">{mbtiTypes[mbtiType].title}</div>
              <div className="text-xl font-semibold">{mbtiType}</div>
              <div className="text-lg opacity-90">
                {mbtiTypes[mbtiType].description.substring(0, 60)}...
              </div>
            </>
          )}

          {mode === 'compatibility' && compatibilityScore && userType && partnerType && (
            <>
              <div className="text-2xl font-bold">相性診断結果</div>
              <div className="flex justify-center items-center space-x-4 text-lg">
                <span className="font-semibold">{userType}</span>
                <span>×</span>
                <span className="font-semibold">{partnerType}</span>
              </div>
              <div className="text-4xl font-bold">{compatibilityScore}点</div>
              <div className="text-lg opacity-90">
                {compatibilityScore >= 85 ? '最高の相性！' :
                 compatibilityScore >= 70 ? '良好な関係' :
                 compatibilityScore >= 55 ? '努力次第で◎' : '理解が大切'}
              </div>
            </>
          )}

          <div className="text-base opacity-80 mt-4">
            #MBTI相性診断 で検索！
          </div>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={handleDownload}
          variant="secondary"
          icon={Download}
          className="w-full"
        >
          画像保存
        </Button>
        
        <Button
          onClick={handleTwitterShare}
          variant="outline"
          icon={Twitter}
          className="w-full border-blue-400 text-blue-500 hover:bg-blue-500"
        >
          Twitter
        </Button>
      </div>

      <Button
        onClick={handleWebShare}
        variant="primary"
        icon={Share2}
        className="w-full"
      >
        友達にシェア
      </Button>
    </div>
  );
};