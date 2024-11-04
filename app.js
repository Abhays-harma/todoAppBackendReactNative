const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const port = process.env.PORT || 3000;


dotenv.config();


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI)
  .then(() => {
    console.log("Database connected successfully");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

app.use('/api/users', userRoutes);
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Page not found"
  });
});
