import { create } from 'zustand'
import { ColorOption, colorOptions } from '../data/colorOptions'
import { FormattedWeather } from './weather-types'
import { CalendarEvent } from '../hooks/useCalendar'
type DayDetails = {
  date: string
  weather: FormattedWeather | null
  events: CalendarEvent[] | null
}

type State = {
  detailVisible: boolean
  dayDetails: DayDetails | null
  color: ColorOption
  eventId: string | null
  isEdit: boolean
  isEventDetail: boolean
}

type Actions = {
  setDetailVisible: (detailVisible: boolean) => void
  setColor: (newColor: ColorOption) => void
  setDayDetails: (dayDetails: DayDetails) => void
  setEventId: (eventId: string) => void
  setIsEdit: (isEdit: boolean) => void
  setIsEventDetail: (isEventDetail: boolean) => void
}

export type Store = State & Actions

export const useStore = create<Store>()((set) => ({
  color: colorOptions[0],
  detailVisible: false,
  dayDetails: null,
  eventId: null,
  isEdit: false,
  isEventDetail: false,
  setColor: (newColor: ColorOption) => set(() => ({ color: newColor })),
  setDetailVisible: (detailVisible: boolean) => set( {detailVisible} ),
  setDayDetails: (dayDetails: DayDetails) => set(() => ({ dayDetails })),
  setEventId: (eventId: string) => set(() => ({ eventId })),
  setIsEdit: (isEdit: boolean) => set(() => ({ isEdit })),
  setIsEventDetail: (isEventDetail: boolean) => set(() => ({ isEventDetail }))
}))
