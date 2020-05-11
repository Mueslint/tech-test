import { useQuery } from "react-query";

import {
  fetchBandwidth,
  fetchAudience,
  fetchStreams,
  fetchNotifications,
} from "../fetchers";

export const useBandwidth = (token, timeRange) => {
  return useQuery(
    ["bandwidth", token, timeRange],
    async (_, token) => await fetchBandwidth(token, timeRange),
    { retry: false }
  );
};

export const useAggregatedBandwidth = (token, timeRange, aggregate) => {
  return useQuery(
    ["aggregated-bandwidth", token, timeRange, aggregate],
    async (_, token) => await fetchBandwidth(token, timeRange, aggregate),
    { retry: false }
  );
};

export const useAudience = (token, timeRange) => {
  return useQuery(
    ["audience", token, timeRange],
    async (_, token) => await fetchAudience(token, timeRange),
    { retry: false }
  );
};

export const useStreams = (token) => {
  return useQuery(
    ["streams", token],
    async (_, token) => await fetchStreams(token),
    { retry: false }
  );
};

export const useNotifications = (token) => {
  return useQuery(
    ["notifications", token],
    async (_, token) => await fetchNotifications(token),
    { retry: false }
  );
};
