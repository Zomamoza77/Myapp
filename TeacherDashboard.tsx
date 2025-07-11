import React, { useState } from 'react';
import { 
  BookOpen, Users, BarChart3, MessageSquare, Calendar, Settings,
  Bell, Search, Plus, Filter, Download, Eye, Edit, Trash2,
  Clock, Target, TrendingUp, Award, Star, CheckCircle,
  FileText, PenTool, Brain, Zap, Globe, Home, User,
  ChevronRight, ArrowUp, ArrowDown, MoreHorizontal,
  GraduationCap, Shield, LogOut, Sun, Moon, Palette
} from 'lucide-react';
import SmartGradingSystem from './SmartGradingSystem';
import TaskCreationSystem from './TaskCreationSystem';
import RubricBuilder from './RubricBuilder';
import AccountSwitcher from './AccountSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

const TeacherDashboard: React.FC = () => {
  const { language, isRTL, toggleLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [showTaskCreation, setShowTaskCreation] = useState(false);
  const [showRubricBuilder, setShowRubricBuilder] = useState(false);
  const [showHomeButton, setShowHomeButton] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark' | 'teal'>('light');

  // Sample data
  const stats = {
    totalStudents: 156,
    pendingGrades: 23,
    classAverage: 8.2,
    completionRate: 87
  };

  const recentSubmissions = [
    {
      id: 1,
      studentName: 'أحمد محمد',
      studentId: 'ST001',
      assignment: 'مقال عن التكنولوجيا',
      subject: 'اللغة العربية',
      submittedAt: '2024-01-15 14:30',
      wordCount: 450,
      timeSpent: '35 دقيقة',
      content: 'هذا نص تجريبي للمقال...',
      language: 'ar' as const
    },
    {
      id: 2,
      studentName: 'فاطمة أحمد',
      studentId: 'ST002',
      assignment: 'تقرير عن البيئة',
      subject: 'العلوم',
      submittedAt: '2024-01-15 16:45',
      wordCount: 380,
      timeSpent: '28 دقيقة',
      content: 'هذا نص تجريبي للتقرير...',
      language: 'ar' as const
    }
  ];

  // Account management data
  const currentAccount = {
    id: 'teacher-001',
    name: 'سارة أحمد',
    email: 'sarah.ahmed@school.edu',
    role: 'teacher' as const,
    isActive: true,
    avatar: '/api/placeholder/40/40',
    school: 'مدرسة قطر الدولية',
    subjects: ['اللغة العربية', 'الأدب']
  };

  const availableAccounts = [
    currentAccount,
    {
      id: 'admin-001',
      name: 'سارة أحمد',
      email: 'sarah.ahmed@admin.edu',
      role: 'admin' as const,
      isActive: false,
      avatar: '/api/placeholder/40/40',
      lastLogin: '1 day ago'
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

  // Theme cycling
  const cycleTheme = () => {
    const themes: ('light' | 'dark' | 'teal')[] = ['light', 'dark', 'teal'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  // Get theme icon
  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5" />;
      case 'dark':
        return <Moon className="w-5 h-5" />;
      case 'teal':
        return <Palette className="w-5 h-5" />;
      default:
        return <Sun className="w-5 h-5" />;
    }
  };

  // Account management functions
  const handleAccountSwitch = (accountId: string) => {
    console.log('Switching to account:', accountId);
  };

  const handleAddAccount = () => {
    console.log('Add new account');
  };

  const handleManageAccounts = () => {
    console.log('Manage accounts');
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  const handleSmartGrade = (submission: any) => {
    setSelectedSubmission(submission);
  };

  const handleCreateTask = () => {
    setShowTaskCreation(true);
  };

  const handleCreateRubric = () => {
    setShowRubricBuilder(true);
  };

  if (selectedSubmission) {
    return (
      <SmartGradingSystem
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        initialLanguage={language}
      />
    );
  }

  if (showTaskCreation) {
    return (
      <TaskCreationSystem
        onClose={() => setShowTaskCreation(false)}
        onSave={(task) => {
          console.log('Task saved:', task);
          setShowTaskCreation(false);
        }}
        language={language}
        userRole="teacher"
      />
    );
  }

  if (showRubricBuilder) {
    return (
      <RubricBuilder
        onClose={() => setShowRubricBuilder(false)}
        onSave={(rubric) => {
          console.log('Rubric saved:', rubric);
          setShowRubricBuilder(false);
        }}
        language={language}
      />
    );
  }

  return (
    <div className={`min-h-screen ${themeStyles.bg} ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className={`${themeStyles.cardBg} backdrop-blur-md border-b ${themeStyles.border} px-6 py-4 sticky top-0 z-40`}>
        <div className="flex items-center justify-between">
          {/* Left Side - Logo and Navigation */}
          <div className="flex items-center space-x-4">
            {/* Platform Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/Untitled-2 copy copy.png" 
                alt="PickPen Logo" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                  {language === 'ar' ? 'بيك بن - المعلم' : 'PickPen - Teacher'}
                </h1>
                <p className={`text-xs ${themeStyles.textSecondary}`}>
                  {language === 'ar' ? 'بوابة المعلم' : 'Teacher Portal'}
                </p>
              </div>
            </div>

            {/* Home Button (Hideable) */}
            {showHomeButton && (
              <button
                onClick={() => window.location.reload()}
                className={`p-2 rounded-lg ${themeStyles.textSecondary} hover:bg-gray-100 transition-colors duration-200`}
                title={language === 'ar' ? 'الصفحة الرئيسية' : 'Home'}
              >
                <Home className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Center - Welcome Message */}
          <div className="hidden md:block text-center">
            <h2 className={`text-lg font-semibold ${themeStyles.textPrimary}`}>
              {language === 'ar' ? 'أهلاً بك، سارة!' : 'Welcome back, Sarah!'}
            </h2>
            <p className={`text-sm ${themeStyles.textSecondary}`}>
              {language === 'ar' ? 'لديك 23 مهمة تحتاج للتقييم' : 'You have 23 assignments to grade'}
            </p>
          </div>

          {/* Right Side - Controls */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-lg ${themeStyles.textSecondary} hover:bg-gray-100 transition-colors duration-200`}
              title={language === 'ar' ? 'تغيير اللغة' : 'Change Language'}
            >
              <Globe className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              className={`p-2 rounded-lg ${themeStyles.textSecondary} hover:bg-gray-100 transition-colors duration-200`}
              title={language === 'ar' ? 'تغيير المظهر' : 'Change Theme'}
            >
              {getThemeIcon()}
            </button>

            {/* Notifications */}
            <button className={`relative p-2 ${themeStyles.textSecondary} hover:bg-gray-100 rounded-lg transition-colors duration-200`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Account Switcher */}
            <AccountSwitcher
              currentAccount={currentAccount}
              availableAccounts={availableAccounts}
              onAccountSwitch={handleAccountSwitch}
              onAddAccount={handleAddAccount}
              onManageAccounts={handleManageAccounts}
              onLogout={handleLogout}
              isRTL={isRTL}
              onLanguageToggle={toggleLanguage}
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 ${themeStyles.cardBg} backdrop-blur-md border-r ${themeStyles.border} overflow-y-auto`}>
          <div className="p-6">
            {/* User Profile */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {currentAccount.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className={`font-bold ${themeStyles.textPrimary}`}>{currentAccount.name}</h3>
                <p className={`text-sm ${themeStyles.textSecondary}`}>
                  {language === 'ar' ? 'معلمة اللغة العربية' : 'Arabic Teacher'}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {[
                { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview', icon: BarChart3 },
                { id: 'assignments', label: language === 'ar' ? 'المهام' : 'Assignments', icon: BookOpen },
                { id: 'students', label: language === 'ar' ? 'الطلاب' : 'Students', icon: Users },
                { id: 'analytics', label: language === 'ar' ? 'التحليلات' : 'Analytics', icon: TrendingUp },
                { id: 'messages', label: language === 'ar' ? 'الرسائل' : 'Messages', icon: MessageSquare },
                { id: 'calendar', label: language === 'ar' ? 'التقويم' : 'Calendar', icon: Calendar },
                { id: 'resources', label: language === 'ar' ? 'الموارد' : 'Resources', icon: FileText },
                { id: 'settings', label: language === 'ar' ? 'الإعدادات' : 'Settings', icon: Settings }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : `${themeStyles.textSecondary} hover:bg-gray-100`
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`${themeStyles.cardBg} rounded-2xl p-6 border ${themeStyles.border}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`${themeStyles.textSecondary} text-sm`}>
                        {language === 'ar' ? 'إجمالي الطلاب' : 'Total Students'}
                      </p>
                      <p className={`text-3xl font-bold ${themeStyles.textPrimary}`}>{stats.totalStudents}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </div>

                <div className={`${themeStyles.cardBg} rounded-2xl p-6 border ${themeStyles.border}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`${themeStyles.textSecondary} text-sm`}>
                        {language === 'ar' ? 'الدرجات المعلقة' : 'Pending Grades'}
                      </p>
                      <p className={`text-3xl font-bold ${themeStyles.textPrimary}`}>{stats.pendingGrades}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </div>

                <div className={`${themeStyles.cardBg} rounded-2xl p-6 border ${themeStyles.border}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`${themeStyles.textSecondary} text-sm`}>
                        {language === 'ar' ? 'متوسط الفصل' : 'Class Average'}
                      </p>
                      <p className={`text-3xl font-bold ${themeStyles.textPrimary}`}>{stats.classAverage}/10</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>

                <div className={`${themeStyles.cardBg} rounded-2xl p-6 border ${themeStyles.border}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`${themeStyles.textSecondary} text-sm`}>
                        {language === 'ar' ? 'معدل الإنجاز' : 'Completion Rate'}
                      </p>
                      <p className={`text-3xl font-bold ${themeStyles.textPrimary}`}>{stats.completionRate}%</p>
                    </div>
                    <Target className="w-8 h-8 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`${themeStyles.cardBg} rounded-2xl p-6 border ${themeStyles.border}`}>
                <h3 className={`text-lg font-bold ${themeStyles.textPrimary} mb-4`}>
                  {language === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={handleCreateTask}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    <Plus className="w-6 h-6" />
                    <span className="font-medium">
                      {language === 'ar' ? 'إنشاء مهمة' : 'Create Task'}
                    </span>
                  </button>

                  <button
                    onClick={handleCreateRubric}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    <Target className="w-6 h-6" />
                    <span className="font-medium">
                      {language === 'ar' ? 'منشئ المعايير' : 'Rubric Builder'}
                    </span>
                  </button>

                  <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200">
                    <BarChart3 className="w-6 h-6" />
                    <span className="font-medium">
                      {language === 'ar' ? 'عرض التحليلات' : 'View Analytics'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Recent Submissions */}
              <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} overflow-hidden`}>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-bold ${themeStyles.textPrimary}`}>
                      {language === 'ar' ? 'التسليمات الحديثة' : 'Recent Submissions'}
                    </h3>
                    <button className={`text-blue-600 hover:text-blue-700 text-sm font-medium`}>
                      {language === 'ar' ? 'عرض الكل' : 'View All'}
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {recentSubmissions.map((submission) => (
                    <div key={submission.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className={`font-semibold ${themeStyles.textPrimary}`}>
                              {submission.studentName}
                            </h4>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              {submission.studentId}
                            </span>
                          </div>
                          <p className={`${themeStyles.textSecondary} text-sm mb-1`}>
                            {submission.assignment}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{submission.submittedAt}</span>
                            <span>{submission.wordCount} {language === 'ar' ? 'كلمة' : 'words'}</span>
                            <span>{submission.timeSpent}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleSmartGrade(submission)}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                          >
                            <Brain className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {language === 'ar' ? 'تقييم ذكي' : 'Smart Grade'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content would go here */}
          {activeTab !== 'overview' && (
            <div className={`${themeStyles.cardBg} rounded-2xl p-12 text-center border ${themeStyles.border}`}>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className={`text-xl font-semibold ${themeStyles.textPrimary} mb-2`}>
                {language === 'ar' ? 'قريباً' : 'Coming Soon'}
              </h3>
              <p className={`${themeStyles.textSecondary}`}>
                {language === 'ar' 
                  ? 'هذا القسم قيد التطوير وسيكون متاحاً قريباً'
                  : 'This section is under development and will be available soon'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;