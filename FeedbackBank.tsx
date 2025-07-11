import React, { useState } from 'react';
import { 
  X, Search, Filter, MessageSquare, CheckCircle, Star, 
  Calendar, Tag, User, Copy, Bookmark, BookOpen, PenTool,
  FileText, Eye, Users, Clock, Lightbulb, Sparkles
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FeedbackBankProps {
  onClose: () => void;
  language?: 'ar' | 'en';
  theme?: 'light' | 'dark' | 'teal';
}

interface FeedbackItem {
  id: string;
  text: { ar: string; en: string };
  teacher: { ar: string; en: string };
  textType: 'essay' | 'narrative' | 'description' | 'letter' | 'discussion';
  category: 'structure' | 'language' | 'ideas' | 'general';
  date: string;
  grade?: number;
  assignment: { ar: string; en: string };
  tags: string[];
}

const FeedbackBank: React.FC<FeedbackBankProps> = ({ 
  onClose, 
  language = 'ar',
  theme = 'teal'
}) => {
  const { isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTextType, setSelectedTextType] = useState<string>('');
  const [copiedFeedbackId, setCopiedFeedbackId] = useState<string | null>(null);
  const [savedFeedback, setSavedFeedback] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

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

  // Feedback categories
  const categories = [
    { id: 'structure', name: { ar: 'البنية والتنظيم', en: 'Structure & Organization' }, color: 'blue' },
    { id: 'language', name: { ar: 'اللغة والأسلوب', en: 'Language & Style' }, color: 'green' },
    { id: 'ideas', name: { ar: 'الأفكار والمحتوى', en: 'Ideas & Content' }, color: 'purple' },
    { id: 'general', name: { ar: 'ملاحظات عامة', en: 'General Feedback' }, color: 'orange' }
  ];

  // Text types
  const textTypes = [
    { id: 'essay', name: { ar: 'المقال', en: 'Essay' } },
    { id: 'narrative', name: { ar: 'السرد', en: 'Narrative' } },
    { id: 'description', name: { ar: 'الوصف', en: 'Description' } },
    { id: 'letter', name: { ar: 'الرسالة', en: 'Letter' } },
    { id: 'discussion', name: { ar: 'النقاش', en: 'Discussion' } }
  ];

  // Sample feedback items
  const feedbackItems: FeedbackItem[] = [
    {
      id: 'f1',
      text: { 
        ar: 'مقدمة قوية تجذب القارئ وتوضح موضوع المقال بشكل جيد. استمر في هذا الأسلوب الجذاب.', 
        en: 'Strong introduction that engages the reader and clearly explains the essay topic. Keep up this engaging style.' 
      },
      teacher: { ar: 'أ. سارة أحمد', en: 'Ms. Sarah Ahmed' },
      textType: 'essay',
      category: 'structure',
      date: '2025-01-10',
      grade: 9,
      assignment: { ar: 'مقال عن التغير المناخي', en: 'Essay on Climate Change' },
      tags: ['مقدمة', 'بنية', 'أسلوب']
    },
    {
      id: 'f2',
      text: { 
        ar: 'استخدامك للصفات والتشبيهات في وصف المشهد كان رائعاً. يمكنك إضافة المزيد من التفاصيل الحسية مثل الأصوات والروائح.', 
        en: 'Your use of adjectives and similes in describing the scene was excellent. You can add more sensory details like sounds and smells.' 
      },
      teacher: { ar: 'أ. محمد علي', en: 'Mr. Mohammed Ali' },
      textType: 'description',
      category: 'language',
      date: '2025-01-05',
      grade: 8.5,
      assignment: { ar: 'وصف رحلة إلى البحر', en: 'Description of a Sea Trip' },
      tags: ['وصف', 'تشبيهات', 'تفاصيل حسية']
    },
    {
      id: 'f3',
      text: { 
        ar: 'أفكارك أصيلة ومبتكرة، لكن يجب دعمها بأمثلة وأدلة أكثر إقناعاً. حاول ربط أفكارك بالواقع المعاش.', 
        en: 'Your ideas are original and innovative, but they need to be supported with more convincing examples and evidence. Try to connect your ideas to real-life situations.' 
      },
      teacher: { ar: 'أ. سارة أحمد', en: 'Ms. Sarah Ahmed' },
      textType: 'essay',
      category: 'ideas',
      date: '2024-12-20',
      grade: 7.5,
      assignment: { ar: 'مقال عن دور التكنولوجيا في التعليم', en: 'Essay on the Role of Technology in Education' },
      tags: ['أفكار', 'أمثلة', 'إقناع']
    },
    {
      id: 'f4',
      text: { 
        ar: 'تطوير الشخصيات في قصتك كان ممتازاً. القارئ يشعر بارتباط عاطفي مع الشخصية الرئيسية. يمكن تحسين الحبكة بإضافة المزيد من التشويق.', 
        en: 'Character development in your story was excellent. The reader feels emotionally connected to the main character. The plot could be improved by adding more suspense.' 
      },
      teacher: { ar: 'أ. محمد علي', en: 'Mr. Mohammed Ali' },
      textType: 'narrative',
      category: 'ideas',
      date: '2024-12-15',
      grade: 9.5,
      assignment: { ar: 'قصة قصيرة عن الصداقة', en: 'Short Story about Friendship' },
      tags: ['شخصيات', 'حبكة', 'تشويق']
    },
    {
      id: 'f5',
      text: { 
        ar: 'هناك بعض الأخطاء النحوية والإملائية التي تحتاج إلى مراجعة. راجع استخدام علامات الترقيم وتأكد من اتساق الأزمنة.', 
        en: 'There are some grammatical and spelling errors that need revision. Review the use of punctuation marks and ensure consistency in tenses.' 
      },
      teacher: { ar: 'أ. سارة أحمد', en: 'Ms. Sarah Ahmed' },
      textType: 'letter',
      category: 'language',
      date: '2024-12-10',
      grade: 7,
      assignment: { ar: 'رسالة إلى صديق', en: 'Letter to a Friend' },
      tags: ['نحو', 'إملاء', 'ترقيم']
    },
    {
      id: 'f6',
      text: { 
        ar: 'عرضت وجهات نظر متوازنة حول الموضوع، لكن يمكن تقوية الحجج المضادة. حاول تقديم أدلة أكثر إقناعاً لدعم وجهة نظرك.', 
        en: 'You presented balanced viewpoints on the topic, but counter-arguments could be strengthened. Try to provide more convincing evidence to support your perspective.' 
      },
      teacher: { ar: 'أ. محمد علي', en: 'Mr. Mohammed Ali' },
      textType: 'discussion',
      category: 'structure',
      date: '2024-12-05',
      grade: 8,
      assignment: { ar: 'نقاش حول التعليم عن بعد', en: 'Discussion on Distance Learning' },
      tags: ['توازن', 'حجج', 'أدلة']
    },
    {
      id: 'f7',
      text: { 
        ar: 'خاتمة قوية تلخص الأفكار الرئيسية وتترك انطباعاً إيجابياً. أحسنت في ربط الخاتمة بالمقدمة.', 
        en: 'Strong conclusion that summarizes the main ideas and leaves a positive impression. Well done connecting the conclusion to the introduction.' 
      },
      teacher: { ar: 'أ. سارة أحمد', en: 'Ms. Sarah Ahmed' },
      textType: 'essay',
      category: 'structure',
      date: '2024-11-25',
      grade: 9.5,
      assignment: { ar: 'مقال عن أهمية القراءة', en: 'Essay on the Importance of Reading' },
      tags: ['خاتمة', 'تلخيص', 'ترابط']
    },
    {
      id: 'f8',
      text: { 
        ar: 'أسلوبك في الكتابة متميز ويعكس شخصيتك. استمر في تطوير صوتك الكتابي الفريد.', 
        en: 'Your writing style is distinctive and reflects your personality. Continue developing your unique writing voice.' 
      },
      teacher: { ar: 'أ. محمد علي', en: 'Mr. Mohammed Ali' },
      textType: 'narrative',
      category: 'language',
      date: '2024-11-20',
      grade: 10,
      assignment: { ar: 'قصة من وحي الخيال', en: 'Imaginative Story' },
      tags: ['أسلوب', 'شخصية', 'تميز']
    },
    {
      id: 'f9',
      text: { 
        ar: 'تنظيم الأفكار كان منطقياً ومتسلسلاً. يمكن تحسين الانتقال بين الفقرات باستخدام أدوات ربط أكثر تنوعاً.', 
        en: 'Organization of ideas was logical and sequential. Transitions between paragraphs could be improved by using more varied connectors.' 
      },
      teacher: { ar: 'أ. سارة أحمد', en: 'Ms. Sarah Ahmed' },
      textType: 'essay',
      category: 'structure',
      date: '2024-11-15',
      grade: 8.5,
      assignment: { ar: 'مقال عن التلوث البيئي', en: 'Essay on Environmental Pollution' },
      tags: ['تنظيم', 'تسلسل', 'انتقال']
    },
    {
      id: 'f10',
      text: { 
        ar: 'بشكل عام، عمل جيد! أظهرت فهماً عميقاً للموضوع وقدرة على التعبير بوضوح. استمر في القراءة لتوسيع مفرداتك.', 
        en: 'Overall, good work! You demonstrated a deep understanding of the topic and ability to express clearly. Continue reading to expand your vocabulary.' 
      },
      teacher: { ar: 'أ. محمد علي', en: 'Mr. Mohammed Ali' },
      textType: 'discussion',
      category: 'general',
      date: '2024-11-10',
      grade: 8,
      assignment: { ar: 'نقاش حول وسائل التواصل الاجتماعي', en: 'Discussion on Social Media' },
      tags: ['عام', 'فهم', 'تعبير']
    }
  ];

  // Filter feedback items
  const filteredFeedback = feedbackItems.filter(item => {
    const matchesSearch = item.text[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.teacher[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.assignment[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesTextType = selectedTextType ? item.textType === selectedTextType : true;
    const matchesSaved = showSavedOnly ? savedFeedback.includes(item.id) : true;
    
    return matchesSearch && matchesCategory && matchesTextType && matchesSaved;
  });

  // Copy feedback to clipboard
  const copyFeedback = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedFeedbackId(id);
      setTimeout(() => setCopiedFeedbackId(null), 2000);
    });
  };

  // Toggle saved feedback
  const toggleSavedFeedback = (id: string) => {
    setSavedFeedback(prev => 
      prev.includes(id) ? prev.filter(feedbackId => feedbackId !== id) : [...prev, id]
    );
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'structure': return 'bg-blue-100 text-blue-700';
      case 'language': return 'bg-green-100 text-green-700';
      case 'ideas': return 'bg-purple-100 text-purple-700';
      case 'general': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`fixed inset-0 ${themeStyles.bg} z-50 overflow-auto ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <div className={`${themeStyles.cardBg} backdrop-blur-md border-b ${themeStyles.border} px-6 py-4 sticky top-0 z-10`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl flex items-center justify-center animate-pulse">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                {language === 'ar' ? 'بنك التغذية الراجعة' : 'Feedback Bank'}
              </h1>
              <p className={`text-sm ${themeStyles.textSecondary}`}>
                {language === 'ar' ? 'ملاحظات المعلمين السابقة لتحسين كتابتك' : 'Previous teacher feedback to improve your writing'}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className={`p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 ${themeStyles.textSecondary}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Filters */}
        <div className={`w-80 ${themeStyles.cardBg} backdrop-blur-md border-r ${themeStyles.border} p-6 overflow-y-auto`}>
          <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-4`}>
            {language === 'ar' ? 'تصفية الملاحظات' : 'Filter Feedback'}
          </h3>
          
          {/* Categories */}
          <div className="mb-6">
            <h4 className={`text-sm font-medium ${themeStyles.textSecondary} mb-2`}>
              {language === 'ar' ? 'حسب الفئة' : 'By Category'}
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                  selectedCategory === '' 
                    ? 'bg-gray-200 font-medium' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {language === 'ar' ? 'جميع الفئات' : 'All Categories'}
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    selectedCategory === category.id 
                      ? `bg-${category.color}-100 text-${category.color}-700 font-medium` 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.name[language]}
                </button>
              ))}
            </div>
          </div>
          
          {/* Text Types */}
          <div className="mb-6">
            <h4 className={`text-sm font-medium ${themeStyles.textSecondary} mb-2`}>
              {language === 'ar' ? 'حسب نوع النص' : 'By Text Type'}
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedTextType('')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                  selectedTextType === '' 
                    ? 'bg-gray-200 font-medium' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {language === 'ar' ? 'جميع الأنواع' : 'All Types'}
              </button>
              
              {textTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedTextType(type.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    selectedTextType === type.id 
                      ? 'bg-indigo-100 text-indigo-700 font-medium' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {type.name[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Saved Feedback Filter */}
          <div className="mb-6">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`w-full p-3 rounded-xl transition-all duration-200 ${
                showSavedOnly
                  ? 'bg-amber-100 text-amber-700 border border-amber-200'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Bookmark className={`w-5 h-5 ${showSavedOnly ? 'text-amber-600 fill-amber-600' : ''}`} />
                <span className="font-medium">
                  {language === 'ar' ? 'المحفوظة فقط' : 'Saved Only'}
                </span>
              </div>
            </button>
          </div>

          {/* Statistics */}
          <div className={`${themeStyles.cardBg} rounded-xl p-4 border ${themeStyles.border}`}>
            <h4 className={`font-medium ${themeStyles.textPrimary} mb-3`}>
              {language === 'ar' ? 'إحصائيات التغذية الراجعة' : 'Feedback Statistics'}
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${themeStyles.textSecondary}`}>
                  {language === 'ar' ? 'إجمالي الملاحظات' : 'Total Feedback'}
                </span>
                <span className={`font-bold ${themeStyles.textPrimary}`}>{feedbackItems.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${themeStyles.textSecondary}`}>
                  {language === 'ar' ? 'متوسط الدرجات' : 'Average Grade'}
                </span>
                <span className={`font-bold text-green-600`}>
                  {(feedbackItems.reduce((sum, item) => sum + (item.grade || 0), 0) / feedbackItems.length).toFixed(1)}/10
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${themeStyles.textSecondary}`}>
                  {language === 'ar' ? 'الملاحظات المحفوظة' : 'Saved Feedback'}
                </span>
                <span className={`font-bold text-amber-600`}>{savedFeedback.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'ar' ? 'ابحث في الملاحظات...' : 'Search feedback...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Feedback Items */}
          <div className="space-y-4">
            {filteredFeedback.map((feedback) => {
              const category = categories.find(c => c.id === feedback.category);
              const textType = textTypes.find(t => t.id === feedback.textType);
              const isSaved = savedFeedback.includes(feedback.id);
              
              return (
                <div 
                  key={feedback.id}
                  className={`${themeStyles.cardBg} rounded-xl border ${themeStyles.border} overflow-hidden hover:shadow-lg transition-all duration-200`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="text-lg font-medium mb-3 leading-relaxed">
                          {feedback.text[language]}
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className={`${themeStyles.textSecondary}`}>
                            {feedback.teacher[language]}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-2 ml-4">
                        <button
                          onClick={() => toggleSavedFeedback(feedback.id)}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            isSaved ? 'bg-amber-100 text-amber-600' : 'hover:bg-gray-100 text-gray-400'
                          }`}
                        >
                          <Bookmark className={isSaved ? 'w-5 h-5 fill-amber-600' : 'w-5 h-5'} />
                        </button>
                        <button
                          onClick={() => copyFeedback(feedback.id, feedback.text[language])}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            copiedFeedbackId === feedback.id ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100 text-gray-400'
                          }`}
                        >
                          {copiedFeedbackId === feedback.id ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {category && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(category.id)}`}>
                          {category.name[language]}
                        </span>
                      )}
                      {textType && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {textType.name[language]}
                        </span>
                      )}
                      {feedback.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className={`${themeStyles.textSecondary}`}>{feedback.assignment[language]}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className={`${themeStyles.textSecondary}`}>{formatDate(feedback.date)}</span>
                        </div>
                      </div>
                      
                      {feedback.grade && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-bold text-gray-700">{feedback.grade}/10</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Empty State */}
            {filteredFeedback.length === 0 && (
              <div className={`${themeStyles.cardBg} rounded-xl border ${themeStyles.border} p-8 text-center`}>
                <div className="text-5xl mb-4">📝</div>
                <h3 className={`text-xl font-bold ${themeStyles.textPrimary} mb-2`}>
                  {language === 'ar' ? 'لم يتم العثور على ملاحظات' : 'No Feedback Found'}
                </h3>
                <p className={`${themeStyles.textSecondary} mb-4`}>
                  {language === 'ar' 
                    ? 'حاول تغيير معايير البحث أو تصفح فئة مختلفة' 
                    : 'Try changing your search criteria or browse a different category'
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSelectedTextType('');
                    setShowSavedOnly(false);
                  }}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                  {language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackBank;