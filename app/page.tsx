import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import dots from "./assets/dots.png";
import Hero from "./components/hero section/Hero";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <div className="relative pb-10">
      <Navbar page="home" currentUser={currentUser} />
      <Image
        src={dots}
        alt="dots"
        width={132}
        height={115}
        className="absolute top-[10rem] left-0"
      />
      <Hero currentUser={currentUser} />
    </div>
  );
}
