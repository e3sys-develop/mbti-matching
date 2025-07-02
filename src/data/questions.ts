import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: "パーティーや集まりで、あなたは通常どのように過ごしますか？",
    options: [
      { text: "多くの人と積極的に話し、エネルギーをもらう", dimension: "E" },
      { text: "少数の親しい人とじっくり話すことを好む", dimension: "I" }
    ]
  },
  {
    id: 2,
    text: "新しい情報を学ぶとき、どちらのアプローチを好みますか？",
    options: [
      { text: "具体的な事実や詳細から学ぶ", dimension: "S" },
      { text: "全体像や可能性を考えて学ぶ", dimension: "N" }
    ]
  },
  {
    id: 3,
    text: "重要な決断をするとき、何を最も重視しますか？",
    options: [
      { text: "論理的な分析と客観的な事実", dimension: "T" },
      { text: "人への影響と価値観との整合性", dimension: "F" }
    ]
  },
  {
    id: 4,
    text: "日常生活において、どちらのスタイルを好みますか？",
    options: [
      { text: "計画を立てて、予定通りに進める", dimension: "J" },
      { text: "柔軟性を保ち、状況に応じて調整する", dimension: "P" }
    ]
  },
  {
    id: 5,
    text: "ストレスを感じたとき、どのように対処しますか？",
    options: [
      { text: "友人と話し、外に出てリフレッシュする", dimension: "E" },
      { text: "一人の時間を作り、内省して回復する", dimension: "I" }
    ]
  },
  {
    id: 6,
    text: "仕事や勉強で、どちらのタイプの課題を好みますか？",
    options: [
      { text: "実践的で具体的な成果が見える課題", dimension: "S" },
      { text: "創造的で理論的な可能性を探る課題", dimension: "N" }
    ]
  },
  {
    id: 7,
    text: "友人が悩みを相談してきたとき、どう対応しますか？",
    options: [
      { text: "問題を分析し、解決策を提案する", dimension: "T" },
      { text: "感情に共感し、支えになる言葉をかける", dimension: "F" }
    ]
  },
  {
    id: 8,
    text: "休日の過ごし方として、どちらを好みますか？",
    options: [
      { text: "事前に計画を立てて、予定を決めておく", dimension: "J" },
      { text: "その時の気分で自由に決める", dimension: "P" }
    ]
  },
  {
    id: 9,
    text: "会議や議論の場で、あなたの役割は？",
    options: [
      { text: "積極的に発言し、議論をリードする", dimension: "E" },
      { text: "よく聞いて、考えをまとめてから発言する", dimension: "I" }
    ]
  },
  {
    id: 10,
    text: "新しいプロジェクトを始めるとき、何から取り組みますか？",
    options: [
      { text: "具体的な手順と必要な資源を確認する", dimension: "S" },
      { text: "可能性とアイデアを広げて考える", dimension: "N" }
    ]
  },
  {
    id: 11,
    text: "チームで衝突が起きたとき、どう行動しますか？",
    options: [
      { text: "事実を整理し、合理的な解決策を探す", dimension: "T" },
      { text: "みんなの気持ちを理解し、調和を重視する", dimension: "F" }
    ]
  },
  {
    id: 12,
    text: "長期的な目標に向けて、どのように進めますか？",
    options: [
      { text: "段階的な計画を立てて着実に実行する", dimension: "J" },
      { text: "状況を見ながら柔軟にアプローチを変える", dimension: "P" }
    ]
  }
];