import { config } from "dotenv"
config({})

import { z } from "zod"

const envSchema = z.object({
    GOOGLE_MAPS_SECRET: z.string(),
})

const env = envSchema.parse(process.env)

export default env