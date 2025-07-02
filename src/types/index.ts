export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  }[];
}

export interface MBTIResult {
  type: string;
  scores: Record<string, number>;
  title: string;
  description: string;
  strengths: string[];
  challenges: string[];
  compatibility: {
    best: string[];
    good: string[];
    challenging: string[];
  };
}

export interface CompatibilityResult {
  score: number;
  level: 'excellent' | 'good' | 'fair' | 'challenging';
  title: string;
  description: string;
  advice: string[];
  pros: string[];
  cons: string[];
}

export interface AppState {
  currentPage: 'home' | 'test' | 'result' | 'compatibility' | 'share';
  currentQuestion: number;
  answers: Record<number, string>;
  userMBTI: string | null;
  partnerMBTI: string | null;
  testResults: MBTIResult | null;
  compatibilityResults: CompatibilityResult | null;
  shareMode: 'test' | 'compatibility' | null;
}