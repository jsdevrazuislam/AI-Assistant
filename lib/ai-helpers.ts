import type { Expenses, FinanceIncome, Task } from "@/lib/types"
import OpenAI from "openai";
import { extractScheduleFromResponse } from "@/lib/utils";

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.NEXT_PUBLIC_APP_TOKEN,
  dangerouslyAllowBrowser: true,
});


const taskPrompt = (tasks: Task[]) => `
আমার আজকের কাজগুলো নিচে দেওয়া হলো:

${tasks.map((task, i) =>
  `${i + 1}. কাজের নাম: ${task.title || "Unnamed Task"} - প্রাধান্য: ${task.priority || "Medium"}`
).join("\n")}

এই কাজগুলো দিয়ে একটা পুরো দিনের জন্য কার্যকরী টাইম শিডিউল সাজাও। Deep work, break, light task, meeting সব include করো।
Schedule array of strings হিসেবে দাও।
`;

export const createFinancePrompt = (income: FinanceIncome[] , expenses:Expenses[]) => {
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

  return

  const prompt = taskPrompt(tasks);
 
  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a productivity assistant." },
      { role: "user", content: prompt }
    ],
    model: "gpt-4o",
    temperature: 1,
    max_tokens: 1024
  });

  const schedule = extractScheduleFromResponse(response.choices?.[0]?.message?.content ?? '');
  return schedule;
};



export async function generateProductivityTip(tasks: Task[]): Promise<string> {

  return

  
  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a productivity expert." },
      { role: "user", content: `আমার আজকের কাজগুলোঃ \n${tasks.map((task, i) =>
        `${i + 1}. কাজের নাম: ${task.title || "Unnamed Task"} - প্রাধান্য: ${task.priority || "Medium"}`
      ).join("\n")}\n\nএই কাজগুলোর ওপর ভিত্তি করে আমাকে ১টা কার্যকরী প্রোডাক্টিভিটি টিপস দাও।` }
    ],
    model: "gpt-4o",
    temperature: 0.9,
    max_tokens: 256
  });

  return response.choices?.[0]?.message?.content ?? '';
}

export async function generateFinancialTips(income: FinanceIncome[] , expenses:Expenses[]): Promise<string[]> {
  
  return
  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a Financial Advisor expert." },
      { role: "user", content: createFinancePrompt(income, expenses)}
    ],
    model: "gpt-4o",
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


export async function generateMealPlanAi(dietType:string, budget:string, timeConstraint:string): Promise<{
  mealPlan: MealPlan;
  groceryList: string[];
}> {
  const prompt = `
একজন ব্যবহারকারীর জন্য একটি সাপ্তাহিক (৭ দিনের) মিল প্ল্যান তৈরি করো।

- প্রতিদিন ব্রেকফাস্ট, লাঞ্চ এবং ডিনার থাকবে
- প্রতিটি মিলের টাইম থাকবে (যেমন: ${timeConstraint === 'quick' ? 'Under 30 মিনিট' : timeConstraint === 'medium' ?  '30-60 মিনিট' : 'No time constraint'})
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
