export function timeLeftUntilDate(targetDate) {
    const currentDate = new Date();
    const difference = targetDate.getTime() - currentDate.getTime();

    if (difference <= 0) {
        return "The target date has already passed.";
    }

    const millisecondsInSecond = 1000;
    const millisecondsInMinute = millisecondsInSecond * 60;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;

    const days = Math.floor(difference / millisecondsInDay);
    const hours = Math.floor((difference % millisecondsInDay) / millisecondsInHour);
    const minutes = Math.floor((difference % millisecondsInHour) / millisecondsInMinute);
    const seconds = Math.floor((difference % millisecondsInMinute) / millisecondsInSecond);

    let result = "";
    if (days > 0) {
        result += days + " dni" + (days !== 1 ? "s" : "") + ", ";
    }
    if (hours > 0) {
        result += hours + " godzin" + (hours !== 1 ? "s" : "") + ", ";
    }
    if (minutes > 0) {
        result += minutes + " minut" + (minutes !== 1 ? "s" : "") + ", ";
    }
    if (seconds > 0) {
        result += seconds + " sekund" + (seconds !== 1 ? "s" : "");
    }

    return result;
}