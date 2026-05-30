
async function insertEvent(dbConnection, event, table_name) {
    console.log("insertion event...")
    const eventInsertStatement = await dbConnection.query(`
    INSERT INTO ${table_name} 
    (
        pipeline_id,
        job_run_id,
        task_name,
        event_result,
        error_message,
        event_timestamp
    )
    VALUES ($1, $2, $3, $4, $5, $6)`,
[
    event.pipeline_id,
    event.job_run_id,
    event.task_name,
    event.event_result,
    event.error_message,
    event.event_timestamp

]);
}

module.exports = insertEvent;