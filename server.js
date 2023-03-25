const express = require('express');

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
    res.send("Preformance example");
});

app.get('/timer', (req, res)=>{
    delay(9000);
    res.send("Ding ding ding!")
})

app.listen(3000);