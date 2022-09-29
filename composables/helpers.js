import dayjs from 'dayjs'

export function ionInputTimeFormat(value) {
	if (dayjs.isDuration(value)) return value.format('HH:mm')
	return dayjs(value).format('HH:mm')
}

export function ionInputDateTimeFormat(dateTime) {
	return dayjs(dateTime).format('YYYY-MM-DD HH:mm')
}

export function getDuration(date1, date2, toIonInputTimeFormat = false) {
	const ts = dayjs.duration(dayjs(date2).diff(dayjs(date1)))
	if (toIonInputTimeFormat) return ionInputTimeFormat(ts)

	return ts
}
