import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  emoji?: string;
}

const colors = [
  'rgba(79, 195, 247, 0.3)',
  'rgba(129, 199, 132, 0.3)',
  'rgba(255, 213, 79, 0.3)',
  'rgba(244, 143, 177, 0.3)',
  'rgba(179, 157, 219, 0.3)',
];

const emojis = ['⭐', '🌟', '✨', '💫', '🎈', '🌸', '🦋', '🌈'];

export default function FloatingBubbles({ count = 8 }: { count?: number }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles: Bubble[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 40 + 20,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: Math.random() > 0.5 ? emojis[Math.floor(Math.random() * emojis.length)] : undefined,
    }));
    setBubbles(newBubbles);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            bottom: '-100px',
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: bubble.color,
            animation: `bubble-rise ${bubble.duration}s ${bubble.delay}s infinite linear`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${bubble.size * 0.5}px`,
          }}
        >
          {bubble.emoji}
        </div>
      ))}
    </div>
  );
}
