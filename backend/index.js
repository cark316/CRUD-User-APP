import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { users } from "./routes/users.js"
import { PORT, mongoDB_URL } from "./config.js"
import { User } from "./models/user.js"

const app = express()

app.use(express.json())

app.use(cors())

// app.use(
//     cors({
//         origin: 'http://localhost:3333',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('This is a MERN Stack Application.')
});

mongoose
    .connect(mongoDB_URL)
    .then(() => {
        console.log('App connected to database')
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        })
    })
    .catch(() => {
        console.log('error')
    })

app.use('/api/users', users)
