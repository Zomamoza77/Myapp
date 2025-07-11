import React, { useState, useEffect } from 'react';
import { 
  Brain, Sparkles, Lightbulb, MessageSquare, 
  Zap, RefreshCw, ThumbsUp, ThumbsDown, 
  Copy, CheckCircle, AlertTriangle, Info,
  Feather, Type, Edit3, FileText, BookOpen,
  Pen, FileEdit, MessageCircle, Heart, Layers
} from 'lucide-react';

interface WritingAssistantProps {
  selectedStyle: string;
  content: string;
  language?: 'ar' | 'en';
  theme?: 'light' | 'dark' | 'teal';
  onSuggestionApply: (suggestion: string) => void;
}

interface WritingSuggestion {
  id: string;
  text: string;
  type: 'connector' | 'transition' | 'vocabulary' | 'structure' | 'style';
  icon: React.ComponentType<any>;
}

interface WritingTip {
  id: string;
  title: { ar: string; en: string };
  content: { ar: string; en: string };
  type: 'grammar' | 'style' | 'structure' | 'vocabulary';
}

const WritingAssistant: React.FC<WritingAssistantProps> = ({
  selectedStyle,
  content,
  language = 'en',
  theme = 'light',
  onSuggestionApply
}) => {
  const [suggestions, setSuggestions] = useState<WritingSuggestion[]>([]);
  const [tips, setTips] = useState<WritingTip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isRTL = language === 'ar';

  // Theme styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return {
          bg: 'bg-gray-800',
          cardBg: 'bg-gray-700',
          textPrimary: 'text-white',
          textSecondary: 'text-gray-300',
          border: 'border-gray-600'
        };
      case 'teal':
        return {
          bg: 'bg-teal-50',
          cardBg: 'bg-white',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          border: 'border-teal-200'
        };
      default:
        return {
          bg: 'bg-white',
          cardBg: 'bg-gray-50',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          border: 'border-gray-200'
        };
    }
  };

  const themeStyles = getThemeStyles();

  // Generate suggestions based on content and selected style
  useEffect(() => {
    if (!content || content.length < 10) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const newSuggestions: WritingSuggestion[] = [];
      
      // Generate style-specific suggestions
      if (selectedStyle === 'description') {
        newSuggestions.push(
          {
            id: '1',
            text: language === 'ar' ? 'استخدم صفات أكثر تفصيلاً لوصف المشهد' : 'Use more detailed adjectives to describe the scene',
            type: 'style',
            icon: Edit3
          },
          {
            id: '2',
            text: language === 'ar' ? 'أضف وصفاً للألوان والروائح والأصوات' : 'Add descriptions of colors, smells, and sounds',
            type: 'vocabulary',
            icon: Type
          }
        );
      } else if (selectedStyle === 'narrative') {
        newSuggestions.push(
          {
            id: '3',
            text: language === 'ar' ? 'أضف حواراً بين الشخصيات لإضفاء الحيوية' : 'Add dialogue between characters to bring life',
            type: 'structure',
            icon: MessageCircle
          },
          {
            id: '4',
            text: language === 'ar' ? 'استخدم عبارات زمنية مثل "بعد ذلك" أو "في اليوم التالي"' : 'Use time expressions like "afterwards" or "the next day"',
            type: 'transition',
            icon: Clock
          }
        );
      } else if (selectedStyle === 'essay') {
        newSuggestions.push(
          {
            id: '5',
            text: language === 'ar' ? 'قدم أدلة لدعم وجهة نظرك' : 'Provide evidence to support your viewpoint',
            type: 'structure',
            icon: FileText
          },
          {
            id: '6',
            text: language === 'ar' ? 'استخدم روابط منطقية مثل "بالإضافة إلى ذلك" أو "من ناحية أخرى"' : 'Use logical connectors like "furthermore" or "on the other hand"',
            type: 'connector',
            icon: Layers
          }
        );
      } else {
        // Generic suggestions
        newSuggestions.push(
          {
            id: '7',
            text: language === 'ar' ? 'حاول تنويع طول الجمل لإيقاع أفضل' : 'Try varying sentence lengths for better rhythm',
            type: 'style',
            icon: Edit3
          },
          {
            id: '8',
            text: language === 'ar' ? 'استخدم كلمات ربط لتحسين تدفق النص' : 'Use transition words to improve flow',
            type: 'connector',
            icon: Layers
          }
        );
      }
      
      // Add content-specific suggestions
      if (content.length > 50) {
        if (content.split('.').length < 3) {
          newSuggestions.push({
            id: '9',
            text: language === 'ar' ? 'قسم النص إلى فقرات أصغر لسهولة القراءة' : 'Break the text into smaller paragraphs for readability',
            type: 'structure',
            icon: FileEdit
          });
        }
        
        if (content.toLowerCase().includes('very') || content.includes('جداً')) {
          newSuggestions.push({
            id: '10',
            text: language === 'ar' ? 'استبدل "جداً" بكلمات أكثر تحديداً' : 'Replace "very" with more specific words',
            type: 'vocabulary',
            icon: Type
          });
        }
      }
      
      setSuggestions(newSuggestions);
      setIsLoading(false);
    }, 1000);
  }, [content, selectedStyle, language]);

  // Generate writing tips
  useEffect(() => {
    const writingTips: WritingTip[] = [
      {
        id: 't1',
        title: { 
          ar: 'تنويع طول الجمل', 
          en: 'Vary Sentence Length' 
        },
        content: { 
          ar: 'استخدم جملاً قصيرة وطويلة لإنشاء إيقاع طبيعي في كتابتك. هذا يجعل النص أكثر جاذبية وأسهل للقراءة.', 
          en: 'Use both short and long sentences to create a natural rhythm in your writing. This makes the text more engaging and easier to read.' 
        },
        type: 'style'
      },
      {
        id: 't2',
        title: { 
          ar: 'استخدام الأفعال النشطة', 
          en: 'Use Active Verbs' 
        },
        content: { 
          ar: 'الأفعال النشطة تجعل كتابتك أكثر حيوية وقوة. بدلاً من "تم إنجاز المهمة"، اكتب "أنجز الفريق المهمة".', 
          en: 'Active verbs make your writing more vibrant and powerful. Instead of "The task was completed," write "The team completed the task."' 
        },
        type: 'grammar'
      },
      {
        id: 't3',
        title: { 
          ar: 'تنظيم الأفكار', 
          en: 'Organize Your Ideas' 
        },
        content: { 
          ar: 'قبل الكتابة، نظم أفكارك في مخطط بسيط. هذا يساعد في الحفاظ على تسلسل منطقي وتجنب التكرار.', 
          en: 'Before writing, organize your ideas in a simple outline. This helps maintain a logical sequence and avoid repetition.' 
        },
        type: 'structure'
      }
    ];
    
    setTips(writingTips);
  }, [language]);

  // Copy suggestion to clipboard
  const copySuggestion = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Apply suggestion
  const applySuggestion = (text: string) => {
    onSuggestionApply(text);
  };

  // Get suggestion type color
  const getSuggestionTypeColor = (type: string) => {
    switch (type) {
      case 'connector':
        return theme === 'teal' ? 'text-teal-600 bg-teal-50' : 'text-blue-600 bg-blue-50';
      case 'transition':
        return theme === 'teal' ? 'text-emerald-600 bg-emerald-50' : 'text-purple-600 bg-purple-50';
      case 'vocabulary':
        return theme === 'teal' ? 'text-cyan-600 bg-cyan-50' : 'text-pink-600 bg-pink-50';
      case 'structure':
        return theme === 'teal' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50';
      case 'style':
        return theme === 'teal' ? 'text-blue-600 bg-blue-50' : 'text-indigo-600 bg-indigo-50';
      default:
        return theme === 'teal' ? 'text-gray-600 bg-gray-50' : 'text-gray-600 bg-gray-50';
    }
  };

  // Get tip type color
  const getTipTypeColor = (type: string) => {
    switch (type) {
      case 'grammar':
        return theme === 'teal' ? 'from-teal-500 to-cyan-500' : 'from-blue-500 to-indigo-500';
      case 'style':
        return theme === 'teal' ? 'from-emerald-500 to-green-500' : 'from-purple-500 to-pink-500';
      case 'structure':
        return theme === 'teal' ? 'from-cyan-500 to-blue-500' : 'from-orange-500 to-red-500';
      case 'vocabulary':
        return theme === 'teal' ? 'from-green-500 to-teal-500' : 'from-pink-500 to-rose-500';
      default:
        return theme === 'teal' ? 'from-gray-500 to-slate-500' : 'from-gray-500 to-slate-500';
    }
  };

  return (
    <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} overflow-hidden mb-6`}>
      <div className={`bg-gradient-to-r ${
        theme === 'teal' ? 'from-teal-600 to-emerald-600' : 'from-purple-600 to-indigo-600'
      } px-4 py-3 text-white`}>
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5" />
          <h3 className="font-bold">
            {language === 'ar' ? 'المساعد الذكي للكتابة' : 'AI Writing Assistant'}
          </h3>
        </div>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
            <span className={`ml-3 ${themeStyles.textSecondary}`}>
              {language === 'ar' ? 'جاري تحليل كتابتك...' : 'Analyzing your writing...'}
            </span>
          </div>
        ) : (
          <>
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="mb-4">
                <h4 className={`text-sm font-medium ${themeStyles.textPrimary} mb-2`}>
                  {language === 'ar' ? 'اقتراحات لتحسين كتابتك:' : 'Suggestions to improve your writing:'}
                </h4>
                
                <div className="space-y-2">
                  {suggestions.map((suggestion) => {
                    const SuggestionIcon = suggestion.icon;
                    const typeColor = getSuggestionTypeColor(suggestion.type);
                    
                    return (
                      <div 
                        key={suggestion.id}
                        className={`${themeStyles.cardBg} border ${themeStyles.border} rounded-lg p-3 hover:shadow-md transition-all duration-200`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${typeColor}`}>
                            <SuggestionIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm ${themeStyles.textPrimary}`}>
                              {suggestion.text}
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => copySuggestion(suggestion.id, suggestion.text)}
                              className={`p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${themeStyles.textSecondary}`}
                              title={language === 'ar' ? 'نسخ' : 'Copy'}
                            >
                              {copiedId === suggestion.id ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => applySuggestion(suggestion.text)}
                              className={`p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${themeStyles.textSecondary}`}
                              title={language === 'ar' ? 'تطبيق' : 'Apply'}
                            >
                              <Zap className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Writing Tips */}
            <div>
              <h4 className={`text-sm font-medium ${themeStyles.textPrimary} mb-2`}>
                {language === 'ar' ? 'نصائح للكتابة:' : 'Writing Tips:'}
              </h4>
              
              <div className="space-y-3">
                {tips.map((tip) => {
                  const tipColor = getTipTypeColor(tip.type);
                  
                  return (
                    <div 
                      key={tip.id}
                      className={`border ${themeStyles.border} rounded-lg overflow-hidden`}
                    >
                      <div className={`bg-gradient-to-r ${tipColor} px-4 py-2 text-white`}>
                        <div className="flex items-center space-x-2">
                          <Lightbulb className="w-4 h-4" />
                          <h5 className="font-medium">{tip.title[language]}</h5>
                        </div>
                      </div>
                      <div className={`${themeStyles.cardBg} p-3`}>
                        <p className={`text-sm ${themeStyles.textSecondary}`}>
                          {tip.content[language]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Empty State */}
            {suggestions.length === 0 && (
              <div className="text-center py-4">
                <Sparkles className={`w-8 h-8 ${themeStyles.textSecondary} mx-auto mb-2`} />
                <p className={`${themeStyles.textSecondary}`}>
                  {language === 'ar' 
                    ? 'اكتب المزيد للحصول على اقتراحات مخصصة' 
                    : 'Write more to get personalized suggestions'
                  }
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WritingAssistant;