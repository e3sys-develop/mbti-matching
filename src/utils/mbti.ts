export const calculateMBTI = (answers: Record<number, string>): string => {
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  Object.values(answers).forEach(dimension => {
    scores[dimension as keyof typeof scores]++;
  });

  const type = 
    (scores.E > scores.I ? 'E' : 'I') +
    (scores.S > scores.N ? 'S' : 'N') +
    (scores.T > scores.F ? 'T' : 'F') +
    (scores.J > scores.P ? 'J' : 'P');

  return type;
};

export const getMBTITypeFromUrl = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get('type');
};

export const createShareUrl = (mbtiType: string): string => {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?type=${mbtiType}&utm_source=share&utm_medium=social&utm_campaign=mbti_test`;
};

export const shareToTwitter = (text: string, url: string) => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=MBTI相性診断,性格診断`;
  window.open(twitterUrl, '_blank');
};

export const generateShareText = (mbtiType: string, compatibilityScore?: number): string => {
  if (compatibilityScore) {
    return `私の相性診断結果は${compatibilityScore}点でした！あなたも診断してみませんか？ #MBTI相性診断`;
  }
  return `私のMBTIタイプは${mbtiType}でした！あなたのタイプは何ですか？ #MBTI相性診断`;
};