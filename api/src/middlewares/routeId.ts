import database from "@/services/database"
import { Prisma } from "@prisma/client"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

const idSchema = z.object({
    routeId: z.string().regex(/^\d+$/).transform(Number),
})

const selector = { points: true } satisfies Prisma.RouteSelect

export type RouteWithPoints = Prisma.RouteGetPayload<{ include: typeof selector }>

export interface RouteIdRequest extends FastifyRequest {
    routeTarget?: RouteWithPoints
}

export const routeId = (
    req: RouteIdRequest,
    res: FastifyReply,
    next: () => void
) => {
    const params = idSchema.safeParse(req.params)
    if (!params.success)
        return res.status(400).send({
            success: false,
            message: "Bad request",
        })

    database.route
        .findUnique({
            where: { id: params.data.routeId },
            include: selector
        })
        .then((routeTarget) => {
            if (!routeTarget)
                return res.status(404).send({
                    success: false,
                    message: "Rota não encontrada",
                })
            req.routeTarget = routeTarget
            next()
        })
}
