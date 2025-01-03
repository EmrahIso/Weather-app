import { DOMData } from './DOMData';
import { updateStorage } from './storage';

DOMData.formEl.addEventListener('submit', DOMData.formElSubmitEventHandler);

DOMData.cityInputEl.addEventListener(
  'input',
  DOMData.cityInputElInputEventHandler,
);

DOMData.unitRadioGroupEl.addEventListener(
  'input',
  DOMData.unitRadioGroupInputEventHandler,
);

///////////////////////////////////////////
// Listeners for errorDialogEl
///////////////////////////////////////////

DOMData.reloadErrorDialogBtnEl.addEventListener(
  'click',
  DOMData.reloadErrorDialogBtnClickEventHandler,
);

DOMData.closeErrorDialogBtnEl.addEventListener(
  'click',
  DOMData.closeErrorDialogBtnClickEventHandler,
);

///////////////////////////////////////////
// Listeners for localStorage
///////////////////////////////////////////

window.addEventListener('beforeunload', (e) => {
  updateStorage();
});
