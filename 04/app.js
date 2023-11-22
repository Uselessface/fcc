const months = [
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
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const deadline = document.querySelector('.deadline');
const giveaway = document.querySelector(".giveaway");
const countItems = document.querySelectorAll(".deadline-format h4");

const futureDate = new Date(2023,10,24,8,0,0);
const futureYear = futureDate.getFullYear();
const futureMonth = futureDate.getMonth();
const futureDay = futureDate.getUTCDay();
const futureHours = futureDate.getHours();
const futureMinutes = futureDate.getMinutes();
const friendlyMonth = months[futureMonth]
const friendlyDay = weekdays[futureDay];

giveaway.textContent = `Giveaway ends on ${friendlyDay}, ${futureDay} ${friendlyMonth} ${futureYear}, ${format(futureHours)}:${format(futureMinutes)} pm`

const deadlineTime = futureDate.getTime();


function getRemainingTime() {
  const now = new Date().getTime();

  let remainingTime = deadlineTime - now;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let remainingDays = Math.floor(remainingTime / oneDay);
  let remainingHours = Math.floor((remainingTime % oneDay) / oneHour);
  let remainingMinutes = Math.floor((remainingTime % oneHour) / oneMinute);
  let remainingSeconds = Math.floor((remainingTime % oneMinute) / 1000);

  const values = [remainingDays,remainingHours,remainingMinutes,remainingSeconds];
  countItems.forEach((item,i) => {
    item.innerHTML = format(values[i]);
  });

  if (remainingTime < 0 ) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class = "expired">Sorry, poshel nahui</h4>`
  }

  console.log('hello')
}
function format(item){
  if(item < 10){
    return item = `0${item}`
  }
  return item
}

let countdown = setInterval(getRemainingTime,1000);

getRemainingTime();
