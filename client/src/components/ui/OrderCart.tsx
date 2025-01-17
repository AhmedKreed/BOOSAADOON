"use client";

import { OrderContext } from "@/context/orderContext";
import Link from "next/link";
import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";

const OrderCart = () => {
  const { order } = useContext(OrderContext);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {
        <div className="absolute right-8 bottom-8 flex flex-col space-y-4">
          {pathname !== "/order" ? (
            !order.isEmpty && (
              <Link
                className="rounded-full menu text-bg bg-white shadow-lg p-6"
                href="/order"
              >
                طلبك
              </Link>
            )
          ) : (
            <button
              className="rounded-full menu text-bg bg-white shadow-lg p-6"
              onClick={() => router.back()}
            >
              العودة
            </button>
          )}
        </div>
      }
    </>
  );
};

export default OrderCart;
