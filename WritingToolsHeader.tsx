import React, { useState } from 'react';
import { 
  FileText, Link, MessageSquare, Tag, ChevronDown, 
  CheckCircle, Star, Lightbulb, Sparkles, BookOpen,
  Eye, Users, Quote, Edit3
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import QuotationTool from './QuotationTool';
import FeedbackBank from './FeedbackBank';

interface WritingToolsHeaderProps {
  title: string;
  textType: string;
  keywords?: string[];
  grade?: number;
  maxGrade?: number;
  onQuoteSelect?: (quote: any) => void;
  onTitleClick?: () => void;
  theme?: 'light' | 'dark' | 'teal';
}

const WritingToolsHeader: React.FC<WritingToolsHeaderProps> = ({
  title,
  textType,
  keywords = [],
  grade,
  maxGrade = 10,
  onQuoteSelect,
  onTitleClick,
  theme = 'teal'
}) => {
  const { language, isRTL } = useLanguage();
  const [showConnectors, setShowConnectors] = useState(false);
  const [showQuotationTool, setShowQuotationTool] = useState(false);
  const [showFeedbackBank, setShowFeedbackBank] = useState(false);

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

  // Get text type icon
  const getTextTypeIcon = () => {
    switch (textType) {
      case 'essay': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'narrative': return <BookOpen className="w-5 h-5 text-purple-600" />;
      case 'description': return <Eye className="w-5 h-5 text-teal-600" />;
      case 'letter': return <MessageSquare className="w-5 h-5 text-green-600" />;
      case 'discussion': return <Users className="w-5 h-5 text-orange-600" />;
      default: return <FileText className="w-5 h-5 text-blue-600" />;
    }
  };

  // Get text type name
  const getTextTypeName = () => {
    switch (textType) {
      case 'essay': return language === 'ar' ? 'مقال' : 'Essay';
      case 'narrative': return language === 'ar' ? 'سرد' : 'Narrative';
      case 'description': return language === 'ar' ? 'وصف' : 'Description';
      case 'letter': return language === 'ar' ? 'رسالة' : 'Letter';
      case 'discussion': return language === 'ar' ? 'نقاش' : 'Discussion';
      default: return language === 'ar' ? 'نص' : 'Text';
    }
  };

  // Get connectors based on text type
  const getConnectors = () => {
    if (language === 'ar') {
      switch (textType) {
        case 'essay':
          return [
            'في البداية', 'علاوة على ذلك', 'بالإضافة إلى ذلك', 'من ناحية أخرى',
            'على سبيل المثال', 'وفقاً لـ', 'بناءً على', 'في الختام', 'لذلك'
          ];
        case 'narrative':
          return [
            'في يوم من الأيام', 'وفجأة', 'بعد ذلك', 'في الصباح التالي',
            'بينما', 'في تلك اللحظة', 'وأخيراً', 'قبل ذلك بقليل', 'وهكذا'
          ];
        case 'description':
          return [
            'يبدو كأنه', 'يشبه', 'كما لو كان', 'من الملاحظ أن',
            'يتميز بـ', 'يمكن وصفه بأنه', 'من أبرز سماته', 'بالإضافة إلى ذلك'
          ];
        case 'letter':
          return [
            'عزيزي/عزيزتي', 'أكتب إليكم بخصوص', 'أود أن أعبر عن', 'يسرني أن',
            'أتمنى لكم', 'مع خالص تقديري', 'وتفضلوا بقبول فائق الاحترام', 'والسلام عليكم'
          ];
        case 'discussion':
          return [
            'من وجهة نظري', 'يرى البعض أن', 'على النقيض من ذلك', 'من جهة أخرى',
            'بالرغم من ذلك', 'وفقاً للدراسات', 'من الجدير بالذكر', 'في النهاية'
          ];
        default:
          return [
            'في البداية', 'علاوة على ذلك', 'بالإضافة إلى ذلك', 'من ناحية أخرى',
            'على سبيل المثال', 'وفقاً لـ', 'بناءً على', 'في الختام'
          ];
      }
    } else {
      switch (textType) {
        case 'essay':
          return [
            'To begin with', 'Furthermore', 'In addition', 'On the other hand',
            'For example', 'According to', 'Based on', 'In conclusion', 'Therefore'
          ];
        case 'narrative':
          return [
            'Once upon a time', 'Suddenly', 'After that', 'The next morning',
            'Meanwhile', 'At that moment', 'Finally', 'Just before that', 'Thus'
          ];
        case 'description':
          return [
            'It appears as', 'It resembles', 'As if it were', 'It is noticeable that',
            'It is characterized by', 'It can be described as', 'Its most prominent features', 'In addition'
          ];
        case 'letter':
          return [
            'Dear', 'I am writing regarding', 'I would like to express', 'I am pleased to',
            'I wish you', 'With my sincere appreciation', 'Please accept my highest regards', 'Sincerely'
          ];
        case 'discussion':
          return [
            'From my perspective', 'Some believe that', 'In contrast', 'On the other hand',
            'Despite this', 'According to studies', 'It is worth mentioning', 'In conclusion'
          ];
        default:
          return [
            'To begin with', 'Furthermore', 'In addition', 'On the other hand',
            'For example', 'According to', 'Based on', 'In conclusion'
          ];
      }
    }
  };

  // Handle connector click
  const handleConnectorClick = (connector: string) => {
    // Copy to clipboard
    navigator.clipboard.writeText(connector);
    
    // Show toast notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 ${isRTL ? 'left-4' : 'right-4'} bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300`;
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <span>${language === 'ar' ? 'تم نسخ أداة الربط' : 'Connector copied'}</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  // Handle quote selection
  const handleQuoteSelect = (quote: any) => {
    if (onQuoteSelect) {
      onQuoteSelect(quote);
    }
    setShowQuotationTool(false);
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Main Tools Row */}
      <div className="flex flex-wrap gap-3">
        {/* Title Button */}
        <button 
          onClick={onTitleClick}
          className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Edit3 className="w-5 h-5" />
          <span>{title || (language === 'ar' ? 'عنوان النص' : 'Text Title')}</span>
        </button>

        {/* Connectors Button */}
        <div className="relative">
          <button 
            onClick={() => setShowConnectors(!showConnectors)}
            className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Link className="w-5 h-5" />
            <span>{language === 'ar' ? 'أدوات ربط مقترحة' : 'Suggested Connectors'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showConnectors ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Connectors Dropdown */}
          {showConnectors && (
            <div className={`absolute top-full mt-2 ${isRTL ? 'right-0' : 'left-0'} w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-20 p-3`}>
              <h3 className="font-medium text-gray-900 mb-2 pb-2 border-b border-gray-100">
                {language === 'ar' ? 'أدوات ربط مناسبة' : 'Suitable Connectors'}
              </h3>
              <div className="max-h-60 overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  {getConnectors().map((connector, index) => (
                    <button
                      key={index}
                      onClick={() => handleConnectorClick(connector)}
                      className="px-3 py-2 text-sm bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg transition-colors duration-200 text-center"
                    >
                      {connector}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feedback Bank Button */}
        <button 
          onClick={() => setShowFeedbackBank(true)}
          className="px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <MessageSquare className="w-5 h-5" />
          <span>{language === 'ar' ? 'بنك التغذية الراجعة' : 'Feedback Bank'}</span>
        </button>

        {/* Quotation Tool Button */}
        <button 
          onClick={() => setShowQuotationTool(true)}
          className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Quote className="w-5 h-5" />
          <span>{language === 'ar' ? 'أداة الاقتباس' : 'Quotation Tool'}</span>
        </button>

        {/* Grade Display (if available) */}
        {grade !== undefined && (
          <div className="px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl shadow-md flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-200" />
            <div>
              <span className="font-medium">{language === 'ar' ? 'الدرجة:' : 'Grade:'} </span>
              <span className="font-bold">{grade}/{maxGrade}</span>
            </div>
          </div>
        )}
      </div>

      {/* Quotation Tool Modal */}
      {showQuotationTool && (
        <QuotationTool 
          onClose={() => setShowQuotationTool(false)}
          onQuoteSelect={handleQuoteSelect}
          language={language}
          theme={theme}
        />
      )}

      {/* Feedback Bank Modal */}
      {showFeedbackBank && (
        <FeedbackBank 
          onClose={() => setShowFeedbackBank(false)}
          language={language}
          theme={theme}
        />
      )}
    </div>
  );
};

export default WritingToolsHeader;