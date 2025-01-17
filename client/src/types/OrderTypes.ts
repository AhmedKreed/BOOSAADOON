export type Meal = {
  meal: string;
  price: number;
  quantity: number;
};

export type OrderState = {
  isEmpty: boolean;
  meals: Meal[];
  fullPrice: number;
};
