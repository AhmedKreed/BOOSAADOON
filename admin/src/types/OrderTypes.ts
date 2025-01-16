export type Meal = {
  meal: string;
  price: string;
  quantity: string;
};

export type Order = {
  _id: string;
  name: string;
  phone: string;
  pickOrDelivery: "توصيل" | "استلام من المطعم";
  meals: Meal[];
  fullPrice: string;
  location?: string;
  message?: string;
  status: "يتم تحضير الطلب" | "الطلب جاهز" | "يتم توصيل الطلب" | "الطلب ينتظر";
};
