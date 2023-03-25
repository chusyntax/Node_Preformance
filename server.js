const express = require('express');
// const cluster = require('cluster');
// const os = require('os');

const app = express();

function delay(duration){
    const startTime = Date.now();
    while(Date.now() - startTime < duration){
        //Occupies the event loop and blocks other code from running
        //Node runs javascript code in a single thread meaning code can only do one task at a time
        //This is blocking code and it slows down the entire server
    }
}

//When you run the node file, it starts up the master process (main process).
//We can use the cluster process and run the function fork() in order to create a copy of the master process called the worker process.
//Each worker contains the code needed to process requests while master is only responsible for coordinating the creation of the worker processes.
//Wokrer processes use the Round Robin approach ~ Workers take turns responding to requests as they come in.

app.get('/', (req, res)=>{
    res.send(`Preformance example ${process.pid}`);
});

app.get('/timer', (req, res)=>{
    delay(9000);
    res.send(`Ding ding ding ${process.pid}`)
})

// if(cluster.isMaster){
//    console.log("Master has been started");
// //To run effeciently, each process needs to use a seperate processor in your CPU
// const NUM_WORKERS =os.cpus().length;
// //This creates as many forks as there are processes that need to be run
// for(let i=0; i< NUM_WORKERS; i++){
//     //Makes use of other physicial cores and then logical cores
//     cluster.fork()
// }

// }
// else{
//     console.log("Worker has started");
//     app.listen(3000);
// }

console.log("Running server.js");
console.log("Worker process started");
app.listen(3000);
 
//Round robin is one approach used for load balancing
//Load balancing ~ A way of disrtibuting/dividing a set of tasks to a set of resources
//Applies when youre running multiple servers or processes in parallel, each handling the same kind of requests

//Strategies for load balancing:
// Vertical scaling ~ Scaling up (faster cpu or server)
//Horizontal scaling ~ Scaling out (more servers or cpus)

// To summarize, in Node, we can use the cluster module to do load balancing of requests as they come in to our node FTP servers.
// And the cluster module uses the round robin approach to determine which process will handle those incoming requests.

//PM2 Helps with zero downtime by using the reload command which restarts processes one by one, keeping atleast one process running at all times

//Zero downtime reloads are all about making sure your applications are available to your users at all times, even when changes need to be made to your code.