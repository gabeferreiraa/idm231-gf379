import { animate } from "motion";
import { interpolate } from "flubber";
import { paths } from "./paths";

const capricorn_audio = "/audio/capricorn.mp3";
const aquarius_audio = "/audio/aquarius.mp3";
const pisces_audio = "/audio/pisces.mp3";
const aries_audio = "/audio/aries.mp3";
const taurus_audio = "/audio/taurus.mp3";
const gemini_audio = "/audio/gemini.mp3";
const cancer_audio = "/audio/cancer.mp3";
const leo_audio = "/audio/leo.mp3";
const virgo_audio = "/audio/virgo.mp3";
const libra_audio = "/audio/libra.mp3";
const scorpio_audio = "/audio/scorpio.mp3";
const sagittarius_audio = "/audio/sagittarius.mp3";

const signAudioMap = {
  capricorn: capricorn_audio,
  aquarius: aquarius_audio,
  pisces: pisces_audio,
  aries: aries_audio,
  taurus: taurus_audio,
  gemini: gemini_audio,
  cancer: cancer_audio,
  leo: leo_audio,
  virgo: virgo_audio,
  libra: libra_audio,
  scorpio: scorpio_audio,
  sagittarius: sagittarius_audio,
};

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
    console.log(data);

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

  const audioPath = signAudioMap[signMatch.sign.toLowerCase()];
  if (audioPath) {
    const audio = new Audio(audioPath);
    audio
      .play()
      .catch((error) => console.error("Error playing the audio:", error));
  }

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
