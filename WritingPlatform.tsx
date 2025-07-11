import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  PenTool, Clock, Target, TrendingUp, Zap, Brain, 
  Lightbulb, BookOpen, MessageSquare, FileText, 
  Users, Sparkles, Award, Star, Heart, Coffee,
  Volume2, VolumeX, Palette, Sun, Moon, RotateCcw,
  Eye, EyeOff, Settings, HelpCircle, Globe,
  ChevronRight, Play, Pause, RefreshCw, CheckCircle,
  AlertTriangle, Info, X, Save, Download, Share2,
  Mic, MicOff, Camera, Image, Link, Paperclip,
  Send, ThumbsUp, ThumbsDown, Flag, MoreHorizontal,
  ArrowLeft, ArrowRight, ChevronLeft, ChevronDown,
  Plus, Minus, Edit3, Type, AlignLeft, AlignCenter,
  AlignRight, Bold, Italic, Underline, List, Hash,
  Quote, Code, Scissors, Copy, Clipboard, Search,
  Filter, SortAsc, SortDesc, Calendar, MapPin,
  Phone, Mail, Home, Building, Car, Plane, Ship,
  Train, Bike, Walk, Run, Smile, Frown, Meh,
  Angry, Surprised, Confused, Sleepy, Sick, Dizzy,
  Hot, Cold, Sunny, Cloudy, Rainy, Snowy, Windy,
  Stormy, Foggy, Rainbow, Umbrella, Snowflake,
  Droplets, Waves, Fire, Leaf, Tree, Flower,
  Butterfly, Bird, Cat, Dog, Fish, Rabbit, Bear,
  Lion, Tiger, Elephant, Monkey, Panda, Koala,
  Penguin, Owl, Eagle, Dove, Peacock, Swan, Duck,
  Chicken, Pig, Cow, Horse, Sheep, Goat, Deer,
  Fox, Wolf, Hedgehog, Squirrel, Mouse, Hamster,
  Turtle, Frog, Snake, Lizard, Crocodile, Shark,
  Whale, Dolphin, Octopus, Jellyfish, Starfish,
  Crab, Lobster, Shrimp, Snail, Worm, Bee, Ant,
  Spider, Ladybug, Dragonfly, Mosquito, Fly,
  Apple, Banana, Orange, Grape, Strawberry,
  Cherry, Peach, Pear, Pineapple, Watermelon,
  Lemon, Lime, Coconut, Avocado, Tomato, Carrot,
  Potato, Onion, Garlic, Pepper, Cucumber, Lettuce,
  Broccoli, Corn, Mushroom, Eggplant, Radish,
  Bread, Cheese, Milk, Egg, Meat, Chicken as ChickenFood,
  Fish as FishFood, Rice, Pasta, Pizza, Burger,
  Sandwich, Salad, Soup, Cake, Cookie, Candy,
  Chocolate, Ice, Coffee as CoffeeFood, Tea, Juice,
  Water, Wine, Beer, Cocktail, Soda, Energy,
  Vitamin, Medicine, Bandage, Thermometer,
  Stethoscope, Syringe, Pill, Capsule, Tablet,
  Glasses, Sunglasses, Hat, Cap, Helmet, Crown,
  Tie, Shirt, Pants, Dress, Skirt, Shoes, Boots,
  Sneakers, Sandals, Socks, Gloves, Scarf, Jacket,
  Coat, Sweater, Hoodie, Jeans, Shorts, Bikini,
  Swimsuit, Underwear, Bra, Pajamas, Robe, Uniform,
  Suit, Tuxedo, Wedding, Ring, Necklace, Earrings,
  Bracelet, Watch, Wallet, Purse, Bag, Backpack,
  Suitcase, Umbrella as UmbrellaItem, Key, Lock,
  Door, Window, Roof, Chimney, Fence, Gate, Garden,
  Garage, Basement, Attic, Kitchen, Bathroom,
  Bedroom, Living, Dining, Office, Library, School,
  Hospital, Bank, Store, Restaurant, Hotel, Church,
  Mosque, Temple, Museum, Theater, Cinema, Stadium,
  Park, Beach, Mountain, Forest, Desert, Island,
  River, Lake, Ocean, Sea, Waterfall, Cave, Valley,
  Hill, Volcano, Earthquake, Tornado, Hurricane,
  Flood, Drought, Wildfire, Avalanche, Landslide,
  Tsunami, Meteor, Comet, Planet, Star as StarSpace,
  Moon as MoonSpace, Sun as SunSpace, Galaxy,
  Universe, Alien, Robot, Spaceship, Rocket,
  Satellite, Telescope, Microscope, Computer,
  Laptop, Tablet as TabletDevice, Phone as PhoneDevice, Camera as CameraDevice,
  Television, Radio, Speaker, Headphones, Microphone,
  Keyboard, Mouse as MouseDevice, Monitor, Printer,
  Scanner, Fax, Projector, Calculator, Clock as ClockDevice,
  Watch as WatchDevice, Alarm, Timer, Stopwatch,
  Calendar as CalendarDevice, Schedule, Appointment,
  Meeting, Conference, Presentation, Lecture,
  Seminar, Factory, Machine, Engine,
  Motor, Generator, Battery, Solar, Wind, Water as WaterPower,
  Gas, Oil, Coal, Nuclear, Electric, Magnetic,
  Gravity, Force, Energy as EnergyItem, Power, Voltage,
  Current, Resistance, Circuit, Wire as WireItem, Cable as CableItem,
  Fiber, Network, Internet, Wifi, Bluetooth,
  Signal, Antenna, Tower, Satellite as SatelliteItem,
  Radar, Sonar, Laser, Led, Bulb, Lamp, Light,
  Candle, Torch, Flashlight, Lantern, Spotlight,
  Projector as ProjectorItem, Screen, Display, Monitor as MonitorItem,
  Television as TelevisionItem, Radio as RadioItem, Speaker as SpeakerItem,
  Amplifier, Mixer, Equalizer, Synthesizer, Piano,
  Guitar, Violin, Drums, Trumpet, Saxophone, Flute,
  Harmonica, Accordion, Harp, Banjo, Ukulele, Mandolin,
  Cello, Bass, Tuba, Horn, Clarinet, Oboe, Bassoon,
  Piccolo, Recorder, Whistle, Bell as BellItem, Chime,
  Gong, Cymbal, Triangle, Tambourine, Maracas,
  Castanets, Clapper, Rattle, Shaker, Drum, Bongo,
  Conga, Timpani, Xylophone, Vibraphone, Marimba,
  Glockenspiel, Celesta, Harpsichord, Organ, Accordion as AccordionItem,
  Harmonica as HarmonicaItem, Bagpipe, Didgeridoo,
  Kazoo, Ocarina, Pan, Flute as FluteItem, Shakuhachi,
  Erhu, Sitar, Tabla, Djembe, Cajon, Hang, Steel,
  Kalimba, Rain, Stick, Thunder, Sheet, Ocean as OceanItem,
  Drum as DrumItem, Wind as WindItem, Chime as ChimeItem, Bird as BirdItem,
  Cricket as CricketItem, Frog as FrogItem, Whale as WhaleItem,
  Wolf as WolfItem, Lion as LionItem, Elephant as ElephantItem,
  Monkey as MonkeyItem, Dog as DogItem, Cat as CatItem,
  Horse as HorseItem, Cow as CowItem, Pig as PigItem,
  Sheep as SheepItem, Goat as GoatItem, Chicken as ChickenItem,
  Duck as DuckItem, Goose, Turkey, Peacock as PeacockItem,
  Swan as SwanItem, Flamingo, Pelican, Seagull, Crow,
  Raven, Magpie, Jay, Cardinal, Robin, Sparrow,
  Finch, Canary, Parrot, Cockatoo, Macaw, Toucan,
  Woodpecker, Hummingbird, Kingfisher, Stork, Crane,
  Heron, Ibis, Spoonbill, Egret, Bittern, Rail,
  Coot, Moorhen, Gallinule, Jacana, Plover, Sandpiper,
  Turnstone, Dunlin, Sanderling, Knot, Godwit,
  Curlew, Whimbrel, Snipe, Woodcock, Pheasant,
  Grouse, Ptarmigan, Quail, Partridge, Guinea,
  Fowl, Peafowl, Junglefowl, Francolin, Spurfowl
} from 'lucide-react';
import WritingAssistant from './WritingAssistant';
import InteractiveTrainingActivity from './InteractiveTrainingActivity';
import WritingLibrary from './WritingLibrary';
import WritingTimer from './WritingTimer';
import QuotationTool from './QuotationTool';
import TextTypesGuide from './TextTypesGuide';
import WritingToolsHeader from './WritingToolsHeader';
import { useLanguage } from '../contexts/LanguageContext';

interface WritingPlatformProps {
  language?: 'ar' | 'en';
}

interface WritingStats {
  wordCount: number;
  timeSpent: number;
  writingSpeed: number;
  accuracy: number;
  suggestions: number;
}

interface Suggestion {
  id: string;
  text: string;
  type: 'connector' | 'punctuation' | 'style' | 'prediction';
  position: number;
  confidence: number;
}

interface KeywordSuggestion {
  id: string;
  word: string;
  category: 'main' | 'supporting' | 'descriptive';
  relevance: number;
}

interface ContentIdea {
  id: string;
  title: string;
  description: string;
  wordCount: number;
  order: number;
}

const WritingPlatform: React.FC<WritingPlatformProps> = ({ language: propLanguage }) => {
  const { language: contextLanguage, isRTL, t } = useLanguage();
  const language = propLanguage || contextLanguage;
  
  const [content, setContent] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [stats, setStats] = useState<WritingStats>({
    wordCount: 0,
    timeSpent: 0,
    writingSpeed: 0,
    accuracy: 95,
    suggestions: 0
  });
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionPosition, setSuggestionPosition] = useState({ x: 0, y: 0 });
  const [currentSuggestion, setCurrentSuggestion] = useState<Suggestion | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark' | 'teal'>('teal');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTrainingActivity, setShowTrainingActivity] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [textTitle, setTextTitle] = useState('');
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [keywordSuggestions, setKeywordSuggestions] = useState<KeywordSuggestion[]>([]);
  const [showKeywords, setShowKeywords] = useState(false);
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [showContentHelper, setShowContentHelper] = useState(false);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [showTextTypesGuide, setShowTextTypesGuide] = useState(false);
  const [showQuotationTool, setShowQuotationTool] = useState(false);
  const [grade, setGrade] = useState<number | undefined>(8.5);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Writing styles with enhanced descriptions
  const writingStyles = [
    {
      id: 'report',
      name: { ar: 'التقرير', en: 'Report' },
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      description: { 
        ar: 'نص موضوعي يعرض معلومات وحقائق بطريقة منظمة ومنطقية',
        en: 'Objective text presenting information and facts in an organized, logical manner'
      }
    },
    {
      id: 'letter',
      name: { ar: 'الرسالة', en: 'Letter' },
      icon: MessageSquare,
      color: 'from-green-500 to-green-600',
      description: { 
        ar: 'تواصل شخصي أو رسمي يحمل رسالة محددة للمتلقي',
        en: 'Personal or formal communication carrying a specific message to the recipient'
      }
    },
    {
      id: 'narrative',
      name: { ar: 'السرد', en: 'Narrative' },
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      description: { 
        ar: 'حكاية أحداث وقصص بتسلسل زمني وشخصيات متفاعلة',
        en: 'Telling events and stories with chronological sequence and interacting characters'
      }
    },
    {
      id: 'description',
      name: { ar: 'الوصف', en: 'Description' },
      icon: Eye,
      color: 'from-teal-500 to-teal-600',
      description: { 
        ar: 'تصوير دقيق للأشخاص والأماكن والأشياء بتفاصيل حسية',
        en: 'Detailed portrayal of people, places, and things with sensory details'
      }
    },
    {
      id: 'discussion',
      name: { ar: 'النقاش', en: 'Discussion' },
      icon: Users,
      color: 'from-orange-500 to-red-600',
      description: { 
        ar: 'عرض وجهات نظر متعددة حول موضوع جدلي مع الأدلة والحجج',
        en: 'Presenting multiple viewpoints on a controversial topic with evidence and arguments'
      }
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

  // Timer effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setStats(prev => ({ ...prev, timeSpent: elapsed }));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Content analysis effect
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const timeInMinutes = stats.timeSpent / 60;
    const writingSpeed = timeInMinutes > 0 ? Math.round(wordCount / timeInMinutes) : 0;

    setStats(prev => ({
      ...prev,
      wordCount,
      writingSpeed
    }));

    // Generate suggestions based on content
    if (content.length > 10) {
      generateSuggestions(content);
    }
  }, [content, stats.timeSpent]);

  // Generate AI suggestions
  const generateSuggestions = (text: string) => {
    const newSuggestions: Suggestion[] = [];
    
    // Connector suggestions
    if (text.includes('.') && !text.includes('بالإضافة') && !text.includes('furthermore')) {
      newSuggestions.push({
        id: '1',
        text: language === 'ar' ? 'بالإضافة إلى ذلك' : 'Furthermore',
        type: 'connector',
        position: text.length,
        confidence: 0.8
      });
    }

    // Style suggestions
    if (selectedStyle === 'description' && !text.includes('جميل') && !text.includes('beautiful')) {
      newSuggestions.push({
        id: '2',
        text: language === 'ar' ? 'استخدم صفات أكثر تفصيلاً' : 'Use more detailed adjectives',
        type: 'style',
        position: text.length,
        confidence: 0.7
      });
    }

    // Discussion-specific suggestions
    if (selectedStyle === 'discussion' && !text.includes('من ناحية أخرى') && !text.includes('on the other hand')) {
      newSuggestions.push({
        id: '3',
        text: language === 'ar' ? 'من ناحية أخرى' : 'On the other hand',
        type: 'connector',
        position: text.length,
        confidence: 0.9
      });
    }

    setSuggestions(newSuggestions);
    setStats(prev => ({ ...prev, suggestions: newSuggestions.length }));
  };

  // Handle text input
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    // Show predictive suggestions
    if (newContent.endsWith(' ') && newContent.length > 5) {
      showPredictiveSuggestion(e.target);
    }
  };

  // Show predictive suggestion
  const showPredictiveSuggestion = (textarea: HTMLTextAreaElement) => {
    const rect = textarea.getBoundingClientRect();
    const suggestion: Suggestion = {
      id: 'pred-1',
      text: language === 'ar' ? 'والذي يعتبر' : 'which is considered',
      type: 'prediction',
      position: content.length,
      confidence: 0.9
    };

    setCurrentSuggestion(suggestion);
    setSuggestionPosition({
      x: rect.left + 100,
      y: rect.top + 50
    });
    setShowSuggestion(true);

    setTimeout(() => setShowSuggestion(false), 3000);
  };

  // Apply suggestion
  const applySuggestion = (suggestion: Suggestion) => {
    if (suggestion.type === 'prediction') {
      setContent(prev => prev + ' ' + suggestion.text);
    }
    setShowSuggestion(false);
    
    if (soundEnabled) {
      playSound('success');
    }
  };

  // Handle quote selection
  const handleQuoteSelect = (quote: any) => {
    setContent(prev => prev + '\n\n"' + quote.text[language] + '" - ' + quote.author[language]);
    if (soundEnabled) {
      playSound('success');
    }
  };

  // Play sound effect
  const playSound = (type: 'success' | 'error' | 'notification') => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'success':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        break;
      case 'error':
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        break;
      case 'notification':
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        break;
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get writing speed status
  const getWritingSpeedStatus = () => {
    if (stats.writingSpeed >= 40) return { status: 'fast', emoji: '🐆', color: 'text-green-600' };
    if (stats.writingSpeed >= 20) return { status: 'medium', emoji: '🐱', color: 'text-yellow-600' };
    return { status: 'slow', emoji: '🐢', color: 'text-blue-600' };
  };

  // Generate title-based keywords
  const generateKeywords = async (title: string, style: string) => {
    if (!title.trim()) return;
    
    setShowKeywords(true);
    
    // Simulate AI keyword generation
    setTimeout(() => {
      const keywords: KeywordSuggestion[] = [];
      
      if (style === 'report') {
        keywords.push(
          { id: '1', word: language === 'ar' ? 'تحليل' : 'analysis', category: 'main', relevance: 0.9 },
          { id: '2', word: language === 'ar' ? 'بيانات' : 'data', category: 'main', relevance: 0.8 },
          { id: '3', word: language === 'ar' ? 'نتائج' : 'results', category: 'supporting', relevance: 0.7 },
          { id: '4', word: language === 'ar' ? 'إحصائيات' : 'statistics', category: 'supporting', relevance: 0.6 },
          { id: '5', word: language === 'ar' ? 'مفصل' : 'detailed', category: 'descriptive', relevance: 0.5 }
        );
      } else if (style === 'narrative') {
        keywords.push(
          { id: '1', word: language === 'ar' ? 'شخصيات' : 'characters', category: 'main', relevance: 0.9 },
          { id: '2', word: language === 'ar' ? 'أحداث' : 'events', category: 'main', relevance: 0.8 },
          { id: '3', word: language === 'ar' ? 'حبكة' : 'plot', category: 'supporting', relevance: 0.7 },
          { id: '4', word: language === 'ar' ? 'صراع' : 'conflict', category: 'supporting', relevance: 0.6 },
          { id: '5', word: language === 'ar' ? 'مثير' : 'exciting', category: 'descriptive', relevance: 0.5 }
        );
      } else if (style === 'description') {
        keywords.push(
          { id: '1', word: language === 'ar' ? 'تفاصيل' : 'details', category: 'main', relevance: 0.9 },
          { id: '2', word: language === 'ar' ? 'ألوان' : 'colors', category: 'main', relevance: 0.8 },
          { id: '3', word: language === 'ar' ? 'ملمس' : 'texture', category: 'supporting', relevance: 0.7 },
          { id: '4', word: language === 'ar' ? 'أصوات' : 'sounds', category: 'supporting', relevance: 0.6 },
          { id: '5', word: language === 'ar' ? 'جميل' : 'beautiful', category: 'descriptive', relevance: 0.5 }
        );
      } else if (style === 'discussion') {
        keywords.push(
          { id: '1', word: language === 'ar' ? 'وجهات نظر' : 'viewpoints', category: 'main', relevance: 0.9 },
          { id: '2', word: language === 'ar' ? 'حجج' : 'arguments', category: 'main', relevance: 0.8 },
          { id: '3', word: language === 'ar' ? 'أدلة' : 'evidence', category: 'supporting', relevance: 0.7 },
          { id: '4', word: language === 'ar' ? 'توازن' : 'balance', category: 'supporting', relevance: 0.6 },
          { id: '5', word: language === 'ar' ? 'منطقي' : 'logical', category: 'descriptive', relevance: 0.5 }
        );
      } else {
        // Generic keywords
        keywords.push(
          { id: '1', word: language === 'ar' ? 'موضوع' : 'topic', category: 'main', relevance: 0.9 },
          { id: '2', word: language === 'ar' ? 'فكرة' : 'idea', category: 'main', relevance: 0.8 },
          { id: '3', word: language === 'ar' ? 'مثال' : 'example', category: 'supporting', relevance: 0.7 },
          { id: '4', word: language === 'ar' ? 'تفسير' : 'explanation', category: 'supporting', relevance: 0.6 },
          { id: '5', word: language === 'ar' ? 'واضح' : 'clear', category: 'descriptive', relevance: 0.5 }
        );
      }
      
      // Add more keywords to reach 15+
      for (let i = 6; i <= 15; i++) {
        keywords.push({
          id: i.toString(),
          word: language === 'ar' ? `كلمة ${i}` : `word ${i}`,
          category: i % 3 === 0 ? 'main' : i % 2 === 0 ? 'supporting' : 'descriptive',
          relevance: Math.max(0.3, 1 - (i * 0.05))
        });
      }
      
      setKeywordSuggestions(keywords);
    }, 1000);
  };

  // Generate content ideas
  const generateContentIdeas = async () => {
    if (!selectedStyle || !textTitle.trim()) {
      alert(language === 'ar' ? 'يرجى اختيار نوع النص وكتابة العنوان أولاً' : 'Please select text type and enter title first');
      return;
    }
    
    setIsGeneratingIdeas(true);
    setShowContentHelper(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const ideas: ContentIdea[] = [];
      const totalWords = 300; // Default target
      
      if (selectedStyle === 'report') {
        ideas.push(
          {
            id: '1',
            title: language === 'ar' ? 'المقدمة وتعريف الموضوع' : 'Introduction and Topic Definition',
            description: language === 'ar' ? 'تقديم الموضوع وأهميته وأهداف التقرير' : 'Present the topic, its importance, and report objectives',
            wordCount: Math.round(totalWords * 0.15),
            order: 1
          },
          {
            id: '2',
            title: language === 'ar' ? 'عرض البيانات والحقائق' : 'Data and Facts Presentation',
            description: language === 'ar' ? 'تقديم المعلومات والإحصائيات المتعلقة بالموضوع' : 'Present information and statistics related to the topic',
            wordCount: Math.round(totalWords * 0.4),
            order: 2
          },
          {
            id: '3',
            title: language === 'ar' ? 'التحليل والمناقشة' : 'Analysis and Discussion',
            description: language === 'ar' ? 'تحليل البيانات ومناقشة النتائج والاستنتاجات' : 'Analyze data and discuss results and conclusions',
            wordCount: Math.round(totalWords * 0.3),
            order: 3
          },
          {
            id: '4',
            title: language === 'ar' ? 'الخلاصة والتوصيات' : 'Conclusion and Recommendations',
            description: language === 'ar' ? 'تلخيص النتائج وتقديم التوصيات' : 'Summarize results and provide recommendations',
            wordCount: Math.round(totalWords * 0.15),
            order: 4
          }
        );
      } else if (selectedStyle === 'narrative') {
        ideas.push(
          {
            id: '1',
            title: language === 'ar' ? 'البداية وتقديم الشخصيات' : 'Beginning and Character Introduction',
            description: language === 'ar' ? 'تقديم الشخصيات الرئيسية والمكان والزمان' : 'Introduce main characters, setting, and time',
            wordCount: Math.round(totalWords * 0.2),
            order: 1
          },
          {
            id: '2',
            title: language === 'ar' ? 'تطوير الأحداث' : 'Plot Development',
            description: language === 'ar' ? 'تطوير القصة وبناء التشويق' : 'Develop the story and build suspense',
            wordCount: Math.round(totalWords * 0.3),
            order: 2
          },
          {
            id: '3',
            title: language === 'ar' ? 'الذروة والصراع' : 'Climax and Conflict',
            description: language === 'ar' ? 'الوصول لذروة الأحداث والصراع الرئيسي' : 'Reach the climax and main conflict',
            wordCount: Math.round(totalWords * 0.3),
            order: 3
          },
          {
            id: '4',
            title: language === 'ar' ? 'الحل والخاتمة' : 'Resolution and Ending',
            description: language === 'ar' ? 'حل الصراع وإنهاء القصة بطريقة مرضية' : 'Resolve conflict and end story satisfactorily',
            wordCount: Math.round(totalWords * 0.2),
            order: 4
          }
        );
      } else if (selectedStyle === 'description') {
        ideas.push(
          {
            id: '1',
            title: language === 'ar' ? 'الانطباع العام' : 'General Impression',
            description: language === 'ar' ? 'وصف الانطباع الأول والشعور العام' : 'Describe first impression and general feeling',
            wordCount: Math.round(totalWords * 0.2),
            order: 1
          },
          {
            id: '2',
            title: language === 'ar' ? 'التفاصيل البصرية' : 'Visual Details',
            description: language === 'ar' ? 'وصف الألوان والأشكال والأحجام' : 'Describe colors, shapes, and sizes',
            wordCount: Math.round(totalWords * 0.3),
            order: 2
          },
          {
            id: '3',
            title: language === 'ar' ? 'التفاصيل الحسية' : 'Sensory Details',
            description: language === 'ar' ? 'وصف الأصوات والروائح والملمس' : 'Describe sounds, smells, and textures',
            wordCount: Math.round(totalWords * 0.3),
            order: 3
          },
          {
            id: '4',
            title: language === 'ar' ? 'الخلاصة والتأثير' : 'Summary and Impact',
            description: language === 'ar' ? 'تلخيص الوصف والتأثير النهائي' : 'Summarize description and final impact',
            wordCount: Math.round(totalWords * 0.2),
            order: 4
          }
        );
      } else if (selectedStyle === 'discussion') {
        ideas.push(
          {
            id: '1',
            title: language === 'ar' ? 'تقديم الموضوع' : 'Topic Introduction',
            description: language === 'ar' ? 'عرض الموضوع وأهميته وإثارة اهتمام القارئ' : 'Present the topic, its importance, and engage reader interest',
            wordCount: Math.round(totalWords * 0.15),
            order: 1
          },
          {
            id: '2',
            title: language === 'ar' ? 'وجهة النظر الأولى' : 'First Viewpoint',
            description: language === 'ar' ? 'عرض وجهة النظر الأولى مع الأدلة والحجج المؤيدة' : 'Present first viewpoint with supporting evidence and arguments',
            wordCount: Math.round(totalWords * 0.3),
            order: 2
          },
          {
            id: '3',
            title: language === 'ar' ? 'وجهة النظر المعارضة' : 'Opposing Viewpoint',
            description: language === 'ar' ? 'عرض وجهة النظر المعارضة مع الأدلة والحجج المؤيدة لها' : 'Present opposing viewpoint with supporting evidence and arguments',
            wordCount: Math.round(totalWords * 0.3),
            order: 3
          },
          {
            id: '4',
            title: language === 'ar' ? 'المناقشة والتوازن' : 'Discussion and Balance',
            description: language === 'ar' ? 'مناقشة وجهات النظر المختلفة وتقديم رؤية متوازنة' : 'Discuss different viewpoints and provide a balanced perspective',
            wordCount: Math.round(totalWords * 0.15),
            order: 4
          },
          {
            id: '5',
            title: language === 'ar' ? 'الخلاصة والاستنتاج' : 'Conclusion and Inference',
            description: language === 'ar' ? 'تلخيص النقاط الرئيسية والوصول إلى استنتاج متوازن' : 'Summarize main points and reach a balanced conclusion',
            wordCount: Math.round(totalWords * 0.1),
            order: 5
          }
        );
      } else {
        // Generic structure
        ideas.push(
          {
            id: '1',
            title: language === 'ar' ? 'المقدمة' : 'Introduction',
            description: language === 'ar' ? 'تقديم الموضوع وجذب انتباه القارئ' : 'Introduce topic and capture reader attention',
            wordCount: Math.round(totalWords * 0.2),
            order: 1
          },
          {
            id: '2',
            title: language === 'ar' ? 'النقطة الأولى' : 'First Point',
            description: language === 'ar' ? 'تطوير الفكرة الأولى بالتفصيل' : 'Develop first idea in detail',
            wordCount: Math.round(totalWords * 0.3),
            order: 2
          },
          {
            id: '3',
            title: language === 'ar' ? 'النقطة الثانية' : 'Second Point',
            description: language === 'ar' ? 'تطوير الفكرة الثانية بالأمثلة' : 'Develop second idea with examples',
            wordCount: Math.round(totalWords * 0.3),
            order: 3
          },
          {
            id: '4',
            title: language === 'ar' ? 'الخاتمة' : 'Conclusion',
            description: language === 'ar' ? 'تلخيص الأفكار والخلاصة النهائية' : 'Summarize ideas and final conclusion',
            wordCount: Math.round(totalWords * 0.2),
            order: 4
          }
        );
      }
      
      setContentIdeas(ideas);
      setIsGeneratingIdeas(false);
    }, 2000);
  };

  // Add idea to content
  const addIdeaToContent = (idea: ContentIdea) => {
    const ideaText = `\n\n${idea.title}:\n${idea.description}\n(${idea.wordCount} ${language === 'ar' ? 'كلمة تقريباً' : 'words approximately'})\n\n`;
    setContent(prev => prev + ideaText);
    
    if (soundEnabled) {
      playSound('success');
    }
  };

  // Navigate to text types guide
  const navigateToTextTypesGuide = () => {
    setShowTextTypesGuide(true);
  };

  // Handle title click
  const handleTitleClick = () => {
    setShowTitleInput(!showTitleInput);
  };

  const speedStatus = getWritingSpeedStatus();

  if (showTrainingActivity) {
    return (
      <InteractiveTrainingActivity
        onClose={() => setShowTrainingActivity(false)}
        language={language}
        theme={theme}
      />
    );
  }

  if (showLibrary) {
    return (
      <WritingLibrary
        onClose={() => setShowLibrary(false)}
        language={language}
        theme={theme}
      />
    );
  }

  if (showTextTypesGuide) {
    return (
      <TextTypesGuide
        onClose={() => setShowTextTypesGuide(false)}
        onNavigateToWriting={(textType, title) => {
          setSelectedStyle(textType);
          if (title) setTextTitle(title);
          setShowTextTypesGuide(false);
        }}
        language={language}
        theme={theme}
      />
    );
  }

  if (showQuotationTool) {
    return (
      <QuotationTool
        onClose={() => setShowQuotationTool(false)}
        onQuoteSelect={handleQuoteSelect}
        language={language}
        theme={theme}
      />
    );
  }

  return (
    <div className={`h-screen ${themeStyles.bg} ${isRTL ? 'rtl' : 'ltr'} overflow-hidden`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`${themeStyles.cardBg} backdrop-blur-md border-b ${themeStyles.border} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center animate-pulse`}>
              <PenTool className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                {language === 'ar' ? 'منصة الكتابة الذكية' : 'Smart Writing Platform'}
              </h1>
              <p className={`text-sm ${themeStyles.textSecondary}`}>
                {language === 'ar' ? 'اكتب، تعلم، وتطور مع الذكاء الاصطناعي' : 'Write, Learn, and Improve with AI'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(prev => prev === 'light' ? 'dark' : prev === 'dark' ? 'teal' : 'light')}
              className={`p-2 rounded-lg transition-colors duration-200 ${themeStyles.textSecondary} hover:bg-gray-100`}
            >
              {theme === 'light' && <Sun className="w-5 h-5" />}
              {theme === 'dark' && <Moon className="w-5 h-5" />}
              {theme === 'teal' && <Palette className="w-5 h-5" />}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                soundEnabled 
                  ? 'bg-teal-100 text-teal-700' 
                  : `${themeStyles.textSecondary} hover:bg-gray-100`
              }`}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            {/* Training Activity */}
            <button
              onClick={() => setShowTrainingActivity(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Brain className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'نشاط تدريبي' : 'Training Activity'}
              </span>
            </button>

            {/* Library Button */}
            <button
              onClick={() => setShowLibrary(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'مكتبة القراءة' : 'Reading Library'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Right Sidebar - Writing Tools */}
        <div className={`w-80 ${themeStyles.cardBg} backdrop-blur-md border-l ${themeStyles.border} p-4 overflow-y-auto order-1`}>
          
          {/* Writing Styles */}
          <div className="mb-6">
            <h3 className={`text-lg font-bold ${themeStyles.textPrimary} mb-4 flex items-center`}>
              <Sparkles className="w-5 h-5 mr-2 text-teal-600" />
              {language === 'ar' ? 'أنواع النصوص' : 'Text Types'}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {writingStyles.map((style) => {
                const Icon = style.icon;
                return (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
                      selectedStyle === style.id
                        ? `bg-gradient-to-r ${style.color} text-white border-transparent shadow-lg scale-105`
                        : `${themeStyles.cardBg} ${themeStyles.border} hover:shadow-md hover:scale-102`
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${
                      selectedStyle === style.id ? 'text-white' : 'text-teal-600'
                    }`} />
                    <div className={`font-bold text-sm mb-1 ${
                      selectedStyle === style.id ? 'text-white' : themeStyles.textPrimary
                    }`}>
                      {style.name[language]}
                    </div>
                    <div className={`text-xs leading-tight ${
                      selectedStyle === style.id ? 'text-white/90' : themeStyles.textSecondary
                    }`}>
                      {style.description[language]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Text Types Guide Button */}
            <div className="mt-4">
              <button
                onClick={navigateToTextTypesGuide}
                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
              >
                <BookOpen className="w-5 h-5" />
                <span>تعرّف أكثر على أنواع النصوص</span>
              </button>
            </div>
          </div>

          {/* Text Title Input */}
          <div className="mb-6">
            <button
              onClick={handleTitleClick}
              className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
            >
              <Edit3 className="w-5 h-5" />
              <span>{language === 'ar' ? 'عنوان النص' : 'Text Title'}</span>
            </button>
            
            {showTitleInput && (
              <div className="mt-3 space-y-3">
                <input
                  type="text"
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                  placeholder={language === 'ar' ? 'اكتب عنوان النص...' : 'Enter text title...'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                
                {textTitle.trim() && (
                  <button
                    onClick={() => generateKeywords(textTitle, selectedStyle)}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    {language === 'ar' ? 'توليد كلمات مفتاحية' : 'Generate Keywords'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Writing Timer */}
          <WritingTimer 
            language={language}
            theme={theme}
            onTimeUp={() => {
              // Handle time up event
              alert(language === 'ar' ? 'انتهى الوقت المخصص للكتابة!' : 'Writing time is up!');
            }}
          />

          {/* Content Ideas Helper */}
          <div className="mb-6">
            <button
              onClick={generateContentIdeas}
              disabled={isGeneratingIdeas}
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium disabled:opacity-50"
            >
              {isGeneratingIdeas ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Lightbulb className="w-5 h-5" />
              )}
              <span>
                {language === 'ar' ? 'مساعد التفكير والأفكار' : 'Thinking & Ideas Helper'}
              </span>
            </button>
          </div>

          {/* Content Ideas Display */}
          {showContentHelper && contentIdeas.length > 0 && (
            <div className="mb-6">
              <h4 className={`font-semibold ${themeStyles.textPrimary} mb-3`}>
                {language === 'ar' ? 'أفكار المحتوى:' : 'Content Ideas:'}
              </h4>
              <div className="space-y-3">
                {contentIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    onClick={() => addIdeaToContent(idea)}
                    className={`p-3 ${themeStyles.cardBg} border ${themeStyles.border} rounded-lg cursor-pointer hover:shadow-md transition-all duration-200`}
                  >
                    <div className={`font-medium ${themeStyles.textPrimary} mb-1`}>
                      {idea.order}. {idea.title}
                    </div>
                    <div className={`text-xs ${themeStyles.textSecondary} mb-2`}>
                      {idea.description}
                    </div>
                    <div className="text-xs text-teal-600 font-medium">
                      {idea.wordCount} {language === 'ar' ? 'كلمة' : 'words'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Writing Stats */}
          <div className={`${themeStyles.cardBg} rounded-2xl p-4 border ${themeStyles.border} mb-6`}>
            <h3 className={`font-bold ${themeStyles.textPrimary} mb-4 flex items-center`}>
              <TrendingUp className="w-5 h-5 mr-2 text-teal-600" />
              {language === 'ar' ? 'إحصائيات الكتابة' : 'Writing Stats'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${themeStyles.textSecondary}`}>
                  {language === 'ar' ? 'عدد الكلمات' : 'Word Count'}
                </span>
                <span className={`font-bold ${themeStyles.textPrimary}`}>{stats.wordCount}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-sm ${themeStyles.textSecondary}`}>
                  {language === 'ar' ? 'الوقت المستغرق' : 'Time Spent'}
                </span>
                <span className={`font-bold ${themeStyles.textPrimary}`}>{formatTime(stats.timeSpent)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-sm ${themeStyles.textSecondary}`}>
                  {language === 'ar' ? 'سرعة الكتابة' : 'Writing Speed'}
                </span>
                <div className="flex items-center space-x-2">
                  <span className={`text-lg ${speedStatus.color}`}>{speedStatus.emoji}</span>
                  <span className={`font-bold ${themeStyles.textPrimary}`}>
                    {stats.writingSpeed} {language === 'ar' ? 'ك/د' : 'WPM'}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-sm ${themeStyles.textSecondary}`}>
                  {language === 'ar' ? 'الدقة' : 'Accuracy'}
                </span>
                <span className={`font-bold text-green-600`}>{stats.accuracy}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-sm ${themeStyles.textSecondary}`}>
                  {language === 'ar' ? 'الاقتراحات' : 'Suggestions'}
                </span>
                <span className={`font-bold text-purple-600`}>{stats.suggestions}</span>
              </div>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className={`${themeStyles.cardBg} rounded-2xl p-4 border ${themeStyles.border} text-center`}>
            <div className="text-2xl mb-2">✨</div>
            <p className={`text-sm ${themeStyles.textPrimary} font-medium mb-1`}>
              {language === 'ar' ? 'الكتابة هي الرسم بالكلمات' : 'Writing is painting with words'}
            </p>
            <p className={`text-xs ${themeStyles.textSecondary}`}>
              {language === 'ar' ? 'استمر في الإبداع!' : 'Keep creating!'}
            </p>
          </div>
        </div>

        {/* Main Writing Area */}
        <div className="flex-1 flex flex-col">
          {/* Writing Tools Header */}
          <div className="px-6 pt-6">
            <WritingToolsHeader
              title={textTitle || (language === 'ar' ? 'عنوان النص' : 'Text Title')}
              textType={selectedStyle || 'essay'}
              keywords={keywordSuggestions.slice(0, 5).map(k => k.word)}
              grade={grade}
              maxGrade={10}
              onQuoteSelect={handleQuoteSelect}
              onTitleClick={handleTitleClick}
              theme={theme}
            />
          </div>
          
          {/* Keywords Display */}
          {showKeywords && keywordSuggestions.length > 0 && (
            <div className="px-6 mb-4">
              <h4 className={`font-semibold ${themeStyles.textPrimary} mb-3`}>
                {language === 'ar' ? 'كلمات مفتاحية مقترحة:' : 'Suggested Keywords:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {keywordSuggestions.map((keyword) => (
                  <span
                    key={keyword.id}
                    onClick={() => setContent(prev => prev + ' ' + keyword.word)}
                    className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 hover:scale-105 ${
                      keyword.category === 'main' ? 'bg-teal-100 text-teal-700' :
                      keyword.category === 'supporting' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {keyword.word}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Writing Area */}
          <div className="flex-1 px-6 pb-6 relative">
            <div className="h-full relative">
              {/* Speed Indicator */}
              {stats.writingSpeed > 0 && (
                <div className="absolute left-4 top-4 z-10 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{speedStatus.emoji}</span>
                    <div>
                      <div className={`text-sm font-bold ${speedStatus.color}`}>
                        {stats.writingSpeed} {language === 'ar' ? 'ك/د' : 'WPM'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {speedStatus.status === 'fast' && (language === 'ar' ? 'سريع!' : 'Fast!')}
                        {speedStatus.status === 'medium' && (language === 'ar' ? 'متوسط' : 'Medium')}
                        {speedStatus.status === 'slow' && (language === 'ar' ? 'هادئ' : 'Steady')}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <textarea
                ref={textareaRef}
                value={content}
                onChange={handleTextChange}
                placeholder={language === 'ar' ? 'ابدأ الكتابة هنا... سيقوم الذكاء الاصطناعي بمساعدتك أثناء الكتابة.' : 'Start writing here... AI will assist you as you type.'}
                className={`w-full h-full p-8 ${
                  theme === 'teal' ? 'bg-white/90' : themeStyles.cardBg
                } backdrop-blur-md rounded-2xl border ${themeStyles.border} resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg leading-relaxed ${themeStyles.textPrimary} notebook-lines`}
                style={{ 
                  fontFamily: language === 'ar' ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                  direction: isRTL ? 'rtl' : 'ltr'
                }}
              />
            </div>
          </div>
        </div>

        {/* Left Sidebar - AI Assistant */}
        <div className={`w-80 ${themeStyles.cardBg} backdrop-blur-md border-r ${themeStyles.border} p-4 overflow-y-auto order-3`}>
          <WritingAssistant
            selectedStyle={selectedStyle}
            content={content}
            language={language}
            theme={theme}
            onSuggestionApply={(suggestion) => setContent(prev => prev + ' ' + suggestion)}
          />
        </div>
      </div>

      {/* Floating Suggestion */}
      {showSuggestion && currentSuggestion && (
        <div
          className="fixed z-50 predictive-bubble"
          style={{
            left: suggestionPosition.x,
            top: suggestionPosition.y
          }}
          onClick={() => applySuggestion(currentSuggestion)}
        >
          {currentSuggestion.text}
        </div>
      )}
    </div>
  );
};

export default WritingPlatform;