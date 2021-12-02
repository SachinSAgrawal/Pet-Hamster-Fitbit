//Incldes: Time, Wheel, Water Bottle, Food Bowl 
//Feature 1: Water Drank Based on Battery Level
//Feature 2: Food Eaten Based on Calories
//Feature 3: Level Based on Steps
//Feature 4: Ability to Change Hamster Color

//Imports
import clock from "clock";
import document from "document";
import display from "display";
import { today } from "user-activity";
import { preferences } from "user-settings";
import { userActivity } from "user-activity";
import * as document from "document";
import * as util from "../common/utils";
import { battery } from "power";

//Time
clock.granularity = "minutes";
const myLabel = document.getElementById("myLabel");
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
  myLabel.text = `${hours}:${mins}`;
} 

//Hamster Sprite
const myAnimation = document.getElementById("myAnimation");
myAnimation.animate("enable");

//Change Hamster Color
const hamster = document.getElementById("hamster");
hamster.addEventListener("click", (evt) => {
  if (hamster.href === "h1-frame_1.png" || hamster.href === "h1-frame_2.png" || hamster.href === "h1-frame_3.png" || hamster.href === "h1-frame_4.png") {
  hamster.href = "h2-frame_1.png";    
  } else {
  hamster.href = "h1-frame_1.png";    
  }  
})

//Level Based on Steps
let steps = (today.adjusted.steps || 0);
const lvlsteps = document.getElementById("lvlsteps");
lvlsteps.text = `Level: ${Math.floor(steps/1000)}`;

//Food Pellet Eaten Based on Calories
let calories = (today.adjusted.calories || 0);
const pellet1 = document.getElementById("pellet1");
const pellet2 = document.getElementById("pellet2");
const pellet3 = document.getElementById("pellet3");
if (calories > 2100) {
pellet1.style.display = "none";
pellet2.style.display = "none"; // 2101 Cals+ (Three pellets)
pellet3.style.display = "none"; 
} else if (calories > 1400) {
pellet1.style.display = "none";
pellet2.style.display = "none"; // 1401-2100 Cals (Two pellets)
pellet3.style.display = "inline"; 
} else if (calories > 700) {
pellet1.style.display = "none";
pellet2.style.display = "inline"; // 701-1400 Cals (One pellet)
pellet3.style.display = "inline"; 
} else {
pellet1.style.display = "inline";
pellet2.style.display = "inline"; // 0-700 Cals (Zero pellets)
pellet3.style.display = "inline"; 
}

//Water Bottle Battery Indicator
const myBatteryLevels = document.getElementById("myBatteryLevels");
if (battery.chargeLevel > 80) {
myBatteryLevels.href = "100batlvl.png"; // 81-100%
} else if (battery.chargeLevel > 60) {
myBatteryLevels.href = "80batlvl.png"; // 61-80%
} else if (battery.chargeLevel > 40) {
myBatteryLevels.href = "60batlvl.png"; // 41-60%
} else if (battery.chargeLevel > 20) {
myBatteryLevels.href = "40batlvl.png"; // 21-40%
} else if (battery.chargeLevel > 5) {
myBatteryLevels.href = "20batlvl.png"; // 6-20%
} else {
myBatteryLevels.href = "0batlvl.png"; // 0-5%
}