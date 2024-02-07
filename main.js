import { animate } from "motion";
import { interpolate } from "flubber";
import { paths } from "./paths";

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

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const zodiacSigns = [
  "Aquarius",
  "Pisces",
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
];

const path = document.querySelector("path");

let currentPath = paths.taurus;

path.setAttribute("fill", currentPath.color);
path.setAttribute("d", currentPath.d);

const transition = { duration: 0.35 };

function togglePath() {
  currentPath = currentPath === paths.taurus ? paths.leo : paths.taurus;

  const mixPaths = interpolate(path.getAttribute("d"), currentPath.d, {
    maxSegmentLength: 1,
  });

  animate(path, { fill: currentPath.color }, transition);
  animate((progress) => path.setAttribute("d", mixPaths(progress)), transition);
}
setTimeout(togglePath, 1000);
path.addEventListener("click", togglePath);

fetchData();

async function fetchData() {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    let signMatcher = data.filter((e) => e.name == `${zodiac}`);
    console.log(signMatcher);
  } catch (error) {
    console.log(error);
  }
}

let birthdayInput = document.querySelector("#zodiac-result").valueAsDate;
console.log(birthdayInput);
let month = months[birthdayInput.getMonth()];
let day = birthdayInput.getDate();

// console.log("Month:", month);
// console.log("Day:", day);

let zodiacValue = month + " " + day;
console.log(zodiacValue);
