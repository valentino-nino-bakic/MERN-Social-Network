import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';


dayjs.extend(relativeTime);
// dayjs.extend(isSameOrBefore);


const formatDate = dateString => {
    const messageTime = dayjs(dateString);
    const now = dayjs();

    if (now.diff(messageTime, 'second') <= 10) {
        return messageTime.fromNow();
    }

    return messageTime.format('H:mm');
}


const formatGroupedMessagesDate = dateString => {
    return dayjs(dateString).format('ddd MMM DD YYYY');
}



export { formatDate, formatGroupedMessagesDate};
