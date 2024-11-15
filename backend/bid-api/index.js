// index.js
const express = require('express');
const registorRoutes = require('./routes/bidRoutes');
const completedListRoutes = require('./routes/completedList');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/registor', registorRoutes);
app.use('/completedList', completedListRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
