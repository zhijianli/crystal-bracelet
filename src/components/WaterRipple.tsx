'use client';

import { useEffect, useRef } from 'react';

export function WaterRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置canvas尺寸为窗口大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 波纹参数
    const ripples: {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
      color: string;
    }[] = [];
    
    // 颜色选项
    const colors = [
      { stroke: 'rgba(180, 160, 255, ', glow: 'rgba(140, 120, 255, ' },  // 紫色
      { stroke: 'rgba(140, 180, 255, ', glow: 'rgba(100, 140, 255, ' },  // 蓝色
      { stroke: 'rgba(200, 140, 255, ', glow: 'rgba(180, 100, 255, ' },  // 粉紫色
    ];
    
    // 每隔一段时间创建新的波纹
    const createRipple = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const colorSet = colors[Math.floor(Math.random() * colors.length)];
      
      ripples.push({
        x: centerX,
        y: centerY,
        radius: 10, // 从10开始，而不是0，避免负半径
        maxRadius: Math.min(canvas.width, canvas.height) * (0.5 + Math.random() * 0.3),
        opacity: 0.25 + Math.random() * 0.15,
        speed: 1.5 + Math.random() * 2.0,
        color: colorSet.stroke
      });
      
      // 限制波纹数量 - 减少到3个
      if (ripples.length > 3) {
        ripples.shift();
      }
    };
    
    // 初始创建几个波纹 - 减少到2个
    for (let i = 0; i < 2; i++) {
      createRipple();
      ripples[i].radius = Math.max(10, ripples[i].maxRadius * (i / 2));
    }
    
    // 定时创建新波纹 - 进一步降低频率
    const rippleInterval = setInterval(createRipple, 4500);
    
    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 绘制所有波纹
      ripples.forEach((ripple, index) => {
        // 更新波纹半径
        ripple.radius += ripple.speed;
        
        // 当波纹达到最大半径时，降低不透明度
        const opacityFactor = Math.max(0, 1 - ripple.radius / ripple.maxRadius);
        const currentOpacity = ripple.opacity * opacityFactor;
        
        // 添加发光效果 - 确保半径不为负数
        const innerRadius = Math.max(0, ripple.radius - 10);
        const gradient = ctx.createRadialGradient(
          ripple.x, ripple.y, innerRadius,
          ripple.x, ripple.y, ripple.radius + 10
        );
        gradient.addColorStop(0, `rgba(180, 160, 255, 0)`);
        gradient.addColorStop(0.5, `${ripple.color}${currentOpacity * 0.2})`);
        gradient.addColorStop(1, `rgba(180, 160, 255, 0)`);
        
        // 绘制发光效果
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // 绘制主波纹
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${ripple.color}${currentOpacity})`; 
        ctx.lineWidth = 3.5;
        ctx.stroke();
        
        // 移除内部波纹线，只保留主波纹
      });
      
      // 移除超出范围的波纹
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (ripples[i].radius > ripples[i].maxRadius) {
          ripples.splice(i, 1);
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(rippleInterval);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 1.0 }}
    />
  );
} 