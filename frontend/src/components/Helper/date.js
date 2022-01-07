const formatDateString = (dateString, format = 'dd/mm/yyyy') => {
    let monthNames = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];
    let shortMonthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Agu',
        'Sep',
        'Okt',
        'Nov',
        'Des',
    ]
    let dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    let date = new Date(dateString);

    let formatted = format.replace(/dd/g, date.getDate().toString().padStart(2, '0'));
    formatted = formatted.replace(/day/g, dayNames[date.getDay()]);
    formatted = formatted.replace(/mm/g, (date.getMonth() + 1).toString().padStart(2, '0'));
    formatted = formatted.replace(/month/g, monthNames[date.getMonth()]);
    formatted = formatted.replace(/mon/g, shortMonthNames[date.getMonth()]);
    formatted = formatted.replace(/yyyy/g, date.getFullYear());
    return formatted;
};

const formatDateTimeString = (dateString, format) => {
    let formattedDate = formatDateString(dateString, format)
    let date = new Date(dateString)
    return formattedDate + " " + date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0')
}

const formatTimeString = (timeString) => {
    let time = new Date('2021-01-01 ' + timeString)
    return time.getHours().toString().padStart(2, '0') + ":" + time.getMinutes().toString().padStart(2, '0')
}

module.exports = {
    "formatDateString": formatDateString,
    "formatDateTimeString": formatDateTimeString,
    "formatTimeString": formatTimeString
}