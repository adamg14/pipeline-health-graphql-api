const SERVER_URL = "http://localhost:4000/api/pipeline-evets"

const PIPELINES = [
    "etl-transactions",
    "etl-web-analytics",
    "etl-purchases"
]

function randomString(){
    return crypto.randomUUID()
}

// function for sending posts requests to the api endpoing
async function sendEvent(payload) {
    try{

        const response = fetch(SERVER_URL, 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            console.log("Response Status: ", (await response).status);
    }catch (err){
        console.log("An error occurred when trying to reach the server");
        console.log("ERROR MESSAGEL: ", err.message);
    }
}

async function simulatePipeline(){
    // 
}

async function main() {
    console.log("simulator started.");
    console.log("Sending events to the server...");
}


function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomBetween(0, 3))