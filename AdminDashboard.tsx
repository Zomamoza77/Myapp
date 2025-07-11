import React, { useState } from 'react';
import { 
  Shield, Users, BookOpen, BarChart3, Settings, MessageSquare, 
  Database, FileText, Bell, LogOut, Search, Plus, Download,
  TrendingUp, AlertTriangle, CheckCircle, Clock, Eye,
  UserCheck, UserX, GraduationCap, Building, Globe,
  Lock, Unlock, Edit, Trash2, Upload, Filter,
  PieChart, LineChart, Activity, Zap, Brain, Target,
  Home, Sun, Moon, Palette
} from 'lucide-react';
import AccountSwitcher from './AccountSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { language, isRTL, toggleLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showHomeButton, setShowHomeButton] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark' | 'teal'>('light');

  // Account management data
  const currentAccount = {
    id: 'admin-001',
    name: 'محمد الإداري',
    email: 'admin@pickpen.edu',
    role: 'admin' as const,
    isActive: true,
    avatar: '/api/placeholder/40/40',
    department: 'إدارة النظام'
  };

  const availableAccounts = [
    currentAccount,
    {
      id: 'teacher-001',
      name: 'محمد الإداري',
      email: 'mohamed.admin@teacher.edu',
      role: 'teacher' as const,
      isActive: false,
      avatar: '/api/placeholder/40/40',
      lastLogin: '3 days ago'
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

  // Proper logout function
  const handleLogout = () => {
    // Clear all authentication tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userSession');
    localStorage.removeItem('teacherToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('refreshToken');
    
    // Clear session storage
    sessionStorage.clear();
    
    // Clear any cookies (if using cookies for auth)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // Show logout notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 ${isRTL ? 'left-4' : 'right-4'} bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300`;
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <span>Successfully logged out</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Call the parent logout function after a short delay
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
      onLogout();
    }, 2000);
  };

  // Mock data for demonstration
  const platformStats = {
    totalUsers: 2847,
    activeTeachers: 156,
    activeStudents: 2691,
    totalAssignments: 1234,
    completionRate: 87.3,
    avgGrade: 8.2,
    systemUptime: 99.8,
    storageUsed: 67.4
  };

  const recentActivity = [
    { id: 1, type: 'user_created', message: 'New teacher account created: Sarah Ahmed', time: '2 minutes ago', severity: 'info' },
    { id: 2, type: 'content_flagged', message: 'Assignment flagged for review by AI system', time: '15 minutes ago', severity: 'warning' },
    { id: 3, type: 'system_alert', message: 'High server load detected - auto-scaling initiated', time: '1 hour ago', severity: 'error' },
    { id: 4, type: 'grade_submitted', message: 'Bulk grades submitted for Class 10A', time: '2 hours ago', severity: 'success' }
  ];

  const sidebarItems = [
    { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview', icon: BarChart3 },
    { id: 'users', label: language === 'ar' ? 'إدارة المستخدمين' : 'User Management', icon: Users },
    { id: 'content', label: language === 'ar' ? 'إدارة المحتوى' : 'Content Management', icon: BookOpen },
    { id: 'database', label: language === 'ar' ? 'إدارة قاعدة البيانات' : 'Database Management', icon: Database },
    { id: 'analytics', label: language === 'ar' ? 'التحليلات' : 'Analytics', icon: TrendingUp },
    { id: 'communications', label: language === 'ar' ? 'التواصل' : 'Communications', icon: MessageSquare },
    { id: 'settings', label: language === 'ar' ? 'الإعدادات' : 'Settings', icon: Settings },
    { id: 'security', label: language === 'ar' ? 'الأمان' : 'Security', icon: Shield }
  ];

  return (
    <div className={`min-h-screen ${themeStyles.bg} flex ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`absolute top-0 left-0 right-0 ${themeStyles.cardBg} backdrop-blur-md border-b ${themeStyles.border} px-6 py-4 z-10`}>
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
                  {language === 'ar' ? 'بيك بن - المدير' : 'PickPen - Admin'}
                </h1>
                <p className={`text-xs ${themeStyles.textSecondary}`}>
                  {language === 'ar' ? 'مدير المنصة' : 'Platform Manager'}
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
              {language === 'ar' ? 'أهلاً بك، محمد!' : 'Welcome back, Administrator!'}
            </h2>
            <p className={`text-sm ${themeStyles.textSecondary}`}>
              {language === 'ar' ? 'النظام يعمل بكفاءة 99.8%' : 'System running at 99.8% efficiency'}
            </p>
          </div>

          {/* Right Side - Controls */}
          <div className="flex items-center space-x-4">
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
              <Bell className="w-6 h-6" />
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
      </div>

      {/* Sidebar */}
      <div className={`w-64 ${themeStyles.cardBg} backdrop-blur-md border-r ${themeStyles.border} pt-20`}>
        <div className="p-6">
          {/* User Profile */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-purple-700 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-lg font-bold ${themeStyles.textPrimary}`}>
                {language === 'ar' ? 'بوابة المدير' : 'Admin Portal'}
              </h1>
              <p className={`text-xs ${themeStyles.textSecondary}`}>
                {language === 'ar' ? 'مدير المنصة' : 'Platform Manager'}
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                  activeTab === item.id ? `bg-blue-50 border-r-2 border-blue-600 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}` : themeStyles.textSecondary
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${activeTab === item.id ? (theme === 'dark' ? 'text-blue-400' : 'text-blue-600') : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pt-20">
        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Platform Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">
                        {language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users'}
                      </p>
                      <p className="text-3xl font-bold">{platformStats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-200" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="w-4 h-4 text-blue-200 mr-1" />
                    <span className="text-blue-100 text-sm">+12% this month</span>
                  </div>
                </div>

                <div className={`bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm">
                        {language === 'ar' ? 'المعلمون النشطون' : 'Active Teachers'}
                      </p>
                      <p className="text-3xl font-bold">{platformStats.activeTeachers}</p>
                    </div>
                    <GraduationCap className="w-8 h-8 text-emerald-200" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-200 mr-1" />
                    <span className="text-emerald-100 text-sm">98% engagement</span>
                  </div>
                </div>

                <div className={`bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">
                        {language === 'ar' ? 'معدل الإنجاز' : 'Completion Rate'}
                      </p>
                      <p className="text-3xl font-bold">{platformStats.completionRate}%</p>
                    </div>
                    <Target className="w-8 h-8 text-purple-200" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="w-4 h-4 text-purple-200 mr-1" />
                    <span className="text-purple-100 text-sm">+5.2% vs last month</span>
                  </div>
                </div>

                <div className={`bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">
                        {language === 'ar' ? 'وقت تشغيل النظام' : 'System Uptime'}
                      </p>
                      <p className="text-3xl font-bold">{platformStats.systemUptime}%</p>
                    </div>
                    <Activity className="w-8 h-8 text-orange-200" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <CheckCircle className="w-4 h-4 text-orange-200 mr-1" />
                    <span className="text-orange-100 text-sm">Excellent performance</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity & System Health */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`${themeStyles.cardBg} rounded-2xl shadow-lg border ${themeStyles.border} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-semibold ${themeStyles.textPrimary}`}>
                      {language === 'ar' ? 'النشاط الحديث' : 'Recent Activity'}
                    </h3>
                    <Bell className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.severity === 'error' ? 'bg-red-500' :
                          activity.severity === 'warning' ? 'bg-yellow-500' :
                          activity.severity === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className={`text-sm ${themeStyles.textPrimary}`}>{activity.message}</p>
                          <p className={`text-xs ${themeStyles.textSecondary}`}>{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${themeStyles.cardBg} rounded-2xl shadow-lg border ${themeStyles.border} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-semibold ${themeStyles.textPrimary}`}>
                      {language === 'ar' ? 'صحة النظام' : 'System Health'}
                    </h3>
                    <Activity className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${themeStyles.textSecondary}`}>Server Load</span>
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                          <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium text-green-600">67%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${themeStyles.textSecondary}`}>Storage Used</span>
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                          <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium text-blue-600">{platformStats.storageUsed}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${themeStyles.textSecondary}`}>Active Sessions</span>
                      <span className={`text-sm font-medium ${themeStyles.textPrimary}`}>1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${themeStyles.textSecondary}`}>Response Time</span>
                      <span className="text-sm font-medium text-green-600">142ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content */}
          {activeTab !== 'overview' && (
            <div className={`${themeStyles.cardBg} rounded-2xl shadow-lg border ${themeStyles.border} p-12 text-center`}>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'communications' && <MessageSquare className="w-8 h-8 text-gray-400" />}
                {activeTab === 'security' && <Shield className="w-8 h-8 text-gray-400" />}
                {activeTab !== 'communications' && activeTab !== 'security' && <Settings className="w-8 h-8 text-gray-400" />}
              </div>
              <h3 className={`text-xl font-semibold ${themeStyles.textPrimary} mb-2`}>
                {language === 'ar' ? 'قريباً' : 'Coming Soon'}
              </h3>
              <p className={`${themeStyles.textSecondary} mb-6`}>
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

export default AdminDashboard;