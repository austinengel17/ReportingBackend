#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const Insert = require('./insert');


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

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            var data = JSON.parse(msg.content);
            Insert.insertUser(data, queue);
            console.log(data);
        }); 
            
        })
        connection.createChannel(function(error2, Channel) {
            if (error2) {
                throw error2;
            }
    
            var queue = 'guestinfo'
    
            channel.assertQueue(queue);
             console.log('Waiting for messages', queue);
            //receive messages
            channel.consume(queue, function (msg) {
                var data = JSON.parse(msg.content);
                Insert.insertUser(data, queue);
                console.log(data);
            });
        })
    });
