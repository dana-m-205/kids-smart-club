import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BookOpen, Video, Gamepad2, Brain, Star, Trophy, ArrowLeft, Sparkles } from 'lucide-react';
import { usePoints } from '@/contexts/PointsContext';
import { stories, videos, games, puzzles } from '@/lib/data';

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663391534446/9XypCH2gqXSr5AAr7fymx3/hero-banner-8rLQHdzVxVZSEq7hjNNgLp.webp";
const OWL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663391534446/9XypCH2gqXSr5AAr7fymx3/owl-mascot-C3cnvuLLGXodKbUrbVavaN.webp";

const sections = [
  {
    href: '/stories',
    title: 'القصص',
    description: `${stories.length} قصة شيقة ومفيدة`,
    emoji: '📚',
    icon: BookOpen,
    gradient: 'from-blue-400 via-cyan-400 to-sky-500',
    bg: 'bg-blue-50',
    count: stories.length,
    label: 'قصة',
  },
  {
    href: '/videos',
    title: 'الفيديوهات',
    description: `${videos.length} فيديو تعليمي وترفيهي`,
    emoji: '🎥',
    icon: Video,
    gradient: 'from-pink-400 via-rose-400 to-red-400',
    bg: 'bg-pink-50',
    count: videos.length,
    label: 'فيديو',
  },
  {
    href: '/games',
    title: 'الألعاب',
    description: `${games.length} لعبة تفاعلية ممتعة`,
    emoji: '🎮',
    icon: Gamepad2,
    gradient: 'from-green-400 via-emerald-400 to-teal-500',
    bg: 'bg-green-50',
    count: games.length,
    label: 'لعبة',
  },
  {
    href: '/puzzles',
    title: 'الألغاز',
    description: `${puzzles.length} لغز وتحدي ذكاء`,
    emoji: '🧩',
    icon: Brain,
    gradient: 'from-amber-400 via-yellow-400 to-orange-400',
    bg: 'bg-amber-50',
    count: puzzles.length,
    label: 'لغز',
  },
];

const stats = [
  { label: 'قصة ممتعة', value: stories.length, emoji: '📖', color: 'text-blue-600' },
  { label: 'فيديو تعليمي', value: videos.length, emoji: '🎬', color: 'text-pink-600' },
  { label: 'لعبة تفاعلية', value: games.length, emoji: '🎯', color: 'text-green-600' },
  { label: 'لغز وتحدي', value: puzzles.length, emoji: '🧠', color: 'text-amber-600' },
];

export default function Home() {
  const { points, level, badges } = usePoints();
  const earnedBadges = badges.filter(b => b.earned);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="relative min-h-[500px] md:min-h-[600px] flex items-center"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-blue-900/70 via-blue-800/50 to-transparent" />
          
          <div className="container relative z-10">
            <div className="max-w-xl mr-auto ml-0 md:mr-0 md:ml-auto text-right">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-yellow-400/90 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm mb-4 shadow-lg"
                  style={{ fontFamily: 'Cairo, sans-serif' }}>
                  <Sparkles size={16} />
                  مرحباً بك في عالم التعلم والمرح!
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight"
                  style={{ fontFamily: 'Tajawal, sans-serif', textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
                  نادي الأذكياء
                  <span className="block text-yellow-300">الصغار</span>
                </h1>
                
                <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed font-semibold"
                  style={{ fontFamily: 'Cairo, sans-serif', textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
                  قصص شيقة، فيديوهات تعليمية، ألعاب ممتعة وألغاز ذكية — كل ما يحتاجه طفلك في مكان واحد!
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Link href="/stories">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-2xl font-black text-base shadow-xl cursor-pointer"
                      style={{ fontFamily: 'Tajawal, sans-serif' }}
                    >
                      <BookOpen size={20} />
                      ابدأ القراءة
                    </motion.div>
                  </Link>
                  <Link href="/games">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-2xl font-black text-base shadow-xl cursor-pointer"
                      style={{ fontFamily: 'Tajawal, sans-serif' }}
                    >
                      <Gamepad2 size={20} />
                      العب الآن
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-3xl mb-1">{stat.emoji}</div>
                <div className="text-2xl font-black" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  {stat.value}+
                </div>
                <div className="text-blue-200 text-sm font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Sections Cards */}
      <section className="py-16 bg-gradient-to-b from-sky-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-3"
              style={{ fontFamily: 'Tajawal, sans-serif' }}>
              اختر مغامرتك! 🌟
            </h2>
            <p className="text-gray-500 text-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
              أربعة أقسام مليئة بالمتعة والتعلم
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={section.href}>
                    <div className={`kids-card ${section.bg} border-2 border-white shadow-lg cursor-pointer group`}>
                      {/* Card Header with gradient */}
                      <div className={`bg-gradient-to-br ${section.gradient} p-6 text-white text-center`}>
                        <div className="text-5xl mb-2 group-hover:animate-bounce">{section.emoji}</div>
                        <div className="text-3xl font-black" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                          {section.count}
                        </div>
                        <div className="text-white/80 text-sm font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                          {section.label}
                        </div>
                      </div>
                      {/* Card Body */}
                      <div className="p-5">
                        <h3 className="text-xl font-black text-gray-800 mb-2 text-center"
                          style={{ fontFamily: 'Tajawal, sans-serif' }}>
                          {section.title}
                        </h3>
                        <p className="text-gray-500 text-sm text-center mb-4"
                          style={{ fontFamily: 'Cairo, sans-serif' }}>
                          {section.description}
                        </p>
                        <div className={`flex items-center justify-center gap-2 bg-gradient-to-r ${section.gradient} text-white py-2.5 px-4 rounded-xl font-bold text-sm`}
                          style={{ fontFamily: 'Tajawal, sans-serif' }}>
                          <Icon size={16} />
                          استكشف الآن
                          <ArrowLeft size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Points & Badges Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-3"
                style={{ fontFamily: 'Tajawal, sans-serif' }}>
                إنجازاتك ونقاطك 🏆
              </h2>
              <p className="text-gray-500 text-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
                العب وتعلم واجمع النقاط والشارات!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Points Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Star size={32} className="fill-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-black" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      {points}
                    </div>
                    <div className="text-yellow-100 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      نقطة مكتسبة
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      المستوى {level}
                    </span>
                    <span className="text-yellow-100 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      {points % 100}/100 نقطة للمستوى التالي
                    </span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3">
                    <div
                      className="bg-white rounded-full h-3 transition-all duration-500"
                      style={{ width: `${(points % 100)}%` }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Badges Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Trophy size={28} className="text-purple-500" />
                  <h3 className="text-xl font-black text-gray-800" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                    شاراتك ({earnedBadges.length})
                  </h3>
                </div>
                {earnedBadges.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3">
                    {earnedBadges.map(badge => (
                      <div key={badge.id} className="text-center p-3 bg-purple-50 rounded-2xl">
                        <div className="text-2xl mb-1">{badge.emoji}</div>
                        <div className="text-xs font-bold text-purple-700" style={{ fontFamily: 'Cairo, sans-serif' }}>
                          {badge.name}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-4xl mb-3">🎯</div>
                    <p className="text-gray-400 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      ابدأ اللعب والقراءة لتحصل على شاراتك!
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Owl Mascot Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="shrink-0"
            >
              <img
                src={OWL_IMG}
                alt="بومة نادي الأذكياء"
                className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-2xl"
              />
            </motion.div>
            <div className="text-center md:text-right">
              <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                أنا بومة نادي الأذكياء! 🦉
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-6" style={{ fontFamily: 'Cairo, sans-serif' }}>
                مرحباً أيها الذكي الصغير! أنا هنا لأساعدك في رحلة التعلم والمرح. 
                معي ستقرأ أجمل القصص، تشاهد أروع الفيديوهات، تلعب أمتع الألعاب، 
                وتحل أصعب الألغاز. هل أنت مستعد؟
              </p>
              <Link href="/stories">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-8 py-3 rounded-2xl font-black text-lg shadow-xl cursor-pointer"
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                >
                  <BookOpen size={22} />
                  ابدأ المغامرة!
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories Preview */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-gray-800"
              style={{ fontFamily: 'Tajawal, sans-serif' }}>
              أحدث القصص 📖
            </h2>
            <Link href="/stories">
              <div className="flex items-center gap-1 text-blue-600 font-bold hover:text-blue-800 transition-colors cursor-pointer"
                style={{ fontFamily: 'Cairo, sans-serif' }}>
                عرض الكل
                <ArrowLeft size={16} />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.slice(0, 3).map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/stories/${story.id}`}>
                  <div className="story-card bg-white border border-gray-100 shadow-md cursor-pointer group">
                    <div className={`bg-gradient-to-br ${story.color} h-32 flex items-center justify-center`}>
                      <span className="text-6xl group-hover:scale-110 transition-transform">{story.emoji}</span>
                    </div>
                    <div className="p-5">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3
                        ${story.category === 'أخلاقية' ? 'bg-green-100 text-green-700' :
                          story.category === 'مغامرات' ? 'bg-blue-100 text-blue-700' :
                          story.category === 'خيال' ? 'bg-purple-100 text-purple-700' :
                          'bg-orange-100 text-orange-700'}`}
                        style={{ fontFamily: 'Cairo, sans-serif' }}>
                        {story.category}
                      </span>
                      <h3 className="font-black text-gray-800 text-lg mb-2 leading-tight"
                        style={{ fontFamily: 'Tajawal, sans-serif' }}>
                        {story.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-400"
                        style={{ fontFamily: 'Cairo, sans-serif' }}>
                        <span>⏱️ {story.readTime}</span>
                        <span>👦 {story.ageRange} سنة</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
