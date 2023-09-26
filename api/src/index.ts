import "./env"

import Fastify from "fastify"
import { validateSchema } from "./middlewares/zod"
import database from "./services/database"
import { createRouteSchema, putPointInRouteSchema } from "./validations/route"
import { z } from "zod"
import { RouteIdRequest, routeId } from "./middlewares/routeId"
import { handlePointsToRoadPath } from "./services/maps"

const fastify = Fastify({})

fastify.get("/route", async () => {
    const routes = await database.route.findMany({ include: { points: true } })
    return { success: true, data: routes }
})

fastify.put(
    "/route",
    { preHandler: validateSchema(createRouteSchema) },
    async (req) => {
        const body = req.body as z.infer<typeof createRouteSchema>
        const routes = await database.route.create({
            data: { color: body.color },
        })
        return { success: true, data: routes }
    }
)

fastify.put(
    "/route/:routeId/point",
    { preHandler: [validateSchema(putPointInRouteSchema), routeId] },
    async (req: RouteIdRequest) => {
        const { latitude, longitude } = req.body as z.infer<
            typeof putPointInRouteSchema
        >

        const routeTarget = req.routeTarget!

        const point = await database.point.create({
            data: { latitude, longitude, routeId: routeTarget.id },
        })

        await database.route.update({
            where: { id: routeTarget.id },
            data: { isPathUpdated: false },
        })

        return { success: true, data: point }
    }
)

fastify.get(
    "/route/:routeId",
    { preHandler: [routeId] },
    async (req: RouteIdRequest) => {
        const routeTarget = req.routeTarget!

        return { success: true, data: routeTarget }
    }
)

fastify.get(
    "/route/:routeId/path",
    { preHandler: [routeId] },
    async (req: RouteIdRequest) => {
        const routeTarget = req.routeTarget!
        if (routeTarget.isPathUpdated)
            return {
                success: true,
                data: JSON.parse(routeTarget.path!.toString()),
                isCache: true,
            }
        const path = await handlePointsToRoadPath(routeTarget.points)

        if (!path) return { success: false, message: "Erro ao atualizar path" }

        await database.route.update({
            where: { id: routeTarget.id },
            data: { isPathUpdated: true, path: JSON.stringify(path) },
        })

        return { success: true, data: path, isCache: false }
    }
)

fastify.listen({ port: 3333 })
