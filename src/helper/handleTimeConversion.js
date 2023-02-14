const StringtoDatetime = (startTime, endTime) => {
  const startAt = new Date();
  const endAt = new Date();
  if (startTime.includes(".")) {
    startAt.setHours(
      startTime.substring(0, startTime.indexOf(".")),
      "30",
      "00"
    );
  } else {
    startAt.setHours(startTime, "00", "00");
  }
  if (endTime.includes(".")) {
    endAt.setHours(endTime.substring(0, endTime.indexOf(".")), "30", "00");
  } else {
    endAt.setHours(endTime, "00", "00");
  }
  return { startAt, endAt };
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
