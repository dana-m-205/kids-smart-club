import { Link } from 'wouter';
import { Heart, Shield, Mail, Info } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <span className="text-2xl">🦉</span>
              </div>
              <div>
                <div className="font-black text-xl" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  نادي الأذكياء الصغار
                </div>
                <div className="text-blue-200 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  عالم التعلم والمرح
                </div>
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed" style={{ fontFamily: 'Cairo, sans-serif' }}>
              مدونة تعليمية تفاعلية آمنة ومسلية للأطفال من عمر 6 إلى 12 سنة. نقدم قصصاً، فيديوهات، ألعاباً وألغازاً تعليمية ممتعة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-black text-lg mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              روابط سريعة
            </h3>
            <div className="space-y-2">
              {[
                { href: '/stories', label: '📚 القصص' },
                { href: '/videos', label: '🎥 الفيديوهات' },
                { href: '/games', label: '🎮 الألعاب' },
                { href: '/puzzles', label: '🧩 الألغاز' },
                { href: '/about', label: '💡 من نحن' },
                // { href: '/contact', label: '📧 تواصل معنا' },
              ].map(link => (
                <Link key={link.href} href={link.href}>
                  <div className="text-blue-100 hover:text-white transition-colors cursor-pointer text-sm font-semibold"
                    style={{ fontFamily: 'Cairo, sans-serif' }}>
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Safety & Privacy */}
          <div>
            <h3 className="font-black text-lg mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              أمان وخصوصية
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Shield size={18} className="text-green-300 mt-0.5 shrink-0" />
                <p className="text-blue-100 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  محتوى آمن 100% بدون إعلانات ضارة
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Heart size={18} className="text-pink-300 mt-0.5 shrink-0" />
                <p className="text-blue-100 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  مصمم خصيصاً للأطفال من 6-12 سنة
                </p>
              </div>
              <Link href="/privacy">
                <div className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors cursor-pointer text-sm font-semibold"
                  style={{ fontFamily: 'Cairo, sans-serif' }}>
                  <Info size={16} />
                  سياسة الخصوصية
                </div>
              </Link>
              {/* <Link href="/contact">
                <div className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors cursor-pointer text-sm font-semibold"
                  style={{ fontFamily: 'Cairo, sans-serif' }}>
                  <Mail size={16} />
                  تواصل مع الإدارة
                </div>
              </Link> */}
            </div>
          </div>
        </div>

        <div className="border-t border-blue-500 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blue-200 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
            © 2026 نادي الأذكياء الصغار - جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-2 text-blue-200 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
            <span>صُنع بـ</span>
            <Heart size={14} className="text-pink-300 fill-pink-300" />
            <span>للأطفال العرب</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
