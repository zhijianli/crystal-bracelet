import { NextResponse } from 'next/server';
import path from 'path';

// MBTI与提示词的映射
const mbtiPrompts = {
  'INTJ': 'a mystical crystal bracelet with deep blue sapphire and clear quartz, representing wisdom and clarity',
  'INFJ': 'an ethereal crystal bracelet with amethyst and moonstone, emanating spiritual energy',
  'INTP': 'a geometric crystal bracelet with labradorite and clear quartz, symbolizing intelligence and innovation',
  'ENFP': 'a vibrant crystal bracelet with citrine and rose quartz, radiating enthusiasm and warmth',
  // ... 添加其他MBTI类型的提示词
};

async function generateImage(prompt: string): Promise<string> {
  try {
    const response = await fetch('http://127.0.0.1:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
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
    const { mbti } = await request.json();
    
    const prompt = mbtiPrompts[mbti as keyof typeof mbtiPrompts];
    if (!prompt) {
      throw new Error('Invalid MBTI type');
    }

    const imagePath = await generateImage(prompt);
    
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