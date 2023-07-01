import * as React from "react";
import Logo from "./Logo";
import Link from "next/link";
import NavBtn from "./NavBtn";

interface INavbarProps {
  page: string;
}

const Navbar: React.FunctionComponent<INavbarProps> = ({ page }) => {
  return (
    <div className="px-20 py-8 flex items-center justify-between">
      <Logo />

      <div className="flex items-center gap-x-5">
        {/* Nav items */}

        {/* if current user present */}
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

        {/* if current user isnt present */}
        {/* Login */}
        <NavBtn onPage={false} title="Login" />
        {/* Sign up */}
        <NavBtn onPage={false} title="Sign Up" />
      </div>
    </div>
  );
};

export default Navbar;
