import * as React from "react";

interface ILogoProps {}

const Logo: React.FunctionComponent<ILogoProps> = (props) => {
  return (
    <div className="flex items-center gap-1">
      <div className="w-[2.5625rem] h-[2.5625rem] bg-[#458FF6] text-center text-[#fff] text-[1.625rem] font-bold leading-normal rounded-full">
        H
      </div>
      <span className="text-[1.5rem] font-bold text-[#233348]">
        Health Buddy
      </span>
    </div>
  );
};

export default Logo;
