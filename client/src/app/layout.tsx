import type { Metadata } from "next";
import "./globals.css";
import { Cairo } from "next/font/google";
import { OrderProvider } from "@/context/orderContext";
import OrderCart from "@/components/ui/OrderCart";

export const metadata: Metadata = {
  title: "مطعم بو سعدون",
  description: `تلذذ بأفضل الوجبات السريعة في السوق!
بيتزا ومعجنات وبرجر وساندويشات معدة بحرفية ومهارة ، ومخصصة فقط من أجلكم
`,
};

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const RootLayout = ({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) => {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`text-text bg-bg ${cairo.className}`}>
        <OrderProvider>
          <main className="flex flex-col justify-between min-h-screen relative">
            {children}
            {modal}
            <OrderCart />
          </main>
        </OrderProvider>
      </body>
    </html>
  );
};

export default RootLayout;
