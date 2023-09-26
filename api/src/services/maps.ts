import env from "@/env"
import { Client, LatLng } from "@googlemaps/google-maps-services-js"
import { Point } from "@prisma/client"

const client = new Client()

// console.log(
//     client
//         .snapToRoads({
//             params: {
//                 path: [{ lat: 45, lng: -110 }],
//                 key: env.GOOGLE_MAPS_SECRET,
//             },
//             timeout: 1000, // milliseconds
//         })
//         .then((r) => {\
//             console.log(r.data)
//         })
//         .catch((e) => {
//             console.log(e)
//         })
// )

export const handlePointsToRoadPath = async (points: Point[]) => {
    const path = points.map(
        ({ latitude, longitude }): LatLng => ({ latitude, longitude })
    )

    const response = await client
        .snapToRoads({ params: { key: env.GOOGLE_MAPS_SECRET, path } })
        .catch((err: any) => console.log(JSON.stringify(err)))
        
    if (!response) return false
    console.log(response.data)
    return response.data.snappedPoints
}
