import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import dots from "./assets/dots.png";
import Hero from "./components/hero section/Hero";

export default function Home() {
  return (
    <main className="relative pb-10">
      <Navbar page="home" />
      <Image
        src={dots}
        alt="dots"
        width={132}
        height={115}
        className="absolute top-[10rem] left-0"
      />
      <Hero />
    </main>
  );
}
