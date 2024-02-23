import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = (props) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-8 p-8">
        <h1 className="text-7xl">
          <span className="text-accent">EARN</span>money jogging
          <br />
          jo<span className="text-accent">GIG</span>
        </h1>
        <h3 className="text-xs">
          Get paid for jogging and cleaning your city in the Jogig economy.
        </h3>
        <Image src={"/logo.png"} alt="logo" width={150} height={150} />
        <div className="flex flex-col gap-4 text-center max-w-[1200px]">
          <div>
            <b className="text-accent">jogig</b> the reVULutionary eco-friendly activity get paid for jogging and cleaning your city! 🏃‍♂️💰🏙️<br />
            <b>jog</b>, pick up litter, and earn digital tokens that can be redeemed for real-world rewards. 🌱🏃‍♂️💎<br />
            <b>Join</b> the <b className="text-accent">jogig</b> community and become a part of the movement to create a cleaner and healthier planet. 🌍💚<br />
            <b>Elevate</b> your jogging routine and make a positive impact on your city with joGIG one step at a time! 👟🏙️
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

