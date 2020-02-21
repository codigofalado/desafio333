const express = require('express')
const cors = require('cors')
require('./db/mongoose')
require('./env/env')

const app = express()
const port = process.env.PORT || 3000

const textsRoute = require('./routes/text')
const emailsRoute = require('./routes/email')
const usersRoute = require('./routes/user')

let newUser = new User({email: 'usuario@teste.com.br', password: '111!!!'})
newUser.save()

app.use(cors({ origin: 'http://front-riul.now.sh' }))
app.use(express.json())

app.use(textsRoute)
app.use(emailsRoute)
app.use(usersRoute)

app.listen(port, () => {
  console.log(`Server is ON and running on port ${port}`)
})