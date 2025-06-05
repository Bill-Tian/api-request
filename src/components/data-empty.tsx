'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

export const DataEmpty = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image
        src={theme === 'dark' ? '/data-empty-dark.svg' : '/data-empty.svg'}
        alt="data-empty"
        width={80}
        height={80}
      />
      <p className="text-gray-500 text-sm">No data</p>
    </div>
  );
};
