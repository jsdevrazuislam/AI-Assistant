interface Meal {
    type: "Breakfast" | "Lunch" | "Dinner";
    name: string;
    time: string;
    vegetarian: boolean;
  }
  
  interface DailyMealPlan {
    day: string;
    meals: Meal[];
  }
  interface DailyMealPlanResponse {
    days: DailyMealPlan[];
    groceryList: string[];
  }
  
  interface MealPlan {
    days: DailyMealPlan[];
  }

  interface Suggestions{
    title: string,
    description:string
  }