const express = require("express");
const app = express();
const pool = require("../db/db_connection");
const insertEvent = require("./insert_event");
app.use(express.json())

const PORT = 4000;
const TABLE_NAME = 'pipelines';

app.post("/api/pipeline-events", async(request, response) => {
    try {
        const event = request.body;

        if (!event){
            console.log("missing event");
            return response.status(400).json({
            error: "Missing Event"
            })
        };

        event.received_at = new Date().toISOString();

        // insert the event into the local posgres db
        console.log(event);

        await insertEvent(pool,event, TABLE_NAME);
        response.status(201).json({ message: "Event received", event });
        } catch(err) {
            console.log("ROUTE ERROR: ");
            console.log(err);
            response.status(500).json({ error: err.message });
        }
});


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`)
})