"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      alert("请填写您的昵称和邮箱");
      return;
    }

    setIsLoading(true);

    // 创建用户信息
    const userInfo = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      createdAt: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${name}`,
    };

    // 保存到 localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    
    // 初始化聊天历史
    const chatHistory = {
      conversations: [],
      currentConversationId: null,
    };
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

    setTimeout(() => {
      setIsLoading(false);
      router.push("/chat");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-50 via-warm-50 to-primary-100">
      <div className="w-full max-w-md">
        {/* Logo 和欢迎语 */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center justify-center mb-4">
            <img 
              src="/logo.svg" 
              alt="心灵陪伴 Logo" 
              className="w-24 h-24 drop-shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2">
            心灵陪伴
          </h1>
          <p className="text-primary-600 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            您的专属心理陪伴导师
            <Sparkles className="w-4 h-4" />
          </p>
        </div>

        {/* 登录表单 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-semibold text-primary-800 mb-6 text-center">
            欢迎来到这里
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
                您的昵称
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请告诉我您的昵称"
                className="w-full px-4 py-3 rounded-xl border-2 border-primary-200 focus:border-primary-400 focus:outline-none transition-colors bg-white/50"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                电子邮箱
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-primary-200 focus:border-primary-400 focus:outline-none transition-colors bg-white/50"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "正在进入..." : "开始对话"}
            </button>
          </form>

          {/* 温馨提示 */}
          <div className="mt-6 p-4 bg-warm-50 rounded-xl border border-warm-200">
            <p className="text-sm text-primary-700 text-center">
              💝 这是一个安全的空间，您可以放心地分享您的感受
            </p>
          </div>
        </div>

        {/* 底部说明 */}
        <div className="mt-6 text-center text-sm text-primary-600 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
          <p>我们致力于为您提供温暖、专业的心理陪伴</p>
        </div>
      </div>
    </div>
  );
}

