import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';

// --- Configure Day.js ---
dayjs.extend(buddhistEra);
dayjs.locale('th');

export { dayjs };
export type { Dayjs } from 'dayjs';
