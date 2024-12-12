export function dateTransformat(date) {
  const newDate = new Date(date);

  const formattedDate = new Intl.DateTimeFormat("ko-kr", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const newFormattedDate = formattedDate.format(newDate);

  return newFormattedDate;
}
