import { getAPIResponse } from './fetchWeatherData';

const UIControl = (function () {
  const cityInputEl = document.querySelector('[data-weather-input]');

  const errorDialogEl = document.querySelector('[data-weather-error-dialog]');

  const iconImageEl = document.querySelector('[data-info="icon-image"]');

  const formInvalidValidationFunction = (el) => {
    const inputEl = el;
    const errorEl = inputEl.nextElementSibling;
    const errorContentEl = errorEl.querySelector('p');

    if (inputEl.validity.valueMissing) {
      errorContentEl.textContent = 'You must enter an City Name';
    } else if (inputEl.validity.tooShort) {
      errorContentEl.textContent = `City name should be at least ${inputEl.minLength} characters; you entered ${inputEl.value.length}`;
    } else if (inputEl.validity.tooLong) {
      errorContentEl.textContent = `City name should be maximum ${inputEl.maxLength} characters; you entered ${inputEl.value.length}`;
    }

    errorEl.style.transform = 'translate(-50%, 75%)';
    errorEl.style.opacity = '1';
  };

  const formValidValidationFunction = (obj) => {
    cityInputEl.value = '';

    if (obj === undefined) return;

    for (let key in obj) {
      const allDataEls = document.querySelectorAll('[data-info]');

      allDataEls.forEach((el) => {
        const snakeCaseAttribute = Array.from(el.getAttribute('data-info'))
          .map((char) => (char === '-' ? '' : char))
          .join('')
          .toLowerCase();

        if (key.toLowerCase() === snakeCaseAttribute) {
          if (obj[key] === 'metric') {
            el.textContent = 'C';
          } else if (obj[key] === 'us') {
            el.textContent = 'F';
          } else {
            el.textContent = obj[key];
          }
        }
      });
    }

    // To show weather icon
    iconImageSearchFunction(obj.icon);
  };

  const iconImageSearchFunction = (icon) => {
    const allIconImageEls = document.querySelectorAll(
      '[data-info="icon-image"]',
    );
    allIconImageEls.forEach((el) => (el.style.display = 'none'));

    const iconImageEl = document.querySelector(
      `[data-info="icon-image"]#${icon}`,
    );
    iconImageEl.style.display = 'block';
  };

  const updateCurrentUnit = (newValue) => {
    if (newValue === 'metric') {
      document.querySelector('[value="us"]').removeAttribute('checked');

      document.querySelector('[value="metric"]').setAttribute('checked', '');
    } else {
      document.querySelector('[value="metric"]').removeAttribute('checked');

      document.querySelector('[value="us"]').setAttribute('checked', '');
    }

    localStorage.setItem('currentUnit', newValue);
  };

  const updateLastSearchedCity = (newValue) => {
    localStorage.setItem('lastSearchedCity', newValue);
  };

  const updateWeatherInfo = async (cityName, unitGroup) => {
    const obj = await getAPIResponse(cityName, unitGroup);

    return obj;
  };

  const showErrorDialog = () => {
    errorDialogEl.show();
    errorDialogEl.style.transform = 'translate(-50%, 0)';
    errorDialogEl.style.opacity = '1';
  };

  const closeErrorDialog = () => {
    errorDialogEl.close();
    errorDialogEl.style.transform = 'translate(-50%, -150%)';
    errorDialogEl.style.opacity = '0';
  };

  return {
    formInvalidValidationFunction,
    formValidValidationFunction,
    updateCurrentUnit,
    updateLastSearchedCity,
    updateWeatherInfo,
    showErrorDialog,
    closeErrorDialog,
  };
})();

export { UIControl };
