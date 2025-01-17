"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Unauthorized access");
        }
      } catch (error) {
        console.log("Error: " + (error as Error).message);
        router.push("/auth");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.message === "Login successfully") router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) <div>جارٍ التحميل</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96 text-right"
        dir="rtl"
      >
        <h2 className="text-2xl font-bold text-text mb-6">تسجيل الدخول</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-text mb-2">
            اسم المستخدم
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-bg text-text"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-text mb-2">
            كلمة المرور
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-bg text-text"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
