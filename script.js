// script.js

// Get the DOM elements
const statusElement = document.getElementById('status');
const locationElement = document.getElementById('location');
const accelerationElement = document.getElementById('acceleration');
const startButton = document.getElementById('startButton');
const accidentIndicator = document.getElementById('accidentIndicator');

// Variables for storing GPS and motion data
let latitude = null;
let longitude = null;
let acceleration = 0;

// Set up event listener for the start button
startButton.addEventListener('click', startDetection);

function startDetection() {
  // Start GPS and motion detection
  statusElement.textContent = "Status: Detecting accident...";

  // Get the location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(updateLocation);
  } else {
    locationElement.textContent = "Geolocation is not supported by this browser.";
  }

  // Detect motion (acceleration)
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleMotion, true);
  } else {
    accelerationElement.textContent = "Device orientation not supported.";
  }
}

function updateLocation(position) {
  // Update the latitude and longitude
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  locationElement.textContent = `Location: Latitude: ${latitude}, Longitude: ${longitude}`;

  // Simulate accident detection (threshold for acceleration)
  if (acceleration > 15) { // Threshold for accident (this value is arbitrary)
    handleAccidentDetected();
  }
}

function handleMotion(event) {
  // Capture acceleration (can simulate crash detection)
  const x = event.acceleration.x || 0; // Default to 0 if undefined
  const y = event.acceleration.y || 0;
  const z = event.acceleration.z || 0;
  acceleration = Math.sqrt(x * x + y * y + z * z); // Calculate the total acceleration

  accelerationElement.textContent = `Acceleration: ${acceleration.toFixed(2)} m/s²`;

  // If acceleration is above a threshold, simulate an accident
  if (acceleration > 15) { // Threshold for accident (this value is arbitrary)
    handleAccidentDetected();
  }
}

function handleAccidentDetected() {
  // Change status to accident detected
  statusElement.textContent = "Status: Accident Detected!";
  
  // Light up the indicator
  accidentIndicator.classList.remove('off');
  accidentIndicator.classList.add('on');

  // Turn off after 5 seconds (simulate accident cleared)
  setTimeout(() => {
    accidentIndicator.classList.remove('on');
    accidentIndicator.classList.add('off');
    statusElement.textContent = "Status: Waiting for detection...";
  }, 5000);
}
