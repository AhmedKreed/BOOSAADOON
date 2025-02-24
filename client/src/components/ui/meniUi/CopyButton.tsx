"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CopyButton = () => {
  const pathname = usePathname();
  const [pageURL, setPageURL] = useState("");

  useEffect(() => {
    const fullURL = `${window.location.origin}${pathname}`;
    setPageURL(fullURL);
  }, [pathname]);

  const handleCopy = () => {
    navigator.clipboard.writeText(pageURL).then(() => {
      toast("الرابط تم نسخه بنجاح!");
    });
  };

  return (
    <>
      <input
        type="text"
        value={pageURL}
        readOnly
        className="flex-1 p-2 border rounded-l-lg text-gray-700 bg-white"
      />
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
