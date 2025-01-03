import { getAPIResponse } from '../modules/fetchWeatherData';
import { UIControl } from './UIControl';

// If we are in development mode I don't want localStorage

if (process.env.NODE_ENV !== 'production') {
  console.log('----------------------');
  //localStorage.clear();
  console.log('Cleared localStorage');
  console.log('----------------------');
}

/////////////////////////////////////////////////
// Storage control functions
/////////////////////////////////////////////////

export function updateStorage() {
  // Update currentUnit value

  let currentUnit = localStorage.getItem('currentUnit');

  if (document.querySelector('input[type="radio"][value="metric"]').checked) {
    currentUnit = 'metric';
  } else {
    currentUnit = 'us';
  }

  localStorage.setItem('currentUnit', currentUnit);

  // update lastSearchedCity value

  const searchedLocationHeading = document.querySelector(
    '[data-info="address"]',
  ).textContent;

  let lastSearchedCity = searchedLocationHeading.split(',')[0];

  localStorage.setItem('lastSearchedCity', lastSearchedCity);
}

function renderStorage() {
  // Update visually currentUnit Value
  UIControl.updateCurrentUnit(localStorage.getItem('currentUnit'));

  // Update visually lastSearchedCity Value
  UIControl.updateLastSearchedCity(localStorage.getItem('lastSearchedCity'));

  // Send initial api request
  getAPIResponse(
    localStorage.getItem('lastSearchedCity'),
    localStorage.getItem('currentUnit'),
  );
}

/////////////////////////////////////////////////
// Store Initial localStorage Data
////////////////////////////////////////////////

if (localStorage.length === 0) {
  localStorage.setItem('currentUnit', 'us');
  localStorage.setItem('lastSearchedCity', 'London');

  renderStorage();
} else {
  renderStorage();
}
