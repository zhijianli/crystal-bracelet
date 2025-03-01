import Image from "next/image";
import { MBTIForm } from "@/components/MBTIForm";
import { StarField } from "@/components/StarField";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden font-[SF-Pro-Display,-apple-system,system-ui,sans-serif]">
      {/* 深邃的宇宙背景 - 添加晶体感渐变 */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0A0A1F] via-[#1A0B35] to-[#0A0A1F]">
        {/* 水晶光泽效果 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(137,87,255,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(94,182,255,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,119,225,0.08),transparent_50%)]" />
        </div>
        
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
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 [text-shadow:0_0_30px_rgba(139,92,246,0.3)]">
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
          
          <div className="w-full backdrop-blur-lg bg-white/[0.005] rounded-3xl border border-white/[0.03] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.005] via-transparent to-blue-500/[0.005]" />
            
            <div className="p-8 sm:p-12 relative">
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-purple-200 to-blue-200">
                  水晶能量的奥秘
                </h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="text-purple-300/90 text-lg mt-1">✧</span>
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-purple-200/90">
                          独特能量频率
                        </h3>
                        <p className="text-purple-200/70 font-light leading-relaxed">
                          每颗水晶都蕴含着独特的能量频率，与您的个性共鸣
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-blue-300/90 text-lg mt-1">✧</span>
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-white/90 group-hover:text-white/100 transition-colors">
                          AI魔法解读
                        </h3>
                        <p className="text-gray-400/90 font-light leading-relaxed">
                          通过先进的AI技术，精准解读您的性格能量场
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="text-violet-300/90 text-lg mt-1">✧</span>
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-white/90 group-hover:text-white/100 transition-colors">
                          和谐水晶组合
                        </h3>
                        <p className="text-gray-400/90 font-light leading-relaxed">
                          为您匹配最和谐的水晶组合，增强能量共振
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-indigo-300/90 text-lg mt-1">✧</span>
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-white/90 group-hover:text-white/100 transition-colors">
                          专属能量守护
                        </h3>
                        <p className="text-gray-400/90 font-light leading-relaxed">
                          打造专属于您的能量守护珠，陪伴您的每一刻
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
