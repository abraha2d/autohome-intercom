type MAP_TYPE = {
  [prop: string]: string;
};

const ICON_MAP: MAP_TYPE = {
  day_skc: "wi-day-sunny", // Day / Clear
  day_few: "wi-day-sunny-overcast", // Day / Mostly Clear
  day_sct: "wi-day-cloudy", // Day / Partly Cloudy
  day_bkn: "wi-day-cloudy", // Day / Mostly Cloudy
  day_ovc: "wi-cloud", // Day / Cloudy
  day_tsra: "wi-storm-showers", // Day / Showers and Thunderstorms
  night_skc: "wi-night-clear", // Night / Clear
  night_few: "wi-night-alt-partly-cloudy", // Night / Mostly Clear
  night_sct: "wi-night-alt-cloudy", // Night / Partly Cloudy
  night_bkn: "wi-night-alt-cloudy", // Night / Mostly Cloudy
  night_ovc: "wi-cloud", // Night / Cloudy
  night_tsra: "wi-storm-showers", // Day / Showers and Thunderstorms
  rain: "" // Rain, check presentWeather for conditions/intensities
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
  const url_split = url.split("/").slice(5);
  url_split[1] = url_split[1].split("?")[0].split(",")[0];
  return ICON_MAP[`${url_split[0]}_${url_split[1]}`];
};

export const getShortDay = (day: string) => {
  return DAY_MAP[day] || day;
};
