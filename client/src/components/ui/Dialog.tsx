"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcn/dialog";
import "@/app/globals.css";
import AlertDialogs from "./meniUi/AlertDialog";
import { Id, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dialogs = () => {
  const toastIdRef = useRef<Id | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    location: "",
    pickOrDelivery: "",
  });

  const validatePhone = (phone: string) => {
    const regex = /^(091|092|093|094)\d{7}$/;
    return regex.test(phone);
  };

  const isFormValid = () => {
    const isPhoneValid = validatePhone(formData.phone);
    const isPickOrDeliveryValid = formData.pickOrDelivery !== "";
    const isNamed = formData.name !== "";
    return isPhoneValid && isPickOrDeliveryValid && isNamed;
  };

  useEffect(() => {
    setDisabled(!isFormValid());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    if (error) {
      if (toastIdRef.current) {
        toast.update(toastIdRef.current, {
          render: error,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        toastIdRef.current = null;
      }
    }
    setError("");
  }, [error]);

  useEffect(() => {
    if (loading) toastIdRef.current = toast.loading("انتظر قليلا");
  }, [loading]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Dialog>
      <ToastContainer className="text-lg" rtl />
      <DialogTrigger
        className="rounded-full border-2 border-transparent bg-transparent text-gradient font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-shadow mx-auto
"
      >
        أطلب الان
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">قم بتعبئة الحقل</DialogTitle>

          <form className="bg-white rounded-lg p-8 w-full max-w-md mx-auto space-y-4 text-right">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                رقم الهاتف
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={`w-full mt-1 px-4 placeholder:text-right py-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 ${"border-gray-300"}`}
                placeholder="09xxxxxxxx"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                الاسم
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="أدخل اسمك"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                ملاحظات
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="أدخل ملاحظاتك"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                أقرب نقطة دالة
              </label>
              <select
                id="location"
                name="location"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.location}
                onChange={handleChange}
                required
              >
                <option value="">اختر النقطة الدالة</option>
                <option value="نقطة1">نقطة1</option>
                <option value="نقطة2">نقطة2</option>
                <option value="نقطة3">نقطة3</option>
                <option value="نقطة4">نقطة4</option>
                <option value="نقطة5">نقطة5</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                اختر طريقة التوصيل
              </label>
              <div className="flex items-center space-x-4 justify-evenly">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="pickOrDelivery"
                    value="استلام من المطعم"
                    checked={formData.pickOrDelivery === "استلام من المطعم"}
                    onChange={handleChange}
                    className="form-radio text-orange-500"
                  />
                  <span className="mx-2">استلام من المطعم</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="pickOrDelivery"
                    value="توصيل"
                    checked={formData.pickOrDelivery === "توصيل"}
                    onChange={handleChange}
                    className="form-radio text-orange-500"
                  />
                  <span className="mx-2">توصيل</span>
                </label>
              </div>
            </div>
            <AlertDialogs
              formData={formData}
              disabled={disabled}
              setError={setError}
              setLoading={setLoading}
            />
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Dialogs;
