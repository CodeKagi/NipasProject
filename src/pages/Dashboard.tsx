import TopNav from "../components/TopNav";

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <h1 className="text-2xl font-bold text-[#3F842E] mb-4">Dashboard</h1>
          <p className="text-gray-700">
            Main dashboard content goes here. Scrollable while nav stays sticky.
          </p>
        </div>
      </div>
    </div>
  );
}
