const addClass = (height, startTime) => {
  height = parseInt(height);
  if (height <= 50) {
    if (startTime < Math.ceil(startTime)) {
      return "event-half-bot";
    } else {
      return "event-half-bot";
    }
  } else {
    return "event";
  }
};

export { addClass };
