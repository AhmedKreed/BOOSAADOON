"use client";

import { useRouter } from "next/navigation";
import CloseImg from "@/assets/x-symbol-svgrepo-com.svg";
import Image from "next/image";

const Modal = () => {
  const router = useRouter();

  return (
    <>
      <Image
        className="top-0 right-0 w-8 h-8 cursor-pointer p-3 text-black font-bold absolute"
        src={CloseImg}
        alt="Close"
        width={32}
        height={32}
        onClick={() => router.back()}
      />
    </>
  );
};
export default Modal;
