import React from "react";
import TuiChart from "tui-chart";
import "tui-chart/dist/tui-chart.css";
import { ColumnChart } from "@toast-ui/react-chart";

import { Column } from "../Flex";
import { comboChartTheme, columnTheme } from "../theme";
import { formatBytes } from "../../utils/formatBytes";

const trafficOptions = {
  chart: {
    width: 1200,
    height: 300,
    title: "CDN vs P2P traffic",
  },
  yAxis: {
    title: "Traffic (in Bytes)",
  },
  xAxis: {
    title: "Content name (x/y/track-z)",
  },
  legend: {
    align: "top",
  },
};
const viewersOptions = {
  chart: {
    width: 1200,
    height: 280,
    title: "Viewers per content",
  },
  yAxis: {
    title: "# of viewers",
  },
  xAxis: {
    title: "Content name",
  },
  legend: {
    align: "top",
  },
};

export const StreamsChart = ({ streams, user }) => {
  // const categories = [[...Array(streams.length).keys()]];
  const categories = streams.map(({ manifest }, index) => {
    if (user.identifiant === "swagtv") {
      const regexp = /\/(.*)\//gm;
      const matched = manifest.match(regexp)[0].slice(1, -1);
      return matched;
    }
    if (user.identifiant === "urtoob") {
      const contentid = manifest.match(/^.{5}/gm)[0];
      const trackid = manifest.match(/.{3}$/gm)[0];
      return contentid + "-" + trackid;
    }
    return `content-${index}`;
  });

  TuiChart.registerTheme("streams", comboChartTheme);
  TuiChart.registerTheme("viewers", columnTheme);

  trafficOptions.theme = "streams";
  viewersOptions.theme = "viewers";

  const getGraphData = (streamInfoArray, selectedData) => {
    const cdnData = [];
    const p2pData = [];
    const totalData = [];
    const maxViewersData = [];
    const avgViewersData = [];

    streamInfoArray.forEach(({ cdn, p2p, _, max_viewers, average_viewers }) => {
      cdnData.push(formatBytes(cdn));
      p2pData.push(formatBytes(p2p));
      totalData.push(formatBytes(cdn + p2p));
      maxViewersData.push(max_viewers);
      avgViewersData.push(average_viewers);
    });

    const trafficSeries = [
      {
        name: "P2P traffic (GB)",
        data: p2pData,
      },
      {
        name: "CDN traffic (GB)",
        data: cdnData,
      },
      {
        name: "Total (GB)",
        data: totalData,
      },
    ];

    const viewersSeries = [
      {
        name: "Maximum # of viewers",
        data: maxViewersData,
      },
      {
        name: "Average # of viewers",
        data: avgViewersData,
      },
    ];

    if (selectedData === "viewers")
      return { categories, series: viewersSeries };
    if (selectedData === "traffic")
      return { categories, series: trafficSeries };
  };

  return (
    <Column>
      <ColumnChart
        data={getGraphData(streams, "traffic")}
        options={trafficOptions}
      />
      <ColumnChart
        data={getGraphData(streams, "viewers")}
        options={viewersOptions}
      />
    </Column>
  );
};
