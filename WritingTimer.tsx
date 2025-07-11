import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, Play, Pause, RotateCcw, Settings, Volume2, VolumeX,
  AlertTriangle, CheckCircle, Timer, Bell, Zap, Target
} from 'lucide-react';

interface WritingTimerProps {
  language?: 'ar' | 'en';
  theme?: 'light' | 'dark' | 'teal';
  onTimeUp?: () => void;
}

const WritingTimer: React.FC<WritingTimerProps> = ({ 
  language = 'ar',
  theme = 'teal',
  onTimeUp
}) => {
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes default
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(30);
  const [warningTime, setWarningTime] = useState(5); // Warning 5 minutes before end
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [warningTriggered, setWarningTriggered] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
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

  // Timer effect
  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            playAlarm();
            onTimeUp?.();
            return 0;
          }
          
          // Warning sound
          if (prev === warningTime * 60 && !warningTriggered) {
            playWarningSound();
            setWarningTriggered(true);
          }
          
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isPaused, warningTime, warningTriggered, onTimeUp]);

  // Play alarm sound
  const playAlarm = () => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Play multiple beeps
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      }, i * 600);
    }
  };

  // Play warning sound
  const playWarningSound = () => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  };

  // Start timer
  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    setWarningTriggered(false);
  };

  // Pause timer
  const pauseTimer = () => {
    setIsPaused(true);
  };

  // Resume timer
  const resumeTimer = () => {
    setIsPaused(false);
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(customMinutes * 60);
    setWarningTriggered(false);
  };

  // Apply custom time
  const applyCustomTime = () => {
    setTimeRemaining(customMinutes * 60);
    setIsRunning(false);
    setIsPaused(false);
    setWarningTriggered(false);
    setShowSettings(false);
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Get timer status color
  const getTimerColor = () => {
    if (timeRemaining <= warningTime * 60) {
      return 'text-red-600';
    } else if (timeRemaining <= warningTime * 60 * 2) {
      return 'text-yellow-600';
    }
    return 'text-green-600';
  };

  // Get progress percentage
  const getProgress = () => {
    const totalTime = customMinutes * 60;
    return ((totalTime - timeRemaining) / totalTime) * 100;
  };

  return (
    <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} p-4 mb-6`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-bold ${themeStyles.textPrimary} flex items-center`}>
          <Timer className="w-5 h-5 mr-2 text-blue-600" />
          {language === 'ar' ? 'المؤقت الزمني' : 'Writing Timer'}
        </h3>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              soundEnabled 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-500'
            }`}
            title={language === 'ar' ? 'تشغيل/إيقاف الصوت' : 'Toggle Sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            title={language === 'ar' ? 'إعدادات المؤقت' : 'Timer Settings'}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-4">
        <div className={`text-4xl font-mono font-bold ${getTimerColor()} mb-2`}>
          {formatTime(timeRemaining)}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              timeRemaining <= warningTime * 60 ? 'bg-red-500' :
              timeRemaining <= warningTime * 60 * 2 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>
        
        {/* Status */}
        <div className={`text-sm ${themeStyles.textSecondary}`}>
          {isRunning && !isPaused && (
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{language === 'ar' ? 'جاري العد التنازلي' : 'Timer Running'}</span>
            </div>
          )}
          {isPaused && (
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>{language === 'ar' ? 'متوقف مؤقتاً' : 'Paused'}</span>
            </div>
          )}
          {!isRunning && !isPaused && (
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>{language === 'ar' ? 'جاهز للبدء' : 'Ready to Start'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex justify-center space-x-2 mb-4">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>{language === 'ar' ? 'بدء' : 'Start'}</span>
          </button>
        ) : isPaused ? (
          <button
            onClick={resumeTimer}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>{language === 'ar' ? 'متابعة' : 'Resume'}</span>
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <Pause className="w-4 h-4" />
            <span>{language === 'ar' ? 'إيقاف' : 'Pause'}</span>
          </button>
        )}
        
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{language === 'ar' ? 'إعادة ضبط' : 'Reset'}</span>
        </button>
      </div>

      {/* Warning Alert */}
      {timeRemaining <= warningTime * 60 && timeRemaining > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">
              {language === 'ar' 
                ? `تحذير: باقي ${Math.ceil(timeRemaining / 60)} دقائق فقط!`
                : `Warning: Only ${Math.ceil(timeRemaining / 60)} minutes left!`
              }
            </span>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div>
            <label className={`block text-sm font-medium ${themeStyles.textPrimary} mb-2`}>
              {language === 'ar' ? 'مدة المؤقت (بالدقائق)' : 'Timer Duration (minutes)'}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="180"
              />
              <button
                onClick={applyCustomTime}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                {language === 'ar' ? 'تطبيق' : 'Apply'}
              </button>
            </div>
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${themeStyles.textPrimary} mb-2`}>
              {language === 'ar' ? 'تحذير قبل النهاية (بالدقائق)' : 'Warning Before End (minutes)'}
            </label>
            <input
              type="number"
              value={warningTime}
              onChange={(e) => setWarningTime(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              max="30"
            />
          </div>

          {/* Quick Time Presets */}
          <div>
            <label className={`block text-sm font-medium ${themeStyles.textPrimary} mb-2`}>
              {language === 'ar' ? 'أوقات سريعة' : 'Quick Presets'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 30, 45, 60, 90, 120].map((minutes) => (
                <button
                  key={minutes}
                  onClick={() => {
                    setCustomMinutes(minutes);
                    setTimeRemaining(minutes * 60);
                    setIsRunning(false);
                    setIsPaused(false);
                    setWarningTriggered(false);
                  }}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors duration-200 ${
                    customMinutes === minutes
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {minutes}{language === 'ar' ? 'د' : 'm'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Time Up Alert */}
      {timeRemaining === 0 && (
        <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Bell className="w-6 h-6 text-red-600 animate-bounce" />
            <span className="text-red-800 font-bold text-lg">
              {language === 'ar' ? 'انتهى الوقت!' : 'Time\'s Up!'}
            </span>
          </div>
          <p className="text-red-700 text-sm">
            {language === 'ar' 
              ? 'لقد انتهت مدة الكتابة المحددة. يمكنك إعادة ضبط المؤقت للمتابعة.'
              : 'Your writing time has ended. You can reset the timer to continue.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default WritingTimer;