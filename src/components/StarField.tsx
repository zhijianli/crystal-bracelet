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
  // 返回一个空的div，不渲染任何内容
  return <div className="absolute inset-0"></div>;
} 