import request from "../request";

export const fetchNotifications = async (token) =>
  request(
    {
      endpoint: "notifications",
      body: {},
      method: "POST",
    },
    token
  );
