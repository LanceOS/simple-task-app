import amqp from "amqplib"

export let channel, connection;

export async function connect() {
    try {
        const amqpServer = `amqp://user:root@localhost:5672`;
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue('deleteque'); // Ensures the queue exists
    } catch (error) {
        console.log(error);
    }
}