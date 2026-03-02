export interface XiaoliQuote {
  type: 'encourage' | 'tease' | 'reward' | 'tip';
  content: string;
}

export const xiaoliQuotes: XiaoliQuote[] = [
  { type: 'encourage', content: '今天也是元气满满的一天呢！小梨为你加油～💪' },
  { type: 'encourage', content: '你已经做得很棒了！继续冲鸭！🚀' },
  { type: 'encourage', content: '每一次努力都是成长的痕迹，小梨看好你哦！✨' },
  { type: 'encourage', content: '今天的你比昨天更优秀了呢！🌟' },
  { type: 'encourage', content: '别放弃，你可是最棒的！小梨为你点赞！👍' },
  
  { type: 'tease', content: '哎呀，又在拖延了是不是？小梨都看不下去了～😏' },
  { type: 'tease', content: '这个任务拖了这么久，小梨都要发芽了！🌱' },
  { type: 'tease', content: '说好的计划呢？小梨表示很困惑...🤔' },
  { type: 'tease', content: '你确定要一直看手机而不是完成任务吗？👀' },
  { type: 'tease', content: '小梨发现你今天还没完成任务哦，是不是在偷懒？😜' },
  { type: 'tease', content: '哇，你好厉害啊！把拖延玩得这么溜～👏' },
  { type: 'tease', content: '今天的你，也是小梨带过最会摸鱼的一届...😴' },
  
  { type: 'reward', content: '🎉 恭喜获得"今日早起鸟"称号！' },
  { type: 'reward', content: '🌈 随机奖励：今日好运+1！' },
  { type: 'reward', content: '⭐ 发现了隐藏成就：灵感小达人！' },
  { type: 'reward', content: '🎁 恭喜！获得小梨的么么哒一个～💕' },
  { type: 'reward', content: '🏆 成就解锁：任务终结者！' },
  { type: 'reward', content: '✨ 今日运势：宜完成任务，忌拖延！' },
  
  { type: 'tip', content: '💡 小提示：把大任务拆成小目标更容易完成哦～' },
  { type: 'tip', content: '💡 小提示：适当的休息能让效率更高呢！' },
  { type: 'tip', content: '💡 小提示：记录灵感要趁热，不然会忘记的～' },
  { type: 'tip', content: '💡 小提示：保持专注的时候可以关掉通知哦！' },
  { type: 'tip', content: '💡 小提示：记得给任务设定合理的截止日期～' },
];

export function getRandomQuote(type?: XiaoliQuote['type']): XiaoliQuote {
  const filtered = type ? xiaoliQuotes.filter(q => q.type === type) : xiaoliQuotes;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}

export function shouldShowReward(): boolean {
  return Math.random() < 0.15;
}

export const motivationalQuotes = [
  '千里之行，始于足下',
  '种一棵树最好的时间是十年前，其次是现在',
  '只要功夫深，铁杵磨成针',
  '锲而不舍，金石可镂',
  '业精于勤，荒于嬉',
  '行百里者半九十',
  '不积跬步，无以至千里',
  '天道酬勤',
];