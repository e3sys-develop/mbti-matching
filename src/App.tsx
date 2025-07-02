import React, { useState, useEffect } from 'react';
import { Heart, ArrowLeft, RotateCcw, Users, Share2, Brain } from 'lucide-react';
import { Button } from './components/Button';
import { ProgressBar } from './components/ProgressBar';
import { MBTISelector } from './components/MBTISelector';
import { ShareCard } from './components/ShareCard';
import { questions } from './data/questions';
import { mbtiTypes } from './data/mbtiTypes';
import { getCompatibility } from './data/compatibility';
import { calculateMBTI, getMBTITypeFromUrl } from './utils/mbti';
import { saveTestResult, saveCompatibilityResult, getLastTestResult } from './utils/storage';
import { AppState } from './types';

function App() {
  const [state, setState] = useState<AppState>({
    currentPage: 'home',
    currentQuestion: 0,
    answers: {},
    userMBTI: null,
    partnerMBTI: null,
    testResults: null,
    compatibilityResults: null,
    shareMode: null
  });

  useEffect(() => {
    // Check if user came from a shared URL
    const urlType = getMBTITypeFromUrl();
    if (urlType && mbtiTypes[urlType]) {
      setState(prev => ({ 
        ...prev, 
        userMBTI: urlType, 
        testResults: mbtiTypes[urlType],
        currentPage: 'result'
      }));
    } else {
      // Check for saved results
      const savedType = getLastTestResult();
      if (savedType && mbtiTypes[savedType]) {
        setState(prev => ({ 
          ...prev, 
          userMBTI: savedType, 
          testResults: mbtiTypes[savedType]
        }));
      }
    }
  }, []);

  const startTest = () => {
    setState(prev => ({
      ...prev,
      currentPage: 'test',
      currentQuestion: 0,
      answers: {}
    }));
  };

  const selectUserMBTI = (type: string) => {
    const results = mbtiTypes[type];
    saveTestResult(type);
    
    setState(prev => ({
      ...prev,
      userMBTI: type,
      testResults: results
    }));
  };

  const goToCompatibilityDirect = () => {
    setState(prev => ({
      ...prev,
      currentPage: 'compatibility',
      partnerMBTI: null,
      compatibilityResults: null
    }));
  };

  const answerQuestion = (dimension: string) => {
    const newAnswers = { ...state.answers, [state.currentQuestion]: dimension };
    
    if (state.currentQuestion < questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        answers: newAnswers
      }));
    } else {
      // Test completed
      const mbtiType = calculateMBTI(newAnswers);
      const results = mbtiTypes[mbtiType];
      
      saveTestResult(mbtiType);
      
      setState(prev => ({
        ...prev,
        currentPage: 'result',
        userMBTI: mbtiType,
        testResults: results,
        answers: newAnswers
      }));
    }
  };

  const goToCompatibility = () => {
    setState(prev => ({
      ...prev,
      currentPage: 'compatibility',
      partnerMBTI: null,
      compatibilityResults: null
    }));
  };

  const calculateCompatibility = () => {
    if (!state.userMBTI || !state.partnerMBTI) return;
    
    const results = getCompatibility(state.userMBTI, state.partnerMBTI);
    saveCompatibilityResult(state.userMBTI, state.partnerMBTI, results.score);
    
    setState(prev => ({
      ...prev,
      compatibilityResults: results
    }));
  };

  const goToShare = (mode: 'test' | 'compatibility') => {
    setState(prev => ({
      ...prev,
      currentPage: 'share',
      shareMode: mode
    }));
  };

  const resetTest = () => {
    setState(prev => ({
      ...prev,
      currentPage: 'home',
      currentQuestion: 0,
      answers: {},
      userMBTI: null,
      partnerMBTI: null,
      testResults: null,
      compatibilityResults: null,
      shareMode: null
    }));
  };

  const goBack = () => {
    if (state.currentPage === 'test') {
      if (state.currentQuestion > 0) {
        setState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion - 1
        }));
      } else {
        setState(prev => ({ ...prev, currentPage: 'home' }));
      }
    } else if (state.currentPage === 'result') {
      setState(prev => ({ ...prev, currentPage: 'home' }));
    } else if (state.currentPage === 'compatibility') {
      setState(prev => ({ ...prev, currentPage: 'home' }));
    } else if (state.currentPage === 'share') {
      setState(prev => ({ 
        ...prev, 
        currentPage: state.shareMode === 'test' ? 'result' : 'compatibility' 
      }));
    }
  };

  const renderHomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full">
            <Heart className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">MBTI相性診断</h1>
          <p className="text-gray-600 leading-relaxed">
            あなたのMBTIタイプと理想の相手との相性をチェックしましょう！
          </p>
        </div>

        <div className="space-y-4">
          {/* Quick compatibility test for users who know their MBTI */}
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-2xl border border-teal-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              🚀 すぐに相性診断
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              自分のMBTIタイプを知っている方はこちら
            </p>
            
            {!state.userMBTI ? (
              <div className="space-y-3">
                <MBTISelector
                  selectedType=""
                  onSelect={selectUserMBTI}
                  label="あなたのMBTIタイプを選択"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-teal-100 text-teal-800 px-4 py-2 rounded-lg font-semibold">
                  あなた: {state.userMBTI} ({mbtiTypes[state.userMBTI].title})
                </div>
                <Button
                  onClick={goToCompatibilityDirect}
                  size="lg"
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                  icon={Users}
                >
                  相性診断を始める
                </Button>
              </div>
            )}
          </div>

          {/* Traditional test option */}
          <div className="space-y-3">
            <div className="text-sm text-gray-500 flex items-center justify-center space-x-2">
              <div className="h-px bg-gray-300 flex-1"></div>
              <span>または</span>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>
            
            <Button
              onClick={startTest}
              size="lg"
              className="w-full"
              icon={Brain}
            >
              診断テストから始める
            </Button>
            
            <p className="text-xs text-gray-500">
              12問の質問であなたの性格タイプを診断
            </p>
          </div>

          {state.userMBTI && (
            <div className="pt-2">
              <Button
                onClick={resetTest}
                variant="outline"
                size="sm"
                className="text-gray-500 border-gray-300"
              >
                最初からやり直す
              </Button>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-400 pt-4">
          結果をSNSでシェアして友達と比較しよう！
        </div>
      </div>
    </div>
  );

  const renderTestPage = () => {
    const currentQ = questions[state.currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={goBack}
              variant="outline"
              size="sm"
              icon={ArrowLeft}
              className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-blue-600"
            >
              戻る
            </Button>
            <div className="text-white font-semibold">
              {state.currentQuestion + 1} / {questions.length}
            </div>
          </div>

          <ProgressBar current={state.currentQuestion + 1} total={questions.length} />

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center leading-relaxed">
              {currentQ.text}
            </h2>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => answerQuestion(option.dimension)}
                  className="w-full p-6 text-left bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0" />
                    <span className="text-gray-800 font-medium leading-relaxed">
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResultPage = () => {
    if (!state.testResults || !state.userMBTI) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-blue-600 p-4">
        <div className="max-w-2xl mx-auto pt-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              onClick={goBack}
              variant="outline"
              size="sm"
              icon={ArrowLeft}
              className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-teal-600"
            >
              戻る
            </Button>
            <Button
              onClick={resetTest}
              variant="outline"
              size="sm"
              icon={RotateCcw}
              className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-teal-600"
            >
              再診断
            </Button>
          </div>

          {/* Result Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                {state.testResults.title}
              </div>
              <div className="text-2xl font-bold text-gray-700">
                {state.userMBTI}
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {state.testResults.description}
              </p>
            </div>

            {/* Strengths */}
            <div className="text-left space-y-3">
              <h3 className="font-bold text-xl text-gray-800">✨ あなたの強み</h3>
              <div className="grid grid-cols-2 gap-2">
                {state.testResults.strengths.map((strength, index) => (
                  <div key={index} className="bg-teal-50 text-teal-700 px-3 py-2 rounded-lg text-sm font-medium">
                    {strength}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <Button
                onClick={goToCompatibility}
                size="lg"
                className="w-full"
                icon={Users}
              >
                相性診断をする
              </Button>
              <Button
                onClick={() => goToShare('test')}
                variant="secondary"
                className="w-full"
                icon={Share2}
              >
                結果をシェア
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCompatibilityPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-orange-500 p-4">
      <div className="max-w-2xl mx-auto pt-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={goBack}
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-pink-600"
          >
            戻る
          </Button>
          <div className="text-white font-semibold">相性診断</div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
          {!state.compatibilityResults ? (
            <>
              {/* Your Type */}
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold text-gray-800">相性診断</h2>
                <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-xl">
                  あなた: {state.userMBTI} ({state.testResults?.title})
                </div>
              </div>

              {/* Partner Selection */}
              <div className="space-y-4">
                <MBTISelector
                  selectedType={state.partnerMBTI || ''}
                  onSelect={(type) => setState(prev => ({ ...prev, partnerMBTI: type }))}
                  label="相手のMBTIタイプを選択"
                />
              </div>

              {/* Calculate Button */}
              {state.partnerMBTI && (
                <Button
                  onClick={calculateCompatibility}
                  size="lg"
                  className="w-full"
                  icon={Heart}
                >
                  相性を診断する
                </Button>
              )}
            </>
          ) : (
            /* Results */
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">相性診断結果</h2>
                <div className="flex justify-center items-center space-x-4 text-xl">
                  <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg font-semibold">
                    {state.userMBTI}
                  </span>
                  <Heart className="w-6 h-6 text-pink-500" />
                  <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-semibold">
                    {state.partnerMBTI}
                  </span>
                </div>
                
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
                  {state.compatibilityResults.score}点
                </div>
                
                <div className="text-2xl font-bold text-gray-700">
                  {state.compatibilityResults.title}
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  {state.compatibilityResults.description}
                </p>
              </div>

              {/* Pros and Cons */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-green-700">👍 良い点</h3>
                  <ul className="space-y-2">
                    {state.compatibilityResults.pros.map((pro, index) => (
                      <li key={index} className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm">
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-amber-700">⚠️ 注意点</h3>
                  <ul className="space-y-2">
                    {state.compatibilityResults.cons.map((con, index) => (
                      <li key={index} className="bg-amber-50 text-amber-700 px-3 py-2 rounded-lg text-sm">
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Advice */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-blue-700">💡 アドバイス</h3>
                <ul className="space-y-2">
                  {state.compatibilityResults.advice.map((advice, index) => (
                    <li key={index} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm">
                      {advice}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <Button
                  onClick={() => goToShare('compatibility')}
                  size="lg"
                  className="w-full"
                  icon={Share2}
                >
                  結果をシェア
                </Button>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => setState(prev => ({ 
                      ...prev, 
                      partnerMBTI: null, 
                      compatibilityResults: null 
                    }))}
                    variant="outline"
                    className="w-full"
                  >
                    別の相手
                  </Button>
                  <Button
                    onClick={resetTest}
                    variant="outline"
                    className="w-full"
                  >
                    最初から
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSharePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={goBack}
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-indigo-600"
          >
            戻る
          </Button>
          <div className="text-white font-semibold">結果をシェア</div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6">
          <ShareCard
            mbtiType={state.shareMode === 'test' ? state.userMBTI || undefined : undefined}
            compatibilityScore={state.shareMode === 'compatibility' ? state.compatibilityResults?.score : undefined}
            userType={state.shareMode === 'compatibility' ? state.userMBTI || undefined : undefined}
            partnerType={state.shareMode === 'compatibility' ? state.partnerMBTI || undefined : undefined}
            mode={state.shareMode || 'test'}
          />
        </div>
      </div>
    </div>
  );

  // Render appropriate page
  switch (state.currentPage) {
    case 'test':
      return renderTestPage();
    case 'result':
      return renderResultPage();
    case 'compatibility':
      return renderCompatibilityPage();
    case 'share':
      return renderSharePage();
    default:
      return renderHomePage();
  }
}

export default App;