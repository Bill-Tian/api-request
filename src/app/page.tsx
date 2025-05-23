// import { RequestResponseTabs } from "@/components/request-response-tabs";
import { RequestResponse } from "@/components/request-response";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* <RequestResponseTabs /> */}
        <RequestResponse />
      </main>
    </div>
  );
}
