export interface Info {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface Pagination<T> {
  info: Info,
  results: T[]
}
