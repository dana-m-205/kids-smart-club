import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Trophy, RefreshCw, Home } from 'lucide-react';
import { games } from '@/lib/data';
import { usePoints } from '@/contexts/PointsContext';

// ===================== MEMORY GAME =====================
const memoryEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
interface MemoryCard { id: number; emoji: string; flipped: boolean; matched: boolean; }

function MemoryGame({ onWin }: { onWin: (score: number) => void }) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const initGame = useCallback(() => {
    const doubled = [...memoryEmojis, ...memoryEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
    setCards(doubled);
    setFlipped([]);
    setMoves(0);
    setWon(false);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  const handleFlip = (id: number) => {
    if (flipped.length === 2) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newFlipped = [...flipped, id];
    setCards(prev => prev.map(c => c.id === id ? { ...c, flipped: true } : c));
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped.map(fid => cards.find(c => c.id === fid)!);
      if (a.emoji === b.emoji) {
        setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, matched: true } : c));
        setFlipped([]);
        const allMatched = cards.filter(c => !c.matched).length <= 2;
        if (allMatched) {
          setWon(true);
          onWin(Math.max(50 - moves * 2, 10));
        }
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c));
          setFlipped([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setWon(true);
      onWin(Math.max(50 - moves * 2, 10));
    }
  }, [cards]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="font-bold text-gray-600" style={{ fontFamily: 'Cairo, sans-serif' }}>
          عدد المحاولات: <span className="text-purple-600 font-black">{moves}</span>
        </div>
        <button onClick={initGame} className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-xl font-bold hover:bg-purple-200 transition-colors"
          style={{ fontFamily: 'Tajawal, sans-serif' }}>
          <RefreshCw size={16} />
          إعادة
        </button>
      </div>
      {won ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <p className="text-2xl font-black text-purple-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            أحسنت! فزت في {moves} محاولة!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {cards.map(card => (
            <motion.div
              key={card.id}
              whileHover={{ scale: card.flipped || card.matched ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFlip(card.id)}
              className={`aspect-square rounded-2xl flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 shadow-md
                ${card.matched ? 'bg-green-200 border-2 border-green-400' :
                  card.flipped ? 'bg-white border-2 border-purple-400' :
                  'bg-gradient-to-br from-purple-400 to-violet-500 border-2 border-purple-300'}`}
            >
              {(card.flipped || card.matched) ? card.emoji : '❓'}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===================== MATH GAME =====================
function MathGame({ onWin }: { onWin: (score: number) => void }) {
  const [question, setQuestion] = useState({ a: 0, b: 0, op: '+', answer: 0 });
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const totalRounds = 10;

  const generateQuestion = useCallback(() => {
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 10) + 1;
    let answer = 0;
    if (op === '+') answer = a + b;
    else if (op === '-') { if (a < b) [a, b] = [b, a]; answer = a - b; }
    else { a = Math.floor(Math.random() * 10) + 1; b = Math.floor(Math.random() * 10) + 1; answer = a * b; }
    setQuestion({ a, b, op, answer });
    setInput('');
    setFeedback(null);
  }, []);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const handleSubmit = () => {
    if (parseInt(input) === question.answer) {
      setFeedback('correct');
      const newScore = score + 10;
      setScore(newScore);
      if (round >= totalRounds) {
        setGameOver(true);
        onWin(newScore);
      } else {
        setTimeout(() => { setRound(r => r + 1); generateQuestion(); }, 800);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  return (
    <div className="text-center">
      {gameOver ? (
        <div className="py-8">
          <div className="text-6xl mb-4 animate-bounce">🏆</div>
          <p className="text-2xl font-black text-blue-700 mb-2" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            انتهت اللعبة!
          </p>
          <p className="text-xl font-bold text-gray-600" style={{ fontFamily: 'Cairo, sans-serif' }}>
            نتيجتك: {score}/{totalRounds * 10} نقطة
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="font-bold text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>
              سؤال {round}/{totalRounds}
            </div>
            <div className="font-black text-blue-600" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              النقاط: {score}
            </div>
          </div>
          <div className={`bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-10 mb-6 transition-all duration-300
            ${feedback === 'correct' ? 'bg-green-100 scale-105' : feedback === 'wrong' ? 'bg-red-100 shake' : ''}`}>
            <div className="text-5xl font-black text-blue-800 mb-2" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              {question.a} {question.op} {question.b} = ?
            </div>
            {feedback === 'correct' && <div className="text-3xl animate-bounce">✅</div>}
            {feedback === 'wrong' && <div className="text-3xl animate-bounce">❌</div>}
          </div>
          <div className="flex gap-3 justify-center mb-4">
            <input
              type="number"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="الجواب"
              className="w-32 text-center text-2xl font-black border-2 border-blue-300 rounded-2xl py-3 focus:outline-none focus:border-blue-500"
              style={{ fontFamily: 'Tajawal, sans-serif' }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-2xl font-black text-lg shadow-lg"
              style={{ fontFamily: 'Tajawal, sans-serif' }}
            >
              تحقق ✓
            </motion.button>
          </div>
          {/* Number pad */}
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {[1,2,3,4,5,6,7,8,9,0].map(n => (
              <button key={n} onClick={() => setInput(prev => prev + n.toString())}
                className="bg-gray-100 hover:bg-blue-100 text-gray-700 font-black text-xl py-3 rounded-xl transition-colors"
                style={{ fontFamily: 'Tajawal, sans-serif' }}>
                {n}
              </button>
            ))}
            <button onClick={() => setInput(prev => prev.slice(0, -1))}
              className="bg-red-100 hover:bg-red-200 text-red-600 font-black text-xl py-3 rounded-xl transition-colors col-span-2">
              ⌫
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ===================== COLOR GAME =====================
const colorData = [
  { word: 'أحمر', color: '#EF4444', options: ['#EF4444', '#3B82F6', '#22C55E', '#F59E0B'] },
  { word: 'أزرق', color: '#3B82F6', options: ['#EF4444', '#3B82F6', '#22C55E', '#F59E0B'] },
  { word: 'أخضر', color: '#22C55E', options: ['#EF4444', '#3B82F6', '#22C55E', '#F59E0B'] },
  { word: 'أصفر', color: '#F59E0B', options: ['#EF4444', '#3B82F6', '#22C55E', '#F59E0B'] },
  { word: 'وردي', color: '#EC4899', options: ['#EC4899', '#8B5CF6', '#F97316', '#14B8A6'] },
  { word: 'بنفسجي', color: '#8B5CF6', options: ['#EC4899', '#8B5CF6', '#F97316', '#14B8A6'] },
  { word: 'برتقالي', color: '#F97316', options: ['#EC4899', '#8B5CF6', '#F97316', '#14B8A6'] },
  { word: 'تركوازي', color: '#14B8A6', options: ['#EC4899', '#8B5CF6', '#F97316', '#14B8A6'] },
];

function ColorGame({ onWin }: { onWin: (score: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const current = colorData[idx];

  const handleAnswer = (color: string) => {
    if (color === current.color) {
      setFeedback('correct');
      const newScore = score + 10;
      setScore(newScore);
      if (idx >= colorData.length - 1) {
        setGameOver(true);
        onWin(newScore);
      } else {
        setTimeout(() => { setIdx(i => i + 1); setFeedback(null); }, 600);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 600);
    }
  };

  return (
    <div className="text-center">
      {gameOver ? (
        <div className="py-8">
          <div className="text-6xl mb-4 animate-bounce">🎨</div>
          <p className="text-2xl font-black text-pink-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            ممتاز! أتقنت الألوان!
          </p>
          <p className="text-xl font-bold text-gray-600 mt-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
            نتيجتك: {score}/{colorData.length * 10}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 font-bold text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {idx + 1}/{colorData.length}
          </div>
          <div className={`bg-gray-100 rounded-3xl p-10 mb-8 transition-all duration-300
            ${feedback === 'correct' ? 'bg-green-100' : feedback === 'wrong' ? 'bg-red-100' : ''}`}>
            <p className="text-gray-500 mb-3 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
              اختر اللون الصحيح لـ:
            </p>
            <div className="text-5xl font-black text-gray-800 mb-2" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              {current.word}
            </div>
            {feedback === 'correct' && <div className="text-3xl">✅</div>}
            {feedback === 'wrong' && <div className="text-3xl">❌</div>}
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            {current.options.map(color => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAnswer(color)}
                className="w-full h-20 rounded-2xl shadow-lg border-4 border-white hover:border-gray-300 transition-all"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ===================== WORD ORDER GAME =====================
const sentences = [
  { words: ['يحب', 'الطفل', 'القراءة'], answer: 'الطفل يحب القراءة' },
  { words: ['جميلة', 'الحديقة', 'جداً'], answer: 'الحديقة جميلة جداً' },
  { words: ['يلعب', 'الأطفال', 'معاً'], answer: 'الأطفال يلعبون معاً' },
  { words: ['كبير', 'البيت', 'ومريح'], answer: 'البيت كبير ومريح' },
  { words: ['تطير', 'الطيور', 'عالياً'], answer: 'الطيور تطير عالياً' },
];

function WordOrderGame({ onWin }: { onWin: (score: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [available, setAvailable] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setAvailable([...sentences[idx].words].sort(() => Math.random() - 0.5));
    setSelected([]);
    setFeedback(null);
  }, [idx]);

  const addWord = (word: string, i: number) => {
    setSelected(prev => [...prev, word]);
    setAvailable(prev => prev.filter((_, j) => j !== i));
  };

  const removeWord = (word: string, i: number) => {
    setAvailable(prev => [...prev, word]);
    setSelected(prev => prev.filter((_, j) => j !== i));
  };

  const checkAnswer = () => {
    const answer = selected.join(' ');
    if (answer === sentences[idx].answer) {
      setFeedback('correct');
      const newScore = score + 15;
      setScore(newScore);
      if (idx >= sentences.length - 1) {
        setGameOver(true);
        onWin(newScore);
      } else {
        setTimeout(() => setIdx(i => i + 1), 800);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setAvailable([...sentences[idx].words].sort(() => Math.random() - 0.5));
        setSelected([]);
        setFeedback(null);
      }, 800);
    }
  };

  return (
    <div>
      {gameOver ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4 animate-bounce">📝</div>
          <p className="text-2xl font-black text-amber-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            رائع! أتقنت ترتيب الجمل!
          </p>
        </div>
      ) : (
        <>
          <div className="text-center mb-4 font-bold text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>
            جملة {idx + 1}/{sentences.length}
          </div>
          <p className="text-center text-gray-600 mb-4 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
            رتب الكلمات لتكوين جملة صحيحة:
          </p>
          
          {/* Answer area */}
          <div className={`min-h-16 bg-gray-50 rounded-2xl p-4 mb-4 flex flex-wrap gap-2 justify-center border-2 transition-colors
            ${feedback === 'correct' ? 'border-green-400 bg-green-50' : feedback === 'wrong' ? 'border-red-400 bg-red-50' : 'border-dashed border-gray-300'}`}>
            {selected.length === 0 ? (
              <p className="text-gray-400 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                اضغط على الكلمات أدناه لترتيبها هنا
              </p>
            ) : (
              selected.map((word, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => removeWord(word, i)}
                  className="bg-amber-400 text-white px-4 py-2 rounded-xl font-black text-lg shadow-md"
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                >
                  {word}
                </motion.button>
              ))
            )}
          </div>

          {/* Available words */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {available.map((word, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addWord(word, i)}
                className="bg-white border-2 border-amber-300 text-amber-700 px-4 py-2 rounded-xl font-black text-lg shadow-md hover:bg-amber-50 transition-colors"
                style={{ fontFamily: 'Tajawal, sans-serif' }}
              >
                {word}
              </motion.button>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={checkAnswer}
              disabled={selected.length === 0}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-2xl font-black text-lg shadow-lg disabled:opacity-50"
              style={{ fontFamily: 'Tajawal, sans-serif' }}
            >
              تحقق ✓
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

// ===================== COUNT GAME =====================
const countRounds = [
  { emoji: '🍎', count: 5 },
  { emoji: '⭐', count: 8 },
  { emoji: '🐶', count: 3 },
  { emoji: '🌸', count: 7 },
  { emoji: '🎈', count: 6 },
  { emoji: '🦋', count: 4 },
  { emoji: '🍕', count: 9 },
  { emoji: '🚗', count: 2 },
];

function CountGame({ onWin }: { onWin: (score: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const current = countRounds[idx];

  const handleSubmit = () => {
    if (parseInt(input) === current.count) {
      setFeedback('correct');
      const newScore = score + 10;
      setScore(newScore);
      if (idx >= countRounds.length - 1) {
        setGameOver(true);
        onWin(newScore);
      } else {
        setTimeout(() => { setIdx(i => i + 1); setInput(''); setFeedback(null); }, 800);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => { setInput(''); setFeedback(null); }, 800);
    }
  };

  return (
    <div className="text-center">
      {gameOver ? (
        <div className="py-8">
          <div className="text-6xl mb-4 animate-bounce">🔢</div>
          <p className="text-2xl font-black text-teal-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            ممتاز! أتقنت العد!
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 font-bold text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {idx + 1}/{countRounds.length}
          </div>
          <p className="text-gray-600 mb-4 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
            كم عدد الأشياء؟
          </p>
          <div className={`bg-gray-50 rounded-3xl p-6 mb-6 transition-all duration-300
            ${feedback === 'correct' ? 'bg-green-100' : feedback === 'wrong' ? 'bg-red-100' : ''}`}>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {Array.from({ length: current.count }).map((_, i) => (
                <span key={i} className="text-4xl">{current.emoji}</span>
              ))}
            </div>
            {feedback === 'correct' && <div className="text-3xl">✅ صحيح!</div>}
            {feedback === 'wrong' && <div className="text-3xl">❌ حاول مجدداً!</div>}
          </div>
          <div className="flex gap-3 justify-center mb-4">
            <input
              type="number"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="العدد"
              className="w-28 text-center text-2xl font-black border-2 border-teal-300 rounded-2xl py-3 focus:outline-none focus:border-teal-500"
              style={{ fontFamily: 'Tajawal, sans-serif' }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-3 rounded-2xl font-black text-lg shadow-lg"
              style={{ fontFamily: 'Tajawal, sans-serif' }}
            >
              تحقق ✓
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

// ===================== SHAPE MATCH GAME =====================
const shapes = [
  { name: 'دائرة', emoji: '⭕', options: ['⭕', '🔷', '🔺', '⬛'] },
  { name: 'مربع', emoji: '⬛', options: ['⭕', '🔷', '🔺', '⬛'] },
  { name: 'مثلث', emoji: '🔺', options: ['⭕', '🔷', '🔺', '⬛'] },
  { name: 'معين', emoji: '🔷', options: ['⭕', '🔷', '🔺', '⬛'] },
  { name: 'نجمة', emoji: '⭐', options: ['⭐', '🌙', '❤️', '💎'] },
  { name: 'قلب', emoji: '❤️', options: ['⭐', '🌙', '❤️', '💎'] },
];

function ShapeMatchGame({ onWin }: { onWin: (score: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const current = shapes[idx];

  const handleAnswer = (emoji: string) => {
    if (emoji === current.emoji) {
      setFeedback('correct');
      const newScore = score + 10;
      setScore(newScore);
      if (idx >= shapes.length - 1) {
        setGameOver(true);
        onWin(newScore);
      } else {
        setTimeout(() => { setIdx(i => i + 1); setFeedback(null); }, 600);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 600);
    }
  };

  return (
    <div className="text-center">
      {gameOver ? (
        <div className="py-8">
          <div className="text-6xl mb-4 animate-bounce">🔷</div>
          <p className="text-2xl font-black text-indigo-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            رائع! تعرفت على الأشكال!
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 font-bold text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {idx + 1}/{shapes.length}
          </div>
          <p className="text-gray-600 mb-4 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
            اختر الشكل الصحيح لـ:
          </p>
          <div className={`bg-gray-50 rounded-3xl p-8 mb-6 transition-all duration-300
            ${feedback === 'correct' ? 'bg-green-100' : feedback === 'wrong' ? 'bg-red-100' : ''}`}>
            <div className="text-5xl font-black text-gray-800 mb-2" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              {current.name}
            </div>
            {feedback === 'correct' && <div className="text-3xl">✅</div>}
            {feedback === 'wrong' && <div className="text-3xl">❌</div>}
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            {current.options.map(opt => (
              <motion.button
                key={opt}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAnswer(opt)}
                className="bg-white border-2 border-indigo-200 rounded-2xl p-6 text-5xl shadow-md hover:border-indigo-400 transition-colors"
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ===================== LETTER FIND GAME =====================
const letterRounds = [
  { sentence: 'الطفل يحب القراءة', letter: 'ل', count: 4 },
  { sentence: 'البيت كبير وجميل', letter: 'ب', count: 3 },
  { sentence: 'الشمس تضيء النهار', letter: 'ا', count: 4 },
  { sentence: 'الأطفال يلعبون معاً', letter: 'ل', count: 4 },
  { sentence: 'الكتاب مفيد ومثير', letter: 'م', count: 2 },
];

function LetterFindGame({ onWin }: { onWin: (score: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const current = letterRounds[idx];

  const handleSubmit = () => {
    if (parseInt(input) === current.count) {
      setFeedback('correct');
      const newScore = score + 15;
      setScore(newScore);
      if (idx >= letterRounds.length - 1) {
        setGameOver(true);
        onWin(newScore);
      } else {
        setTimeout(() => { setIdx(i => i + 1); setInput(''); setFeedback(null); }, 800);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => { setInput(''); setFeedback(null); }, 800);
    }
  };

  return (
    <div className="text-center">
      {gameOver ? (
        <div className="py-8">
          <div className="text-6xl mb-4 animate-bounce">🔍</div>
          <p className="text-2xl font-black text-violet-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            ممتاز! أتقنت إيجاد الحروف!
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 font-bold text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {idx + 1}/{letterRounds.length}
          </div>
          <p className="text-gray-600 mb-4 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
            كم مرة يظهر الحرف <span className="text-violet-600 font-black text-2xl">{current.letter}</span> في الجملة؟
          </p>
          <div className={`bg-gray-50 rounded-3xl p-8 mb-6 transition-all duration-300
            ${feedback === 'correct' ? 'bg-green-100' : feedback === 'wrong' ? 'bg-red-100' : ''}`}>
            <div className="text-2xl font-black text-gray-800 mb-4 leading-loose" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              {current.sentence.split('').map((char, i) => (
                <span key={i} className={char === current.letter ? 'text-violet-600 underline' : ''}>
                  {char}
                </span>
              ))}
            </div>
            {feedback === 'correct' && <div className="text-3xl">✅ صحيح!</div>}
            {feedback === 'wrong' && <div className="text-3xl">❌ حاول مجدداً!</div>}
          </div>
          <div className="flex gap-3 justify-center">
            <input
              type="number"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="العدد"
              className="w-28 text-center text-2xl font-black border-2 border-violet-300 rounded-2xl py-3 focus:outline-none focus:border-violet-500"
              style={{ fontFamily: 'Tajawal, sans-serif' }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-8 py-3 rounded-2xl font-black text-lg shadow-lg"
              style={{ fontFamily: 'Tajawal, sans-serif' }}
            >
              تحقق ✓
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

// ===================== ANIMAL SOUND GAME =====================
const animals = [
  { name: 'قطة', emoji: '🐱', sound: 'مياو', options: ['مياو', 'هاو', 'موو', 'كواك'] },
  { name: 'كلب', emoji: '🐶', sound: 'هاو', options: ['مياو', 'هاو', 'موو', 'كواك'] },
  { name: 'بقرة', emoji: '🐮', sound: 'موو', options: ['مياو', 'هاو', 'موو', 'كواك'] },
  { name: 'بطة', emoji: '🦆', sound: 'كواك', options: ['مياو', 'هاو', 'موو', 'كواك'] },
  { name: 'أسد', emoji: '🦁', sound: 'زئير', options: ['زئير', 'نهيق', 'ثغاء', 'صياح'] },
  { name: 'حمار', emoji: '🫏', sound: 'نهيق', options: ['زئير', 'نهيق', 'ثغاء', 'صياح'] },
];

function AnimalSoundGame({ onWin }: { onWin: (score: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const current = animals[idx];

  const handleAnswer = (sound: string) => {
    if (sound === current.sound) {
      setFeedback('correct');
      const newScore = score + 10;
      setScore(newScore);
      if (idx >= animals.length - 1) {
        setGameOver(true);
        onWin(newScore);
      } else {
        setTimeout(() => { setIdx(i => i + 1); setFeedback(null); }, 600);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 600);
    }
  };

  return (
    <div className="text-center">
      {gameOver ? (
        <div className="py-8">
          <div className="text-6xl mb-4 animate-bounce">🐾</div>
          <p className="text-2xl font-black text-lime-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            رائع! تعرفت على أصوات الحيوانات!
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 font-bold text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {idx + 1}/{animals.length}
          </div>
          <p className="text-gray-600 mb-4 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
            ما صوت هذا الحيوان؟
          </p>
          <div className={`bg-gray-50 rounded-3xl p-8 mb-6 transition-all duration-300
            ${feedback === 'correct' ? 'bg-green-100' : feedback === 'wrong' ? 'bg-red-100' : ''}`}>
            <div className="text-8xl mb-2">{current.emoji}</div>
            <div className="text-3xl font-black text-gray-800" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              {current.name}
            </div>
            {feedback === 'correct' && <div className="text-3xl mt-2">✅</div>}
            {feedback === 'wrong' && <div className="text-3xl mt-2">❌</div>}
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            {current.options.map(opt => (
              <motion.button
                key={opt}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(opt)}
                className="bg-white border-2 border-lime-300 text-lime-700 py-4 rounded-2xl font-black text-xl shadow-md hover:bg-lime-50 transition-colors"
                style={{ fontFamily: 'Tajawal, sans-serif' }}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ===================== FIND DIFFERENCE GAME =====================
function FindDiffGame({ onWin }: { onWin: (score: number) => void }) {
  const pairs = [
    {
      title: 'اعثر على الاختلاف بين المجموعتين',
      left: ['🐶', '🐱', '🐭', '🐰', '🦊'],
      right: ['🐶', '🐱', '🐹', '🐰', '🦊'],
      diffIndex: 2,
      diffItem: '🐹',
    },
    {
      title: 'اعثر على الاختلاف',
      left: ['🍎', '🍊', '🍋', '🍇', '🍓'],
      right: ['🍎', '🍊', '🍋', '🍇', '🍑'],
      diffIndex: 4,
      diffItem: '🍑',
    },
    {
      title: 'أي شيء مختلف؟',
      left: ['⭐', '⭐', '⭐', '⭐', '⭐'],
      right: ['⭐', '⭐', '🌟', '⭐', '⭐'],
      diffIndex: 2,
      diffItem: '🌟',
    },
  ];

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const current = pairs[idx];

  const handleClick = (side: 'right', itemIdx: number) => {
    if (side === 'right' && itemIdx === current.diffIndex) {
      setFeedback('correct');
      const newScore = score + 20;
      setScore(newScore);
      if (idx >= pairs.length - 1) {
        setGameOver(true);
        onWin(newScore);
      } else {
        setTimeout(() => { setIdx(i => i + 1); setFeedback(null); }, 800);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 600);
    }
  };

  return (
    <div className="text-center">
      {gameOver ? (
        <div className="py-8">
          <div className="text-6xl mb-4 animate-bounce">🔎</div>
          <p className="text-2xl font-black text-orange-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            عين نسر! وجدت كل الاختلافات!
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 font-bold text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {idx + 1}/{pairs.length}
          </div>
          <p className="text-gray-600 mb-6 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {current.title} - اضغط على الشيء المختلف في المجموعة اليمنى
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className={`bg-blue-50 rounded-2xl p-4 transition-colors ${feedback === 'correct' ? 'bg-green-50' : ''}`}>
              <p className="text-sm font-bold text-blue-600 mb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>المجموعة الأولى</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {current.left.map((item, i) => (
                  <span key={i} className="text-4xl">{item}</span>
                ))}
              </div>
            </div>
            <div className={`bg-orange-50 rounded-2xl p-4 transition-colors ${feedback === 'correct' ? 'bg-green-50' : feedback === 'wrong' ? 'bg-red-50' : ''}`}>
              <p className="text-sm font-bold text-orange-600 mb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>المجموعة الثانية</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {current.right.map((item, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleClick('right', i)}
                    className="text-4xl hover:bg-orange-100 rounded-xl p-1 transition-colors"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          {feedback === 'correct' && <div className="text-2xl font-bold text-green-600">✅ ممتاز! وجدت الاختلاف!</div>}
          {feedback === 'wrong' && <div className="text-2xl font-bold text-red-600">❌ حاول مجدداً!</div>}
        </>
      )}
    </div>
  );
}

// ===================== WORD MATCH GAME =====================
const wordMatchData = [
  { image: '🐶', word: 'كلب', options: ['قطة', 'كلب', 'أسد', 'حصان'] },
  { image: '🍎', word: 'تفاحة', options: ['موزة', 'تفاحة', 'برتقالة', 'عنبة'] },
  { image: '🏠', word: 'بيت', options: ['مدرسة', 'مسجد', 'بيت', 'حديقة'] },
  { image: '📚', word: 'كتاب', options: ['قلم', 'كتاب', 'مسطرة', 'حقيبة'] },
  { image: '🌙', word: 'قمر', options: ['شمس', 'نجمة', 'قمر', 'سحابة'] },
];

function WordMatchGame({ onWin }: { onWin: (score: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const current = wordMatchData[idx];

  const handleAnswer = (word: string) => {
    if (word === current.word) {
      setFeedback('correct');
      const newScore = score + 10;
      setScore(newScore);
      if (idx >= wordMatchData.length - 1) {
        setGameOver(true);
        onWin(newScore);
      } else {
        setTimeout(() => { setIdx(i => i + 1); setFeedback(null); }, 600);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 600);
    }
  };

  return (
    <div className="text-center">
      {gameOver ? (
        <div className="py-8">
          <div className="text-6xl mb-4 animate-bounce">🔗</div>
          <p className="text-2xl font-black text-emerald-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            ممتاز! وصلت الصور بالكلمات!
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 font-bold text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {idx + 1}/{wordMatchData.length}
          </div>
          <p className="text-gray-600 mb-4 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
            ما اسم هذه الصورة؟
          </p>
          <div className={`bg-gray-50 rounded-3xl p-10 mb-6 transition-all duration-300
            ${feedback === 'correct' ? 'bg-green-100' : feedback === 'wrong' ? 'bg-red-100' : ''}`}>
            <div className="text-8xl mb-2">{current.image}</div>
            {feedback === 'correct' && <div className="text-3xl">✅</div>}
            {feedback === 'wrong' && <div className="text-3xl">❌</div>}
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            {current.options.map(opt => (
              <motion.button
                key={opt}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(opt)}
                className="bg-white border-2 border-emerald-300 text-emerald-700 py-4 rounded-2xl font-black text-xl shadow-md hover:bg-emerald-50 transition-colors"
                style={{ fontFamily: 'Tajawal, sans-serif' }}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ===================== MAIN GAME PAGE =====================
const gameComponents: Record<string, React.FC<{ onWin: (score: number) => void }>> = {
  memory: MemoryGame,
  math: MathGame,
  colorGame: ColorGame,
  wordOrder: WordOrderGame,
  countGame: CountGame,
  shapeMatch: ShapeMatchGame,
  letterFind: LetterFindGame,
  animalSound: AnimalSoundGame,
  findDiff: FindDiffGame,
  wordMatch: WordMatchGame,
};

export default function GamePlay() {
  const params = useParams<{ id: string }>();
  const gameId = params.id as string;
  const game = games.find(g => g.id === gameId);
  const { addPoints, incrementGamesPlayed } = usePoints();
  const [gameKey, setGameKey] = useState(0);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  const GameComponent = gameComponents[gameId];

  if (!game || !GameComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-xl font-bold text-gray-600" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            اللعبة غير موجودة
          </p>
          <Link href="/games">
            <div className="mt-4 inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-2xl font-bold cursor-pointer"
              style={{ fontFamily: 'Tajawal, sans-serif' }}>
              <ArrowRight size={18} />
              العودة للألعاب
            </div>
          </Link>
        </div>
      </div>
    );
  }

  const handleWin = (score: number) => {
    setFinalScore(score);
    addPoints(score);
    incrementGamesPlayed();
  };

  const handleRestart = () => {
    setGameKey(k => k + 1);
    setFinalScore(null);
    setStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className={`bg-gradient-to-br ${game.color} py-8`}>
        <div className="container">
          <Link href="/games">
            <div className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 cursor-pointer font-semibold transition-colors"
              style={{ fontFamily: 'Cairo, sans-serif' }}>
              <ArrowRight size={18} />
              العودة إلى الألعاب
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-5xl animate-float">{game.emoji}</div>
            <div>
              <h1 className="text-3xl font-black text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                {game.title}
              </h1>
              <p className="text-white/80 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                {game.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10 max-w-2xl mx-auto">
        {!started && finalScore === null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-10"
          >
            <div className="text-7xl mb-6 animate-float">{game.emoji}</div>
            <h2 className="text-2xl font-black text-gray-800 mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              هل أنت مستعد للعب؟
            </h2>
            <p className="text-gray-500 mb-8 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
              {game.description}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStarted(true)}
              className={`bg-gradient-to-r ${game.color} text-white px-10 py-4 rounded-2xl font-black text-xl shadow-xl`}
              style={{ fontFamily: 'Tajawal, sans-serif' }}
            >
              🎮 ابدأ اللعب!
            </motion.button>
          </motion.div>
        )}

        {started && finalScore === null && (
          <motion.div
            key={gameKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100"
          >
            <GameComponent onWin={handleWin} />
          </motion.div>
        )}

        {finalScore !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="text-7xl mb-6 animate-bounce">🏆</div>
            <h2 className="text-3xl font-black text-gray-800 mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              أحسنت! انتهت اللعبة!
            </h2>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 mb-8 max-w-xs mx-auto">
              <div className="flex items-center justify-center gap-2 text-yellow-600 font-black text-2xl mb-2"
                style={{ fontFamily: 'Tajawal, sans-serif' }}>
                <Star size={28} className="fill-yellow-400" />
                +{finalScore} نقطة!
              </div>
              <div className="flex justify-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className="text-2xl animate-sparkle" style={{ animationDelay: `${s * 0.2}s` }}>⭐</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl"
                style={{ fontFamily: 'Tajawal, sans-serif' }}
              >
                <RefreshCw size={22} />
                العب مجدداً
              </motion.button>
              <Link href="/games">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl cursor-pointer"
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                >
                  <Home size={22} />
                  ألعاب أخرى
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
