import React from 'react';

export const BackgroundEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 1. Subtle Static Ambient Color Gradients */}
      <div className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vh] rounded-full bg-emerald-300/15 dark:bg-emerald-900/15 blur-[120px]" />
      <div className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vh] rounded-full bg-teal-200/15 dark:bg-teal-950/20 blur-[140px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[45vh] rounded-full bg-slate-200/20 dark:bg-emerald-950/20 blur-[130px]" />

      {/* 2. Ultra-Clean Static Tech Grid Overlay with Center Radial Mask */}
      <div 
        className="absolute inset-0 bg-tech-grid opacity-20 dark:opacity-15"
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 85%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 85%)',
        }}
      />
    </div>
  );
};


