import env from "@/env"
import { Client } from "@googlemaps/google-maps-services-js"

const client = new Client({})

client
    .elevation({
        params: {
            locations: [{ lat: 45, lng: -110 }],
            key: env.GOOGLE_MAPS_SECRET,
        },
        timeout: 1000, // milliseconds
    })
    .then((r) => {
        console.log(r.data.results[0].elevation)
    })
    .catch((e) => {
        console.log(e.response.data.error_message)
    })

    