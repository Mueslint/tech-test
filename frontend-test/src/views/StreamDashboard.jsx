import React from "react";
import "tui-chart/dist/tui-chart.css";

import { Box, Column } from "../components";
import { useStreams } from "../utils/hooks";
import { StreamsChart } from "../components/Charts";

export const StreamDashboard = ({ user }) => {
  const { status: streamsStatus, data: streams } = useStreams(user.token);

  return (
    <Column p={20} height="100%">
      <Box pb={20} style={{ fontFamily: "oswald", color: "#0A3758" }}>
        <h1 className="title is-1">Main dashboard</h1>
      </Box>

      {streamsStatus === "success" && (
        <StreamsChart streams={streams} user={user} />
      )}
    </Column>
  );
};
