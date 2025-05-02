const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRouter = require("./api/index.js");

const app = express();
app.use(express.json());
dotenv.config();  
app.use(cors());


app.use("/api/v1", apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
