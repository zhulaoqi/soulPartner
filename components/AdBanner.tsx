"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  position: "top" | "bottom" | "sidebar";
}

export default function AdBanner({ position }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  // 根据不同位置返回不同的样式
  const getContainerClass = () => {
    switch (position) {
      case "top":
        return "bg-gradient-to-r from-warm-100 to-primary-100 border-b border-primary-200";
      case "bottom":
        return "bg-gradient-to-r from-primary-100 to-warm-100 border-t border-primary-200";
      case "sidebar":
        return "bg-white/80 backdrop-blur-sm rounded-xl border border-primary-200 shadow-md";
      default:
        return "";
    }
  };

  return (
    <div className={`relative ${getContainerClass()}`}>
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between gap-4">
          {/* 广告内容区域 - 预留给广告商 */}
          <div className="flex-1 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-warm-200 to-warm-300 rounded-lg flex items-center justify-center">
                <span className="text-xs font-semibold text-warm-800">广告</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-primary-800">
                  广告位预留区域
                </p>
                <p className="text-xs text-primary-600">
                  这里可以展示您的广告内容
                </p>
              </div>
            </div>
          </div>

          {/* 关闭按钮 */}
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-1 hover:bg-primary-200 rounded-full transition-colors"
            aria-label="关闭广告"
          >
            <X className="w-5 h-5 text-primary-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

