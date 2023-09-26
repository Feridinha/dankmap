import { FastifyRequest, FastifyReply } from "fastify"
import { AnyZodObject, ZodError } from "zod"

export const validateSchema =
    (schema: AnyZodObject) =>
    (req: FastifyRequest, res: FastifyReply, next: () => void) => {
        try {
            schema.parse(req.body)
            next()
        } catch (validationError: any) {
            res.status(400).send({
                error: "Validation failed",
                details: validationError.errors,
            })
        }
    }
