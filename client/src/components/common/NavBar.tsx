"use client";
import { NAV } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/favicon.ico";
import menu from "@/assets/menu.svg";
import { useState } from "react";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="h-32 flex justify-between items-center section relative">
      <Image src={logo} alt={"logo"} className="h-20 sm:h-24 md:h-32 w-auto" />
      {/* DESKTOP */}
      <div className="flex gap-12 max-md:hidden">
        {NAV.map((item) => (
          <Link
            href={item.link}
            key={item.title}
            className="text-lg font-semibold"
          >
            {item.title}
          </Link>
        ))}
      </div>
      {/* TABS AND MOBILE */}
      <button className="md:hidden" onClick={() => setToggle(!toggle)}>
        <Image src={menu} alt={"menu"} className="w-10 h-10" />
      </button>
      <div
        className={`md:hidden absolute w-full sm:px-8 px-6 momenu left-1/2 -bottom-[240px] ${
          toggle ? "flex flex-col" : "hidden"
        }`}
      >
        {NAV.map((item, index) => (
          <Link
            href={item.link}
            key={item.title}
            className={`text-lg py-4 px-4 text-center bg-[#3333] font-semibold ${
              index === 0 ? "rounded-t-lg" : ""
            } ${!NAV[index + 1] && "rounded-b-lg"}`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <Link
        href={"/menu"}
        className="menu sm:text-2xl sm:px-10 sm:py-4 px-5 py-2 text-lg text-bg font-bold rounded-lg"
      >
        المنيو
      </Link>
    </nav>
  );
};

export default NavBar;
