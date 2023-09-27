import { z } from "zod"
import { Prisma } from "@prisma/client"

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput =
    | Prisma.JsonValue
    | null
    | "JsonNull"
    | "DbNull"
    | Prisma.NullTypes.DbNull
    | Prisma.NullTypes.JsonNull

export const transformJsonNull = (v?: NullableJsonInput) => {
    if (!v || v === "DbNull") return Prisma.DbNull
    if (v === "JsonNull") return Prisma.JsonNull
    return v
}

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.lazy(() => z.array(JsonValue)),
    z.lazy(() => z.record(JsonValue)),
])

export type JsonValueType = z.infer<typeof JsonValue>

export const NullableJsonValue = z
    .union([JsonValue, z.literal("DbNull"), z.literal("JsonNull")])
    .nullable()
    .transform((v) => transformJsonNull(v))

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.lazy(() => z.array(InputJsonValue.nullable())),
    z.lazy(() => z.record(InputJsonValue.nullable())),
])

export type InputJsonValueType = z.infer<typeof InputJsonValue>

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
    "ReadUncommitted",
    "ReadCommitted",
    "RepeatableRead",
    "Serializable",
])

export const PointScalarFieldEnumSchema = z.enum([
    "id",
    "latitude",
    "longitude",
    "routeId",
    "createdAt",
])

export const RouteScalarFieldEnumSchema = z.enum([
    "id",
    "path",
    "isPathUpdated",
    "createdAt",
    "color",
])

export const SortOrderSchema = z.enum(["asc", "desc"])

export const JsonNullValueInputSchema = z.enum(["JsonNull"])

export const JsonNullValueFilterSchema = z.enum([
    "DbNull",
    "JsonNull",
    "AnyNull",
])

export const QueryModeSchema = z.enum(["default", "insensitive"])
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// POINT SCHEMA
/////////////////////////////////////////

export const PointSchema = z.object({
    id: z.number().int(),
    latitude: z.number(),
    longitude: z.number(),
    routeId: z.number().int(),
    createdAt: z.coerce.date(),
})

export type Point = z.infer<typeof PointSchema>

/////////////////////////////////////////
// ROUTE SCHEMA
/////////////////////////////////////////

export const RouteSchema = z.object({
    id: z.number().int(),
    path: InputJsonValue,
    isPathUpdated: z.boolean(),
    createdAt: z.coerce.date(),
    color: z.string(),
})

export type Route = z.infer<typeof RouteSchema>
