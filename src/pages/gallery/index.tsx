import Image from "next/image";

export default function Gallery() {
  return (
    <div className="flex flex-col gap-8 p-16 text-center items-center justify-center">
      <h2 className="text-4xl">Please look forward to updates!</h2>
      <Image src={"/logo.png"} alt="logo" width={200} height={200} />
      <div className="max-w-[800px]">
        We have plans to implement a feature on this page that will allow you to
        collect your own Plocka NFTs as well as those created by others.
      </div>
      <div>Furthermore, you will have the ability to buy and sell them.</div>
    </div>
  );
}
