const amqp = require('amqplib/callback_api');

//TEST, DELETE BEFORE USE
var inventory1 = {
    id:'1bc4h53',
    lbs: 1.2
};
var inventory2 = {
    id:'4nbdg6j',
    lbs: 3.0
};
var guest1 = {
    id: '1bc4h53',
    resident: true,
    zipCode: '01564',
    unemployement: true,
    soSec: true,
    TANF: false,
    finAid: false,
    other: false,
    SNAP:true,
    WIC: false,
    breakfast: true,
    lunch: false,
    SFSP: true,
    household: [2, 21, 28, 60]
};
var guest2 = {
    id:'4nbdg6j',
    resident: false,
    zipCode: '20654',
    unemployement: false,
    soSec: true,
    TANF: true,
    finAid: false,
    other: true,
    SNAP:true,
    WIC: false,
    breakfast: false,
    lunch: true,
    SFSP: true,
    household: [1, 3, 21, 21]
};

//create connection
amqp.connect('amqp://localhost', function(connError, connection){
    if(connError) throw connError;
    //create channel
    connection.createChannel(function(channError, channel){
        if(channError) throw channError;
        //assert queue
        const queue = 'inventory'
        channel.assertQueue(queue);

        //send message to queue
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(inventory1)));
        console.log(`message sent to ${queue}`);

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(inventory2)));
        console.log(`message sent to ${queue}`);
    });
    connection.createChannel(function(channError, channel){
        if(channError) throw channError;
        //assert queue
        const queue = 'guestinfo'
        channel.assertQueue(queue);

        //send message to queue
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(guest1)));
        console.log(`message sent to ${queue}`);

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(guest2)));
        console.log(`message sent to ${queue}`);

    });
});