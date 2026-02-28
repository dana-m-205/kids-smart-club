import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { usePoints } from '@/contexts/PointsContext';
import { Menu, X, Star, BookOpen, Video, Gamepad2, Brain, Home, Info, Mail } from 'lucide-react';

const navItems = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/stories', label: 'القصص', icon: BookOpen },
  { href: '/videos', label: 'الفيديوهات', icon: Video },
  { href: '/games', label: 'الألعاب', icon: Gamepad2 },
  { href: '/puzzles', label: 'الألغاز', icon: Brain },
  { href: '/about', label: 'من نحن', icon: Info },
  // { href: '/contact', label: 'تواصل معنا', icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { points, level } = usePoints();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b-2 border-blue-100">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-xl md:text-2xl">🦉</span>
              </div>
              <div>
                <div className="font-black text-base md:text-lg leading-tight" style={{ fontFamily: 'Tajawal, sans-serif', color: 'oklch(0.35 0.15 250)' }}>
                  نادي الأذكياء
                </div>
                <div className="text-xs font-bold" style={{ fontFamily: 'Cairo, sans-serif', color: 'oklch(0.55 0.12 220)' }}>
                  الصغار
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer
                    ${isActive
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    style={{ fontFamily: 'Tajawal, sans-serif' }}
                  >
                    <Icon size={15} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Points Badge */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-2xl shadow-md">
              <Star size={16} className="fill-white" />
              <span className="font-black text-sm" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                {points} نقطة
              </span>
              <span className="bg-white/30 px-2 py-0.5 rounded-full text-xs font-bold">
                مستوى {level}
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-blue-100 shadow-lg">
          <div className="container py-4 space-y-1">
            {/* Mobile Points */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-3 rounded-2xl shadow-md mb-3">
              <Star size={18} className="fill-white" />
              <span className="font-black" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                {points} نقطة - مستوى {level}
              </span>
            </div>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 cursor-pointer
                      ${isActive
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    style={{ fontFamily: 'Tajawal, sans-serif' }}
                  >
                    <Icon size={20} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
