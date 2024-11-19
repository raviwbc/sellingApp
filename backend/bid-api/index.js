// index.js
const express = require('express');
const cors = require('cors');

const registorRoutes = require('./routes/bidRoutes');
const completedListRoutes = require('./routes/completedList');
const currentBidRoutes = require('./routes/currentBidRoutes')
const bidHistory = require('./routes/bidHistory')
const loginController = require('./controllers/loginController')
const registorController = require('./controllers/registorController')

const app = express();
const router = express.Router()
const port = 3000;

app.use(cors())

app.use(express.json());
app.use('/login', router.post('/', loginController.loginAccount));
app.use('/teams', router.get('/', registorController.getAllTeamsRecords));
app.use('/registor', registorRoutes);
app.use('/completedList', completedListRoutes);
app.use('/currentBid', currentBidRoutes);
app.use('/currentautHistory', bidHistory)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
