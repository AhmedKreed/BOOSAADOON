"use client";

import { OrderContext } from "@/context/orderContext";
import { useContext } from "react";
import Dialogs from "@/components/ui/Dialog";
import Image from "next/image";
import icon1 from "@/assets/plus.svg";
import icon2 from "@/assets/minus.svg";
import { OrderState, Meal } from "@/types/index";

const CartOrders = () => {
  const { order, setOrder } = useContext(OrderContext);

  console.log(order.fullPrice);

  const addMeal = (meals: Meal) => {
    setOrder((prevOrder: OrderState): OrderState => {
      const mealIndex = prevOrder.meals.findIndex(
        (item: Meal) => item.meal === meals.meal
      );

      if (mealIndex !== -1) {
        const updatedMeals = [...prevOrder.meals];
        updatedMeals[mealIndex] = {
          ...updatedMeals[mealIndex],
          quantity: updatedMeals[mealIndex].quantity + 1,
        };

        return {
          ...prevOrder,
          meals: updatedMeals,
          fullPrice: prevOrder.fullPrice + updatedMeals[mealIndex].price,
        };
      }

      return {
        ...prevOrder,
        meals: [
          ...prevOrder.meals,
          { meal: meals.meal, price: meals.price, quantity: 1 },
        ],
        fullPrice: prevOrder.fullPrice + meals.price,
      };
    });
  };

  const removeMeal = (mealName: string) => {
    setOrder((prevOrder: OrderState) => {
      const mealToRemove = prevOrder.meals.find(
        (meal: Meal) => meal.meal === mealName
      );

      const updatedMeals = prevOrder.meals
        .map((meal: Meal) => {
          return meal.meal === mealName
            ? { ...meal, quantity: meal.quantity - 1 }
            : meal;
        })
        .filter((meal) => meal.quantity > 0);

      return {
        ...prevOrder,
        meals: updatedMeals,
        isEmpty: updatedMeals.length === 0,
        fullPrice: mealToRemove
          ? prevOrder.fullPrice - mealToRemove.price
          : prevOrder.fullPrice,
      };
    });
  };

  return (
    <div className="relative min-h-screen py-10 px-5 bg-custom-pattern">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gradient mb-5 text-center">
          طلباتك
        </h1>
        {order.meals.length > 0 ? (
          <div className="space-y-4">
            {order.meals.map((item: Meal, i: number) => (
              <div
                key={item.meal + i}
                className="flex justify-between items-center border-b pb-4"
              >
                <p className="text-lg font-medium">{item.meal}</p>
                <div className="flex items-center gap-4">
                  <button></button>
                  <Image
                    src={icon1}
                    alt={"add"}
                    width={20}
                    height={20}
                    onClick={() => addMeal(item)}
                  />
                  <p>{item.quantity}</p>
                  <Image
                    src={icon2}
                    alt={"minus"}
                    width={20}
                    height={20}
                    onClick={() => removeMeal(item.meal)}
                  />
                </div>
                <p className="text-lg font-semibold text-gradient">
                  {item.price} د.ل
                </p>
              </div>
            ))}
            <div className="w-full flex justify-center items-center">
              <Dialogs />
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">
            لا توجد طلبات حاليا.
          </p>
        )}
      </div>
    </div>
  );
};

export default CartOrders;
