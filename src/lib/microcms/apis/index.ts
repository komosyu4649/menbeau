import { createClient } from 'microcms-ts-sdk'

export type Endpoints = {
  list: {
    contents: any
  }
}

export const client = createClient<Endpoints>({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? '',
  apiKey: process.env.MICROCMS_API_KEY ?? '',
})
