import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(utc)
dayjs.extend(timezone)

export default dayjs
