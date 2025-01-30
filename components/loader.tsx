"use client";

import { useState, useEffect, useCallback } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  color: string;
};

export default function RotatingParticlesLoader() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isRotating, setIsRotating] = useState(true);

  const createParticle = useCallback((): Particle => {
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6ab04c"];
    return {
      x: 0,
      y: 0,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }, []);

  useEffect(() => {
    setParticles(Array.from({ length: 30 }, createParticle));
  }, [createParticle]);

  useEffect(() => {
    const animateParticles = () => {
      if (!isRotating) return;
      setParticles((prevParticles) =>
        prevParticles.map((p) => ({
          ...p,
          angle: p.angle + p.speed,
        }))
      );
    };

    const intervalId = setInterval(animateParticles, 16);
    return () => clearInterval(intervalId);
  }, [isRotating]);

  const toggleRotation = () => {
    setIsRotating((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div
        className="relative w-52 h-52 cursor-pointer"
        onClick={toggleRotation}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleRotation();
          }
        }}
        aria-label="Toggle rotation"
      >
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute rounded-full transition-all duration-300 ease-in-out"
            style={{
              left: `calc(50% + ${Math.cos(particle.angle) * 120}px)`,
              top: `calc(50% + ${Math.sin(particle.angle) * 120}px)`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              transform: `scale(${isRotating ? 1 : 0.5})`,
              opacity: isRotating ? 1 : 0.5,
            }}
          ></div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg font-bold">John...</span>
        </div>
      </div>
    </div>
  );
}
