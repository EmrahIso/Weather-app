import { CreateInfoObj } from './DataObjCreator';
import { UIControl } from './UIControl';

async function getAPIResponse(cityName, unitGroup) {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=${unitGroup}&key=JNAVPUBPYLP8DBFRY5J39YHZC`;

    const response = await fetch(url, { mode: 'cors' });

    if (response.status === 400) {
      UIControl.showErrorDialog();
      return;
    }

    const responseJson = await response.json();

    const finalObj = CreateInfoObj(responseJson, unitGroup);

    return finalObj;
  } catch (error) {
    console.log(error);
  }
}

export { getAPIResponse };
