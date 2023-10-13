import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = (props) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-8 p-8">
        <h1 className="text-7xl">
          <span className="text-accent">PLO</span>gging
          <br />
          uni<span className="text-accent">VERSE</span>
        </h1>
        <h3 className="text-xs">
          Leave a Footprint in the Blockchain Universe with Plogging.
        </h3>
        <Image src={"/logo.png"} alt="logo" width={150} height={150} />
        <div className="flex flex-col gap-4 text-center max-w-[1200px]">
          <div>
            <b>Plogging</b> is an eco-friendly activity that combines{" "}
            <b>jogging</b> with <b>picking up litter</b> to keep our environment
            clean.
          </div>
          <div>
            Turn your plogging milestones into unique <b>NFT</b> treasures with
            our service! 🌱🏃‍♂️💎
          </div>
          <div>
            Elevate your eco-friendly journey with
            <b className="text-accent"> Ploverse</b> where plogging meets NFT
            creation, preserving the planet one step at a time!
          </div>
        </div>
        <Link href={"/create"}>
          <button className="btn text-xl mt-8">Let&apos;s Plocka Upp !</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
