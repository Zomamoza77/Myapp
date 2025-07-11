import React, { useState } from 'react';
import { 
  X, BookOpen, FileText, MessageSquare, Eye, Users, 
  ChevronRight, Play, Star, Target, Brain, Lightbulb,
  ArrowLeft, ArrowRight, CheckCircle, Award, Sparkles,
  PenTool, Edit3, Globe, Home, Volume2, VolumeX
} from 'lucide-react';

interface TextTypesGuideProps {
  onClose: () => void;
  onNavigateToWriting: (textType: string, title?: string) => void;
  language?: 'ar' | 'en';
  theme?: 'light' | 'dark' | 'teal';
}

interface TextType {
  id: string;
  name: { ar: string; en: string };
  icon: React.ComponentType<any>;
  color: string;
  characteristics: { ar: string[]; en: string[] };
  audience: { ar: string; en: string };
  purpose: { ar: string; en: string };
  language: { ar: string; en: string };
  example: { ar: string; en: string };
  structure: {
    title: { ar: string; en: string };
    parts: { name: { ar: string; en: string }; description: { ar: string; en: string } }[];
  };
  practiceTopics: { ar: string[]; en: string[] };
}

const TextTypesGuide: React.FC<TextTypesGuideProps> = ({ 
  onClose, 
  onNavigateToWriting, 
  language = 'ar',
  theme = 'teal'
}) => {
  const [activeSection, setActiveSection] = useState<'essays-letters' | 'creative-texts'>('essays-letters');
  const [selectedTextType, setSelectedTextType] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const isRTL = language === 'ar';

  // Text types data
  const textTypes: TextType[] = [
    {
      id: 'essay',
      name: { ar: 'المقال', en: 'Essay' },
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      characteristics: {
        ar: [
          'يعتمد على الحقائق والأدلة',
          'يتبع هيكلاً منطقياً واضحاً',
          'يستخدم لغة رسمية ودقيقة',
          'يهدف إلى الإقناع أو التوضيح'
        ],
        en: [
          'Based on facts and evidence',
          'Follows a clear logical structure',
          'Uses formal and precise language',
          'Aims to persuade or explain'
        ]
      },
      audience: { ar: 'القراء المهتمون بالموضوع', en: 'Readers interested in the topic' },
      purpose: { ar: 'تقديم معلومات أو وجهة نظر مدعومة بالأدلة', en: 'Present information or viewpoint supported by evidence' },
      language: { ar: 'رسمية، واضحة، منطقية', en: 'Formal, clear, logical' },
      example: {
        ar: `أهمية التعليم في بناء المجتمعات

يُعتبر التعليم حجر الأساس في بناء المجتمعات المتقدمة والمزدهرة. فهو ليس مجرد عملية نقل المعرفة من جيل إلى آخر، بل هو استثمار في المستقبل وضمان للتقدم والازدهار.

إن التعليم الجيد يساهم في تنمية قدرات الأفراد الفكرية والإبداعية، مما يؤهلهم للمشاركة الفعالة في بناء مجتمعهم. كما أنه يعزز قيم التسامح والاحترام المتبادل، ويساعد في القضاء على الجهل والتطرف.

وفي الختام، يمكن القول أن الاستثمار في التعليم هو الطريق الأمثل لضمان مستقبل أفضل للأجيال القادمة.`,
        en: `The Importance of Education in Building Societies

Education is considered the cornerstone of building advanced and prosperous societies. It is not merely a process of transferring knowledge from one generation to another, but an investment in the future and a guarantee of progress and prosperity.

Good education contributes to developing individuals' intellectual and creative abilities, qualifying them for effective participation in building their society. It also promotes values of tolerance and mutual respect, and helps eliminate ignorance and extremism.

In conclusion, we can say that investing in education is the best way to ensure a better future for coming generations.`
      },
      structure: {
        title: { ar: 'هيكل المقال', en: 'Essay Structure' },
        parts: [
          {
            name: { ar: 'المقدمة', en: 'Introduction' },
            description: { ar: 'تقديم الموضوع وجذب انتباه القارئ', en: 'Introduce the topic and capture reader attention' }
          },
          {
            name: { ar: 'الفكرة الرئيسة', en: 'Main Idea' },
            description: { ar: 'عرض الفكرة الأساسية بوضوح', en: 'Present the main idea clearly' }
          },
          {
            name: { ar: 'التوسيع والأدلة', en: 'Development & Evidence' },
            description: { ar: 'تطوير الفكرة بالأدلة والأمثلة', en: 'Develop the idea with evidence and examples' }
          },
          {
            name: { ar: 'الخاتمة', en: 'Conclusion' },
            description: { ar: 'تلخيص الأفكار والوصول لنتيجة', en: 'Summarize ideas and reach a conclusion' }
          }
        ]
      },
      practiceTopics: {
        ar: [
          'أهمية القراءة في حياة الإنسان',
          'تأثير التكنولوجيا على التعليم',
          'دور الشباب في بناء المستقبل',
          'أهمية الحفاظ على البيئة',
          'قيمة الوقت في حياتنا'
        ],
        en: [
          'The Importance of Reading in Human Life',
          'The Impact of Technology on Education',
          'The Role of Youth in Building the Future',
          'The Importance of Environmental Conservation',
          'The Value of Time in Our Lives'
        ]
      }
    },
    {
      id: 'letter',
      name: { ar: 'الرسالة', en: 'Letter' },
      icon: MessageSquare,
      color: 'from-green-500 to-green-600',
      characteristics: {
        ar: [
          'تتضمن مخاطبة مباشرة للمتلقي',
          'تحمل طابعاً شخصياً أو رسمياً',
          'تتبع قواعد الأدب في المخاطبة',
          'تهدف إلى التواصل والتأثير'
        ],
        en: [
          'Includes direct address to recipient',
          'Has personal or formal character',
          'Follows etiquette rules in addressing',
          'Aims to communicate and influence'
        ]
      },
      audience: { ar: 'المتلقي المحدد للرسالة', en: 'Specific recipient of the letter' },
      purpose: { ar: 'التواصل وإيصال رسالة معينة', en: 'Communicate and convey a specific message' },
      language: { ar: 'مهذبة، واضحة، مناسبة للمتلقي', en: 'Polite, clear, appropriate for recipient' },
      example: {
        ar: `عزيزي الأستاذ أحمد،

أكتب إليك هذه الرسالة لأعبر عن امتناني العميق لجهودك المتميزة في تعليمنا وإرشادنا. لقد كان لك الأثر الكبير في تطوير مهاراتنا وزيادة حبنا للتعلم.

إن طريقتك في التدريس وصبرك معنا جعلانا نتطلع دائماً لحضور دروسك. كما أن نصائحك القيمة ساعدتنا كثيراً في تجاوز الصعوبات التي واجهناها.

أتمنى لك دوام الصحة والعافية، وأن يبارك الله في جهودك النبيلة.

مع أطيب التحيات،
طالبك الممتن
محمد علي`,
        en: `Dear Professor Ahmed,

I am writing this letter to express my deep gratitude for your outstanding efforts in teaching and guiding us. You have had a great impact on developing our skills and increasing our love for learning.

Your teaching method and patience with us made us always look forward to attending your classes. Your valuable advice also helped us greatly in overcoming the difficulties we faced.

I wish you continued health and wellness, and may God bless your noble efforts.

With best regards,
Your grateful student
Mohammed Ali`
      },
      structure: {
        title: { ar: 'هيكل الرسالة', en: 'Letter Structure' },
        parts: [
          {
            name: { ar: 'التحية والمخاطبة', en: 'Greeting & Address' },
            description: { ar: 'بداية مهذبة ومناسبة للمتلقي', en: 'Polite and appropriate opening for recipient' }
          },
          {
            name: { ar: 'المحتوى الرئيسي', en: 'Main Content' },
            description: { ar: 'عرض الموضوع أو الطلب بوضوح', en: 'Present the topic or request clearly' }
          },
          {
            name: { ar: 'الخاتمة والتحيات', en: 'Closing & Regards' },
            description: { ar: 'إنهاء مهذب مع التحيات المناسبة', en: 'Polite ending with appropriate regards' }
          },
          {
            name: { ar: 'التوقيع', en: 'Signature' },
            description: { ar: 'اسم المرسل وتاريخ الإرسال', en: 'Sender name and date' }
          }
        ]
      },
      practiceTopics: {
        ar: [
          'رسالة شكر لمعلم',
          'رسالة اعتذار لصديق',
          'رسالة طلب وظيفة',
          'رسالة دعوة لحفل',
          'رسالة شكوى رسمية'
        ],
        en: [
          'Thank you letter to a teacher',
          'Apology letter to a friend',
          'Job application letter',
          'Invitation letter to a party',
          'Formal complaint letter'
        ]
      }
    },
    {
      id: 'description',
      name: { ar: 'الوصف', en: 'Description' },
      icon: Eye,
      color: 'from-teal-500 to-teal-600',
      characteristics: {
        ar: [
          'يعتمد على التفاصيل الحسية',
          'يستخدم الصفات والتشبيهات',
          'يرسم صورة واضحة في ذهن القارئ',
          'يثير المشاعر والخيال'
        ],
        en: [
          'Relies on sensory details',
          'Uses adjectives and similes',
          'Paints a clear picture in reader\'s mind',
          'Evokes emotions and imagination'
        ]
      },
      audience: { ar: 'القراء الذين يريدون تصور المشهد', en: 'Readers who want to visualize the scene' },
      purpose: { ar: 'رسم صورة حية ومفصلة', en: 'Paint a vivid and detailed picture' },
      language: { ar: 'غنية بالصفات والتشبيهات', en: 'Rich in adjectives and similes' },
      example: {
        ar: `حديقة الربيع

كانت الحديقة في فصل الربيع لوحة فنية رائعة تأسر الأنظار وتسحر القلوب. تتراقص الأزهار الملونة في نسيم عليل، كأنها راقصات يرتدين فساتين من الحرير الناعم. الورود الحمراء تتوهج كجمرات متقدة، بينما تنثر الياسمين البيضاء عطرها الفواح في أرجاء المكان.

تغرد الطيور ألحاناً عذبة من أعالي الأشجار الخضراء، وكأنها تعزف سيمفونية الطبيعة الخالدة. أشعة الشمس الذهبية تتسلل بين أوراق الأشجار، راسمة ظلالاً راقصة على العشب الأخضر الناعم.

في وسط هذا الجمال الأخاذ، تتدفق نافورة صغيرة بمياهها الصافية، مصدرة صوتاً هادئاً يضفي على المكان سكينة وهدوءاً لا يوصف.`,
        en: `The Spring Garden

The garden in spring was a magnificent artistic painting that captivated the eyes and enchanted hearts. Colorful flowers danced in a gentle breeze, like dancers wearing dresses of soft silk. Red roses glowed like burning embers, while white jasmine scattered its fragrant perfume throughout the place.

Birds sang sweet melodies from atop green trees, as if playing nature's eternal symphony. Golden sunrays crept between tree leaves, drawing dancing shadows on the soft green grass.

In the midst of this breathtaking beauty, a small fountain flowed with its clear waters, producing a peaceful sound that gave the place an indescribable tranquility and calm.`
      },
      structure: {
        title: { ar: 'هيكل النص الوصفي', en: 'Descriptive Text Structure' },
        parts: [
          {
            name: { ar: 'الانطباع العام', en: 'General Impression' },
            description: { ar: 'وصف الانطباع الأول والشعور العام', en: 'Describe first impression and general feeling' }
          },
          {
            name: { ar: 'التفاصيل البصرية', en: 'Visual Details' },
            description: { ar: 'وصف الألوان والأشكال والأحجام', en: 'Describe colors, shapes, and sizes' }
          },
          {
            name: { ar: 'التفاصيل الحسية', en: 'Sensory Details' },
            description: { ar: 'وصف الأصوات والروائح والملمس', en: 'Describe sounds, smells, and textures' }
          },
          {
            name: { ar: 'الخلاصة والتأثير', en: 'Summary & Impact' },
            description: { ar: 'تلخيص الوصف والتأثير النهائي', en: 'Summarize description and final impact' }
          }
        ]
      },
      practiceTopics: {
        ar: [
          'وصف منظر طبيعي خلاب',
          'وصف شخصية مؤثرة',
          'وصف مكان تاريخي',
          'وصف يوم في الطبيعة',
          'وصف مشهد من الذاكرة'
        ],
        en: [
          'Describe a breathtaking landscape',
          'Describe an influential person',
          'Describe a historical place',
          'Describe a day in nature',
          'Describe a scene from memory'
        ]
      }
    },
    {
      id: 'narrative',
      name: { ar: 'السرد', en: 'Narrative' },
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      characteristics: {
        ar: [
          'يحتوي على شخصيات وأحداث',
          'يتبع تسلسلاً زمنياً',
          'يستخدم الحوار والوصف',
          'يهدف إلى التشويق والإمتاع'
        ],
        en: [
          'Contains characters and events',
          'Follows chronological sequence',
          'Uses dialogue and description',
          'Aims to create suspense and entertainment'
        ]
      },
      audience: { ar: 'القراء الذين يحبون القصص', en: 'Readers who enjoy stories' },
      purpose: { ar: 'حكاية الأحداث بطريقة مشوقة', en: 'Tell events in an engaging way' },
      language: { ar: 'حيوية، مشوقة، غنية بالتفاصيل', en: 'Vivid, engaging, rich in details' },
      example: {
        ar: `المفتاح السحري

في صباح يوم مشمس، كان أحمد يستكشف علية منزل جده القديم. بين الصناديق المغبرة والكتب العتيقة، لمع شيء غريب تحت أشعة الشمس المتسللة من النافذة الصغيرة.

اقترب أحمد بحذر، وإذا به يجد مفتاحاً ذهبياً صغيراً منقوشاً عليه رموز غامضة. عندما لمسه، شعر بدفء غريب ينتشر في يده، وفجأة بدأت الرموز تتوهج بضوء أزرق خافت.

"ما هذا؟" همس أحمد لنفسه، وهو يقلب المفتاح بين يديه. في تلك اللحظة، سمع صوت جده ينادي من الأسفل: "أحمد، هل وجدت شيئاً مثيراً هناك؟"

ابتسم أحمد وهو يضع المفتاح في جيبه، لا يدري أن هذا الاكتشاف سيغير حياته إلى الأبد.`,
        en: `The Magic Key

On a sunny morning, Ahmed was exploring the attic of his grandfather's old house. Among the dusty boxes and ancient books, something strange gleamed under the sunrays sneaking through the small window.

Ahmed approached cautiously, and found a small golden key engraved with mysterious symbols. When he touched it, he felt a strange warmth spreading through his hand, and suddenly the symbols began to glow with a faint blue light.

"What is this?" Ahmed whispered to himself, turning the key in his hands. At that moment, he heard his grandfather calling from below: "Ahmed, did you find something interesting up there?"

Ahmed smiled as he put the key in his pocket, not knowing that this discovery would change his life forever.`
      },
      structure: {
        title: { ar: 'هيكل النص السردي', en: 'Narrative Text Structure' },
        parts: [
          {
            name: { ar: 'البداية والتقديم', en: 'Beginning & Introduction' },
            description: { ar: 'تقديم الشخصيات والمكان والزمان', en: 'Introduce characters, setting, and time' }
          },
          {
            name: { ar: 'تطوير الأحداث', en: 'Plot Development' },
            description: { ar: 'تطوير القصة وبناء التشويق', en: 'Develop story and build suspense' }
          },
          {
            name: { ar: 'الذروة والصراع', en: 'Climax & Conflict' },
            description: { ar: 'الوصول لذروة الأحداث والصراع الرئيسي', en: 'Reach climax and main conflict' }
          },
          {
            name: { ar: 'الحل والخاتمة', en: 'Resolution & Ending' },
            description: { ar: 'حل الصراع وإنهاء القصة بطريقة مرضية', en: 'Resolve conflict and end story satisfactorily' }
          }
        ]
      },
      practiceTopics: {
        ar: [
          'مغامرة في الغابة',
          'يوم لا ينسى في المدرسة',
          'لقاء مع شخصية مشهورة',
          'رحلة عبر الزمن',
          'قصة صداقة حقيقية'
        ],
        en: [
          'Adventure in the forest',
          'An unforgettable day at school',
          'Meeting a famous person',
          'Journey through time',
          'A true friendship story'
        ]
      }
    },
    {
      id: 'discussion',
      name: { ar: 'النقاش', en: 'Discussion' },
      icon: Users,
      color: 'from-orange-500 to-red-600',
      characteristics: {
        ar: [
          'يعرض وجهات نظر متعددة',
          'يستخدم الأدلة والحجج',
          'يحافظ على التوازن والموضوعية',
          'يهدف إلى الإقناع المنطقي'
        ],
        en: [
          'Presents multiple viewpoints',
          'Uses evidence and arguments',
          'Maintains balance and objectivity',
          'Aims for logical persuasion'
        ]
      },
      audience: { ar: 'القراء المهتمون بالقضايا الجدلية', en: 'Readers interested in controversial issues' },
      purpose: { ar: 'عرض وجهات نظر متوازنة حول موضوع جدلي', en: 'Present balanced viewpoints on controversial topic' },
      language: { ar: 'منطقية، متوازنة، مقنعة', en: 'Logical, balanced, persuasive' },
      example: {
        ar: `التعليم الإلكتروني: نعمة أم نقمة؟

يثير موضوع التعليم الإلكتروني جدلاً واسعاً في الأوساط التعليمية والأكاديمية. فبينما يرى البعض أنه ثورة حقيقية في عالم التعليم، يعتبره آخرون تهديداً للتعليم التقليدي.

من ناحية، يؤكد مؤيدو التعليم الإلكتروني على مرونته وإمكانية الوصول إليه من أي مكان وفي أي وقت. كما يوفر تكاليف أقل ويتيح استخدام تقنيات متطورة تجعل التعلم أكثر تفاعلاً وإثارة.

من ناحية أخرى، يحذر المعارضون من فقدان التفاعل الإنساني المباشر بين المعلم والطالب. ويشيرون إلى أن التعليم الإلكتروني قد يزيد من العزلة الاجتماعية ويقلل من تطوير المهارات الاجتماعية.

في الختام، يبدو أن الحل الأمثل يكمن في الدمج المتوازن بين التعليم التقليدي والإلكتروني، بحيث نستفيد من مزايا كل منهما.`,
        en: `E-Learning: Blessing or Curse?

The topic of e-learning raises widespread debate in educational and academic circles. While some see it as a real revolution in education, others consider it a threat to traditional learning.

On one hand, e-learning supporters emphasize its flexibility and accessibility from anywhere at any time. It also provides lower costs and allows the use of advanced technologies that make learning more interactive and exciting.

On the other hand, opponents warn of losing direct human interaction between teacher and student. They point out that e-learning may increase social isolation and reduce the development of social skills.

In conclusion, it seems that the optimal solution lies in a balanced integration between traditional and electronic education, so we can benefit from the advantages of both.`
      },
      structure: {
        title: { ar: 'هيكل النص النقاشي', en: 'Discussion Text Structure' },
        parts: [
          {
            name: { ar: 'تقديم الموضوع', en: 'Topic Introduction' },
            description: { ar: 'عرض الموضوع وتقديم وجهات النظر المختلفة', en: 'Present topic and introduce different viewpoints' }
          },
          {
            name: { ar: 'الرأي الأول', en: 'First Opinion' },
            description: { ar: 'عرض الرأي الأول مع الأدلة المؤيدة', en: 'Present first opinion with supporting evidence' }
          },
          {
            name: { ar: 'الرأي المعارض', en: 'Opposing Opinion' },
            description: { ar: 'عرض الرأي المعارض مع الحجج المضادة', en: 'Present opposing opinion with counter-arguments' }
          },
          {
            name: { ar: 'التوازن والخلاصة', en: 'Balance & Conclusion' },
            description: { ar: 'تقديم رؤية متوازنة وخلاصة شاملة', en: 'Provide balanced perspective and comprehensive conclusion' }
          }
        ]
      },
      practiceTopics: {
        ar: [
          'وسائل التواصل الاجتماعي: إيجابيات وسلبيات',
          'العمل من المنزل: هل هو مستقبل العمل؟',
          'الذكاء الاصطناعي: فرصة أم تهديد؟',
          'التعليم المختلط: الحل الأمثل؟',
          'الألعاب الإلكترونية: تسلية أم إدمان؟'
        ],
        en: [
          'Social Media: Pros and Cons',
          'Working from Home: Is it the Future of Work?',
          'Artificial Intelligence: Opportunity or Threat?',
          'Blended Learning: The Optimal Solution?',
          'Video Games: Entertainment or Addiction?'
        ]
      }
    }
  ];

  // Theme styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return {
          bg: 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900',
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

  // Play sound effect
  const playSound = (type: 'click' | 'success') => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'click':
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        break;
      case 'success':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        break;
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  // Handle practice topic selection
  const handlePracticeTopicSelect = (textType: string, topic: string) => {
    playSound('success');
    onNavigateToWriting(textType, topic);
  };

  // Get text types for current section
  const getCurrentSectionTextTypes = () => {
    if (activeSection === 'essays-letters') {
      return textTypes.filter(type => ['essay', 'letter', 'discussion'].includes(type.id));
    } else {
      return textTypes.filter(type => ['description', 'narrative'].includes(type.id));
    }
  };

  return (
    <div className={`fixed inset-0 ${themeStyles.bg} z-50 overflow-auto ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <div className={`${themeStyles.cardBg} backdrop-blur-md border-b ${themeStyles.border} px-6 py-4 sticky top-0 z-10`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center animate-pulse">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                {language === 'ar' ? 'دليل أنواع النصوص' : 'Text Types Guide'}
              </h1>
              <p className={`text-sm ${themeStyles.textSecondary}`}>
                {language === 'ar' ? 'تعلم خصائص وأساليب كتابة أنواع النصوص المختلفة' : 'Learn characteristics and writing styles of different text types'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                soundEnabled 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : `${themeStyles.textSecondary} hover:bg-gray-100`
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className={`p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 ${themeStyles.textSecondary}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => {
              setActiveSection('essays-letters');
              setSelectedTextType(null);
              playSound('click');
            }}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeSection === 'essays-letters'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : `${themeStyles.cardBg} ${themeStyles.textPrimary} hover:bg-gray-100`
            }`}
          >
            {language === 'ar' ? 'المقال والرسالة والنقاش' : 'Essays, Letters & Discussions'}
          </button>
          <button
            onClick={() => {
              setActiveSection('creative-texts');
              setSelectedTextType(null);
              playSound('click');
            }}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeSection === 'creative-texts'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                : `${themeStyles.cardBg} ${themeStyles.textPrimary} hover:bg-gray-100`
            }`}
          >
            {language === 'ar' ? 'الوصف والسرد' : 'Description & Narrative'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {!selectedTextType ? (
          /* Text Types Overview */
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold ${themeStyles.textPrimary} mb-4`}>
                {activeSection === 'essays-letters' 
                  ? (language === 'ar' ? 'المقال والرسالة والنقاش' : 'Essays, Letters & Discussions')
                  : (language === 'ar' ? 'الوصف والسرد' : 'Description & Narrative')
                }
              </h2>
              <p className={`text-lg ${themeStyles.textSecondary} max-w-3xl mx-auto`}>
                {language === 'ar' 
                  ? 'اكتشف خصائص وأساليب كتابة أنواع النصوص المختلفة مع أمثلة تطبيقية وتمارين عملية'
                  : 'Discover characteristics and writing styles of different text types with practical examples and exercises'
                }
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8`}>
              {getCurrentSectionTextTypes().map((textType) => {
                const Icon = textType.icon;
                return (
                  <div 
                    key={textType.id}
                    onClick={() => {
                      setSelectedTextType(textType.id);
                      playSound('click');
                    }}
                    className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`}
                  >
                    <div className={`p-6 bg-gradient-to-r ${textType.color} text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="w-12 h-12" />
                        <Sparkles className="w-6 h-6 opacity-70" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{textType.name[language]}</h3>
                      <p className="text-sm opacity-90">
                        {language === 'ar' ? 'انقر للتعرف على التفاصيل' : 'Click to learn more'}
                      </p>
                    </div>
                    
                    <div className="p-6">
                      <h4 className={`font-semibold ${themeStyles.textPrimary} mb-3`}>
                        {language === 'ar' ? 'الخصائص الرئيسية:' : 'Key Characteristics:'}
                      </h4>
                      <ul className="space-y-2">
                        {textType.characteristics[language].slice(0, 3).map((characteristic, index) => (
                          <li key={index} className={`flex items-start space-x-2 text-sm ${themeStyles.textSecondary}`}>
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{characteristic}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <span className={`text-xs ${themeStyles.textSecondary}`}>
                          {textType.practiceTopics[language].length} {language === 'ar' ? 'موضوع للتدرب' : 'practice topics'}
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Detailed Text Type View */
          (() => {
            const textType = textTypes.find(t => t.id === selectedTextType);
            if (!textType) return null;
            
            const Icon = textType.icon;
            
            return (
              <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                  onClick={() => {
                    setSelectedTextType(null);
                    playSound('click');
                  }}
                  className={`mb-6 flex items-center space-x-2 px-4 py-2 ${themeStyles.cardBg} rounded-lg hover:bg-gray-100 transition-colors duration-200`}
                >
                  {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                  <span className={themeStyles.textSecondary}>
                    {language === 'ar' ? 'العودة للقائمة' : 'Back to List'}
                  </span>
                </button>

                {/* Text Type Header */}
                <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} overflow-hidden mb-8`}>
                  <div className={`p-8 bg-gradient-to-r ${textType.color} text-white`}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{textType.name[language]}</h1>
                        <p className="text-lg opacity-90">{textType.purpose[language]}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white/10 rounded-xl p-4">
                        <h3 className="font-semibold mb-2">{language === 'ar' ? 'الجمهور المستهدف' : 'Target Audience'}</h3>
                        <p className="text-sm opacity-90">{textType.audience[language]}</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <h3 className="font-semibold mb-2">{language === 'ar' ? 'الهدف' : 'Purpose'}</h3>
                        <p className="text-sm opacity-90">{textType.purpose[language]}</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <h3 className="font-semibold mb-2">{language === 'ar' ? 'نوع اللغة' : 'Language Style'}</h3>
                        <p className="text-sm opacity-90">{textType.language[language]}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Characteristics & Structure */}
                  <div className="space-y-6">
                    {/* Characteristics */}
                    <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} p-6`}>
                      <h3 className={`text-xl font-bold ${themeStyles.textPrimary} mb-4 flex items-center`}>
                        <Target className="w-6 h-6 mr-2 text-blue-600" />
                        {language === 'ar' ? 'الخصائص والأسلوب' : 'Characteristics & Style'}
                      </h3>
                      <ul className="space-y-3">
                        {textType.characteristics[language].map((characteristic, index) => (
                          <li key={index} className={`flex items-start space-x-3 ${themeStyles.textSecondary}`}>
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{characteristic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Structure */}
                    <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} p-6`}>
                      <h3 className={`text-xl font-bold ${themeStyles.textPrimary} mb-4 flex items-center`}>
                        <Brain className="w-6 h-6 mr-2 text-purple-600" />
                        {textType.structure.title[language]}
                      </h3>
                      <div className="space-y-4">
                        {textType.structure.parts.map((part, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className={`font-semibold ${themeStyles.textPrimary} mb-1`}>
                                {part.name[language]}
                              </h4>
                              <p className={`text-sm ${themeStyles.textSecondary}`}>
                                {part.description[language]}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Example & Practice Topics */}
                  <div className="space-y-6">
                    {/* Example */}
                    <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} p-6`}>
                      <h3 className={`text-xl font-bold ${themeStyles.textPrimary} mb-4 flex items-center`}>
                        <FileText className="w-6 h-6 mr-2 text-green-600" />
                        {language === 'ar' ? 'مثال تطبيقي (150-250 كلمة)' : 'Practical Example (150-250 words)'}
                      </h3>
                      <div className={`bg-gray-50 rounded-xl p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <div className={`text-sm leading-relaxed ${themeStyles.textPrimary} whitespace-pre-line`}>
                          {textType.example[language]}
                        </div>
                      </div>
                    </div>

                    {/* Practice Topics */}
                    <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} p-6`}>
                      <h3 className={`text-xl font-bold ${themeStyles.textPrimary} mb-4 flex items-center`}>
                        <Lightbulb className="w-6 h-6 mr-2 text-yellow-600" />
                        {language === 'ar' ? 'عناوين مقترحة للتدرب' : 'Suggested Practice Topics'}
                      </h3>
                      <div className="space-y-3">
                        {textType.practiceTopics[language].map((topic, index) => (
                          <button
                            key={index}
                            onClick={() => handlePracticeTopicSelect(textType.id, topic)}
                            className={`w-full text-left p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group ${themeStyles.textPrimary}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                  {index + 1}
                                </div>
                                <span className="font-medium">{topic}</span>
                              </div>
                              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <PenTool className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-blue-600 font-medium">
                                  {language === 'ar' ? 'ابدأ الكتابة' : 'Start Writing'}
                                </span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-blue-800">
                            {language === 'ar' ? 'ميزات الكتابة التفاعلية' : 'Interactive Writing Features'}
                          </span>
                        </div>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>✅ {language === 'ar' ? 'توليد أفكار أولية تلقائياً' : 'Automatic initial idea generation'}</li>
                          <li>✅ {language === 'ar' ? 'اقتراحات ذكية أثناء الكتابة' : 'Smart suggestions while writing'}</li>
                          <li>✅ {language === 'ar' ? 'مراجعة بناء النص وتحليله' : 'Text structure review and analysis'}</li>
                          <li>✅ {language === 'ar' ? 'تغذية راجعة فورية ومفصلة' : 'Instant detailed feedback'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
};

export default TextTypesGuide;