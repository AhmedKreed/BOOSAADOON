"use client";
import { createContext, useEffect } from "react";
import { PropsWithChildren, useState } from "react";
import { OrderState } from "@/types/index";

type OrderContextType = {
  order: OrderState;
  setOrder: React.Dispatch<React.SetStateAction<OrderState>>;
};

export const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: PropsWithChildren<object>) => {
  const [order, setOrder] = useState<OrderState>({
    isEmpty: true,
    meals: [],
    fullPrice: 0,
  });
  useEffect(() => {
    const storage = localStorage.getItem("order");
    if (JSON.parse(storage!)) setOrder(JSON.parse(storage!));
  }, []);
  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);
  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
