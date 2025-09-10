import { PRIVATE_RABBIT_QUEUE } from '$env/static/private';
import amqp from 'amqplib';

const queue = PRIVATE_RABBIT_QUEUE;

class RabbitMQ {
	private connection: any;
	private channel: any;

	async init() {
		if (this.connection) return;
		console.log('Initializing RabbitMQ')
		try {
			this.connection = await amqp.connect('amqp://user:root@localhost:5672');
			this.channel = await this.connection.createChannel();
			await this.channel.assertQueue(queue, { durable: true });
			console.log('Successfully connected to RabbitMQ and asserted queue.');
		} catch (error: any) {
			console.error('Failed to connect to RabbitMQ: ', error);
		}
	}

	async getChannel() {
		if (!this.channel) {

			await this.init()
		}
		return this.channel;
	}

	async send({ tableName, tablePK }: { tableName: string, tablePK: string }): Promise<boolean> {
		
		try {
			const ch = await this.getChannel()
			if (!ch) {
				console.error('RabbitMQ channel not initialized.');
				return false;
			}
			const payload = { tableName, tablePK }

			const data = JSON.stringify(payload);
			const success = ch.sendToQueue(queue, Buffer.from(data), {
				persistent: true
			});

			if (!success) {
				console.warn(
					`Message to queue '${queue}' was not sent immediately. Publisher flow control may be active.`
				);
			}

			return success;
		} catch (error) {
			console.error(`Failed to send message to queue '${queue}':`, error);
			return false;
		}
	}
}

export const rabbitMQClient = new RabbitMQ();
