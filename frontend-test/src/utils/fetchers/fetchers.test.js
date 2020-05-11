import nock from "nock";

import {
  fetchBandwidth,
  fetchAudience,
  fetchCurrentUser,
  fetchStreams,
  fetchNotifications,
} from ".";

describe("fetchers should perform successful backend calls ", () => {
  it("to /auth", async () => {
    nock("http://localhost:3001")
      .post("/auth", (body) => body.identifiant && body.password)
      .reply(
        200,
        { session_token: 1234 },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        }
      );

    const body = { identifiant: "YoloTV", password: "secret" };
    const response = await fetchCurrentUser(body, jest.fn());
    expect(response);
  });
  it("to /bandwidth", async () => {
    nock("http://localhost:3001")
      .post("/bandwidth", (body) => body.session_token && body.from && body.to)
      .reply(
        200,
        { cdn: [], p2p: [] },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        }
      );

    const response = await fetchBandwidth(1234, 1509490800000, null);
    expect(response);
  });

  it("to /audience", async () => {
    nock("http://localhost:3001")
      .post("/audience", (body) => body.session_token && body.from && body.to)
      .reply(
        200,
        {
          audience: [
            [12032019, 434],
            [14032019, 421],
          ],
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        }
      );

    const response = await fetchAudience(1234, 1509490800000);
    expect(response);
  });
  it("to /streams", async () => {
    nock("http://localhost:3001")
      .post("/streams", (body) => body.session_token)
      .reply(200, [{ cdn: 12, p2p: 11, max_viewers: 3, average_viewers: 2 }], {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const response = await fetchStreams(1234);
    expect(response);
  });
  it("to /notifications", async () => {
    nock("http://localhost:3001")
      .post("/notifications", (body) => body.session_token)
      .reply(
        200,
        {},
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        }
      );

    const response = await fetchNotifications(1234);
    expect(response);
  });
});
