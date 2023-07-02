"use client";
import Image from "next/image";
import * as React from "react";
import heroPic from "../../assets/hero-pic.png";
import { SafeUser } from "@/app/types";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";

interface IHeroProps {
  currentUser: SafeUser | null;
}

const Hero: React.FunctionComponent<IHeroProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const router = useRouter();

  const handleClick = () => {
    if (!currentUser) {
      registerModal.onOpen();
      return;
    }

    router.push("/aicheckup");
  };

  return (
    <section className="flex pl-[11.88rem]">
      <div className="flex flex-col w-full max-w-[28.8125rem] pt-[100px] gap-y-8">
        {/* heading */}
        <h1 className="text-[#000] text-[3rem] font-bold leading-[3.5rem]">
          Welcome to AI health assistance
        </h1>
        {/* subheading */}
        <h2 className="text-[#7d7987] text-[1.3125rem] font-normal leading-[2rem]">
          Health buddy provides a AI ckeckbot that will listen to your symptoms
          and will show you the probable diseases and the specialist doctors who
          can treat those.
        </h2>
        {/* button */}
        <button
          onClick={handleClick}
          className="w-[12.5rem] h-[3.5rem] bg-[#458ff6] rounded-[3.4375rem] text-center text-[#fff] text-[1.125rem] font-semibold"
        >
          Consult Today
        </button>
      </div>
      <Image
        src={heroPic}
        alt="hero-pic"
        width={693}
        height={598}
        className="ml-8"
      />
    </section>
  );
};

export default Hero;
