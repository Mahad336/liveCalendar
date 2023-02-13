const StringtoDatetime = (time1, time2) => {
  const time = [];
  time1 = time1.substring(0, time1.indexOf(" "));
  time2 = time2.substring(0, time2.indexOf(" "));
  time1.includes(":30")
    ? time.push(parseFloat(time1.replace(":30", ".5")))
    : time.push(parseFloat(time1));
  time2.includes(":30")
    ? time.push(parseFloat(time2.replace(":30", ".5")))
    : time.push(parseFloat(time2));
  return time;
};

const datetimetoString = (time) => {
  const convertStartTime = time.toString();
  if (convertStartTime.includes(".")) {
    time < 12
      ? (time = `${convertStartTime.replace(".5", ":30")} AM`)
      : (time = `${convertStartTime.replace(".5", ":30")} PM`);
  } else time < 12 ? (time = `${time}:00 AM`) : (time = `${time}:00 PM`);

  return time;
};

// const getStartEndTime = (event) => {
//   let startTime = new Date(event?.startAt);
//   let endTime = new Date(event?.endAt);
//   if (startTime.getMinutes() == "30") {
//     startTime = startTime.getHours() + ".5";
//   } else {
//     startTime = startTime.getHours().toString();
//   }
//   if (endTime.getMinutes() == "30") {
//     endTime = endTime.getHours() + ".5";
//   } else {
//     endTime = endTime.getHours().toString();
//   }

//   return { startTime, endTime };
// };
const getHourFormat = (time) =>
  time.getMinutes() === 30
    ? `${time.getHours()}.5`
    : time.getHours().toString();

const getStartEndTime = (event) => {
  const startTime = getHourFormat(new Date(event?.startAt));
  const endTime = getHourFormat(new Date(event?.endAt));

  return { startTime, endTime };
};

export { StringtoDatetime, datetimetoString, getStartEndTime };
