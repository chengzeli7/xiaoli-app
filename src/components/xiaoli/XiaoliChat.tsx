import { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { RefreshCw, Sparkles } from 'lucide-react';
import { getRandomQuote, shouldShowReward, type XiaoliQuote } from '../../utils/xiaoliQuotes';

export function XiaoliChat() {
  const [quote, setQuote] = useState<XiaoliQuote | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const refreshQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const newQuote = getRandomQuote();
      setQuote(newQuote);
      if (shouldShowReward()) {
        setShowReward(true);
        setTimeout(() => setShowReward(false), 3000);
      }
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    refreshQuote();
  }, []);

  const getTypeStyle = (type: XiaoliQuote['type']) => {
    switch (type) {
      case 'encourage':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'tease':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'reward':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      case 'tip':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  const getTypeLabel = (type: XiaoliQuote['type']) => {
    switch (type) {
      case 'encourage': return '鼓励';
      case 'tease': return '吐槽';
      case 'reward': return '奖励';
      case 'tip': return '小贴士';
    }
  };

  if (!quote) return null;

  return (
    <Card className="relative overflow-hidden">
      {showReward && (
        <div className="absolute inset-0 bg-purple-500/10 animate-pulse flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-purple-500 animate-spin" />
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-2xl flex-shrink-0">
          🍐
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-800 dark:text-white">小梨</span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${getTypeStyle(quote.type)}`}>
              {getTypeLabel(quote.type)}
            </span>
          </div>
          <p className={`text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-300 ${
            isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100'
          }`}>
            {quote.content}
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button variant="secondary" size="sm" onClick={refreshQuote} disabled={isAnimating}>
          <RefreshCw className={`w-4 h-4 mr-1.5 ${isAnimating ? 'animate-spin' : ''}`} />
          换一句
        </Button>
      </div>
    </Card>
  );
}