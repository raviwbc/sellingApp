// index.js
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');

const registorRoutes = require('./routes/bidRoutes');
const completedListRoutes = require('./routes/completedList');
const currentBidRoutes = require('./routes/currentBidRoutes');
const bidHistory = require('./routes/bidHistory');
const loginController = require('./controllers/loginController');
const registorController = require('./controllers/registorController');
const userRoutes = require('./routes/userData');
const myteamRoutes = require('./routes/myTeamRoutes')
const verifyToken = require('./config/jwtVerify')
const app = express();
const router = express.Router()
const port = 3000;

app.use(cors())


// Read SSL/TLS certificates
const options = {
  key: fs.readFileSync('./config/key1.pem'),
  cert: fs.readFileSync('./config/cert1.pem')
};

// Serve HTTPS


app.use(express.json());
app.use('/login', router.post('/', loginController.loginAccount));
app.use('/teams', router.get('/', registorController.getAllTeamsRecords));
app.use('/currentUser', userRoutes)
app.use('/registor', registorRoutes);
app.use('/completedList', completedListRoutes);
app.use('/currentBid', currentBidRoutes);
app.use('/currentautHistory', bidHistory)
app.use('/myteam', myteamRoutes)

https.createServer(options, app).listen(4433, () => {
  console.log('HTTPS server running on port 443');
});

// app.listen(port, () => {
//   console.log(`Server running on https://localhost:${port}`);
// });
