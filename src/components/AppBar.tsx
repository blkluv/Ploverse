import React, { useState } from "react";

export const AppBar: React.FC = () => {
  return (
    <div>
      <div className="navbar flex h-20 flex-row justify-between px-20 md:mb-2 shadow-lg bg-black text-neutral-content border-b border-zinc-600 bg-opacity-66">
        <h1 className="text-4xl">Ploverse</h1>
        <div className="">
          <label
            htmlFor="my-drawer"
            className="btn-gh items-center justify-between mr-5">
            <div className="HAMBURGER-ICON space-y-2.5 ml-5">
              <div className={`h-0.5 w-8 bg-purple-600 `} />
              <div className={`h-0.5 w-8 bg-purple-600 `} />
              <div className={`h-0.5 w-8 bg-purple-600 `} />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
