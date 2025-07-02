import { MBTIResult } from '../types';

export const mbtiTypes: Record<string, MBTIResult> = {
  INTJ: {
    type: 'INTJ',
    scores: {},
    title: '建築家',
    description: '独立心が強く、戦略的思考を持つイノベーター。長期的なビジョンを持ち、効率的に目標を達成します。',
    strengths: ['戦略的思考', '独立性', '決断力', '将来志向'],
    challenges: ['感情表現', '他者との協調', '細かい配慮'],
    compatibility: {
      best: ['ENFP', 'ENTP'],
      good: ['INTJ', 'INFJ', 'ENFJ', 'ENTJ'],
      challenging: ['ISFP', 'ESFP', 'ESTP', 'ISTP']
    }
  },
  INTP: {
    type: 'INTP',
    scores: {},
    title: '論理学者',
    description: '好奇心旺盛で理論的な思考家。複雑な問題を分析し、革新的なアイデアを生み出します。',
    strengths: ['論理的思考', '創造性', '独立性', '客観性'],
    challenges: ['感情への配慮', '実行力', '決断の迅速性'],
    compatibility: {
      best: ['ENFJ', 'ENTJ'],
      good: ['INTP', 'INTJ', 'ENTP', 'INFJ'],
      challenging: ['ISFJ', 'ESFJ', 'ESTJ', 'ISTJ']
    }
  },
  ENTJ: {
    type: 'ENTJ',
    scores: {},
    title: '指揮官',
    description: '天性のリーダーで、カリスマ性と自信を持って人々を導きます。効率性と成果を重視します。',
    strengths: ['リーダーシップ', '戦略性', '決断力', '効率性'],
    challenges: ['忍耐力', '感情への配慮', '他者の意見への理解'],
    compatibility: {
      best: ['INFP', 'INTP'],
      good: ['ENTJ', 'INTJ', 'ENFJ', 'ENTP'],
      challenging: ['ISFP', 'ISFJ', 'ESFP', 'ESFJ']
    }
  },
  ENTP: {
    type: 'ENTP',
    scores: {},
    title: '討論者',
    description: '創造的で機知に富んだ思想家。新しい可能性を探求し、刺激的な議論を楽しみます。',
    strengths: ['創造性', 'コミュニケーション', '柔軟性', '洞察力'],
    challenges: ['継続性', '詳細への注意', '感情管理'],
    compatibility: {
      best: ['INFJ', 'INTJ'],
      good: ['ENTP', 'ENFP', 'ENTJ', 'INTP'],
      challenging: ['ISFJ', 'ISTJ', 'ESFJ', 'ESTJ']
    }
  },
  INFJ: {
    type: 'INFJ',
    scores: {},
    title: '提唱者',
    description: '理想主義者で洞察力に優れています。深い価値観を持ち、人々を理解し支援することに情熱を注ぎます。',
    strengths: ['共感力', '洞察力', '理想主義', '集中力'],
    challenges: ['完璧主義', '燃え尽き', '現実的な妥協'],
    compatibility: {
      best: ['ENFP', 'ENTP'],
      good: ['INFJ', 'INTJ', 'ENFJ', 'INFP'],
      challenging: ['ESTP', 'ESFP', 'ESTJ', 'ESFJ']
    }
  },
  INFP: {
    type: 'INFP',
    scores: {},
    title: '仲介者',
    description: '詩的で親切な利他主義者。人々や大義のために献身し、常に善を行える機会を探しています。',
    strengths: ['創造性', '共感力', '価値観重視', '個性尊重'],
    challenges: ['批判への敏感さ', '現実的な計画', '対立回避'],
    compatibility: {
      best: ['ENFJ', 'ENTJ'],
      good: ['INFP', 'ENFP', 'INFJ', 'INTP'],
      challenging: ['ESTJ', 'ESTP', 'ESFJ', 'ISTJ']
    }
  },
  ENFJ: {
    type: 'ENFJ',
    scores: {},
    title: '主人公',
    description: 'カリスマ的で鼓舞する指導者。他者の成長を支援し、社会に良い影響を与えることに情熱を注ぎます。',
    strengths: ['指導力', '共感力', 'コミュニケーション', '人間理解'],
    challenges: ['自己犠牲', '批判への敏感さ', '完璧主義'],
    compatibility: {
      best: ['INFP', 'ISFP'],
      good: ['ENFJ', 'INFJ', 'ENFP', 'ENTJ'],
      challenging: ['ISTP', 'INTP', 'ESTP', 'ESFP']
    }
  },
  ENFP: {
    type: 'ENFP',
    scores: {},
    title: '運動家',
    description: '熱心で創造的な社交家。人生は可能性に満ちていると信じ、人々とのつながりを大切にします。',
    strengths: ['熱意', '創造性', '社交性', '柔軟性'],
    challenges: ['集中力', '継続性', '詳細な作業'],
    compatibility: {
      best: ['INTJ', 'INFJ'],
      good: ['ENFP', 'ENTP', 'ENFJ', 'INFP'],
      challenging: ['ISTJ', 'ISFJ', 'ESTJ', 'ISTP']
    }
  },
  ISTJ: {
    type: 'ISTJ',
    scores: {},
    title: '管理者',
    description: '実用的で事実に基づく信頼できる人。責任感が強く、着実に目標を達成します。',
    strengths: ['責任感', '信頼性', '実用性', '組織力'],
    challenges: ['柔軟性', '新しいアイデア', '感情表現'],
    compatibility: {
      best: ['ESFP', 'ESTP'],
      good: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
      challenging: ['ENFP', 'ENTP', 'INFP', 'INTP']
    }
  },
  ISFJ: {
    type: 'ISFJ',
    scores: {},
    title: '擁護者',
    description: '温かく献身的な保護者。他者の幸福を守り、陰で支える役割を果たします。',
    strengths: ['思いやり', '責任感', '協調性', '実用性'],
    challenges: ['自己主張', '変化への適応', '過度な献身'],
    compatibility: {
      best: ['ENFP', 'ESFP'],
      good: ['ISFJ', 'ISTJ', 'ESFJ', 'ENFJ'],
      challenging: ['ENTP', 'INTP', 'ESTP', 'ISTP']
    }
  },
  ESTJ: {
    type: 'ESTJ',
    scores: {},
    title: '幹部',
    description: '優秀な管理者で、システムや人々を組織することに長けています。伝統と秩序を重視します。',
    strengths: ['組織力', 'リーダーシップ', '実行力', '責任感'],
    challenges: ['柔軟性', '感情への配慮', '創新性'],
    compatibility: {
      best: ['ISFP', 'INFP'],
      good: ['ESTJ', 'ISTJ', 'ESFJ', 'ENFJ'],
      challenging: ['ENTP', 'INTP', 'ENFP', 'INFP']
    }
  },
  ESFJ: {
    type: 'ESFJ',
    scores: {},
    title: '領事',
    description: '非常に思いやりがあり、社交的で人気者。他者の幸福を重視し、調和を作り出します。',
    strengths: ['思いやり', '社交性', '協調性', '責任感'],
    challenges: ['批判への敏感さ', '自己主張', '変化への抵抗'],
    compatibility: {
      best: ['ISFP', 'INFP'],
      good: ['ESFJ', 'ISFJ', 'ESTJ', 'ENFJ'],
      challenging: ['INTP', 'ENTP', 'ISTP', 'ESTP']
    }
  },
  ISTP: {
    type: 'ISTP',
    scores: {},
    title: '巨匠',
    description: '大胆で実用的な実験者。あらゆる種類の道具を使いこなす天性の才能があります。',
    strengths: ['実用性', '冷静さ', '適応力', '問題解決'],
    challenges: ['感情表現', '長期計画', '他者との協力'],
    compatibility: {
      best: ['ESFJ', 'ESTJ'],
      good: ['ISTP', 'ESTP', 'ISFP', 'ESFP'],
      challenging: ['ENFJ', 'INFJ', 'ENFP', 'INFP']
    }
  },
  ISFP: {
    type: 'ISFP',
    scores: {},
    title: '冒険家',
    description: '柔軟で魅力的な芸術家。新しい可能性や経験を探求することを好みます。',
    strengths: ['創造性', '柔軟性', '思いやり', '美的感覚'],
    challenges: ['自己主張', '長期計画', '批判への対応'],
    compatibility: {
      best: ['ENFJ', 'ESFJ'],
      good: ['ISFP', 'INFP', 'ESFP', 'ISTP'],
      challenging: ['ENTJ', 'INTJ', 'ESTJ', 'ISTJ']
    }
  },
  ESTP: {
    type: 'ESTP',
    scores: {},
    title: '起業家',
    description: 'エネルギッシュで知覚力のあるエンターテイナー。真に自発的で、周囲を明るくします。',
    strengths: ['エネルギッシュ', '実用性', '社交性', '適応力'],
    challenges: ['長期計画', '理論的思考', '感情への配慮'],
    compatibility: {
      best: ['ISFJ', 'ISTJ'],
      good: ['ESTP', 'ISTP', 'ESFP', 'ENFP'],
      challenging: ['INFJ', 'INTJ', 'INFP', 'INTP']
    }
  },
  ESFP: {
    type: 'ESFP',
    scores: {},
    title: 'エンターテイナー',
    description: '自発的でエネルギッシュで熱心な人。人生と人間関係を心から楽しみます。',
    strengths: ['社交性', '熱意', '柔軟性', '思いやり'],
    challenges: ['長期計画', '批判への対応', '集中力'],
    compatibility: {
      best: ['ISFJ', 'ISTJ'],
      good: ['ESFP', 'ISFP', 'ESTP', 'ENFP'],
      challenging: ['INTJ', 'INFJ', 'INTP', 'INFP']
    }
  }
};