import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Users, Save, Clock, Type, Globe, 
  CheckCircle, AlertCircle, Loader2, Share2,
  MessageSquare, Eye, FileText, User
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface StudentWritingInterfaceProps {
  assignedTitle?: string;
  keywords?: string[];
  onClose?: () => void;
  language?: 'ar' | 'en';
  theme?: 'light' | 'dark' | 'teal';
}

interface CollaborationUser {
  id: string;
  name: string;
  avatar?: string;
  isActive: boolean;
  lastSeen: string;
  color: string;
}

interface ShareNote {
  message: string;
  isUrgent: boolean;
}

const StudentWritingInterface: React.FC<StudentWritingInterfaceProps> = ({
  assignedTitle = '',
  keywords = [],
  onClose,
  language: propLanguage,
  theme = 'teal'
}) => {
  const { language: contextLanguage, isRTL } = useLanguage();
  const language = propLanguage || contextLanguage;
  
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [shareNote, setShareNote] = useState<ShareNote>({ message: '', isUrgent: false });
  const [isSharing, setIsSharing] = useState(false);
  const [isStartingCollab, setIsStartingCollab] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [collaborators, setCollaborators] = useState<CollaborationUser[]>([]);
  const [isCollaborating, setIsCollaborating] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);

  // Mock collaborators data
  const mockCollaborators: CollaborationUser[] = [
    {
      id: '1',
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      avatar: '/api/placeholder/32/32',
      isActive: true,
      lastSeen: '2 min ago',
      color: '#3B82F6'
    },
    {
      id: '2',
      name: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      avatar: '/api/placeholder/32/32',
      isActive: false,
      lastSeen: '15 min ago',
      color: '#10B981'
    },
    {
      id: '3',
      name: language === 'ar' ? 'محمد أحمد' : 'Mohammed Ahmed',
      avatar: '/api/placeholder/32/32',
      isActive: true,
      lastSeen: 'now',
      color: '#F59E0B'
    }
  ];

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
          inputBg: 'bg-gray-700',
          inputBorder: 'border-gray-600'
        };
      case 'teal':
        return {
          bg: 'bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50',
          cardBg: 'bg-white/90',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          border: 'border-teal-200',
          inputBg: 'bg-white',
          inputBorder: 'border-gray-300'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
          cardBg: 'bg-white/80',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          border: 'border-gray-200',
          inputBg: 'bg-white',
          inputBorder: 'border-gray-300'
        };
    }
  };

  const themeStyles = getThemeStyles();

  // Auto-save functionality
  useEffect(() => {
    if (content.trim()) {
      if (autoSaveRef.current) {
        clearTimeout(autoSaveRef.current);
      }
      
      autoSaveRef.current = setTimeout(() => {
        handleAutoSave();
      }, 30000); // 30 seconds
    }

    return () => {
      if (autoSaveRef.current) {
        clearTimeout(autoSaveRef.current);
      }
    };
  }, [content]);

  // Word count calculation
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  // Auto-save function
  const handleAutoSave = async () => {
    if (!content.trim()) return;
    
    setIsAutoSaving(true);
    
    // Simulate auto-save delay
    setTimeout(() => {
      setLastSaved(new Date());
      setIsAutoSaving(false);
    }, 1000);
  };

  // Share with teacher
  const handleShareWithTeacher = async () => {
    setIsSharing(true);
    
    // Simulate sharing process
    setTimeout(() => {
      setIsSharing(false);
      setShareSuccess(true);
      setShowShareModal(false);
      
      // Show success notification
      setTimeout(() => setShareSuccess(false), 3000);
    }, 2000);
  };

  // Start collaboration
  const handleStartCollaboration = async () => {
    setIsStartingCollab(true);
    
    // Simulate collaboration setup
    setTimeout(() => {
      setIsStartingCollab(false);
      setIsCollaborating(true);
      setCollaborators(mockCollaborators);
      setShowCollabModal(false);
    }, 2000);
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`min-h-screen ${themeStyles.bg} ${isRTL ? 'rtl' : 'ltr'} p-4`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <button 
            className={`w-full ${themeStyles.cardBg} backdrop-blur-md rounded-2xl border ${themeStyles.border} p-6 text-left hover:shadow-lg transition-all duration-200`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <Type className="w-6 h-6 text-teal-600" />
              <h1 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                {assignedTitle || (language === 'ar' ? 'عنوان النص' : 'Text Title')}
              </h1>
            </div>
            
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </button>
        </div>

        {/* Writing Area */}
        <div className={`${themeStyles.cardBg} backdrop-blur-md rounded-2xl border ${themeStyles.border} overflow-hidden mb-6 shadow-xl`}>
          <div className="p-8">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={language === 'ar' ? 'ابدأ الكتابة هنا...' : 'Start writing here...'}
              className={`w-full min-h-[400px] ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl p-6 text-lg leading-relaxed ${themeStyles.textPrimary} resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200`}
              style={{ 
                fontFamily: language === 'ar' ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                direction: isRTL ? 'rtl' : 'ltr'
              }}
            />
          </div>
          
          {/* Status Bar */}
          <div className={`px-8 py-4 border-t ${themeStyles.border} bg-gray-50/50 flex items-center justify-between`}>
            <div className="flex items-center space-x-4">
              {/* Auto-save Status */}
              <div className="flex items-center space-x-2">
                {isAutoSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    <span className="text-sm text-blue-600">
                      {language === 'ar' ? 'جاري الحفظ...' : 'Auto-saving...'}
                    </span>
                  </>
                ) : lastSaved ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">
                      {language === 'ar' ? `آخر حفظ: ${formatTime(lastSaved)}` : `Last saved: ${formatTime(lastSaved)}`}
                    </span>
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {language === 'ar' ? 'لم يتم الحفظ بعد' : 'Not saved yet'}
                    </span>
                  </>
                )}
              </div>

              {/* Collaboration Status */}
              {isCollaborating && (
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {collaborators.filter(c => c.isActive).map((collaborator) => (
                      <div
                        key={collaborator.id}
                        className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                        style={{ backgroundColor: collaborator.color }}
                        title={collaborator.name}
                      >
                        {collaborator.avatar ? (
                          <img src={collaborator.avatar} alt={collaborator.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                            {collaborator.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-blue-600">
                    {language === 'ar' ? 'يتعاون معك' : 'Collaborating'} {collaborators.filter(c => c.isActive).length}
                  </span>
                </div>
              )}
            </div>
            
            {/* Word Count */}
            <div className={`text-sm ${themeStyles.textSecondary} font-medium`}>
              {wordCount} {language === 'ar' ? 'كلمة' : 'words'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Share with Teacher Button */}
          <button
            onClick={() => setShowShareModal(true)}
            disabled={!content.trim()}
            className="flex-1 flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-h-[44px]"
          >
            <span className="text-2xl">📤</span>
            <span>{language === 'ar' ? 'مشاركة مع المعلم' : 'Share with Teacher'}</span>
          </button>

          {/* Collaborate with Peers Button */}
          <button
            onClick={() => setShowCollabModal(true)}
            disabled={!content.trim()}
            className="flex-1 flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-h-[44px]"
          >
            <span className="text-2xl">🤝</span>
            <span>{language === 'ar' ? 'تعاون مع الزملاء' : 'Collaborate with Peers'}</span>
          </button>
        </div>

        {/* Success Notification */}
        {shareSuccess && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5" />
              <span>{language === 'ar' ? 'تم إرسال النص للمعلم بنجاح!' : 'Text shared with teacher successfully!'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Share with Teacher Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${themeStyles.cardBg} rounded-2xl shadow-2xl border ${themeStyles.border} p-6 max-w-md w-full`}>
            <h3 className={`text-xl font-bold ${themeStyles.textPrimary} mb-4`}>
              {language === 'ar' ? 'مشاركة مع المعلم' : 'Share with Teacher'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${themeStyles.textPrimary} mb-2`}>
                  {language === 'ar' ? 'رسالة اختيارية للمعلم:' : 'Optional note for teacher:'}
                </label>
                <textarea
                  value={shareNote.message}
                  onChange={(e) => setShareNote(prev => ({ ...prev, message: e.target.value }))}
                  placeholder={language === 'ar' ? 'أضف ملاحظة للمعلم...' : 'Add a note for your teacher...'}
                  className={`w-full ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl p-3 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={shareNote.isUrgent}
                  onChange={(e) => setShareNote(prev => ({ ...prev, isUrgent: e.target.checked }))}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="urgent" className={`text-sm ${themeStyles.textPrimary}`}>
                  {language === 'ar' ? 'عاجل - يحتاج مراجعة سريعة' : 'Urgent - needs quick review'}
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleShareWithTeacher}
                disabled={isSharing}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                {isSharing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'إرسال' : 'Send'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collaboration Modal */}
      {showCollabModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${themeStyles.cardBg} rounded-2xl shadow-2xl border ${themeStyles.border} p-6 max-w-md w-full`}>
            <h3 className={`text-xl font-bold ${themeStyles.textPrimary} mb-4`}>
              {language === 'ar' ? 'تعاون مع الزملاء' : 'Collaborate with Peers'}
            </h3>
            
            <div className="space-y-4">
              <p className={`text-sm ${themeStyles.textSecondary}`}>
                {language === 'ar' 
                  ? 'ستتمكن من العمل مع زملائك في الوقت الفعلي. سيتم تتبع مساهمات كل شخص.'
                  : 'You\'ll be able to work with your classmates in real-time. Each person\'s contributions will be tracked.'
                }
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  {language === 'ar' ? 'الميزات المتاحة:' : 'Available features:'}
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• {language === 'ar' ? 'تحرير مشترك في الوقت الفعلي' : 'Real-time collaborative editing'}</li>
                  <li>• {language === 'ar' ? 'تتبع مساهمات كل طالب' : 'Track each student\'s contributions'}</li>
                  <li>• {language === 'ar' ? 'نظام تعليقات مدمج' : 'Built-in commenting system'}</li>
                  <li>• {language === 'ar' ? 'حفظ تلقائي للتغييرات' : 'Auto-save all changes'}</li>
                </ul>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCollabModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleStartCollaboration}
                disabled={isStartingCollab}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center"
              >
                {isStartingCollab ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Users className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'بدء التعاون' : 'Start Collaborating'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentWritingInterface;