// module.exports = {

//     formatSeconds (time) {
//         let days = Math.floor(time % 31536000 / 86400);
//         let hours = Math.floor(time % 31536000 % 86400 / 3600);
//         let minutes = Math.floor(time % 31536000 % 86400 % 3600 / 60);
//         let seconds = Math.round(time % 31536000 % 86400 % 3600 % 60);
//         days = days > 9  ? days : `0${  days}`;
//         hours = hours > 9 ? hours : `0${  hours}`;
//         minutes = minutes > 9 ? minutes : `0${  minutes}`;
//         seconds = seconds > 9 ? seconds : `0${  seconds}`;
//         return `${(parseInt(days) > 0 ? `${days  }:` : '') + (parseInt(hours) === 0 && parseInt(days) === 0 ? '' : `${hours  }:`) + minutes  }:${  seconds}`;
//     }

// };