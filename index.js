var fart = 0;

document.onkeydown = updateKey;
document.onkeyup = resetKey;


var server_port = 65432;
var server_addr = "76.191.25.251";   // the IP address of your Raspberry PI


function client(){
    
    const net = require('net');
    var input = document.getElementById("message").value;

    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        // send the message
        client.write(`${fart}\r\n`);
    });

    // get the data from the server
    client.on('data', (data) => {

        datas = data.toString()

        var data_array = datas.split(',')
        
        document.getElementById("cputemp").innerHTML = data_array[0];
        document.getElementById("cpuuse").innerHTML = data_array[1];
        document.getElementById("batterylev").innerHTML = data_array[2];
        document.getElementById("ultras").innerHTML = data_array[3];

        console.log(data.toString());
        client.end();
        client.destroy();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });


}

// for detecting which key is been pressed w,a,s,d
 
function updateKey(e) {

    e = e || window.event;

    if (e.keyCode == '87') {
        // up (w)
        fart = 1;
        document.getElementById("upArrow").style.color = "green";
        client();
        send_data("87");
    }
    else if (e.keyCode == '83') {
        // down (s)
        fart = 2;
        document.getElementById("downArrow").style.color = "green";
        client();
        send_data("83");
    }
    else if (e.keyCode == '65') {
        // left (a)
        fart = 3;
        document.getElementById("leftArrow").style.color = "green";
        client();
        send_data("65");
    }
    else if (e.keyCode == '68') {
        // right (d)
        fart = 4;
        document.getElementById("rightArrow").style.color = "green";
        client();
        send_data("68");
    }
    else if (e.keyCode == '82') {
        fart = 5;
        document.getElementById("stopSign").style.color = "red";
        client();
        send_data("82");
    }
}

// reset the key to the start state 
function resetKey(e) {

    e = e || window.event;

    document.getElementById("upArrow").style.color = "grey";
    document.getElementById("downArrow").style.color = "grey";
    document.getElementById("leftArrow").style.color = "grey";
    document.getElementById("rightArrow").style.color = "grey";
    document.getElementById("stopSign").style.color = "grey";

}


// update data for every 50ms

function update_data(){

    //client();
    
    setInterval(function(){
        // get image from python server
        client();
    }, 100);
    
}
