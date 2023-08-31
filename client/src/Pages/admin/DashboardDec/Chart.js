import React, { useState } from "react";
import Chart from "react-apexcharts";

const ChartData = () => {
  const [state] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029],
      },
    },
    series: [
      {
        name: "orders",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  return (
    <div className="mixed-chart  ">
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width="100%"
      />
    </div>
  );
};

export default ChartData;
