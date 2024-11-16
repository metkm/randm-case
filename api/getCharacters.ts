import { Character } from "@/types/character"
import { Pagination } from "@/types/pagination"

export const getCharacters = async (name: string) => {
  const params = new URLSearchParams({
    name,
  })

  const response = await fetch(`https://rickandmortyapi.com/api/character?${params.toString()}`)
  const parsed: Pagination<Character> = await response.json()

  return parsed
}
