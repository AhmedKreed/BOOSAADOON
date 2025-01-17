"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import { MENU } from "@/constants";
import { OrderContext } from "@/context/orderContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OrderState, Meal } from "@/types/index";

const Menu = () => {
  const { setOrder } = useContext(OrderContext);
  const notify = (name: string) => toast(`تمت اضافة ${name} الى السلة`);
  const addOrder = (meals: { meal: string; price: number }) => {
    setOrder((prevOrder: OrderState): OrderState => {
      if (prevOrder.isEmpty) {
        return {
          isEmpty: false,
          meals: [{ meal: meals.meal, price: meals.price, quantity: 1 }],
          fullPrice: prevOrder.fullPrice + meals.price,
        };
      }

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

    notify(meals.meal);
  };

  return (
    <section className="section">
      <ToastContainer className="text-lg" rtl />
      <Accordion type="single" collapsible className="flex flex-col gap-4">
        {MENU.map((item, index) => (
          <AccordionItem value={`item${index}`} key={item.category + index}>
            <AccordionTrigger className="text-xl w-full border-0 py-2 px-4 bg-[#EDEDED] text-[#2a2a2a] rounded-xl shadow-sm">
              {item.category}
            </AccordionTrigger>
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[#EDEDED]">
              {item.meals.map((meal, index) => (
                <AccordionContent
                  className="flex justify-between items-center noPadding border-x-[1px] border-[#A4A4A4] mb-7"
                  key={meal.meal + index}
                >
                  {/* Left Line */}
                  <div className="absolute top-0 bottom-0 left-0  h-full w-1 bg-[#EDEDED]" />

                  {/* Right Line */}
                  <div className="absolute top-0 bottom-0 right-0 h-full w-1 bg-[#EDEDED]" />

                  <p className="text-[#4A4A4A] text-xl mr-6">{meal.meal}</p>
                  <div className="flex flex-col items-center gap-1 ml-6">
                    <p className="text-[#4A4A4A] font-bold">{meal.price}</p>
                    <button
                      className="menu text-bg rounded-lg px-4 py-[4px]"
                      onClick={() => addOrder(meal)}
                    >
                      أضف
                    </button>
                  </div>
                </AccordionContent>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Menu;
