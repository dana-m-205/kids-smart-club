import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Star, Trophy, Eye, EyeOff, Lightbulb, RefreshCw } from 'lucide-react';
import { puzzles } from '@/lib/data';
import { usePoints } from '@/contexts/PointsContext';

const PUZZLES_BANNER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663391534446/9XypCH2gqXSr5AAr7fymx3/puzzles-banner-YBegnEd82AKReuzERSVg2y.webp";

const categories = ['الكل', 'ذكاء', 'حساب', 'كلمات', 'منطق'];
const difficulties = ['الكل', 'سهل', 'متوسط', 'صعب'];

const difficultyColors: Record<string, string> = {
  'سهل': 'bg-green-100 text-green-700 border-green-200',
  'متوسط': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'صعب': 'bg-red-100 text-red-700 border-red-200',
};

const categoryColors: Record<string, string> = {
  'ذكاء': 'bg-purple-100 text-purple-700',
  'حساب': 'bg-blue-100 text-blue-700',
  'كلمات': 'bg-green-100 text-green-700',
  'منطق': 'bg-orange-100 text-orange-700',
};

export default function Puzzles() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [activeDifficulty, setActiveDifficulty] = useState('الكل');
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set());
  const [shownHints, setShownHints] = useState<Set<number>>(new Set());
  const [solvedPuzzles, setSolvedPuzzles] = useState<Set<number>>(new Set());
  const [totalPoints, setTotalPoints] = useState(0);
  const { addPoints, incrementPuzzlesSolved } = usePoints();

  const filtered = puzzles.filter(p => {
    const matchCat = activeCategory === 'الكل' || p.category === activeCategory;
    const matchDiff = activeDifficulty === 'الكل' || p.difficulty === activeDifficulty;
    return matchCat && matchDiff;
  });

  const handleRevealAnswer = (id: number, points: number) => {
    if (!revealedAnswers.has(id)) {
      setRevealedAnswers(prev => new Set(Array.from(prev).concat(id)));
      if (!solvedPuzzles.has(id)) {
        setSolvedPuzzles(prev => new Set(Array.from(prev).concat(id)));
        setTotalPoints(prev => prev + points);
        addPoints(points);
        incrementPuzzlesSolved();
      }
    }
  };

  const handleShowHint = (id: number) => {
    setShownHints(prev => new Set(Array.from(prev).concat(id)));
  };

  const handleReset = () => {
    setRevealedAnswers(new Set());
    setShownHints(new Set());
    setSolvedPuzzles(new Set());
    setTotalPoints(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={PUZZLES_BANNER} alt="قسم الألغاز" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 to-transparent flex items-end">
          <div className="container pb-6">
            <h1 className="text-3xl md:text-5xl font-black text-white"
              style={{ fontFamily: 'Tajawal, sans-serif', textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
              🧩 عالم الألغاز
            </h1>
            <p className="text-orange-100 text-lg font-semibold mt-1"
              style={{ fontFamily: 'Cairo, sans-serif' }}>
              {puzzles.length} لغز وتحدي ذكاء ينتظرك
            </p>
          </div>
        </div>
      </div>

      <div className="container py-10">
        {/* Score Bar */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-6 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Trophy size={40} className="text-yellow-100" />
              <div>
                <div className="text-3xl font-black" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  {totalPoints} نقطة
                </div>
                <div className="text-yellow-100 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  حللت {solvedPuzzles.size} لغز من {puzzles.length}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-black" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  {Math.round((solvedPuzzles.size / puzzles.length) * 100)}%
                </div>
                <div className="text-yellow-100 text-sm font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  نسبة الإنجاز
                </div>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl font-bold transition-colors"
                style={{ fontFamily: 'Tajawal, sans-serif' }}
              >
                <RefreshCw size={16} />
                إعادة
              </button>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-4 bg-white/30 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${(solvedPuzzles.size / puzzles.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div>
            <p className="text-sm font-bold text-gray-500 mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
              التصنيف:
            </p>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all duration-200 border-2
                    ${activeCategory === cat
                      ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                    }`}
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
              الصعوبة:
            </p>
            <div className="flex gap-2 flex-wrap">
              {difficulties.map(diff => (
                <button
                  key={diff}
                  onClick={() => setActiveDifficulty(diff)}
                  className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all duration-200 border-2
                    ${activeDifficulty === diff
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                    }`}
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Puzzles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((puzzle, i) => {
            const isRevealed = revealedAnswers.has(puzzle.id);
            const isHintShown = shownHints.has(puzzle.id);
            const isSolved = solvedPuzzles.has(puzzle.id);

            return (
              <motion.div
                key={puzzle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`puzzle-card bg-white border-2 shadow-md overflow-hidden
                  ${isSolved ? 'border-green-300' : 'border-gray-100'}`}
              >
                {/* Puzzle Header */}
                <div className={`p-4 flex items-center justify-between
                  ${isSolved ? 'bg-green-50' : 'bg-amber-50'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{puzzle.emoji}</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${difficultyColors[puzzle.difficulty]}`}
                      style={{ fontFamily: 'Cairo, sans-serif' }}>
                      {puzzle.difficulty}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${categoryColors[puzzle.category]}`}
                      style={{ fontFamily: 'Cairo, sans-serif' }}>
                      {puzzle.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 font-black text-sm"
                    style={{ fontFamily: 'Tajawal, sans-serif' }}>
                    <Star size={14} className="fill-yellow-400" />
                    {puzzle.points}
                  </div>
                </div>

                {/* Question */}
                <div className="p-5">
                  <p className="text-gray-700 font-bold text-base leading-relaxed mb-4 text-right"
                    style={{ fontFamily: 'Cairo, sans-serif', lineHeight: '1.8' }}>
                    {puzzle.question}
                  </p>

                  {/* Hint */}
                  {puzzle.hint && !isRevealed && (
                    <div className="mb-4">
                      {isHintShown ? (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-600 font-semibold"
                          style={{ fontFamily: 'Cairo, sans-serif' }}>
                          💡 {puzzle.hint}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleShowHint(puzzle.id)}
                          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 text-sm font-bold transition-colors"
                          style={{ fontFamily: 'Cairo, sans-serif' }}
                        >
                          <Lightbulb size={16} />
                          أظهر التلميح
                        </button>
                      )}
                    </div>
                  )}

                  {/* Answer */}
                  <AnimatePresence>
                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 mb-4"
                      >
                        <div className="flex items-center gap-2 text-green-700 font-black mb-1"
                          style={{ fontFamily: 'Tajawal, sans-serif' }}>
                          ✅ الإجابة الصحيحة:
                        </div>
                        <p className="text-green-600 font-bold text-right" style={{ fontFamily: 'Cairo, sans-serif' }}>
                          {puzzle.answer}
                        </p>
                        {isSolved && (
                          <div className="flex items-center gap-1 text-yellow-500 font-black mt-2"
                            style={{ fontFamily: 'Tajawal, sans-serif' }}>
                            <Star size={16} className="fill-yellow-400" />
                            +{puzzle.points} نقطة مكتسبة!
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleRevealAnswer(puzzle.id, puzzle.points)}
                    className={`w-full py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all
                      ${isRevealed
                        ? 'bg-green-100 text-green-600 cursor-default'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:shadow-lg'
                      }`}
                    style={{ fontFamily: 'Tajawal, sans-serif' }}
                    disabled={isRevealed}
                  >
                    {isRevealed ? (
                      <>
                        <Eye size={16} />
                        تم الكشف عن الإجابة ✓
                      </>
                    ) : (
                      <>
                        <EyeOff size={16} />
                        اكشف الإجابة (+{puzzle.points} نقطة)
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-xl font-bold" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              لا توجد ألغاز مطابقة للفلتر المحدد
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
