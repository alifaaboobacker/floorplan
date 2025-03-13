const express = require('express');

const app = express();
const router = require('./router');
const cors = require('cors');



app.use(express.json());
app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use(router);


module.exports=app;
