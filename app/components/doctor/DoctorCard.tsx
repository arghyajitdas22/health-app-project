import Image from "next/image";
import * as React from "react";

interface IDoctorCardProps {
  image?: any;
  name: string;
  // degree: string;
  specialization: any[];
  fees: string;
  rating: string;
}

const DoctorCard: React.FunctionComponent<IDoctorCardProps> = ({
  image,
  name,

  specialization,
  fees,
  rating,
}) => {
  let specializationString = "";
  for (let i = 0; i < specialization.length; i++) {
    specializationString += specialization[i];
  }
  return (
    <div className="w-full m-0 flex flex-col relative p-[0.9375rem] border border-[#dadada] rounded-md hover:shadow-lg shadow-sm">
      <div className="flex flex-col flex-1">
        <div className="w-full flex mb-[0.625rem]">
          <div className="rounded-[0.25rem] h-[5.625rem] w-[5.625rem] min-w-[5.625rem] min-h-[5.625rem] shrink-0">
            <img
              src={image}
              alt="profile-doc"
              width={90}
              height={90}
              className="rounded-[0.25rem]"
            />
          </div>
        </div>

        <div>
          <div className="mb-[0.3125rem] text-[1rem] leading-[1.37rem] font-medium text-[#0e0e0e]">
            <span>{name}</span>
          </div>
          <div className="mb-[0.5rem]">
            <span className="text-[0.875rem] leading-[1rem] font-normal text-[#0e0e0e]">
              {specializationString}
            </span>
          </div>
          <div className="mb-[0.75rem]">
            <p className="text-[0.75rem] whitespace-pre-wrap leading-[1rem] font-normal">
              {fees}/hr
            </p>
          </div>
          <p className="text-[0.75rem] whitespace-pre-wrap leading-[1rem] font-normal">
            Rating: {rating}
          </p>
        </div>
      </div>
      <hr className="h-[1px] bg-[#dadada] my-[0.9375rem] mx-[calc(-0.9375rem)]" />

      <div className="flex justify-between items-center flex-nowrap"></div>
    </div>
  );
};

export default DoctorCard;
