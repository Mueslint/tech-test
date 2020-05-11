import React from "react";
import TuiChart from "tui-chart";
import "tui-chart/dist/tui-chart.css";
import { ComboChart } from "@toast-ui/react-chart";

import { comboChartTheme } from "../theme";
import { formatBytes } from "../../utils/formatBytes";
import { categoryBuilder } from "../../utils/rangeRelativeInfo";

const options = {
  chart: {
    width: 1200,
    height: 300,
    title: "Bandwidth",
  },
  yAxis: {
    title: "Bandwidth (in Gbps)",
  },
  xAxis: {
    title: undefined,
  },
  legend: {
    align: "top",
  },
};

export const BandwidthChart = ({ bandwidth, maxBandwidth, timeRange }) => {
  TuiChart.registerTheme("bandwidth", comboChartTheme);
  options.theme = "bandwidth";
  options.xAxis.title = timeRange === "24h" ? "Hours" : "Days";

  const getGraphData = () => {
    const { cdn, p2p } = bandwidth;
    const { cdn: maxCDN, p2p: maxP2P } = maxBandwidth;

    const line = [
      {
        name: "Max P2P Bandwidth",
        data: [formatBytes(maxP2P), formatBytes(maxP2P)],
      },
      {
        name: "Max CDN Bandwidth",
        data: [formatBytes(maxCDN), formatBytes(maxCDN)],
      },
    ];

    const area = [];
    const p2pBW = p2p.map((datapoint) => formatBytes(datapoint[1]));

    const cdnBW = cdn.map((datapoint) => formatBytes(datapoint[1]));
    if (maxCDN > maxP2P) {
      area.push({ name: "CDN bandwidth", data: cdnBW });
      area.push({ name: "P2P bandwidth", data: p2pBW });
    } else {
      area.push({ name: "P2P bandwidth", data: p2pBW });
      area.push({ name: "CDN bandwidth", data: cdnBW });
    }

    const categories = categoryBuilder(cdn[0][0], timeRange);

    return {
      categories,
      series: {
        area,
        line,
      },
    };
  };

  return <ComboChart data={getGraphData()} options={options} />;
};
