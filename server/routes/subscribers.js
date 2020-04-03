const express = require("express");

const router = express.Router();

const subscribers = {};

router.get("/", (req, res) => {
    const id = Math.ceil(Math.random() * 1000000);
    console.log("new subscriber", id);
    req.on("close", () => delete subscribers[id]);
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
    });
    subscribers[id] = res;
});
router.post("/messages", (req, res) => {
    const { body } = req;
    Object.keys(subscribers).forEach(subId => {
        subscribers[subId].write(`data: ${JSON.stringify(body)}\n\n`);
    });
    res.status(204).end();
});

module.exports = router;
