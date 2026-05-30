const SERVER_URL = "http://localhost:4000/api/pipeline-events";

const PIPELINES = [
  "etl-transactions",
  "etl-web-analytics",
  "etl-purchases",
];

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendEvent(payload) {
  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(`[${payload.event}] ${payload.pipeline_id} → ${response.status}`);
  } catch (err) {
    console.log("Server not reachable:", err.message);
  }
}

async function simulatePipeline() {
  const jobRunId = crypto.randomUUID();
  const pipelineId = PIPELINES[randomBetween(0, PIPELINES.length - 1)]; // one consistent pipeline per run

  const tasks = ["EXTRACT", "SANITISE", "LOAD", "CURATION"];

  await sendEvent({
    pipeline_id: pipelineId,
    job_run_id: jobRunId,
    event: "PIPELINE_STARTED",
    event_timestamp: new Date().toISOString(),
  });

  for (const task of tasks) {
    await sleep(randomBetween(500, 1500));

    const failed = Math.random() < 0.15; 

    await sendEvent({
      pipeline_id: pipelineId,
      job_run_id: jobRunId,
      event: "TASK_EVENT",
      task_name: task,
      event_result: failed ? "TASK_FAILED" : "TASK_SUCCEEDED",
      error_message: failed ? `Task ${task} threw an error on run ${jobRunId}` : null,
      event_timestamp: new Date().toISOString(),
    });

    if (failed) {
      await sendEvent({
        pipeline_id: pipelineId,
        job_run_id: jobRunId,
        event: "PIPELINE_FAILED",
        event_timestamp: new Date().toISOString(),
      });
      return; 
    }
  }

  
  await sendEvent({
    pipeline_id: pipelineId,
    job_run_id: jobRunId,
    event: "PIPELINE_SUCCEEDED",
    event_timestamp: new Date().toISOString(),
  });
}

async function main() {
  console.log("Simulator started. Sending events...\n");

  while (true) {
    simulatePipeline(); 
    await sleep(5000); 
  }
}

main();