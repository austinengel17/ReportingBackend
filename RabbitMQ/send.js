#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var data = {
    name: 'Austin Engel',
    company: 'Spotify',
    designation: 'Senior Software Engineer'
};
var data1 = {
    name: 'Derin Sabu',
    company: 'Apple',
    designation: 'Senior Software Engineer'
};
var data2 = {
    name: 'Faraaz Baig',
    company: 'Google',
    designation: 'Data Scientist'
};
var data3 = {
    name: 'Haoru Song',
    company: 'Amazon',
    designation: 'Senior Front End Developer'
};


amqp.connect('amqp://rabbitmq', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'inventory';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
        console.log(`message sent to ${queue}`);

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data1)));
        console.log(`message sent to ${queue}`);

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data2)));
        console.log(`message sent to ${queue}`);

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data3)));
        console.log(`message sent to ${queue}`);
    });

    //The channel for GuestInfor//
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'guestinfo';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
        console.log(`message sent to ${queue}`);

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data1)));
        console.log(`message sent to ${queue}`);

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data2)));
        console.log(`message sent to ${queue}`);

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data3)));
        console.log(`message sent to ${queue}`);
    });


    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});