const amqp = require('amqplib/callback_api');
const Insert = require('../insert');

module.exports = function(app){
    //create a connection
    amqp.connect('amqp://localhost', function (connError, connection) {
        if (connError) throw connError;

        //create channel - inventory system
        connection.createChannel(function (channError, channel) {
            if (channError) throw channError;
            //assert queue
            const queue = 'inventory'
            channel.assertQueue(queue);

            console.log('Waiting for messages');
            //receive messages
            channel.consume(queue, function (msg) {
                var data = JSON.parse(msg.content);
                Insert.insertUser(data, queue);
                console.log(data);
            });
        })

        //create channel - guest info system
        connection.createChannel(function (channError, channel) {
            if (channError) throw channError;
            //assert queue
            const queue = 'guestinfo'
            channel.assertQueue(queue);

            console.log('Waiting for messages');
            //receive messages
            channel.consume(queue, function (msg) {
                var data = JSON.parse(msg.content);
                Insert.insertUser(data, queue);
                console.log(data);
            });
        })
    });
}