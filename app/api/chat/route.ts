import { NextRequest } from "next/server";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: Message[];
}

// 阿里云通义千问 API 配置
const ALIBABA_API_KEY = process.env.ALIBABA_API_KEY || "";
const ALIBABA_API_URL =
  process.env.ALIBABA_API_URL ||
  "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation";

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "消息不能为空" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 检查 API Key 是否配置
    if (!ALIBABA_API_KEY) {
      console.warn("阿里云 API Key 未配置，使用模拟流式响应");
      return getMockStreamResponse(messages);
    }

    // 准备发送给阿里云的请求
    const systemPrompt = `你是一位专业、温暖、富有同理心的心理咨询师和陪伴导师。你的职责是：

1. 用温柔、理解的语气与来访者交流
2. 积极倾听，给予情感支持和认可
3. 提供专业的心理疏导建议
4. 帮助来访者理清思路，找到问题的根源
5. 鼓励来访者表达真实感受，营造安全的对话空间
6. 适时使用温暖的表情符号，增加亲切感

请记住：
- 保持专业边界，不提供医疗诊断
- 如遇严重心理问题，建议寻求专业医疗帮助
- 始终保持耐心、尊重和不评判的态度
- 用简洁、易懂的语言交流`;

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    // 调用阿里云通义千问 API - 开启流式模式
    const response = await fetch(ALIBABA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ALIBABA_API_KEY}`,
        "X-DashScope-SSE": "enable", // 开启SSE流式输出
      },
      body: JSON.stringify({
        model: "qwen-plus", // 使用 qwen-plus 模型
        input: {
          messages: apiMessages,
        },
        parameters: {
          temperature: 0.8, // 适度的创造性
          top_p: 0.9,
          max_tokens: 1500,
          incremental_output: true, // 启用增量输出
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("阿里云 API 错误:", errorText);
      
      // 如果 API 调用失败，返回模拟流式响应
      return getMockStreamResponse(messages);
    }

    // 创建流式响应
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const reader = response.body?.getReader();
          if (!reader) {
            throw new Error("无法获取响应流");
          }

          const decoder = new TextDecoder();
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              controller.close();
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data:")) {
                const data = line.slice(5).trim();
                
                if (data === "[DONE]") {
                  controller.close();
                  return;
                }

                try {
                  const parsed = JSON.parse(data);
                  const text = parsed.output?.text || "";
                  
                  if (text) {
                    controller.enqueue(encoder.encode(text));
                  }
                } catch (e) {
                  console.error("解析流式数据出错:", e);
                }
              }
            }
          }
        } catch (error) {
          console.error("流式处理错误:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("处理聊天请求时出错:", error);

    // 出错时返回模拟流式响应
    return getMockStreamResponse([]);
  }
}

// 模拟流式响应函数 - 用于 API Key 未配置或 API 调用失败时
function getMockStreamResponse(messages: Message[]) {
  const lastUserMessage = messages
    .filter((m) => m.role === "user")
    .pop()?.content || "";

  // 简单的关键词匹配响应
  let response = "";

  if (
    lastUserMessage.includes("焦虑") ||
    lastUserMessage.includes("担心") ||
    lastUserMessage.includes("紧张")
  ) {
    response = `我能感受到你现在的焦虑和不安。焦虑是一种很正常的情绪反应，每个人都会经历。😊

首先，我想让你知道，你愿意表达出来已经是很勇敢的一步了。

当焦虑来临时，可以尝试：
1. 深呼吸练习 - 慢慢地深吸气，再慢慢呼出
2. 把注意力集中在当下，感受此刻的环境
3. 写下让你焦虑的事情，理清思绪

你愿意跟我分享更多吗？是什么让你感到焦虑呢？`;
  } else if (
    lastUserMessage.includes("压力") ||
    lastUserMessage.includes("累") ||
    lastUserMessage.includes("疲惫")
  ) {
    response = `听起来你最近承受了不少压力，感到很疲惫。💝 这种感觉我完全理解。

在快节奏的生活中，我们常常忘记照顾自己的内心。你能意识到自己的疲惫，并寻求支持，这本身就很了不起。

给自己一些时间和空间去休息是很重要的。也许可以：
- 暂时放下一些不那么紧急的事情
- 做一些让你放松的活动
- 跟信任的人聊聊天

你现在最需要的是什么呢？`;
  } else if (
    lastUserMessage.includes("开心") ||
    lastUserMessage.includes("高兴") ||
    lastUserMessage.includes("快乐")
  ) {
    response = `真替你开心！✨ 能感受到你的喜悦。

开心的时刻值得好好珍惜和记录。是什么让你这么开心呢？愿意跟我分享这份快乐吗？

记住这种美好的感觉，它会成为你人生中的小确幸，在未来需要的时候给你力量。😊`;
  } else if (
    lastUserMessage.includes("难过") ||
    lastUserMessage.includes("伤心") ||
    lastUserMessage.includes("失落")
  ) {
    response = `我能感受到你现在的难过。💙 难过的时候，允许自己慢慢来，不要急着走出来。

情绪没有对错，悲伤也是生活的一部分。给自己一些时间去感受、去表达，这很重要。

我在这里陪着你。如果你愿意，可以跟我说说发生了什么。有时候，说出来本身就是一种疗愈。`;
  } else if (
    lastUserMessage.includes("你好") ||
    lastUserMessage.includes("在吗") ||
    lastUserMessage.includes("嗨")
  ) {
    response = `你好！我在这里。😊

很高兴遇见你。在这里，你可以自由地表达任何想法和感受，不用担心被评判。

今天想聊些什么呢？或者，你现在的心情怎么样？`;
  } else {
    response = `谢谢你愿意和我分享。我在认真倾听你说的每一句话。💝

我能感受到你的情绪。每个人的感受都是独特而宝贵的，你的感受也是。

如果你愿意，可以跟我说得更详细一些。我会一直在这里陪伴你，倾听你的心声。`;
  }

  // 创建流式响应，模拟打字效果
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // 按字符逐个发送，模拟打字效果
      for (let i = 0; i < response.length; i++) {
        controller.enqueue(encoder.encode(response[i]));
        // 添加延迟，模拟真实打字速度
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}

