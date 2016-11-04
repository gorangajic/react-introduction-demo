
function lp(i) {
    if (i < 10) {
        return `0${i}`;
    }
    return i;
}

export function printTime(date) {
    return `${lp(date.getHours())}:${lp(date.getMinutes())}`;
}

export function timePassed(fromDate, toDate) {
    const ms = toDate - fromDate;
    const hours = Math.floor((ms / 1000 / 60 / 60) % 24);
    const minutes = Math.floor(ms / 1000 / 60) % 60;
    const seconds = Math.floor((ms / 1000 % 60));
    const time = [];
    time.push(lp(hours));
    time.push(lp(minutes));
    time.push(lp(seconds));
    return time.join(':');
}