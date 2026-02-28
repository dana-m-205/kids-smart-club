import { useEffect, useState } from 'react';
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, BookOpen, Star, Volume2, VolumeX, Lightbulb } from 'lucide-react';
import { stories } from '@/lib/data';
import { usePoints } from '@/contexts/PointsContext';

export default function StoryDetail() {
  const params = useParams<{ id: string }>();
  const story = stories.find(s => s.id === parseInt(params.id || '1'));
  const { incrementStoriesRead, addPoints } = usePoints();
  const [isReading, setIsReading] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-xl font-bold text-gray-600" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            القصة غير موجودة
          </p>
          <Link href="/stories">
            <div className="mt-4 inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold cursor-pointer"
              style={{ fontFamily: 'Tajawal, sans-serif' }}>
              <ArrowRight size={18} />
              العودة للقصص
            </div>
          </Link>
        </div>
      </div>
    );
  }

  const handleStartReading = () => {
    setIsReading(true);
    setCurrentParagraph(0);
  };

  const handleNextParagraph = () => {
    if (currentParagraph < story.content.length - 1) {
      setCurrentParagraph(prev => prev + 1);
    } else {
      setCompleted(true);
      incrementStoriesRead();
      addPoints(15);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      utterance.onend = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSpeakAll = () => {
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }
      const fullText = story.content.join(' ');
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      utterance.onend = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className={`bg-gradient-to-br ${story.color} py-12 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="absolute text-4xl animate-float-slow"
              style={{ left: `${i * 10}%`, top: `${Math.random() * 80}%`, animationDelay: `${i * 0.5}s` }}>
              ⭐
            </div>
          ))}
        </div>
        <div className="container relative z-10">
          <Link href="/stories">
            <div className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 cursor-pointer font-semibold transition-colors"
              style={{ fontFamily: 'Cairo, sans-serif' }}>
              <ArrowRight size={18} />
              العودة إلى القصص
            </div>
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-8xl animate-float">{story.emoji}</div>
            <div className="text-center md:text-right">
              <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold mb-3"
                style={{ fontFamily: 'Cairo, sans-serif' }}>
                {story.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-3"
                style={{ fontFamily: 'Tajawal, sans-serif', textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>
                {story.title}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-4 text-white/80 text-sm"
                style={{ fontFamily: 'Cairo, sans-serif' }}>
                <span className="flex items-center gap-1"><Clock size={14} />{story.readTime}</span>
                <span className="flex items-center gap-1"><Users size={14} />{story.ageRange} سنة</span>
                <span className="flex items-center gap-1"><Star size={14} />15 نقطة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="container py-10 max-w-3xl mx-auto">
        {!isReading && !completed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-10"
          >
            <div className="text-6xl mb-6 animate-float">{story.emoji}</div>
            <h2 className="text-2xl font-black text-gray-800 mb-4"
              style={{ fontFamily: 'Tajawal, sans-serif' }}>
              هل أنت مستعد للقراءة؟
            </h2>
            <p className="text-gray-500 mb-8 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
              ستحصل على 15 نقطة عند إتمام القصة!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartReading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl"
                style={{ fontFamily: 'Tajawal, sans-serif' }}
              >
                <BookOpen size={22} />
                اقرأ القصة
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSpeakAll}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl"
                style={{ fontFamily: 'Tajawal, sans-serif' }}
              >
                {speaking ? <VolumeX size={22} /> : <Volume2 size={22} />}
                {speaking ? 'إيقاف الصوت' : 'استمع للقصة'}
              </motion.button>
            </div>
          </motion.div>
        )}

        {isReading && !completed && (
          <motion.div
            key={currentParagraph}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Progress */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-3 transition-all duration-500"
                  style={{ width: `${((currentParagraph + 1) / story.content.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>
                {currentParagraph + 1}/{story.content.length}
              </span>
            </div>

            {/* Paragraph */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-blue-50">
              <div className="flex justify-between items-start mb-4">
                <button
                  onClick={() => handleSpeak(story.content[currentParagraph])}
                  className="p-2 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                >
                  {speaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <span className="text-4xl">{story.emoji}</span>
              </div>
              <p className="text-gray-700 text-xl leading-loose font-semibold text-right"
                style={{ fontFamily: 'Cairo, sans-serif', lineHeight: '2.2' }}>
                {story.content[currentParagraph]}
              </p>
            </div>

            <div className="flex justify-between items-center">
              {currentParagraph > 0 && (
                <button
                  onClick={() => setCurrentParagraph(prev => prev - 1)}
                  className="flex items-center gap-2 bg-gray-100 text-gray-600 px-5 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                >
                  <ArrowRight size={18} />
                  السابق
                </button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextParagraph}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-black shadow-lg mr-auto"
                style={{ fontFamily: 'Tajawal, sans-serif' }}
              >
                {currentParagraph === story.content.length - 1 ? '🎉 أنهيت القصة!' : 'التالي'}
              </motion.button>
            </div>
          </motion.div>
        )}

        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="text-7xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-3xl font-black text-gray-800 mb-4"
              style={{ fontFamily: 'Tajawal, sans-serif' }}>
              أحسنت! أنهيت القصة!
            </h2>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 text-yellow-600 font-black text-xl mb-2"
                style={{ fontFamily: 'Tajawal, sans-serif' }}>
                <Star size={24} className="fill-yellow-400" />
                +15 نقطة مكتسبة!
              </div>
              <div className="flex justify-center gap-1 mb-4">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className="text-2xl animate-sparkle" style={{ animationDelay: `${s * 0.2}s` }}>⭐</span>
                ))}
              </div>
            </div>

            {story.moral && (
              <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-6 mb-8 max-w-md mx-auto">
                <div className="flex items-center gap-2 text-green-700 font-black text-lg mb-2"
                  style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  <Lightbulb size={22} />
                  الدرس المستفاد
                </div>
                <p className="text-green-600 font-semibold text-right" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  {story.moral}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/stories">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl cursor-pointer"
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                >
                  <BookOpen size={22} />
                  قصة أخرى
                </motion.div>
              </Link>
              <Link href="/games">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl cursor-pointer"
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                >
                  العب الآن 🎮
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
