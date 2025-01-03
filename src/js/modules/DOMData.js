import { getAPIResponse } from '../modules/fetchWeatherData';
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
      UIControl.updateLastSearchedCity(cityInputEl.value);
    }
  };

  const cityInputElInputEventHandler = (e) => {
    const inputEl = e.target;
    // validation message

    if (inputEl.validity.valid) {
      // Validation message
    } else {
      UIControl.formInvalidValidationFunction(inputEl);
    }
  };

  const unitRadioGroupInputEventHandler = async (e) => {
    const cityName = document.querySelector(
      '[data-info="address"]',
    ).textContent;
    const unitGroup = e.target.value;

    UIControl.updateCurrentUnit(e.target.value);

    const obj = UIControl.updateWeatherInfo(cityName, unitGroup);

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
