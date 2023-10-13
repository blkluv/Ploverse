import Link from "next/link";
import React, { useState } from "react";

export const AppBar: React.FC = () => {
  return (
    <div>
      <div className="navbar flex h-20 flex-row justify-between px-20 md:mb-2 shadow-lg bg-black text-neutral-content border-b border-zinc-600 bg-opacity-66">
        <Link href="/">
          <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-br from-white to-primary">
            Ploverse
          </h1>
        </Link>
        <div className="">
          <label
            htmlFor="my-drawer"
            className="btn-gh items-center justify-between mr-5">
            <div className="HAMBURGER-ICON space-y-2.5 ml-5">
              <div className={`h-0.5 w-8 bg-white `} />
              <div className={`h-0.5 w-8 bg-white `} />
              <div className={`h-0.5 w-8 bg-white `} />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
