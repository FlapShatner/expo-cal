import { create } from 'zustand'
import { ColorOption, colorOptions } from '../data/colorOptions'
import { FormattedWeather } from './weather-types'
import { CalendarEvent } from '../lib/events'

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
 isNewEvent: boolean
 newStartDate: Date | null
 newEndDate: Date | null
 allDay: boolean
}

type Actions = {
 setDetailVisible: (detailVisible: boolean) => void
 setColor: (newColor: ColorOption) => void
 setDayDetails: (dayDetails: DayDetails) => void
 setEventId: (eventId: string) => void
 setIsEdit: (isEdit: boolean) => void
 setIsEventDetail: (isEventDetail: boolean) => void
 setIsNewEvent: (isNewEvent: boolean) => void
 setNewStartDate: (date: Date) => void
 setNewEndDate: (date: Date) => void
 setAllDay: (allDay: boolean) => void
}

export type Store = State & Actions

export const useStore = create<Store>()((set) => ({
 color: colorOptions[0],
 detailVisible: false,
 dayDetails: null,
 eventId: null,
 isEdit: false,
 isEventDetail: false,
 isNewEvent: false,
 newStartDate: null,
 newEndDate: null,
 allDay: false,
 setColor: (newColor: ColorOption) => set(() => ({ color: newColor })),
 setDetailVisible: (detailVisible: boolean) => set({ detailVisible }),
 setDayDetails: (dayDetails: DayDetails) => set(() => ({ dayDetails })),
 setEventId: (eventId: string) => set(() => ({ eventId })),
 setIsEdit: (isEdit: boolean) => set(() => ({ isEdit })),
 setIsEventDetail: (isEventDetail: boolean) => set(() => ({ isEventDetail })),
 setIsNewEvent: (isNewEvent: boolean) => set(() => ({ isNewEvent })),
 setNewStartDate: (newStartDate: Date) => set(() => ({ newStartDate })),
 setNewEndDate: (newEndDate: Date) => set(() => ({ newEndDate })),
 setAllDay: (allDay: boolean) => set(() => ({ allDay })),
}))
