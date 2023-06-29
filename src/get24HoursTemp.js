import fs from 'fs';
import process from 'process';
import path from 'path';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const getData = (filepath) => JSON.parse(fs.readFileSync(getFullPath(filepath), 'utf8'));
const forecast = getData('../forecast.json');

// export default
const data24 = (data) => {
  const currentDay = data.forecast.forecastday['0'].hour;
  const nextDay = data.forecast.forecastday['1'].hour;
  const currentAstro = data.forecast.forecastday['0'].astro;
  const nextAstro = data.forecast.forecastday['1'].astro;
  const result = [];

  for (const item of currentDay) {
    const imgPath = item.condition.icon;
    const imgAndTemp = [];
    imgAndTemp.push(imgPath.slice(2));
    imgAndTemp.push(Math.round(item.temp_c));
    result.push(imgAndTemp);
  }
  return result;

  //   const getdayTemp = (data) => _.reduce(data, (acc, hour) => {
  //     const imgPath = hour.condition.icon;
  //     const imgAndTemp = [];
  //     imgAndTemp.push(imgPath.slice(2));
  //     imgAndTemp.push(Math.round(hour.temp_c));
  //     acc.push(imgAndTemp);
  //     return acc;
  //   }, []);
};

console.log(data24(forecast));
//   const firstDayTemp = getdayTemp(currentDay);
//   const secondDayTemp = getdayTemp(nextDay);
//   const currentHour = new Date().getHours();

//   const formatAstro = (data, sunPosition) => {
//     const time = data[`${sunPosition.toLowerCase()}`];
//     const hour = parseInt(time.slice(0, 2));
//     const timeFormat = time.slice(-2);

//     if (hour === 12 && timeFormat === 'AM') return 0;
//     if (hour < 12 && timeFormat === 'AM') return hour;
//     if (hour === 12 && timeFormat === 'PM') return hour;
//     return 12 + hour;
//   };

//   const sunrise = formatAstro(currentAstro, 'sunrise');
//   const sunset = formatAstro(currentAstro, 'sunset');

//   let time = currentHour;

// for (let i = 0; i <= 23; i += 1) {
//     let curTime = time;

//     if (time > 24) {
//         curTime = time - 24;
//     }
//     const dayImg = time > 24 ? `${secondDayTemp[curTime][0]}` : `${firstDayTemp[curTime][0]}`;
//     const dayTemp = time > 24 ? `${secondDayTemp[curTime][1]}` : `${firstDayTemp[curTime][1]}°`;

//     document.querySelectorAll(`.time${i}`).innerHTML = `${curTime}`;
//     document.querySelectorAll(`.hour_cond${i}`).src = `${dayImg}`;
//     document.querySelectorAll(`.hour_temp${i}`).innerHTML = `${dayTemp}°`;
//     time += 1;

// }
// //   while (i <= 23) {
// //     while (time <= 23) {
// //       if (time > 23) return time = 0;
// //         if (sunrise === currentHour && i < 24) {
// //           document.querySelectorAll(`.time${i}`).innerHTML = `${sunrise}`;
// //           const imgPath = currentDay[`${time}`].condition.icon;
// //           document.querySelectorAll(`.hour_cond${i}`).src = `${imgPath.slice(2)}`;
// //           document.querySelectorAll(`.hour_temp${i}`).innerHTML = 'Восход';
// //           time += 1;
// //           i += 1;

// //       }
// //       if (sunset === currentHour && i < 24) {
// //         document.querySelectorAll(`.time${i}`).innerHTML = `${sunset}`;
// //         const imgPath = currentDay[`${time}`].condition.icon;
// //         document.querySelectorAll(`.hour_cond${i}`).src = `${imgPath.slice(2)}`;
// //         document.querySelectorAll(`.hour_temp${i}`).innerHTML = 'Закат';
// //         time += 1;
// //         i += 1;
// //       }
// //       document.querySelectorAll(`.time${i}`).innerHTML = `${time}`;
// //       document.querySelectorAll(`.hour_cond${i}`).src = `${firstDayTemp[time][0]}`;
// //       document.querySelectorAll(`.hour_temp${i}`).innerHTML = `${firstDayTemp[time][1]}°`;
// //       time += 1;
// //       i += 1;
// //     }
// //   }
// };
