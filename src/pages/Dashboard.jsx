import React from "react";
import Header from "../components/Header";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { CalendarCheck, Settings2, SquareUser, User } from "lucide-react";

export default function Dashboard() {
  const chartSetting = {
    yAxis: [
      {
        label: "Missions",
      },
    ],
    width: 1100,
    height: 500,

    // sx: {
    //   [`.${axisClasses.left} .${axisClasses.label}`]: {
    //     transform: "translate(-20px, 0)",
    //   },
    // },
  };
  return (
    <>
      <Header title={"Dashboard"} />
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3 p-4">
        <div className="min-height bg-blue w-full bg-gray rounded-lg flex justify-between items-center">
          <div className="text-sm font-medium text-gray truncate">
            Total users
            <div className="mt-1 text-3xl font-semibold text-gray">12,00</div>
          </div>
          <div className="home-icon">
            <User size={35} />
          </div>
        </div>
        <div className="min-height bg-darkblue w-full bg-gray rounded-lg flex justify-between items-center">
          <div className="text-sm font-medium text-gray truncate ">
            Total Categories
            <div className="mt-1 text-3xl font-semibold text-gray ">20</div>
          </div>
          <div className="home-icon">
            <Settings2 size={35} />
          </div>
        </div>
        <div className="min-height bg-peach w-fullbg-gray rounded-lg flex justify-between items-center">
          <div className="text-sm font-medium text-gray truncate ">
            Total Missions
            <div className="mt-1 text-3xl font-semibold text-gray ">200</div>
          </div>
          <div className="home-icon">
            <CalendarCheck size={35} />
          </div>
        </div>
      </div>
      <div className="ml-4">
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: [
                "Books",
                "Movies",
                "Travel",
                "Music",
                "Sports",
                "NFL",
                "Nationwides",
                "Miami",
                "New York",
                "Anime",
                "Painting",
                "Restaurants",
                "Las vegas",
                "Ohio missions",
              ],
            },
          ]}
          series={[
            { data: [4, 3, 50, 23, 45, 45, 21, 44, 56, 12, 45, 67, 89, 78] },
            // { data: [1, 6, 3] },
            // { data: [2, 5, 6] },
          ]}
          width={500}
          height={300}
          {...chartSetting}
        />
        {/* <BarChart
          xAxis={[{ scaleType: "band", data: ["a ", "b ", "c"] }]}
          series={[
            { data: [443, 34, 51] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          width={500}
          height={300}
        /> */}
      </div>
    </>
  );
}
