'use client';

import { useState } from 'react';
import Image from 'next/image';

export function MBTIForm() {
  const [mbti, setMbti] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResult(false);

    try {
      // 这里需要连接到您的AI图片生成API
      const response = await fetch('/api/generate-bracelet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mbti }),
      });

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      
      // 等待生成动画完成后显示结果
      setTimeout(() => {
        setShowResult(true);
      }, 2000); // 2秒后显示结果
    } catch (error) {
      console.error('生成图片时出错:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // 保持加载动画2秒
    }
  };

  return (
    <div className="w-full max-w-xl relative">
      {/* 背景光晕 */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-indigo-500/10 rounded-[2rem] blur-2xl -z-10" />
      
      {/* 表单容器 */}
      <form onSubmit={handleSubmit} className="backdrop-blur-lg bg-white/[0.005] p-8 sm:p-10 rounded-3xl border border-white/[0.03] shadow-2xl space-y-8 relative">
        <div>
          <label htmlFor="mbti" className="block text-xl font-medium mb-4 text-purple-200/90">
            探索您的能量类型
          </label>
          <select
            id="mbti"
            value={mbti}
            onChange={(e) => setMbti(e.target.value)}
            className="w-full p-4 border border-white/10 rounded-2xl bg-white/[0.02] text-purple-200/90 backdrop-blur-xl focus:ring-2 focus:ring-purple-500/30 focus:border-transparent transition-all"
            required
          >
            <option value="" className="bg-[#0A0A1F]">选择您的MBTI能量印记...</option>
            {[
              'INTJ', 'INTP', 'ENTJ', 'ENTP',
              'INFJ', 'INFP', 'ENFJ', 'ENFP',
              'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
              'ISTP', 'ISFP', 'ESTP', 'ESFP'
            ].map((type) => (
              <option key={type} value={type} className="bg-gray-900">{type}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !mbti}
          className="w-full bg-white/[0.03] border border-white/10 text-purple-200/90 font-medium py-4 px-6 rounded-2xl disabled:opacity-50 transition-all backdrop-blur-xl"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">✧</span> 正在凝聚能量...
            </span>
          ) : (
            '生成我的魔法水晶'
          )}
        </button>
      </form>

      {/* 加载动画容器 */}
      {isLoading && (
        <div className="mt-8 backdrop-blur-2xl bg-white/[0.02] p-8 rounded-3xl border border-white/[0.08] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 animate-shimmer" />
          <div className="h-64 flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-300/30 border-t-purple-500 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-purple-200">✧</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 结果容器 */}
      {generatedImage && showResult && (
        <div className="mt-8 backdrop-blur-2xl bg-white/[0.02] p-8 rounded-3xl border border-white/[0.08] shadow-2xl relative overflow-hidden animate-fadeIn">
          <h3 className="text-xl font-medium mb-6 text-center text-purple-200/90">
            您的专属魔法水晶
          </h3>
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
            <Image
              src={generatedImage}
              alt="生成的水晶手串"
              fill
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
} 