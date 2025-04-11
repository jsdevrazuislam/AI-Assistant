export interface Task {
  id: string
  title: string
  completed: boolean
  priority: "high" | "medium" | "low"
  dueDate: string
  time: string
}


export interface FinanceIncome{
  id: number;
  source: string;
  amount: number;
  date: string;
}


export interface Expenses {
    id: number;
    category: string;
    amount: number;
    date: string;
}