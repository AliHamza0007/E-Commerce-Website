import React, { useState } from "react";
import Chart from "react-apexcharts";

const Donut = () => {
  const [state] = useState({
    chartOptions: {
      labels: ["Orders", "Products", "Users", "Category", "Pending"],
    },
    series: [44, 55, 41, 17, 15],
  });

  return (
    <div className="donut img-responsive img-fluid">
      <Chart
        options={state.chartOptions}
        series={state.series}
        type="donut"
        width="100%"
      />
    </div>
  );
};

export default Donut;
