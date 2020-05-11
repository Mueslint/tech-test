import request from "../request";
import { getTimeRange } from "../getTimeRange";

export const fetchBandwidth = async (token, timeRange, aggregate) => {
  const now = Date.now();
  const from = getTimeRange(timeRange);

  const body = { from, to: now };
  return request(
    {
      endpoint: "bandwidth",
      body: aggregate ? { ...body, aggregate } : body,
      method: "POST",
    },
    token
  );
};
