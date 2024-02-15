import {format, formatDistance, isToday, parseISO, setHours, setMinutes} from 'date-fns';
import {differenceInDays} from 'date-fns/differenceInDays';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
    differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
    formatDistance(parseISO(dateStr), new Date(), {
        addSuffix: true,
    })
        .replace('about ', '')
        .replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
    const today = new Date();

    // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
    if (options?.end)
        // Set to the last second of the day
        today.setUTCHours(23, 59, 59, 999);
    else today.setUTCHours(0, 0, 0, 0);
    return today.toISOString();
};

export const formatCurrency = (value) =>
    new Intl.NumberFormat('en', {style: 'currency', currency: 'USD'}).format(
        value
    );

export const formatDate = (date) => {
    if (isToday(date)) {
        return `Today at ${format(date, "HH:mm")}`;
    } else {
        return format(date, "dd.MM.yyyy HH:mm");
    }
};

export const formatDateMonth = (dateString) => {
    const date = parseISO(dateString);
    //const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'CET'
    };
    const formattedDateTime = date.toLocaleString('en-US', options).replace(/,(?=[^,]*$)/, ' at');
    return formattedDateTime;
}

export const formatDateMonthWithoutHour = (dateString) => {
    const date = parseISO(dateString);
    const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour12: false,
        timeZone: 'UTC' // Specify UTC time zone
    };

    const formattedDateTime = utcDate.toLocaleString('en-US', options);
    return formattedDateTime;
}

export const isAnyDayFullyBooked = (dates) => {
    // Loop through each date
    for (let date of dates) {
        const allTimesForDay = Array.from({length: 13}, (_, i) => {
            const hour = i + 7;
            return setHours(setMinutes(new Date(date.startDate), 0), hour);
        });

        const isDayFullyBooked = allTimesForDay.every(time => {
            return dates.some(booking => {
                const bookingDateStart = new Date(Date.parse(booking.startDate));
                return (
                    bookingDateStart.getHours() === time.getHours() &&
                    bookingDateStart.getMinutes() === time.getMinutes()
                );
            });
        });

        if (isDayFullyBooked) {
            return date;
        }
    }
    return [];
};


export const PAGE_SIZE = 15;
