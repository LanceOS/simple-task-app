// consumer.js

import amqp from "amqplib";

async function consumeMessages() {
    try {
        const amqpServer = 'amqp://user:root@localhost:5672';
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();

        await channel.assertQueue('deleteque', { durable: true });

        console.log("Consumer is waiting for messages...");
        
        channel.consume('deleteque', async (msg) => {
            if (msg !== null) {
                const parentId = JSON.parse(msg.content.toString()).parentId;
                console.log(`Received message to delete children of parent ID: ${parentId}`);

                try {

                    channel.ack(msg);
                    console.log(`Successfully processed and acknowledged message for parent ID: ${parentId}`);
                } catch (error) {
                    console.error(`Error processing message for parent ID ${parentId}:`, error);
                    channel.nack(msg); 
                }
            }
        });

    } catch (error) {
        console.error("Failed to start consumer:", error);
    }
}

consumeMessages();