import { Pod } from "./type";

export const fetchCalculateResult = async (query: string): Promise<Pod[]> => {

  const res = await fetch(`/api/calculate?query=${encodeURIComponent(query)}`)

  const { queryResult } = await res.json()

  return queryResult.pods
}
