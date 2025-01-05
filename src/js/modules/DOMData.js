import { UIControl } from './UIControl';

const DOMData = (function () {
  const formEl = document.querySelector('[data-weather-form]');
  const cityInputEl = document.querySelector('[data-weather-input]');

  const unitRadioGroupEl = document.querySelector('[data-radio-group]');

  const closeErrorDialogBtnEl = document.querySelector(
    '[data-weather-error-dialog-close-btn]',
  );
  const reloadErrorDialogBtnEl = document.querySelector(
    '[data-weather-error-dialog-reload-btn]',
  );

  const formElSubmitEventHandler = async (e) => {
    // Stop submission
    e.preventDefault();

    // Check validity

    if (!cityInputEl.validity.valid) {
      UIControl.formInvalidValidationFunction(cityInputEl);
    } else {
      // Remove whitespaces
      const searchedCity = cityInputEl.value
        .split('')
        .filter((char) => char !== ' ')
        .join('');

      UIControl.updateLastSearchedCity(searchedCity);

      const obj = await UIControl.updateWeatherInfo(
        searchedCity,
        localStorage.getItem('currentUnit'),
      );

      UIControl.formValidValidationFunction(obj);
    }
  };

  const cityInputElInputEventHandler = (e) => {
    const inputEl = e.target;
    // validation message

    if (inputEl.validity.valid) {
      // Validation message
      const errorEl = inputEl.nextElementSibling;

      errorEl.style.transform = 'translate(-50%, -50%)';
      errorEl.style.opacity = '0';
    } else {
      UIControl.formInvalidValidationFunction(inputEl);
    }
  };

  const unitRadioGroupInputEventHandler = async (e) => {
    const unitGroup = e.target.value;

    UIControl.updateCurrentUnit(e.target.value);

    const obj = await UIControl.updateWeatherInfo(
      localStorage.getItem('lastSearchedCity'),
      unitGroup,
    );

    UIControl.formValidValidationFunction(obj);
  };

  const closeErrorDialogBtnClickEventHandler = (e) => {
    UIControl.closeErrorDialog();
  };

  const reloadErrorDialogBtnClickEventHandler = (e) => {
    location.reload();
  };

  return {
    formEl,
    formElSubmitEventHandler,
    cityInputEl,
    cityInputElInputEventHandler,
    unitRadioGroupEl,
    unitRadioGroupInputEventHandler,
    closeErrorDialogBtnEl,
    closeErrorDialogBtnClickEventHandler,
    reloadErrorDialogBtnEl,
    reloadErrorDialogBtnClickEventHandler,
  };
})();

export { DOMData };
