import { motion } from 'framer-motion';
import { Heart, Shield, Star, BookOpen, Gamepad2, Brain, Video, Users, Award } from 'lucide-react';

const team = [
  { name: 'فريق المحتوى', role: 'كتّاب القصص والألغاز', emoji: '✍️' },
  { name: 'فريق التصميم', role: 'مصممو الواجهات والألعاب', emoji: '🎨' },
  { name: 'فريق التعليم', role: 'خبراء التعليم للأطفال', emoji: '🎓' },
  { name: 'فريق الأمان', role: 'حماية المحتوى والخصوصية', emoji: '🛡️' },
];

const values = [
  { icon: Shield, title: 'الأمان أولاً', desc: 'محتوى آمن 100% بدون إعلانات ضارة أو محتوى غير مناسب', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: BookOpen, title: 'التعلم بالمرح', desc: 'نؤمن أن التعلم يجب أن يكون ممتعاً ومثيراً للأطفال', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Heart, title: 'محبة الأطفال', desc: 'كل ما نفعله مبني على حب الأطفال ورغبتنا في مساعدتهم', color: 'text-pink-600', bg: 'bg-pink-50' },
  { icon: Star, title: 'الجودة العالية', desc: 'نقدم محتوى عالي الجودة مراجعاً من متخصصين في التعليم', color: 'text-yellow-600', bg: 'bg-yellow-50' },
];

const features = [
  { icon: BookOpen, label: 'قصص تعليمية', count: '20+', color: 'from-blue-400 to-cyan-500' },
  { icon: Video, label: 'فيديوهات ترفيهية', count: '15+', color: 'from-pink-400 to-rose-500' },
  { icon: Gamepad2, label: 'ألعاب تفاعلية', count: '10+', color: 'from-green-400 to-emerald-500' },
  { icon: Brain, label: 'ألغاز وتحديات', count: '20+', color: 'from-amber-400 to-orange-500' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-16 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-7xl mb-4 animate-float">🦉</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: 'Tajawal, sans-serif', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
            من نحن؟
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto font-semibold"
            style={{ fontFamily: 'Cairo, sans-serif' }}>
            نادي الأذكياء الصغار — منصة تعليمية تفاعلية مخصصة للأطفال العرب من عمر 6 إلى 12 سنة
          </p>
        </motion.div>
      </div>

      <div className="container py-16">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-black text-gray-800 mb-6" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            رسالتنا 🎯
          </h2>
          <p className="text-gray-600 text-lg leading-loose font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
            نسعى إلى تقديم تجربة تعليمية ممتعة وآمنة للأطفال العرب، من خلال محتوى تفاعلي يجمع بين التعلم والترفيه. 
            نؤمن أن كل طفل يستحق الحصول على أدوات تعليمية عالية الجودة تساعده على تطوير مهاراته وتوسيع مداركه.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`bg-gradient-to-br ${f.color} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <Icon size={32} className="text-white" />
                </div>
                <div className="text-3xl font-black text-gray-800" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  {f.count}
                </div>
                <div className="text-gray-500 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  {f.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-gray-800 text-center mb-10" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            قيمنا ومبادئنا 💎
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${v.bg} rounded-3xl p-6 flex items-start gap-4`}
                >
                  <div className={`${v.color} shrink-0`}>
                    <Icon size={32} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-black ${v.color} mb-2`} style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      {v.title}
                    </h3>
                    <p className="text-gray-600 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-gray-800 text-center mb-10" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            فريقنا 👥
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-6 text-center shadow-md border-2 border-gray-100 hover:border-blue-200 transition-colors"
              >
                <div className="text-5xl mb-3">{member.emoji}</div>
                <h3 className="font-black text-gray-800 mb-1" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  {member.name}
                </h3>
                <p className="text-gray-500 text-sm font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Age Range */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white text-center"
        >
          <Users size={48} className="mx-auto mb-4 text-blue-200" />
          <h2 className="text-3xl font-black mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            مناسب للأعمار 6-12 سنة
          </h2>
          <p className="text-blue-100 text-lg font-semibold max-w-2xl mx-auto" style={{ fontFamily: 'Cairo, sans-serif' }}>
            صُمم المحتوى بعناية لمناسبة الأطفال في هذه المرحلة العمرية الحساسة، مع مراعاة المستوى اللغوي والمعرفي المناسب.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
