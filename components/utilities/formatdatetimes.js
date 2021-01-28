// A function for formatting datetimes

export default function formatDateTimes(datetime) {
    var dt = datetime

    // today.setHours( today.getHours() + 3 );

    var date = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    var formatted_dateTime = date + ' ' + time;

    return formatted_dateTime;
}





