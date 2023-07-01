"use client";
import * as React from "react";
import Logo from "./Logo";
import Link from "next/link";
import NavBtn from "./NavBtn";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface INavbarProps {
  page: string;
  currentUser: User | null;
}

const Navbar: React.FunctionComponent<INavbarProps> = ({
  page,
  currentUser,
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  return (
    <div className="px-20 py-8 flex items-center justify-between">
      <Logo />

      <div className="flex items-center gap-x-5">
        {/* Nav items */}

        {currentUser ? (
          <>
            {/* Home */}
            <Link href={"/"}>
              <NavBtn onPage={page === "home" ? true : false} title="Home" />
            </Link>
            {/* Find a doctor */}
            <Link href={"/"}>
              <NavBtn
                onPage={page === "doctors" ? true : false}
                title="Find a doctor"
              />
            </Link>
            {/* Book Ambulance */}
            <Link href={"/"}>
              <NavBtn
                onPage={page === "ambulance" ? true : false}
                title="Book an ambulance"
              />
            </Link>
            {/* Logout */}
            <div className="m-0 p-0 cursor-pointer" onClick={() => signOut()}>
              <NavBtn onPage={false} title="Login" />
            </div>
          </>
        ) : (
          <>
            {/* Login */}
            <div
              className="m-0 p-0 cursor-pointer"
              onClick={registerModal.onOpen}
            >
              <NavBtn onPage={false} title="Sign Up" />
            </div>
            {/* Sign up */}
            <div className="m-0 p-0 cursor-pointer" onClick={loginModal.onOpen}>
              <NavBtn onPage={false} title="Login" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
