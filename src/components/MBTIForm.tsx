'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// MBTI提示词映射
const mbtiPrompts = {
  // 分析家群体 (NT)
  'INTJ': 'a single elegant round crystal bracelet with perfectly circular shape, deep blue sapphire and clear quartz beads evenly spaced on pure white background, isolated product photography, white seamless backdrop, studio lighting, professional product photography, centered composition, high resolution, 8k',
  'INTP': 'a single geometric round crystal bracelet forming a perfect circle, labradorite and clear quartz beads arranged symmetrically on white backdrop, professional jewelry photography, sharp details, centered composition, 8k',
  'ENTJ': 'a single powerful circular crystal bracelet with uniform round shape, black tourmaline and citrine beads in perfect alignment on pure white background, luxury product photography, dramatic lighting, centered, 8k uhd',
  'ENTP': 'a single innovative round crystal bracelet with circular formation, rainbow fluorite and aquamarine beads in harmonious spacing on white background, creative product photography, dynamic lighting, centered, 8k',

  // 外交家群体 (NF)
  'INFJ': 'a single ethereal circular crystal bracelet with graceful round form, amethyst and moonstone beads in perfect circular arrangement on clean white background, minimalist product photography, soft studio lighting, centered, 8k uhd',
  'INFP': 'a single dreamy crystal bracelet with rose quartz and opal on white background, artistic product photography, gentle lighting, centered, 8k',
  'ENFJ': 'a single harmonious crystal bracelet with morganite and pearl on pure white background, elegant product photography, warm lighting, centered, 8k uhd',
  'ENFP': 'a single vibrant crystal bracelet with citrine and rose quartz on white background, commercial product photography, perfect lighting, centered, ultra detailed, 8k',

  // 守卫者群体 (SJ)
  'ISTJ': 'a single structured crystal bracelet with smoky quartz and tiger eye on white backdrop, technical product photography, precise lighting, centered, 8k',
  'ISFJ': 'a single nurturing crystal bracelet with pink tourmaline and amazonite on white background, soft product photography, balanced lighting, centered, 8k uhd',
  'ESTJ': 'a single commanding crystal bracelet with red jasper and hematite on pure white background, professional product photography, strong lighting, centered, 8k',
  'ESFJ': 'a single supportive crystal bracelet with green aventurine and rose quartz on white background, warm product photography, inviting lighting, centered, 8k',

  // 探险家群体 (SP)
  'ISTP': 'a single precise crystal bracelet with obsidian and sodalite on white backdrop, technical product photography, crisp lighting, centered, 8k uhd',
  'ISFP': 'a single artistic crystal bracelet with lapis lazuli and moonstone on white background, aesthetic product photography, soft lighting, centered, 8k',
  'ESTP': 'a single dynamic crystal bracelet with carnelian and sunstone on pure white background, bold product photography, energetic lighting, centered, 8k',
  'ESFP': 'a single expressive crystal bracelet with amber and turquoise on white background, vibrant product photography, playful lighting, centered, ultra detailed, 8k'
};

// 添加默认负面提示词
const defaultNegativePrompt = "multiple bracelets, busy background, blurry, low quality, low resolution, deformed, dark background, black background, gray background, colored background, textured background, shadows";

export function MBTIForm() {
  const [mbti, setMbti] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState(defaultNegativePrompt);

  // 当MBTI选择改变时，更新提示词
  useEffect(() => {
    if (mbti) {
      setCustomPrompt(mbtiPrompts[mbti as keyof typeof mbtiPrompts]);
    }
  }, [mbti]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResult(false);

    try {
      const response = await fetch('/api/generate-bracelet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          mbti,
          customPrompt,
          negativePrompt
        }),
      });

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      setTimeout(() => setShowResult(true), 2000);
    } catch (error) {
      console.error('生成图片时出错:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-xl relative -mt-5 font-[SF-Pro-Display,-apple-system,system-ui,sans-serif]">
      {/* 背景光晕 */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-indigo-500/10 rounded-[2rem] blur-2xl -z-10" />
      
      {/* 表单容器 */}
      <form onSubmit={handleSubmit} className="backdrop-blur-md bg-white/[0.002] p-8 sm:p-10 rounded-3xl border border-white/[0.02] shadow-2xl space-y-8 relative">
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

      {mbti && (
        <div className="fixed bottom-4 right-4 w-96 backdrop-blur-xl bg-white/[0.01] p-4 rounded-2xl border border-white/[0.03] shadow-2xl space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-purple-200/90">
              自定义提示词
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full h-32 p-3 border border-white/10 rounded-xl bg-white/[0.02] text-purple-200/90 backdrop-blur-xl focus:ring-2 focus:ring-purple-500/30 focus:border-transparent transition-all text-sm"
              placeholder="编辑提示词以自定义生成效果..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-purple-200/90">
              负面提示词
            </label>
            <textarea
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              className="w-full h-24 p-3 border border-white/10 rounded-xl bg-white/[0.02] text-purple-200/90 backdrop-blur-xl focus:ring-2 focus:ring-purple-500/30 focus:border-transparent transition-all text-sm"
              placeholder="编辑负面提示词..."
            />
          </div>
        </div>
      )}
    </div>
  );
} 