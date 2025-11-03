import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-6 bg-[#EDEDED]" dir="ltr">
      <div className="section text-[#2A2A2A]">
        made with 🧠 by{" "}
        <Link href="https://github.com/AhmedKreed" className="text-[#DB032F]">
          AhmedKreed
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
