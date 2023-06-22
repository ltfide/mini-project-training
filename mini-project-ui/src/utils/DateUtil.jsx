export const monthList = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];

export const monthShortList = [
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "Jun",
   "Jul",
   "Aug",
   "Sep",
   "Oct",
   "Nov",
   "Dec",
];

export const stringToDateMonth = (stringDate) => {
   const date = new Date(stringDate);

   return `${date.getDate()} ${monthShortList[date.getMonth()]}`;
};

export const stringToDateMonthYear = (stringDate) => {
   const date = new Date(stringDate);

   return `${date.getDate()} ${
      monthShortList[date.getMonth()]
   } ${date.getFullYear()}`;
};

export const stringToDateMonthYearTime = (stringDate) => {
   const date = new Date(stringDate);

   let hour = date.getHours() <= 9 ? "0" + date.getHours() : date.getHours();
   let minute =
      date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes();

   return `${date.getDate()} ${
      monthShortList[date.getMonth()]
   } ${date.getFullYear()} ${hour}:${minute}`;
};
