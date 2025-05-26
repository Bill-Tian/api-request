import { RequestResponseTabs } from "@/components/request-response-tabs";
// import { RequestResponse } from "@/components/request-response";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <RequestResponseTabs />
        {/* <RequestResponse /> */}
      </main>
    </div>
  );
}
