import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageToggleProps {
  variant?: 'button' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  variant = 'button',
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const { language, isRTL, toggleLanguage, t } = useLanguage();

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (variant === 'dropdown') {
    return (
      <div className={`relative group ${className}`}>
        <button
          onClick={toggleLanguage}
          className={`flex items-center space-x-2 ${sizeClasses[size]} bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/90 transition-all duration-300 group-hover:scale-105 ${isRTL ? 'space-x-reverse' : ''}`}
        >
          <Globe className={`${iconSizes[size]} text-blue-600`} />
          {showLabel && (
            <span className="font-medium text-gray-700 min-w-[2rem]">
              {language === 'en' ? 'EN' : 'ع'}
            </span>
          )}
          <div className="w-1 h-1 bg-blue-500 rounded-full opacity-60"></div>
        </button>
        
        {/* Tooltip */}
        <div className={`absolute top-full mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 ${
          isRTL ? 'right-0' : 'left-0'
        }`}>
          {language === 'en' ? t('account.switchToArabic') : t('account.switchToEnglish')}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center space-x-2 ${sizeClasses[size]} bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 ${isRTL ? 'space-x-reverse' : ''} ${className}`}
      title={language === 'en' ? t('account.switchToArabic') : t('account.switchToEnglish')}
    >
      <Globe className={`${iconSizes[size]} text-gray-600`} />
      {showLabel && (
        <span className="font-medium text-gray-700">
          {language === 'en' ? 'EN' : 'ع'}
        </span>
      )}
    </button>
  );
};

export default LanguageToggle;