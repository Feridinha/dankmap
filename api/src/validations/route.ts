import { z } from "zod"

export const createRouteSchema = z.object({
    color: z.string(),
}).strict()

export const putPointInRouteSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
}).strict()
