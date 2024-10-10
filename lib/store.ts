import { create } from 'zustand'
import { ColorOption, colorOptions } from '../data/colorOptions'
import { FormattedWeather } from './weather-types'
import { CalendarEvent } from '../lib/events'
import dayjs from './dayjs'

type DayDetails = {
 date: string
 weather: FormattedWeather | null
 events: CalendarEvent[] | null
}

type State = {
 isError: { status: boolean; message: string }
 month: number
 year: number
 detailVisible: boolean
 dayDetails: DayDetails | null
 color: ColorOption
 eventId: string | null
 isEdit: boolean
 isEventDetail: boolean
 newStartDate: Date | null
 newEndDate: Date | null
 allDay: boolean
 title: string
 notes: string
 location: string
 timeZone: string
}

type Actions = {
 setIsError: (isError: { status: boolean; message: string }) => void
 setMonth: (month: number) => void
 setYear: (year: number) => void
 setDetailVisible: (detailVisible: boolean) => void
 setColor: (newColor: ColorOption) => void
 setDayDetails: (dayDetails: DayDetails) => void
 setEventId: (eventId: string) => void
 setIsEdit: (isEdit: boolean) => void
 setIsEventDetail: (isEventDetail: boolean) => void
 setNewStartDate: (date: Date) => void
 setNewEndDate: (date: Date) => void
 setAllDay: (allDay: boolean) => void
 setTitle: (title: string) => void
 setNotes: (notes: string) => void
 setLocation: (location: string) => void
 setTimeZone: (timeZone: string) => void
 clearForm: () => void
}

export type Store = State & Actions

export const useStore = create<Store>()((set) => ({
 isError: { status: false, message: '' },
 month: Number(dayjs().format('M')),
 year: Number(dayjs().format('YYYY')),
 color: colorOptions[0],
 detailVisible: false,
 dayDetails: null,
 eventId: null,
 isEdit: false,
 isEventDetail: false,
 newStartDate: null,
 newEndDate: null,
 allDay: false,
 title: '',
 notes: '',
 location: '',
 timeZone: 'America/Chicago',
 setIsError: (isError: { status: boolean; message: string }) => set(() => ({ isError })),
 setMonth: (month: number) => set(() => ({ month })),
 setYear: (year: number) => set(() => ({ year })),
 setColor: (newColor: ColorOption) => set(() => ({ color: newColor })),
 setDetailVisible: (detailVisible: boolean) => set({ detailVisible }),
 setDayDetails: (dayDetails: DayDetails) => set(() => ({ dayDetails })),
 setEventId: (eventId: string) => set(() => ({ eventId })),
 setIsEdit: (isEdit: boolean) => set(() => ({ isEdit })),
 setIsEventDetail: (isEventDetail: boolean) => set(() => ({ isEventDetail })),
 setNewStartDate: (newStartDate: Date) => set(() => ({ newStartDate })),
 setNewEndDate: (newEndDate: Date) => set(() => ({ newEndDate })),
 setAllDay: (allDay: boolean) => set(() => ({ allDay })),
 setTitle: (title: string) => set(() => ({ title })),
 setNotes: (notes: string) => set(() => ({ notes })),
 setLocation: (location: string) => set(() => ({ location })),
 setTimeZone: (timeZone: string) => set(() => ({ timeZone })),
 clearForm: () =>
  set(() => ({
   newStartDate: null,
   newEndDate: null,
   allDay: false,
   title: '',
   notes: '',
   location: '',
  })),
}))
