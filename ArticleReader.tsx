import React, { useState, useRef, useEffect } from 'react';
import { 
  X, ArrowLeft, ArrowRight, Play, Pause, Volume2, VolumeX, 
  ZoomIn, ZoomOut, Settings, MessageSquare, Share2, Download,
  Bookmark, Heart, ThumbsUp, ThumbsDown, Copy, Printer, 
  Lightbulb, Brain, Sparkles, HelpCircle, Info, Star,
  Calendar, Send, Video, Clock, Eye
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ArticleReaderProps {
  article: {
    id: string;
    title: { ar: string; en: string };
    content: { ar: string; en: string };
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    readingTime: number;
    difficulty: number;
    tags: string[];
    views: number;
    likes: number;
    dateAdded: string;
  };
  onClose: () => void;
  language?: 'ar' | 'en';
  theme?: 'light' | 'dark' | 'teal';
}

interface AIQuestion {
  id: string;
  text: { ar: string; en: string };
  options?: { id: string; text: { ar: string; en: string }; correct: boolean }[];
  type: 'open' | 'multiple-choice' | 'reflection';
  difficulty: 'easy' | 'medium' | 'hard';
  aiResponse?: { ar: string; en: string };
}

const ArticleReader: React.FC<ArticleReaderProps> = ({ 
  article, 
  onClose, 
  language = 'ar',
  theme = 'light'
}) => {
  const { isRTL } = useLanguage();
  const [fontSize, setFontSize] = useState(18);
  const [isReading, setIsReading] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState(150); // words per minute
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [aiResponses, setAiResponses] = useState<{[key: string]: string}>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAIFeedback, setShowAIFeedback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Theme styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return {
          bg: 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900',
          cardBg: 'bg-gray-800/80',
          textPrimary: 'text-white',
          textSecondary: 'text-gray-300',
          border: 'border-gray-700'
        };
      case 'teal':
        return {
          bg: 'bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50',
          cardBg: 'bg-white/90',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          border: 'border-teal-200'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
          cardBg: 'bg-white/80',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          border: 'border-gray-200'
        };
    }
  };

  const themeStyles = getThemeStyles();

  // AI-generated questions based on article content
  const aiQuestions: AIQuestion[] = [
    {
      id: 'q1',
      text: { 
        ar: `ما رأيك في ${article.title.ar}؟ هل تتفق مع المعلومات المقدمة؟`, 
        en: `What do you think about ${article.title.en}? Do you agree with the information presented?` 
      },
      type: 'open',
      difficulty: 'easy'
    },
    {
      id: 'q2',
      text: { 
        ar: 'ما هي النقطة الأكثر إثارة للاهتمام في هذا المقال بالنسبة لك؟', 
        en: 'What was the most interesting point in this article for you?' 
      },
      type: 'open',
      difficulty: 'medium'
    },
    {
      id: 'q3',
      text: { 
        ar: 'كيف يمكن تطبيق المعلومات الواردة في هذا المقال في حياتك اليومية؟', 
        en: 'How can you apply the information in this article in your daily life?' 
      },
      type: 'reflection',
      difficulty: 'medium'
    },
    {
      id: 'q4',
      text: { 
        ar: 'ما هو الهدف الرئيسي لهذا المقال؟', 
        en: 'What is the main purpose of this article?' 
      },
      type: 'multiple-choice',
      options: [
        { 
          id: 'a', 
          text: { 
            ar: 'تقديم معلومات تعليمية', 
            en: 'Provide educational information' 
          }, 
          correct: true 
        },
        { 
          id: 'b', 
          text: { 
            ar: 'الترفيه فقط', 
            en: 'Entertainment only' 
          }, 
          correct: false 
        },
        { 
          id: 'c', 
          text: { 
            ar: 'الإقناع بوجهة نظر معينة', 
            en: 'Persuade to a certain viewpoint' 
          }, 
          correct: false 
        },
        { 
          id: 'd', 
          text: { 
            ar: 'نقد موضوع معين', 
            en: 'Criticize a certain topic' 
          }, 
          correct: false 
        }
      ],
      difficulty: 'easy'
    },
    {
      id: 'q5',
      text: { 
        ar: 'ما هي المعلومات الإضافية التي كنت ترغب في معرفتها حول هذا الموضوع؟', 
        en: 'What additional information would you like to know about this topic?' 
      },
      type: 'open',
      difficulty: 'hard'
    }
  ];

  // Split content into paragraphs
  const paragraphs = article.content[language].split('\n\n').filter(p => p.trim());

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthesisRef.current = new SpeechSynthesisUtterance();
      
      // Set language
      speechSynthesisRef.current.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      
      // Set voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang === (language === 'ar' ? 'ar-SA' : 'en-US')
      );
      
      if (preferredVoice) {
        speechSynthesisRef.current.voice = preferredVoice;
      }
      
      // Set other properties
      speechSynthesisRef.current.rate = 0.9; // slightly slower than normal
      speechSynthesisRef.current.pitch = 1;
      
      // Handle end of speech
      speechSynthesisRef.current.onend = () => {
        if (currentParagraph < paragraphs.length - 1) {
          setCurrentParagraph(prev => prev + 1);
        } else {
          setIsReading(false);
          setShowDiscussion(true);
        }
      };
    }
    
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language, paragraphs.length, currentParagraph]);

  // Auto-scroll to current paragraph
  useEffect(() => {
    if (isReading && contentRef.current) {
      const paragraphElements = contentRef.current.querySelectorAll('p');
      if (paragraphElements[currentParagraph]) {
        paragraphElements[currentParagraph].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentParagraph, isReading]);

  // Update reading progress
  useEffect(() => {
    setReadingProgress((currentParagraph / paragraphs.length) * 100);
  }, [currentParagraph, paragraphs.length]);

  // Start text-to-speech
  const startReading = () => {
    if (!('speechSynthesis' in window) || !soundEnabled) return;
    
    setIsReading(true);
    
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.text = paragraphs[currentParagraph];
      window.speechSynthesis.speak(speechSynthesisRef.current);
    }
  };

  // Pause text-to-speech
  const pauseReading = () => {
    if (!('speechSynthesis' in window)) return;
    
    setIsReading(false);
    window.speechSynthesis.pause();
  };

  // Resume text-to-speech
  const resumeReading = () => {
    if (!('speechSynthesis' in window)) return;
    
    setIsReading(true);
    window.speechSynthesis.resume();
  };

  // Stop text-to-speech
  const stopReading = () => {
    if (!('speechSynthesis' in window)) return;
    
    setIsReading(false);
    window.speechSynthesis.cancel();
    setCurrentParagraph(0);
  };

  // Navigate to previous paragraph
  const prevParagraph = () => {
    if (currentParagraph > 0) {
      if (isReading && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      
      setCurrentParagraph(prev => prev - 1);
      
      if (isReading && speechSynthesisRef.current) {
        setTimeout(() => {
          speechSynthesisRef.current!.text = paragraphs[currentParagraph - 1];
          window.speechSynthesis.speak(speechSynthesisRef.current!);
        }, 300);
      }
    }
  };

  // Navigate to next paragraph
  const nextParagraph = () => {
    if (currentParagraph < paragraphs.length - 1) {
      if (isReading && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      
      setCurrentParagraph(prev => prev + 1);
      
      if (isReading && speechSynthesisRef.current) {
        setTimeout(() => {
          speechSynthesisRef.current!.text = paragraphs[currentParagraph + 1];
          window.speechSynthesis.speak(speechSynthesisRef.current!);
        }, 300);
      }
    } else if (currentParagraph === paragraphs.length - 1) {
      setIsReading(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setShowDiscussion(true);
    }
  };

  // Increase font size
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 28));
  };

  // Decrease font size
  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 14));
  };

  // Submit user response
  const submitResponse = (questionId: string) => {
    setIsSubmitting(true);
    
    // Simulate AI response generation
    setTimeout(() => {
      const aiResponse = generateAIResponse(questionId);
      setAiResponses(prev => ({
        ...prev,
        [questionId]: aiResponse
      }));
      setIsSubmitting(false);
      setShowAIFeedback(true);
    }, 1500);
  };

  // Generate AI response based on question and user input
  const generateAIResponse = (questionId: string) => {
    const question = aiQuestions.find(q => q.id === questionId);
    
    if (!question) return '';
    
    if (question.type === 'multiple-choice') {
      const selectedOpt = question.options?.find(opt => opt.id === selectedOption);
      if (selectedOpt?.correct) {
        return language === 'ar' 
          ? 'إجابة صحيحة! أحسنت. هذا يظهر فهمك الجيد للمقال.'
          : 'Correct answer! Well done. This shows your good understanding of the article.';
      } else {
        const correctOpt = question.options?.find(opt => opt.correct);
        return language === 'ar'
          ? `إجابة غير صحيحة. الإجابة الصحيحة هي: ${correctOpt?.text.ar}. فكر في سبب كون هذه الإجابة هي الأنسب.`
          : `Incorrect answer. The correct answer is: ${correctOpt?.text.en}. Think about why this answer is the most appropriate.`;
      }
    }
    
    // For open questions, generate contextual response
    if (userResponse.length < 10) {
      return language === 'ar'
        ? 'شكراً على إجابتك. حاول التفكير بشكل أعمق وتقديم المزيد من التفاصيل في المرة القادمة.'
        : 'Thank you for your answer. Try to think more deeply and provide more details next time.';
    }
    
    if (question.type === 'reflection') {
      return language === 'ar'
        ? `تأمل رائع! أحب كيف ربطت المعلومات بتجاربك الشخصية. هل فكرت أيضاً في ${article.category === 'technology' ? 'كيفية تأثير هذه التقنيات على المجتمع ككل؟' : 'جوانب أخرى لم يتطرق إليها المقال؟'}`
        : `Great reflection! I love how you connected the information to your personal experiences. Have you also thought about ${article.category === 'technology' ? 'how these technologies affect society as a whole?' : 'other aspects not covered in the article?'}`;
    }
    
    return language === 'ar'
      ? `شكراً على مشاركة أفكارك! ${userResponse.length > 50 ? 'أعجبني تحليلك المفصل.' : 'يمكنك التوسع أكثر في أفكارك في المرة القادمة.'} هل تود معرفة المزيد عن جوانب معينة من هذا الموضوع؟`
      : `Thank you for sharing your thoughts! ${userResponse.length > 50 ? 'I liked your detailed analysis.' : 'You can expand more on your ideas next time.'} Would you like to know more about specific aspects of this topic?`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get level label
  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return language === 'ar' ? 'مبتدئ' : 'Beginner';
      case 'intermediate':
        return language === 'ar' ? 'متوسط' : 'Intermediate';
      case 'advanced':
        return language === 'ar' ? 'متقدم' : 'Advanced';
      case 'expert':
        return language === 'ar' ? 'متميز' : 'Expert';
      default:
        return level;
    }
  };

  // Get level color
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-blue-100 text-blue-700';
      case 'advanced':
        return 'bg-purple-100 text-purple-700';
      case 'expert':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={`fixed inset-0 ${themeStyles.bg} z-50 overflow-auto ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <div className={`${themeStyles.cardBg} backdrop-blur-md border-b ${themeStyles.border} px-6 py-4 sticky top-0 z-10`}>
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className={`p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 ${themeStyles.textSecondary}`}
          >
            {isRTL ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center space-x-3">
            {/* Font Size Controls */}
            <div className="flex items-center space-x-1">
              <button
                onClick={decreaseFontSize}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                title={language === 'ar' ? 'تصغير الخط' : 'Decrease Font Size'}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={increaseFontSize}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                title={language === 'ar' ? 'تكبير الخط' : 'Increase Font Size'}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                soundEnabled 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}
              title={language === 'ar' ? 'تشغيل/إيقاف الصوت' : 'Toggle Sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 ${themeStyles.textSecondary}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Reading Progress */}
        <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto p-6">
        {!showDiscussion ? (
          <div className={`${themeStyles.cardBg} rounded-2xl shadow-xl border ${themeStyles.border} overflow-hidden mb-6`}>
            {/* Article Header */}
            <div className={`${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50/50'
            } px-6 py-4 border-b ${themeStyles.border}`}>
              <h2 className={`text-2xl font-bold ${themeStyles.textPrimary} mb-2`}>
                {article.title[language]}
              </h2>
              
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(article.level)}`}>
                  {getLevelLabel(article.level)}
                </span>
                <span className={`flex items-center text-sm ${themeStyles.textSecondary}`}>
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readingTime} {language === 'ar' ? 'دقائق' : 'min read'}
                </span>
                <span className={`flex items-center text-sm ${themeStyles.textSecondary}`}>
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(article.dateAdded)}
                </span>
              </div>
              
              {/* Reading Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {!isReading ? (
                    <button
                      onClick={startReading}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
                      disabled={!soundEnabled}
                    >
                      <Play className="w-4 h-4" />
                      <span>{language === 'ar' ? 'قراءة تلقائية' : 'Auto Read'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={pauseReading}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Pause className="w-4 h-4" />
                      <span>{language === 'ar' ? 'إيقاف مؤقت' : 'Pause'}</span>
                    </button>
                  )}
                  
                  <button
                    onClick={stopReading}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    {language === 'ar' ? 'إيقاف' : 'Stop'}
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${themeStyles.textSecondary}`}>
                    {language === 'ar' ? 'سرعة القراءة:' : 'Reading Speed:'}
                  </span>
                  <select
                    value={readingSpeed}
                    onChange={(e) => setReadingSpeed(parseInt(e.target.value))}
                    className="text-sm border border-gray-300 rounded-lg px-2 py-1"
                  >
                    <option value="100">100 WPM</option>
                    <option value="150">150 WPM</option>
                    <option value="200">200 WPM</option>
                    <option value="250">250 WPM</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Article Content */}
            <div className="p-8" ref={contentRef}>
              <div 
                className={`leading-relaxed ${themeStyles.textPrimary} whitespace-pre-line`}
                style={{ fontSize: `${fontSize}px` }}
              >
                {paragraphs.map((paragraph, index) => (
                  <p 
                    key={index} 
                    className={`mb-4 transition-all duration-300 ${
                      currentParagraph === index && isReading 
                        ? 'bg-yellow-100 p-2 rounded-lg border-r-4 border-yellow-500' 
                        : ''
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className={`${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50/50'
            } px-6 py-4 border-t ${themeStyles.border}`}>
              <div className="flex items-center justify-between">
                <button
                  onClick={prevParagraph}
                  disabled={currentParagraph === 0}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    currentParagraph === 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isRTL ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                </button>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${themeStyles.textSecondary}`}>
                    {currentParagraph + 1} / {paragraphs.length}
                  </span>
                </div>
                
                <button
                  onClick={nextParagraph}
                  disabled={currentParagraph === paragraphs.length - 1 && !isReading}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    currentParagraph === paragraphs.length - 1 && !isReading
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* AI Discussion Section */
          <div className={`${themeStyles.cardBg} rounded-2xl shadow-xl border ${themeStyles.border} overflow-hidden mb-6`}>
            <div className={`${
              theme === 'dark' ? 'bg-purple-900' : 'bg-gradient-to-r from-purple-600 to-indigo-600'
            } px-6 py-4 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6" />
                  <h2 className="text-xl font-bold">
                    {language === 'ar' ? 'حوار حول المقال' : 'Article Discussion'}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowDiscussion(false);
                    setCurrentParagraph(0);
                  }}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
              <p className="text-white/80 mt-2">
                {language === 'ar' 
                  ? 'فكر في المقال وأجب عن الأسئلة التالية لتعميق فهمك'
                  : 'Reflect on the article and answer the following questions to deepen your understanding'
                }
              </p>
            </div>
            
            <div className="p-6 space-y-8">
              {aiQuestions.map((question, index) => (
                <div 
                  key={question.id} 
                  className={`${themeStyles.cardBg} rounded-xl border ${themeStyles.border} p-6`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${
                      question.difficulty === 'easy' ? 'from-green-400 to-green-500' :
                      question.difficulty === 'medium' ? 'from-blue-400 to-blue-500' :
                      'from-purple-400 to-purple-500'
                    } flex items-center justify-center text-white font-bold`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-4`}>
                        {question.text[language]}
                      </h3>
                      
                      {question.type === 'multiple-choice' ? (
                        <div className="space-y-3 mb-4">
                          {question.options?.map(option => (
                            <button
                              key={option.id}
                              onClick={() => setSelectedOption(option.id)}
                              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                                selectedOption === option.id
                                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                                  : `border-gray-200 hover:border-purple-300 ${themeStyles.textPrimary}`
                              }`}
                            >
                              {option.text[language]}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <textarea
                          value={userResponse}
                          onChange={(e) => setUserResponse(e.target.value)}
                          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none mb-4"
                          rows={4}
                          placeholder={language === 'ar' ? 'اكتب إجابتك هنا...' : 'Write your answer here...'}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />
                      )}
                      
                      <div className="flex justify-end">
                        <button
                          onClick={() => submitResponse(question.id)}
                          disabled={isSubmitting || (question.type === 'multiple-choice' ? !selectedOption : !userResponse.trim())}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center space-x-2">
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>{language === 'ar' ? 'جاري التحليل...' : 'Analyzing...'}</span>
                            </span>
                          ) : (
                            <span className="flex items-center space-x-2">
                              <Send className="w-4 h-4" />
                              <span>{language === 'ar' ? 'إرسال الإجابة' : 'Submit Answer'}</span>
                            </span>
                          )}
                        </button>
                      </div>
                      
                      {/* AI Feedback */}
                      {aiResponses[question.id] && showAIFeedback && (
                        <div className="mt-4 bg-purple-50 border border-purple-200 rounded-xl p-4">
                          <div className="flex items-start space-x-3">
                            <Brain className="w-5 h-5 text-purple-600 mt-1" />
                            <div>
                              <h4 className="font-medium text-purple-800 mb-1">
                                {language === 'ar' ? 'تعليق الذكاء الاصطناعي:' : 'AI Feedback:'}
                              </h4>
                              <p className="text-purple-700">{aiResponses[question.id]}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Further Exploration */}
              <div className={`${themeStyles.cardBg} rounded-xl border ${themeStyles.border} p-6`}>
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  <h3 className={`text-lg font-semibold ${themeStyles.textPrimary}`}>
                    {language === 'ar' ? 'استكشاف المزيد' : 'Further Exploration'}
                  </h3>
                </div>
                
                <p className={`${themeStyles.textSecondary} mb-4`}>
                  {language === 'ar'
                    ? 'هل ترغب في معرفة المزيد حول هذا الموضوع؟ إليك بعض الاقتراحات:'
                    : 'Would you like to know more about this topic? Here are some suggestions:'
                  }
                </p>
                
                <div className="space-y-3">
                  <button className="w-full text-left p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-700">
                        {language === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
                      </span>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <Video className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-700">
                        {language === 'ar' ? 'فيديوهات تعليمية' : 'Educational Videos'}
                      </span>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-4 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <PenTool className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-purple-700">
                        {language === 'ar' ? 'تمارين تطبيقية' : 'Practice Exercises'}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Article Actions */}
        <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} p-4 mb-6 flex items-center justify-between`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                liked ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <Heart className={liked ? 'w-5 h-5 fill-red-600' : 'w-5 h-5'} />
            </button>
            
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                bookmarked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <Bookmark className={bookmarked ? 'w-5 h-5 fill-blue-600' : 'w-5 h-5'} />
            </button>
            
            <button
              onClick={() => {
                navigator.clipboard.writeText(article.content[language]);
                // Show toast notification
              }}
              className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors duration-200"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.print()}
              className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors duration-200"
            >
              <Printer className="w-5 h-5" />
            </button>
            
            <button
              className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors duration-200"
            >
              <Share2 className="w-5 h-5" />
            </button>
            
            <button
              className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors duration-200"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleReader;