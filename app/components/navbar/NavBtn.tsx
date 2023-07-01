"use client";
import Link from "next/link";
import * as React from "react";

interface INavBtnProps {
  onPage: boolean;
  title: string;
}

const NavBtn: React.FunctionComponent<INavBtnProps> = ({ onPage, title }) => {
  return (
    <p
      className={`text-[1.125rem] leading-normal ${
        onPage ? "font-semibold text-[#1f1534]" : "font-normal text-gray-400"
      }`}
    >
      {title}
    </p>
  );
};

export default NavBtn;
