

export type Day = {
 date: string
 day: number
 isCurrentMonth: boolean
}


export type Coords = {
 place_id: number
 licence: string
 boundingbox: string[]
 lat: string
 lon: string
 display_name: string
 class: string
 type: string
 importance: number
}

export type HistWeatherData = {
 latitde: number
 longitude: number
 generationtime_ms: number
 utc_offset_seconds: number
 timezone: string
 timezone_abbreviation: string
 elevation: number
 daily_units: {
  time: string
  temperature_2m_max: string
  temperature_2m_min: string
  precipitation_sum: string
  precipitation_hours: string
 }
 daily: {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_sum: number[]
  precipitation_hours: number[]
 }
}

export type Weather = {
 latitude: number
 longitude: number
 generationtime_ms: number
 utc_offset_seconds: number
 timezone: string
 timezone_abbreviation: string
 elevation: number
 daily_units: {
  time: string
  temperature_2m_max: string
  temperature_2m_min: string
  precipitation_probability_max: string
 }
 daily: {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_probability_max: number[]
 }
}

export type FormattedWeather = {
 date: string
 maxTemp: number
 minTemp: number
 precipProb: number
}
