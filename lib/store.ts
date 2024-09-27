import { create } from 'zustand'
import { colorOptions, ColorOption } from '../data/colorOptions'
import { FormattedWeather } from './weather-types'
type DayDetails = {
  date: string
  weather: FormattedWeather | null
}

type State = {
  detailVisible: boolean
  dayDetails: DayDetails | null
  color: ColorOption
}

type Actions = {
  setDetailVisible: (detailVisible: boolean) => void
  setColor: (newColor: ColorOption) => void
  setDayDetails: (dayDetails: DayDetails) => void
}

export type Store = State & Actions

export const useStore = create<Store>()((set) => ({
  color: colorOptions[0],
  detailVisible: false,
  dayDetails: null,
  setColor: (newColor: ColorOption) => set(() => ({ color: newColor })),
  setDetailVisible: (detailVisible: boolean) => set( {detailVisible} ),
  setDayDetails: (dayDetails: DayDetails) => set(() => ({ dayDetails }))
}))
