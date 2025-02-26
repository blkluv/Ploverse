import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = (props) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-8 p-8">
        <h1 className="text-7xl">
          <center>jo<span className="text-accent">GIG</span></center>
        </h1>
        <h3 className="text-xs">
          Get paid for jogiging and cleaning your city in the new Solana blockchain jo<span className="text-accent"></span>GIG</span> <span className="text-accent">ECO</span>nomy.🏃‍♂️💰🏙️
        </h3>
        <Image src={"/logo.png"} alt="logo" width={150} height={150} />
        <div className="flex flex-col gap-4 text-center max-w-[1200px]">
          <div>
            Go <b>Jogiging</b> with a bag, pick up litter, and earn digital currency that can be redeemed for real-world rewards. 🌱🏃‍♂️💎<br />
            <b>Join</b> the <b className="text-accent">jogig</b> LUV NFT Discord biz community and become a part of the movement to create a cleaner and healthier planet. 🌍💚<br />
             
          </div>
        </div>
        <Link href={"/create"}>
          <button className="btn text-xl mt-8">JOIN US!</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

