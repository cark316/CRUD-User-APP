import express from "express"
import { User } from "../models/user.js"

var router = express.Router()

router.post('/', async (request, response) => {
    let user = await User.findOne({ email: request.body.email });
    if (user) {
        return response.status(400).send('That user already exists!');
    } 
    else {
        user = new User({
            email: request.body.email,
            username: request.body.username,
            password: request.body.password,
        });
        await user.save();
        response.send(user);
    }
});

router.get('/', async (request, response) => {
    try{
        const users = await User.find({})
        return response.status(200).json({
            count: users.length,
            data: users
        })
    } catch (error) {
        console.log(error.message)
        response.status(500)
    }
})

router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.email ||
            !request.body.username ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Missing fields'
            })
        }

        const { id } = request.params

        const result = await User.findByIdAndUpdate(id, request.body)

        if (!result) {
            return response.status(404).json({ message: 'User not found'})
        }

        return response.status(200).send({ message: 'User updated succesfully'})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params

        const result = await User.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).json({ message: 'User not found'})
        }

        return response.status(200).send({ message: 'User was deleted successfully'})

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params

        const user = await User.findById(id)
        return response.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message})
    }
})

export const users = router