export const saveTestResult = (mbtiType: string) => {
  localStorage.setItem('mbti_result', mbtiType);
  localStorage.setItem('mbti_test_date', new Date().toISOString());
  
  // Analytics tracking
  const testCount = parseInt(localStorage.getItem('test_count') || '0');
  localStorage.setItem('test_count', (testCount + 1).toString());
};

export const saveCompatibilityResult = (userType: string, partnerType: string, score: number) => {
  const compatibilityData = {
    userType,
    partnerType,
    score,
    date: new Date().toISOString()
  };
  
  const results = getCompatibilityHistory();
  results.push(compatibilityData);
  localStorage.setItem('compatibility_results', JSON.stringify(results.slice(-10))); // Keep last 10
  
  // Analytics tracking
  const compatibilityCount = parseInt(localStorage.getItem('compatibility_count') || '0');
  localStorage.setItem('compatibility_count', (compatibilityCount + 1).toString());
};

export const getLastTestResult = (): string | null => {
  return localStorage.getItem('mbti_result');
};

export const getCompatibilityHistory = () => {
  const history = localStorage.getItem('compatibility_results');
  return history ? JSON.parse(history) : [];
};

export const trackShare = (type: 'test' | 'compatibility') => {
  const shareCount = parseInt(localStorage.getItem(`${type}_shares`) || '0');
  localStorage.setItem(`${type}_shares`, (shareCount + 1).toString());
};

export const getAnalytics = () => {
  return {
    testCount: parseInt(localStorage.getItem('test_count') || '0'),
    compatibilityCount: parseInt(localStorage.getItem('compatibility_count') || '0'),
    testShares: parseInt(localStorage.getItem('test_shares') || '0'),
    compatibilityShares: parseInt(localStorage.getItem('compatibility_shares') || '0')
  };
};