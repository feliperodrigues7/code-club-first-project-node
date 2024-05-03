const express = require('express')
const uuid = require('uuid')
const port = 3000

const app = express()
app.use(express.json())

const users = []

const checkUsers = (request, response, next) => {

    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0 ){
        return response.status(404).json({message: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)

})

app.put('/users/:id', checkUsers, (request, response) => {

    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId

    const updatedUsers = {id, name, age}

    users[index] = updatedUsers

    return response.json(updatedUsers)
})

app.delete('/users/:id', (request, response) => {

    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0 ){
        return response.status(404).json({message: "User not found"})
    }

    users.splice(index,1)

    return response.status(204).json({message: "Deleted user"})
})





//porta
app.listen(port, () => {
    console.log("🚀 Server started on port 3000 🚀")
})