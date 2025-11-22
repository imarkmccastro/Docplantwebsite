import { motion } from 'motion/react';
import { Leaf, Sprout } from 'lucide-react';

export function EcoBackground() {
  // Floating leaf particles
  const leafPositions = [
    { x: '10%', y: '20%', delay: 0, duration: 20 },
    { x: '80%', y: '10%', delay: 5, duration: 25 },
    { x: '60%', y: '70%', delay: 10, duration: 22 },
    { x: '20%', y: '80%', delay: 3, duration: 18 },
    { x: '90%', y: '50%', delay: 8, duration: 24 },
    { x: '40%', y: '30%', delay: 12, duration: 21 },
  ];

  return (
    <>
      {/* Soft gradient waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient wave */}
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-30"
          style={{
            background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
          }}
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['-5%', '5%', '-5%'],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Secondary gradient wave */}
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] opacity-25"
          style={{
            background: 'radial-gradient(circle at center, rgba(110, 231, 183, 0.25) 0%, transparent 70%)',
          }}
          animate={{
            x: ['10%', '-10%', '10%'],
            y: ['5%', '-5%', '5%'],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Tertiary gradient wave - earthy tones */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[150%] h-[150%] opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(146, 114, 95, 0.15) 0%, transparent 60%)',
          }}
          animate={{
            x: ['0%', '15%', '0%'],
            y: ['0%', '10%', '0%'],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Floating leaf particles */}
      {leafPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: pos.x,
            top: pos.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0.4, 0.6, 0],
            scale: [0, 1, 1, 1, 0],
            y: [0, -30, -60, -90, -120],
            x: [0, 10, -5, 15, -10],
            rotate: [0, 180, 360, 540, 720],
          }}
          transition={{
            duration: pos.duration,
            delay: pos.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {i % 2 === 0 ? (
            <Leaf className="w-6 h-6 text-emerald-500/40" />
          ) : (
            <Sprout className="w-5 h-5 text-green-500/30" />
          )}
        </motion.div>
      ))}

      {/* Organic blob shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob 1 - Top left */}
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-green-300/10 blur-3xl"
          style={{
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          }}
          animate={{
            borderRadius: [
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '40% 60% 70% 30% / 40% 70% 30% 60%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
            ],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Blob 2 - Bottom right */}
        <motion.div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-green-300/15 to-emerald-200/10 blur-3xl"
          style={{
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          }}
          animate={{
            borderRadius: [
              '30% 70% 70% 30% / 30% 30% 70% 70%',
              '70% 30% 30% 70% / 70% 70% 30% 30%',
              '30% 70% 70% 30% / 30% 30% 70% 70%',
            ],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Blob 3 - Center right */}
        <motion.div
          className="absolute top-1/2 -right-24 w-80 h-80 bg-gradient-to-l from-mint-300/10 to-sage-200/10 blur-2xl"
          style={{
            borderRadius: '50% 50% 30% 70% / 50% 70% 30% 50%',
          }}
          animate={{
            borderRadius: [
              '50% 50% 30% 70% / 50% 70% 30% 50%',
              '50% 50% 70% 30% / 30% 50% 70% 50%',
              '50% 50% 30% 70% / 50% 70% 30% 50%',
            ],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
