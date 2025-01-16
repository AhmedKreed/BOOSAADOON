import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "BOOSAADOON Admins website",
  description: "too lazy to write a description. oh, i think this is enough",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.className} text-text bg-bg`}>
        <main className="flex flex-col justify-between min-h-screen relative section">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
