import { CompatibilityResult } from '../types';

export const getCompatibility = (type1: string, type2: string): CompatibilityResult => {
  const compatibilityMatrix: Record<string, Record<string, CompatibilityResult>> = {
    INTJ: {
      ENFP: {
        score: 95,
        level: 'excellent',
        title: '理想的なバランス',
        description: 'INTJの戦略的思考とENFPの創造性が完璧に補完し合います。',
        advice: ['お互いの視点を尊重する', '計画と自由のバランスを取る', '深い対話を大切にする'],
        pros: ['知的刺激', '成長促進', '相互補完'],
        cons: ['価値観の違い', 'ペースの違い']
      },
      ENTP: {
        score: 90,
        level: 'excellent',
        title: '知的パートナーシップ',
        description: '両者とも革新的で、刺激的な関係を築けます。',
        advice: ['議論を楽しむ', '計画性を意識する', '感情面も大切にする'],
        pros: ['知的興奮', '革新性', '独立性の尊重'],
        cons: ['感情的距離', '実行力の差']
      }
    },
    ENFP: {
      INTJ: {
        score: 95,
        level: 'excellent',
        title: '理想的なバランス',
        description: 'ENFPの情熱とINTJの戦略性が素晴らしい組み合わせです。',
        advice: ['違いを受け入れる', '深い絆を築く', 'お互いの空間を尊重する'],
        pros: ['相互成長', 'バランス', '深いつながり'],
        cons: ['コミュニケーション方法', 'ペースの違い']
      },
      INFJ: {
        score: 88,
        level: 'excellent',
        title: '心の共鳴',
        description: '価値観と情熱を共有し、深い理解に基づく関係です。',
        advice: ['感情を大切にする', '創造性を共有する', '境界を設定する'],
        pros: ['深い理解', '価値観の共有', '感情的サポート'],
        cons: ['過度な理想化', '現実的な問題への対処']
      }
    }
  };

  // デフォルトの相性計算
  const calculateDefaultCompatibility = (t1: string, t2: string): CompatibilityResult => {
    let score = 50; // ベーススコア
    
    // 外向性/内向性の相性
    if ((t1[0] === 'E' && t2[0] === 'I') || (t1[0] === 'I' && t2[0] === 'E')) {
      score += 15; // 補完的
    } else if (t1[0] === t2[0]) {
      score += 5; // 同じ
    }
    
    // 感覚/直観の相性
    if (t1[1] === t2[1]) {
      score += 10; // 情報処理が同じ
    }
    
    // 思考/感情の相性
    if ((t1[2] === 'T' && t2[2] === 'F') || (t1[2] === 'F' && t2[2] === 'T')) {
      score += 10; // 補完的
    } else if (t1[2] === t2[2]) {
      score += 5;
    }
    
    // 判断/知覚の相性
    if (t1[3] === t2[3]) {
      score += 10; // ライフスタイルが同じ
    }
    
    let level: 'excellent' | 'good' | 'fair' | 'challenging';
    if (score >= 85) level = 'excellent';
    else if (score >= 70) level = 'good';
    else if (score >= 55) level = 'fair';
    else level = 'challenging';
    
    return {
      score,
      level,
      title: getCompatibilityTitle(level),
      description: getCompatibilityDescription(t1, t2, level),
      advice: getGeneralAdvice(level),
      pros: getGeneralPros(t1, t2),
      cons: getGeneralCons(t1, t2)
    };
  };

  // 特定の組み合わせがあれば使用、なければデフォルト計算
  return compatibilityMatrix[type1]?.[type2] || 
         compatibilityMatrix[type2]?.[type1] || 
         calculateDefaultCompatibility(type1, type2);
};

const getCompatibilityTitle = (level: string): string => {
  const titles = {
    excellent: '理想的な相性',
    good: '良好な関係',
    fair: '努力次第で良好',
    challenging: '理解が必要'
  };
  return titles[level as keyof typeof titles];
};

const getCompatibilityDescription = (type1: string, type2: string, level: string): string => {
  const descriptions = {
    excellent: 'お互いを深く理解し、補完し合える素晴らしい関係を築けます。',
    good: 'いくつかの共通点があり、良好な関係を維持できます。',
    fair: '努力と理解があれば、充実した関係を築くことができます。',
    challenging: '違いが多いですが、お互いを理解することで成長できます。'
  };
  return descriptions[level as keyof typeof descriptions];
};

const getGeneralAdvice = (level: string): string[] => {
  const advice = {
    excellent: ['お互いの強みを活かす', '深いコミュニケーションを心がける', '共通の目標を設定する'],
    good: ['違いを認め合う', '定期的な対話を重視する', '共通の興味を見つける'],
    fair: ['忍耐強く理解し合う', 'お互いの価値観を尊重する', '妥協点を見つける'],
    challenging: ['オープンな対話を心がける', '違いを学習機会として捉える', 'プロの支援を検討する']
  };
  return advice[level as keyof typeof advice];
};

const getGeneralPros = (type1: string, type2: string): string[] => {
  return ['新しい視点', 'お互いの成長', '多様性のある関係'];
};

const getGeneralCons = (type1: string, type2: string): string[] => {
  return ['コミュニケーションの課題', '価値観の違い', '理解に時間が必要'];
};