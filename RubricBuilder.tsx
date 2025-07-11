import React, { useState } from 'react';
import { 
  X, Save, Plus, Trash2, Edit, Copy, Star,
  Target, Brain, Settings, Eye, CheckCircle,
  AlertTriangle, Info, ArrowUp, ArrowDown
} from 'lucide-react';

interface RubricBuilderProps {
  onClose: () => void;
  onSave: (rubric: any) => void;
  language?: 'ar' | 'en';
  editingRubric?: any;
}

interface RubricLevel {
  id: string;
  name: { ar: string; en: string };
  points: number;
  description: { ar: string; en: string };
}

interface RubricCriteria {
  id: string;
  name: { ar: string; en: string };
  weight: number;
  levels: RubricLevel[];
  order: number;
}

const RubricBuilder: React.FC<RubricBuilderProps> = ({ 
  onClose, 
  onSave, 
  language = 'en',
  editingRubric 
}) => {
  const [rubricData, setRubricData] = useState({
    name: { ar: '', en: '' },
    description: { ar: '', en: '' },
    subject: '',
    gradeLevel: '',
    totalPoints: 0,
    isPublic: false
  });

  const [criteria, setCriteria] = useState<RubricCriteria[]>([
    {
      id: '1',
      name: { ar: 'الأفكار والمحتوى', en: 'Ideas & Content' },
      weight: 25,
      order: 1,
      levels: [
        {
          id: '1-4',
          name: { ar: 'ممتاز', en: 'Excellent' },
          points: 4,
          description: { 
            ar: 'أفكار واضحة ومركزة وجذابة مع تطوير ممتاز للموضوع', 
            en: 'Clear, focused, and engaging ideas with excellent topic development' 
          }
        },
        {
          id: '1-3',
          name: { ar: 'جيد', en: 'Good' },
          points: 3,
          description: { 
            ar: 'أفكار واضحة عموماً مع تطوير جيد للموضوع', 
            en: 'Generally clear ideas with good topic development' 
          }
        },
        {
          id: '1-2',
          name: { ar: 'مقبول', en: 'Fair' },
          points: 2,
          description: { 
            ar: 'بعض الأفكار الواضحة لكن تحتاج لمزيد من التطوير', 
            en: 'Some clear ideas but needs more development' 
          }
        },
        {
          id: '1-1',
          name: { ar: 'ضعيف', en: 'Poor' },
          points: 1,
          description: { 
            ar: 'أفكار غير واضحة أو غير مطورة', 
            en: 'Unclear or undeveloped ideas' 
          }
        }
      ]
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const isRTL = language === 'ar';

  // Multilingual content
  const content = {
    ar: {
      rubricBuilder: 'منشئ معايير التقييم',
      createRubric: 'إنشاء معايير جديدة',
      editRubric: 'تعديل المعايير',
      rubricName: 'اسم المعايير',
      rubricDescription: 'وصف المعايير',
      subject: 'المادة',
      gradeLevel: 'المستوى الدراسي',
      isPublic: 'متاح للمعلمين الآخرين',
      criteria: 'المعايير',
      addCriteria: 'إضافة معيار',
      criteriaName: 'اسم المعيار',
      weight: 'الوزن النسبي',
      levels: 'المستويات',
      addLevel: 'إضافة مستوى',
      levelName: 'اسم المستوى',
      points: 'النقاط',
      description: 'الوصف',
      templates: 'القوالب الجاهزة',
      useTemplate: 'استخدام القالب',
      preview: 'معاينة',
      save: 'حفظ المعايير',
      cancel: 'إلغاء',
      totalPoints: 'إجمالي النقاط',
      enterRubricName: 'أدخل اسم المعايير...',
      enterDescription: 'أدخل وصف المعايير...',
      enterCriteriaName: 'أدخل اسم المعيار...',
      enterLevelName: 'أدخل اسم المستوى...',
      enterLevelDescription: 'أدخل وصف المستوى...',
      rubricSaved: 'تم حفظ المعايير بنجاح',
      deleteConfirm: 'هل أنت متأكد من حذف هذا العنصر؟',
      moveUp: 'نقل لأعلى',
      moveDown: 'نقل لأسفل',
      duplicate: 'نسخ',
      delete: 'حذف',
      excellent: 'ممتاز',
      good: 'جيد',
      fair: 'مقبول',
      poor: 'ضعيف'
    },
    en: {
      rubricBuilder: 'Rubric Builder',
      createRubric: 'Create New Rubric',
      editRubric: 'Edit Rubric',
      rubricName: 'Rubric Name',
      rubricDescription: 'Rubric Description',
      subject: 'Subject',
      gradeLevel: 'Grade Level',
      isPublic: 'Available to Other Teachers',
      criteria: 'Criteria',
      addCriteria: 'Add Criteria',
      criteriaName: 'Criteria Name',
      weight: 'Weight (%)',
      levels: 'Performance Levels',
      addLevel: 'Add Level',
      levelName: 'Level Name',
      points: 'Points',
      description: 'Description',
      templates: 'Templates',
      useTemplate: 'Use Template',
      preview: 'Preview',
      save: 'Save Rubric',
      cancel: 'Cancel',
      totalPoints: 'Total Points',
      enterRubricName: 'Enter rubric name...',
      enterDescription: 'Enter rubric description...',
      enterCriteriaName: 'Enter criteria name...',
      enterLevelName: 'Enter level name...',
      enterLevelDescription: 'Enter level description...',
      rubricSaved: 'Rubric saved successfully',
      deleteConfirm: 'Are you sure you want to delete this item?',
      moveUp: 'Move Up',
      moveDown: 'Move Down',
      duplicate: 'Duplicate',
      delete: 'Delete',
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor'
    }
  };

  const t = content[language];

  // Predefined templates
  const templates = [
    {
      id: 'creative-writing',
      name: { ar: 'الكتابة الإبداعية', en: 'Creative Writing' },
      criteria: [
        { name: { ar: 'الأفكار والمحتوى', en: 'Ideas & Content' }, weight: 30 },
        { name: { ar: 'التنظيم', en: 'Organization' }, weight: 25 },
        { name: { ar: 'الأسلوب والصوت', en: 'Voice & Style' }, weight: 25 },
        { name: { ar: 'اللغة والقواعد', en: 'Language & Grammar' }, weight: 20 }
      ]
    },
    {
      id: 'essay-analysis',
      name: { ar: 'تحليل المقال', en: 'Essay Analysis' },
      criteria: [
        { name: { ar: 'فهم النص', en: 'Text Comprehension' }, weight: 25 },
        { name: { ar: 'التحليل النقدي', en: 'Critical Analysis' }, weight: 30 },
        { name: { ar: 'الأدلة والأمثلة', en: 'Evidence & Examples' }, weight: 25 },
        { name: { ar: 'الخلاصة والاستنتاج', en: 'Conclusion' }, weight: 20 }
      ]
    },
    {
      id: 'general-writing',
      name: { ar: 'الكتابة العامة', en: 'General Writing' },
      criteria: [
        { name: { ar: 'المحتوى', en: 'Content' }, weight: 40 },
        { name: { ar: 'التنظيم', en: 'Organization' }, weight: 30 },
        { name: { ar: 'اللغة', en: 'Language' }, weight: 30 }
      ]
    }
  ];

  // Calculate total points
  const calculateTotalPoints = () => {
    return criteria.reduce((total, criterion) => {
      const maxPoints = Math.max(...criterion.levels.map(level => level.points));
      return total + maxPoints;
    }, 0);
  };

  // Add new criteria
  const addCriteria = () => {
    const newCriteria: RubricCriteria = {
      id: Date.now().toString(),
      name: { ar: '', en: '' },
      weight: 25,
      order: criteria.length + 1,
      levels: [
        {
          id: `${Date.now()}-4`,
          name: { ar: 'ممتاز', en: 'Excellent' },
          points: 4,
          description: { ar: '', en: '' }
        },
        {
          id: `${Date.now()}-3`,
          name: { ar: 'جيد', en: 'Good' },
          points: 3,
          description: { ar: '', en: '' }
        },
        {
          id: `${Date.now()}-2`,
          name: { ar: 'مقبول', en: 'Fair' },
          points: 2,
          description: { ar: '', en: '' }
        },
        {
          id: `${Date.now()}-1`,
          name: { ar: 'ضعيف', en: 'Poor' },
          points: 1,
          description: { ar: '', en: '' }
        }
      ]
    };
    setCriteria(prev => [...prev, newCriteria]);
  };

  // Add new level to criteria
  const addLevel = (criteriaId: string) => {
    setCriteria(prev => prev.map(criterion => {
      if (criterion.id === criteriaId) {
        const newLevel: RubricLevel = {
          id: `${criteriaId}-${Date.now()}`,
          name: { ar: '', en: '' },
          points: criterion.levels.length + 1,
          description: { ar: '', en: '' }
        };
        return { ...criterion, levels: [...criterion.levels, newLevel] };
      }
      return criterion;
    }));
  };

  // Update criteria
  const updateCriteria = (criteriaId: string, field: string, value: any) => {
    setCriteria(prev => prev.map(criterion => 
      criterion.id === criteriaId 
        ? { ...criterion, [field]: value }
        : criterion
    ));
  };

  // Update level
  const updateLevel = (criteriaId: string, levelId: string, field: string, value: any) => {
    setCriteria(prev => prev.map(criterion => {
      if (criterion.id === criteriaId) {
        return {
          ...criterion,
          levels: criterion.levels.map(level =>
            level.id === levelId ? { ...level, [field]: value } : level
          )
        };
      }
      return criterion;
    }));
  };

  // Delete criteria
  const deleteCriteria = (criteriaId: string) => {
    if (confirm(t.deleteConfirm)) {
      setCriteria(prev => prev.filter(criterion => criterion.id !== criteriaId));
    }
  };

  // Delete level
  const deleteLevel = (criteriaId: string, levelId: string) => {
    if (confirm(t.deleteConfirm)) {
      setCriteria(prev => prev.map(criterion => {
        if (criterion.id === criteriaId) {
          return {
            ...criterion,
            levels: criterion.levels.filter(level => level.id !== levelId)
          };
        }
        return criterion;
      }));
    }
  };

  // Move criteria up/down
  const moveCriteria = (criteriaId: string, direction: 'up' | 'down') => {
    setCriteria(prev => {
      const index = prev.findIndex(c => c.id === criteriaId);
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === prev.length - 1)
      ) {
        return prev;
      }

      const newCriteria = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newCriteria[index], newCriteria[targetIndex]] = [newCriteria[targetIndex], newCriteria[index]];
      
      return newCriteria;
    });
  };

  // Use template
  const useTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newCriteria = template.criteria.map((criterion, index) => ({
        id: (index + 1).toString(),
        name: criterion.name,
        weight: criterion.weight,
        order: index + 1,
        levels: [
          {
            id: `${index + 1}-4`,
            name: { ar: 'ممتاز', en: 'Excellent' },
            points: 4,
            description: { ar: '', en: '' }
          },
          {
            id: `${index + 1}-3`,
            name: { ar: 'جيد', en: 'Good' },
            points: 3,
            description: { ar: '', en: '' }
          },
          {
            id: `${index + 1}-2`,
            name: { ar: 'مقبول', en: 'Fair' },
            points: 2,
            description: { ar: '', en: '' }
          },
          {
            id: `${index + 1}-1`,
            name: { ar: 'ضعيف', en: 'Poor' },
            points: 1,
            description: { ar: '', en: '' }
          }
        ]
      }));
      setCriteria(newCriteria);
    }
  };

  // Save rubric
  const handleSave = () => {
    const rubric = {
      ...rubricData,
      criteria,
      totalPoints: calculateTotalPoints(),
      createdAt: new Date().toISOString(),
      createdBy: 'Sarah Ahmed'
    };
    
    onSave(rubric);
    
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
        <span>${t.rubricSaved}</span>
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

  return (
    <div className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{editingRubric ? t.editRubric : t.createRubric}</h2>
                <p className="text-purple-100 text-sm">Design comprehensive assessment criteria</p>
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
                    {t.rubricName}
                  </label>
                  <input
                    type="text"
                    value={rubricData.name[language]}
                    onChange={(e) => setRubricData(prev => ({ 
                      ...prev, 
                      name: { ...prev.name, [language]: e.target.value } 
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={t.enterRubricName}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.rubricDescription}
                  </label>
                  <textarea
                    value={rubricData.description[language]}
                    onChange={(e) => setRubricData(prev => ({ 
                      ...prev, 
                      description: { ...prev.description, [language]: e.target.value } 
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder={t.enterDescription}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.subject}
                  </label>
                  <select
                    value={rubricData.subject}
                    onChange={(e) => setRubricData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    <option value="english">English</option>
                    <option value="arabic">Arabic</option>
                    <option value="literature">Literature</option>
                    <option value="creative-writing">Creative Writing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.gradeLevel}
                  </label>
                  <select
                    value={rubricData.gradeLevel}
                    onChange={(e) => setRubricData(prev => ({ ...prev, gradeLevel: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Grade</option>
                    <option value="6">Grade 6</option>
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>
              </div>

              {/* Templates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.templates}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => useTemplate(template.id)}
                      className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-left"
                    >
                      <div className="font-medium text-gray-900">{template.name[language]}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {template.criteria.length} criteria
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Criteria */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{t.criteria}</h3>
                  <button
                    onClick={addCriteria}
                    className="btn-primary flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t.addCriteria}
                  </button>
                </div>

                <div className="space-y-6">
                  {criteria.map((criterion, criteriaIndex) => (
                    <div key={criterion.id} className="border border-gray-200 rounded-xl p-6">
                      {/* Criteria Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t.criteriaName}
                            </label>
                            <input
                              type="text"
                              value={criterion.name[language]}
                              onChange={(e) => updateCriteria(criterion.id, 'name', { 
                                ...criterion.name, 
                                [language]: e.target.value 
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder={t.enterCriteriaName}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t.weight}
                            </label>
                            <input
                              type="number"
                              value={criterion.weight}
                              onChange={(e) => updateCriteria(criterion.id, 'weight', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              min="0"
                              max="100"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => moveCriteria(criterion.id, 'up')}
                            disabled={criteriaIndex === 0}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                            title={t.moveUp}
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveCriteria(criterion.id, 'down')}
                            disabled={criteriaIndex === criteria.length - 1}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                            title={t.moveDown}
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteCriteria(criterion.id)}
                            className="p-2 text-red-400 hover:text-red-600"
                            title={t.delete}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Performance Levels */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{t.levels}</h4>
                          <button
                            onClick={() => addLevel(criterion.id)}
                            className="text-sm text-purple-600 hover:text-purple-700 flex items-center"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            {t.addLevel}
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {criterion.levels.map((level) => (
                            <div key={level.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <input
                                  type="text"
                                  value={level.name[language]}
                                  onChange={(e) => updateLevel(criterion.id, level.id, 'name', { 
                                    ...level.name, 
                                    [language]: e.target.value 
                                  })}
                                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                                  placeholder={t.enterLevelName}
                                />
                                <button
                                  onClick={() => deleteLevel(criterion.id, level.id)}
                                  className="ml-2 p-1 text-red-400 hover:text-red-600"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                              
                              <div className="mb-2">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  {t.points}
                                </label>
                                <input
                                  type="number"
                                  value={level.points}
                                  onChange={(e) => updateLevel(criterion.id, level.id, 'points', parseInt(e.target.value))}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                                  min="0"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  {t.description}
                                </label>
                                <textarea
                                  value={level.description[language]}
                                  onChange={(e) => updateLevel(criterion.id, level.id, 'description', { 
                                    ...level.description, 
                                    [language]: e.target.value 
                                  })}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                                  rows={3}
                                  placeholder={t.enterLevelDescription}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="w-80 bg-gray-50 p-6 border-l border-gray-200 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.preview}</h3>
            
            <div className="space-y-6">
              {/* Rubric Summary */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Rubric Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Criteria:</span>
                    <span className="font-medium">{criteria.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.totalPoints}:</span>
                    <span className="font-medium">{calculateTotalPoints()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight Total:</span>
                    <span className="font-medium">
                      {criteria.reduce((sum, c) => sum + c.weight, 0)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">{t.settings}</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{t.isPublic}</div>
                      <div className="text-sm text-gray-500">Share with other teachers</div>
                    </div>
                    <button
                      onClick={() => setRubricData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        rubricData.isPublic ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        rubricData.isPublic ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Criteria List */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Criteria Overview</h4>
                <div className="space-y-2">
                  {criteria.map((criterion, index) => (
                    <div key={criterion.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {criterion.name[language] || `Criteria ${index + 1}`}
                        </div>
                        <div className="text-xs text-gray-500">
                          {criterion.weight}% • {criterion.levels.length} levels
                        </div>
                      </div>
                      <div className="text-sm font-medium text-purple-600">
                        {Math.max(...criterion.levels.map(l => l.points))} pts
                      </div>
                    </div>
                  ))}
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
              <span>Total Points: {calculateTotalPoints()}</span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {t.save}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RubricBuilder;