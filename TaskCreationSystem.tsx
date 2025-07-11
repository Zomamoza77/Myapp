import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Save, Plus, Upload, Link, Calendar, Users, 
  BookOpen, FileText, Settings, Eye, Share2,
  Clock, Target, Brain, Globe, Paperclip,
  CheckCircle, AlertTriangle, Info, Trash2
} from 'lucide-react';

interface TaskCreationSystemProps {
  onClose: () => void;
  onSave: (task: any) => void;
  language?: 'ar' | 'en';
  userRole?: 'teacher' | 'admin' | 'student';
}

interface Attachment {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'link';
  url: string;
  size?: string;
}

interface RubricCriteria {
  id: string;
  name: string;
  weight: number;
  levels: { name: string; points: number; description: string }[];
}

const TaskCreationSystem: React.FC<TaskCreationSystemProps> = ({ 
  onClose, 
  onSave, 
  language = 'en',
  userRole = 'teacher'
}) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    wordLimit: 500,
    timeLimit: 60,
    dueDate: '',
    assignedClasses: [] as string[],
    rubricId: '',
    instructions: '',
    allowLateSubmission: true,
    enableAIAssistance: true,
    language: language,
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    isActive: false
  });

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedRubric, setSelectedRubric] = useState<string>('');
  const [showRubricBuilder, setShowRubricBuilder] = useState(false);
  const [integrationSettings, setIntegrationSettings] = useState({
    googleClassroom: false,
    microsoftTeams: false,
    shareWithParents: false
  });

  const isRTL = language === 'ar';

  // Check if user can activate tasks (only teachers)
  const canActivateTask = userRole === 'teacher';

  // Multilingual content
  const content = {
    ar: {
      createTask: 'إنشاء مهمة جديدة',
      taskTitle: 'عنوان المهمة',
      taskDescription: 'وصف المهمة',
      wordLimit: 'حد الكلمات',
      timeLimit: 'الحد الزمني (دقيقة)',
      dueDate: 'تاريخ التسليم',
      assignedClasses: 'الفصول المخصصة',
      rubricSelection: 'اختيار معايير التقييم',
      instructions: 'تعليمات إضافية',
      attachments: 'المرفقات',
      addAttachment: 'إضافة مرفق',
      uploadFile: 'رفع ملف',
      addLink: 'إضافة رابط',
      settings: 'الإعدادات',
      allowLateSubmission: 'السماح بالتسليم المتأخر',
      enableAIAssistance: 'تفعيل المساعدة الذكية',
      difficulty: 'مستوى الصعوبة',
      easy: 'سهل',
      medium: 'متوسط',
      hard: 'صعب',
      integrations: 'التكاملات',
      googleClassroom: 'Google Classroom',
      microsoftTeams: 'Microsoft Teams',
      shareWithParents: 'مشاركة مع أولياء الأمور',
      preview: 'معاينة',
      save: 'حفظ المهمة',
      cancel: 'إلغاء',
      createRubric: 'إنشاء معايير جديدة',
      selectRubric: 'اختر معايير التقييم...',
      enterTitle: 'أدخل عنوان المهمة...',
      enterDescription: 'أدخل وصف المهمة والمطلوب من الطلاب...',
      enterInstructions: 'أدخل تعليمات إضافية للطلاب...',
      selectClasses: 'اختر الفصول...',
      words: 'كلمة',
      minutes: 'دقيقة',
      attachmentAdded: 'تم إضافة المرفق بنجاح',
      taskSaved: 'تم حفظ المهمة بنجاح',
      activateTask: 'تفعيل المهمة',
      taskStatus: 'حالة المهمة',
      active: 'نشطة',
      inactive: 'غير نشطة',
      onlyTeachersCanActivate: 'يمكن للمعلمين فقط تفعيل المهام'
    },
    en: {
      createTask: 'Create New Task',
      taskTitle: 'Task Title',
      taskDescription: 'Task Description',
      wordLimit: 'Word Limit',
      timeLimit: 'Time Limit (minutes)',
      dueDate: 'Due Date',
      assignedClasses: 'Assigned Classes',
      rubricSelection: 'Rubric Selection',
      instructions: 'Additional Instructions',
      attachments: 'Attachments',
      addAttachment: 'Add Attachment',
      uploadFile: 'Upload File',
      addLink: 'Add Link',
      settings: 'Settings',
      allowLateSubmission: 'Allow Late Submission',
      enableAIAssistance: 'Enable AI Assistance',
      difficulty: 'Difficulty Level',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      integrations: 'Integrations',
      googleClassroom: 'Google Classroom',
      microsoftTeams: 'Microsoft Teams',
      shareWithParents: 'Share with Parents',
      preview: 'Preview',
      save: 'Save Task',
      cancel: 'Cancel',
      createRubric: 'Create New Rubric',
      selectRubric: 'Select a rubric...',
      enterTitle: 'Enter task title...',
      enterDescription: 'Enter task description and requirements...',
      enterInstructions: 'Enter additional instructions for students...',
      selectClasses: 'Select classes...',
      words: 'words',
      minutes: 'minutes',
      attachmentAdded: 'Attachment added successfully',
      taskSaved: 'Task saved successfully',
      activateTask: 'Activate Task',
      taskStatus: 'Task Status',
      active: 'Active',
      inactive: 'Inactive',
      onlyTeachersCanActivate: 'Only teachers can activate tasks'
    }
  };

  const t = content[language];

  // Mock data for classes and rubrics
  const availableClasses = [
    { id: '10a', name: 'Class 10A', students: 28 },
    { id: '10b', name: 'Class 10B', students: 25 },
    { id: '9a', name: 'Class 9A', students: 30 },
    { id: '9b', name: 'Class 9B', students: 27 }
  ];

  const availableRubrics = [
    { id: 'creative-writing', name: 'Creative Writing Rubric', criteria: 4 },
    { id: 'essay-analysis', name: 'Essay Analysis Rubric', criteria: 5 },
    { id: 'poetry-analysis', name: 'Poetry Analysis Rubric', criteria: 3 },
    { id: 'general-writing', name: 'General Writing Rubric', criteria: 4 }
  ];

  const handleAddAttachment = (type: 'file' | 'link') => {
    if (type === 'file') {
      // Simulate file upload
      const newAttachment: Attachment = {
        id: Date.now().toString(),
        name: 'Sample Document.pdf',
        type: 'pdf',
        url: '#',
        size: '2.3 MB'
      };
      setAttachments(prev => [...prev, newAttachment]);
    } else {
      // Add link dialog would open here
      const link = prompt('Enter link URL:');
      if (link) {
        const newAttachment: Attachment = {
          id: Date.now().toString(),
          name: 'External Resource',
          type: 'link',
          url: link
        };
        setAttachments(prev => [...prev, newAttachment]);
      }
    }
    
    // Show success notification
    showNotification(t.attachmentAdded, 'success');
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const handleSaveTask = () => {
    const task = {
      ...taskData,
      attachments,
      integrationSettings,
      createdAt: new Date().toISOString(),
      createdBy: 'Sarah Ahmed'
    };
    
    onSave(task);
    showNotification(t.taskSaved, 'success');
    setTimeout(() => onClose(), 1500);
  };

  const handleActivateTask = () => {
    if (!canActivateTask) {
      showNotification(t.onlyTeachersCanActivate, 'error');
      return;
    }
    
    setTaskData(prev => ({ ...prev, isActive: !prev.isActive }));
    showNotification(
      taskData.isActive ? 'Task deactivated' : 'Task activated', 
      'success'
    );
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 ${isRTL ? 'left-4' : 'right-4'} ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    } text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300`;
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <svg class="w-3 h-3 ${type === 'success' ? 'text-green-600' : 'text-red-600'}" fill="currentColor" viewBox="0 0 20 20">
            ${type === 'success' 
              ? '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>'
              : '<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>'
            }
          </svg>
        </div>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  return (
    <div className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{t.createTask}</h2>
                <p className="text-blue-100 text-sm">Design engaging writing assignments</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-120px)]">
          {/* Main Form */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.taskTitle}
                  </label>
                  <input
                    type="text"
                    value={taskData.title}
                    onChange={(e) => setTaskData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t.enterTitle}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.taskDescription}
                  </label>
                  <textarea
                    value={taskData.description}
                    onChange={(e) => setTaskData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder={t.enterDescription}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.wordLimit}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={taskData.wordLimit}
                      onChange={(e) => setTaskData(prev => ({ ...prev, wordLimit: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                      {t.words}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.timeLimit}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={taskData.timeLimit}
                      onChange={(e) => setTaskData(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                      {t.minutes}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.dueDate}
                  </label>
                  <input
                    type="datetime-local"
                    value={taskData.dueDate}
                    onChange={(e) => setTaskData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.difficulty}
                  </label>
                  <select
                    value={taskData.difficulty}
                    onChange={(e) => setTaskData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="easy">{t.easy}</option>
                    <option value="medium">{t.medium}</option>
                    <option value="hard">{t.hard}</option>
                  </select>
                </div>
              </div>

              {/* Class Assignment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.assignedClasses}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {availableClasses.map((cls) => (
                    <label key={cls.id} className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={taskData.assignedClasses.includes(cls.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTaskData(prev => ({ ...prev, assignedClasses: [...prev.assignedClasses, cls.id] }));
                          } else {
                            setTaskData(prev => ({ ...prev, assignedClasses: prev.assignedClasses.filter(id => id !== cls.id) }));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{cls.name}</div>
                        <div className="text-sm text-gray-500">{cls.students} students</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rubric Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.rubricSelection}
                </label>
                <div className="flex space-x-3 overflow-visible">
                  <select
                    value={selectedRubric}
                    onChange={(e) => setSelectedRubric(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t.selectRubric}</option>
                    {availableRubrics.map((rubric) => (
                      <option key={rubric.id} value={rubric.id}>
                        {rubric.name} ({rubric.criteria} criteria)
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowRubricBuilder(true)}
                    className="px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
                    style={{ width: 'auto', textWrap: 'nowrap' }}
                  >
                    {t.createRubric}
                  </button>
                </div>
              </div>

              {/* Additional Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.instructions}
                </label>
                <textarea
                  value={taskData.instructions}
                  onChange={(e) => setTaskData(prev => ({ ...prev, instructions: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder={t.enterInstructions}
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.attachments}
                </label>
                <div className="space-y-3">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleAddAttachment('file')}
                      className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {t.uploadFile}
                    </button>
                    <button
                      onClick={() => handleAddAttachment('link')}
                      className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200"
                    >
                      <Link className="w-4 h-4 mr-2" />
                      {t.addLink}
                    </button>
                  </div>
                  
                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      {attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              {attachment.type === 'pdf' && <FileText className="w-4 h-4 text-blue-600" />}
                              {attachment.type === 'link' && <Link className="w-4 h-4 text-green-600" />}
                              {attachment.type === 'image' && <Upload className="w-4 h-4 text-purple-600" />}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{attachment.name}</div>
                              {attachment.size && (
                                <div className="text-sm text-gray-500">{attachment.size}</div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => removeAttachment(attachment.id)}
                            className="ml-2 p-1 text-red-600 hover:bg-red-100 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="w-80 bg-gray-50 p-6 border-l border-gray-200 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.settings}</h3>
            
            <div className="space-y-6">
              {/* Task Activation - Only for Teachers */}
              {canActivateTask && (
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">{t.taskStatus}</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{t.activateTask}</div>
                      <div className="text-sm text-gray-500">
                        {taskData.isActive ? t.active : t.inactive}
                      </div>
                    </div>
                    <button
                      onClick={handleActivateTask}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        taskData.isActive ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        taskData.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              )}

              {/* Task Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{t.allowLateSubmission}</div>
                    <div className="text-sm text-gray-500">Students can submit after deadline</div>
                  </div>
                  <button
                    onClick={() => setTaskData(prev => ({ ...prev, allowLateSubmission: !prev.allowLateSubmission }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      taskData.allowLateSubmission ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      taskData.allowLateSubmission ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{t.enableAIAssistance}</div>
                    <div className="text-sm text-gray-500">AI suggestions during writing</div>
                  </div>
                  <button
                    onClick={() => setTaskData(prev => ({ ...prev, enableAIAssistance: !prev.enableAIAssistance }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      taskData.enableAIAssistance ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      taskData.enableAIAssistance ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Integration Settings */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">{t.integrations}</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                        <Globe className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{t.googleClassroom}</span>
                    </div>
                    <button
                      onClick={() => setIntegrationSettings(prev => ({ ...prev, googleClassroom: !prev.googleClassroom }))}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                        integrationSettings.googleClassroom ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                        integrationSettings.googleClassroom ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{t.microsoftTeams}</span>
                    </div>
                    <button
                      onClick={() => setIntegrationSettings(prev => ({ ...prev, microsoftTeams: !prev.microsoftTeams }))}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                        integrationSettings.microsoftTeams ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                        integrationSettings.microsoftTeams ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                        <Share2 className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{t.shareWithParents}</span>
                    </div>
                    <button
                      onClick={() => setIntegrationSettings(prev => ({ ...prev, shareWithParents: !prev.shareWithParents }))}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                        integrationSettings.shareWithParents ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                        integrationSettings.shareWithParents ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Task Preview */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">{t.preview}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Classes:</span>
                    <span className="font-medium">{taskData.assignedClasses.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Word Limit:</span>
                    <span className="font-medium">{taskData.wordLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Limit:</span>
                    <span className="font-medium">{taskData.timeLimit}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attachments:</span>
                    <span className="font-medium">{attachments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${taskData.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                      {taskData.isActive ? t.active : t.inactive}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Info className="w-4 h-4" />
              <span>Task will be saved as draft until published</span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSaveTask}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center min-w-fit whitespace-nowrap"
                style={{ width: 'auto' }}
              >
                <Save className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="whitespace-nowrap">{t.save}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCreationSystem;