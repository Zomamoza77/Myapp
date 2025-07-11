import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, Download, Save, Undo, Redo, ZoomIn, ZoomOut, 
  RotateCcw, Check, AlertTriangle, Eye, MessageSquare,
  FileText, Clock, User, BookOpen, Target, Brain,
  ChevronLeft, ChevronRight, Maximize2, Minimize2,
  Settings, RefreshCw, Send, Star, ThumbsUp, Award,
  Globe, Moon, Sun, Volume2, VolumeX, Printer,
  Share2, Copy, CheckCircle, XCircle, Info, Move
} from 'lucide-react';

interface SmartGradingSystemProps {
  submission: {
    id: number;
    studentName: string;
    studentId: string;
    assignment: string;
    subject: string;
    submittedAt: string;
    wordCount: number;
    timeSpent: string;
    content: string;
    language?: 'ar' | 'en';
  };
  onClose: () => void;
  initialLanguage?: 'ar' | 'en';
}

interface Annotation {
  id: string;
  type: 'zigzag' | 'check' | 'seen';
  x: number;
  y: number;
  width?: number;
  height?: number;
  questionIndex?: number;
  isDragging?: boolean;
}

interface RubricCategory {
  id: string;
  name: { ar: string; en: string };
  levels: { 
    name: { ar: string; en: string }; 
    points: number; 
    description: { ar: string; en: string };
  }[];
  selectedLevel: number;
  comment: string;
  aiSuggestion?: number;
  questionIndex: number;
}

const SmartGradingSystem: React.FC<SmartGradingSystemProps> = ({ 
  submission, 
  onClose, 
  initialLanguage = 'en' 
}) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedTool, setSelectedTool] = useState<'zigzag' | 'check' | 'seen' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(true);
  const [language, setLanguage] = useState<'ar' | 'en'>(initialLanguage);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [draggedAnnotation, setDraggedAnnotation] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const pdfViewerRef = useRef<HTMLDivElement>(null);
  const annotationLayerRef = useRef<HTMLDivElement>(null);

  const isRTL = language === 'ar';

  // Multilingual content
  const content = {
    ar: {
      smartGrading: 'نظام التقييم الذكي',
      student: 'الطالب',
      assignment: 'المهمة',
      tools: 'الأدوات',
      zigzagTool: 'خط متعرج',
      checkTool: 'علامة صح',
      seenTool: 'تمت المراجعة',
      errors: 'أخطاء',
      correct: 'صحيح',
      seen: 'مراجع',
      rubricEvaluation: 'تقييم المعايير',
      totalScore: 'النتيجة الإجمالية',
      saveGrade: 'حفظ التقييم',
      aiSuggestion: 'اقتراح ذكي',
      addComment: 'إضافة تعليق لهذا المعيار...',
      overallComments: 'التعليقات العامة',
      overallFeedback: 'اكتب تعليقاً عاماً للطالب...',
      saveAndSend: 'حفظ وإرسال للطالب',
      exportPDF: 'تصدير تقرير PDF',
      sendMessage: 'إرسال رسالة للطالب',
      gradingSummary: 'ملخص التقييم',
      errorsMarked: 'الأخطاء المحددة',
      correctParts: 'الأجزاء الصحيحة',
      sectionsReviewed: 'الأقسام المراجعة',
      finalScore: 'النتيجة النهائية',
      submittedAt: 'تاريخ التسليم',
      wordCount: 'عدد الكلمات',
      timeSpent: 'الوقت المستغرق',
      score: 'النتيجة',
      clearAll: 'مسح الكل',
      zoomIn: 'تكبير',
      zoomOut: 'تصغير',
      fullscreen: 'ملء الشاشة',
      exitFullscreen: 'خروج من ملء الشاشة',
      autoSaveEnabled: 'الحفظ التلقائي مفعل',
      lastSavedAt: 'آخر حفظ في',
      gradingComplete: 'تم التقييم بنجاح!',
      markAsComplete: 'تحديد كمكتمل',
      needsRevision: 'يحتاج مراجعة',
      excellent: 'ممتاز',
      good: 'جيد',
      fair: 'مقبول',
      poor: 'ضعيف',
      ideas: 'الأفكار والمحتوى',
      organization: 'التنظيم',
      language: 'اللغة والقواعد',
      creativity: 'الإبداع والأسلوب',
      moveAnnotation: 'اسحب لتحريك العلامة',
      doubleClickToDelete: 'انقر مرتين للحذف'
    },
    en: {
      smartGrading: 'Smart Grading System',
      student: 'Student',
      assignment: 'Assignment',
      tools: 'Tools',
      zigzagTool: 'Zigzag Line',
      checkTool: 'Check Mark',
      seenTool: 'Seen Box',
      errors: 'Errors',
      correct: 'Correct',
      seen: 'Seen',
      rubricEvaluation: 'Rubric Evaluation',
      totalScore: 'Total Score',
      saveGrade: 'Save Grade',
      aiSuggestion: 'AI Suggestion',
      addComment: 'Add comments for this category...',
      overallComments: 'Overall Comments',
      overallFeedback: 'Write overall feedback for the student...',
      saveAndSend: 'Save & Send to Student',
      exportPDF: 'Export PDF Report',
      sendMessage: 'Send Message to Student',
      gradingSummary: 'Grading Summary',
      errorsMarked: 'Errors Marked',
      correctParts: 'Correct Parts',
      sectionsReviewed: 'Sections Reviewed',
      finalScore: 'Final Score',
      submittedAt: 'Submitted At',
      wordCount: 'Word Count',
      timeSpent: 'Time Spent',
      score: 'Score',
      clearAll: 'Clear All',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      fullscreen: 'Fullscreen',
      exitFullscreen: 'Exit Fullscreen',
      autoSaveEnabled: 'Auto-save Enabled',
      lastSavedAt: 'Last saved at',
      gradingComplete: 'Grading completed successfully!',
      markAsComplete: 'Mark as Complete',
      needsRevision: 'Needs Revision',
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
      ideas: 'Ideas & Content',
      organization: 'Organization',
      language: 'Language & Grammar',
      creativity: 'Creativity & Voice',
      moveAnnotation: 'Drag to move annotation',
      doubleClickToDelete: 'Double-click to delete'
    }
  };

  const t = content[language];

  // Enhanced rubric categories with multilingual support
  const [rubricCategories, setRubricCategories] = useState<RubricCategory[]>([
    {
      id: 'ideas',
      name: { ar: 'الأفكار والمحتوى', en: 'Ideas & Content' },
      levels: [
        { 
          name: { ar: 'ممتاز', en: 'Excellent' }, 
          points: 4, 
          description: { 
            ar: 'أفكار واضحة ومركزة وجذابة', 
            en: 'Clear, focused, and engaging ideas' 
          } 
        },
        { 
          name: { ar: 'جيد', en: 'Good' }, 
          points: 3, 
          description: { 
            ar: 'أفكار واضحة عموماً مع بعض التركيز', 
            en: 'Generally clear ideas with some focus' 
          } 
        },
        { 
          name: { ar: 'مقبول', en: 'Fair' }, 
          points: 2, 
          description: { 
            ar: 'بعض الأفكار الواضحة لكن تفتقر للتركيز', 
            en: 'Some clear ideas but lacks focus' 
          } 
        },
        { 
          name: { ar: 'ضعيف', en: 'Poor' }, 
          points: 1, 
          description: { 
            ar: 'أفكار غير واضحة أو غير مركزة', 
            en: 'Unclear or unfocused ideas' 
          } 
        }
      ],
      selectedLevel: -1,
      comment: '',
      aiSuggestion: 2,
      questionIndex: 0
    },
    {
      id: 'organization',
      name: { ar: 'التنظيم', en: 'Organization' },
      levels: [
        { 
          name: { ar: 'ممتاز', en: 'Excellent' }, 
          points: 4, 
          description: { 
            ar: 'هيكل واضح مع انتقالات سلسة', 
            en: 'Clear structure with smooth transitions' 
          } 
        },
        { 
          name: { ar: 'جيد', en: 'Good' }, 
          points: 3, 
          description: { 
            ar: 'منظم بشكل عام', 
            en: 'Generally well organized' 
          } 
        },
        { 
          name: { ar: 'مقبول', en: 'Fair' }, 
          points: 2, 
          description: { 
            ar: 'بعض التنظيم لكن الهيكل غير واضح', 
            en: 'Some organization but unclear structure' 
          } 
        },
        { 
          name: { ar: 'ضعيف', en: 'Poor' }, 
          points: 1, 
          description: { 
            ar: 'تنظيم قليل أو معدوم', 
            en: 'Little to no clear organization' 
          } 
        }
      ],
      selectedLevel: -1,
      comment: '',
      aiSuggestion: 3,
      questionIndex: 0
    },
    {
      id: 'language',
      name: { ar: 'اللغة والقواعد', en: 'Language & Grammar' },
      levels: [
        { 
          name: { ar: 'ممتاز', en: 'Excellent' }, 
          points: 4, 
          description: { 
            ar: 'قواعد صحيحة مع مفردات متنوعة', 
            en: 'Correct grammar with varied vocabulary' 
          } 
        },
        { 
          name: { ar: 'جيد', en: 'Good' }, 
          points: 3, 
          description: { 
            ar: 'صحيح عموماً مع أخطاء طفيفة', 
            en: 'Generally correct with minor errors' 
          } 
        },
        { 
          name: { ar: 'مقبول', en: 'Fair' }, 
          points: 2, 
          description: { 
            ar: 'بعض الأخطاء التي قد تؤثر على المعنى', 
            en: 'Some errors that may interfere with meaning' 
          } 
        },
        { 
          name: { ar: 'ضعيف', en: 'Poor' }, 
          points: 1, 
          description: { 
            ar: 'أخطاء متكررة تؤثر على المعنى', 
            en: 'Frequent errors that interfere with meaning' 
          } 
        }
      ],
      selectedLevel: -1,
      comment: '',
      aiSuggestion: 1,
      questionIndex: 0
    },
    {
      id: 'creativity',
      name: { ar: 'الإبداع والأسلوب', en: 'Creativity & Voice' },
      levels: [
        { 
          name: { ar: 'ممتاز', en: 'Excellent' }, 
          points: 4, 
          description: { 
            ar: 'أسلوب فريد مع تعبير إبداعي', 
            en: 'Unique voice with creative expression' 
          } 
        },
        { 
          name: { ar: 'جيد', en: 'Good' }, 
          points: 3, 
          description: { 
            ar: 'بعض الشخصية والعناصر الإبداعية', 
            en: 'Some personality and creative elements' 
          } 
        },
        { 
          name: { ar: 'مقبول', en: 'Fair' }, 
          points: 2, 
          description: { 
            ar: 'إبداع محدود أو أسلوب شخصي', 
            en: 'Limited creativity or personal voice' 
          } 
        },
        { 
          name: { ar: 'ضعيف', en: 'Poor' }, 
          points: 1, 
          description: { 
            ar: 'إبداع قليل أو معدوم أو أسلوب شخصي', 
            en: 'Little to no creativity or personal voice' 
          } 
        }
      ],
      selectedLevel: -1,
      comment: '',
      aiSuggestion: 2,
      questionIndex: 0
    }
  ]);

  // Tool counters
  const zigzagCount = annotations.filter(a => a.type === 'zigzag').length;
  const checkCount = annotations.filter(a => a.type === 'check').length;
  const seenCount = annotations.filter(a => a.type === 'seen').length;

  // Calculate total score
  const totalScore = rubricCategories.reduce((sum, category) => {
    if (category.selectedLevel >= 0) {
      return sum + category.levels[category.selectedLevel].points;
    }
    return sum;
  }, 0);

  const maxScore = rubricCategories.length * 4;
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  // Auto-save functionality
  useEffect(() => {
    if (autoSave) {
      const interval = setInterval(() => {
        handleAutoSave();
      }, 30000); // Auto-save every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoSave, annotations, rubricCategories]);

  // Sound effects
  const playSound = (type: 'success' | 'error' | 'click') => {
    if (!soundEnabled) return;
    
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'success':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        break;
      case 'error':
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        break;
      case 'click':
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        break;
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  // Handle tool selection - FIXED: Only allow one selection at a time
  const handleToolSelection = (tool: 'zigzag' | 'check' | 'seen') => {
    // If the same tool is clicked, deselect it
    if (selectedTool === tool) {
      setSelectedTool(null);
    } else {
      // Select the new tool (automatically deselects previous)
      setSelectedTool(tool);
    }
    playSound('click');
  };

  // Handle mouse events for annotation placement
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selectedTool || !annotationLayerRef.current) return;
    
    const rect = annotationLayerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDragging(true);
    setDragStart({ x, y });
    playSound('click');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedTool) return;
    // Visual feedback for dragging could be added here
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !selectedTool || !annotationLayerRef.current) return;
    
    const rect = annotationLayerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create new annotation
    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      type: selectedTool,
      x: Math.min(dragStart.x, x),
      y: Math.min(dragStart.y, y),
      width: selectedTool === 'zigzag' ? Math.abs(x - dragStart.x) : undefined,
      height: selectedTool === 'zigzag' ? 3 : undefined,
      questionIndex: 0
    };
    
    setAnnotations(prev => [...prev, newAnnotation]);
    setIsDragging(false);
    // FIXED: Don't auto-deselect tool after use - let user place multiple annotations
    playSound('success');
  };

  // Handle annotation drag start
  const handleAnnotationDragStart = (e: React.MouseEvent, annotationId: string) => {
    e.stopPropagation();
    const annotation = annotations.find(a => a.id === annotationId);
    if (!annotation) return;

    const rect = annotationLayerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left - annotation.x;
    const offsetY = e.clientY - rect.top - annotation.y;

    setDraggedAnnotation(annotationId);
    setDragOffset({ x: offsetX, y: offsetY });
    
    // Update annotation to show it's being dragged
    setAnnotations(prev => prev.map(a => 
      a.id === annotationId ? { ...a, isDragging: true } : a
    ));
  };

  // Handle annotation drag
  const handleAnnotationDrag = useCallback((e: MouseEvent) => {
    if (!draggedAnnotation || !annotationLayerRef.current) return;

    const rect = annotationLayerRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    setAnnotations(prev => prev.map(a => 
      a.id === draggedAnnotation 
        ? { ...a, x: Math.max(0, newX), y: Math.max(0, newY) }
        : a
    ));
  }, [draggedAnnotation, dragOffset]);

  // Handle annotation drag end
  const handleAnnotationDragEnd = useCallback(() => {
    if (draggedAnnotation) {
      setAnnotations(prev => prev.map(a => 
        a.id === draggedAnnotation ? { ...a, isDragging: false } : a
      ));
      setDraggedAnnotation(null);
      setDragOffset({ x: 0, y: 0 });
      playSound('success');
    }
  }, [draggedAnnotation]);

  // Add event listeners for annotation dragging
  useEffect(() => {
    if (draggedAnnotation) {
      document.addEventListener('mousemove', handleAnnotationDrag);
      document.addEventListener('mouseup', handleAnnotationDragEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleAnnotationDrag);
        document.removeEventListener('mouseup', handleAnnotationDragEnd);
      };
    }
  }, [draggedAnnotation, handleAnnotationDrag, handleAnnotationDragEnd]);

  // Remove annotation on double click
  const removeAnnotation = (id: string) => {
    setAnnotations(prev => prev.filter(a => a.id !== id));
    playSound('click');
  };

  // Update rubric category
  const updateRubricCategory = (categoryId: string, levelIndex: number, comment?: string) => {
    setRubricCategories(prev => prev.map(category => 
      category.id === categoryId 
        ? { 
            ...category, 
            selectedLevel: levelIndex,
            comment: comment !== undefined ? comment : category.comment
          }
        : category
    ));
    playSound('click');
  };

  // Accept AI suggestion
  const acceptAISuggestion = (categoryId: string) => {
    const category = rubricCategories.find(c => c.id === categoryId);
    if (category && category.aiSuggestion !== undefined) {
      updateRubricCategory(categoryId, category.aiSuggestion);
      playSound('success');
    }
  };

  // Auto-save function
  const handleAutoSave = () => {
    const gradingData = {
      submissionId: submission.id,
      annotations,
      rubricScores: rubricCategories,
      totalScore,
      percentage,
      lastModified: new Date().toISOString()
    };
    
    // Save to localStorage as backup
    localStorage.setItem(`grading_${submission.id}`, JSON.stringify(gradingData));
    setLastSaved(new Date());
  };

  // Generate PDF content for display
  const generatePDFContent = () => {
    const lines = submission.content.split('\n').filter(line => line.trim());
    return lines.map((line, index) => (
      <div key={index} className={`mb-4 leading-relaxed text-lg ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
        {line}
      </div>
    ));
  };

  // Save grading
  const handleSaveGrading = () => {
    const gradingData = {
      submissionId: submission.id,
      annotations,
      rubricScores: rubricCategories,
      totalScore,
      percentage,
      gradedAt: new Date().toISOString(),
      gradedBy: 'Sarah Ahmed', // Current teacher
      language: language
    };
    
    console.log('Saving grading data:', gradingData);
    playSound('success');
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 ${isRTL ? 'left-4' : 'right-4'} bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300`;
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <span>${t.gradingComplete}</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
      onClose();
    }, 2000);
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
    playSound('click');
  };

  return (
    <div className={`fixed inset-0 bg-gray-900 z-50 flex ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{t.smartGrading}</h1>
              <p className="text-sm text-gray-600">
                {submission.studentName} • {submission.assignment}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ar' ? 'ع' : 'EN'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                soundEnabled ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* AI Suggestions Toggle */}
            <button
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                showAISuggestions 
                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Brain className="w-4 h-4 inline mr-1" />
              AI
            </button>

            {/* Auto-save Status */}
            {autoSave && lastSaved && (
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{t.lastSavedAt} {lastSaved.toLocaleTimeString()}</span>
              </div>
            )}

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>

            {/* Save Button */}
            <button
              onClick={handleSaveGrading}
              className="btn-primary flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {t.saveGrade}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full pt-20">
        {/* Left Sidebar - Correction Tools */}
        <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-6">
          <div className="text-center">
            <h3 className="text-xs font-medium text-gray-700 mb-4">{t.tools}</h3>
            
            {/* Zigzag Tool */}
            <div className="relative mb-4">
              <button
                onClick={() => handleToolSelection('zigzag')}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  selectedTool === 'zigzag'
                    ? 'bg-red-100 border-2 border-red-500 text-red-700 scale-110'
                    : 'bg-gray-100 hover:bg-red-50 text-red-600 border-2 border-transparent hover:scale-105'
                }`}
                title={t.zigzagTool}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10 L6 6 L10 14 L14 6 L18 10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {zigzagCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {zigzagCount}
                </span>
              )}
              <div className="text-xs text-gray-600 mt-1">{t.errors}: {zigzagCount}</div>
            </div>

            {/* Check Tool */}
            <div className="relative mb-4">
              <button
                onClick={() => handleToolSelection('check')}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  selectedTool === 'check'
                    ? 'bg-green-100 border-2 border-green-500 text-green-700 scale-110'
                    : 'bg-gray-100 hover:bg-green-50 text-green-600 border-2 border-transparent hover:scale-105'
                }`}
                title={t.checkTool}
              >
                <Check className="w-5 h-5" />
              </button>
              {checkCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {checkCount}
                </span>
              )}
              <div className="text-xs text-gray-600 mt-1">{t.correct}: {checkCount}</div>
            </div>

            {/* Seen Tool */}
            <div className="relative mb-4">
              <button
                onClick={() => handleToolSelection('seen')}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  selectedTool === 'seen'
                    ? 'bg-blue-100 border-2 border-blue-500 text-blue-700 scale-110'
                    : 'bg-gray-100 hover:bg-blue-50 text-blue-600 border-2 border-transparent hover:scale-105'
                }`}
                title={t.seenTool}
              >
                <Eye className="w-5 h-5" />
              </button>
              {seenCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {seenCount}
                </span>
              )}
              <div className="text-xs text-gray-600 mt-1">{t.seen}: {seenCount}</div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-3">
            <button
              onClick={() => {
                setAnnotations([]);
                setSelectedTool(null); // Reset tool selection
                playSound('click');
              }}
              className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-all duration-200 hover:scale-105"
              title={t.clearAll}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setZoom(Math.min(zoom + 25, 200))}
              className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-all duration-200 hover:scale-105"
              title={t.zoomIn}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setZoom(Math.max(zoom - 25, 50))}
              className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-all duration-200 hover:scale-105"
              title={t.zoomOut}
            >
              <ZoomOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Panel - PDF Viewer */}
        <div className="flex-1 bg-gray-100 relative overflow-auto">
          <div className="p-8">
            <div 
              ref={pdfViewerRef}
              className="bg-white rounded-lg shadow-lg mx-auto relative"
              style={{ 
                width: `${zoom}%`,
                maxWidth: '800px',
                minHeight: '1000px'
              }}
            >
              {/* PDF Content */}
              <div className="p-12 relative">
                {/* Student Info Header */}
                <div className="border-b border-gray-200 pb-4 mb-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{submission.assignment}</h2>
                      <p className="text-gray-600 mt-1">{t.student}: {submission.studentName} ({submission.studentId})</p>
                      <p className="text-sm text-gray-500">
                        {t.submittedAt}: {submission.submittedAt} • {submission.wordCount} {t.wordCount} • {submission.timeSpent}
                      </p>
                    </div>
                    <div className={`text-${isRTL ? 'left' : 'right'}`}>
                      <div className="text-sm text-gray-500">{t.score}</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {totalScore}/{maxScore}
                      </div>
                      <div className="text-sm text-gray-600">
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  {generatePDFContent()}
                </div>
              </div>

              {/* Enhanced Annotation Layer with Moveable Annotations */}
              <div
                ref={annotationLayerRef}
                className="absolute inset-0 pointer-events-auto overflow-visible"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ cursor: selectedTool ? 'crosshair' : 'default' }}
              >
                {annotations.map((annotation) => (
                  <div
                    key={annotation.id}
                    className={`absolute transition-all duration-200 ${
                      annotation.isDragging ? 'scale-110 z-50' : 'hover:scale-110 z-40'
                    } ${
                      annotation.type === 'zigzag' ? 'border-b-2 border-red-500 cursor-move' :
                      annotation.type === 'check' ? 'text-green-500 cursor-move' :
                      'border border-blue-500 bg-blue-100 cursor-move'
                    }`}
                    style={{
                      left: annotation.x,
                      top: annotation.y,
                      width: annotation.width || (annotation.type === 'seen' ? 40 : 20),
                      height: annotation.height || (annotation.type === 'seen' ? 20 : 20)
                    }}
                    onMouseDown={(e) => handleAnnotationDragStart(e, annotation.id)}
                    onDoubleClick={() => removeAnnotation(annotation.id)}
                    title={`${t.moveAnnotation} • ${t.doubleClickToDelete}`}
                  >
                    {annotation.type === 'check' && <Check className="w-5 h-5" />}
                    {annotation.type === 'seen' && (
                      <div className="text-xs font-medium text-blue-700 text-center leading-5">
                        {language === 'ar' ? 'تم' : 'SEEN'}
                      </div>
                    )}
                    
                    {/* Move indicator */}
                    {annotation.isDragging && (
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        <Move className="w-3 h-3 inline mr-1" />
                        {t.moveAnnotation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Rubric Panel */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">{t.rubricEvaluation}</h3>
              <div className={`text-${isRTL ? 'left' : 'right'}`}>
                <div className="text-2xl font-bold text-gray-900">{totalScore}/{maxScore}</div>
                <div className="text-sm text-gray-600">{percentage.toFixed(1)}%</div>
              </div>
            </div>

            <div className="space-y-6">
              {rubricCategories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{category.name[language]}</h4>
                    {showAISuggestions && category.aiSuggestion !== undefined && (
                      <button
                        onClick={() => acceptAISuggestion(category.id)}
                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-lg hover:bg-purple-200 transition-colors duration-200 flex items-center"
                      >
                        <Brain className="w-3 h-3 mr-1" />
                        AI: {category.levels[category.aiSuggestion].name[language]}
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {category.levels.map((level, index) => (
                      <button
                        key={index}
                        onClick={() => updateRubricCategory(category.id, index)}
                        className={`w-full text-${isRTL ? 'right' : 'left'} p-3 rounded-lg border transition-all duration-200 ${
                          category.selectedLevel === index
                            ? 'border-blue-500 bg-blue-50 text-blue-900 scale-105'
                            : showAISuggestions && category.aiSuggestion === index
                            ? 'border-purple-300 bg-purple-50 text-purple-900'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-102'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{level.name[language]}</span>
                          <span className="text-sm font-bold">{level.points} pts</span>
                        </div>
                        <p className="text-xs text-gray-600">{level.description[language]}</p>
                      </button>
                    ))}
                  </div>

                  <textarea
                    placeholder={t.addComment}
                    value={category.comment}
                    onChange={(e) => updateRubricCategory(category.id, category.selectedLevel, e.target.value)}
                    className="w-full mt-3 p-2 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
              ))}
            </div>

            {/* Overall Comments */}
            <div className="mt-6 border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">{t.overallComments}</h4>
              <textarea
                placeholder={t.overallFeedback}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handleSaveGrading}
                className="w-full btn-primary flex items-center justify-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {t.saveAndSend}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-tertiary flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  {t.exportPDF}
                </button>
                
                <button className="btn-tertiary flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t.sendMessage}
                </button>
              </div>
            </div>

            {/* Grading Statistics */}
            <div className="mt-6 bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">{t.gradingSummary}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.errorsMarked}:</span>
                  <span className="font-medium text-red-600">{zigzagCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.correctParts}:</span>
                  <span className="font-medium text-green-600">{checkCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.sectionsReviewed}:</span>
                  <span className="font-medium text-blue-600">{seenCount}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="text-gray-900 font-medium">{t.finalScore}:</span>
                  <span className="font-bold text-gray-900">{totalScore}/{maxScore}</span>
                </div>
              </div>
            </div>

            {/* Grade Status Indicators */}
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors duration-200">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                {t.markAsComplete}
              </button>
              <button className="flex-1 bg-yellow-100 text-yellow-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors duration-200">
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                {t.needsRevision}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartGradingSystem;