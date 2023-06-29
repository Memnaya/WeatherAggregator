import _ from "lodash";

export default (data, currentTime, sunrise, sunset) => {
    const currentDay = data.forecast.forecastday["0"].hour;
    const nextDay = data.forecast.forecastday["1"].hour;
    
    const firstDayTemp = _.reduce(currentDay, ([], hour) => hour.temp_c);
    const secondDayTemp = _.reduce(nextDay, ([], hour) => hour.temp_c);
    const sunriseCheck = sunrise.slice(-2);
    const sunsetCheck = sunset.slice(-2);

    for (let i = 0; i <= 23; i+=1) {
        let time = currentTime;
        if (sunriseCheck = currentTime) {
            document.querySelectorAll(`.time${i}`).innerHTML = `${Здесь будет время восхода}`;
            const imgPath = currentDay[`${time}`].condition.icon;
            document.querySelectorAll(`.hour_cond${i}`).src = `${imgPath.slice(2)}`;
            document.querySelectorAll(`.hour_temp${i}`).innerHTML = "Восход";
            time += 1;
        }
        if (sunsetCheck = currentTime) {
            document.querySelectorAll(`.time${i}`).innerHTML = `${Здесь будет время захода}`;
            const imgPath = currentDay[`${time}`].condition.icon;
            document.querySelectorAll(`.hour_cond${i}`).src = `${imgPath.slice(2)}`;
            document.querySelectorAll(`.hour_temp${i}`).innerHTML = 'Закат';
            time += 1;
        }
        
    }
    ${`${Math.floor(firstDayTemp[time])}°`}`

}