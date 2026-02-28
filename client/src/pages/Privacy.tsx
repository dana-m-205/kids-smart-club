import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserX, Bell, Mail } from 'lucide-react';

const sections = [
  {
    icon: Shield,
    title: 'حماية الأطفال',
    color: 'text-green-600',
    bg: 'bg-green-50',
    content: 'نادي الأذكياء الصغار ملتزم بحماية خصوصية الأطفال وأمانهم. لا نجمع أي معلومات شخصية من الأطفال دون موافقة ولي الأمر. جميع المحتوى على موقعنا آمن ومناسب للأطفال من عمر 6 إلى 12 سنة.',
  },
  {
    icon: Lock,
    title: 'البيانات التي نجمعها',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    content: 'لا نجمع أي بيانات شخصية من الأطفال. نستخدم فقط بيانات التصفح المجهولة لتحسين تجربة المستخدم. نقاط اللعبة والإنجازات تُحفظ محلياً على جهازك فقط ولا تُرسل لخوادمنا.',
  },
  {
    icon: Eye,
    title: 'ملفات تعريف الارتباط',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    content: 'نستخدم ملفات تعريف الارتباط الضرورية فقط لتشغيل الموقع بشكل صحيح. لا نستخدم ملفات تعريف الارتباط للتتبع الإعلاني أو مشاركة البيانات مع أطراف ثالثة.',
  },
  {
    icon: UserX,
    title: 'لا إعلانات ضارة',
    color: 'text-red-600',
    bg: 'bg-red-50',
    content: 'موقعنا خالٍ تماماً من الإعلانات الضارة أو المحتوى غير المناسب. نحن لا نعرض أي إعلانات موجهة للأطفال ولا نشارك بياناتهم مع أي شركات إعلانية.',
  },
  {
    icon: Bell,
    title: 'التحديثات والتغييرات',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    content: 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطر المستخدمين بأي تغييرات جوهرية. استمرارك في استخدام الموقع بعد التغييرات يعني موافقتك على السياسة المحدثة.',
  },
  {
    icon: Mail,
    title: 'تواصل معنا',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    content: 'إذا كان لديك أي استفسارات حول سياسة الخصوصية أو كيفية تعاملنا مع البيانات، يرجى التواصل معنا عبر صفحة التواصل. نلتزم بالرد على جميع الاستفسارات خلال 48 ساعة.',
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-700 to-slate-900 py-16 text-white text-center">
        <div className="text-6xl mb-4">🛡️</div>
        <h1 className="text-4xl md:text-5xl font-black mb-3"
          style={{ fontFamily: 'Tajawal, sans-serif' }}>
          سياسة الخصوصية
        </h1>
        <p className="text-slate-300 text-lg font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
          نحمي خصوصية أطفالكم ونضمن أمانهم
        </p>
        <p className="text-slate-400 text-sm mt-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
          آخر تحديث: يناير 2026
        </p>
      </div>

      <div className="container py-16 max-w-4xl mx-auto">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-8 mb-10 text-center"
        >
          <Shield size={48} className="text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-blue-800 mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            التزامنا بحماية الأطفال
          </h2>
          <p className="text-blue-600 font-semibold leading-loose" style={{ fontFamily: 'Cairo, sans-serif' }}>
            نادي الأذكياء الصغار يلتزم بأعلى معايير الأمان والخصوصية لحماية أطفالكم.
            نحن لا نجمع أي بيانات شخصية ولا نعرض أي محتوى ضار.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`${section.bg} rounded-3xl p-8`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${section.color} shrink-0 mt-1`}>
                    <Icon size={32} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-black ${section.color} mb-3`}
                      style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      {section.title}
                    </h3>
                    <p className="text-gray-600 font-semibold leading-loose"
                      style={{ fontFamily: 'Cairo, sans-serif' }}>
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center bg-gray-50 rounded-3xl p-8"
        >
          <p className="text-gray-500 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
            هذه السياسة سارية المفعول اعتباراً من يناير 2026.
            للاستفسارات، تواصل معنا عبر{' '}
            <a href="/contact" className="text-blue-600 hover:underline font-bold">
              صفحة التواصل
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
