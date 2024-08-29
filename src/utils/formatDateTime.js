import {format} from 'date-fns';
import {enUS} from 'date-fns/locale';

function formatDateTime(datetime){
    const date = new Date(datetime)

    return {
        date: format(date,"MMMM dd, yyyy",{locale:enUS}),
        time: format(date, "hh:mm a", { locale: enUS }),
    }
}

export default formatDateTime