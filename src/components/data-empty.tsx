"use client";

import Image from "next/image";

export const DataEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/data-empty.svg" alt="data-empty" width={80} height={80} />
      <p className="text-gray-500 text-sm">No data</p>
    </div>
  );
};
