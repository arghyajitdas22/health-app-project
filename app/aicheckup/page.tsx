import getCurrentUser from "../actions/getCurrentUser";
import Navbar from "../components/navbar/Navbar";
import ChatSec from "./components/chat section/ChatSec";
import dots from "../assets/dots.png";
import Image from "next/image";

export default async function AiCheckup() {
  const currentUser = await getCurrentUser();

  return (
    <div className="relative pb-10">
      <Navbar page="aicheckup" currentUser={currentUser} />
      <p className="text-[#333] text-[20px] pl-40 font-semibold">
        Choose your Symptoms
      </p>
      <ChatSec />
      <Image
        src={dots}
        alt="dots"
        width={132}
        height={115}
        className="absolute top-[120px] left-0"
      />
      <Image
        src={dots}
        alt="dots"
        width={132}
        height={115}
        className="absolute bottom-[30px] right-0"
      />
    </div>
  );
}
