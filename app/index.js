/*
Includes: Time, Wheel, Water Bottle, Food Bowl 
Feature 1: Water drank based on battery level
Feature 2: Food eaten based on calories
Feature 3: Treat count based on steps
Feature 4: Combine above to get happiness
Feature 5: Impacts changing hamster/background color
*/

// Imports
import clock from "clock";
import document from "document";
import display from "display";
import { today } from "user-activity";
import { battery } from "power";
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Get elements
const time = document.getElementById("time");
const steps = document.getElementById("steps");
const hamster = document.getElementById("hamster");
const happiness = document.getElementById("happiness");
const wheelInner = document.getElementById("wheelInner");
const hamsterAnim = document.getElementById("hamsterAnim");
const bottleInside = document.getElementById("bottleInside");
const batteryLevel = document.getElementById("batteryLevel");
const animateTransform = document.getElementById("transform");
const backgroundColor = document.getElementById("backgroundColor");
const [pellet1, pellet2, pellet3] = [document.getElementById("pellet1"), document.getElementById("pellet2"), document.getElementById("pellet3")];

// Initialize the happiness score variable
var score = 0;

// Set the time
clock.granularity = "minutes";
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12;
    hours = util.zeroPad(hours);
  } else {
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  time.text = `${hours}:${mins}`;
}

// Start the hamster sprite animation
hamsterAnim.animate("enable");

// CHANGE COLORS ON CLICK
hamster.addEventListener("click", (evt) => {
  if (score === 69) {
    // Normal, darker, and rainbow
    if (hamster.href === "hamster/small/h1-frame_1.png" || hamster.href === "hamster/small/h1-frame_2.png" || hamster.href === "hamster/small/h1-frame_3.png" || hamster.href === "hamster/small/h1-frame_4.png") {
      hamster.href = "hamster/small/h2-frame_1.png";
    } else if (hamster.href === "hamster/small/h2-frame_1.png" || hamster.href === "hamster/small/h2-frame_2.png" || hamster.href === "hamster/small/h2-frame_3.png" || hamster.href === "hamster/small/h2-frame_4.png") {
      hamster.href = "hamster/small/h4-frame_1.png";
    } else {
      hamster.href = "hamster/small/h1-frame_1.png";
    }
  } else if (score > 70) {
    // Normal, darker, and mixed
    if (hamster.href === "hamster/small/h1-frame_1.png" || hamster.href === "hamster/small/h1-frame_2.png" || hamster.href === "hamster/small/h1-frame_3.png" || hamster.href === "hamster/small/h1-frame_4.png") {
      hamster.href = "hamster/small/h2-frame_1.png";
    } else if (hamster.href === "hamster/small/h2-frame_1.png" || hamster.href === "hamster/small/h2-frame_2.png" || hamster.href === "hamster/small/h2-frame_3.png" || hamster.href === "hamster/small/h2-frame_4.png") {
      hamster.href = "hamster/small/h3-frame_1.png";
    } else {
      hamster.href = "hamster/small/h1-frame_1.png";
    }
  } else if (score > 50) {
    // Only normal and darker
    if (hamster.href === "hamster/small/h1-frame_1.png" || hamster.href === "hamster/small/h1-frame_2.png" || hamster.href === "hamster/small/h1-frame_3.png" || hamster.href === "hamster/small/h1-frame_4.png") {
      hamster.href = "hamster/small/h2-frame_1.png";
    } else {
      hamster.href = "hamster/small/h1-frame_1.png";
    }
  }  
})

backgroundColor.addEventListener("click", (evt) => {
  if (score > 90) {
    if (backgroundColor.style.fill === "#000000") {
      backgroundColor.style.fill = "#240123";
      bottleInside.style.fill = "#240123";
      wheelInner.style.fill = "#240123";
    } else {
      backgroundColor.style.fill = "#000000";
      bottleInside.style.fill = "#000000";
      wheelInner.style.fill = "#000000";
    }
  }
})

// Run the functions once upon app launch
loopedFunction()
updateHappinessText()

// Then loop updates according to a 1 second throttler
setInterval(loopedFunction, 1000);

// And the happiness score every minute
setInterval(updateHappinessText, 60000);

function loopedFunction() {
  // FOOD PELLET CALORIES

  // Get the user calories
  var calories = (today.adjusted.calories || 0);

  // Dynamically adjust the opacity and visibility based on calories
  if (calories > 2100) {    
    // 2101 Cals+ (Three pellets hidden)      
    pellet1.style.display = "none";
    pellet2.style.display = "none";                   
    pellet3.style.display = "none";
  } else if (calories > 1400) {
    // 1401-2100 Cals (Two pellets hidden)
    pellet1.style.display = "none";
    pellet2.style.display = "none";                   
    pellet3.style.opacity = (2100 - calories) / 700;
  } else if (calories > 700) {
    // 701-1400 Cals (One pellet hidden)
    pellet1.style.display = "none";
    pellet2.style.opacity = (1400 - calories) / 700;   
    pellet3.style.display = "inline";
  } else {
    // 0-700 Cals (Zero pellets hidden)
    pellet1.style.opacity = (700 - calories) / 700;
    pellet2.style.display = "inline";                 
    pellet3.style.display = "inline";
  }

  // WATER BOTTLE BATTERY LEVEL

  // Get charge level and convert to percentage
  var chargeLevel = battery.chargeLevel;
  var chargePercentage = chargeLevel / 100;

  // Define colors
  var lightBlue = [62, 192, 247];     // RGB values for light blue
  var seafoamGreen = [51, 203, 205];  // RGB values for seafoam green

  // Interpolate between light blue and seafoam green based on charge level
  var interpolatedColor = [
    Math.round(seafoamGreen[0] + (lightBlue[0] - seafoamGreen[0]) * chargePercentage),
    Math.round(seafoamGreen[1] + (lightBlue[1] - seafoamGreen[1]) * chargePercentage),
    Math.round(seafoamGreen[2] + (lightBlue[2] - seafoamGreen[2]) * chargePercentage)
  ];

  // Convert interpolated color to hexadecimal format
  var interpolatedHexColor = '#' + interpolatedColor.map(function (c) {
    return ('0' + c.toString(16)).slice(-2);
  }).join('');

  // Set battery level color
  batteryLevel.style.fill = interpolatedHexColor;

  // Set its position corresponding to the actual level
  batteryLevel.height = chargeLevel * 1.36
  batteryLevel.y = 12 + (136 - batteryLevel.height)

  // TREAT STEP COUNT

  // Get the user step and remove sig-figs
  var stepCount = (today.adjusted.steps || 0);
  steps.text = `Treats: ${Math.floor(stepCount / 1000)}`;
}

// HAPPINESS SCORE
function calculateHappinessScore() {
  // Get device and user info
  var stepCount = (today.adjusted.steps || 0);
  var chargeLevel = battery.chargeLevel;
  var calories = (today.adjusted.calories || 0);

  // Define base scores for each metric
  var baseStepScore = stepCount * 0.005;      // slight increase with steps
  var baseBatteryScore = chargeLevel * 0.25;  // moderate impact from battery level
  var baseCaloriesScore = calories * 0.0125;  // some impact from calories

  // Add randomness within a reasonable range
  var randomStepScore = Math.min(50, baseStepScore) + (Math.random() - 0.5) * 5;
  var randomBatteryScore = Math.min(25, baseBatteryScore) + (Math.random() - 0.5) * 5;
  var randomCaloriesScore = Math.min(25, baseCaloriesScore) + (Math.random() - 0.5) * 5;

  // console.log(baseStepScore, baseBatteryScore, baseCaloriesScore)
  // console.log(randomStepScore, randomBatteryScore, randomCaloriesScore)

  // Combine base scores with randomness
  var happinessScore = randomStepScore + randomBatteryScore + randomCaloriesScore;

  // Ensure happiness score stays within range of 1 to 100
  happinessScore = Math.max(0, Math.min(100, happinessScore));

  return Math.round(happinessScore);
}

// Update the duration of the animation based on happiness score
function updateAnimationDuration(happinessScore) {
  // Map the happiness score to a duration range
  var minDuration = 1.5;
  var maxDuration = 3;
  var duration = (maxDuration - minDuration) * (1 - happinessScore / 100) + minDuration;

  // Set the duration of the animation
  animateTransform.dur = duration;
}

// Update happiness text
function updateHappinessText() {
  score = calculateHappinessScore();
  updateAnimationDuration(score);
  happiness.text = `Happiness: ${score}`;
}