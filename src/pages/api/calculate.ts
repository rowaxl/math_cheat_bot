import { NextApiRequest, NextApiResponse } from "next";
import { SubPod } from "../../libs/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
const APP_ID = process.env.NEXT_PUBLIC_APP_ID || ''

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req

  if (method !== 'GET') return res.status(403).send({ message: 'Invalid Request' })
  if (!APP_ID) return res.status(500).send({ message: 'Invalid APP_ID' })

  const externalResponse = await fetch(`${API_URL}?appid=${APP_ID}&output=json&input=${encodeURIComponent(query.query as string)}`, {
    headers: {"content-type": "application/json"}
  }).catch(err => {
    console.error('API_ERROR: ', err)
  })

  if (!externalResponse) {
    return res.status(500).send({ message: 'Unknown error occurred' })
  }

  const { queryresult } = await externalResponse.json()

  res.status(200).send({ queryResult: queryresult })
}