import "../globals.css";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
