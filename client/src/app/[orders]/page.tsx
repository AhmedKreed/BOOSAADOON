import CopyButton from "@/components/ui/meniUi/CopyButton";
import { Meal } from "@/types";
import { Key } from "react";
import { headers } from "next/headers";

const Page = async ({ params }) => {
  const { orders } = (await params) || {};

  const heads = headers();

  const pathname = (await heads).get("next-url");

  let orderData = null;
  let statusText = "حالة غير معروفة";

  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/order/${orders}`
    );

    if (!result.ok) {
      throw new Error("order not found");
    }

    orderData = await result.json();

    if (orderData) {
      switch (orderData.status) {
        case "الطلب ينتظر":
          statusText = "في الانتظار";
          break;
        case "يتم تحضير الطلب":
          statusText = "قيد التحضير";
          break;
        case "يتم توصيل الطلب":
          statusText = "قيد التوصيل";
          break;
        case "الطلب جاهز":
          statusText = "طلبك ينتظرك";
          break;
        default:
          statusText = "حالة غير معروفة";
      }
    }
  } catch (error) {
    console.error("Error fetching order data:", error);
  }

  const trackingLink = pathname;
  let content;

  if (orderData) {
    content = (
      <>
        <p>{statusText}</p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">تفاصيل الطلب:</h2>
          <p>
            <strong>الاسم:</strong> {orderData.name}
          </p>
          <p>
            <strong>الهاتف:</strong> {orderData.phone}
          </p>
          <p>
            <strong>طريقة التسليم:</strong> {orderData.pickOrDelivery}
          </p>
          <p>
            <strong>السعر الكلي:</strong> {orderData.fullPrice}
          </p>
          {orderData.location && (
            <p>
              <strong>الموقع:</strong> {orderData.location}
            </p>
          )}
          {orderData.message && (
            <p>
              <strong>رسالة:</strong> {orderData.message}
            </p>
          )}

          <h3 className="text-lg font-medium mt-4">الوجبات:</h3>
          <ul>
            {orderData.meals.map(
              (meal: Meal, index: Key | null | undefined) => (
                <li key={index} className="mt-2">
                  <p>
                    <strong>الوجبة:</strong> {meal.meal}
                  </p>
                  <p>
                    <strong>السعر:</strong> {meal.price}
                  </p>
                  <p>
                    <strong>الكمية:</strong> {meal.quantity}
                  </p>
                </li>
              )
            )}
          </ul>
          <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">
              لتتبع طلبك، يرجى نسخ الرابط التالي:
            </p>
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={trackingLink}
                readOnly
                className="flex-1 p-2 border rounded-l-lg text-gray-700 bg-white"
              />
              <CopyButton text={trackingLink} />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    content = <p>حالة الطلب غير صحيحة.</p>;
  }

  return (
    <div className="bg-bg text-text p-8 rounded-3xl shadow-lg max-w-2xl mx-auto mt-16">
      <div className="text-center p-6 rounded-xl bg-gradient-to-r from-[#fd8135] to-[#db032f] text-white shadow-xl transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-4xl font-semibold">
          حالة الطلب: <span className="text-white">{statusText}</span>
        </h1>
      </div>
      <div className="text-lg mt-6 bg-white p-6 rounded-xl shadow-md">
        <div className="text-gray-700">{content}</div>
      </div>
    </div>
  );
};

export default Page;
