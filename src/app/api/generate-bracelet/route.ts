import { NextResponse } from 'next/server';
import path from 'path';

// MBTI与提示词的映射
const mbtiPrompts = {
  // 分析家群体 (NT)
  'INTJ': 'a single elegant round crystal bracelet with perfectly circular shape, deep blue sapphire and clear quartz beads evenly spaced on pure white background, studio lighting, professional product photography, centered composition, high resolution, 8k',
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

// 通用的负面提示词可以在Python端添加
const commonNegativePrompt = 'multiple bracelets, busy background, blurry, low quality, low resolution, deformed, dark background, black background, gray background';

async function generateImage(prompt: string, negativePrompt: string): Promise<string> {
  try {
    const response = await fetch('http://127.0.0.1:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        negative_prompt: negativePrompt,
        output_dir: path.join(process.cwd(), 'public/generated')
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.output_path;
  } catch (error) {
    console.error('Failed to generate image:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { mbti, customPrompt, negativePrompt } = await request.json();
    
    // 使用自定义提示词
    const prompt = customPrompt || mbtiPrompts[mbti as keyof typeof mbtiPrompts];
    if (!prompt) {
      throw new Error('Invalid MBTI type');
    }

    const imagePath = await generateImage(prompt, negativePrompt);
    
    return NextResponse.json({ 
      imageUrl: `/generated/${path.basename(imagePath)}` 
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: '生成图片失败' },
      { status: 500 }
    );
  }
} 