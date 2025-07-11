import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Language types
export type Language = 'ar' | 'en';

// Translation interface
interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

// Language context interface
interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: Translations;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations: Translations = {
  // Common UI Elements
  'common.save': { ar: 'حفظ', en: 'Save' },
  'common.cancel': { ar: 'إلغاء', en: 'Cancel' },
  'common.submit': { ar: 'إرسال', en: 'Submit' },
  'common.next': { ar: 'التالي', en: 'Next' },
  'common.previous': { ar: 'السابق', en: 'Previous' },
  'common.back': { ar: 'رجوع', en: 'Back' },
  'common.close': { ar: 'إغلاق', en: 'Close' },
  'common.edit': { ar: 'تعديل', en: 'Edit' },
  'common.delete': { ar: 'حذف', en: 'Delete' },
  'common.view': { ar: 'عرض', en: 'View' },
  'common.search': { ar: 'بحث', en: 'Search' },
  'common.filter': { ar: 'تصفية', en: 'Filter' },
  'common.loading': { ar: 'جاري التحميل...', en: 'Loading...' },
  'common.error': { ar: 'خطأ', en: 'Error' },
  'common.success': { ar: 'نجح', en: 'Success' },
  'common.warning': { ar: 'تحذير', en: 'Warning' },
  'common.info': { ar: 'معلومات', en: 'Info' },
  'common.yes': { ar: 'نعم', en: 'Yes' },
  'common.no': { ar: 'لا', en: 'No' },
  'common.ok': { ar: 'موافق', en: 'OK' },
  'common.home': { ar: 'الرئيسية', en: 'Home' },
  'common.backToHome': { ar: 'العودة للصفحة الرئيسية', en: 'Back to Home' },

  // Landing Page
  'landing.welcome': { ar: 'مرحباً بك في', en: 'Welcome to' },
  'landing.platformName': { ar: 'بيك بن', en: 'PickPen' },
  'landing.subtitle': { ar: 'منصة الكتابة الشاملة التي تمكن الطلاب والمعلمين والإداريين بأدوات مدعومة بالذكاء الاصطناعي لتعزيز التعلم', en: 'The comprehensive writing platform that empowers students, teachers, and administrators with AI-powered tools for enhanced learning' },
  'landing.inspirationalQuote': { ar: '"اللغة هي وعاء الفكر"', en: '"Language is the vessel of thought"' },
  'landing.quoteAuthor': { ar: '— حكمة قديمة', en: '— Ancient Wisdom' },
  'landing.studentPortal': { ar: 'بوابة الطالب', en: 'Student Portal' },
  'landing.teacherPortal': { ar: 'بوابة المعلم', en: 'Teacher Portal' },
  'landing.adminPortal': { ar: 'بوابة المدير', en: 'Admin Portal' },
  'landing.studentDesc': { ar: 'الوصول إلى مهام الكتابة والحصول على تعليقات مدعومة بالذكاء الاصطناعي وتتبع التقدم بأدوات تفاعلية', en: 'Access your writing assignments, get AI-powered feedback, and track your progress with interactive tools' },
  'landing.teacherDesc': { ar: 'إدارة الفصول وإنشاء المهام وتقييم المشاريع وتتبع أداء الطلاب بتحليلات شاملة', en: 'Manage your classes, create assignments, grade submissions, and track student performance with comprehensive analytics' },
  'landing.adminDesc': { ar: 'إدارة شاملة للمنصة مع إشراف المستخدمين والتحكم في المحتوى والتحليلات وإدارة النظام', en: 'Complete platform management with user oversight, content control, analytics, and system administration' },
  'landing.enterPortal': { ar: 'دخول', en: 'Enter' },
  'landing.whyChoose': { ar: 'لماذا تختار بيك بن؟', en: 'Why Choose PickPen?' },
  'landing.aiPowered': { ar: 'كتابة مدعومة بالذكاء الاصطناعي', en: 'AI-Powered Writing' },
  'landing.aiDesc': { ar: 'احصل على اقتراحات ذكية لتحسين القواعد والأسلوب والمحتوى', en: 'Get intelligent suggestions for grammar, style, and content improvement' },
  'landing.collaborative': { ar: 'تعلم تعاوني', en: 'Collaborative Learning' },
  'landing.collaborativeDesc': { ar: 'ربط المعلمين والطلاب في بيئة تعليمية سلسة', en: 'Connect teachers and students in a seamless educational environment' },
  'landing.management': { ar: 'إدارة شاملة', en: 'Complete Management' },
  'landing.managementDesc': { ar: 'أدوات شاملة للإدارة والتحليلات وإشراف المنصة', en: 'Comprehensive tools for administration, analytics, and platform oversight' },
  'landing.footer': { ar: '© 2025 منصة بيك بن التعليمية. تمكين الجيل القادم من الكتاب.', en: '© 2025 PickPen Educational Platform. Empowering the next generation of writers.' },

  // Student Writing Platform
  'student.title': { ar: 'منصة الكتابة الذكية', en: 'Smart Writing Platform' },
  'student.subtitle': { ar: 'اكتب، تعلم، وتطور مع الذكاء الاصطناعي', en: 'Write, Learn, and Improve with AI' },
  'student.practiceMode': { ar: 'وضع التدريب', en: 'Practice Mode' },
  'student.liveMode': { ar: 'الوضع المباشر', en: 'Live Mode' },
  'student.wordCount': { ar: 'عدد الكلمات', en: 'Word Count' },
  'student.timeSpent': { ar: 'الوقت المستغرق', en: 'Time Spent' },
  'student.writingSpeed': { ar: 'سرعة الكتابة', en: 'Writing Speed' },
  'student.accuracy': { ar: 'الدقة', en: 'Accuracy' },
  'student.suggestions': { ar: 'الاقتراحات', en: 'Suggestions' },
  'student.analytics': { ar: 'التحليلات', en: 'Analytics' },
  'student.challenges': { ar: 'التحديات', en: 'Challenges' },
  'student.badges': { ar: 'الشارات', en: 'Badges' },
  'student.placeholder': { ar: 'ابدأ الكتابة هنا... سيقوم الذكاء الاصطناعي بمساعدتك أثناء الكتابة.', en: 'Start writing here... AI will assist you as you type.' },
  'student.aiSuggestion': { ar: 'اقتراح ذكي', en: 'AI Suggestion' },
  'student.acceptSuggestion': { ar: 'قبول الاقتراح', en: 'Accept' },
  'student.rejectSuggestion': { ar: 'رفض الاقتراح', en: 'Reject' },
  'student.motivationalQuote': { ar: 'الكتابة هي الرسم بالكلمات', en: 'Writing is painting with words' },
  'student.wpm': { ar: 'كلمة/دقيقة', en: 'WPM' },
  'student.excellentWork': { ar: 'عمل ممتاز!', en: 'Excellent work!' },
  'student.keepWriting': { ar: 'استمر في الكتابة', en: 'Keep writing' },
  'student.almostThere': { ar: 'أوشكت على الانتهاء', en: 'Almost there' },
  'student.wellDone': { ar: 'أحسنت!', en: 'Well done!' },
  'student.trainingActivity': { ar: 'نشاط تدريبي', en: 'Training Activity' },
  'student.startTraining': { ar: 'ابدأ التدريب', en: 'Start Training' },
  'student.lightTheme': { ar: 'الثيم الفاتح', en: 'Light Theme' },
  'student.darkTheme': { ar: 'الثيم الداكن', en: 'Dark Theme' },
  'student.tealTheme': { ar: 'الثيم الفيروزي', en: 'Teal Theme' },

  // Training Activity
  'training.title': { ar: 'نشاط التدريب التفاعلي', en: 'Interactive Training Activity' },
  'training.subtitle': { ar: 'اسحب الكلمات المناسبة إلى مكانها الصحيح', en: 'Drag the appropriate words to their correct positions' },
  'training.instructions': { ar: 'اقرأ النص واختر الكلمة المناسبة لكل فراغ', en: 'Read the text and choose the appropriate word for each blank' },
  'training.timeSpent': { ar: 'الوقت المستغرق', en: 'Time Spent' },
  'training.score': { ar: 'النتيجة', en: 'Score' },
  'training.complete': { ar: 'إنهاء النشاط', en: 'Complete Activity' },
  'training.tryAgain': { ar: 'حاول مرة أخرى', en: 'Try Again' },
  'training.nextActivity': { ar: 'النشاط التالي', en: 'Next Activity' },
  'training.excellent': { ar: 'أداء مميز! أنت تتقدم بثبات.', en: 'Excellent work! You are progressing steadily.' },
  'training.good': { ar: 'أداء جيد! حاول مرة أخرى للوصول للأفضل.', en: 'Good work! Try again to reach excellence.' },
  'training.needsWork': { ar: 'لا بأس، التدريب طريق النجاح. أعد المحاولة.', en: 'No worries, practice makes perfect. Try again.' },
  'training.congratulations': { ar: 'تهانينا!', en: 'Congratulations!' },
  'training.perfectScore': { ar: 'نتيجة مثالية!', en: 'Perfect Score!' },
  'training.wellDone': { ar: 'أحسنت!', en: 'Well Done!' },
  'training.keepGoing': { ar: 'استمر!', en: 'Keep Going!' },
  'training.dragHere': { ar: 'اسحب الكلمة هنا', en: 'Drag word here' },
  'training.correctAnswers': { ar: 'الإجابات الصحيحة', en: 'Correct Answers' },
  'training.totalQuestions': { ar: 'إجمالي الأسئلة', en: 'Total Questions' },
  'training.accuracy': { ar: 'الدقة', en: 'Accuracy' },
  'training.streak': { ar: 'سلسلة النجاح', en: 'Streak' },
  'training.activitiesCompleted': { ar: 'الأنشطة المكتملة', en: 'Activities Completed' },
  'training.dailyGoal': { ar: 'الهدف اليومي', en: 'Daily Goal' },

  // Teacher Dashboard
  'teacher.title': { ar: 'بوابة المعلم', en: 'Teacher Portal' },
  'teacher.welcome': { ar: 'أهلاً بك، سارة!', en: 'Welcome back, Sarah!' },
  'teacher.overview': { ar: 'نظرة عامة', en: 'Overview' },
  'teacher.assignments': { ar: 'المهام', en: 'Assignments' },
  'teacher.students': { ar: 'الطلاب', en: 'Students' },
  'teacher.analytics': { ar: 'التحليلات', en: 'Analytics' },
  'teacher.messages': { ar: 'الرسائل', en: 'Messages' },
  'teacher.calendar': { ar: 'التقويم', en: 'Calendar' },
  'teacher.resources': { ar: 'الموارد', en: 'Resources' },
  'teacher.settings': { ar: 'الإعدادات', en: 'Settings' },
  'teacher.signOut': { ar: 'تسجيل الخروج', en: 'Sign Out' },
  'teacher.totalStudents': { ar: 'إجمالي الطلاب', en: 'Total Students' },
  'teacher.pendingGrades': { ar: 'الدرجات المعلقة', en: 'Pending Grades' },
  'teacher.classAverage': { ar: 'متوسط الفصل', en: 'Class Average' },
  'teacher.recentSubmissions': { ar: 'التسليمات الحديثة', en: 'Recent Submissions' },
  'teacher.viewAll': { ar: 'عرض الكل', en: 'View All' },
  'teacher.smartGrade': { ar: 'تقييم ذكي', en: 'Smart Grade' },
  'teacher.createTask': { ar: 'إنشاء مهمة', en: 'Create Task' },
  'teacher.rubricBuilder': { ar: 'منشئ المعايير', en: 'Rubric Builder' },
  'teacher.viewAnalytics': { ar: 'عرض التحليلات', en: 'View Analytics' },
  'teacher.sendMessage': { ar: 'إرسال رسالة', en: 'Send Message' },
  'teacher.comingSoon': { ar: 'قريباً', en: 'Coming Soon' },

  // Admin Dashboard
  'admin.title': { ar: 'بوابة المدير', en: 'Admin Portal' },
  'admin.platformManager': { ar: 'مدير المنصة', en: 'Platform Manager' },
  'admin.overview': { ar: 'نظرة عامة', en: 'Overview' },
  'admin.userManagement': { ar: 'إدارة المستخدمين', en: 'User Management' },
  'admin.contentManagement': { ar: 'إدارة المحتوى', en: 'Content Management' },
  'admin.analytics': { ar: 'التحليلات', en: 'Analytics' },
  'admin.communications': { ar: 'التواصل', en: 'Communications' },
  'admin.security': { ar: 'الأمان', en: 'Security' },
  'admin.database': { ar: 'قاعدة البيانات', en: 'Database' },
  'admin.totalUsers': { ar: 'إجمالي المستخدمين', en: 'Total Users' },
  'admin.activeTeachers': { ar: 'المعلمون النشطون', en: 'Active Teachers' },
  'admin.completionRate': { ar: 'معدل الإنجاز', en: 'Completion Rate' },
  'admin.systemUptime': { ar: 'وقت تشغيل النظام', en: 'System Uptime' },
  'admin.recentActivity': { ar: 'النشاط الحديث', en: 'Recent Activity' },
  'admin.systemHealth': { ar: 'صحة النظام', en: 'System Health' },

  // Smart Grading System
  'grading.title': { ar: 'نظام التقييم الذكي', en: 'Smart Grading System' },
  'grading.student': { ar: 'الطالب', en: 'Student' },
  'grading.assignment': { ar: 'المهمة', en: 'Assignment' },
  'grading.tools': { ar: 'الأدوات', en: 'Tools' },
  'grading.zigzagTool': { ar: 'خط متعرج', en: 'Zigzag Line' },
  'grading.checkTool': { ar: 'علامة صح', en: 'Check Mark' },
  'grading.seenTool': { ar: 'تمت المراجعة', en: 'Seen Box' },
  'grading.errors': { ar: 'أخطاء', en: 'Errors' },
  'grading.correct': { ar: 'صحيح', en: 'Correct' },
  'grading.seen': { ar: 'مراجع', en: 'Seen' },
  'grading.rubricEvaluation': { ar: 'تقييم المعايير', en: 'Rubric Evaluation' },
  'grading.totalScore': { ar: 'النتيجة الإجمالية', en: 'Total Score' },
  'grading.saveGrade': { ar: 'حفظ التقييم', en: 'Save Grade' },
  'grading.aiSuggestion': { ar: 'اقتراح ذكي', en: 'AI Suggestion' },
  'grading.addComment': { ar: 'إضافة تعليق لهذا المعيار...', en: 'Add comments for this category...' },
  'grading.overallComments': { ar: 'التعليقات العامة', en: 'Overall Comments' },
  'grading.overallFeedback': { ar: 'اكتب تعليقاً عاماً للطالب...', en: 'Write overall feedback for the student...' },
  'grading.saveAndSend': { ar: 'حفظ وإرسال للطالب', en: 'Save & Send to Student' },
  'grading.exportPDF': { ar: 'تصدير تقرير PDF', en: 'Export PDF Report' },
  'grading.sendMessage': { ar: 'إرسال رسالة للطالب', en: 'Send Message to Student' },
  'grading.gradingSummary': { ar: 'ملخص التقييم', en: 'Grading Summary' },
  'grading.errorsMarked': { ar: 'الأخطاء المحددة', en: 'Errors Marked' },
  'grading.correctParts': { ar: 'الأجزاء الصحيحة', en: 'Correct Parts' },
  'grading.sectionsReviewed': { ar: 'الأقسام المراجعة', en: 'Sections Reviewed' },
  'grading.finalScore': { ar: 'النتيجة النهائية', en: 'Final Score' },
  'grading.submittedAt': { ar: 'تاريخ التسليم', en: 'Submitted At' },
  'grading.wordCount': { ar: 'عدد الكلمات', en: 'Word Count' },
  'grading.timeSpent': { ar: 'الوقت المستغرق', en: 'Time Spent' },
  'grading.score': { ar: 'النتيجة', en: 'Score' },
  'grading.clearAll': { ar: 'مسح الكل', en: 'Clear All' },
  'grading.zoomIn': { ar: 'تكبير', en: 'Zoom In' },
  'grading.zoomOut': { ar: 'تصغير', en: 'Zoom Out' },
  'grading.fullscreen': { ar: 'ملء الشاشة', en: 'Fullscreen' },
  'grading.exitFullscreen': { ar: 'خروج من ملء الشاشة', en: 'Exit Fullscreen' },
  'grading.autoSaveEnabled': { ar: 'الحفظ التلقائي مفعل', en: 'Auto-save Enabled' },
  'grading.lastSavedAt': { ar: 'آخر حفظ في', en: 'Last saved at' },
  'grading.gradingComplete': { ar: 'تم التقييم بنجاح!', en: 'Grading completed successfully!' },
  'grading.markAsComplete': { ar: 'تحديد كمكتمل', en: 'Mark as Complete' },
  'grading.needsRevision': { ar: 'يحتاج مراجعة', en: 'Needs Revision' },

  // Task Creation System
  'task.createTask': { ar: 'إنشاء مهمة جديدة', en: 'Create New Task' },
  'task.taskTitle': { ar: 'عنوان المهمة', en: 'Task Title' },
  'task.taskDescription': { ar: 'وصف المهمة', en: 'Task Description' },
  'task.wordLimit': { ar: 'حد الكلمات', en: 'Word Limit' },
  'task.timeLimit': { ar: 'الحد الزمني (دقيقة)', en: 'Time Limit (minutes)' },
  'task.dueDate': { ar: 'تاريخ التسليم', en: 'Due Date' },
  'task.assignedClasses': { ar: 'الفصول المخصصة', en: 'Assigned Classes' },
  'task.rubricSelection': { ar: 'اختيار معايير التقييم', en: 'Rubric Selection' },
  'task.instructions': { ar: 'تعليمات إضافية', en: 'Additional Instructions' },
  'task.attachments': { ar: 'المرفقات', en: 'Attachments' },
  'task.addAttachment': { ar: 'إضافة مرفق', en: 'Add Attachment' },
  'task.uploadFile': { ar: 'رفع ملف', en: 'Upload File' },
  'task.addLink': { ar: 'إضافة رابط', en: 'Add Link' },
  'task.settings': { ar: 'الإعدادات', en: 'Settings' },
  'task.allowLateSubmission': { ar: 'السماح بالتسليم المتأخر', en: 'Allow Late Submission' },
  'task.enableAIAssistance': { ar: 'تفعيل المساعدة الذكية', en: 'Enable AI Assistance' },
  'task.difficulty': { ar: 'مستوى الصعوبة', en: 'Difficulty Level' },
  'task.easy': { ar: 'سهل', en: 'Easy' },
  'task.medium': { ar: 'متوسط', en: 'Medium' },
  'task.hard': { ar: 'صعب', en: 'Hard' },
  'task.integrations': { ar: 'التكاملات', en: 'Integrations' },
  'task.googleClassroom': { ar: 'Google Classroom', en: 'Google Classroom' },
  'task.microsoftTeams': { ar: 'Microsoft Teams', en: 'Microsoft Teams' },
  'task.shareWithParents': { ar: 'مشاركة مع أولياء الأمور', en: 'Share with Parents' },
  'task.preview': { ar: 'معاينة', en: 'Preview' },
  'task.createRubric': { ar: 'إنشاء معايير جديدة', en: 'Create New Rubric' },
  'task.selectRubric': { ar: 'اختر معايير التقييم...', en: 'Select a rubric...' },
  'task.enterTitle': { ar: 'أدخل عنوان المهمة...', en: 'Enter task title...' },
  'task.enterDescription': { ar: 'أدخل وصف المهمة والمطلوب من الطلاب...', en: 'Enter task description and requirements...' },
  'task.enterInstructions': { ar: 'أدخل تعليمات إضافية للطلاب...', en: 'Enter additional instructions for students...' },
  'task.selectClasses': { ar: 'اختر الفصول...', en: 'Select classes...' },
  'task.words': { ar: 'كلمة', en: 'words' },
  'task.minutes': { ar: 'دقيقة', en: 'minutes' },
  'task.attachmentAdded': { ar: 'تم إضافة المرفق بنجاح', en: 'Attachment added successfully' },
  'task.taskSaved': { ar: 'تم حفظ المهمة بنجاح', en: 'Task saved successfully' },

  // Rubric Builder
  'rubric.rubricBuilder': { ar: 'منشئ معايير التقييم', en: 'Rubric Builder' },
  'rubric.createRubric': { ar: 'إنشاء معايير جديدة', en: 'Create New Rubric' },
  'rubric.editRubric': { ar: 'تعديل المعايير', en: 'Edit Rubric' },
  'rubric.rubricName': { ar: 'اسم المعايير', en: 'Rubric Name' },
  'rubric.rubricDescription': { ar: 'وصف المعايير', en: 'Rubric Description' },
  'rubric.subject': { ar: 'المادة', en: 'Subject' },
  'rubric.gradeLevel': { ar: 'المستوى الدراسي', en: 'Grade Level' },
  'rubric.isPublic': { ar: 'متاح للمعلمين الآخرين', en: 'Available to Other Teachers' },
  'rubric.criteria': { ar: 'المعايير', en: 'Criteria' },
  'rubric.addCriteria': { ar: 'إضافة معيار', en: 'Add Criteria' },
  'rubric.criteriaName': { ar: 'اسم المعيار', en: 'Criteria Name' },
  'rubric.weight': { ar: 'الوزن النسبي', en: 'Weight (%)' },
  'rubric.levels': { ar: 'المستويات', en: 'Performance Levels' },
  'rubric.addLevel': { ar: 'إضافة مستوى', en: 'Add Level' },
  'rubric.levelName': { ar: 'اسم المستوى', en: 'Level Name' },
  'rubric.points': { ar: 'النقاط', en: 'Points' },
  'rubric.description': { ar: 'الوصف', en: 'Description' },
  'rubric.templates': { ar: 'القوالب الجاهزة', en: 'Templates' },
  'rubric.useTemplate': { ar: 'استخدام القالب', en: 'Use Template' },
  'rubric.preview': { ar: 'معاينة', en: 'Preview' },
  'rubric.save': { ar: 'حفظ المعايير', en: 'Save Rubric' },
  'rubric.cancel': { ar: 'إلغاء', en: 'Cancel' },
  'rubric.totalPoints': { ar: 'إجمالي النقاط', en: 'Total Points' },
  'rubric.enterRubricName': { ar: 'أدخل اسم المعايير...', en: 'Enter rubric name...' },
  'rubric.enterDescription': { ar: 'أدخل وصف المعايير...', en: 'Enter rubric description...' },
  'rubric.enterCriteriaName': { ar: 'أدخل اسم المعيار...', en: 'Enter criteria name...' },
  'rubric.enterLevelName': { ar: 'أدخل اسم المستوى...', en: 'Enter level name...' },
  'rubric.enterLevelDescription': { ar: 'أدخل وصف المستوى...', en: 'Enter level description...' },
  'rubric.rubricSaved': { ar: 'تم حفظ المعايير بنجاح', en: 'Rubric saved successfully' },
  'rubric.deleteConfirm': { ar: 'هل أنت متأكد من حذف هذا العنصر؟', en: 'Are you sure you want to delete this item?' },
  'rubric.moveUp': { ar: 'نقل لأعلى', en: 'Move Up' },
  'rubric.moveDown': { ar: 'نقل لأسفل', en: 'Move Down' },
  'rubric.duplicate': { ar: 'نسخ', en: 'Duplicate' },
  'rubric.delete': { ar: 'حذف', en: 'Delete' },
  'rubric.excellent': { ar: 'ممتاز', en: 'Excellent' },
  'rubric.good': { ar: 'جيد', en: 'Good' },
  'rubric.fair': { ar: 'مقبول', en: 'Fair' },
  'rubric.poor': { ar: 'ضعيف', en: 'Poor' },
  'rubric.ideas': { ar: 'الأفكار والمحتوى', en: 'Ideas & Content' },
  'rubric.organization': { ar: 'التنظيم', en: 'Organization' },
  'rubric.language': { ar: 'اللغة والقواعد', en: 'Language & Grammar' },
  'rubric.creativity': { ar: 'الإبداع والأسلوب', en: 'Creativity & Voice' },

  // Account Switcher
  'account.switchAccount': { ar: 'تبديل الحساب', en: 'Switch Account' },
  'account.selectAccount': { ar: 'اختر حساباً للتبديل إليه', en: 'Select an account to switch to' },
  'account.currentlyActive': { ar: 'الحساب النشط حالياً', en: 'Currently active' },
  'account.addNewAccount': { ar: 'إضافة حساب جديد', en: 'Add New Account' },
  'account.manage': { ar: 'إدارة', en: 'Manage' },
  'account.logout': { ar: 'خروج', en: 'Logout' },
  'account.changeLanguage': { ar: 'تغيير اللغة', en: 'Change Language' },
  'account.switchToArabic': { ar: 'التبديل إلى الإنجليزية', en: 'Switch to Arabic' },
  'account.switchToEnglish': { ar: 'التبديل إلى العربية', en: 'Switch to English' },

  // Login Forms
  'login.signIn': { ar: 'تسجيل الدخول', en: 'Sign In' },
  'login.email': { ar: 'البريد الإلكتروني', en: 'Email Address' },
  'login.password': { ar: 'كلمة المرور', en: 'Password' },
  'login.rememberMe': { ar: 'تذكرني', en: 'Remember me' },
  'login.forgotPassword': { ar: 'نسيت كلمة المرور؟', en: 'Forgot password?' },
  'login.signingIn': { ar: 'جاري تسجيل الدخول...', en: 'Signing in...' },
  'login.demoCredentials': { ar: 'بيانات تجريبية', en: 'Demo Credentials' },
  'login.needHelp': { ar: 'تحتاج مساعدة؟ اتصل بـ', en: 'Need help? Contact' },
  'login.technicalSupport': { ar: 'الدعم الفني', en: 'technical support' },

  // Notifications and Messages
  'notification.switchingAccount': { ar: 'جاري التبديل إلى الحساب...', en: 'Switching account...' },
  'notification.switchedSuccessfully': { ar: 'تم التبديل بنجاح إلى حساب', en: 'Switched successfully to' },
  'notification.languageChanged': { ar: 'تم تغيير اللغة بنجاح', en: 'Language changed successfully' },
  'notification.settingsSaved': { ar: 'تم حفظ الإعدادات', en: 'Settings saved' },
  'notification.errorOccurred': { ar: 'حدث خطأ، يرجى المحاولة مرة أخرى', en: 'An error occurred, please try again' },

  // Time and Date
  'time.minutes': { ar: 'دقيقة', en: 'minutes' },
  'time.hours': { ar: 'ساعة', en: 'hours' },
  'time.days': { ar: 'أيام', en: 'days' },
  'time.weeks': { ar: 'أسابيع', en: 'weeks' },
  'time.months': { ar: 'أشهر', en: 'months' },
  'time.ago': { ar: 'منذ', en: 'ago' },
  'time.now': { ar: 'الآن', en: 'now' },
  'time.today': { ar: 'اليوم', en: 'today' },
  'time.yesterday': { ar: 'أمس', en: 'yesterday' },
  'time.tomorrow': { ar: 'غداً', en: 'tomorrow' },

  // Status and States
  'status.active': { ar: 'نشط', en: 'Active' },
  'status.inactive': { ar: 'غير نشط', en: 'Inactive' },
  'status.pending': { ar: 'معلق', en: 'Pending' },
  'status.completed': { ar: 'مكتمل', en: 'Completed' },
  'status.draft': { ar: 'مسودة', en: 'Draft' },
  'status.published': { ar: 'منشور', en: 'Published' },
  'status.archived': { ar: 'مؤرشف', en: 'Archived' },
  'status.approved': { ar: 'موافق عليه', en: 'Approved' },
  'status.rejected': { ar: 'مرفوض', en: 'Rejected' },
  'status.graded': { ar: 'مقيم', en: 'Graded' },
  'status.submitted': { ar: 'مسلم', en: 'Submitted' },
  'status.overdue': { ar: 'متأخر', en: 'Overdue' },

  // Roles
  'role.student': { ar: 'طالب', en: 'Student' },
  'role.teacher': { ar: 'معلم', en: 'Teacher' },
  'role.admin': { ar: 'مدير', en: 'Administrator' },
  'role.parent': { ar: 'ولي أمر', en: 'Parent' },

  // Performance Levels
  'level.excellent': { ar: 'ممتاز', en: 'Excellent' },
  'level.good': { ar: 'جيد', en: 'Good' },
  'level.satisfactory': { ar: 'مرضي', en: 'Satisfactory' },
  'level.needsImprovement': { ar: 'يحتاج تحسين', en: 'Needs Improvement' },
  'level.unsatisfactory': { ar: 'غير مرضي', en: 'Unsatisfactory' }
};

// Language provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get saved language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('pickpen-language') as Language;
    return savedLanguage || 'en';
  });

  const isRTL = language === 'ar';

  // Translation function
  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  // Toggle language function
  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguageState(newLanguage);
    localStorage.setItem('pickpen-language', newLanguage);
    
    // Update document direction
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
    
    // Show notification
    showLanguageChangeNotification(newLanguage);
  };

  // Set language function
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('pickpen-language', lang);
    
    // Update document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Show notification
    showLanguageChangeNotification(lang);
  };

  // Show language change notification
  const showLanguageChangeNotification = (newLang: Language) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 ${newLang === 'ar' ? 'left-4' : 'right-4'} bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300`;
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <span>${newLang === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English'}</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  // Initialize document direction on mount
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const value: LanguageContextType = {
    language,
    isRTL,
    toggleLanguage,
    setLanguage,
    t,
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;