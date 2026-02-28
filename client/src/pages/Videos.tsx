import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Search } from 'lucide-react';
import { videos } from '@/lib/data';

const categories = ['الكل', 'تعليمية', 'تجارب علمية', 'قصص مصورة', 'مهارات حياتية'];

const categoryColors: Record<string, string> = {
  'تعليمية': 'bg-blue-100 text-blue-700',
  'تجارب علمية': 'bg-green-100 text-green-700',
  'قصص مصورة': 'bg-purple-100 text-purple-700',
  'مهارات حياتية': 'bg-orange-100 text-orange-700',
};

const categoryIcons: Record<string, string> = {
  'تعليمية': '🎓',
  'تجارب علمية': '🔬',
  'قصص مصورة': '📖',
  'مهارات حياتية': '💡',
};

export default function Videos() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const filtered = videos.filter(v => {
    const matchSearch = v.title.includes(search) || v.description.includes(search);
    const matchCat = activeCategory === 'الكل' || v.category === activeCategory;
    return matchSearch && matchCat;
  });

  const selected = videos.find(v => v.id === selectedVideo);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 py-12">
        <div className="container text-center text-white">
          <div className="text-6xl mb-4 animate-float">🎥</div>
          <h1 className="text-4xl md:text-5xl font-black mb-3"
            style={{ fontFamily: 'Tajawal, sans-serif', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
            عالم الفيديوهات
          </h1>
          <p className="text-pink-100 text-lg font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {videos.length} فيديو تعليمي وترفيهي ممتع
          </p>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && selected && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selected.youtubeId}?autoplay=1`}
                title={selected.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${categoryColors[selected.category]}`}
                    style={{ fontFamily: 'Cairo, sans-serif' }}>
                    {categoryIcons[selected.category]} {selected.category}
                  </span>
                  <h3 className="text-xl font-black text-gray-800 mb-2"
                    style={{ fontFamily: 'Tajawal, sans-serif' }}>
                    {selected.title}
                  </h3>
                  <p className="text-gray-500 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    {selected.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="shrink-0 w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors font-bold text-lg"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="container py-10">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن فيديو..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pr-12 pl-4 py-3 rounded-2xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none text-right font-semibold"
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
                    ? 'bg-pink-500 text-white border-pink-500 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'
                  }`}
                style={{ fontFamily: 'Tajawal, sans-serif' }}
              >
                {categoryIcons[cat] || '🎬'} {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {['تعليمية', 'تجارب علمية', 'قصص مصورة', 'مهارات حياتية'].map(cat => (
            <div key={cat}
              className={`${categoryColors[cat]} rounded-2xl p-4 text-center cursor-pointer hover:scale-105 transition-transform`}
              onClick={() => setActiveCategory(cat)}>
              <div className="text-3xl mb-1">{categoryIcons[cat]}</div>
              <div className="font-black text-lg" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                {videos.filter(v => v.category === cat).length}
              </div>
              <div className="text-xs font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>{cat}</div>
            </div>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
                onClick={() => setSelectedVideo(video.id)}
              >
                {/* Thumbnail */}
                <div className={`bg-gradient-to-br ${video.color} h-40 flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{video.emoji}</span>
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                      <Play size={24} className="text-gray-800 mr-[-2px]" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg font-bold flex items-center gap-1"
                    style={{ fontFamily: 'Cairo, sans-serif' }}>
                    <Clock size={10} />
                    {video.duration}
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-2 ${categoryColors[video.category]}`}
                    style={{ fontFamily: 'Cairo, sans-serif' }}>
                    {categoryIcons[video.category]} {video.category}
                  </span>
                  <h3 className="font-black text-gray-800 text-sm mb-2 leading-tight"
                    style={{ fontFamily: 'Tajawal, sans-serif' }}>
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2"
                    style={{ fontFamily: 'Cairo, sans-serif' }}>
                    {video.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-xl font-bold" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              لم نجد فيديوهات مطابقة لبحثك
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
