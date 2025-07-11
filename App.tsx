import React, { useState } from 'react';
import WritingPlatform from './components/WritingPlatform';
import TeacherApp from './components/TeacherApp';
import AdminApp from './components/AdminApp';
import LanguageToggle from './components/LanguageToggle';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { GraduationCap, PenTool, Users, Shield, Globe, Moon, Sun, ArrowLeft, ArrowRight } from 'lucide-react';

function AppContent() {
  const [userType, setUserType] = useState<'student' | 'teacher' | 'admin' | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { language, isRTL, t } = useLanguage();

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Function to go back to landing page
  const goBackToLanding = () => {
    setUserType(null);
  };

  if (userType === 'student') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100">
        {/* Back Arrow for Student */}
        <div className={`fixed top-6 z-50 ${isRTL ? 'right-6' : 'left-6'}`}>
          <button
            onClick={goBackToLanding}
            className="p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/90 transition-all duration-300 group flex items-center space-x-2"
            title={isRTL ? 'العودة للصفحة الرئيسية' : 'Back to Home'}
          >
            {isRTL ? (
              <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-200" />
            ) : (
              <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-200" />
            )}
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {isRTL ? 'الرئيسية' : 'Home'}
            </span>
          </button>
        </div>
        <WritingPlatform language={language} />
      </div>
    );
  }

  if (userType === 'teacher') {
    return (
      <div className="min-h-screen">
        {/* Back Arrow for Teacher */}
        <div className={`fixed top-6 z-50 ${isRTL ? 'right-6' : 'left-6'}`}>
          <button
            onClick={goBackToLanding}
            className="p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/90 transition-all duration-300 group flex items-center space-x-2"
            title={isRTL ? 'العودة للصفحة الرئيسية' : 'Back to Home'}
          >
            {isRTL ? (
              <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-200" />
            ) : (
              <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-200" />
            )}
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {isRTL ? 'الرئيسية' : 'Home'}
            </span>
          </button>
        </div>
        <TeacherApp />
      </div>
    );
  }

  if (userType === 'admin') {
    return (
      <div className="min-h-screen">
        {/* Back Arrow for Admin */}
        <div className={`fixed top-6 z-50 ${isRTL ? 'right-6' : 'left-6'}`}>
          <button
            onClick={goBackToLanding}
            className="p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/90 transition-all duration-300 group flex items-center space-x-2"
            title={isRTL ? 'العودة للصفحة الرئيسية' : 'Back to Home'}
          >
            {isRTL ? (
              <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-200" />
            ) : (
              <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-200" />
            )}
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {isRTL ? 'الرئيسية' : 'Home'}
            </span>
          </button>
        </div>
        <AdminApp />
      </div>
    );
  }

  // Landing page for role selection
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${isRTL ? 'rtl font-arabic' : 'ltr font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Language and Theme Switcher */}
      <div className={`fixed top-6 z-50 flex items-center space-x-3 ${isRTL ? 'left-6 space-x-reverse' : 'right-6'}`}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/90 transition-all duration-300 group"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-200" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-600 group-hover:text-yellow-700 transition-colors duration-200" />
          )}
        </button>

        {/* Language Switcher */}
        <LanguageToggle variant="dropdown" size="md" />
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="max-w-6xl w-full">
          {/* Hero Section with Logo and Inspirational Quote */}
          <div className="text-center mb-16">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <img 
                  src="/Untitled-2 copy copy.png" 
                  alt="PickPen Logo" 
                  className="w-32 h-32 object-contain transform group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 blur-xl transform scale-150 group-hover:scale-175 transition-transform duration-500"></div>
              </div>
            </div>

            {/* Platform Name with Typing Animation */}
            <div className="mb-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                {t('landing.welcome')} <span className="gradient-text typing-animation">{t('landing.platformName')}</span>
              </h1>
            </div>

            {/* Inspirational Quote */}
            <div className="mb-8 relative">
              <div className="inline-block p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 quote-container">
                <blockquote className={`text-2xl md:text-3xl font-serif italic text-gray-800 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                  {t('landing.inspirationalQuote')}
                </blockquote>
                <cite className="text-sm text-gray-600 font-medium">{t('landing.quoteAuthor')}</cite>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-purple-500 rounded-full opacity-60 animate-pulse delay-1000"></div>
            </div>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('landing.subtitle')}
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {/* Student Portal */}
            <div 
              onClick={() => setUserType('student')}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group hover-lift"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <PenTool className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('landing.studentPortal')}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t('landing.studentDesc')}
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 flex-shrink-0"></div>
                    {language === 'ar' ? 'بيئة كتابة تفاعلية' : 'Interactive writing environment'}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 flex-shrink-0"></div>
                    {language === 'ar' ? 'اقتراحات ذكية فورية' : 'Real-time AI suggestions'}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 flex-shrink-0"></div>
                    {language === 'ar' ? 'تتبع التقدم والتحليلات' : 'Progress tracking & analytics'}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 flex-shrink-0"></div>
                    {language === 'ar' ? 'مكتبة المقالات والموارد' : 'Article library & resources'}
                  </div>
                </div>
                <button className="w-full mt-6 btn-secondary group-hover:scale-105 transition-transform duration-200">
                  {t('landing.enterPortal')} {t('landing.studentPortal')}
                </button>
              </div>
            </div>

            {/* Teacher Portal */}
            <div 
              onClick={() => setUserType('teacher')}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group hover-lift"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('landing.teacherPortal')}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t('landing.teacherDesc')}
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    {language === 'ar' ? 'إدارة المحتوى والمهام' : 'Content & assignment management'}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    {language === 'ar' ? 'نظام تقييم ذكي' : 'AI-powered grading system'}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    {language === 'ar' ? 'تحليلات الأداء والتقارير' : 'Performance analytics & reports'}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    {language === 'ar' ? 'أدوات التواصل' : 'Communication tools'}
                  </div>
                </div>
                <button className="w-full mt-6 btn-primary group-hover:scale-105 transition-transform duration-200">
                  {t('landing.enterPortal')} {t('landing.teacherPortal')}
                </button>
              </div>
            </div>

            {/* Admin Portal */}
            <div 
              onClick={() => setUserType('admin')}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group hover-lift"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('landing.adminPortal')}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t('landing.adminDesc')}
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                    {language === 'ar' ? 'إدارة المستخدمين والأدوار' : 'User & role management'}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                    {language === 'ar' ? 'إشراف المحتوى والموافقة' : 'Content oversight & approval'}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                    {language === 'ar' ? 'تحليلات المنصة والتقارير' : 'Platform analytics & reports'}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                    {language === 'ar' ? 'حوكمة الذكاء الاصطناعي والأمان' : 'AI governance & security'}
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-red-600 to-purple-700 text-white font-medium rounded-xl py-3 px-6 shadow-md hover:shadow-lg transform group-hover:scale-105 transition-all duration-200">
                  {t('landing.enterPortal')} {t('landing.adminPortal')}
                </button>
              </div>
            </div>
          </div>

          {/* Features Overview */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-12">{t('landing.whyChoose')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <PenTool className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{t('landing.aiPowered')}</h4>
                <p className="text-gray-600 leading-relaxed">{t('landing.aiDesc')}</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{t('landing.collaborative')}</h4>
                <p className="text-gray-600 leading-relaxed">{t('landing.collaborativeDesc')}</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{t('landing.management')}</h4>
                <p className="text-gray-600 leading-relaxed">{t('landing.managementDesc')}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-500 text-sm leading-relaxed">
              {t('landing.footer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;