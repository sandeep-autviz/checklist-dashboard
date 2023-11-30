import React from "react";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3 p-4">
        <div className="min-height bg-blue w-full bg-gray rounded-lg">
          <div className="text-sm font-medium text-gray truncate">
            Total users
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray">12,00</div>
        </div>
        <div className="min-height bg-darkblue w-full bg-gray rounded-lg">
          <div className="text-sm font-medium text-gray truncate">
            Total Profit
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray">
            $ 450k
          </div>
        </div>
        <div className="min-height bg-peach w-fullbg-gray rounded-lg">
          <div className="text-sm font-medium text-gray truncate">
            Total Orders
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray">20k</div>
        </div>
      </div>
    </>
  );
}
