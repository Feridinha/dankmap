import { Prisma } from "@prisma/client"
import {
    Route,
    RouteSchema,
    Point,
    PointSchema,
    // @ts-ignore
} from "../prisma/generated/zod"

const selector = { points: true }

interface PopulatedRoute
    extends Omit<Prisma.RouteGetPayload<{ include: typeof selector }>, "path"> {
    path: {
        orinalIndex: number
        placeId: string
        location: { latitude: number; longitude: number }
    }[]
}

export type ApiRoute = PopulatedRoute
export type ApiPoint = Point

export const ApiRouteZodSchema = RouteSchema
export const ApiPointZodSchema = PointSchema
