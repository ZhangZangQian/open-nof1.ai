import { createDeepSeek } from "@ai-sdk/deepseek";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createQwen } from "qwen-ai-provider";

const deepseekModel = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const qwenModel = createQwen({
  apiKey: process.env.DASHSCOPE_API_KEY,
});

export const deepseekv31 = openrouter("deepseek/deepseek-v3.2-exp");

export const deepseekR1 = openrouter("deepseek/deepseek-r1-0528");

export const deepseek = deepseekModel("deepseek-chat");

export const deepseekThinking = deepseekModel("deepseek-reasoner");

// 通义千问系列模型
export const qwenPlus = qwenModel("qwen-plus");
export const qwenMax = qwenModel("qwen3-max");
export const qwenTurbo = qwenModel("qwen-turbo");
export const qwenVLMax = qwenModel("qwen-vl-max");