import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);


const formatDate = dateString => {
    return dayjs(dateString).fromNow();
}



export default formatDate;
