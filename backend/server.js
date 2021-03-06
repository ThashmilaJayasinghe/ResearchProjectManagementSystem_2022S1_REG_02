const express = require('express');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const path = require('path');

connectDB();

const app = express();
app.use(cors());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'submissions')));


// app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/topic', require('./routes/topicStatuesRoutes'));
app.use('/marks', require('./routes/marksRoutes'));
app.use('/group', require('./routes/groupRoutes'));
app.use('/request', require('./routes/requestSupervisorRoutes'));
app.use('/student', require('./routes/studentRoutes'));
app.use('/supervisor', require('./routes/supervisorRoutes'));
app.use('/staff', require('./routes/staffRoutes'));
app.use('/panel', require('./routes/panelRoutes'));
app.use('/submit', require('./routes/submissionRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/reqCoSupervisor', require('./routes/requestCoSupervisorRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
