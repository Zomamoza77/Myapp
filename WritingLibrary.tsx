import React, { useState, useEffect } from 'react';
import { 
  X, Search, Filter, BookOpen, Clock, Star, TrendingUp, 
  Globe, Heart, Leaf, Plane, Dumbbell, Smartphone, 
  ChevronRight, Play, Pause, Volume2, VolumeX, 
  RotateCcw, CheckCircle, Award, Target, Brain,
  Sparkles, Eye, ThumbsUp, MessageSquare, Share2
} from 'lucide-react';
import ArticleReader from './ArticleReader';
import { useLanguage } from '../contexts/LanguageContext';

interface WritingLibraryProps {
  onClose: () => void;
  language?: 'ar' | 'en';
  theme?: 'light' | 'dark' | 'teal';
}

interface Article {
  id: string;
  title: { ar: string; en: string };
  content: { ar: string; en: string };
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  readingTime: number;
  difficulty: number;
  tags: string[];
  views: number;
  likes: number;
  dateAdded: string;
}

interface Category {
  id: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  icon: React.ComponentType<any>;
  color: string;
  articleCount: number;
}

const WritingLibrary: React.FC<WritingLibraryProps> = ({ 
  onClose, 
  language = 'en',
  theme = 'teal'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [readingSpeed, setReadingSpeed] = useState(200); // WPM

  const { isRTL } = useLanguage();

  // Categories with AI-generated content
  const categories: Category[] = [
    {
      id: 'technology',
      name: { ar: 'التكنولوجيا', en: 'Technology' },
      description: { ar: 'أحدث التطورات في عالم التقنية والذكاء الاصطناعي', en: 'Latest developments in technology and AI' },
      icon: Smartphone,
      color: 'from-blue-500 to-cyan-500',
      articleCount: 24
    },
    {
      id: 'health',
      name: { ar: 'الصحة', en: 'Health' },
      description: { ar: 'نصائح ومعلومات حول الصحة والعافية', en: 'Tips and information about health and wellness' },
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      articleCount: 18
    },
    {
      id: 'fitness',
      name: { ar: 'الرياضة والجمال', en: 'Fitness & Beauty' },
      description: { ar: 'تمارين رياضية ونصائح للجمال والعناية الشخصية', en: 'Exercise routines and beauty tips' },
      icon: Dumbbell,
      color: 'from-orange-500 to-red-500',
      articleCount: 15
    },
    {
      id: 'travel',
      name: { ar: 'السفر والسياحة', en: 'Travel & Tourism' },
      description: { ar: 'وجهات سياحية ونصائح للمسافرين', en: 'Tourist destinations and travel tips' },
      icon: Plane,
      color: 'from-purple-500 to-indigo-500',
      articleCount: 21
    },
    {
      id: 'environment',
      name: { ar: 'البيئة', en: 'Environment' },
      description: { ar: 'قضايا بيئية وحلول للحفاظ على كوكبنا', en: 'Environmental issues and solutions for our planet' },
      icon: Leaf,
      color: 'from-green-500 to-emerald-500',
      articleCount: 12
    },
    {
      id: 'culture',
      name: { ar: 'العادات والتقاليد', en: 'Culture & Traditions' },
      description: { ar: 'تراث وثقافات الشعوب حول العالم', en: 'Heritage and cultures from around the world' },
      icon: Globe,
      color: 'from-yellow-500 to-orange-500',
      articleCount: 19
    }
  ];

  // Sample articles with AI-generated content
  const articles: Article[] = [
    {
      id: 'tech-1',
      title: { 
        ar: 'مستقبل الذكاء الاصطناعي في التعليم', 
        en: 'The Future of AI in Education' 
      },
      content: {
        ar: `يشهد عالم التعليم تطورات مذهلة مع دخول تقنيات الذكاء الاصطناعي. هذه التقنيات تعد بثورة حقيقية في طرق التعلم والتعليم.

الذكاء الاصطناعي يمكنه تخصيص التعليم لكل طالب بناءً على قدراته واحتياجاته الفردية. فبدلاً من النهج التقليدي الموحد، يمكن للنظم الذكية تحليل أداء الطالب وتقديم محتوى مناسب لمستواه.

كما تساعد هذه التقنيات المعلمين في تقييم الطلاب بطريقة أكثر دقة وسرعة. يمكن للذكاء الاصطناعي تحليل إجابات الطلاب وتقديم تغذية راجعة فورية ومفيدة.

في المستقبل القريب، نتوقع أن نرى فصولاً دراسية ذكية تتفاعل مع الطلاب وتتكيف مع احتياجاتهم في الوقت الفعلي. هذا سيجعل التعليم أكثر فعالية ومتعة للجميع.`,
        en: `The world of education is witnessing amazing developments with the introduction of artificial intelligence technologies. These technologies promise a real revolution in learning and teaching methods.

AI can personalize education for each student based on their individual abilities and needs. Instead of the traditional one-size-fits-all approach, intelligent systems can analyze student performance and provide content appropriate to their level.

These technologies also help teachers evaluate students more accurately and quickly. AI can analyze student responses and provide immediate and useful feedback.

In the near future, we expect to see smart classrooms that interact with students and adapt to their needs in real time. This will make education more effective and enjoyable for everyone.`
      },
      category: 'technology',
      level: 'intermediate',
      readingTime: 3,
      difficulty: 6,
      tags: ['AI', 'Education', 'Future', 'Technology'],
      views: 1247,
      likes: 89,
      dateAdded: '2025-01-15'
    },
    {
      id: 'health-1',
      title: { 
        ar: 'أهمية النوم الصحي للجسم والعقل', 
        en: 'The Importance of Healthy Sleep for Body and Mind' 
      },
      content: {
        ar: `النوم ليس مجرد فترة راحة، بل هو عملية حيوية ضرورية لصحة الجسم والعقل. خلال النوم، يقوم الجسم بإصلاح الأنسجة وتقوية جهاز المناعة.

يحتاج البالغون إلى 7-9 ساعات من النوم يومياً للحصول على الراحة الكافية. قلة النوم تؤثر على التركيز والذاكرة والمزاج العام.

للحصول على نوم صحي، ينصح بتجنب الكافيين قبل النوم بساعات، وإنشاء بيئة مريحة في غرفة النوم، والحفاظ على روتين ثابت للنوم.

النوم الجيد يساعد أيضاً في تنظيم الهرمونات المسؤولة عن الشهية والنمو. لذلك، الاستثمار في نوم صحي هو استثمار في صحتك العامة.`,
        en: `Sleep is not just a period of rest, but a vital process necessary for the health of body and mind. During sleep, the body repairs tissues and strengthens the immune system.

Adults need 7-9 hours of sleep daily to get adequate rest. Lack of sleep affects concentration, memory, and overall mood.

For healthy sleep, it's recommended to avoid caffeine hours before bedtime, create a comfortable environment in the bedroom, and maintain a consistent sleep routine.

Good sleep also helps regulate hormones responsible for appetite and growth. Therefore, investing in healthy sleep is an investment in your overall health.`
      },
      category: 'health',
      level: 'beginner',
      readingTime: 2,
      difficulty: 4,
      tags: ['Sleep', 'Health', 'Wellness', 'Lifestyle'],
      views: 892,
      likes: 67,
      dateAdded: '2025-01-14'
    },
    {
      id: 'travel-1',
      title: { 
        ar: 'استكشاف جمال اليابان: رحلة عبر التاريخ والحداثة', 
        en: 'Exploring the Beauty of Japan: A Journey Through History and Modernity' 
      },
      content: {
        ar: `اليابان بلد يجمع بين التقاليد العريقة والتقنية المتطورة بطريقة فريدة. من معابد كيوتو القديمة إلى ناطحات السحاب في طوكيو، تقدم اليابان تجربة سفر لا تُنسى.

في الربيع، تزدهر أشجار الساكورا (أزهار الكرز) في جميع أنحاء البلاد، مما يخلق مناظر طبيعية خلابة. هذا الموسم يجذب ملايين الزوار من جميع أنحاء العالم.

الثقافة اليابانية تركز على الاحترام والانضباط والجمال في التفاصيل. يمكن للزوار تجربة حفل الشاي التقليدي، أو زيارة الحدائق اليابانية الهادئة، أو تذوق الطعام الياباني الأصيل.

النقل في اليابان متطور جداً، حيث تربط القطارات السريعة (الشينكانسن) المدن الرئيسية بكفاءة عالية. هذا يجعل التنقل بين المدن سهلاً ومريحاً للسياح.`,
        en: `Japan is a country that uniquely combines ancient traditions with advanced technology. From the ancient temples of Kyoto to the skyscrapers of Tokyo, Japan offers an unforgettable travel experience.

In spring, sakura (cherry blossom) trees bloom throughout the country, creating stunning landscapes. This season attracts millions of visitors from around the world.

Japanese culture focuses on respect, discipline, and beauty in details. Visitors can experience traditional tea ceremonies, visit peaceful Japanese gardens, or taste authentic Japanese cuisine.

Transportation in Japan is highly developed, with high-speed trains (Shinkansen) connecting major cities with great efficiency. This makes traveling between cities easy and comfortable for tourists.`
      },
      category: 'travel',
      level: 'advanced',
      readingTime: 4,
      difficulty: 7,
      tags: ['Japan', 'Travel', 'Culture', 'Tourism'],
      views: 1563,
      likes: 124,
      dateAdded: '2025-01-10'
    },
    {
      id: 'environment-1',
      title: { 
        ar: 'التغير المناخي: التحديات والحلول', 
        en: 'Climate Change: Challenges and Solutions' 
      },
      content: {
        ar: `يعد التغير المناخي من أكبر التحديات التي تواجه كوكبنا اليوم. ارتفاع درجات الحرارة، وذوبان الجليد، وارتفاع مستوى سطح البحر كلها علامات على تغير مناخ الأرض.

الأنشطة البشرية، مثل حرق الوقود الأحفوري وإزالة الغابات، تساهم بشكل كبير في انبعاثات غازات الاحتباس الحراري. هذه الغازات تحبس الحرارة في الغلاف الجوي، مما يؤدي إلى ارتفاع درجات الحرارة العالمية.

لمواجهة هذا التحدي، يجب علينا التحول إلى مصادر الطاقة المتجددة مثل الطاقة الشمسية وطاقة الرياح. كما يجب علينا تقليل استهلاكنا وإعادة تدوير المواد قدر الإمكان.

الحفاظ على الغابات وزراعة الأشجار يساعد أيضاً في امتصاص ثاني أكسيد الكربون من الجو. كل شخص يمكنه المساهمة في مكافحة التغير المناخي من خلال اتخاذ خيارات صديقة للبيئة في حياته اليومية.`,
        en: `Climate change is one of the biggest challenges facing our planet today. Rising temperatures, melting ice, and rising sea levels are all signs of Earth's changing climate.

Human activities, such as burning fossil fuels and deforestation, contribute significantly to greenhouse gas emissions. These gases trap heat in the atmosphere, leading to global temperature rise.

To address this challenge, we must transition to renewable energy sources such as solar and wind power. We must also reduce our consumption and recycle materials as much as possible.

Preserving forests and planting trees also helps absorb carbon dioxide from the atmosphere. Everyone can contribute to fighting climate change by making environmentally friendly choices in their daily lives.`
      },
      category: 'environment',
      level: 'intermediate',
      readingTime: 3,
      difficulty: 6,
      tags: ['Climate', 'Environment', 'Sustainability', 'Global Warming'],
      views: 1089,
      likes: 92,
      dateAdded: '2025-01-12'
    },
    {
      id: 'culture-1',
      title: { 
        ar: 'العادات والتقاليد في رمضان حول العالم', 
        en: 'Ramadan Traditions Around the World' 
      },
      content: {
        ar: `شهر رمضان هو شهر مقدس للمسلمين في جميع أنحاء العالم. ومع ذلك، تختلف العادات والتقاليد المرتبطة به من بلد لآخر، مما يعكس التنوع الثقافي الغني للعالم الإسلامي.

في مصر، يتم تزيين الشوارع بالفوانيس الملونة، وهي رمز تقليدي لرمضان. وفي المغرب، يقوم شخص يسمى "النفار" بإيقاظ الناس للسحور باستخدام طبل تقليدي.

في تركيا، يتم تقديم حلوى خاصة تسمى "جولاش" خلال رمضان. وفي إندونيسيا، يحتفل الناس بليلة القدر بزيارة المساجد وقراءة القرآن طوال الليل.

رغم هذه الاختلافات، يظل جوهر رمضان واحداً: شهر للصيام والصلاة والتأمل والعطاء. إنه وقت لتقوية الروابط العائلية والمجتمعية وتجديد الإيمان.`,
        en: `Ramadan is a sacred month for Muslims around the world. However, the customs and traditions associated with it vary from country to country, reflecting the rich cultural diversity of the Islamic world.

In Egypt, streets are decorated with colorful lanterns, a traditional symbol of Ramadan. In Morocco, a person called "Nafar" wakes people up for suhoor using a traditional drum.

In Turkey, a special sweet called "Güllaç" is served during Ramadan. In Indonesia, people celebrate Laylat al-Qadr by visiting mosques and reading the Quran throughout the night.

Despite these differences, the essence of Ramadan remains the same: a month for fasting, prayer, reflection, and giving. It's a time to strengthen family and community bonds and renew faith.`
      },
      category: 'culture',
      level: 'beginner',
      readingTime: 3,
      difficulty: 5,
      tags: ['Ramadan', 'Culture', 'Traditions', 'Islam'],
      views: 1342,
      likes: 108,
      dateAdded: '2025-01-08'
    },
    {
      id: 'tech-2',
      title: { 
        ar: 'الواقع الافتراضي: مستقبل الترفيه والتعليم', 
        en: 'Virtual Reality: The Future of Entertainment and Education' 
      },
      content: {
        ar: `الواقع الافتراضي (VR) هو تقنية تسمح للمستخدمين بالانغماس في بيئات ثلاثية الأبعاد مصممة بالكامل. باستخدام سماعات خاصة، يمكن للمستخدمين رؤية والتفاعل مع عوالم افتراضية كما لو كانوا هناك فعلياً.

في مجال الترفيه، يقدم الواقع الافتراضي تجارب غامرة للألعاب والأفلام والموسيقى. يمكن للاعبين الدخول إلى عوالم خيالية والتفاعل مع شخصيات وبيئات بطرق لم تكن ممكنة من قبل.

أما في التعليم، فيمكن للواقع الافتراضي أن يأخذ الطلاب في رحلات افتراضية إلى أماكن بعيدة أو حتى إلى فترات تاريخية مختلفة. يمكن لطلاب الطب، على سبيل المثال، ممارسة العمليات الجراحية في بيئة آمنة قبل العمل مع المرضى الحقيقيين.

مع تطور التكنولوجيا وانخفاض تكاليفها، نتوقع أن يصبح الواقع الافتراضي جزءاً أساسياً من حياتنا اليومية في المستقبل القريب.`,
        en: `Virtual Reality (VR) is a technology that allows users to immerse themselves in completely designed three-dimensional environments. Using special headsets, users can see and interact with virtual worlds as if they were actually there.

In entertainment, VR offers immersive experiences for games, movies, and music. Players can enter fantasy worlds and interact with characters and environments in ways that weren't possible before.

In education, VR can take students on virtual trips to distant places or even different historical periods. Medical students, for example, can practice surgical procedures in a safe environment before working with real patients.

As technology evolves and costs decrease, we expect VR to become an essential part of our daily lives in the near future.`
      },
      category: 'technology',
      level: 'advanced',
      readingTime: 3,
      difficulty: 7,
      tags: ['VR', 'Technology', 'Entertainment', 'Education'],
      views: 987,
      likes: 76,
      dateAdded: '2025-01-05'
    },
    {
      id: 'fitness-1',
      title: { 
        ar: 'فوائد اليوغا للصحة البدنية والعقلية', 
        en: 'Benefits of Yoga for Physical and Mental Health' 
      },
      content: {
        ar: `اليوغا هي ممارسة قديمة تجمع بين التمارين البدنية والتنفس والتأمل. على مر القرون، أثبتت فوائدها العديدة للصحة البدنية والعقلية.

من الناحية البدنية، تساعد اليوغا في تحسين المرونة والقوة والتوازن. الوضعيات المختلفة تستهدف مجموعات عضلية مختلفة، مما يؤدي إلى تحسين اللياقة البدنية الشاملة.

أما من الناحية العقلية، فإن التركيز على التنفس والتأمل في اليوغا يساعد في تقليل التوتر والقلق. العديد من الممارسين يجدون أن اليوغا تساعدهم في تحسين التركيز والنوم وتعزيز الشعور العام بالرفاهية.

يمكن لأي شخص ممارسة اليوغا، بغض النظر عن العمر أو مستوى اللياقة البدنية. هناك أنواع مختلفة من اليوغا، من الأنواع الهادئة مثل يوغا هاثا إلى الأنواع الأكثر نشاطاً مثل يوغا فينياسا.`,
        en: `Yoga is an ancient practice that combines physical exercises, breathing, and meditation. Over the centuries, it has proven its many benefits for physical and mental health.

Physically, yoga helps improve flexibility, strength, and balance. Different poses target different muscle groups, leading to improved overall fitness.

Mentally, the focus on breathing and meditation in yoga helps reduce stress and anxiety. Many practitioners find that yoga helps them improve concentration, sleep, and enhance overall well-being.

Anyone can practice yoga, regardless of age or fitness level. There are different types of yoga, from gentle types like Hatha yoga to more active types like Vinyasa yoga.`
      },
      category: 'fitness',
      level: 'beginner',
      readingTime: 2,
      difficulty: 3,
      tags: ['Yoga', 'Fitness', 'Wellness', 'Mental Health'],
      views: 1456,
      likes: 132,
      dateAdded: '2025-01-18'
    },
    {
      id: 'environment-2',
      title: { 
        ar: 'الزراعة المستدامة: مستقبل إنتاج الغذاء', 
        en: 'Sustainable Agriculture: The Future of Food Production' 
      },
      content: {
        ar: `الزراعة المستدامة هي نهج لإنتاج الغذاء يهدف إلى تلبية احتياجات المجتمع الحالية دون المساس بقدرة الأجيال القادمة على تلبية احتياجاتها. إنها تركز على الحفاظ على البيئة وتحسين كفاءة الموارد.

تشمل ممارسات الزراعة المستدامة تناوب المحاصيل، والزراعة العضوية، وإدارة المياه بكفاءة. هذه الممارسات تساعد في الحفاظ على خصوبة التربة وتقليل استخدام المواد الكيميائية الضارة.

المزارعون الذين يتبنون الزراعة المستدامة غالباً ما يجدون أنها تؤدي إلى تحسين جودة المحاصيل وزيادة الإنتاجية على المدى الطويل. كما أنها تساعد في الحفاظ على التنوع البيولوجي وتقليل انبعاثات غازات الاحتباس الحراري.

مع تزايد سكان العالم، تصبح الزراعة المستدامة أكثر أهمية من أي وقت مضى. إنها ليست مجرد خيار بيئي، بل ضرورة لضمان الأمن الغذائي للأجيال القادمة.`,
        en: `Sustainable agriculture is an approach to food production that aims to meet society's current needs without compromising the ability of future generations to meet their needs. It focuses on preserving the environment and improving resource efficiency.

Sustainable farming practices include crop rotation, organic farming, and efficient water management. These practices help maintain soil fertility and reduce the use of harmful chemicals.

Farmers who adopt sustainable agriculture often find that it leads to improved crop quality and increased productivity in the long term. It also helps preserve biodiversity and reduce greenhouse gas emissions.

As the world's population grows, sustainable agriculture becomes more important than ever. It's not just an environmental choice, but a necessity to ensure food security for future generations.`
      },
      category: 'environment',
      level: 'expert',
      readingTime: 4,
      difficulty: 8,
      tags: ['Agriculture', 'Sustainability', 'Food', 'Environment'],
      views: 876,
      likes: 64,
      dateAdded: '2025-01-03'
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

  // Filter articles based on search, category, and level
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content[language].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    const matchesLevel = selectedLevel ? article.level === selectedLevel : true;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Get level label
  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return language === 'ar' ? 'مبتدئ' : 'Beginner';
      case 'intermediate':
        return language === 'ar' ? 'متوسط' : 'Intermediate';
      case 'advanced':
        return language === 'ar' ? 'متقدم' : 'Advanced';
      case 'expert':
        return language === 'ar' ? 'متميز' : 'Expert';
      default:
        return level;
    }
  };

  // Get level color
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-blue-100 text-blue-700';
      case 'advanced':
        return 'bg-purple-100 text-purple-700';
      case 'expert':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Simulate reading progress
  useEffect(() => {
    if (isReading && selectedArticle) {
      const interval = setInterval(() => {
        setReadingProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsReading(false);
            return 100;
          }
          return newProgress;
        });
      }, (selectedArticle.readingTime * 60 * 1000) / 100);
      
      return () => clearInterval(interval);
    }
  }, [isReading, selectedArticle]);

  if (selectedArticle) {
    return (
      <ArticleReader
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        language={language}
        theme={theme}
      />
    );
  }

  return (
    <div className={`fixed inset-0 ${themeStyles.bg} z-50 overflow-auto ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <div className={`${themeStyles.cardBg} backdrop-blur-md border-b ${themeStyles.border} px-6 py-4 sticky top-0 z-10`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${
              theme === 'teal' ? 'from-teal-500 to-emerald-600' : 'from-blue-600 to-purple-600'
            } rounded-xl flex items-center justify-center`}>
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                {language === 'ar' ? 'مكتبة القراءة' : 'Reading Library'}
              </h1>
              <p className={`text-sm ${themeStyles.textSecondary}`}>
                {language === 'ar' ? 'استكشف مواضيع متنوعة وحسن مهاراتك في القراءة' : 'Explore diverse topics and improve your reading skills'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                soundEnabled 
                  ? theme === 'teal' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'
                  : `${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`
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
      </div>

      <div className="flex">
        {/* Categories Sidebar */}
        <div className={`w-80 ${themeStyles.cardBg} backdrop-blur-md border-r ${themeStyles.border} p-6 overflow-y-auto`}>
          <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-4`}>
            {language === 'ar' ? 'المحاور' : 'Categories'}
          </h3>
          
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setSelectedCategory('')}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                selectedCategory === '' 
                  ? `bg-gradient-to-r from-blue-500 to-purple-600 text-white` 
                  : `${themeStyles.cardBg} border ${themeStyles.border} hover:bg-gray-50`
              }`}
            >
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5" />
                <span className="font-medium">
                  {language === 'ar' ? 'جميع المحاور' : 'All Categories'}
                </span>
              </div>
            </button>
            
            {categories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                    selectedCategory === category.id 
                      ? `bg-gradient-to-r ${category.color} text-white` 
                      : `${themeStyles.cardBg} border ${themeStyles.border} hover:bg-gray-50`
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CategoryIcon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{category.name[language]}</div>
                      <div className="text-xs opacity-80">{category.articleCount} {language === 'ar' ? 'مقال' : 'articles'}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-4`}>
            {language === 'ar' ? 'المستوى' : 'Level'}
          </h3>
          
          <div className="space-y-2">
            <button
              onClick={() => setSelectedLevel('')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedLevel === '' 
                  ? 'bg-gray-200 font-medium' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {language === 'ar' ? 'جميع المستويات' : 'All Levels'}
            </button>
            <button
              onClick={() => setSelectedLevel('beginner')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedLevel === 'beginner' 
                  ? 'bg-green-100 text-green-700 font-medium' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {language === 'ar' ? 'مبتدئ' : 'Beginner'}
            </button>
            <button
              onClick={() => setSelectedLevel('intermediate')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedLevel === 'intermediate' 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {language === 'ar' ? 'متوسط' : 'Intermediate'}
            </button>
            <button
              onClick={() => setSelectedLevel('advanced')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedLevel === 'advanced' 
                  ? 'bg-purple-100 text-purple-700 font-medium' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {language === 'ar' ? 'متقدم' : 'Advanced'}
            </button>
            <button
              onClick={() => setSelectedLevel('expert')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedLevel === 'expert' 
                  ? 'bg-red-100 text-red-700 font-medium' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {language === 'ar' ? 'متميز' : 'Expert'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'ar' ? 'ابحث عن مقالات...' : 'Search articles...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => {
              const category = categories.find(c => c.id === article.category);
              return (
                <div 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className={`${themeStyles.cardBg} rounded-xl border ${themeStyles.border} overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`}
                >
                  {/* Article Header */}
                  <div className={`bg-gradient-to-r ${category?.color || 'from-gray-500 to-gray-600'} p-4 text-white`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {category && <category.icon className="w-4 h-4" />}
                      <span className="text-sm font-medium">{category?.name[language]}</span>
                    </div>
                    <h3 className="text-lg font-bold line-clamp-2">{article.title[language]}</h3>
                  </div>
                  
                  {/* Article Preview */}
                  <div className="p-4">
                    <p className={`${themeStyles.textSecondary} text-sm mb-4 line-clamp-3`}>
                      {article.content[language].split('\n')[0]}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(article.level)}`}>
                        {getLevelLabel(article.level)}
                      </span>
                      <span className={`flex items-center text-xs ${themeStyles.textSecondary}`}>
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readingTime} min
                      </span>
                      <span className={`flex items-center text-xs ${themeStyles.textSecondary}`}>
                        <Star className="w-3 h-3 mr-1 text-yellow-500" />
                        {article.difficulty / 2}/5
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <span className={`flex items-center text-xs ${themeStyles.textSecondary}`}>
                          <Eye className="w-3 h-3 mr-1" />
                          {article.views}
                        </span>
                        <span className={`flex items-center text-xs ${themeStyles.textSecondary}`}>
                          <Heart className="w-3 h-3 mr-1" />
                          {article.likes}
                        </span>
                      </div>
                      <span className={`text-xs ${themeStyles.textSecondary}`}>
                        {formatDate(article.dateAdded)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <div className={`${themeStyles.cardBg} rounded-xl border ${themeStyles.border} p-8 text-center`}>
              <div className="text-5xl mb-4">📚</div>
              <h3 className={`text-xl font-bold ${themeStyles.textPrimary} mb-2`}>
                {language === 'ar' ? 'لم يتم العثور على مقالات' : 'No Articles Found'}
              </h3>
              <p className={`${themeStyles.textSecondary} mb-4`}>
                {language === 'ar' 
                  ? 'حاول تغيير معايير البحث أو تصفح فئة مختلفة' 
                  : 'Try changing your search criteria or browse a different category'
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedLevel('');
                }}
                className={`px-4 py-2 bg-gradient-to-r ${
                  theme === 'teal' ? 'from-teal-500 to-emerald-600' : 'from-blue-500 to-purple-600'
                } text-white rounded-lg hover:shadow-lg transition-all duration-200`}
              >
                <RotateCcw className="w-4 h-4 inline mr-2" />
                {language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WritingLibrary;