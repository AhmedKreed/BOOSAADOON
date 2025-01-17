"use client";

import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/shadcn/alert-dialog";
import { Dispatch, SetStateAction, useContext } from "react";
import { OrderContext } from "@/context/orderContext";

type FormData = {
  name: string;
  phone: string;
  message: string;
  location: string;
  pickOrDelivery: string;
};

const AlertDialogs = ({
  formData,
  disabled,
  setError,
  setLoading,
}: {
  formData: FormData;
  disabled: boolean;
  setError: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const { order, setOrder } = useContext(OrderContext);
  const router = useRouter();
  const data = {
    ...formData,
    meals: order.meals,
    fullPrice: order.fullPrice,
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
        }
      );

      if (!response.ok) {
        throw new Error("حدث خطأ نرجو اعادة المحاولة");
      }

      const result = await response.json();
      localStorage.removeItem("order");
      setOrder({
        isEmpty: true,
        meals: [],
        fullPrice: 0,
      });
      router.push("/" + result.id);
    } catch {
      setError("حدث خطأ نرجو اعادة المحاولة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={disabled}
        className={`w-full py-2 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition-shadow text-center ${
          disabled
            ? "bg-gray-400 cursor-not-allowed opacity-50"
            : "bg-gradient-to-r from-orange-500 to-red-500"
        }`}
      >
        إرسال الطلب
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">
            هل أنت متأكد من إرسال الطلب؟
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            بمجرد إرسال هذا الطلب، لا يمكن التراجع عنه. تأكد من صحة التفاصيل قبل
            المتابعة.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            className="bg-gradient-to-r from-orange-500 to-red-500 "
            onClick={handleClick}
          >
            تأكيد
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogs;
