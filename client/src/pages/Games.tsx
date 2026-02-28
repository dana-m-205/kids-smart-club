import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { games } from '@/lib/data';

const GAMES_BANNER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663391534446/9XypCH2gqXSr5AAr7fymx3/games-banner-ij26oAy9xpVboZrtHLKMk7.webp";

const difficultyColors: Record<string, string> = {
  'سهل': 'bg-green-100 text-green-700',
  'متوسط': 'bg-yellow-100 text-yellow-700',
  'صعب': 'bg-red-100 text-red-700',
};

export default function Games() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={GAMES_BANNER} alt="قسم الألعاب" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent flex items-end">
          <div className="container pb-6">
            <h1 className="text-3xl md:text-5xl font-black text-white"
              style={{ fontFamily: 'Tajawal, sans-serif', textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
              🎮 عالم الألعاب
            </h1>
            <p className="text-green-100 text-lg font-semibold mt-1"
              style={{ fontFamily: 'Cairo, sans-serif' }}>
              {games.length} لعبة تعليمية تفاعلية ممتعة
            </p>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="text-center mb-10">
          <p className="text-gray-500 text-lg font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
            اختر لعبتك المفضلة وابدأ المرح والتعلم!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/games/${game.id}`}>
                <div className="game-card bg-white border-2 border-gray-100 shadow-lg cursor-pointer group h-full flex flex-col">
                  {/* Game Header */}
                  <div className={`bg-gradient-to-br ${game.color} p-8 text-center relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10">
                      {['⭐', '✨', '🎯'].map((e, j) => (
                        <span key={j} className="absolute text-2xl animate-float-slow"
                          style={{ left: `${j * 30 + 10}%`, top: `${j * 20 + 10}%`, animationDelay: `${j * 0.5}s` }}>
                          {e}
                        </span>
                      ))}
                    </div>
                    <div className="text-6xl mb-2 group-hover:scale-110 group-hover:animate-wiggle transition-transform duration-300 relative z-10">
                      {game.emoji}
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${difficultyColors[game.difficulty]} relative z-10`}
                      style={{ fontFamily: 'Cairo, sans-serif' }}>
                      {game.difficulty}
                    </span>
                  </div>
                  
                  {/* Game Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-black text-gray-800 text-lg mb-2 text-center"
                      style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      {game.title}
                    </h3>
                    <p className="text-gray-500 text-sm text-center mb-4 flex-1"
                      style={{ fontFamily: 'Cairo, sans-serif' }}>
                      {game.description}
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className={`bg-gradient-to-r ${game.color} text-white py-3 px-4 rounded-2xl text-center font-black text-sm shadow-md`}
                      style={{ fontFamily: 'Tajawal, sans-serif' }}
                    >
                      🎮 العب الآن!
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
