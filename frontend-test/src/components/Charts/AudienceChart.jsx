import React from "react";
import TuiChart from "tui-chart";
import "tui-chart/dist/tui-chart.css";
import { LineChart } from "@toast-ui/react-chart";

import { audienceTheme } from "../theme";
import { categoryBuilder } from "../../utils/rangeRelativeInfo";

const options = {
  chart: {
    width: 1200,
    height: 300,
    title: "Audience",
  },
  yAxis: {
    title: "Number of viewers",
  },
  xAxis: {
    title: undefined,
  },
  legend: {
    align: "top",
  },
};

export const AudienceChart = ({ audience, timeRange }) => {
  const categories = categoryBuilder(audience.audience[0][0], timeRange);

  TuiChart.registerTheme("audience", audienceTheme);
  options.theme = "audience";
  options.xAxis.title = timeRange === "24h" ? "Hours" : "Days";

  const getGraphData = ({ audience }) => {
    const series = [
      {
        name: "viewers",
        data: audience.map((datapoint) => datapoint[1]),
      },
    ];
    return { categories, series };
  };

  return <LineChart data={getGraphData(audience)} options={options} />;
};
