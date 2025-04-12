import type { Expenses, FinanceIncome, Task } from "@/lib/types"
import OpenAI from "openai";
import { extractScheduleFromResponse } from "@/lib/utils";

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.NEXT_PUBLIC_APP_TOKEN,
  dangerouslyAllowBrowser: true,
});


const taskPrompt = (tasks: Task[]) => `
তুমি একজন দক্ষ টাইম ম্যানেজমেন্ট কোচ।

আমার আজকের কাজগুলোর একটি তালিকা নিচে দেওয়া হলো:

${tasks.map((task, i) =>
  `${i + 1}. কাজের নাম: ${task.title || "Unnamed Task"} — প্রাধান্য (Priority): ${task.priority || "Medium"}`
).join("\n")}

এখন উপরোক্ত কাজগুলোকে ভিত্তি করে সকাল ৮টা থেকে রাত ১০টা পর্যন্ত একটি কার্যকরী টাইম শিডিউল তৈরি করো।  
শিডিউলে নিচের বিষয়গুলো অন্তর্ভুক্ত করতে হবে:

- Deep work block (গুরুত্বপূর্ণ কাজে ফোকাস করার জন্য)
- Light task block (সহজ কাজ)
- Break ও Lunch
- যদি প্রাসঙ্গিক হয়, ছোট ছোট মিটিং টাইম
- Task priority অনুযায়ী কাজ সাজানো

**Output Format:**  
একটি টাইম শিডিউল তৈরি করো যা Array of Strings আকারে থাকবে।  

শুধু Array of Strings রিটার্ন করো, ব্যাখ্যার প্রয়োজন নেই।
`;

export const createFinancePrompt = (income: FinanceIncome[], expenses: Expenses[]) => {
  const incomeText = income.map(
    (i, idx) => `${idx + 1}. ${i.source} - ${i.amount} টাকা - ${i.date}`
  ).join("\n");

  const expenseText = expenses.map(
    (e, idx) => `${idx + 1}. ${e.category} - ${e.amount} টাকা - ${e.date}`
  ).join("\n");

  return `
আমার ব্যয় এবং আয়ের ডাটা নিচে দেওয়া হলো:

আয়ঃ
${incomeText}

ব্যয়ঃ
${expenseText}

এই ডাটার উপর ভিত্তি করে আমার জন্য কিছু আর্থিক পরামর্শ দাও। যেমনঃ 
- আমি কোথায় খরচ কমাতে পারি?
- কোন ক্যাটাগরিতে বেশি খরচ হচ্ছে?
- ভবিষ্যতের জন্য কি ধরনের বাজেটিং টিপস দিতে পারো?

৪-৫টি পরামর্শ দাও, যাতে আমি সহজে বুঝতে পারি। array of strings হিসেবে দাও`
}

export const generateAISchedule = async (tasks: Task[]) => {


  const prompt = taskPrompt(tasks);

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a productivity assistant." },
      { role: "user", content: prompt }
    ],
    model: "meta-llama/llama-4-maverick:free",
    temperature: 1,
    max_tokens: 1024
  });


  const schedule = extractScheduleFromResponse(response.choices?.[0]?.message?.content ?? '');
  return schedule;
};



export async function generateProductivityTip(tasks: Task[]): Promise<string> {

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a productivity expert." },
      {
        role: "user", content: `আমার আজকের কাজগুলোঃ \n${tasks.map((task, i) =>
          `${i + 1}. কাজের নাম: ${task.title || "Unnamed Task"} - প্রাধান্য: ${task.priority || "Medium"}`
        ).join("\n")}\n\nএই কাজগুলোর ওপর ভিত্তি করে আমাকে ১টা কার্যকরী প্রোডাক্টিভিটি টিপস দাও।`
      }
    ],
    model: "meta-llama/llama-4-maverick:free",
    temperature: 0.9,
    max_tokens: 256
  });

  return response.choices?.[0]?.message?.content ?? '';
}

export async function generateFinancialTips(income: FinanceIncome[], expenses: Expenses[]): Promise<string[]> {

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a Financial Advisor expert." },
      { role: "user", content: createFinancePrompt(income, expenses) }
    ],
    model: "meta-llama/llama-4-maverick:free",
    temperature: 0.9,
    max_tokens: 256
  });

  let suggestions = [];
  const rawResponse = response.choices?.[0]?.message?.content ?? '';

  try {
    suggestions = JSON.parse(rawResponse);
  } catch (err) {
    suggestions = rawResponse
      .replace(/^\[|\]$/g, "")
      .split(/"\s*,\s*"/)
      .map(line => line.replace(/^"|"$/g, "").trim())
      .filter(Boolean);
  }

  return suggestions;
}


export async function generateMealPlanAi(dietType: string, budget: string, timeConstraint: string): Promise<{
  mealPlan: MealPlan;
  groceryList: string[];
}> {
  const prompt = `
একজন ব্যবহারকারীর জন্য একটি সাপ্তাহিক (৭ দিনের) মিল প্ল্যান তৈরি করো।

- প্রতিদিন ব্রেকফাস্ট, লাঞ্চ এবং ডিনার থাকবে
- প্রতিটি মিলের টাইম থাকবে (যেমন: ${timeConstraint === 'quick' ? 'Under 30 মিনিট' : timeConstraint === 'medium' ? '30-60 মিনিট' : 'No time constraint'})
- প্রতিটি মিল ${dietType} দিতে হবে
- প্রতিটি মিলের বাজেট থাকবে ${budget} এর মধ্যে দিতে হবে

**সাথে একটি groceries list দিবে, যেগুলো ঐ খাবারগুলো রান্না করতে লাগবে।**

👉 JSON Format টি একদম নিচের মত হওয়া উচিত এবং অবশ্যই সম্পূর্ণ valid JSON হিসেবে ফেরত দিতে হবে:

{
  "days": [
    {
      "day": "Monday",
      "meals": [
        { "type": "Breakfast", "name": "ডিম পরোটা", "time": "20 min", "vegetarian": false },
        { "type": "Lunch", "name": "মাছ ভাজা ও ভাত", "time": "30 min", "vegetarian": false },
        { "type": "Dinner", "name": "সবজি খিচুড়ি", "time": "25 min", "vegetarian": true }
      ]
    },
    ...
  ],
  "grocery_list": [
    "চাল - ১ কেজি",
    "ডিম - ১ ডজন",
    "মুরগি - ১ কেজি",
    ...
  ]
}

📌 **শুধুমাত্র উপরের structure অনুযায়ী পুরো valid JSON string আকারে ফলাফল দাও, কোনো ব্যাখ্যা বা অতিরিক্ত টেক্সট লেখা যাবে না।**
`;


  const response = await client.chat.completions.create({
    model: "meta-llama/llama-4-maverick:free",
    messages: [
      { role: "system", content: "You are a helpful meal planner AI assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 1,
    max_tokens: 2048
  });

  const raw = response.choices?.[0]?.message?.content ?? '';
  let cleanedString = raw.replace(/```json|```/g, '').trim();


  let mealPlan: MealPlan = { days: [] };
  let groceryList: string[] = [];

  try {
    const parsed = JSON.parse(cleanedString)
    mealPlan = { days: parsed.days };
    groceryList = parsed.grocery_list;
  } catch (err) {
    const daysMatch = raw.match(/"days"\s*:\s*\[.*?\](?=\s*,\s*"groceryList")/);
    const groceryMatch = raw.match(/"groceryList"\s*:\s*\[.*?\]/);

    if (daysMatch && groceryMatch) {
      mealPlan = { days: JSON.parse(`{${daysMatch[0]}}`).days };
      groceryList = JSON.parse(`{${groceryMatch[0]}}`).groceryList;
    }
  }



  return {
    mealPlan,
    groceryList,
  };
}


export async function generateRecipeSuggestionsPrompt() {
  
  const prompt =  `
  তুমি একজন পেশাদার শেফ এবং নিউট্রিশন এক্সপার্ট।
  
  একজন ব্যবহারকারীর রেসিপি পছন্দ: "কম ক্যালোরির ভেজ খাবার পছন্দ করি"
  
  এই তথ্য অনুযায়ী ৫টি স্বাস্থ্যকর এবং সহজ রেসিপির সাজেশন দাও।  
  প্রত্যেকটি রেসিপি একটি object হবে যার মধ্যে থাকবে:
  - title: রেসিপির নাম (বাংলায়)
  - description: রেসিপিটি কীভাবে তৈরি করা যায় তার সংক্ষিপ্ত বর্ণনা
  
  **Output Format:**  
  একটি Array of Objects রিটার্ন করো যেমন:
  [
    { "title": "সবজি খিচুড়ি", "description": "চাল, ডাল ও মিক্সড সবজি দিয়ে সহজে রান্না করা যায়" },
    ...
  ]
  
  শুধু এই array টা রিটার্ন করো, ব্যাখ্যা বা অন্য কিছু নয়।`

  const response = await client.chat.completions.create({
    model: "meta-llama/llama-4-maverick:free",
    messages: [
      { role: "system", content: "তুমি একজন পেশাদার শেফ এবং নিউট্রিশন এক্সপার্ট" },
      { role: "user", content: prompt }
    ],
    temperature: 1,
    max_tokens: 1024
  });

  const raw = response.choices?.[0]?.message?.content ?? '';
  return JSON.parse(raw)
}

export async function generateNutritionTipsPrompt() {

  const prompt = `
  তুমি একজন পেশাদার নিউট্রিশনিস্ট।

  আমি চাই ৫টি গুরুত্বপূর্ণ Healthy Eating Tips, যেগুলো একজন সাধারণ মানুষ তার দৈনন্দিন জীবনে অনুসরণ করতে পারে।

  **Output Format:**  
  একটি Array of Strings রিটার্ন করো, প্রত্যেকটি টিপস বাংলায় হবে।  
  উদাহরণ:
  [
    "প্রতিদিন ৮ গ্লাস পানি পান করুন",
    "প্রতিদিন অন্তত একটি ফল খান",
    ...
  ]

  শুধু এই array টা রিটার্ন করো, ব্যাখ্যা বা অন্য কিছু নয়।`

  const response = await client.chat.completions.create({
    model: "meta-llama/llama-4-maverick:free",
    messages: [
      { role: "system", content: "তুমি একজন পেশাদার নিউট্রিশনিস্ট" },
      { role: "user", content: prompt }
    ],
    temperature: 1,
    max_tokens: 1024
  });

  const raw = response.choices?.[0]?.message?.content ?? '';
  return JSON.parse(raw)
}

export async function analyzeTextDocument(documentText: string) {
  const prompt = `
তুমি একজন বুদ্ধিমান ডকুমেন্ট বিশ্লেষক। আমি তোমাকে একটি ডকুমেন্টের লেখা দেবো, এবং তুমি তার উপর ভিত্তি করে বিশ্লেষণ করে নিচের ফরম্যাটে উত্তর দিবে:

# Document Analysis

## Summary
লিখাটির সারমর্ম বাংলায় ব্যাখ্যা করো।

## Key Points
- মূল বিষয়বস্তু গুলোর পয়েন্ট আকারে উল্লেখ করো
- ...

## Suggestions
1. লেখাটি উন্নত করার জন্য ৩-৫ টি কার্যকরী পরামর্শ দাও
2. পরামর্শগুলো খুব নির্দিষ্ট ও ব্যবহারযোগ্য হওয়া উচিত

এই হলো লেখাটি:
"""
${documentText}
"""
`;

const response = await client.chat.completions.create({
  model: "meta-llama/llama-4-maverick:free",
  messages: [
    { role: "system", content: "তুমি একজন বুদ্ধিমান ডকুমেন্ট বিশ্লেষক" },
    { role: "user", content: prompt }
  ],
  temperature: 1,
  max_tokens: 1024
});

const raw = response.choices?.[0]?.message?.content ?? '';
return raw
}


export async function solveMathProblem(problemText: string) {
  const prompt = `
তুমি একজন অংক বিশেষজ্ঞ, এবং আমি তোমাকে একটি গণিত সমস্যার বিবরণ দিবো। তোমার কাজ হলো সমস্যাটিকে নিচের ফরম্যাটে সুন্দরভাবে বিশ্লেষণ করে সমাধান করা:

# Step-by-Step Solution

এই অংকটা স্টেপ বাই স্টেপ সমাধান:

## Step 1: Identify the key variables and equations
(এই ধাপে সমস্যার মূল রাশিগুলো শনাক্ত করো)

## Step 2: Apply the appropriate mathematical principles
(যে নিয়ম বা সূত্র প্রয়োগ করতে হবে তা লিখো)

## Step 3: Solve step by step
(এক ধাপে ধাপে সমাধান করো)

## Answer:
The solution is: [ফলাফল লিখো]

## Explanation:
[সমাধানটি কেন এমন হলো, তার ব্যাখ্যা বাংলায় লেখো]

এই হলো সমস্যাটি:
"""
${problemText}
"""
`;

const response = await client.chat.completions.create({
  model: "meta-llama/llama-4-maverick:free",
  messages: [
    { role: "system", content: "তুমি একজন অংক বিশেষজ্ঞ" },
    { role: "user", content: prompt }
  ],
  temperature: 1,
  max_tokens: 1024
});

const raw = response.choices?.[0]?.message?.content ?? '';
return raw
}

export async function generateEmailFromPrompt(input: string) {
  const prompt = `
তুমি একজন প্রফেশনাল ইমেইল লেখক। নিচে আমি একটি ইনপুট দিবো এবং তোমার কাজ হলো সেই ইনপুট অনুযায়ী একটি সম্পূর্ণ প্রফেশনাল ইমেইল লেখা।

ইমেইল লেখার ফরম্যাট নিচের মতো হতে হবে:

Subject: [ইমেইলের বিষয়]

Dear Team,

[ইমেইলের মূল বক্তব্য সুন্দরভাবে গুছিয়ে লেখো, যথাসম্ভব প্রফেশনাল এবং মানবিক টোনে। প্রয়োজন হলে পয়েন্ট আকারে action items দাও।]

Looking forward to your response / collaboration.

Best regards,  
[Your Name]

---

এই হলো ইনপুটঃ  
"""  
${input}  
"""
`;

const response = await client.chat.completions.create({
  model: "meta-llama/llama-4-maverick:free",
  messages: [
    { role: "system", content: "তুমি একজন প্রফেশনাল ইমেইল লেখক" },
    { role: "user", content: prompt }
  ],
  temperature: 1,
  max_tokens: 1024
});

const raw = response.choices?.[0]?.message?.content ?? '';
console.log(raw);

return raw
}

export async function generateCodeWithExplanation(input: string) {
  const prompt = `
You are an expert software engineer and technical writer.

Based on the following instruction, write the complete code with explanation.

If the user does **not** mention the language, default to **Python**.

If the user mentions a language (like JavaScript, C++, etc.), use that language.

Format the output like this:

\`\`\`[language]
[code goes here]
\`\`\`

Then provide a paragraph explaining what the code does, how it works, and how it can be modified.

---
Here is the instruction:
"""
${input}
"""
`;

const response = await client.chat.completions.create({
  model: "meta-llama/llama-4-maverick:free",
  messages: [
    { role: "system", content: "You are an expert software engineer and technical writer" },
    { role: "user", content: prompt }
  ],
  temperature: 1,
  max_tokens: 1024
});

const raw = response.choices?.[0]?.message?.content ?? '';
console.log(raw);

return raw
}

