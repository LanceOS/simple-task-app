import express from "express";
import { channel, connect } from "./classes/send";
const app = express();
const PORT = 3000;


app.get("/", ({ req, res }) => {
    res.send("hello world")
})

app.post("/send", (req, res) => {
    const data = { message: 'Order placed' };
    channel.sendToQueue('deleteque', Buffer.from(JSON.stringify({ ...data, date: new Date() })));
    res.send('Order submitted');
})

app.listen(PORT, () => {
    connect()
})