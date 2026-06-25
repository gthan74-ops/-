import { useMemo } from 'react';

export default function RainEffect({ intensity = 20 }) {
  const drops = useMemo(() =>
    Array.from({ length: intensity }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      height: `${60 + Math.random() * 80}px`,
      duration: `${6 + Math.random() * 8}s`,
      delay: `${Math.random() * 8}s`,
      opacity: 0.04 + Math.random() * 0.08,
    })),
    [intensity]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: drop.left,
            height: drop.height,
            animationDuration: drop.duration,
            animationDelay: drop.delay,
            opacity: drop.opacity,
          }}
        />
      ))}
    </div>
  );
}
