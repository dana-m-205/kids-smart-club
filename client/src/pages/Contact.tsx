import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-teal-600 py-16 text-white text-center">
        <div className="text-6xl mb-4 animate-float">📧</div>
        <h1 className="text-4xl md:text-5xl font-black mb-3"
          style={{ fontFamily: 'Tajawal, sans-serif', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
          تواصل معنا
        </h1>
        <p className="text-green-100 text-xl font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
          نحن هنا للإجابة على استفساراتك ومقترحاتك
        </p>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-8" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              معلومات التواصل
            </h2>
            <div className="space-y-6">
              {[
                { icon: Mail, title: 'البريد الإلكتروني', value: 'info@kids-smart-club.com', color: 'text-blue-600', bg: 'bg-blue-50' },
                { icon: Phone, title: 'الهاتف', value: '+966 XX XXX XXXX', color: 'text-green-600', bg: 'bg-green-50' },
                { icon: MapPin, title: 'الموقع', value: 'المملكة العربية السعودية', color: 'text-red-600', bg: 'bg-red-50' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-4 ${item.bg} rounded-2xl p-5`}
                  >
                    <div className={`${item.color} shrink-0`}>
                      <Icon size={28} />
                    </div>
                    <div>
                      <div className="font-black text-gray-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                        {item.title}
                      </div>
                      <div className="text-gray-500 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                        {item.value}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6">
              <h3 className="font-black text-yellow-700 text-lg mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                🕐 ساعات العمل
              </h3>
              <p className="text-yellow-600 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                الأحد - الخميس: 9 صباحاً - 5 مساءً
              </p>
              <p className="text-yellow-500 text-sm mt-1 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                نرد على الرسائل خلال 24 ساعة
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {submitted ? (
              <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-green-100 text-center">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-gray-800 mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  تم إرسال رسالتك!
                </h3>
                <p className="text-gray-500 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 bg-green-500 text-white px-8 py-3 rounded-2xl font-black hover:bg-green-600 transition-colors"
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100">
                <h2 className="text-2xl font-black text-gray-800 mb-6" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  أرسل لنا رسالة
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2 text-right"
                      style={{ fontFamily: 'Cairo, sans-serif' }}>
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="أدخل اسمك الكامل"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-right font-semibold"
                      style={{ fontFamily: 'Cairo, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2 text-right"
                      style={{ fontFamily: 'Cairo, sans-serif' }}>
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-right font-semibold"
                      style={{ fontFamily: 'Cairo, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2 text-right"
                      style={{ fontFamily: 'Cairo, sans-serif' }}>
                      الموضوع *
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-right font-semibold bg-white"
                      style={{ fontFamily: 'Cairo, sans-serif' }}
                    >
                      <option value="">اختر الموضوع</option>
                      <option value="suggestion">اقتراح</option>
                      <option value="complaint">شكوى</option>
                      <option value="question">استفسار</option>
                      <option value="partnership">شراكة</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2 text-right"
                      style={{ fontFamily: 'Cairo, sans-serif' }}>
                      الرسالة *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="اكتب رسالتك هنا..."
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-right font-semibold resize-none"
                      style={{ fontFamily: 'Cairo, sans-serif' }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg"
                    style={{ fontFamily: 'Tajawal, sans-serif' }}
                  >
                    <Send size={20} />
                    إرسال الرسالة
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
