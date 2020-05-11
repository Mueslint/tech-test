import request from "../request";
import { getTimeRange } from "../getTimeRange";

export const fetchAudience = async (token, timeRange) => {
  const from = getTimeRange(timeRange);
  const to = Date.now();

  return request(
    {
      endpoint: "audience",
      body: { from, to },
      method: "POST",
    },
    token
  );
};
