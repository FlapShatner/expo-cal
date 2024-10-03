import dayjs from './dayjs'
import { CalendarEvent } from './events'

export function daysInMonth(year: number, month: number) {
 return dayjs().month(month).year(year).daysInMonth()
}

export function makeCurrMonthDays(year: number, month: number) {
 const numDays = daysInMonth(year, month)
 const days = [...Array(numDays)].map((day, i) => {
  return {
   date: dayjs()
    .month(month)
    .year(year)
    .date(i + 1)
    .format('YYYY-MM-DD'),
   day: i + 1,
   isCurrentMonth: true,
  }
 })
 return days
}

export const firstDayOfMonth = (month: number, year: number) =>
 dayjs()
  .month(month - 1)
  .year(year)
  .date(1)
  .format('YYYY-MM-DD')

const currentMonthDays = (year: number, month: number) => makeCurrMonthDays(year, month)

export function getWeekday(date: string) {
 return dayjs(date).weekday()
}

export function makePrevMonthDays(year: number, month: number) {
 const firstDayWeekday = getWeekday(currentMonthDays(year, month)[0].date)
 const prevMonth = dayjs().month(month).year(year).subtract(1, 'month')
 const visibleDaysLastMonth = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1
 const prevMonthLastMonday = dayjs(currentMonthDays(year, month)[0].date).subtract(visibleDaysLastMonth, 'day').date()
 const days = [...Array(visibleDaysLastMonth)].map((day, i) => {
  return {
   date: dayjs()
    .year(prevMonth.year())
    .month(prevMonth.month())
    .date(prevMonthLastMonday + i)
    .format('YYYY-MM-DD'),
   day: prevMonthLastMonday + i,
   isCurrentMonth: false,
  }
 })
 return days
}

export function makeNextMonthDays(year: number, month: number, calSize: number) {
 const thisMonthDays = daysInMonth(year, month)
 const num = calSize - thisMonthDays

 const days = (num: number) =>
  [...Array(num)].map((day, i) => {
   return {
    date: dayjs()
     .year(year)
     .month(month + 1)
     .date(i + 1)
     .format('YYYY-MM-DD'),
    day: i + 1,
    isCurrentMonth: false,
   }
  })

 return days(num)
}
export const days = (year: number, month: number, calSize: number) => {
 const currMonthDays = makeCurrMonthDays(year, month - 1)
 const nextMonthDays = makeNextMonthDays(year, month - 1, calSize)
 const prevMonthDays = makePrevMonthDays(year, month - 1)

 return [...currMonthDays, ...nextMonthDays]
}

export const makeEventDates = (startDate: string, endDate: string, startTime: string, endTime: string, allDay: boolean) => {
 const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD')
 const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD')
 const addTime = (date: string, time: string) => {
  return dayjs(`${date}T${time}`).format()
 }
 let startObj = {}
 let endObj = {}
 if (allDay) {
  startObj = {
   date: formattedStartDate,
  }
  endObj = {
   date: formattedEndDate,
  }
 }
 if (!allDay) {
  startObj = {
   dateTime: addTime(formattedStartDate, startTime),
  }
  endObj = {
   dateTime: addTime(formattedEndDate, endTime),
  }
 }
 return { start: startObj, end: endObj }
}

export const processDateTime = (date?: string | null, dateTime?: string | null) => {
 let processedDate: Date = dayjs().toDate()
 let processedTime: string = ''
 if (date) {
  processedDate = dayjs(date).toDate()
 } else {
  processedDate = dayjs(dateTime).toDate()
  processedTime = dayjs(dateTime).format('hh:mm')
 }
 return { date: processedDate, time: processedTime }
}

export function splitDateString(dateString: string): { month: number; year: number } {
 const [month, year] = dateString.split('_')
 return { month: parseInt(month, 10), year: parseInt(year, 10) }
}

export function getNextMonthYear(month: number, year: number): string {
 let nextMonth: number
 let nextYear: number

 if (month === 12) {
  nextMonth = 1 // January
  nextYear = year + 1 // Next year
 } else {
  nextMonth = month + 1 // Next month
  nextYear = year // Same year
 }

 return `${nextMonth}_${nextYear}`
}

export function getLastMonthYear(month: number, year: number): string {
 let lastMonth: number
 let lastYear: number

 if (month === 1) {
  lastMonth = 12 // December
  lastYear = year - 1 // Last year
 } else {
  lastMonth = month - 1 // Last month
  lastYear = year // Same year
 }

 return `${lastMonth}_${lastYear}`
}

export function trunc(input: string, numChars = 8, elipsis = false): string {
 if (!input) return ''
 return input.length > numChars ? input.substring(0, numChars - 1) + (elipsis ? '...' : '') : input
}

const formatDate = (event: CalendarEvent) => {
 if (event.timeZone !== 'UTC') {
  const formatted = dayjs(event.startDate).format('YYYY-MM-DD')
  return formatted
 }
 return dayjs(event.startDate).utc().format('YYYY-MM-DD')
}

export function filterEvents(events: CalendarEvent[], date: string) {
 console.log('date from utils', date)
 return events.filter((event) => formatDate(event) === date)
}

export type Day = {
 date: string
 day: number
 isCurrentMonth: boolean
}
