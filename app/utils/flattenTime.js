/**
 * Sets a Date time(hours, minutes...) to 0
 * @param  {date} dateTime
 * @return {date}
 */
export default function flattenTime(dateTime) {
  let flattenedTime = new Date(dateTime);
  flattenedTime.setHours(0);
  flattenedTime.setMinutes(0);
  flattenedTime.setSeconds(0);
  flattenedTime.setMilliseconds(0);
  return flattenedTime;
}
