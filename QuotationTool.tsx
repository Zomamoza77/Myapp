import React, { useState, useEffect } from 'react';
import { 
  X, Search, Filter, Quote, Copy, CheckCircle, Star,
  BookOpen, Heart, Lightbulb, Globe, Crown, Sparkles,
  User, Calendar, Tag, ThumbsUp, Share2, Download
} from 'lucide-react';

interface QuotationToolProps {
  onClose: () => void;
  onQuoteSelect: (quote: QuoteItem) => void;
  language?: 'ar' | 'en';
  theme?: 'light' | 'dark' | 'teal';
}

interface QuoteItem {
  id: string;
  text: { ar: string; en: string };
  author: { ar: string; en: string };
  source?: { ar: string; en: string };
  category: 'wisdom' | 'education' | 'success' | 'creativity' | 'life' | 'literature';
  textType: 'essay' | 'narrative' | 'description' | 'letter' | 'general';
  usage: { ar: string; en: string };
  context: { ar: string; en: string };
  popularity: number;
  dateAdded: string;
  tags: string[];
}

interface QuoteCategory {
  id: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  icon: string;
  color: string;
  count: number;
}

const QuotationTool: React.FC<QuotationToolProps> = ({ 
  onClose, 
  onQuoteSelect, 
  language = 'ar',
  theme = 'light'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTextType, setSelectedTextType] = useState<string>('');
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);
  const [favoriteQuotes, setFavoriteQuotes] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const isRTL = language === 'ar';

  // Quote categories
  const categories: QuoteCategory[] = [
    {
      id: 'wisdom',
      name: { ar: 'الحكمة', en: 'Wisdom' },
      description: { ar: 'أقوال حكيمة ومأثورة', en: 'Wise and memorable sayings' },
      icon: '🧠',
      color: 'from-purple-500 to-purple-600',
      count: 45
    },
    {
      id: 'education',
      name: { ar: 'التعليم', en: 'Education' },
      description: { ar: 'اقتباسات عن التعلم والمعرفة', en: 'Quotes about learning and knowledge' },
      icon: '📚',
      color: 'from-blue-500 to-blue-600',
      count: 38
    },
    {
      id: 'success',
      name: { ar: 'النجاح', en: 'Success' },
      description: { ar: 'اقتباسات محفزة للنجاح', en: 'Motivational quotes for success' },
      icon: '🏆',
      color: 'from-yellow-500 to-orange-500',
      count: 32
    },
    {
      id: 'creativity',
      name: { ar: 'الإبداع', en: 'Creativity' },
      description: { ar: 'اقتباسات عن الإبداع والفن', en: 'Quotes about creativity and art' },
      icon: '🎨',
      color: 'from-pink-500 to-rose-500',
      count: 28
    },
    {
      id: 'life',
      name: { ar: 'الحياة', en: 'Life' },
      description: { ar: 'اقتباسات عن الحياة والتجارب', en: 'Quotes about life and experiences' },
      icon: '🌱',
      color: 'from-green-500 to-emerald-500',
      count: 42
    },
    {
      id: 'literature',
      name: { ar: 'الأدب', en: 'Literature' },
      description: { ar: 'اقتباسات من الأدب العربي والعالمي', en: 'Quotes from Arabic and world literature' },
      icon: '📖',
      color: 'from-indigo-500 to-indigo-600',
      count: 35
    }
  ];

  // Text types
  const textTypes = [
    { id: 'essay', name: { ar: 'المقال', en: 'Essay' } },
    { id: 'narrative', name: { ar: 'السرد', en: 'Narrative' } },
    { id: 'description', name: { ar: 'الوصف', en: 'Description' } },
    { id: 'letter', name: { ar: 'الرسالة', en: 'Letter' } },
    { id: 'general', name: { ar: 'عام', en: 'General' } }
  ];

  // Sample quotes
  const quotes: QuoteItem[] = [
    {
      id: 'q1',
      text: { 
        ar: 'العلم في الصغر كالنقش على الحجر', 
        en: 'Learning in youth is like engraving on stone' 
      },
      author: { ar: 'مثل عربي', en: 'Arabic Proverb' },
      category: 'education',
      textType: 'essay',
      usage: { 
        ar: 'يستخدم للتأكيد على أهمية التعلم في سن مبكرة', 
        en: 'Used to emphasize the importance of early learning' 
      },
      context: { 
        ar: 'مناسب للمقالات التعليمية أو التربوية', 
        en: 'Suitable for educational or pedagogical essays' 
      },
      popularity: 95,
      dateAdded: '2024-01-01',
      tags: ['تعليم', 'شباب', 'حكمة']
    },
    {
      id: 'q2',
      text: { 
        ar: 'الكتب هي مرايا الفكر', 
        en: 'Books are the mirrors of thought' 
      },
      author: { ar: 'فرجينيا وولف', en: 'Virginia Woolf' },
      source: { ar: 'غرفة خاصة', en: 'A Room of One\'s Own' },
      category: 'literature',
      textType: 'essay',
      usage: { 
        ar: 'يستخدم للتعبير عن أهمية القراءة والكتب', 
        en: 'Used to express the importance of reading and books' 
      },
      context: { 
        ar: 'مناسب للمقالات الأدبية أو الثقافية', 
        en: 'Suitable for literary or cultural essays' 
      },
      popularity: 88,
      dateAdded: '2024-01-02',
      tags: ['أدب', 'قراءة', 'ثقافة']
    },
    {
      id: 'q3',
      text: { 
        ar: 'كانت الشمس تغرب في الأفق، ملونة السماء بألوان الذهب والأحمر', 
        en: 'The sun was setting on the horizon, painting the sky with gold and red' 
      },
      author: { ar: 'وصف أدبي', en: 'Literary Description' },
      category: 'creativity',
      textType: 'description',
      usage: { 
        ar: 'يستخدم لبدء وصف منظر طبيعي أو مشهد', 
        en: 'Used to begin a description of a landscape or scene' 
      },
      context: { 
        ar: 'مناسب للنصوص الوصفية والقصص', 
        en: 'Suitable for descriptive texts and stories' 
      },
      popularity: 82,
      dateAdded: '2024-01-03',
      tags: ['وصف', 'طبيعة', 'غروب']
    },
    {
      id: 'q4',
      text: { 
        ar: 'النجاح ليس نهائياً، والفشل ليس قاتلاً، الشجاعة للاستمرار هي ما يهم', 
        en: 'Success is not final, failure is not fatal: it is the courage to continue that counts' 
      },
      author: { ar: 'ونستون تشرشل', en: 'Winston Churchill' },
      category: 'success',
      textType: 'general',
      usage: { 
        ar: 'يستخدم للتحفيز وتشجيع المثابرة', 
        en: 'Used for motivation and encouraging perseverance' 
      },
      context: { 
        ar: 'مناسب للمقالات التحفيزية أو خطابات التشجيع', 
        en: 'Suitable for motivational essays or encouraging speeches' 
      },
      popularity: 94,
      dateAdded: '2024-01-04',
      tags: ['نجاح', 'فشل', 'شجاعة', 'مثابرة']
    },
    {
      id: 'q5',
      text: { 
        ar: 'عندما فتحت الباب، لم أكن أتوقع ما سأراه', 
        en: 'When I opened the door, I didn\'t expect what I would see' 
      },
      author: { ar: 'بداية سردية', en: 'Narrative Opening' },
      category: 'creativity',
      textType: 'narrative',
      usage: { 
        ar: 'يستخدم لبدء قصة أو سرد بطريقة مشوقة', 
        en: 'Used to start a story or narrative in an intriguing way' 
      },
      context: { 
        ar: 'مناسب للقصص والروايات', 
        en: 'Suitable for stories and novels' 
      },
      popularity: 79,
      dateAdded: '2024-01-05',
      tags: ['قصة', 'سرد', 'تشويق']
    },
    {
      id: 'q6',
      text: { 
        ar: 'أكتب إليكم لأعبر عن امتناني العميق', 
        en: 'I am writing to express my deep gratitude' 
      },
      author: { ar: 'بداية رسالة', en: 'Letter Opening' },
      category: 'general',
      textType: 'letter',
      usage: { 
        ar: 'يستخدم لبدء رسالة شكر رسمية', 
        en: 'Used to begin a formal thank-you letter' 
      },
      context: { 
        ar: 'مناسب للرسائل الرسمية والشخصية', 
        en: 'Suitable for formal and personal letters' 
      },
      popularity: 75,
      dateAdded: '2024-01-06',
      tags: ['رسالة', 'شكر', 'امتنان']
    },
    {
      id: 'q7',
      text: { 
        ar: 'الحياة إما مغامرة جريئة أو لا شيء', 
        en: 'Life is either a daring adventure or nothing at all' 
      },
      author: { ar: 'هيلين كيلر', en: 'Helen Keller' },
      category: 'life',
      textType: 'essay',
      usage: { 
        ar: 'يستخدم للتشجيع على المغامرة والإقدام', 
        en: 'Used to encourage adventure and boldness' 
      },
      context: { 
        ar: 'مناسب للمقالات التحفيزية أو الشخصية', 
        en: 'Suitable for motivational or personal essays' 
      },
      popularity: 91,
      dateAdded: '2024-01-07',
      tags: ['حياة', 'مغامرة', 'شجاعة']
    },
    {
      id: 'q8',
      text: { 
        ar: 'كان المنزل قديماً، تتسلل إليه أشعة الشمس من خلال النوافذ المغبرة', 
        en: 'The house was old, with sunlight creeping through dusty windows' 
      },
      author: { ar: 'وصف مكان', en: 'Place Description' },
      category: 'creativity',
      textType: 'description',
      usage: { 
        ar: 'يستخدم لوصف مكان قديم أو مهجور', 
        en: 'Used to describe an old or abandoned place' 
      },
      context: { 
        ar: 'مناسب للقصص والروايات', 
        en: 'Suitable for stories and novels' 
      },
      popularity: 84,
      dateAdded: '2024-01-08',
      tags: ['وصف', 'مكان', 'منزل']
    },
    {
      id: 'q9',
      text: { 
        ar: 'المعرفة قوة', 
        en: 'Knowledge is power' 
      },
      author: { ar: 'فرانسيس بيكون', en: 'Francis Bacon' },
      category: 'wisdom',
      textType: 'general',
      usage: { 
        ar: 'يستخدم للتأكيد على أهمية المعرفة والتعلم', 
        en: 'Used to emphasize the importance of knowledge and learning' 
      },
      context: { 
        ar: 'مناسب للمقالات التعليمية أو التحفيزية', 
        en: 'Suitable for educational or motivational essays' 
      },
      popularity: 97,
      dateAdded: '2024-01-09',
      tags: ['معرفة', 'قوة', 'تعلم']
    },
    {
      id: 'q10',
      text: { 
        ar: 'في الختام، يمكننا القول أن', 
        en: 'In conclusion, we can say that' 
      },
      author: { ar: 'عبارة ختامية', en: 'Concluding Phrase' },
      category: 'education',
      textType: 'essay',
      usage: { 
        ar: 'يستخدم لبدء فقرة الختام في المقال', 
        en: 'Used to begin the concluding paragraph in an essay' 
      },
      context: { 
        ar: 'مناسب للمقالات الأكاديمية والتحليلية', 
        en: 'Suitable for academic and analytical essays' 
      },
      popularity: 86,
      dateAdded: '2024-01-10',
      tags: ['ختام', 'مقال', 'أكاديمي']
    }
  ];

  // Theme styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return {
          bg: 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900',
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
          bg: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50',
          cardBg: 'bg-white/80',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          border: 'border-gray-200'
        };
    }
  };

  const themeStyles = getThemeStyles();

  // Filter quotes
  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.text[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.author[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory ? quote.category === selectedCategory : true;
    const matchesTextType = selectedTextType ? quote.textType === selectedTextType : true;
    const matchesFavorites = showFavoritesOnly ? favoriteQuotes.includes(quote.id) : true;
    
    return matchesSearch && matchesCategory && matchesTextType && matchesFavorites;
  });

  // Copy quote to clipboard
  const copyQuote = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedQuoteId(id);
      setTimeout(() => setCopiedQuoteId(null), 2000);
    });
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavoriteQuotes(prev => 
      prev.includes(id) ? prev.filter(quoteId => quoteId !== id) : [...prev, id]
    );
  };

  // Select quote
  const handleSelectQuote = (quote: QuoteItem) => {
    onQuoteSelect(quote);
  };

  return (
    <div className={`fixed inset-0 ${themeStyles.bg} z-50 overflow-auto ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <div className={`${themeStyles.cardBg} backdrop-blur-md border-b ${themeStyles.border} px-6 py-4 sticky top-0 z-10`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center animate-pulse">
              <Quote className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                {language === 'ar' ? 'أداة الاقتباس' : 'Quotation Tool'}
              </h1>
              <p className={`text-sm ${themeStyles.textSecondary}`}>
                {language === 'ar' ? 'اقتباسات مناسبة لتعزيز كتاباتك' : 'Suitable quotes to enhance your writing'}
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
        {/* Sidebar - Categories */}
        <div className={`w-80 ${themeStyles.cardBg} backdrop-blur-md border-r ${themeStyles.border} p-6 overflow-y-auto`}>
          <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-4`}>
            {language === 'ar' ? 'التصنيفات' : 'Categories'}
          </h3>
          
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setSelectedCategory('')}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                selectedCategory === '' 
                  ? `bg-gradient-to-r from-indigo-500 to-purple-600 text-white` 
                  : `${themeStyles.cardBg} border ${themeStyles.border} hover:bg-gray-50`
              }`}
            >
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5" />
                <span className="font-medium">
                  {language === 'ar' ? 'جميع التصنيفات' : 'All Categories'}
                </span>
              </div>
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                  selectedCategory === category.id 
                    ? `bg-gradient-to-r ${category.color} text-white` 
                    : `${themeStyles.cardBg} border ${themeStyles.border} hover:bg-gray-50`
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{category.icon}</div>
                  <div>
                    <div className="font-medium">{category.name[language]}</div>
                    <div className="text-xs opacity-80">{category.count} اقتباس</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-4`}>
            {language === 'ar' ? 'نوع النص' : 'Text Type'}
          </h3>
          
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

          {/* Favorites Filter */}
          <div className="mt-6">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`w-full p-3 rounded-xl transition-all duration-200 ${
                showFavoritesOnly
                  ? 'bg-pink-100 text-pink-700 border border-pink-200'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Heart className={`w-5 h-5 ${showFavoritesOnly ? 'text-pink-600 fill-pink-600' : ''}`} />
                <span className="font-medium">
                  {language === 'ar' ? 'المفضلة فقط' : 'Favorites Only'}
                </span>
              </div>
            </button>
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
                placeholder={language === 'ar' ? 'ابحث عن اقتباسات...' : 'Search quotes...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Quotes Grid */}
          <div className="space-y-4">
            {filteredQuotes.map((quote) => {
              const category = categories.find(c => c.id === quote.category);
              const textType = textTypes.find(t => t.id === quote.textType);
              const isFavorite = favoriteQuotes.includes(quote.id);
              
              return (
                <div 
                  key={quote.id}
                  className={`${themeStyles.cardBg} rounded-xl border ${themeStyles.border} overflow-hidden hover:shadow-lg transition-all duration-200`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="text-xl font-serif mb-4 leading-relaxed">
                          "{quote.text[language]}"
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className={`${themeStyles.textSecondary}`}>
                            {quote.author[language]}
                            {quote.source && ` - ${quote.source[language]}`}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-2 ml-4">
                        <button
                          onClick={() => toggleFavorite(quote.id)}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            isFavorite ? 'bg-pink-100 text-pink-600' : 'hover:bg-gray-100 text-gray-400'
                          }`}
                        >
                          <Heart className={isFavorite ? 'w-5 h-5 fill-pink-600' : 'w-5 h-5'} />
                        </button>
                        <button
                          onClick={() => copyQuote(quote.id, quote.text[language])}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            copiedQuoteId === quote.id ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100 text-gray-400'
                          }`}
                        >
                          {copiedQuoteId === quote.id ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {category && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${category.color} text-white`}>
                          {category.name[language]}
                        </span>
                      )}
                      {textType && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {textType.name[language]}
                        </span>
                      )}
                      {quote.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-blue-800 mb-1">الاستخدام:</h4>
                        <p className="text-xs text-blue-700">{quote.usage[language]}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-purple-800 mb-1">السياق:</h4>
                        <p className="text-xs text-purple-700">{quote.context[language]}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className={`${themeStyles.textSecondary}`}>{quote.popularity}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className={`${themeStyles.textSecondary}`}>
                            {new Date(quote.dateAdded).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSelectQuote(quote)}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        {language === 'ar' ? 'استخدام' : 'Use'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Empty State */}
            {filteredQuotes.length === 0 && (
              <div className={`${themeStyles.cardBg} rounded-xl border ${themeStyles.border} p-8 text-center`}>
                <div className="text-5xl mb-4">📝</div>
                <h3 className={`text-xl font-bold ${themeStyles.textPrimary} mb-2`}>
                  {language === 'ar' ? 'لم يتم العثور على اقتباسات' : 'No Quotes Found'}
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
                    setShowFavoritesOnly(false);
                  }}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200"
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

export default QuotationTool;