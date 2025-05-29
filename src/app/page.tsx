import { RequestResponseTabs } from "@/components/request-response-tabs";
// import { RequestResponse } from "@/components/request-response";

export default function Home() {
  return (
    <div className="grid justify-items-center px-8 py-2 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-center items-center w-full text-center py-2 h-20">
        <h1 className="text-2xl font-bold text-gray-800">Api Request</h1>
      </header>
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <RequestResponseTabs />
        {/* <RequestResponse /> */}
      </main>
    </div>
  );
}
