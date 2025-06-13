let time = document.getElementById("time");
let dateInput = document.getElementById("alarmDate");
let tInput = document.getElementById("alarmTime");
let btn = document.getElementById("setAlarm");
let alarmsContainer = document.getElementById("alarms");
let alarmAudio = document.getElementById("alarm_audio");
let alarms = [];

// Function to update the current time
function updateTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    let period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert to 12-hour format
    hours = String(hours).padStart(2, '0');

    time.textContent = `${hours}:${minutes}:${seconds} ${period}`;
}

// Function to set an alarm
function setAlarm() {
    let alarmTime = new Date(dateInput.value + "T" + tInput.value);
    let now = new Date();

    if (alarmTime <= now) {
        alert("Please select a future date and time for the alarm.");
        return;
    }

    // Check if the alarm is already set
    if (alarms.some(alarm => alarm.getTime() === alarmTime.getTime())) {
        alert("This alarm is already set.");
        return;
    }

    alarms.push(alarmTime);
    displayAlarms();
    checkAlarms();
}

// Function to display the set alarms
function displayAlarms() {
    alarmsContainer.innerHTML = ""; // Clear previous alarms
    alarms.forEach(alarm => {
        let alarmDiv = document.createElement("div");
        alarmDiv.className = "alarm";
        alarmDiv.textContent = alarm.toLocaleString();
        alarmsContainer.appendChild(alarmDiv);
    });
}

// Function to check if any alarms need to be triggered
function checkAlarms() {
    setInterval(() => {
        let now = new Date();
        alarms.forEach((alarm, index) => {
            if (now.getTime() >= alarm.getTime()) {
                alarmAudio.play(); // Play alarm sound
                alert(`Alarm for ${alarm.toLocaleString()} is ringing!`);
                alarms.splice(index, 1); // Remove the alarm after it rings
                displayAlarms(); // Update the displayed alarms
            }
        });
    }, 1000); // Check every second
}

// Event listener for the set alarm button
btn.addEventListener("click", setAlarm);

// Update the time every second
setInterval(updateTime, 1000);