"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CopyButton = ({ text }: { text: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      toast("الرابط تم نسخه بنجاح!");
    });
  };

  return (
    <>
      <ToastContainer />
      <button
        onClick={handleCopy}
        className="p-2 bg-gradient-to-r from-[#fd8135] to-[#db032f] text-white rounded-lg shadow hover:shadow-md transition-transform transform hover:scale-105"
      >
        نسخ الرابط
      </button>
    </>
  );
};
export default CopyButton;
