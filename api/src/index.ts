import "./env"
import "./services/maps"



import Fastify from "fastify"

const fastify = Fastify({
    logger: true,
})

// Declare a route
fastify.get("/points", async () => (1))

// Run the server!
fastify.listen({ port: 3000 })