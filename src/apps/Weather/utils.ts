type MAP_TYPE = {
  [prop: string]: string;
};

// TODO: Update icons using https://erikflowers.github.io/weather-icons/
const ICON_MAP: MAP_TYPE = {
  day_skc: "wi-day-sunny", // Day / Clear
  day_few: "wi-day-sunny", // Day / Mostly Clear
  day_sct: "wi-day-cloudy", // Day / Partly Cloudy
  day_bkn: "wi-day-cloudy", // Day / Mostly Cloudy
  day_ovc: "wi-cloud", // Day / Cloudy
  day_tsra: "wi-storm-showers", // Day / Showers and Thunderstorms
  day_tsra_sct: "wi-day-storm-showers",
  day_tsra_hi: "wi-day-storm-showers",
  day_rain: "wi-showers",
  night_skc: "wi-night-clear", // Night / Clear
  night_few: "wi-night-clear", // Night / Mostly Clear
  night_sct: "wi-night-alt-cloudy", // Night / Partly Cloudy
  night_bkn: "wi-night-alt-cloudy", // Night / Mostly Cloudy
  night_ovc: "wi-cloud", // Night / Cloudy
  night_tsra: "wi-storm-showers", // Night / Showers and Thunderstorms
  night_tsra_sct: "wi-night-storm-showers",
  night_tsra_hi: "wi-night-storm-showers",
  night_rain: "wi-showers"
};

const DAY_MAP: MAP_TYPE = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tues",
  Wednesday: "Wed",
  Thursday: "Thur",
  Friday: "Fri",
  Saturday: "Sat"
};

export const getIcon = (url: string) => {
  console.debug("[weather] Icon URL:", url);
  const url_split = url.split("/").slice(5);
  url_split[1] = url_split[1].split("?")[0].split(",")[0];
  return (
    ICON_MAP[`${url_split[0]}_${url_split[1]}`] ||
    console.error("[weather] No icon for", url_split)
  );
};

export const getShortDay = (day: string) => {
  return DAY_MAP[day] || day;
};
