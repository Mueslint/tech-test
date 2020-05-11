import moment from "moment";

export const categoryBuilder = (fromTimestamp, timeRange) => {
  if (timeRange === "24h") {
    const ref = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ];
    const temp = [];
    const startHour = moment(fromTimestamp).format("HH");
    const startIndex = ref.indexOf(startHour);

    for (let i = 0; i < startIndex; i++) {
      temp.push(ref.shift());
    }

    return ref.concat(temp);
  }
  if (timeRange === "1w") {
    const ref = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const temp = [];
    const startDay = moment(fromTimestamp).format("dddd").substring(0, 3);
    const startIndex = ref.indexOf(startDay);

    for (let i = 0; i < startIndex; i++) {
      temp.push(ref.shift());
    }

    return ref.concat(temp);
  } else {
    const categories = [];
    const startWeekDay = moment(fromTimestamp).format("ddd D");
    categories.push(startWeekDay);

    for (let i = 1; i < 14; i++) {
      const nextDay = moment(fromTimestamp).add(i, "day").format("ddd D");
      categories.push(nextDay);
    }

    return categories;
  }
};
