const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
