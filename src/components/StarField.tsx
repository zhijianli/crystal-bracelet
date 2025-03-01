'use client';

import { useEffect, useRef } from 'react';

interface OrbitalStar {
  angle: number;
  speed: number;
  size: number;
  opacity: number;
  orbitRadius: number;
  orbitIndex: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 3D 效果参数
    const perspective = 800; // 透视深度
    const tiltAngle = Math.PI * 0.2; // 俯视角度（约36度）
    const rotationAngle = 0; // 移除水平旋转，保持左右对齐

    const createOrbitalStars = () => {
      const stars: OrbitalStar[] = [];
      const centerX = canvas.width / 2;
      const minRadius = Math.min(centerX, canvas.height / 2) * 0.25;
      const radiusStep = Math.min(centerX, canvas.height / 2) * 0.12;

      for (let orbit = 0; orbit < 7; orbit++) {
        const orbitRadius = minRadius + (orbit * radiusStep);
        const starsInOrbit = 3 + orbit;

        for (let i = 0; i < starsInOrbit; i++) {
          stars.push({
            angle: (Math.PI * 2 * i) / starsInOrbit,
            speed: 0.001 * (1.5 - orbit * 0.15),
            size: 2.5 + Math.random(),
            opacity: 0.6 + Math.random() * 0.4,
            orbitRadius,
            orbitIndex: orbit
          });
        }
      }
      return stars;
    };

    const stars = createOrbitalStars();

    // 3D 坐标转换函数
    const transform3D = (x: number, y: number, z: number) => {
      // 只应用俯视角度的变换
      const tiltedY = y * Math.cos(tiltAngle) - z * Math.sin(tiltAngle);
      const tiltedZ = y * Math.sin(tiltAngle) + z * Math.cos(tiltAngle);

      // 应用透视投影，保持x轴不变
      const scale = perspective / (perspective + tiltedZ);
      
      return {
        x: canvas.width / 2 + x * scale, // x轴保持原始位置，只缩放
        y: canvas.height / 2 + tiltedY * scale,
        scale
      };
    };

    // 绘制椭圆轨道
    const drawOrbits = () => {
      stars.forEach(star => {
        ctx.beginPath();
        // 增加轨道亮度
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - star.orbitIndex / 8)})`;
        ctx.lineWidth = 1;
        
        // 使用更多的点来绘制更平滑的椭圆
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.05) {
          const x = Math.cos(angle) * star.orbitRadius;
          const y = Math.sin(angle) * star.orbitRadius;
          const point = transform3D(x, y, 0);
          
          if (angle === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }
        
        ctx.closePath();
        ctx.stroke();
      });
    };

    // 绘制星星
    const drawStar = (star: OrbitalStar) => {
      const x = Math.cos(star.angle) * star.orbitRadius;
      const y = Math.sin(star.angle) * star.orbitRadius;
      const point = transform3D(x, y, 0);

      // 根据z位置调整大小和亮度
      const adjustedSize = star.size * point.scale;
      const adjustedOpacity = star.opacity * point.scale;

      // 星星的光晕效果
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, adjustedSize * 2
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${adjustedOpacity})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(point.x, point.y, adjustedSize * 2, 0, Math.PI * 2);
      ctx.fill();

      // 星星的核心
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${adjustedOpacity})`;
      ctx.arc(point.x, point.y, adjustedSize, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawOrbits();
      stars.forEach(star => {
        star.angle += star.speed;
        drawStar(star);
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
    />
  );
} 