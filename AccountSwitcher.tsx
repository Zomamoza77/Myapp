import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, User, GraduationCap, Shield, Users, 
  Plus, Settings, LogOut, Check, Globe, Moon, Sun,
  Bell, MessageSquare, Calendar, BookOpen, BarChart3
} from 'lucide-react';

interface Account {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  notifications?: number;
  institution?: string;
}

interface AccountSwitcherProps {
  currentAccount: Account;
  availableAccounts: Account[];
  onAccountSwitch: (accountId: string) => void;
  onAddAccount: () => void;
  onManageAccounts: () => void;
  onLogout: () => void;
  isRTL?: boolean;
  onLanguageToggle?: () => void;
}

const AccountSwitcher: React.FC<AccountSwitcherProps> = ({
  currentAccount,
  availableAccounts,
  onAccountSwitch,
  onAddAccount,
  onManageAccounts,
  onLogout,
  isRTL = false,
  onLanguageToggle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle account switch with animation
  const handleAccountSwitch = (accountId: string) => {
    if (accountId === currentAccount.id) {
      setIsOpen(false);
      return;
    }

    setIsAnimating(true);
    
    // Show switching notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 ${isRTL ? 'left-4' : 'right-4'} bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300`;
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>${isRTL ? 'جاري التبديل إلى الحساب...' : 'Switching account...'}</span>
      </div>
    `;
    document.body.appendChild(notification);

    // Simulate account switch delay
    setTimeout(() => {
      onAccountSwitch(accountId);
      setIsAnimating(false);
      setIsOpen(false);
      
      // Remove loading notification
      document.body.removeChild(notification);
      
      // Show success notification
      const successNotification = document.createElement('div');
      const switchedAccount = availableAccounts.find(acc => acc.id === accountId);
      successNotification.className = `fixed top-4 ${isRTL ? 'left-4' : 'right-4'} bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300`;
      successNotification.innerHTML = `
        <div class="flex items-center space-x-3">
          <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <span>${isRTL ? `تم التبديل إلى حساب ${getRoleNameArabic(switchedAccount?.role || 'student')} بنجاح` : `Switched to ${switchedAccount?.role} account successfully`}</span>
        </div>
      `;
      document.body.appendChild(successNotification);
      
      // Remove success notification after 3 seconds
      setTimeout(() => {
        if (document.body.contains(successNotification)) {
          document.body.removeChild(successNotification);
        }
      }, 3000);
    }, 1500);
  };

  // Get role icon
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'teacher': return GraduationCap;
      case 'admin': return Shield;
      case 'parent': return Users;
      default: return User;
    }
  };

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'teacher': return 'from-blue-500 to-blue-600';
      case 'admin': return 'from-red-500 to-red-600';
      case 'parent': return 'from-purple-500 to-purple-600';
      default: return 'from-emerald-500 to-emerald-600';
    }
  };

  // Get role name in Arabic
  const getRoleNameArabic = (role: string) => {
    switch (role) {
      case 'teacher': return 'المعلم';
      case 'admin': return 'المدير';
      case 'parent': return 'ولي الأمر';
      default: return 'الطالب';
    }
  };

  // Get role name in English
  const getRoleNameEnglish = (role: string) => {
    switch (role) {
      case 'teacher': return 'Teacher';
      case 'admin': return 'Administrator';
      case 'parent': return 'Parent';
      default: return 'Student';
    }
  };

  const RoleIcon = getRoleIcon(currentAccount.role);

  return (
    <div className={`relative ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Main Account Switcher Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isAnimating}
        className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''} px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${
          isOpen ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
        } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300'}`}
      >
        {/* Avatar */}
        <div className={`w-8 h-8 bg-gradient-to-r ${getRoleColor(currentAccount.role)} rounded-full flex items-center justify-center text-white shadow-sm`}>
          {currentAccount.avatar ? (
            <img src={currentAccount.avatar} alt={currentAccount.name} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <RoleIcon className="w-4 h-4" />
          )}
        </div>

        {/* Account Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900 truncate">
              {currentAccount.name}
            </span>
            {currentAccount.notifications && currentAccount.notifications > 0 && (
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {isRTL ? getRoleNameArabic(currentAccount.role) : getRoleNameEnglish(currentAccount.role)}
          </div>
        </div>

        {/* Dropdown Arrow */}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        } ${isAnimating ? 'animate-spin' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute top-full mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden ${
            isRTL ? 'right-0' : 'left-0'
          } animate-in slide-in-from-top-2 duration-200`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                {isRTL ? 'تبديل الحساب' : 'Switch Account'}
              </h3>
              <div className="flex items-center space-x-2">
                {onLanguageToggle && (
                  <button
                    onClick={onLanguageToggle}
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    title={isRTL ? 'تغيير اللغة' : 'Change Language'}
                  >
                    <Globe className="w-4 h-4 text-gray-600" />
                  </button>
                )}
                <button
                  onClick={onManageAccounts}
                  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  title={isRTL ? 'إدارة الحسابات' : 'Manage Accounts'}
                >
                  <Settings className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {isRTL ? 'اختر حساباً للتبديل إليه' : 'Select an account to switch to'}
            </p>
          </div>

          {/* Current Account Status */}
          <div className="px-4 py-3 bg-blue-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${getRoleColor(currentAccount.role)} rounded-full flex items-center justify-center text-white`}>
                <RoleIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{currentAccount.name}</span>
                  <Check className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">{currentAccount.email}</p>
                <p className="text-xs text-blue-600 font-medium">
                  {isRTL ? 'الحساب النشط حالياً' : 'Currently active'}
                </p>
              </div>
            </div>
          </div>

          {/* Available Accounts */}
          <div className="max-h-64 overflow-y-auto">
            {availableAccounts
              .filter(account => account.id !== currentAccount.id)
              .map((account) => {
                const AccountIcon = getRoleIcon(account.role);
                return (
                  <button
                    key={account.id}
                    onClick={() => handleAccountSwitch(account.id)}
                    className="w-full px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${getRoleColor(account.role)} rounded-full flex items-center justify-center text-white relative`}>
                        <AccountIcon className="w-5 h-5" />
                        {account.notifications && account.notifications > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {account.notifications > 9 ? '9+' : account.notifications}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">{account.name}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            account.role === 'teacher' ? 'bg-blue-100 text-blue-700' :
                            account.role === 'admin' ? 'bg-red-100 text-red-700' :
                            account.role === 'parent' ? 'bg-purple-100 text-purple-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {isRTL ? getRoleNameArabic(account.role) : getRoleNameEnglish(account.role)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{account.email}</p>
                        {account.institution && (
                          <p className="text-xs text-gray-500">{account.institution}</p>
                        )}
                        {account.lastLogin && (
                          <p className="text-xs text-gray-400">
                            {isRTL ? `آخر دخول: ${account.lastLogin}` : `Last login: ${account.lastLogin}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>

          {/* Footer Actions */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 space-y-2">
            <button
              onClick={onAddAccount}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">
                {isRTL ? 'إضافة حساب جديد' : 'Add New Account'}
              </span>
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={onManageAccounts}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">
                  {isRTL ? 'إدارة' : 'Manage'}
                </span>
              </button>
              
              <button
                onClick={onLogout}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">
                  {isRTL ? 'خروج' : 'Logout'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSwitcher;