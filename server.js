require('dotenv').config();
const express = require('express');
const dbConnect = require('./app/startup/dbConnect');
const { PORT } = require('./config');
const userRoute = require('./app/router/userRoutes');
const strategyRoutes = require('./app/router/strategyRoutes');
const legRoute = require('./app/router/legRoutes');

const app = express();
app.use(require('cors')());

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.url)
  next()
})

app.use(userRoute);

app.use(strategyRoutes);

app.use(legRoute)


dbConnect()
  .then((val) => {
    app.listen(PORT, () => {
      console.log('server running at port no: ', PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
