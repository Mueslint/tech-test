import request from "../request";

export const fetchStreams = async (token) =>
  request(
    {
      endpoint: "streams",
      body: {},
      method: "POST",
    },
    token
  );
