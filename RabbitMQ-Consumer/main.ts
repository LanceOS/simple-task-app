// consumer.js

import amqp from "amqplib";
import { DrizzleDB } from "./database/Drizzle.ts";
import { deleter } from "./classes/Deleter.ts";

async function consumeMessages() {
    try {
        const amqpServer = 'amqp://user:root@localhost:5672';
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();

        await channel.assertQueue('deleteque', { durable: true });

        console.log("Consumer is waiting for messages...");
        
        channel.consume('deleteque', async (msg) => {
            if (msg !== null) {
                const content = JSON.parse(msg.content.toString());
                try {
                    await deleter.determineRelations(content)
                    channel.ack(msg);
                } catch (error) {
                    console.error(`Error processing message for parent ID ${content}:`, error);
                    channel.nack(msg); 
                }
            }

            
        }, { noAck: false });

    } catch (error) {
        console.error("Failed to start consumer:", error);
    }
}

consumeMessages();