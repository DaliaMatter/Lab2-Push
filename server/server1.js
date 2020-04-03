const cors = require("cors");
const express = require("express");
const subscribersRouter = require("./routes/subscribers");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/subscribers", subscribersRouter);

app.listen(4000, () => {
    console.info("listening...");
});
