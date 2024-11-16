export type Status = "Alive" | "Dead" | "unknown"
export type Gender = "Female" | "Male" | "Genderless" | "unknown"

interface Origin {
  name: string
  url: string
}

interface Location {
  name: string
  url: string
}

export interface Character {
  id: number
  name: string
  status: Status
  species: string
  type: string
  gender: Gender
  origin: Origin
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}
