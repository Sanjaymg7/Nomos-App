export const getTime = (time) => {
  const date = new Date(time);
  const hour = date.getHours();
  const minute = date.getMinutes();
  if (hour < 12) {
    return `${hour}:${minute < 10 ? "0" + minute : minute} am`;
  } else if (hour == 12) {
    return `${hour}:${minute < 10 ? "0" + minute : minute} pm`;
  } else {
    return `${hour - 12}:${minute < 10 ? "0" + minute : minute} pm`;
  }
};

export const getDate = (time) => {
  const inputTime = new Date(time);
  const systemTime = new Date();
  const inputDate = inputTime.getDate();
  const inputMonth = inputTime.getMonth();
  const inputYear = inputTime.getFullYear();
  const systemDate = systemTime.getDate();
  const systemMonth = systemTime.getMonth();
  const systemYear = systemTime.getFullYear();

  if (
    inputDate === systemDate &&
    inputMonth === systemMonth &&
    inputYear === systemYear
  ) {
    return "";
  } else if (
    inputDate === +systemDate - 1 &&
    inputMonth === systemMonth &&
    inputYear === systemYear
  ) {
    return "Yesterday";
  } else {
    return `${inputDate}-${inputMonth + 1}-${inputYear.toString().slice(2)}`;
  }
};

export const getDateTime = (time) => {
  return getDate(time) + " " + getTime(time);
};
