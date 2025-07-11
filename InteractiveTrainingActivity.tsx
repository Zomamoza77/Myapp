import React, { useState, useRef, useEffect } from 'react';
import { X, CheckCircle, XCircle, RotateCcw, Trophy, Star, Clock, Target, Brain, Sparkles, Award, Flame, ChevronRight, Play, Pause, Volume2, VolumeX, BookOpen, PenTool, Lightbulb, Zap, Crown, Gift, Heart, Coffee, Rocket, Gem, Magnet as Magic } from 'lucide-react';

interface TrainingActivityProps {
  onClose: () => void;
  language?: 'ar' | 'en';
  theme?: 'light' | 'dark' | 'teal';
}

interface Question {
  id: string;
  type: 'synonym' | 'antonym' | 'meaning' | 'context' | 'grammar' | 'aesthetic';
  blank: number;
  question: { ar: string; en: string };
  options: { id: string; text: { ar: string; en: string }; correct: boolean }[];
}

interface TrainingText {
  id: string;
  title: { ar: string; en: string };
  content: { ar: string; en: string };
  blanks: string[];
  questions: Question[];
}

const InteractiveTrainingActivity: React.FC<TrainingActivityProps> = ({ 
  onClose, 
  language = 'en',
  theme = 'teal'
}) => {
  const [currentText, setCurrentText] = useState<TrainingText | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedActivities, setCompletedActivities] = useState(0);
  const [streak, setStreak] = useState(7);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isRTL = language === 'ar';

  // Multilingual content
  const content = {
    ar: {
      title: 'نشاط التدريب التفاعلي',
      subtitle: 'اسحب الكلمات المناسبة إلى مكانها الصحيح',
      instructions: 'اقرأ النص واختر الكلمة المناسبة لكل فراغ',
      timeSpent: 'الوقت المستغرق',
      score: 'النتيجة',
      complete: 'إنهاء النشاط',
      tryAgain: 'حاول مرة أخرى',
      nextActivity: 'النشاط التالي',
      excellent: 'أداء مميز! أنت تتقدم بثبات.',
      good: 'أداء جيد! حاول مرة أخرى للوصول للأفضل.',
      needsWork: 'لا بأس، التدريب طريق النجاح. أعد المحاولة.',
      congratulations: 'تهانينا!',
      perfectScore: 'نتيجة مثالية!',
      wellDone: 'أحسنت!',
      keepGoing: 'استمر!',
      dragHere: 'اسحب الكلمة هنا',
      correctAnswers: 'الإجابات الصحيحة',
      totalQuestions: 'إجمالي الأسئلة',
      accuracy: 'الدقة',
      streak: 'سلسلة النجاح',
      activitiesCompleted: 'الأنشطة المكتملة',
      dailyGoal: 'الهدف اليومي'
    },
    en: {
      title: 'Interactive Training Activity',
      subtitle: 'Drag the appropriate words to their correct positions',
      instructions: 'Read the text and choose the appropriate word for each blank',
      timeSpent: 'Time Spent',
      score: 'Score',
      complete: 'Complete Activity',
      tryAgain: 'Try Again',
      nextActivity: 'Next Activity',
      excellent: 'Excellent work! You are progressing steadily.',
      good: 'Good work! Try again to reach excellence.',
      needsWork: 'No worries, practice makes perfect. Try again.',
      congratulations: 'Congratulations!',
      perfectScore: 'Perfect Score!',
      wellDone: 'Well Done!',
      keepGoing: 'Keep Going!',
      dragHere: 'Drag word here',
      correctAnswers: 'Correct Answers',
      totalQuestions: 'Total Questions',
      accuracy: 'Accuracy',
      streak: 'Streak',
      activitiesCompleted: 'Activities Completed',
      dailyGoal: 'Daily Goal'
    }
  };

  const t = content[language];

  // Sample training text
  const sampleText: TrainingText = {
    id: 'text-1',
    title: { 
      ar: 'أهمية القراءة في حياة الإنسان', 
      en: 'The Importance of Reading in Human Life' 
    },
    content: {
      ar: `تُعتبر القراءة من أهم _____ التي يمكن للإنسان أن يمارسها في حياته. فهي تفتح أمامه _____ واسعة من المعرفة والثقافة. والقراءة لا تقتصر على _____ المعلومات فحسب، بل تساعد على تنمية _____ النقدي والإبداعي. كما أنها تُثري _____ اللغوية وتحسن من قدرات التعبير والكتابة.

إن الشخص الذي يقرأ بانتظام يصبح أكثر _____ وفهماً للعالم من حوله. والقراءة تساعد على _____ الخيال وتطوير القدرة على التصور. كما أنها وسيلة ممتازة للترفيه و_____ من ضغوط الحياة اليومية.

لذلك، ينبغي على كل إنسان أن يجعل القراءة _____ أساسياً في حياته اليومية، وأن يخصص لها وقتاً _____ كل يوم.`,
      en: `Reading is one of the most important _____ that humans can practice in their lives. It opens up _____ horizons of knowledge and culture. Reading is not limited to _____ information only, but also helps develop _____ and creative thinking. It also enriches _____ vocabulary and improves expression and writing abilities.

A person who reads regularly becomes more _____ and understanding of the world around them. Reading helps _____ imagination and develop visualization skills. It is also an excellent means of entertainment and _____ from daily life pressures.

Therefore, every person should make reading a _____ part of their daily life, and allocate _____ time for it every day.`
    },
    blanks: [
      'الأنشطة/activities', 'آفاقاً/vast', 'اكتساب/acquiring', 'التفكير/critical', 'المفردات/their',
      'ثقافة/cultured', 'تحفيز/stimulate', 'الاسترخاء/relaxation', 'جزءاً/fundamental', 'محدداً/specific'
    ],
    questions: [
      {
        id: 'q1',
        type: 'synonym',
        blank: 0,
        question: { ar: 'ما مرادف كلمة "الأنشطة"؟', en: 'What is a synonym for "activities"?' },
        options: [
          { id: 'a1', text: { ar: 'الأعمال', en: 'tasks' }, correct: true },
          { id: 'a2', text: { ar: 'الألعاب', en: 'games' }, correct: false },
          { id: 'a3', text: { ar: 'الرياضة', en: 'sports' }, correct: false },
          { id: 'a4', text: { ar: 'الدراسة', en: 'study' }, correct: false },
          { id: 'a5', text: { ar: 'النوم', en: 'sleep' }, correct: false }
        ]
      },
      {
        id: 'q2',
        type: 'context',
        blank: 1,
        question: { ar: 'أي كلمة تناسب السياق "آفاقاً واسعة"؟', en: 'Which word fits the context "vast horizons"?' },
        options: [
          { id: 'b1', text: { ar: 'آفاقاً', en: 'vast' }, correct: true },
          { id: 'b2', text: { ar: 'طرقاً', en: 'ways' }, correct: false },
          { id: 'b3', text: { ar: 'أبواباً', en: 'doors' }, correct: false },
          { id: 'b4', text: { ar: 'نوافذ', en: 'windows' }, correct: false },
          { id: 'b5', text: { ar: 'جدران', en: 'walls' }, correct: false }
        ]
      },
      {
        id: 'q3',
        type: 'meaning',
        blank: 2,
        question: { ar: 'ما المقصود بـ "اكتساب المعلومات"؟', en: 'What is meant by "acquiring information"?' },
        options: [
          { id: 'c1', text: { ar: 'اكتساب', en: 'acquiring' }, correct: true },
          { id: 'c2', text: { ar: 'فقدان', en: 'losing' }, correct: false },
          { id: 'c3', text: { ar: 'تجاهل', en: 'ignoring' }, correct: false },
          { id: 'c4', text: { ar: 'نسيان', en: 'forgetting' }, correct: false },
          { id: 'c5', text: { ar: 'رفض', en: 'rejecting' }, correct: false }
        ]
      },
      {
        id: 'q4',
        type: 'grammar',
        blank: 3,
        question: { ar: 'أي كلمة تكمل "تنمية _____ النقدي"؟', en: 'Which word completes "develop _____ thinking"?' },
        options: [
          { id: 'd1', text: { ar: 'التفكير', en: 'critical' }, correct: true },
          { id: 'd2', text: { ar: 'الشعور', en: 'feeling' }, correct: false },
          { id: 'd3', text: { ar: 'الحديث', en: 'talking' }, correct: false },
          { id: 'd4', text: { ar: 'المشي', en: 'walking' }, correct: false },
          { id: 'd5', text: { ar: 'الأكل', en: 'eating' }, correct: false }
        ]
      },
      {
        id: 'q5',
        type: 'context',
        blank: 4,
        question: { ar: 'ما الكلمة المناسبة لـ "تُثري _____ اللغوية"؟', en: 'What word fits "enriches _____ vocabulary"?' },
        options: [
          { id: 'e1', text: { ar: 'المفردات', en: 'their' }, correct: true },
          { id: 'e2', text: { ar: 'الأصوات', en: 'sounds' }, correct: false },
          { id: 'e3', text: { ar: 'الألوان', en: 'colors' }, correct: false },
          { id: 'e4', text: { ar: 'الأرقام', en: 'numbers' }, correct: false },
          { id: 'e5', text: { ar: 'الأشكال', en: 'shapes' }, correct: false }
        ]
      },
      {
        id: 'q6',
        type: 'synonym',
        blank: 5,
        question: { ar: 'ما مرادف "أكثر ثقافة"؟', en: 'What is a synonym for "more cultured"?' },
        options: [
          { id: 'f1', text: { ar: 'ثقافة', en: 'cultured' }, correct: true },
          { id: 'f2', text: { ar: 'جهلاً', en: 'ignorant' }, correct: false },
          { id: 'f3', text: { ar: 'كسلاً', en: 'lazy' }, correct: false },
          { id: 'f4', text: { ar: 'غضباً', en: 'angry' }, correct: false },
          { id: 'f5', text: { ar: 'حزناً', en: 'sad' }, correct: false }
        ]
      },
      {
        id: 'q7',
        type: 'meaning',
        blank: 6,
        question: { ar: 'ما معنى "تحفيز الخيال"؟', en: 'What does "stimulate imagination" mean?' },
        options: [
          { id: 'g1', text: { ar: 'تحفيز', en: 'stimulate' }, correct: true },
          { id: 'g2', text: { ar: 'قتل', en: 'kill' }, correct: false },
          { id: 'g3', text: { ar: 'تدمير', en: 'destroy' }, correct: false },
          { id: 'g4', text: { ar: 'إهمال', en: 'neglect' }, correct: false },
          { id: 'g5', text: { ar: 'منع', en: 'prevent' }, correct: false }
        ]
      },
      {
        id: 'q8',
        type: 'context',
        blank: 7,
        question: { ar: 'أي كلمة تناسب "_____ من ضغوط الحياة"؟', en: 'Which word fits "_____ from life pressures"?' },
        options: [
          { id: 'h1', text: { ar: 'الاسترخاء', en: 'relaxation' }, correct: true },
          { id: 'h2', text: { ar: 'الزيادة', en: 'increase' }, correct: false },
          { id: 'h3', text: { ar: 'التعقيد', en: 'complication' }, correct: false },
          { id: 'h4', text: { ar: 'التوتر', en: 'tension' }, correct: false },
          { id: 'h5', text: { ar: 'القلق', en: 'anxiety' }, correct: false }
        ]
      },
      {
        id: 'q9',
        type: 'grammar',
        blank: 8,
        question: { ar: 'ما الكلمة الصحيحة لـ "جزءاً أساسياً"؟', en: 'What is the correct word for "fundamental part"?' },
        options: [
          { id: 'i1', text: { ar: 'جزءاً', en: 'fundamental' }, correct: true },
          { id: 'i2', text: { ar: 'شيئاً', en: 'something' }, correct: false },
          { id: 'i3', text: { ar: 'مكاناً', en: 'place' }, correct: false },
          { id: 'i4', text: { ar: 'وقتاً', en: 'time' }, correct: false },
          { id: 'i5', text: { ar: 'طعاماً', en: 'food' }, correct: false }
        ]
      },
      {
        id: 'q10',
        type: 'context',
        blank: 9,
        question: { ar: 'أي كلمة تكمل "وقتاً _____ كل يوم"؟', en: 'Which word completes "_____ time every day"?' },
        options: [
          { id: 'j1', text: { ar: 'محدداً', en: 'specific' }, correct: true },
          { id: 'j2', text: { ar: 'طويلاً', en: 'long' }, correct: false },
          { id: 'j3', text: { ar: 'قصيراً', en: 'short' }, correct: false },
          { id: 'j4', text: { ar: 'ممتعاً', en: 'enjoyable' }, correct: false },
          { id: 'j5', text: { ar: 'صعباً', en: 'difficult' }, correct: false }
        ]
      }
    ]
  };

  // Timer effect
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  // Initialize activity
  useEffect(() => {
    setCurrentText(sampleText);
  }, []);

  // Theme styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return {
          bg: 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900',
          cardBg: 'bg-gray-800/80',
          textPrimary: 'text-white',
          textSecondary: 'text-gray-300',
          border: 'border-gray-700',
          accent: 'from-blue-500 to-purple-600'
        };
      case 'teal':
        return {
          bg: 'bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50',
          cardBg: 'bg-white/90',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          border: 'border-teal-200',
          accent: 'from-teal-500 to-emerald-600'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
          cardBg: 'bg-white/80',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          border: 'border-gray-200',
          accent: 'from-blue-500 to-purple-600'
        };
    }
  };

  const themeStyles = getThemeStyles();

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, optionId: string) => {
    setDraggedItem(optionId);
    e.dataTransfer.effectAllowed = 'move';
    
    if (soundEnabled) {
      playSound('pickup');
    }
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, blankIndex: number) => {
    e.preventDefault();
    
    if (draggedItem) {
      setUserAnswers(prev => ({
        ...prev,
        [blankIndex]: draggedItem
      }));
      
      if (soundEnabled) {
        playSound('drop');
      }
    }
    
    setDraggedItem(null);
  };

  // Play sound effects
  const playSound = (type: 'pickup' | 'drop' | 'success' | 'error' | 'complete') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'pickup':
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        break;
      case 'drop':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        break;
      case 'success':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        break;
      case 'error':
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        break;
      case 'complete':
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.4);
        break;
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  // Complete activity
  const completeActivity = () => {
    if (!currentText) return;
    
    setIsActive(false);
    
    let correctCount = 0;
    currentText.questions.forEach((question, index) => {
      const userAnswer = userAnswers[question.blank];
      const correctOption = question.options.find(opt => opt.correct);
      if (userAnswer === correctOption?.id) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setShowResults(true);
    
    if (soundEnabled) {
      if (correctCount >= 8) {
        playSound('complete');
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      } else if (correctCount >= 5) {
        playSound('success');
      } else {
        playSound('error');
      }
    }
    
    setCompletedActivities(prev => prev + 1);
  };

  // Reset activity
  const resetActivity = () => {
    setUserAnswers({});
    setScore(0);
    setTimeSpent(0);
    setShowResults(false);
    setIsActive(true);
    setDraggedItem(null);
  };

  // Get feedback message
  const getFeedbackMessage = () => {
    if (score >= 8) return t.excellent;
    if (score >= 5) return t.good;
    return t.needsWork;
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render text with blanks
  const renderTextWithBlanks = () => {
    if (!currentText) return null;
    
    const text = currentText.content[language];
    const parts = text.split('_____');
    
    return (
      <div className={`text-lg leading-relaxed ${isRTL ? 'text-right' : 'text-left'} ${themeStyles.textPrimary}`}>
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && (
              <span
                className={`inline-block mx-2 px-4 py-2 min-w-[120px] border-2 border-dashed ${
                  userAnswers[index] 
                    ? `${themeStyles.border} bg-gradient-to-r ${themeStyles.accent} text-white` 
                    : 'border-gray-300 bg-gray-50'
                } rounded-lg text-center cursor-pointer transition-all duration-200 hover:border-teal-400`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                {userAnswers[index] ? (
                  currentText.questions.find(q => q.blank === index)?.options.find(opt => opt.id === userAnswers[index])?.text[language] || t.dragHere
                ) : (
                  <span className="text-gray-400 text-sm">{t.dragHere}</span>
                )}
              </span>
            )}
          </span>
        ))}
      </div>
    );
  };

  if (!currentText) return null;

  return (
    <div className={`fixed inset-0 ${themeStyles.bg} z-50 overflow-auto ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">
            🎉✨🏆✨🎉
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 animate-pulse"></div>
        </div>
      )}

      {/* Header */}
      <div className={`${themeStyles.cardBg} backdrop-blur-md border-b ${themeStyles.border} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${themeStyles.accent} rounded-xl flex items-center justify-center animate-pulse`}>
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                {t.title}
              </h1>
              <p className={`text-sm ${themeStyles.textSecondary}`}>
                {t.subtitle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Stats */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className={`text-sm ${themeStyles.textSecondary}`}>{t.timeSpent}</div>
                <div className={`text-lg font-bold ${themeStyles.textPrimary}`}>{formatTime(timeSpent)}</div>
              </div>
              
              <div className="text-center">
                <div className={`text-sm ${themeStyles.textSecondary}`}>{t.streak}</div>
                <div className={`text-lg font-bold text-orange-600 flex items-center`}>
                  <Flame className="w-4 h-4 mr-1" />
                  {streak}
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-sm ${themeStyles.textSecondary}`}>{t.activitiesCompleted}</div>
                <div className={`text-lg font-bold text-teal-600`}>{completedActivities}</div>
              </div>
            </div>

            {/* Controls */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                soundEnabled 
                  ? 'bg-teal-100 text-teal-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            
            <button
              onClick={onClose}
              className={`p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 ${themeStyles.textSecondary}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Progress & Stats */}
        <div className={`w-80 ${themeStyles.cardBg} backdrop-blur-md border-r ${themeStyles.border} p-6 overflow-y-auto`}>
          
          {/* Progress Circle */}
          <div className="text-center mb-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - Object.keys(userAnswers).length / 10)}`}
                  className="text-teal-500 transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
                    {Object.keys(userAnswers).length}/10
                  </div>
                  <div className={`text-xs ${themeStyles.textSecondary}`}>
                    Completed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Goal Progress */}
          <div className={`${themeStyles.cardBg} rounded-xl p-4 mb-6 border ${themeStyles.border}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${themeStyles.textPrimary}`}>{t.dailyGoal}</span>
              <Target className="w-4 h-4 text-teal-600" />
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-teal-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((completedActivities / 5) * 100, 100)}%` }}
              ></div>
            </div>
            <div className={`text-xs ${themeStyles.textSecondary} mt-1`}>
              {completedActivities}/5 activities
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-4 flex items-center`}>
              <Award className="w-5 h-5 mr-2 text-yellow-600" />
              Today's Achievements
            </h3>
            
            <div className="space-y-3">
              <div className={`${themeStyles.cardBg} rounded-xl p-3 border ${themeStyles.border} ${completedActivities >= 1 ? 'ring-2 ring-yellow-400' : 'opacity-50'}`}>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <div className={`font-medium ${themeStyles.textPrimary}`}>First Activity</div>
                    <div className={`text-xs ${themeStyles.textSecondary}`}>Complete your first training</div>
                  </div>
                  {completedActivities >= 1 && <CheckCircle className="w-5 h-5 text-yellow-500" />}
                </div>
              </div>
              
              <div className={`${themeStyles.cardBg} rounded-xl p-3 border ${themeStyles.border} ${completedActivities >= 3 ? 'ring-2 ring-yellow-400' : 'opacity-50'}`}>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <div className={`font-medium ${themeStyles.textPrimary}`}>Speed Learner</div>
                    <div className={`text-xs ${themeStyles.textSecondary}`}>Complete 3 activities</div>
                  </div>
                  {completedActivities >= 3 && <CheckCircle className="w-5 h-5 text-yellow-500" />}
                </div>
              </div>
              
              <div className={`${themeStyles.cardBg} rounded-xl p-3 border ${themeStyles.border} ${completedActivities >= 5 ? 'ring-2 ring-yellow-400' : 'opacity-50'}`}>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">👑</div>
                  <div>
                    <div className={`font-medium ${themeStyles.textPrimary}`}>Daily Champion</div>
                    <div className={`text-xs ${themeStyles.textSecondary}`}>Complete daily goal</div>
                  </div>
                  {completedActivities >= 5 && <CheckCircle className="w-5 h-5 text-yellow-500" />}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-3">
            <div className={`${themeStyles.cardBg} rounded-xl p-3 border ${themeStyles.border}`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${themeStyles.textSecondary}`}>Best Streak</span>
                <span className={`font-bold text-orange-600`}>12 days</span>
              </div>
            </div>
            
            <div className={`${themeStyles.cardBg} rounded-xl p-3 border ${themeStyles.border}`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${themeStyles.textSecondary}`}>Total Activities</span>
                <span className={`font-bold text-teal-600`}>47</span>
              </div>
            </div>
            
            <div className={`${themeStyles.cardBg} rounded-xl p-3 border ${themeStyles.border}`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${themeStyles.textSecondary}`}>Average Score</span>
                <span className={`font-bold text-green-600`}>8.3/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Instructions */}
            <div className={`${themeStyles.cardBg} backdrop-blur-md rounded-2xl shadow-xl border ${themeStyles.border} p-6 mb-6`}>
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-600 animate-pulse" />
                <h2 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                  {currentText.title[language]}
                </h2>
              </div>
              <p className={`${themeStyles.textSecondary} mb-4`}>
                {t.instructions}
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(Object.keys(userAnswers).length / 10) * 100}%` }}
                ></div>
              </div>
              <div className={`text-sm ${themeStyles.textSecondary} mt-2`}>
                {Object.keys(userAnswers).length} of 10 blanks filled
              </div>
            </div>

            {/* Text with Blanks */}
            <div className={`${themeStyles.cardBg} backdrop-blur-md rounded-2xl shadow-xl border ${themeStyles.border} p-8 mb-6`}>
              {renderTextWithBlanks()}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={resetActivity}
                className={`px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center space-x-2`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.tryAgain}</span>
              </button>
              
              <button
                onClick={completeActivity}
                disabled={Object.keys(userAnswers).length < 10}
                className={`px-8 py-3 bg-gradient-to-r ${themeStyles.accent} text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{t.complete}</span>
              </button>
            </div>

            {/* Results Modal */}
            {showResults && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className={`${themeStyles.cardBg} rounded-2xl shadow-2xl border ${themeStyles.border} p-8 max-w-md w-full text-center`}>
                  <div className="mb-6">
                    {score >= 8 ? (
                      <div className="text-6xl mb-4 animate-bounce">🏆</div>
                    ) : score >= 5 ? (
                      <div className="text-6xl mb-4 animate-pulse">⭐</div>
                    ) : (
                      <div className="text-6xl mb-4">💪</div>
                    )}
                    
                    <h3 className={`text-2xl font-bold ${themeStyles.textPrimary} mb-2`}>
                      {score >= 8 ? t.congratulations : score >= 5 ? t.wellDone : t.keepGoing}
                    </h3>
                    
                    <p className={`${themeStyles.textSecondary} mb-4`}>
                      {getFeedbackMessage()}
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className={themeStyles.textSecondary}>{t.correctAnswers}:</span>
                      <span className={`font-bold ${score >= 8 ? 'text-green-600' : score >= 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {score}/10
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className={themeStyles.textSecondary}>{t.accuracy}:</span>
                      <span className={`font-bold ${score >= 8 ? 'text-green-600' : score >= 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {Math.round((score / 10) * 100)}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className={themeStyles.textSecondary}>{t.timeSpent}:</span>
                      <span className={`font-bold ${themeStyles.textPrimary}`}>
                        {formatTime(timeSpent)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={resetActivity}
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                    >
                      {t.tryAgain}
                    </button>
                    
                    <button
                      onClick={() => {
                        resetActivity();
                        // In a real app, this would load a new activity
                      }}
                      className={`flex-1 px-4 py-3 bg-gradient-to-r ${themeStyles.accent} text-white rounded-xl hover:shadow-lg transition-all duration-200`}
                    >
                      {t.nextActivity}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Word Options */}
        <div className={`w-80 ${themeStyles.cardBg} backdrop-blur-md border-l ${themeStyles.border} p-6 overflow-y-auto`}>
          <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-6 flex items-center`}>
            <Sparkles className="w-5 h-5 mr-2 text-teal-600" />
            Word Options
          </h3>
          
          <div className="space-y-4">
            {currentText.questions.map((question, index) => (
              <div key={question.id} className={`${themeStyles.cardBg} rounded-xl p-4 border ${themeStyles.border}`}>
                <div className={`text-sm font-medium ${themeStyles.textPrimary} mb-3`}>
                  Question {index + 1}: {question.question[language]}
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {question.options.map((option) => (
                    <div
                      key={option.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, option.id)}
                      className={`p-3 rounded-lg border-2 cursor-move transition-all duration-200 ${
                        draggedItem === option.id
                          ? 'border-teal-500 bg-teal-50 transform scale-105'
                          : userAnswers[question.blank] === option.id
                          ? 'border-green-500 bg-green-50 opacity-50'
                          : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${themeStyles.textPrimary}`}>
                          {option.text[language]}
                        </span>
                        {userAnswers[question.blank] === option.id && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Motivational Section */}
          <div className={`mt-6 ${themeStyles.cardBg} rounded-xl p-4 border ${themeStyles.border} bg-gradient-to-r from-teal-50 to-emerald-50`}>
            <div className="text-center">
              <div className="text-3xl mb-2">🌟</div>
              <div className={`text-sm font-medium ${themeStyles.textPrimary} mb-1`}>
                Keep Going!
              </div>
              <div className={`text-xs ${themeStyles.textSecondary}`}>
                {language === 'ar' 
                  ? 'كل كلمة تضعها في مكانها الصحيح تقربك من النجاح'
                  : 'Every word you place correctly brings you closer to success'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTrainingActivity;