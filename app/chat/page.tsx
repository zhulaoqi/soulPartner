"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import AdBanner from "@/components/AdBanner";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  avatar: string;
}

export default function ChatPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 检查用户是否已登录
    const storedUserInfo = localStorage.getItem("userInfo");
    if (!storedUserInfo) {
      router.push("/");
      return;
    }

    try {
      const user = JSON.parse(storedUserInfo);
      setUserInfo(user);
    } catch (error) {
      console.error("解析用户信息失败:", error);
      router.push("/");
      return;
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 via-warm-50 to-primary-100">
        <div className="animate-pulse text-primary-500 text-xl">加载中...</div>
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-warm-50 to-primary-100">
      {/* 广告位 - 顶部 */}
      <AdBanner position="top" />
      
      {/* 主聊天界面 */}
      <ChatInterface userInfo={userInfo} />
      
      {/* 广告位 - 底部（仅在桌面端显示） */}
      <div className="hidden lg:block">
        <AdBanner position="bottom" />
      </div>
    </div>
  );
}

