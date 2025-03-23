const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const reservationRoutes = require('./routes/reservations');

app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);

app.listen(port, () => {
  console.log(`Reservation API is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Reservation API is running');
});