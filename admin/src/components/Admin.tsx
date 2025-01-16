"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Meal, Order } from "@/types";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [messageIndex, setMessageIndex] = useState<number | null>(null);
  const [mealsIndex, setMealsIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAuthCheck = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/auth/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Unauthorized access");
        }
      } catch (error) {
        console.log("Error: " + (error as Error).message);
        router.push("/auth");
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/order");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log("Error: " + (error as Error).message);
      }
    };

    fetchAuthCheck();
    fetchData();
  }, [router]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const toggleMessage = (index: number) => {
    setMessageIndex(messageIndex === index ? null : index);
  };

  const toggleMeals = (index: number) => {
    setMealsIndex(mealsIndex === index ? null : index);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("تم نسخ الرقم إلى الحافظة!");
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  const changeOrderStatus = async (
    orderId: string,
    status: string,
    pickOrDelivery: string
  ) => {
    let newStatus = "";

    switch (status) {
      case "الطلب ينتظر":
        newStatus = "يتم تحضير الطلب";
        break;
      case "يتم تحضير الطلب":
        newStatus =
          pickOrDelivery === "توصيل" ? "يتم توصيل الطلب" : "الطلب جاهز";
        break;
      default:
        return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/order/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
    } catch (error) {
      console.log("Error: " + (error as Error).message);
    } finally {
      router.push("/");
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/order/${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }
    } catch (error) {
      console.log("Error: " + (error as Error).message);
    } finally {
      router.push("/");
    }
  };

  if (loading) return <div className="text-center py-5">جارٍ التحميل...</div>;

  return (
    <div className="container mx-auto p-4">
      {data.map((item: Order, index) => (
        <div
          key={index}
          className="mb-4 border border-gray-300 rounded-lg shadow-sm"
        >
          <div
            className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
            onClick={() => toggleAccordion(index)}
          >
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-lg">السعر الكلي: {item.fullPrice}</p>
          </div>
          {expandedIndex === index && (
            <div className="p-4">
              <div
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => toggleMeals(index)}
              >
                عرض الوجبات
              </div>
              {mealsIndex === index && (
                <div className="mt-2">
                  <h3 className="text-lg font-medium">الوجبات</h3>
                  {item.meals.map((meal: Meal, i: number) => (
                    <div key={i} className="my-2">
                      <p className="font-semibold">الوجبة: {meal.meal}</p>
                      <p>السعر: {meal.price}</p>
                      <p>الكمية: {meal.quantity}</p>
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-2">الاستلام أو التوصيل: {item.pickOrDelivery}</p>
              <div className="flex items-center">
                <p>الهاتف: {item.phone}</p>
                <button
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => copyToClipboard(item.phone)}
                >
                  نسخ
                </button>
              </div>
              {item.location && <p>الموقع: {item.location}</p>}
              {item.message && (
                <div className="mt-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => toggleMessage(index)}
                  >
                    عرض الرسالة
                  </button>
                  {messageIndex === index && (
                    <div className="mt-1 p-2 border border-gray-300 rounded">
                      {item.message}
                    </div>
                  )}
                </div>
              )}
              <p className="mt-2">الحالة: {item.status}</p>
              {item.status === "يتم توصيل الطلب" ||
              item.status === "الطلب جاهز" ? (
                <button
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => deleteOrder(item._id)}
                >
                  تم استلام الطلبية
                </button>
              ) : (
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() =>
                    changeOrderStatus(
                      item._id,
                      item.status,
                      item.pickOrDelivery
                    )
                  }
                >
                  تحديث الحالة
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Admin;
