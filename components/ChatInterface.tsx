"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Heart, Menu, LogOut, Sparkles, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Props {
  userInfo: UserInfo;
}

export default function ChatInterface({ userInfo }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 加载欢迎消息
  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: `你好${userInfo.name}，我是你的心灵陪伴导师。在这里，你可以安心地分享你的感受、困扰或是任何想说的话。无论是开心的事情还是烦恼，我都会用心倾听。💝\n\n今天想聊些什么呢？`,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [userInfo.name]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // 创建一个空的助手消息，用于流式更新
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      // 调用 API - 流式响应
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("API 请求失败");
      }

      // 读取流式响应
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("无法获取响应流");
      }

      // 开始接收流式数据后，关闭加载状态
      setIsLoading(false);

      const decoder = new TextDecoder();
      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        // 解码并累积内容
        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;

        // 更新助手消息的内容
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: accumulatedContent }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("发送消息失败:", error);

      // 错误处理 - 更新助手消息为错误提示
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content:
                  "抱歉，我现在遇到了一些技术问题。请稍后再试，或者检查一下网络连接。如果问题持续存在，可能需要配置 API 密钥。",
              }
            : msg
        )
      );
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    if (confirm("确定要退出登录吗？")) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("chatHistory");
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-6xl mx-auto">
      {/* 头部导航 */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.svg" 
              alt="心灵陪伴" 
              className="w-10 h-10 drop-shadow-md"
            />
            <div>
              <h1 className="text-lg font-semibold text-primary-800">心灵陪伴</h1>
              <p className="text-xs text-primary-600">在线陪伴中</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-primary-100 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6 text-primary-700" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-primary-100 overflow-hidden">
                <div className="p-4 bg-primary-50 border-b border-primary-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={userInfo.avatar}
                      alt={userInfo.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-primary-800 truncate">
                        {userInfo.name}
                      </p>
                      <p className="text-sm text-primary-600 truncate">
                        {userInfo.email}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left hover:bg-primary-50 transition-colors flex items-center gap-3 text-primary-700"
                >
                  <LogOut className="w-5 h-5" />
                  退出登录
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 聊天消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 animate-fadeIn ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            {/* 头像 */}
            <div className="flex-shrink-0">
              {message.role === "assistant" ? (
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              ) : (
                <img
                  src={userInfo.avatar}
                  alt={userInfo.name}
                  className="w-10 h-10 rounded-full"
                />
              )}
            </div>

            {/* 消息内容 */}
            <div
              className={`flex-1 max-w-[80%] md:max-w-[70%] ${
                message.role === "user" ? "text-right" : ""
              }`}
            >
              <div
                className={`inline-block p-4 rounded-2xl ${
                  message.role === "user"
                    ? "bg-primary-500 text-white"
                    : "bg-white shadow-md text-primary-900"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              </div>
              <p className="text-xs text-primary-500 mt-1 px-2">
                {message.timestamp.toLocaleTimeString("zh-CN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 animate-fadeIn">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="bg-white shadow-md p-4 rounded-2xl">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="bg-white/80 backdrop-blur-md border-t border-primary-100 p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入您想说的话..."
            rows={1}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-primary-200 focus:border-primary-400 focus:outline-none resize-none bg-white/50"
            style={{ minHeight: "48px", maxHeight: "120px" }}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">发送</span>
          </button>
        </div>
      </div>
    </div>
  );
}

