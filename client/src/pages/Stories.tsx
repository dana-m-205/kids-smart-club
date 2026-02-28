import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, Users, ArrowLeft } from 'lucide-react';
import { stories } from '@/lib/data';

const STORIES_BANNER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663391534446/9XypCH2gqXSr5AAr7fymx3/stories-banner-Krky78P7sGHkoAFjwChdfF.webp";

const categories = ['الكل', 'تعليمية', 'أخلاقية', 'مغامرات', 'خيال'];

const categoryColors: Record<string, string> = {
  'تعليمية': 'bg-orange-100 text-orange-700 border-orange-200',
  'أخلاقية': 'bg-green-100 text-green-700 border-green-200',
  'مغامرات': 'bg-blue-100 text-blue-700 border-blue-200',
  'خيال': 'bg-purple-100 text-purple-700 border-purple-200',
};

export default function Stories() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filtered = stories.filter(s => {
    const matchSearch = s.title.includes(search) || s.category.includes(search);
    const matchCat = activeCategory === 'الكل' || s.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={STORIES_BANNER} alt="قسم القصص" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end">
          <div className="container pb-6">
            <h1 className="text-3xl md:text-5xl font-black text-white"
              style={{ fontFamily: 'Tajawal, sans-serif', textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
              📚 عالم القصص
            </h1>
            <p className="text-blue-100 text-lg font-semibold mt-1"
              style={{ fontFamily: 'Cairo, sans-serif' }}>
              {stories.length} قصة شيقة ومفيدة تنتظرك
            </p>
          </div>
        </div>
      </div>

      <div className="container py-10">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن قصة..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pr-12 pl-4 py-3 rounded-2xl border-2 border-blue-100 focus:border-blue-400 focus:outline-none text-right font-semibold"
              style={{ fontFamily: 'Cairo, sans-serif' }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200 border-2
                  ${activeCategory === cat
                    ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                  }`}
                style={{ fontFamily: 'Tajawal, sans-serif' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/stories/${story.id}`}>
                <div className="story-card bg-white border border-gray-100 shadow-md cursor-pointer group h-full flex flex-col">
                  {/* Story Image/Emoji Header */}
                  <div className={`bg-gradient-to-br ${story.color} h-36 flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{story.emoji}</span>
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${categoryColors[story.category] || 'bg-gray-100 text-gray-600'}`}
                        style={{ fontFamily: 'Cairo, sans-serif' }}>
                        {story.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Story Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-black text-gray-800 text-base mb-3 leading-tight flex-1"
                      style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      {story.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4"
                      style={{ fontFamily: 'Cairo, sans-serif' }}>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {story.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {story.ageRange} سنة
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-blue-600 font-bold text-sm group-hover:gap-2 transition-all"
                        style={{ fontFamily: 'Cairo, sans-serif' }}>
                        <BookOpen size={14} />
                        اقرأ الآن
                        <ArrowLeft size={12} />
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <span key={s} className="text-yellow-400 text-xs">⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-xl font-bold" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              لم نجد قصص مطابقة لبحثك
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
