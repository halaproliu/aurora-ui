import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { isTimestamp, isNil } from '@/utils/is';
import 'dayjs/locale/zh-cn';

type DateLike = dayjs.Dayjs | number | string | Date | null | undefined;
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

/**
 * @description: 格式化日期
 * @param {DateLike} date
 * @param {string} fmt，如YYYY-MM-DD HH:mm:ss
 * @return {string}
 */
export const formatDate = (
    dateInput: DateLike,
    fmt: string
): string | undefined => {
    if (isNil(dateInput)) return '';
    let date: DateLike | null = null;
    if (isTimestamp(dateInput as string | number)) {
        const dateNumber =
            typeof dateInput === 'string' ? Number(dateInput) : dateInput;
        date = dayjs(dateNumber);
    } else {
        date = dayjs(dateInput);
    }
    if (date && !date.isValid()) {
        return '';
    }
    return date!.format(fmt);
};

export const getRelativeTime = (dateInput: DateLike): string => {
    let date: DateLike | null = null;
    if (isTimestamp(dateInput as string | number)) {
        const dateNumber =
            typeof dateInput === 'string' ? Number(dateInput) : dateInput;
        date = dayjs(dateNumber);
    } else {
        date = dayjs(dateInput);
    }
    return dayjs().to(date);
};

export const getTimestamp = (date: DateLike): number | undefined | null => {
    if (date === null || date === undefined) return date;
    return dayjs(date).valueOf();
};

export const getRelativeTimes = (dateInput: DateLike): string => {
    let date: DateLike | null = null;
    if (isTimestamp(dateInput as string | number)) {
        const dateNumber =
            typeof dateInput === 'string' ? Number(dateInput) : dateInput;
        date = dayjs(dateNumber);
    } else {
        date = dayjs(dateInput);
    }
    return dayjs(date).fromNow();
};

const getValidDate = (dateInput: DateLike) => {
    let date: DateLike | null = null;
    if (isTimestamp(dateInput as string | number)) {
        const dateNumber =
            typeof dateInput === 'string' ? Number(dateInput) : dateInput;
        date = dayjs(dateNumber);
    } else {
        date = dayjs(dateInput);
    }
    return date;
};

export const getRelativeDaysStr = (timeStamp: string) => {
    if (!timeStamp) return '';

    const now = dayjs();
    const date = getValidDate(timeStamp);
    if (date.isSame(now, 'day')) {
        return '今天';
    } else if (date.isSame(now.add(1, 'day'), 'day')) {
        return '明天';
    } else if (date.isSame(now.add(2, 'day'), 'day')) {
        return '后天';
    } else if (date.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
    } else if (date.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
    } else if (date.isSame(now.subtract(3, 'day'), 'day')) {
        return '3天前';
    } else {
        if (date.isSame(now, 'year')) {
            return `${date.format('MM月DD日')}`;
        } else {
            return `${date.format('YYYY年MM月DD日')}`;
        }
    }
};
