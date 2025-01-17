import Image from "next/image";
import orderGuy from "@/assets/order.svg";
import location from "@/assets/location.svg";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="section mb-auto sm:pt-16 pt-8">
      <div className="flex sm:flex-row flex-col gap-5 justify-between mb-10">
        <h1 className="lg:text-[84px] md:text-6xl text-[42px] lineHeight font-bold text-gradient ">
          الموقع الاكتروني لطلباتكم
        </h1>
        <Image src={orderGuy} alt={"orderGuy"} className="h-40 w-auto" />
      </div>
      <div>
        <p className="mb-6 max-sm:text-[14px] leading-8">
          تلذذ بأفضل الوجبات السريعة في السوق!
          <br />
          بيتزا ومعجنات وبرجر وساندويشات معدة بحرفية ومهارة ، ومخصصة فقط من
          أجلكم
        </p>
        <div className="flex gap-3 items-center sm:mb-20 mb-16">
          <Image src={location} alt={"location"} sizes="32" />
          <p className="font-bold text-[14px]">
            جنزور، اليرموك مقابل مصحة البيان, Tripoli, Libya
          </p>
        </div>
      </div>
      <div className="text-center h-16">
        <Link
          href={""}
          className="menu text-bg rounded-lg text-2xl sm:text-2xl sm:px-16 sm:py-4 px-12 py-2 font-bold"
        >
          اطلب الان
        </Link>
      </div>
    </section>
  );
};

export default Hero;
