import { animate } from "motion";
import { interpolate } from "flubber";
import { paths } from "./paths";
import data from "./data.json";

document.addEventListener("DOMContentLoaded", function () {
  const birthdayInput = document.querySelector("#birthday-value");

  birthdayInput.addEventListener("change", function () {
    fetchData(this.valueAsDate);
  });
});

async function fetchData(birthday) {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();

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

    let birthMonth = birthday.getMonth();
    let birthDay = birthday.getDate();

    let signMatch = data.find((sign) => {
      let startDateParts = sign.start_date.split(" ");
      let endDateParts = sign.end_date.split(" ");
      let startMonth = months.indexOf(startDateParts[0]);
      let endMonth = months.indexOf(endDateParts[0]);
      let startDay = parseInt(startDateParts[1]);
      let endDay = parseInt(endDateParts[1]);

      // Check if the birthdate falls within the sign's date range
      if (
        (birthMonth === startMonth && birthDay >= startDay) ||
        (birthMonth === endMonth && birthDay <= endDay) ||
        (birthMonth === startMonth - 1 &&
          birthDay >= startDay &&
          birthDay <= 31) || // Transition from December to January
        (birthMonth === endMonth && birthDay >= 1 && birthDay <= endDay) // Transition from December to January
      ) {
        return true;
      }
      return false;
    });

    if (signMatch) {
      const description = signMatch.desc;
      togglePath(signMatch, description); // Pass the description to the togglePath function
    }
  } catch (error) {
    console.log(error);
  }
}

function togglePath(signMatch, description) {
  const path = document.querySelector("path");
  const transition = { duration: 0.5 };

  if (!signMatch) return; // Ensure signMatch exists

  let signDesc = document.querySelector("#target-text-1");

  let currentPath;

  switch (signMatch.sign.toLowerCase()) {
    case "capricorn":
      currentPath = paths.capricorn;
      break;
    case "scorpio":
      currentPath = paths.scorpio;
      break;
    case "virgo":
      currentPath = paths.virgo;
      break;
    case "pisces":
      currentPath = paths.pisces;
      break;
    case "gemini":
      currentPath = paths.gemini;
      break;
    case "libra":
      currentPath = paths.libra;
      break;
    case "aquarius":
      currentPath = paths.aquarius;
      break;
    case "leo":
      currentPath = paths.leo;
      break;
    case "taurus":
      currentPath = paths.taurus;
      break;
    case "sagittarius":
      currentPath = paths.sagittarius;
      break;
    case "cancer":
      currentPath = paths.cancer;
      break;
    case "aries":
      currentPath = paths.aries;
      break;
    default:
      currentPath = paths.aries;
  }

  // Set the description text content
  signDesc.textContent = description;

  console.log(signMatch.sign);

  path.setAttribute("fill", currentPath.color);
  path.setAttribute("d", currentPath.d);

  const mixPaths = interpolate(path.getAttribute("d"), currentPath.d, {
    maxSegmentLength: 1,
  });

  animate(path, { fill: currentPath.color }, transition);
  animate((progress) => path.setAttribute("d", mixPaths(progress)), transition);
}

const helpButton = document.querySelector("#help");
const helpScreen = document.querySelector("#help-screen");

helpButton.addEventListener("click", () => {
  helpScreen.classList.toggle("hidden");
});
helpScreen.addEventListener("click", () => {
  helpScreen.classList.toggle("hidden");
});
