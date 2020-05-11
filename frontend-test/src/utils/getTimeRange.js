import moment from "moment";

export const getTimeRange = (timeRange) => {
  const now = Date.now();

  const last24Hours = moment(now).subtract(1, "day").valueOf();
  const lastWeek = moment(now).subtract(1, "week").valueOf();
  const allTime = moment(now).subtract(2, "weeks").valueOf();

  return timeRange === "24h"
    ? last24Hours
    : timeRange === "1w"
    ? lastWeek
    : allTime;
};
