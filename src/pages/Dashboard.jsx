import React from "react";
import Header from "../components/Header";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Dashboard() {
  return (
    <>
      <Header title={"Dashboard"} />
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
          <div className="mt-1 text-3xl font-semibold text-gray">$ 450k</div>
        </div>
        <div className="min-height bg-peach w-fullbg-gray rounded-lg">
          <div className="text-sm font-medium text-gray truncate">
            Total Orders
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray">20k</div>
        </div>
      </div>
      <div className="flex">
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          width={500}
          height={300}
        />
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["group D", "group E", "group F"] },
          ]}
          series={[
            { data: [443, 34, 51] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          width={500}
          height={300}
        />
      </div>
    </>
  );
}
