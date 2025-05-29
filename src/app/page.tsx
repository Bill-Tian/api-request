import { RequestResponseTabs } from "@/components/request-response-tabs";
// import { RequestResponse } from "@/components/request-response";

export default function Home() {
  return (
    <div className="grid justify-items-center min-h-screen px-8 py-4 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full text-center py-4">
        <h1 className="text-2xl font-bold text-gray-800">Api Request</h1>
      </header>
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <RequestResponseTabs />
        {/* <RequestResponse /> */}
      </main>
    </div>
  );
}
