const express = require("express");

const app = express();

app.use(express.json())

const PORT = 4000;


app.post("/api/pipeline-events", (request, response) => {
    const event = request.body;

    if (!event){
        return response.status(400).json({
            error: "Missing Event"
        })
    };

    event.received_at = new Date().toISOString();

    console.log(event);

    response.status(201).json({ message: "Event received", event });
});


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`)
})