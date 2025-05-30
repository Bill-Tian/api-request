import { ModeToggle } from '@/components/mode-toggle';
import Image from 'next/image';
export const Header = () => {
  return (
    <header className="py-2">
      <div className="h-20 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <h2 className="text-2xl font-bold text-primary">Api Request</h2>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
};
