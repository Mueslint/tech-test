import React from "react";

import { Box, Column } from "../components";
import {
  useBandwidth,
  useAudience,
  useAggregatedBandwidth,
} from "../utils/hooks";
import { BandwidthChart, AudienceChart } from "../components/Charts";

import "tui-chart/dist/tui-chart.css";

const dashboardStaticProps = {
  title: {
    "24h": "Recent activity (24h)",
    "1w": "Last week activity",
    alltime: "All-time activity",
  },
};

export const TrafficActivityDashboard = ({ user, timeRange }) => {
  const dashboardTitle = dashboardStaticProps.title[timeRange];

  const { status: bandwidthStatus, data: bandwidth } = useBandwidth(
    user.token,
    timeRange
  );

  const { status: maxBWStatus, data: maxBandwidth } = useAggregatedBandwidth(
    user.token,
    timeRange,
    "max"
  );

  const { status: audienceStatus, data: audience } = useAudience(
    user.token,
    timeRange
  );

  return (
    <Column p={20} height="100%">
      <Box pb={20} style={{ fontFamily: "oswald", color: "#0A3758" }}>
        <h1 className="title is-1">{dashboardTitle}</h1>
      </Box>

      {bandwidthStatus === "success" && maxBWStatus === "success" && (
        <BandwidthChart
          bandwidth={bandwidth}
          maxBandwidth={maxBandwidth}
          timeRange={timeRange}
        />
      )}
      {audienceStatus === "success" && (
        <AudienceChart audience={audience} timeRange={timeRange} />
      )}
    </Column>
  );
};
