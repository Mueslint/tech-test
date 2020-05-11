import { formatBytes } from "./formatBytes";
import { getTimeRange } from "./getTimeRange";
import { categoryBuilder } from "./rangeRelativeInfo";

import moment from "moment";

describe("formatBytes", () => {
  it("should convert bytes to GBytes", () => {
    expect(formatBytes(0)).toEqual(0);
    expect(formatBytes(12123131323)).toEqual(11.29);
  });
});

describe("getTimeRange", () => {
  it("should return a 24 hours range", () => {
    const now = Date.now();
    const range = getTimeRange("24h");

    expect(moment(range).add(1, "day").valueOf()).toEqual(now);
  });
  it("should return a 1 week range", () => {
    const now = Date.now();
    const range = getTimeRange("1w");

    expect(moment(range).add(1, "week").valueOf()).toEqual(now);
  });
  it("should return a 2 week range (all time)", () => {
    const now = Date.now();
    const range = getTimeRange("alltime");

    expect(moment(range).add(2, "week").valueOf()).toEqual(now);
  });
});

describe("categoryBuilder", () => {
  it("should return a full 24h array", () => {
    const lateSundayNight = 1589142896701;
    const categories = categoryBuilder(lateSundayNight, "24h");

    expect(categories.length).toEqual(24);
    expect(categories[0]).toEqual("22");
    expect(categories[23]).toEqual("21");
  });
  it("should return a full week array", () => {
    const lateSundayNight = 1589142896701;
    const categories = categoryBuilder(lateSundayNight, "1w");

    expect(categories.length).toEqual(7);
    expect(categories).toEqual([
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ]);
  });
  it("should return a 2 full weeks array", () => {
    const lateSundayNight = 1589142896701;
    const categories = categoryBuilder(lateSundayNight, "alltime");

    expect(categories.length).toEqual(14);
    expect(categories[0]).toEqual("Sun 10");
    expect(categories[13]).toEqual("Sat 23");
  });
});
