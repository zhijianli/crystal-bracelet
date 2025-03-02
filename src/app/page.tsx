import Image from "next/image";
import { MBTIForm } from "@/components/MBTIForm";
import { StarField } from "@/components/StarField";
import { WaterRipple } from '@/components/WaterRipple';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden font-magic">
      {/* 深邃的宇宙背景 - 添加晶体感渐变 */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0A0A1F] via-[#1A0B35] to-[#0A0A1F]">
        {/* 水晶光泽效果 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(137,87,255,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(94,182,255,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,119,225,0.08),transparent_50%)]" />
        </div>
        
        {/* 水波纹效果 */}
        <WaterRipple />
        
        {/* 晶体光斑效果 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[2px] h-[2px] bg-blue-300 blur-[2px] animate-pulse-slow" />
          <div className="absolute top-3/4 right-1/3 w-[3px] h-[3px] bg-purple-300 blur-[3px] animate-pulse" />
          <div className="absolute top-1/2 left-2/3 w-[2px] h-[2px] bg-pink-300 blur-[2px] animate-pulse-slower" />
        </div>

        {/* 原有的星云效果 */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-[150px] animate-float" />
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[130px] animate-float-slow" />
          <div className="absolute -bottom-1/4 left-1/3 w-[900px] h-[900px] rounded-full bg-indigo-500/10 blur-[180px] animate-float-slower" />
        </div>
        
        <StarField />
      </div>

      {/* 主要内容 */}
      <div className="relative grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-12 sm:p-20">
        <header className="text-center">
          <div className="inline-block space-y-4">
            <h1 className="text-5xl sm:text-6xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 [text-shadow:0_0_30px_rgba(139,92,246,0.3)]">
              魔法水晶定制坊
            </h1>
            <p className="text-lg sm:text-xl text-purple-200/70 font-light max-w-2xl mx-auto leading-relaxed [text-shadow:0_0_20px_rgba(139,92,246,0.2)]">
              让我们通过您的MBTI能量印记，为您打造独一无二的守护水晶
            </p>
          </div>
        </header>

        <main className="flex flex-col items-center justify-center gap-16 relative max-w-6xl mx-auto w-full">
          {/* 装饰性的水晶图案 */}
          <div className="absolute top-0 left-0 -translate-x-1/2 opacity-10">
       
          </div>

          <MBTIForm />
          
        </main>

        <footer className="text-center text-sm text-indigo-200/40">
          <p className="font-light tracking-wide [text-shadow:0_0_10px_rgba(139,92,246,0.2)]">
            ✧ 魔法水晶定制坊 | 连接宇宙能量 ✧
          </p>
        </footer>
      </div>
    </div>
  );
}
