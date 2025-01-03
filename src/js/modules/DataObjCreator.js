function CreateInfoObj(obj, unitGroup) {
  const unit = unitGroup;

  const address = obj.resolvedAddress;
  const description = obj.description;

  const icon = obj.days[0].icon;

  const temp = obj.days[0].temp;
  const tempMax = obj.days[0].tempmax;
  const tempMin = obj.days[0].tempmin;

  const timezone = obj.timezone;
  const datetime = obj.days[0].datetime;

  const sunrise = obj.days[0].sunrise;
  const sunset = obj.days[0].sunset;

  const humidity = obj.days[0].humidity;
  const uvIndex = obj.days[0].uvindex;

  return {
    unit,
    address,
    description,
    icon,
    temp,
    tempMax,
    tempMin,
    timezone,
    datetime,
    sunrise,
    sunset,
    humidity,
    uvIndex,
  };
}

export { CreateInfoObj };
