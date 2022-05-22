const express = require('express')
const colors = require('colors')
const cors = require('cors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()
app.use(cors())

// app.get('/api/goals', (req, res) => {
//     res.status(200).json({message: 'Get goals'})
// })

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/reqSupervisor', require('./routes/requestSupervisorRoutes'))
app.use('/topic', require('./routes/topicStatuesRoutes'))
app.use('/marks', require('./routes/marksRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
